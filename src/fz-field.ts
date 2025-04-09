/* eslint-disable @typescript-eslint/no-explicit-any */
import { property } from "lit/decorators.js"
import { html, TemplateResult, PropertyValues } from "lit"
import { derefPointerData, isEmptyValue, newValue, getSchema, isFunction, notNull, isArray, isNull } from "./lib/tools"
import { Pojo } from "./lib/types"
import { FzForm } from "./fz-form"
import { Base } from "./base"
import { EMPTY_SCHEMA, Schema } from "./lib/schema"
import { classMap } from "lit/directives/class-map.js"



/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
export abstract class FzField extends Base {

    abstract renderField(): TemplateResult;
    abstract toField(): void;
    abstract toValue(): void;

    protected form!: FzForm
    protected localError?: string
    private _dofocus = false

    @property({ type: String, reflect: true }) accessor pointer = '/'
    @property({ type: Object }) accessor schema = EMPTY_SCHEMA
    @property({ type: Object }) accessor data: any = {}
    @property({ type: String }) accessor name: string | null = null
    @property({ type: Number }) accessor index: number | null = null

    @property({ attribute:false}) accessor dirty = false
    @property({ attribute: false }) accessor i_collapsed = false
    @property({ attribute: false }) get errors(): string[] {
        if (!this.form) return []
        return this.localError ? [this.localError,...this.form.errors(this.pointer)] : this.form.errors(this.pointer)
    }

    get valid() {
        return this.errors.length === 0 && isNull(this.localError)
    }
    get invalid() {
        return this.errors.length > 0 || notNull(this.localError)
    }

    get collapsed(): boolean {
        if (this.schema.collapsed == "never") return false
        if (this.schema.collapsed == "allways") return true
        return this.i_collapsed
    }
    set collapsed(value: boolean) {
        if (this.schema.collapsed == "never") return
        if (this.schema.collapsed == "allways") return
        this.i_collapsed = value
    }

    toggle(evt: Event) {
        if (["never","allways"].includes(this.schema.collapsed)) return
        if (this.isroot) { this.i_collapsed = false}
        else this.i_collapsed = !this.i_collapsed
        this.eventStop(evt)
        this.requestUpdate()
    }


    /** A field is touched if really modified (dirty) or submission by user done */
    get touched() {
        return this.dirty || this.form?.submitted
    }
    get validation() {
        return classMap({ 
            "is-valid" : this.touched && this.valid,
            "is-invalid" : this.touched && this.invalid
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
        this.dirty = true
        this.form?.check()
    }

    get empty() { return this.schema._empty() }
    get isempty() { return isEmptyValue(this.value) }

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

    /**
     * this method is called for to update this.value (and must be done only here)
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
            let ipointer = ''
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
                //f.toField()
                f.requestUpdate()
            })

        }
        // trigger a requestUpdate for this field
        //this.toField()
        this.requestUpdate()
        return true
    }

    /**
     * call for focus on next update for field
     */
    dofocus() { this._dofocus = true }

    /**
     * to override if focusout need to be managed by field
     */
    focusout(_evt: Event) {
        // dont forget to call super.focusout(evt)
    }
    /**
     * render method for this field component (calls renderField() abstract rendering method)
     */
    override render() {
        if (!this.visible) return ''
        this.toField()
        return html`<div class="space-before" @focusout="${this.focusout}" >${this.renderField()}</div>`
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

        // the user may choose not to show label  
        if (this.label === "") return html``
        const label = `${this.label}${this.required ? '*' : ''}`
        // for array items => badge index / for object property => label
        return html`
            <label for="input" class="${this.isItem ? 'col-sm-1' : 'col-sm-3'} col-form-label" @click="${this.labelClicked}">
                <div>${ this.isItem ? this.badge(label) : label} </div>
            </label>`
    }

    chevron() {
        if (["allways","never"].includes(this.schema.collapsed)) return ''
        if (this.collapsed) return html`<i class="bi bi-chevron-down"></i>`
        return html`<i class="bi bi-chevron-up"></i>`
    }


    // lit overridings 
    // ---------------
    override connectedCallback() {
        super.connectedCallback()
        this.form = this.queryClosest("fz-form") as FzForm
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
        this._dofocus = undefined as any
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
        this.i_collapsed = ['allways','true'].includes(this.schema.collapsed) ? true : false
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
