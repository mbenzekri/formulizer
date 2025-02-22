/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement } from "lit";
import { property, customElement, state } from "lit/decorators.js";
import { bootstrapCss } from "./bootstrap"
import { bootstrapIconsCss } from "./bootstrap-icons"
import { Pojo } from "./types"
import { FzElement } from "./fz-element";
import { validateSchema, validateErrors, DataValidator, getSchema, jsonAttributeConverter } from "./tools"
import { SchemaCompiler, DataCompiler } from "./compiler"
import { BlobCache, IBlobStore, BlobStoreWrapper } from "./storage";
import { IAsset } from "./fz-asset";
import "./fz-array";
import "./fz-asset";
import "./fz-boolean";
import "./fz-constant";
import "./fz-date";
import "./fz-datetime";
import "./fz-document";
import "./fz-enum";
import "./fz-enum-array";
import "./fz-element";
import "./fz-geolocation";
import "./fz-integer";
import "./fz-markdown";
import "./fz-enum-check";
import "./fz-float";
import "./fz-object";
import "./fz-range";
import "./fz-signature";
import "./fz-string";
import "./fz-textarea";
import "./fz-time";
import "./fz-enum-typeahead";
import "./fz-uuid";

import "./dialog";
import "./fz-barcode-dlg";
import "./fz-photo-dlg";
import "./fz-item-dlg";

/**
 * @prop schema
 * @prop data
 */

@customElement("fz-form")
export class FzForm extends LitElement {

    @property({ type: Object, attribute: "schema", converter: jsonAttributeConverter }) accessor i_schema: Pojo = { type: 'object', properties: [] }
    @state() private accessor i_options: any = {}
    @state() private accessor obj = { content: {} }
    get root() : any { return this.obj.content } 
    @property({ type: String, attribute: "submit-label" }) accessor submitlabel = "Ok"
    @property({ type: String, attribute: "cancel-label" }) accessor cancellabel = "Cancel"
    @property({ type: Boolean, attribute: "buttons-visible" }) accessor buttonsVisible = false
    @property({ type: String, attribute: "id-data" }) accessor idData = ""
    @property({ type: Boolean, attribute: "readonly" }) accessor readonly = false
    @property({ type: Boolean, attribute: "not-validate" }) accessor notValidate = false

    public store: IBlobStore = new BlobCache("FZ-FORM")
    public asset?: IAsset
    private validator?: DataValidator

    override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === 'schema') {
          // Utilise le converter instance-spécifique pour convertir l'attribut
          const converted = jsonAttributeConverter.fromAttribute(newValue) as Pojo
          this.schema = converted
        }
    }

    get schema() { return this.i_schema }
    set schema(value: Pojo) {
        if (validateSchema(value)) {
            this.i_schema = JSON.parse(JSON.stringify(value))
            this.validator = new DataValidator(this.i_schema)
            if (this.validator.validate(this.obj.content)) {
                this._errors = null
                this.message = ""
                this.compile()
                this.requestUpdate()
            } else {
                this._errors = validateErrors()
                this.message = "L'attribut 'data' n'est plus valide vis à vis du schema"
            }
        } else {
            this._errors = validateErrors()
            this.message = "L'attribut 'schema' n'est pas un JSON Schema Form valide."
        }
    }

    get options() { return this.i_options }
    set options(value: any) {
        this.i_options = value
        if (this.i_options?.storage) {
            this.store = new BlobStoreWrapper(this.i_options.storage)
        }
        if (this.i_options?.asset) {
            this.asset = this.i_options.asset;
        }
    }

    @state()
    private accessor _errors: Array<any> | null = null

    get data() {

        // patch nullable pour ne pas rendre d'objet sans propriété ou de tableau vide 
        // remplacement par null ou undefined
        const  replacer = function( this: any, name:string, value:any) {
            const schema = getSchema(value)
            const pschema = getSchema(this)
            if (pschema?.properties?.[name]?.transient) return undefined
            if (schema && Array.isArray(value) && value.length === 0) {
                return schema.nullAllowed ? null : undefined
            }
            if (schema && value != null && typeof value === "object" && Object.keys(value).every(key => value[key] == null)) {
                return schema.nullAllowed ? null : undefined
            }
            return value;
        }
        const jsonstr = JSON.stringify(this.obj.content,replacer)
        const jsonobj = jsonstr == null ? null : JSON.parse(jsonstr)
        return jsonobj
    }

    set data(value: Pojo) {
        if (!this.validator) {
            this.message = "L'attribut 'schema' n'est pas un JSON Schema Form valide."
            return
        }
        else {
            if (!this.notValidate && !this.validator.validate(value)) {
                this._errors = this.validator?.errors() || null
                this.message = "L'attribut 'data' n'est pas un JSON valide vis à vis de l'attribut schema."
            } else {
                this.message = ""
                this._errors = null
                this.obj.content = value
                this.compile()
                this.requestUpdate()
            }
        }

    }

    get valid() {
        if (!this.validator) return false
        return this.validator.validate(this.obj.content)
    }

    private dataPointerFieldMap: Map<string, FzElement> = new Map()
    private schemaPointerFieldMap: Map<string, FzElement> = new Map()
    private message = ""
    private observedChangedHandler: (e: Event) => void

    constructor() {
        super()
        this.observedChangedHandler = this.observedChange.bind(this)
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

    static override get styles() {
        return [
            bootstrapCss,
            bootstrapIconsCss
        ]
    }
    override render() {
        return html`
            ${!this._errors
                ? html`
                    ${Array.isArray(this.obj.content)
                        ? html`<fz-array pointer="#" name="content"  .data="${this.obj}" .schema="${this.schema}"></fz-array>`
                        : html`<fz-object  pointer="#" name="content" .data="${this.obj}" .schema="${this.schema}"></fz-object>`
                    }
                    ${!this._errors && this.buttonsVisible
                        ? html`<hr><div class="d-flex justify-content-end">
                            <button type="button"  @click="${this.confirm}" class="btn btn-primary">${this.submitlabel}</button> 
                            <button type="button"  @click="${this.cancel}" class="btn btn-danger">${this.cancellabel}</button>
                        </div>`
                        : html``
                    }`
                : html`Error(s): <hr><p class="error-message"> ${this.message}</p><pre><ol>
                ${this._errors.map(error => html`<li>Dans la propriété : ${(error.dataPath == undefined) ? error.instancePath : error.dataPath} : ${error.keyword} ➜ ${error.message}</li>`)}</ol></pre>`
            }`
    }

    override connectedCallback() {
        super.connectedCallback()
        this.addEventListener('observed-changed', this.observedChangedHandler )
    }
    override disconnectedCallback() {
        super.disconnectedCallback()
        this.removeEventListener('observed-changed', this.observedChangedHandler)
    }


    confirm(evt: Event) {
        const event = new CustomEvent('submit', {
            detail: {
                data: this.data,
                schema: this.schema
            }
        });
        this.dispatchEvent(event);
        evt.preventDefault()
        evt.stopPropagation()
    }
    cancel(evt: Event) {
        const event = new CustomEvent('cancel', {
            detail: {
                data: this.data,
                schema: this.schema
            }
        });
        this.dispatchEvent(event);
        evt.preventDefault()
        evt.stopPropagation()
    }
    compile() {
        try {
            const schema_compiler = new SchemaCompiler(this.schema,this.options,this.obj.content)
            const errors = schema_compiler.compile()
            if (errors.length > 0) {
                this.message = `Schema compilation failed: \n ${errors.join('\n    - ')}`
            }
            const data_compiler = new DataCompiler(this.obj.content, this.schema)
            data_compiler.compile()
        }
        catch (e) {
            this._errors = []
            this.message = `Schema compilation failed: ${String(e)}`
        }
    }

    /**
     * handle 'observed-change' event for change detection and update
     * between observers and observed data
     * @param evt 
     * @returns 
     */
    observedChange(evt: Event) {
        if (this === evt.composedPath()[0]) return
        const observers: string[] = (evt as CustomEvent).detail.observers
        observers.forEach(pointer => {
            const field = this.getfieldFromSchema(pointer)
            field?.requestUpdate()
        })
    }

}