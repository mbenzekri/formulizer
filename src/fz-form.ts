/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, PropertyValues } from "lit";
import { Base } from "./base"
import { property, customElement } from "lit/decorators.js";
import { IAsset, IOptions, IS_VALID, NOT_TOUCHED, Pojo } from "./lib/types"
import { FzField } from "./fz-element";
import { validateSchema, validateErrors, Validator } from "./lib/validation"
import { isBoolean, setGlobalHandler } from "./lib/tools"
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

    private readonly obj = { content: {} as Pojo }
    private accessor i_options: IOptions = {}
    public store: IBlobStore = new BlobMemory()
    public asset!: IAsset
    private readonly fieldMap: Map<string, FzField> = new Map()
    private readonly schemaMap: Map<string, FzField> = new Map()

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

    
    private schemaErrors: Array<any> = []
    private dataErrors: Array<any> = []
    private validator!: Validator
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
        this.i_schema.collapsed = false 
        this.schemaErrors = validateErrors()
        this.validator = new Validator(this.i_schema)
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


    get data() { return JSON.parse(JSON.stringify(this.root)) }
    set data(value: Pojo) {
        // dont accept data before having a valid JSON
        if (this.schemaErrors.length > 0)  return
        // data must be valid (if checkin option is true)
        this.dataErrors = this.checkIn && this.validator.validate(value) ? this.validator?.errors ?? []  : []
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

    public getField(pointer: string) {
        return this.fieldMap.get(pointer)
    }
    addField(schemaPointer: string, dataPointer: string, field: FzField) {
        this.schemaMap.set(schemaPointer, field)
        this.fieldMap.set(dataPointer, field)
    }
    removeField(schemaPointer: string, dataPointer: string) {
        this.schemaMap.delete(schemaPointer)
        this.fieldMap.delete(dataPointer)
    }
    getfieldFromSchema(pointer: string) {
        return this.schemaMap.get(pointer)
    }
    updateField(pointer: string) {
        this.getField(pointer)?.requestUpdate()
    }

    override render() {
        const failed = this.schemaErrors.length > 0 || this.dataErrors.length > 0
        return failed ? this.renderError() : this.renderForm() 
    }

    private renderForm() {
        return html`
            ${Array.isArray(this.root)
                ? html`<fz-array pointer="" name="content"  .data="${this.obj}" .schema="${this.schema}"></fz-array>`
                : html`<fz-object  pointer="" name="content" .data="${this.obj}" .schema="${this.schema}"></fz-object>`
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
        this.listen(this, 'data-updated', (e: Event) => this.handleDataUpdate(e))
        this.dispatchEvent(new CustomEvent('init'))
    }
    override disconnectedCallback() {
        super.disconnectedCallback()
        this.removeEventListener('data-updated', (e) => this.handleDataUpdate(e))
    }
    protected override firstUpdated(changedProperties: PropertyValues): void {
        // this is an unused callback actually (needed only for breakpoints)
        super.firstUpdated(changedProperties)
        null;
    }

    check() {
        // collect errors and dispatch error on fields (registered in this.fieldMap)
        const errorMap = new Map<string,string[]>()
        const valid = this.validator?.validate(this.root)
        if (isBoolean(valid) && !valid) {
            for (const error of this.validator.errors) {
                let { instancePath, message, params, keyword } = error;
                instancePath =`/${instancePath}`
                // required applies to object must down the error to child
                if (keyword === "required") {
                    instancePath = `${instancePath === '/' ? '' : ''}/${params.missingProperty}`
                    message = "required"
                }
                if (!errorMap.has(instancePath)) errorMap.set(instancePath,[])
                //const detail =Object.entries(params).map(([s,v]) => v == null ? null : `${s}: ${v}`).filter(v => v).join(',')
                errorMap.get(instancePath)?.push(message ?? "unidentified error")
            }
        }

        // dispatch all errors over the fields 
        for (const [pointer,field] of this.fieldMap.entries()) {
            // if field is not touched (not manually updated) valid/invalid not displayed
            if (field.errors != NOT_TOUCHED) {
                field.errors =  errorMap.get(pointer) ?? IS_VALID
                // console.log(`VALIDATION: ${field.pointer} -> ${field.errors === IS_VALID ? "Y" : "N" }`)
            }
        }
    }
    /**
     * 'data-updated' event handler for data change. 
     * It applies a field.requestUpdate() on each traker associated FzField
     */
    private handleDataUpdate(evt: Event) {
        if (this === evt.composedPath()[0]) return
        const trackers: string[] = (evt as CustomEvent).detail.trackers
        trackers.forEach(pointer => {
            const field = this.getfieldFromSchema(pointer)
            // TBD with options => console.log(`TRACKER ${field?.pointer} refreshed`)
            field?.trackedValueChange()
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
    private compile() {

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

    debug(pointer: string) {
        const field = this.fieldMap.get(pointer);
        if (!field) throw new Error(`No field found for pointer: ${pointer}`);
        if (!field.data || !field.key) throw new Error(`Field at ${pointer} has no parent/key`);
    
        const obj = field.data;
        const key = field.key;
        let value = obj[key];
    
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set(newValue) {
                console.debug(`Formulizer watchPointer: ${pointer} (${key}) changed from`, value, "to", newValue);
                debugger;
                value = newValue;
            },
            configurable: true,
            enumerable: true
        });
    }

}