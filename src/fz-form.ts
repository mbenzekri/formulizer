/* eslint-disable @typescript-eslint/no-explicit-any */
import { html } from "lit";
import { Base } from "./base"
import { property, customElement, state } from "lit/decorators.js";
import { IOptions, Pojo } from "./lib/types"
import { FzElement } from "./fz-element";
import { validateSchema, validateErrors, DataValidator } from "./lib/validation"
import { jsonAttributeConverter, cleanJSON, setGlobalHandler } from "./lib/tools"
import { SchemaCompiler, DataCompiler } from "./lib/compiler"
import { BlobMemory, IBlobStore, BlobStoreWrapper } from "./lib/storage";
import { IAsset } from "./inputs/fz-input-asset";



/**
 * @prop schema
 * @prop data
 */

@customElement("fz-form")
export class FzForm extends Base {

    static override get styles() {
        return [
            ...super.styles
        ]
    }

    @state() private accessor i_options: IOptions = {}
    @property({ type: Object, attribute: "schema", converter: jsonAttributeConverter }) accessor i_schema: Pojo = { type: 'object', properties: [] }
    @property({ type: Boolean, attribute: "actions" }) accessor actions = false
    @property({ type: Boolean, attribute: "readonly" }) accessor readonly = false
    @property({ type: Boolean, attribute: "checkin" }) accessor checkIn = false
    @property({ type: Boolean, attribute: "checkout" }) accessor checkOut = false
    @property({ type: String, attribute: 'oninit', converter: (v) => v }) oninit: string | null = null;
    @property({ type: String, attribute: 'onready', converter: (v) => v }) onready: string | null = null;
    @property({ type: String, attribute: 'onvaliddata', converter: (v) => v }) onvaliddata: string | null = null;
    @property({ type: String, attribute: 'oninvaliddata', converter: (v) => v }) oninvaliddata: string | null = null;
    @property({ type: String, attribute: 'onvalidate', converter: (v) => v }) onvalidate: string | null = null;
    @property({ type: String, attribute: 'ondismiss', converter: (v) => v }) ondismiss: string | null = null;
    @state() private accessor _errors: Array<any> | null = null

    private readonly obj = { content: {} }
    public store: IBlobStore = new BlobMemory()
    public asset!: IAsset
    private validator!: DataValidator
    private readonly dataPointerFieldMap: Map<string, FzElement> = new Map()
    private readonly schemaPointerFieldMap: Map<string, FzElement> = new Map()
    private message = ""

    constructor() {
        super()
            // this is a workaround to convert string with global function name into a handler
            // into corresponding event handler (quite deprecated)
            // ex: HTML: oninit="myFunc" became: this.addEventListener(myFunc)
            // because this cant be used in @property(...) declaration
            ;["oninit", "onready", "onvaliddata", "oninvaliddata", "onvalidate", "ondismiss"].forEach(event => {
                (this.constructor as any).elementProperties.get(event).converter =
                    (value: string) => { setGlobalHandler(this,event.substring(2), value); return value }
            })
    }

    get root(): any { return this.obj.content }
    get valid() {
        return this.validator?.validate(this.root) ?? false
    }

    get schema() { return this.i_schema }
    set schema(value: Pojo) {
        if (validateSchema(value)) {
            this.i_schema = JSON.parse(JSON.stringify(value))
            this.validator = new DataValidator(this.i_schema)
            if (this.valid) {
                this._errors = null
                this.message = ""
                this.compile()
                this.requestUpdate()
            } else {
                this._errors = validateErrors()
                this.message = "provided value for 'data' attribute doesn't conform to schema"
            }
        } else {
            this._errors = validateErrors()
            this.message = "provided data for 'schema' attribute is not a valid annotated JSON Schema."
        }
    }

    get options(): IOptions { return this.i_options }
    set options(value: IOptions) {
        this.i_options = value
        if (this.i_options?.storage) {
            this.store = new BlobStoreWrapper(this.i_options.storage)
        }
        if (this.i_options?.asset) {
            this.asset = this.i_options.asset;
        }
    }


    get data() { return cleanJSON(this.root) }
    set data(value: Pojo) {

        if (!this.validator) {
            // we do not have a valid JSON Schema unable to work
            this.message = "Unable to accept data because provided JSON Schema is not valid."
            return
        }

        if (this.checkIn && !this.validator.validate(value)) {
            // data must be valid (checkin true)
            this._errors = this.validator?.errors() || null
            this.message = "provided data is not conform to schema (checkin activated)"
            return
        }

        // data accepted without validation (checkin false)
        this.message = ""
        this._errors = null
        this.obj.content = value
        this.compile()
        this.requestUpdate()
    }


    override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === 'schema') {
            // Utilise le converter instance-spécifique pour convertir l'attribut
            const converted = jsonAttributeConverter.fromAttribute(newValue) as Pojo
            this.schema = converted
        }
    }

    override render() {
        return !this._errors?.length ? this.renderForm() : this.renderError()
    }

    private renderForm() {
        return html`
            ${Array.isArray(this.root)
                ? html`<fz-array pointer="#" name="content"  .data="${this.obj}" .schema="${this.schema}"></fz-array>`
                : html`<fz-object  pointer="#" name="content" .data="${this.obj}" .schema="${this.schema}"></fz-object>`
            }
            ${this.renderButtons()}`
    }

    private renderButtons() {
        if (!this.actions) return null
        return html`
            <hr>
            <div class="d-grid gap-2 d-sm-block justify-content-md-end">
                <button class="btn btn-primary" type="button" @click=${this.confirm}>Ok</button>
                <button class="btn btn-danger" type="button" @click=${this.cancel} >Cancel</button>
            </div>`
    }

    private renderError() {
        return html`
            Error(s): 
            <hr>
            <p class="error-message"> ${this.message}</p>
            <pre><ol>${this._errors?.map(error => html`<li>Dans la propriété : ${(error.dataPath == undefined) ? error.instancePath : error.dataPath} : ${error.keyword} ➜ ${error.message}</li>`)}
            </ol></pre>`
    }

    override connectedCallback() {
        super.connectedCallback()
        this.listen(this, 'observed-changed', (e: Event) => this.observedChange(e))
        this.dispatchEvent(new CustomEvent('init'))
    }
    override disconnectedCallback() {
        super.disconnectedCallback()
        this.removeEventListener('observed-changed', (e) => this.observedChange(e))
    }


    addField(schemaPointer: string, dataPointer: string, field: FzElement) {
        this.schemaPointerFieldMap.set(schemaPointer, field)
        this.dataPointerFieldMap.set(dataPointer, field)
    }
    removeField(schemaPointer: string, dataPointer: string) {
        this.schemaPointerFieldMap.delete(schemaPointer)
        this.dataPointerFieldMap.delete(dataPointer)
    }
    getfieldFromSchema(pointer: string) {
        return this.schemaPointerFieldMap.get(pointer)
    }
    getfieldFromData(pointer: string) {
        return this.dataPointerFieldMap.get(pointer)
    }
    updateField(pointer: string) {
        this.getfieldFromData(pointer)?.requestUpdate()
    }

    /**
     * handle 'observed-change' event for change detection and update
     * between observers and observed data
     * @param evt 
     * @returns 
     */
    private observedChange(evt: Event) {
        if (this === evt.composedPath()[0]) return
        const observers: string[] = (evt as CustomEvent).detail.observers
        observers.forEach(pointer => {
            const field = this.getfieldFromSchema(pointer)
            field?.requestUpdate()
        })
    }
    private confirm(evt: Event) {
        evt.preventDefault()
        evt.stopPropagation()
        const event = new CustomEvent('validate');
        this.dispatchEvent(event);
    }
    private cancel(evt: Event) {
        evt.preventDefault()
        evt.stopPropagation()
        const event = new CustomEvent('dismiss');
        this.dispatchEvent(event);
    }
    compile() {

        // All schema compilation are fatal (unable to build the form)
        const schema_compiler = new SchemaCompiler(this.schema, this.options, this.obj.content)
        const schema_errors = schema_compiler.compile()
        if (schema_errors.length > 0) {
            this.message = `Schema compilation failed: \n    - ${schema_errors.join('\n    - ')}`
            console.error(this.message)
            return
        }

        // Data compilation never fail otherwise it's a bug to fix
        const data_compiler = new DataCompiler(this.obj.content, this.schema)
        const data_errors = data_compiler.compile()
        if (data_errors.length > 0) {
            this.message = `Data compilation failed: \n    - ${data_errors.join('\n    - ')}`
            console.error(this.message)
        }
        this.dispatchEvent(new CustomEvent('ready'))
    }

}