/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, PropertyValues } from "lit"
import { Base } from "./base"
import { property, customElement } from "lit/decorators.js";
import { IAsset, IOptions, Pojo } from "./lib/types"
import { FzField } from "./fz-field";
import { DefaultValidator, Validator } from "./lib/validation"
import { SchemaCompiler, DataCompiler } from "./lib/compiler"
import { BlobMemory, IBlobStore, BlobStoreWrapper } from "./lib/storage";
import { Schema, schemaAttrConverter, DEFAULT_SCHEMA } from "./lib/schema";
import { FzMarkdownIt } from "./components/markdown-it";
import { getDataAtPointer, getParentAndKey, isNull, isString, newValue } from "./lib/tools";

/**
 * Form Context is provided from FzForm to all descendant sub-FzField as an API
 * to access global form shared data and methods 
 */
export type FzFormContext = {
    readonly root: any
    readonly submitted: boolean
    readonly readonly: boolean
    readonly appdata: any
    readonly asset: IAsset
    readonly store: IBlobStore
    readonly at:(from:string,to?:string) => any
    readonly set:(pointer: string, value: any, schema: Schema) => void
    readonly errors:(pointer: string) => string[]
    readonly check: () => void
    readonly getField: (pointer: string) => FzField | undefined
    readonly addField: (schemaPointer: string, dataPointer: string, field: FzField) => void,
    readonly removeField: (schemaPointer: string, dataPointer: string) => void
    readonly updateField: (pointer: string) => void
}

@customElement("fz-form")
export class FzForm extends Base {

    static override get styles() {
        return [...super.styles]
    }

    private readonly i_root = { content: {} as Pojo }
    private i_options: IOptions = { dialect: "draft-07", userdata: undefined}
    public store: IBlobStore = new BlobMemory()
    public asset!: IAsset
    private readonly fieldMap: Map<string, FzField> = new Map()
    private readonly schemaMap: Map<string, FzField> = new Map()
    private errorMap: Map<string, string[]> = new Map()
    public submitted = false

    @property({ type: Boolean, attribute: "bootstrap" }) bootstrap = false
    @property({ type: Boolean, attribute: "useajv" }) useAjv = false
    @property({ type: Boolean, attribute: "usemarkdown" }) useMarkdown = false
    @property({ type: Object, attribute: "schema", converter: schemaAttrConverter }) accessor sourceSchema = DEFAULT_SCHEMA
    @property({ type: Boolean, attribute: "actions" }) accessor actions = false
    @property({ type: Boolean, attribute: "readonly" }) accessor readonly = false
    @property({ type: Boolean, attribute: "checkin" }) accessor checkIn = false

    private compiledSchema = DEFAULT_SCHEMA
    private validator: Validator = new DefaultValidator(DEFAULT_SCHEMA)
    private message = ""

    // @ts-ignore
    public get context(): FzFormContext {
        const that = this
        return {
            get root() { return that.root },
            get submitted() { return that.submitted },
            get readonly() { return that.readonly },
            get appdata() { return that.options?.userdata },
            get asset() { return that.asset },
            get store() { return that.store },
            at(from: string, to?: string) {
                return that.at(from,to)
            },
            set(pointer: string, value: any, schema: Schema) {
                that.setValue(pointer,value,schema)
            },
            check() { that.check() },
            errors(pointer?: string) { return that.errors(pointer)},
            getField(pointer: string) { return that.fieldMap.get(pointer) },
            addField(schemaPointer: string, dataPointer: string, field: FzField) { 
                that.schemaMap.set(schemaPointer, field)
                that.fieldMap.set(dataPointer, field)
            },
            removeField(schemaPointer: string, dataPointer: string) { 
                that.schemaMap.delete(schemaPointer)
                that.fieldMap.delete(dataPointer)
            },
            updateField(pointer: string) { 
                that.fieldMap.get(pointer)?.requestUpdate()
            }

        }
    }

    private at(from: string,to?:string) {
        return getDataAtPointer(this.root,from,to)
    }
    get root(): any { return this.i_root.content }
    get valid() {
        this.validator.validate(this.root) 
        this.errorMap =this.validator.map
        return  this.validator.valid
    }

    get schema() { return this.compiledSchema }
    set schema(newSchema: Schema) {
        this.validator = Validator.getValidator(newSchema)
        if (this.validator.schemaValid) {
            this.sourceSchema = new Schema(JSON.parse(JSON.stringify(newSchema)))
            this.compiledSchema = new Schema(JSON.parse(JSON.stringify(newSchema)))
        } else {
            this.sourceSchema = new Schema(JSON.parse(JSON.stringify(DEFAULT_SCHEMA)))
            this.compiledSchema = new Schema(JSON.parse(JSON.stringify(DEFAULT_SCHEMA)))
            this.validator = Validator.getValidator(this.sourceSchema)
        }
        this.compile()
        this.compiledSchema.collapsed = "never"
        this.fieldMap.clear()
        this.schemaMap.clear()
        this.requestUpdate()
    }

    get options(): IOptions { return this.i_options }
    set options(value: IOptions) {
        this.i_options = { dialect: value?.dialect ?? "draft-07", userdata: value?.userdata } 
        if (this.i_options?.storage) {
            this.store = new BlobStoreWrapper(this.i_options.storage)
        }
        if (this.i_options?.asset) {
            this.asset = this.i_options.asset;
        }
    }


    get data() { return JSON.parse(JSON.stringify(this.root)) }
    set data(value: Pojo) {
        // dont accept data before having a valid Schema
        if (!this.validator.schemaValid) return
        const valid = this.valid
        if (!valid && this.checkIn) {
            // TBD data must be valid (if checkin option is true)
            null;
        }
        this.i_root.content = value
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
        if (name === 'bootstrap') {
            FzForm.loadBootstrap()
        }
        if (name === 'useajv') {
                Validator.loadValidator(this.useAjv)
            .then(() => { 
                // reset the validator to replace by new loaded one
                this.validator = Validator.getValidator(this.sourceSchema)
                this.check()
            })
            .catch((e) => console.error(`VALIDATION: Validator loading fails due to ${e}`))    
        }
        if (name === 'usemarkdown') {
            FzMarkdownIt.loadMarkdownIt(this.useMarkdown)
            .then(() => null )
            .catch((e) => console.error(`MARKDOWN: MarkdownIt loading fails due to ${e}`))    
        }
    }

    override render() {
        if (!Base.isBootStrapLoaded()) return 'Bootstrap not loaded...'
        return this.validator.schemaValid ? this.renderForm() : this.renderError()
    }

    private renderForm() {
        return html`
            ${this.schema.basetype == "array"
                ? html`<fz-array pointer="" .schema="${this.schema}"></fz-array>`
                : html`<fz-object  pointer="" .schema="${this.schema}"></fz-object>`
            }
            ${this.renderButtons()}`
    }

    private renderButtons() {
        if (!this.actions) return null
        return html`
            <div class="d-flex justify-content-end gap-2" style="margin-top: 1em">
                <button class="btn btn-primary" type="button" @click=${this.confirm}>Ok</button>
                <button class="btn btn-danger" type="button" @click=${this.cancel} >Cancel</button>
            </div>`
    }

    private renderError() {
        if (this.validator.schemaValid && this.validator?.valid) return html``
        const formatError = (e: any) =>
            html`<li>property : ${(e.dataPath == undefined) ? e.instancePath : e.dataPath} : ${e.keyword} ➜ ${e.message}</li>`
        return [
            html`<hr>`,
            !this.validator.schemaValid ? html`<pre><ol> Schema errors : ${this.validator.schemaErrors.map(formatError)} </ol></pre>` : html``,
            !this.validator.valid ? html`<pre><ol> Data errors : ${this.validator.errors.map(formatError)} </ol></pre>` : html``
        ]
    }

    errors(pointer?:string): string[] {
        if (isNull(pointer)) return [...this.errorMap.values()].flat()
        return this.errorMap.get(pointer) ?? []
    }

    override connectedCallback() {
        super.connectedCallback()
        this.listen(this, 'data-updated', (e: Event) => this.handleDataUpdate(e as CustomEvent))
        this.dispatchEvent(new CustomEvent('init'))
    }
    override disconnectedCallback() {
        super.disconnectedCallback()

        // this.i_root = {}
        this.i_options = undefined as any
        this.store= undefined as any
        this.asset= undefined as any
        this.fieldMap.clear()
        this.schemaMap.clear()
    
        this.useAjv = undefined as any
        this.useMarkdown = undefined as any
        this.sourceSchema = DEFAULT_SCHEMA
        this.actions = undefined as any
        this.readonly = undefined as any
        this.checkIn = undefined as any
    
        this.compiledSchema = undefined as any
        this.validator = undefined as any
        this.message = undefined as any
    
    }
    protected override async firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties)
        this.check();
    }

    check() {
        // collect errors and trigger valid/invalid event 
        const validated = this.valid 
        const event =  new CustomEvent(validated ? "data-valid" : "data-invalid")
        this.dispatchEvent(event);
    }
    /**
     * 'data-updated' event handler for data change. 
     * It applies a field.requestUpdate() on each traker associated FzField
     */
    private handleDataUpdate(evt: CustomEvent) {
        if (this === evt.composedPath()[0]) return
        const trackers: string[] = (evt as CustomEvent).detail.trackers
        trackers.forEach(pointer => {
            const field = this.schemaMap.get(pointer)
            const logger = FzLogger.get("tracker",{field,schema:field?.schema})
            logger.info(`refreshed by %s`,evt.detail.field.pointer)
            field?.trackedValueChange()
        })
    }
    private confirm(evt: Event) {
        evt.preventDefault()
        evt.stopPropagation()
        this.submitted = true
        this.check()
        for (const field of this.fieldMap.values()) {
            field.requestUpdate()
        }
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
        const schema_compiler = new SchemaCompiler(this.compiledSchema, this.options, this.i_root.content)
        const schema_errors = schema_compiler.compile()
        if (schema_errors.length > 0) {
            this.message = `Schema compilation failed: \n    - ${schema_errors.join('\n    - ')}`
            console.error(this.message)
            return
        }

        // Data compilation never fail otherwise it's a bug to fix
        const data_compiler = new DataCompiler(this.i_root.content, this.schema)
        const data_errors = data_compiler.compile()
        if (data_errors.length > 0) {
            this.message = `Data compilation failed: \n    - ${data_errors.join('\n    - ')}`
            console.error(this.message)
        }
        this.dispatchEvent(new CustomEvent('ready'))
    }

    trace(pointer: string) {
        if (!isString(pointer,true) || !pointer.startsWith("/")) {
            console.error(`Unable to trace: ${pointer}`,this.root)
            return
        }
        const splitted = pointer.split("/")
        const key = splitted.pop() ?? "~"
        splitted.shift()
        const path = splitted.map(x => /^\d+$/.test(x) ? parseInt(x,10) : x)
        const obj = path.reduce((current,name) => isNull(current) ? current :current[name] ,this.root)

        if (isNull(obj)) {
            console.error(`Unable to trace (null ascendant): ${pointer}`,this.root)
            return
        }
        let value = obj[key]
        Object.defineProperty(obj, key, {
            get() {
                return value;
            },
            set(newValue) {
                const logger = FzLogger.get("trace")
                logger.info('%s : %s --> %s\n    %s',pointer, value, newValue,Error().stack);
                value = newValue;
            },
            configurable: true,
            enumerable: true
        });
    }

    /**
     * this method is called for to update value (THIS MUST BE DONE ONLY HERE !!!)
     */
    private setValue(pointer:string, value: any, schema: Schema) {

        const fields: FzField[] = []
        const field = this.fieldMap.get(pointer)
        if (field) fields.push(field)

        // this.data has a value (not undefined or null)
        // ---------------------------------------------
        // we simple set new value (newValue func ensure well constructed values , chaining , default, ..)
        const {parent, key} = getParentAndKey(pointer)
        if (parent === undefined || key === undefined) {
            throw Error(`unable to set value ${pointer}`)
        }
        const parentValue = this.at(parent)
        if (parentValue) {
            parentValue[key] = newValue(value, parentValue, schema)
        } else {

            // parent is undefined | null
            // --------------------
            // we need to set this value and all the nullish ascendant found (cascading sets)
            // imagine if current pointer is '/a/b/c/d/e' 
            // we must check if d,c,b, and a are nullish (suppose d,c,b are nullish)
            // we will set new newValue() for b,c,d first 

            if (!pointer.startsWith("/")) {
                throw Error(`setValue pointer not absolute => ${pointer}`)
            }
            if (/^\/?$/.test(pointer)) {
                throw Error(`setValue cant change root => ${pointer}`)
            }
            // we split pointer to obtain the path as an array of properties or indexes
            // ex '/a/b/c/d/e => ['',a,b,c,d,e]
            const keys = pointer.split('/').map(name => /^\d+$/.test(name) ? parseInt(name, 10) : name)

            // for each properties in path we calculate a corresponding schema
            // because heterogeneous types in arrays we are not allways able to do it
            const schemas: Schema[] = []
            for (let ischema: Schema | undefined = schema; ischema; ischema = ischema.parent) { schemas.unshift(ischema) }
            if (keys.length !== schemas.length) {
                // not sure this is possible to happen because if we are ther choices had be done then intermidiary schema/values exists
                throw Error(`setValue fail missing schemas on path => ${pointer}`)
            }

            // we calculate a newValue for each missing property/index  in path in descending order until this target 
            let ipointer = ''
            let parent  = this.context.root
            for (let i = 0; i < keys.length && parent; i++) {
                const key = keys[i]
                const schema = schemas[i]
                ipointer = i ? `${ipointer}/${key}` : `${key}`
                const field = this.fieldMap.get(ipointer)
                if (field) fields.push(field)
                const type = schema.basetype
                switch (true) {
                    // root nothing to do
                    case key === '':
                        break
                    // last property empty => affecting
                    case i === keys.length - 1: {
                        const v = newValue(value, parent, schema)
                        parent = parent[key] = v
                    }
                        break
                    // property "array" typed empty => initialising
                    case parent[key] == null && type == 'array': {
                        const v = newValue([], parent, schema)
                        parent = parent[key] = v
                    }
                        break
                    // property "object" typed empty => initialising
                    case parent[key] == null && type == 'object': {
                        const v = newValue({}, parent, schema)
                        parent = parent[key] = v
                    }
                        break
                    default:
                        parent = (type == 'object' || type == 'array') ? parent[key] : null
                }
            }

        }
        // trigger a requestUpdate for each field
        fields.forEach(f => f.requestUpdate())
    }
}

// Optional: expose globally
(window as any).FzForm = FzForm
