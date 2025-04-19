/* eslint-disable @typescript-eslint/no-explicit-any */
import { property } from "lit/decorators.js"
import { html, TemplateResult, PropertyValues } from "lit"
import { derefPointerData, isEmptyValue, isFunction, notNull, isArray, isNull, isString, getParentAndKey, when } from "./lib/tools"
import { Pojo } from "./lib/types"
import { FzForm, FzFormContext } from "./fz-form"
import { Base } from "./base"
import { EMPTY_SCHEMA, Schema } from "./lib/schema"
import { classMap } from "lit/directives/class-map.js"
import { FzTrackEvent, FzUpdateEvent } from "./lib/events"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
export abstract class FzField extends Base {

    abstract renderField(): TemplateResult
    abstract toField(): void
    abstract toValue(): void

    protected context!: FzFormContext
    protected localErrors: Set<string> = new Set()
    private _dofocus = false
    private i_key?: string | number

    @property({ type: String, reflect: true }) accessor pointer = '/'
    @property({ type: Object }) accessor schema = EMPTY_SCHEMA
    @property({ attribute: false }) accessor dirty = false
    @property({ attribute: false }) accessor i_collapsed = false
    @property({ attribute: false }) get errors(): string[] {
        if (!this.context) return []
        return [...this.localErrors, ...this.context.errors(this.pointer)]
    }

    /** return local Errors */
    validate() {
        this.localErrors.clear()
        if (this.value === undefined && this.required && !this.context.errors(this.pointer).includes("required")) {
            this.localErrors.add("required")
        }
    }

    /** true if this field is rendering root data (no parent) */
    get isroot() { return this.schema.parent == null }

    /** property name of this field in parent object data */
    get name() { return isString(this.key) ? this.key : undefined }

    /** index position name of this field in parent array data */
    get index() { return isString(this.key) ? undefined : this.key }

    /** true if data is conforming to this.schema  */
    get valid() { return this.errors.length === 0 && this.localErrors.size == 0 }

    /** true if data not conforming to this.schema  */
    get invalid() { return this.errors.length > 0 || this.localErrors.size > 0 }

    /** return true if field is really modified (dirty) or already submited by user */
    get touched() { return this.dirty || this.context?.submitted }

    /** return enpty value for this field */
    get empty() { return this.schema._empty() }

    /** true if this.value is empty (see emptiness chapter) */
    get isempty() { return isEmptyValue(this.value) }

    /** true if field is item of array, false otherwise */
    get isitem() { return notNull(this.index) }

    /** return true if field is property of object, false otherwise */
    get isproperty() { return notNull(this.name) }

    /** true if field is visible false otherwise (dynamic keyword 'visible') */
    get visible() { return Boolean(this.evalExpr("visible") ?? true) }

    /** get parent data */
    get parent(): any {
        const { parent } = getParentAndKey(this.pointer)
        return isNull(parent) ? undefined : this.context?.at(parent)
    }

    /** get key (property name or index of array) of this field */
    get key(): string | number {
        if (this.i_key === undefined) {
            const {key } = getParentAndKey(this.pointer)
            this.i_key = key ?? ''
        }
        return this.i_key
    }

    /** get data value for this field */
    get value(): any {
        if (isNull(this.pointer) || isNull(this.pointer)) return undefined
        return this.context.at(this.pointer)
    }

    /** set data value for this field */
    set value(value: any) {
        if (value === this.value) return
        this.context.set(this.pointer, value, this.schema)
        this.dirty = true
        this.context?.check()
    }

    /** true if this field is collapsed */
    get collapsed(): boolean {
        if (this.schema.collapsed == "never") return false
        if (this.schema.collapsed == "allways") return true
        return this.i_collapsed
    }
    /** set collapsed state for this field (note!: may not change if never or allways) */
    set collapsed(value: boolean) {
        if (["never", "allways"].includes(String(this.schema.collapsed))) return
        this.i_collapsed = value
    }

    /** toggle collapsed field state (note!: may not change if never or allways) */
    toggleCollapsed(evt: Event) {
        if (["never", "allways"].includes(String(this.schema.collapsed))) return
        if (this.isroot) { this.i_collapsed = false }
        else this.i_collapsed = !this.i_collapsed
        this.eventStop(evt)
        this.requestUpdate()
    }

    /** get validation classMap to render child validation uniformly */
    get validation() {
        return classMap({
            "is-valid": this.touched && this.valid,
            "is-invalid": this.touched && this.invalid
        })
    }


    /** check if field is nullable */
    get nullable() {
        if (this.schema.type === "null") return true
        if (isArray(this.schema.type) && this.schema.type.includes("null")) return true
        return this.schema.nullAllowed
    }

    /** calculate label for this field */
    get label() {
        if (this.schema?.title === "") return ""                                    // removed by user
        if (this.isitem) return String(notNull(this.index) ? this.index + 1 : '-')  // index in array
        return this.schema?.title ?? this.name ?? ""                                // propety in object 
    }

    /** true if field is require false otherwise (dynamic keyword 'requiredIf' + 'required') */
    get required() {
        if (!this.isproperty) return false
        return this.evalExpr("requiredIf") ?? false
    }

    /** true if field is readonly false otherwise (dynamic keyword 'readonly') */
    get readonly(): boolean {
        if (isNull(this.context) || this.context.readonly) return true
        return Boolean(this.evalExpr("readonly"))
    }

    /** call for focus on next update for field */
    dofocus() { this._dofocus = true }

    /** overridable method when focusout need to be managed by field */
    focusout(_evt: Event) { /*  dont forget to call super.focusout(evt) */ }

    // Rendering methods & heplers 
    // ---------------

    /** render method for this field component */
    override render() {
        if (!this.visible) return ''
        this.toField()
        return html`<div class="space-before" @focusout="${this.focusout}" >${this.renderField()}</div>`
    }

    /** render method for this field errors */
    protected renderErrors() {
        let toggle = true
        return when(this.touched && this.invalid,
            html`
            <span 
                class="error-message error-truncated ${classMap({ 'error-truncated': toggle })}" 
                @click="${() => toggle = !toggle}"
            >
                ${this.errors.join(', ')}
            </span>`)
    }

    /** render method for label */
    protected renderLabel() {

        // the user may choose not to show label  
        if (this.label === "") return html``
        const label = `${this.label}${this.required ? '*' : ''}`
        // for array items => badge index / for object property => label
        return html`
            <label for="input" class="${this.isitem ? 'col-sm-1' : 'col-sm-3'} col-form-label" @click="${this.labelClicked}">
                <div>${this.isitem ? this.badge(label) : label} </div>
            </label>`
    }

    protected renderChevron() {
        if (["allways", "never"].includes(String(this.schema.collapsed))) return ''
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
        this.i_key = undefined as any
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
        this.i_collapsed = ['allways', 'true'].includes(String(this.schema.collapsed)) ? true : false
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
     * - triggers needed change events for update and trackers
     */
    protected change() {
        // changed occurs evaluate change keyword extension
        this.toValue()
        this.evalExpr("change")

        // signal field update for ascendant
        this.dispatchEvent(new FzUpdateEvent(this.parent,this.schema,this))

        // signal field update for trackers
        if (isArray(this.schema.trackers,true)) {
            this.dispatchEvent(new FzTrackEvent(this.schema.trackers, this.schema, this))
            const logger = FzLogger.get("data-update", { field: this, schema: this.schema })
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
            text = this.schema._abstract(this.derefFunc, this.context.appdata, this.value)
        } else {
            const schema = isString(key) ? this.schema.properties?.[key] : itemschema
            if (schema) {
                text = schema?._abstract(this.derefFunc, this.context.appdata, this.value[key])
            }
        }
        return text && text.length > 200 ? text.substring(0, 200) + '...' : (text ?? "")
    }

    evalExpr(attribute: keyof Schema, schema?: Schema, value?: Pojo, parent?: Pojo, key?: string | number) {
        return this.schema?._evalExpr(
            attribute,
            schema ? schema : this.schema,
            schema ? value : this.value,
            schema ? parent : this.parent,
            schema ? key ?? "" : this.key,
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
            return derefPointerData(this.context.root, this.parent, this.key, pointer)
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
