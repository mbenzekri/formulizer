/* eslint-disable @typescript-eslint/no-explicit-any */
import { html } from "lit";
import { Base } from "./base"
import { property, customElement, state } from "lit/decorators.js";
import { IAsset, IOptions, Pojo } from "./lib/types"
import { FzElement } from "./fz-element";
import { validateSchema, validateErrors, DataValidator } from "./lib/validation"
import { cleanJSON, setGlobalHandler } from "./lib/tools"
import { SchemaCompiler, DataCompiler } from "./lib/compiler"
import { BlobMemory, IBlobStore, BlobStoreWrapper } from "./lib/storage";
import { Schema, schemaAttrConverter, DEFAULT_SCHEMA } from "./lib/schema";



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
    @property({ type: Object, attribute: "schema", converter: schemaAttrConverter }) accessor i_schema = DEFAULT_SCHEMA
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

    private readonly obj = { content: {} }
    public store: IBlobStore = new BlobMemory()
    public asset!: IAsset
    private readonly dataPointerFieldMap: Map<string, FzElement> = new Map()
    private readonly schemaPointerFieldMap: Map<string, FzElement> = new Map()

    private schemaErrors: Array<any> = []
    private dataErrors: Array<any> = []
    private validator!: DataValidator
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
    set schema(value: Schema) {
        this.i_schema = validateSchema(value) ? new Schema(JSON.parse(JSON.stringify(value))) : DEFAULT_SCHEMA
        this.schemaErrors = validateErrors()
        this.validator = new DataValidator(this.i_schema)
        this.compile()
        this.requestUpdate()
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
        // dont accept data before having a valid JSON
        if (this.schemaErrors.length > 0)  return
        // data must be valid (if checkin option is true)
        this.dataErrors = this.checkIn && this.validator.validate(value) ? this.validator?.errors() ?? []  : []
        this.obj.content = this.dataErrors.length == 0 ? value : {}
        this.compile()
        this.requestUpdate()
    }

    override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === 'schema') {
            // Utilise le converter instance-spécifique pour convertir l'attribut
            const converted = schemaAttrConverter.fromAttribute(newValue)
            this.schema = converted
        }
    }

    override render() {
        const failed = this.schemaErrors.length > 0 || this.dataErrors.length > 0
        return failed ? this.renderError() : this.renderForm() 
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
        const formatError = (e:any) =>
            html`<li>property : ${(e.dataPath == undefined) ? e.instancePath : e.dataPath} : ${e.keyword} ➜ ${e.message}</li>`
        return [ 
            html`<hr>`,
            this.schemaErrors.length ? html`<pre><ol> Schema errors : ${this.schemaErrors.map(formatError)} </ol></pre>` : html``,
            this.dataErrors.length ? html`<pre><ol> Data errors : ${this.dataErrors.map(formatError)} </ol></pre>` : html``
        ]
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