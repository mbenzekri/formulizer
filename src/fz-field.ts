/* eslint-disable @typescript-eslint/no-explicit-any */
import { property } from "lit/decorators.js"
import { html, TemplateResult, PropertyValues } from "lit"
import { derefPointerData, isEmptyValue, isFunction, notNull, isArray, isNull, isString, getParentAndKey } from "./lib/tools"
import { Pojo } from "./lib/types"
import { FzForm,FzFormContext } from "./fz-form"
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

    protected context!:FzFormContext
    abstract renderField(): TemplateResult
    abstract toField(): void
    abstract toValue(): void

    protected localError?: string
    private _dofocus = false

    @property({ type: String, reflect: true }) accessor pointer = '/'
    @property({ type: Object }) accessor schema = EMPTY_SCHEMA

    //@property({ type: Object }) accessor data: any = {}
    //@property({ type: String }) accessor name: string | null = null
    // @property({ type: Number }) accessor index: number | null = null
    get data():any {
        const {parent} = getParentAndKey(this.pointer)
        return isNull(parent) ? undefined :  this.context?.at(parent)
    }
    get key(): string | number {
        return isNull(this.name) ? this.index ?? -1 : this.name
    }
    private i_name!: string | null 
    get name() {
        if (this.i_name !== undefined ) return this.i_name
        const segments = this.pointer?.split('/').slice(1) ?? []
        const last = segments.length === 0 ? '' : segments[segments.length - 1]
        this.i_name =  /^\d+$/.test(last) ? null : last;
        return this.i_name
    }
    private i_index!: number | null 
    get index() {
        if (this.i_index !== undefined ) return this.i_index
        const segments = this.pointer?.split('/').slice(1) ?? []
        const last = segments.length === 0 ? '' : segments[segments.length - 1]
        this.i_index = /^\d+$/.test(last) ? parseInt(last) : null
        return this.i_index
    }

    @property({ attribute:false}) accessor dirty = false
    @property({ attribute: false }) accessor i_collapsed = false
    @property({ attribute: false }) get errors(): string[] {
        if (!this.context) return []
        return this.localError ? [this.localError,...this.context.errors(this.pointer)] : this.context.errors(this.pointer)
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
        return this.dirty || this.context?.submitted
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
        if (isNull(this.pointer) || isNull(this.pointer)) return undefined
        return this.context.at(this.pointer)
        // Warning side effects is prohibited in this method, never update this.data 
        // if (this.data == null) return undefined
        // this is a known exception on side efect prohibition 
        // We need to initialise properties to 'undefined' if they are not present
        // if (this.name && !(this.name in this.data)) this.data[this.name] = undefined
        // return this.data[this.key]
    }
    set value(value: any) {
        if (value === this.value) return
        this.context.set(this.pointer,value,this.schema)
        this.dirty = true
        this.context?.check()
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

    /**
     * calculate label for this field
     */
    get label() {
        // user may decide to remove label (title == "")
        if (this.schema?.title === "") return ""
        // label for array items is an index poistion (one based)
        if (this.isitem) return String(this.index != null ? this.index + 1 : '-')
        // label for properties is title or default to property name
        return this.schema?.title ?? this.name ?? ""
    }
    /**
     * return true if this field is item of array, false otherwise
     */
    get isitem() {
        return notNull(this.index)
    }
    /**
     * return true if this field is property of object, false otherwise
     */
    get isproperty(): boolean {
        return notNull(this.name)
    }
    /**
     * calculate a visible boolean state for this field 
     */
    get visible() {
        return !!(this.evalExpr("visible") ?? true)
    }
    /**
     * calculate a required boolean state for this field 
     */
    get required() {
        if (!this.isproperty) return false
        return this.evalExpr("requiredIf") ?? false 
    }

    /**
     * calculate a readonly boolean state for this field 
     */
    get readonly(): boolean {
        if (isNull(this.context) || this.context.readonly) return true
        return this.evalExpr("readonly") ?? false 
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
            <label for="input" class="${this.isitem ? 'col-sm-1' : 'col-sm-3'} col-form-label" @click="${this.labelClicked}">
                <div>${ this.isitem ? this.badge(label) : label} </div>
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
        const form = this.queryClosest("fz-form") as FzForm
        this.context = form.context
        this.context.addField(this.schema.pointer, this.pointer, this)
    }

    override disconnectedCallback() {
        super.disconnectedCallback()
        this.context.removeField(this.schema.pointer, this.pointer)
        this.pointer = undefined as any
        this.schema = undefined as any
        this.dirty = undefined as any
        this._dofocus = undefined as any
        this.i_name = undefined as any
        this.i_index = undefined as any        
    }

    /**
     * before each update
     * - set queried focus 
     * @param changedProps changed properties 
     */
    override update(changedProps: any) {
        if (isFunction(this.schema?.dynamic))
            this.value = this.evalExpr("dynamic")

        super.update(changedProps)
        if (this._dofocus) {
            this._dofocus = false
            this.focus()
        }
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties)
        this.i_collapsed = ['allways','true'].includes(this.schema.collapsed) ? true : false
        if (this.isempty && isFunction(this.schema.initialize)) {
            this.evalExpr("initialize")
        }
        this.toField()
        this.context?.check()       
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
        let text = ""
        if (isNull(key)) {
            text = this.schema._abstract(this.derefFunc, this.context.appdata,this.value)
        } else {
            const schema = isString(key) ? this.schema.properties?.[key] : itemschema
            if (schema) {
                text = schema?._abstract(this.derefFunc, this.context.appdata,this.value[key])
            }
        }
        return text && text.length > 200 ? text.substring(0, 200) + '...' : (text ?? "")
    }

    evalExpr(attribute: keyof Schema, schema?: Schema, value?: Pojo, parent?: Pojo, key?: string | number) {
        return this.schema?._evalExpr(
            attribute, 
            schema ? schema : this.schema,
            schema ? value : this.value, 
            schema ? parent : this.data, 
            schema ? key ?? "": this.key,
            this.derefFunc,
            this.context.appdata)
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
            return derefPointerData(this.context.root, this.data, this.key, pointer)
        }
    }
    /**
     * this method must be call when global context detect form detects a 
     * tracked data had been change
     */
    trackedValueChange() {
        // actually only dynamic/initialize update directly the value ofther extension
        // keywords are called on demand
        if (isFunction(this.schema?.dynamic)) {
            this.value = this.evalExpr("dynamic")
            this.change()
        }
        this.requestUpdate()
    }
}
