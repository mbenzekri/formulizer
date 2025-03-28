/* eslint-disable @typescript-eslint/no-explicit-any */
import { property } from "lit/decorators.js"
import { html, css, TemplateResult, PropertyValues } from "lit"
import { derefPointerData, isEmptyValue, newValue, getSchema, closestAscendantFrom, isFunction, notNull, isArray, isCollection } from "./lib/tools"
import { Pojo } from "./lib/types"
import { FzForm } from "./fz-form"
import { Base } from "./base"
import { EMPTY_SCHEMA, Schema } from "./lib/schema"
import { classMap } from "lit/directives/class-map.js"

const fiedtypes = [
    "fz-array",
    "fz-asset",
    "fz-boolean",
    "fz-constant",
    "fz-date",
    "fz-datetime",
    "fz-document",
    'fz-enum-select',
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
    "fz-color",
]
const fieldtypeslist = fiedtypes.join(',')

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
export abstract class FzField extends Base {

    @property({ type: String }) accessor pointer = '/'
    @property({ type: Object }) accessor schema = EMPTY_SCHEMA
    @property({ type: Object }) accessor data: any = {}
    @property({ type: String }) accessor name: string | null = null
    @property({ type: Number }) accessor index: number | null = null
    @property({ type: Boolean, attribute:false}) accessor dirty = false
    @property({ type: Array, attribute:false}) accessor errors: string[] = []
    @property({ attribute: false }) accessor collapsed = false
    
    //private _initdone = false
    private _dofocus = false
    private _form?: FzForm

    abstract renderField(): TemplateResult;
    abstract renderField(): TemplateResult;
    abstract toField(): void;
    abstract toValue(): void;

    get valid() {
        return (this.errors?.length ?? 0) === 0
    }
    get invalid() {
        return (this.errors?.length ?? 0) > 0
    }
    /** A field is touched if really modified (dirty) or submission by for done */
    get touched() {
        return this.dirty || this.form.submitted
    }
    get validation() {
        return classMap({ 
            "is-valid" : this.dirty && this.valid,
            "is-invalid" : this.dirty && this.invalid
        })
    }

    get isroot() {
        return this.schema.parent == null
    }


    get value(): any {
        // Warning side effects is prohibited in this method, never update this.data 
        if (this.data == null) return undefined
        // this is a known exception on side efect prohibition 
        // We need to initialise properties to 'undefined' if they are not present
        if (this.name && !(this.name in this.data)) this.data[this.name] = undefined
        return this.data[this.key]
    }
    set value(value: any) {
        if (value === this.value) return
        this.cascadeValue(value)
        this.errors = []
        this.form?.check()
    }

    get empty() { return this.schema._empty() }
    get isempty() { return isEmptyValue(this.value) }

    /**
     * this method is called for to update this.value (and must be done only here)
     * @param value 
     * @returns 
     */
    private cascadeValue(value: any) {
        const schema = this.schema
        const form = this.form

        // this.data has a value (not undefined or null)
        // ---------------------------------------------
        // we simple set new value (newValue func ensure well constructed values , chaining , default, ..)
        if (this.data) {
            this.data[this.key] = newValue(value, this.data, this.schema)
        } else {

            // this.data is nullish
            // --------------------
            // we need to set this value and all the nullish ascendant found (cascading sets)
            // imagine if current pointer is '/a/b/c/d/e' 
            // we must check if d,c,b, and a are nullish (suppose d,c,b are nullish)
            // we will set new newValue() for b,c,d first 

            if (!this.pointer.startsWith("/")) {
                console.error(`cascadeValue pointer not absolute => ${this.pointer}`)
                return false
            }
            if (this.pointer === "/") {
                console.error(`newValue cant change root => ${this.pointer}`)
                return false
            }
            // we split pointer to obtain the path as an array of properties or indexes
            // ex '/a/b/c/d/e => ['',a,b,c,d,e]
            const keys = this.pointer.split('/').map(name => /^\d+$/.test(name) ? parseInt(name, 10) : name)

            // for each properties in path we calculate a corresponding schema
            // because heterogeneous types in arrays we are not allways able to do it
            const schemas: Schema[] = []
            for (let ischema: Schema | undefined = schema; ischema; ischema = ischema.parent) { schemas.unshift(ischema) }
            if (keys.length !== schemas.length) {
                // not sure this is possible to happen because if we are ther choices had be done then intermidiary schema/values exists
                console.error(`cascadeValue fail not all schema found on path `)
                return false
            }

            // we calculate a newValue for each missing property/index  in path in descending order until this target 
            const fields: FzField[] = []
            let ipointer: string = ''
            let parent = form.root
            for (let i = 0; i < keys.length && parent; i++) {
                const key = keys[i]
                const schema = schemas[i]
                ipointer = i ? `${ipointer}/${key}` : `${key}`
                const field = form.getField(ipointer)
                if (field) fields.push(field)
                const type = schema.basetype
                switch (true) {
                    // root nothing to do
                    case key === '':
                        break
                    // last property empty => affecting
                    case i === keys.length - 1: {
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
            // trigger a requestUpdate for each field
            fields.forEach(f => {
                f.toField()
                f.requestUpdate()
            })

        }
        // trigger a requestUpdate for this field
        this.toField()
        this.requestUpdate()
        return true
    }

    /*
    * check if field is nullable
    */
    get nullable() {
        if (this.schema.type === "null") return true
        if (isArray(this.schema.type) &&  this.schema.type.includes("null")) return true
        return this.schema.nullAllowed
    }

    get key(): string | number {
        return this.name ?? this.index ?? -1
    }
    /**
     * calculate label for this field
     */
    get label() {
        // user may decide to remove label (title == "")
        if (this.schema?.title === "") return ""
        // label for array items is an index poistion (one based)
        if (this.isItem) return String(this.index != null ? this.index + 1 : '-')
        // label for properties is title or default to property name
        return this.schema?.title ?? this.name ?? ""
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
        if (this.isProperty && this.schema.requiredIf) {
            required = this.evalExpr("requiredIf") ?? false
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


    // get pointer() { return pointerData(this.data,this.key) }


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

    fields(): FzField[] {
        const fields: FzField[] = []
        this.shadowRoot?.querySelectorAll(fieldtypeslist).forEach(elem => fields.push(elem as FzField))
        return fields
    }

    get form(): FzForm {
        if (this._form) return this._form
        this._form = closestAscendantFrom("fz-form", this) as FzForm;
        return this._form
    }

    static override get styles() {
        return [
            ...super.styles,
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
        return html`
            <div ?hidden="${!this.visible}">
                <div style="padding-top: 5px">${this.renderField()}</div>
                ${this.renderErrors()}
            </div>
        `
    }

    renderErrors() {
        if (!this.touched || this.valid) return ''
        return html`
            <span id="error" class="error-message error-truncated" @click="${this.toggleError}">
                ${this.errors.join(', ')}
            </span>`
    }
    private toggleError() {
        (this.shadowRoot?.getElementById("error") as HTMLElement)?.classList.toggle("error-truncated")
    }

    /**
     * render method for label
     */
    renderLabel() {
        const required = this.required ? '*' : ''
        const label = `${this.label}${required}`

        // user choose not to show label  
        if (this.label === "") return html``

        // labels for object/aray properties have collapse chevron
        if (isCollection(this.schema)) return html`
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div>${label}</div>
            </label>`

        // label for array items (badge index)
        if (this.isItem) return html`
            <label for="input" class="col-sm-1 col-form-label" @click="${this.labelClicked}">
                <div>${this.badge(label)}</div>
            </label>`

        // labels for object properties
        return html`
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div>${label}</div>
            </label>`

    }
    badge(value:number|string) {
        return html`<span class="badge bg-primary badge-pill">${value}</span>`
    }
    

    toggle(evt: Event) {
        if (this.schema.parent == null) { this.collapsed = false}
        else if  (this.collapsed !== null) this.collapsed = !this.collapsed
        this.eventStop(evt)
        this.requestUpdate()
    }


    chevron() {
        if (this.schema.basetype !== "object" || this.schema.parent == null) return ''
        if (this.collapsed) return html`<i class="bi bi-chevron-down"></i>`
        return html`<i class="bi bi-chevron-up"></i>`
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
    renderItem(schema: Schema, key: string | number): TemplateResult {
        let name: string | null = null;;
        let index: number | null = null;
        if (!this.schema) return html``
        if (typeof key === 'string') name = key
        if (typeof key === 'number') index = key
        const data = (this.data == null) ? null : this.data[this.key]

        switch (schema.field) {
            case 'fz-enum-select': return html`<fz-enum-select .pointer="${this.pointer}/${key}" .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-select>`
            case 'fz-enum-check': return html`<fz-enum-check .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-enum-check>`
            case "fz-date": return html`<fz-date .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-date>`
            case "fz-time": return html`<fz-time .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-time>`
            case "fz-datetime": return html`<fz-datetime .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-datetime>`
            case "fz-textarea": return html`<fz-textarea .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-textarea>`
            case "fz-string": return html`<fz-string .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-string>`
            case "fz-mask": return html`<fz-mask .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-mask>`
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
            case "fz-color": return html` <fz-color .pointer="${this.pointer}/${key}"  .schema="${schema}" .name="${name}" .index="${index}" .data="${data}"></fz-color>`
            case 'fz-error':
            default: return html`<div class="alert alert-warning" role="alert">field name=${name} type ${schema.basetype}/${schema.field} not implemented !</div>`
        }
    }

    // lit overridings 
    // ---------------
    override connectedCallback() {
        super.connectedCallback()
        this.form?.addField(this.schema.pointer, this.pointer, this)
    }

    override disconnectedCallback() {
        super.disconnectedCallback()
        this.form?.removeField(this.schema.pointer, this.pointer)
        this.pointer = undefined as any
        this.schema = undefined as any
        this.data = undefined as any
        this.name = undefined as any
        this.index = undefined as any
        this.dirty = undefined as any
        this.errors = undefined as any
        this._dofocus = undefined as any
        this._form = undefined as any
    }

    /**
     * before each update
     * - set queried focus 
     * @param changedProps changed properties 
     */
    override update(changedProps: any) {
        if (this.schema?.expression)
            this.value = this.evalExpr("expression")

        super.update(changedProps)
        if (this._dofocus) {
            this._dofocus = false
            this.focus()
        }
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties)
        this.toField()
        this.form?.check()       
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
     *  'change' handler when changes occurs on inputed value
     * - update the model value from the field
     * - eval 'change' keyword
     * - process a validation 
     * - triggers needed cha,ge events for update and trackers
     */
    protected change() {
        // changed occurs evaluate change keyword extension
        this.toValue()
        this.evalExpr("change")

        // signal field update for ascendant
        const event = new CustomEvent('update', {
            detail: {
                data: this.data,
                schema: this.schema,
                field: this
            },
            bubbles: true,
            composed: true
        })
        this.dispatchEvent(event);

        // signal field update for trackers
        if (this.schema.trackers.length) {
            this.dispatchEvent(new CustomEvent('data-updated', {
                detail: {
                    trackers: this.schema.trackers,
                    field: this
                },
                bubbles: true,
                composed: true
            }))
            const logger = FzLogger.get("data-update",{field:this,schema:this.schema})
            logger.info(`event "data-updated" triggered`)
        }
        this.requestUpdate()
    }

    /**
     * calculate an abstract string (summary) for this field or a property/item of field
     */

    abstract(key?: string | number, itemschema?: Schema): string {
        let text
        if (key === null || key === undefined) {
            if (this.isempty) return "~"
            text = this.schema.abstract
                ? this.evalExpr("abstract")
                : this.schema._abstract(this.value)
        } else if (notNull(itemschema) && isFunction(itemschema.from)) {
            const refto = itemschema.from?.(itemschema, this.value[key], this.data, this.key, this.derefFunc, this.form.options.userdata)
            const index = refto.refarray.findIndex((x: any) => x[refto.refname] === this.value[key])
            const value = refto.refarray[index]
            const schema = getSchema(value)
            text = isFunction(schema.abstract)
                ? schema.abstract(schema, value, refto.refarray, index, this.derefFunc, this.form.options.userdata)
                : schema._abstract(this.value[key])
        } else {
            const schema = (typeof key === 'string') ? this.schema.properties?.[key] : itemschema
            text = isFunction(schema?.abstract)
                ? schema.abstract(schema, this.value[key], this.data, this.key, this.derefFunc, this.form.options.userdata)
                : schema?._abstract(this.value[key])
        }
        return text.length > 200 ? text.substring(0, 200) + '...' : text
    }

    evalExpr(attribute: keyof Schema, schema?: Schema, value?: Pojo, parent?: Pojo, key?: string | number) {
        const exprFunc = this.schema?.[attribute]
        if (!isFunction(exprFunc)) return null
        return schema != null
            ? exprFunc(schema, value, parent, key, this.derefFunc, this.form?.options.userdata)
            : exprFunc(this.schema, this.value, this.data, this.key, this.derefFunc, this.form?.options.userdata)
    }

    /**
     * return tagged template '$' for pointer derefencing in expression or code used in schema
     * the pointer derefencing is done relativatly to this.data
     *  @example $`/a/b/c` // absolute dereferencing
     *  @example $`1/b/c`   // relative dereferencing
     */
    get derefFunc() {
        return (template: { raw: readonly string[] | ArrayLike<string> }, ...substitutions: any[]) => {
            const pointer = String.raw(template, substitutions)
            return derefPointerData(this.form.root, this.data, this.key, pointer)
        }
    }
    /**
     * this method must be call when global context detect form detects a 
     * tracked data had been change
     */
    trackedValueChange() {
        // actually only expression update directly the value ofther extension
        // keywords are called on demand
        if (this.schema?.expression) {
            this.value = this.evalExpr("expression")
        }
        this.requestUpdate()
    }
}
