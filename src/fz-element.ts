/* eslint-disable @typescript-eslint/no-explicit-any */
import { property } from "lit/decorators.js"
import { html, css, TemplateResult, LitElement } from "lit"
import { derefPointerData, abstract, getEmptyValue, isEmptyValue, newValue, getCircularReplacer, getSchema, closestAscendantFrom, calculateDefault } from "./tools"
import { Pojo } from "./types"
import { FzForm } from "./fz-form"
import { bootstrapCss } from "./bootstrap"
import { bootstrapIconsCss } from "./bootstrap-icons"

const fiedtypes = [
    "fz-array",
    "fz-asset",
    "fz-boolean",
    "fz-constant",
    "fz-date",
    "fz-datetime",
    "fz-document",
    'fz-enum',
    'fz-enum-array',
    "fz-geolocation",
    "fz-integer",
    'fz-markdown',
    'fz-enum-check',
    "fz-float",
    "fz-object",
    "fz-range",
    "fz-signature",
    "fz-string",
    "fz-textarea",
    "fz-enum-typeahead",
    "fz-time",
    "fz-uuid",
]
const fieldtypeslist = fiedtypes.join(',')

const invalidkeys = [
    'valueMissing',
    'badInput',
    'patternMismatch',
    'tooLong',
    'tooShort',
    'rangeOverflow',
    'rangeUnderflow',
    'stepMismatch',
    'customError',
    'typeMismatch'
]
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
export abstract class FzElement extends LitElement {

    @property({ type: Object }) accessor schema: Pojo = {}
    @property({ type: Object }) accessor data: Pojo = {}
    @property({ type: String }) accessor name: string | null = null
    @property({ type: Number }) accessor index: number | null = null
    @property({ attribute: false }) accessor valid = false
    @property({ attribute: false }) accessor message = ''
    @property({ type: String }) accessor pointer = '#'

    private _initdone = false
    private _handlers: { [name: string]: ((evt: Event) => void)[] } = {}
    private _dofocus = false
    private _form?: FzForm

    abstract renderInput(): TemplateResult
    abstract convertToInput(value: any): any // this.value vers this.input.value
    abstract convertToValue(value: any): any // this.input.value vers value

    get value(): any {
        // attention ne jamais faire d'effet de bord (modifier this.data dans ce getter)
        // sauf exception plus bas
        if (this.data == null) return undefined
        // exception effet de bord (on initialise les propriété à undefined si elles son absentes)
        if (this.name && !(this.name in this.data)) this.data[this.name] = undefined
        return this.data[this.key]
    }
    set value(val: any) {
        this.cascadeValue(val)
        this.check()
        this.triggerChange()
    }

    private cascadeValue(value: any): boolean {
        const schema = this.schema
        const form = this.form

        // cette fonction est appelé quand un fz-form-field doit mettre a jour sa value 
        // Deux cas se présentent  
        // 1 - this.data l'objet ou tableau censé contenir la value est null ou undef
        // 2 - this data n'est pas null ou undef

        // CAS 2 : this.data est valué (cas général)
        // si ce champ à un data ni null ni undef on raccroche simplement la value au parent (this.data)
        if (this.data) {
            this.data[this.key] = newValue(value, this.data, this.schema)
            return false
        }

        // CAS 1 - this.data est null ou undef (c'est a dire que l'imbrication contenant ce champ n'est pas valué)
        // c'est le moment de les initialiser...


        // ceci arrive uniquement dans les cas d'imbrications d'objet ou tableau  
        // il y a dans le path depuis "form.root" jusqu'à 'this' des champs intermediaire dans 'pointer' à null ou undef 
        // on doit créer ces valeurs intermédiaires qui ne peuvent etre que des objets ou des tableaux.
        if (!form) {
            console.error(`cascadeValue root form not found (impossible!!!) => ${this.pointer}`)
            return false
        }
        if (!this.pointer.startsWith("#/")) {
            console.error(`cascadeValue pointer not absolute => ${this.pointer}`)
            return false
        }
        if (this.pointer === "#/") {
            console.error(`newChild cant change root => ${this.pointer}`)
            return false
        }
        // on calcule le 'path' des propriétés endescendant de la racine (#) jusqu'au noeud final data
        // ex '#/a/b/1/v/12/toto => [#,a,b,1,v,12,toto]
        const properties = this.pointer.split('/').map(name => /^\d+$/.test(name) ? parseInt(name, 10) : name)

        // on calcule le "path" des schemas pour chaque propriété en remontant 
        // IMPORTANT! il est impossible de trouver tous les schemas dans l'autre sens 
        // à cause des types heterogènes dans les tableaux (qui empèche la descente)
        const schemas: Pojo[] = []
        for (let ischema = schema; ischema; ischema = ischema.parent) { schemas.unshift(ischema) }
        if (properties.length !== schemas.length) {
            console.error(`properties vs schemas mismatch when cascading `)
            return false
        }

        // on calcule le 'path' des valeurs de chaque propriété en descendant 
        // chaque propriété non valuée est créé (array ou object) jusque qu'au champs final 
        const fields: FzElement[] = []
        let ipointer: string = ''
        let parent = form.root
        for (let i = 0; i < properties.length && parent; i++) {
            const key = properties[i]
            const schema = schemas[i]
            ipointer = i ? `${ipointer}/${key}` : `${key}`
            const field = form.getfieldFromData(ipointer)
            if (field) fields.push(field)
            const type = schema.basetype
            switch (true) {
                // root nothing to do
                case key == '#':
                    break
                // last property empty => affecting
                case i === properties.length - 1: {
                    const v = newValue(value, parent, schema)
                    if (field && !field.data) field.data = parent
                    parent = parent[key] = v
                }
                    break
                // property "array" typed empty => initialising
                case parent[key] == null && type == 'array': {
                    const v = newValue([], parent, schema)
                    if (field && !field.data) field.data = parent
                    parent = parent[key] = v
                }
                    break
                // property "object" typed empty => initialising
                case parent[key] == null && type == 'object': {
                    const v = newValue({}, parent, schema)
                    if (field && !field.data) field.data = parent
                    parent = parent[key] = v
                }
                    break
                default:
                    parent = (type == 'object' || type == 'array') ? parent[key] : null
            }
        }
        // on remet à jour tous les champs trouvés
        fields.forEach(f => f.requestUpdate())
        // on remet à jour le champs courant
        this.requestUpdate()
        return true
    }

    /*
    * check if field is nullable
    */
    get nullable() {
        if ("_nullable" in this.schema) return this.schema._nullable;
        return this.schema.nullAllowed;
    }

    get key(): string | number {
        return this.name ?? this.index ?? -1
    }
    /**
     * calculate label for this field
     */
    get label() {
        return this.isItem ? (this.index != null ? this.index + 1 : '-') : (this.schema.title || this.schema.description || this.name)
    }
    /**
     * return true if this field is item of array, false otherwise
     */
    get isItem() {
        return (this.index != null)
    }
    /**
     * return true if this field is property of object, false otherwise
     */
    get isProperty(): boolean {
        return (this.name != null)
    }
    /**
     * return HTMLInputElement used to edit field value
     * pay attention may not always exit, some fields dont use HTML inputs (ex: signature) 
     */
    get input() {
        return (this.shadowRoot?.getElementById('input') as HTMLInputElement)
    }

    /**
     * calculate a visible boolean state for this field 
     */
    get visible() {
        return this.data && this.schema.visible ? !!this.evalExpr("visible") : true
    }
    /**
     * calculate a required boolean state for this field 
     */
    get required() {
        let required = false
        if (this.isProperty && this.schema.requiredWhen) {
            try {
                required = this.evalExpr("requiredWhen")
            } catch (e) {
                console.error(`Error when evaluating requiredWen ${this.schema.requiredWhen.toString()}`)
            }
        }
        return required
    }

    /**
     * calculate a readonly boolean state for this field 
     */
    get readonly(): boolean {
        if (!this.form) return true
        if (this.form.readonly) return true
        return (this.data && this.schema.readonly) ? this.evalExpr("readonly") : false
    }


    get empty() { return getEmptyValue(this.schema) }
    get isEmpty() { return isEmptyValue(this.value) }
    // get pointer() { return pointerData(this.data,this.key) }


    renderField(): TemplateResult {
        return html`
            <div class="form-group row">
                ${this.renderLabel}
                <div class="col-sm">${ this.renderInput() }</div>
            </div>`
    }
    /**
     * set focus to input if exists, overriden for composed fields 
     * to use dofocus() to delay focus() call on next update on object and array
     */
    override focus() { this.input?.focus() }
    /**
     * call for focus on next update for field
     */
    dofocus() { this._dofocus = true }
    /**
    * preventDefault and stopPropagation on event (helper)
    * @param event 
    */
    eventStop(event?: Event): void {
        if (!event) return
        event.preventDefault()
        event.stopPropagation()
    }

    fields(): FzElement[] {
        const fields: FzElement[] = []
        this.shadowRoot?.querySelectorAll(fieldtypeslist).forEach(elem => fields.push(elem as FzElement))
        return fields
    }

    get form(): FzForm {
        if (this._form) return this._form
        this._form = closestAscendantFrom("fz-form", this) as FzForm;
        return this._form
    }

    static override get styles() {
        return [
            bootstrapCss,
            bootstrapIconsCss,
            css`
            .invalid {
                border: 1px solid rgba(220,53,69) !important;
            }
            .invalid:focus, input:out-of-range:focus {
                box-shadow:0 0 0 .25rem rgba(220,53,69,.25);
                border: 1px solid red !important;
            }
            .valid {
                border: 1px solid rgba(25,135,84) !important;
            }
            .valid:focus {
                box-shadow:0 0 0 .25rem rgba(25,135,84,.25) !important;
                border: 1px solid green !important;
            }
            .error-message {
                margin:0;
                text-align: right;
                font-size:small;
                font-style: italic;
                color: rgba(220,53,69);
                float: right;
            }
            .error-truncated {
                white-space: nowrap;
                overflow:hidden !important;
                text-overflow: ellipsis;
            } 
        `]
    }

    /**
     * render method for this field component (calls renderField() abstract rendering method)
     */
    override render() {
        return html`<div ?hidden="${!this.visible}">
            <div style="padding-top: 5px">${this.renderField()}</div>
            ${this.valid ? html`` : html`<div class="row"><span id="error" class="error-message error-truncated" @click="${this.toggleError}">${this.message}</span></div>`}
        </div>
        `
    }

    private toggleError() {
        (this.shadowRoot?.getElementById("error") as HTMLElement)?.classList.toggle("error-truncated")
    }

    /**
     * render method for label
     */
    get renderLabel() {
        if (this.schema.title === "") return html`` 
        if (this.isItem)  return html`
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div @click="${this.labelClicked}"><span class="badge bg-primary rounded-pill">${this.label}</span></div>
            </label>`

        return html`
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div>${this.label}${this.required ? '*' : ''}</div>
            </label>`
        }

    /**
     * render an item of this field 
     * - item may be property of object (property name found in this.name)
     * - item may be element of array (array index found in this.index)
     * 
     * only one of them (this.name or this.index is valued).
     * this method is used by composed fields (fz-array and fz-object)
     * @param key 
     */
    renderItem(schema: Pojo, key: string | number): TemplateResult {
        let name: string | null=null;;
        let index: number | null = null;
        if (!this.schema) return html``
        if (typeof key === 'string') name = key
        if (typeof key === 'number') index = key
        const data = (this.data == null) ? null : this.data[this.key]

        switch (schema.field) {
            case 'fz-enum': return html`<fz-enum .pointer="${this.pointer}/${key}" .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum>`
            case 'fz-enum-check': return html`<fz-enum-check .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-check>`
            case "fz-date": return html`<fz-date .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-date>`
            case "fz-time": return html`<fz-time .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-time>`
            case "fz-datetime": return html`<fz-datetime .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-datetime>`
            case "fz-textarea": return html`<fz-textarea .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-textarea>`
            case "fz-string": return html`<fz-string .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-string>`
            case "fz-asset": return html`<fz-asset .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-asset>`
            case "fz-signature": return html`<fz-signature .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-signature>`
            case "fz-boolean": return html`<fz-boolean .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-boolean>`
            case "fz-float": return html`<fz-float .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-float>`
            case "fz-integer": return html`<fz-integer .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-integer>`
            case "fz-range": return html`<fz-range .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-range>`
            case "fz-geolocation": return html`<fz-geolocation .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-geolocation>`
            case "fz-array": return html`<fz-array .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-array>`
            case "fz-object": return html` <fz-object .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-object>`
            case "fz-constant": return html` <fz-constant .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-constant>`
            case "fz-enum-array": return html` <fz-enum-array .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-array>`
            case "fz-document": return html` <fz-document .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-document>`
            case "fz-uuid": return html` <fz-uuid .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-uuid>`
            case "fz-markdown": return html` <fz-markdown .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-markdown>`
            case "fz-enum-typeahead": return html` <fz-enum-typeahead .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-typeahead>`
            case 'fz-error':
            default: return html`<div class="alert alert-warning" role="alert">field name=${name} type ${schema.basetype}/${schema.field} not implemented !</div>`
        }
    }
    registerHandler(event: string, handler: (evt: Event) => void) {
        if (!this._handlers[event]) this._handlers[event] = []
        this._handlers[event].push(handler)
        this.addEventListener(event, handler)
        return handler
    }

    override connectedCallback() {
        super.connectedCallback()
        this.form?.addField(this.schema.pointer, this.pointer, this)
    }

    override disconnectedCallback() {
        super.disconnectedCallback()
        this.form?.removeField(this.schema.pointer, this.pointer)

        for (const event in this._handlers) {
            const handlers = this._handlers[event]
            handlers.forEach(handler => this.removeEventListener(event, handler))
        }
    }
    override requestUpdate(name?: PropertyKey, oldvalue?: unknown): void {
        super.requestUpdate(name, oldvalue)
    }
    /**
     * on first updated set listeners
     * @param _changedProperties (unused)
     */
    override firstUpdated(_changedProperties: any) {
        // for debug 'F9' output state of field
        this.input?.addEventListener('keydown', this.debugKey.bind(this))
        if (this.input) this.input.value = this.convertToInput(this.value)
        this.check()
    }

    /**
     * to be specialized if needed
     */
    firstUpdate() { return; }
    /**
     * before each update
     * - set queried focus 
     * @param changedProps changed properties 
     */
    override update(changedProps: any) {
        this.eval()
        if (!this._initdone) {
            this.firstUpdate()
            this._initdone = true
        }
        super.update(changedProps)
        if (this._dofocus) {
            this._dofocus = false
            this.focus()
        }
        if (this.input) this.input.value = this.convertToInput(this.value)
    }

    /**
     * 'click' handler when click occurs on field label element
     * may be specialized by subclasses to ac on label clicked event  
     * @param changedProps changed properties 
     */
    labelClicked(evt: Event) {
        this.eventStop(evt)
    }
    /**
     *  'change' handler when changes occurs on this.input
     * - update the model value of the field
     * - check to update validity 
     * @param changedProps changed properties 
     */
    change() {
        if (this.input) {
            // cas particulier des 'boolean' qui fonctionnent differements des input.value
            if (this.schema.basetype === 'boolean') this.value = this.input.checked
            else this.value = this.convertToValue(this.input.valueAsNumber ? this.input.valueAsNumber : this.input.value)
        }

        this.check()
        const event = new CustomEvent('update', {
            detail: {
                data: this.data,
                schema: this.schema,
                field: this
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
    /**
     * calculate an abstract string (summary) for this field or a property/item of field
     */

    abstract(key?: string | number, itemschema?: Pojo): string {
        let text
        if (key === null || key === undefined) {
            if (this.isEmpty) return "~"
            text = this.schema.abstract
                ? this.evalExpr("abstract")
                : abstract(this.schema, this.value)
        } else if (itemschema && itemschema.refTo) {
            const refto = itemschema.refTo(itemschema,this.value[key], this.data, this.name, (p: string) => this.derefData(p))
            const index = refto.refarray.findIndex((x: any) => x[refto.refname] === this.value[key])
            const value = refto.refarray[index]
            const schema = getSchema(value)
            text = schema?.abstract
                ? schema.abstract(schema, value, refto.refarray, index, (p: string) => this.derefData(p))
                : abstract(schema, this.value[key])
        } else {
            const schema = (typeof key === 'string') ? this.schema.properties[key] : itemschema
            text = schema?.abstract
                ? schema.abstract(schema, this.value[key], this.data, this.name, (p: string) => this.derefData(p))
                : abstract(schema, this.value[key])
        }
        return text.length > 200 ? text.substring(0, 200) + '...' : text
    }

    /**
     * calculate a default value a given schema 
     */
    default(parent: any, schema: Pojo): any {
        return calculateDefault(parent,schema)
    }
    /**
     * eval "expression" calculated field 
     */
    eval() {
        if (this.schema.expression) this.value = this.evalExpr("expression")
    }
    check() {
        const input = this.input
        if (!input) {
            this.valid = false
            this.message = ''
            return
        }
        const validity = this.input.validity
        let countinvalid = 0
        let message = ''
        invalidkeys.forEach(key => {
            if (key === 'valid') return
            const keyinvalid = (validity as any)[key]
            countinvalid += keyinvalid ? 1 : 0
            if (keyinvalid) message = this.getMessage(key, input)
        })
        this.valid = (countinvalid === 0)
            || (countinvalid === 1 && validity.badInput && this.value == null && !this.required)
        this.message = this.valid ? '' : message
        this.input?.classList.add(this.valid ? 'valid' : 'invalid')
        this.input?.classList.remove(this.valid ? 'invalid' : 'valid')
    }

    getMessage(key: string, input?: HTMLInputElement): string {
        switch (key) {
            case 'valueMissing':
                return `champs obligatoire`
            case 'badInput':
                return `valeur incorrecte`
            case 'patternMismatch':
                return `format non respecté (patron=${input ? input.getAttribute('pattern') : '?'})`
            case 'tooLong':
                return `trop long (max=${input ? input.getAttribute('maxlength') : '?'})`
            case 'tooShort':
                return `trop court (min=${input ? input.getAttribute('minlength') : '?'})`
            case 'rangeOverflow':
                return `trop grand (max= ${input ? input.getAttribute('max') : '?'})`
            case 'rangeUnderflow':
                return `trop petit (min=${input ? input.getAttribute('min') : '?'})`
            case 'stepMismatch':
                return `erreur de pas (pas=${input ? input.getAttribute('step') : '?'})`
            case 'customError':
                return `erreur spécialisé`
            case 'typeMismatch':
                return `syntaxe incorrecte`
            default: return ''
        }
    }
    derefData(pointer: string): any {
        return derefPointerData(this.form.root, this.data, this.key, pointer)
    }

    /**
     * trap F9 key down to log debug Field state
     * @param evt keyboard event to trap key
     */
    private debugKey(evt: KeyboardEvent) {
        if (evt.key === 'F9') {
            (window as any)._FZ_FORM_FIELD_DEBUG = this
            console.log(invalidkeys.map((key) => `${key} = ${(this.input.validity as any)[key]}`).join('\n'))
            const outlist = [
                ['name', this.name],
                ['valid', this.valid],
                ['visible', this.visible],
                ['required', this.required],
                ['readonly', this.readonly],
                ['check', JSON.stringify(this.input.validity)],
                ['data', JSON.stringify(this.data, (key, value) => typeof key === 'symbol' ? undefined : value, 4)],
                ['input', this.input.value],
                ['value', this.value],
                ['schema', JSON.stringify(this.schema, getCircularReplacer)],
            ]
            console.log(outlist.map(item => item.join(" = ")).join("\n"))
            this.eventStop(evt)
            debugger
        }
    }
    protected triggerChange() {
        this.evalExpr("change")
        if (this.schema.observers && this.schema.observers.length) {
            this.dispatchEvent(new CustomEvent('observed-changed', {
                detail: {
                    observers: this.schema.observers,
                    field: this
                },
                bubbles: true,
                composed: true
            }))
        }
    }

    evalExpr(attribute: string, schema?: Pojo, value?: any, parent?: any, key?: string | number) {
        if (typeof this.schema?.[attribute] != "function") return null
        if (schema != null) {
            return this.schema[attribute](schema, value, parent, key, (p: string) => this.derefData(p), this.form?.options.userdata)
        }
        return this.schema[attribute](this.schema, this.value, this.data, this.name, (p: string) => this.derefData(p), this.form?.options.userdata)
    }
}
