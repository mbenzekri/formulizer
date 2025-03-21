import * as lit_html from 'lit-html';
import * as lit from 'lit';
import { LitElement, PropertyValues, TemplateResult } from 'lit';
import * as lit_html_directive from 'lit-html/directive';
import * as lit_html_directives_class_map from 'lit-html/directives/class-map';

declare class JSONSchema {
    [key: string]: any;
}
type SchemaPrimitive = "null" | "boolean" | "object" | "array" | "number" | "string" | "integer";
declare class JSONSchemaDraft07 {
    $id?: string;
    $schema?: string;
    $ref?: string;
    $comment?: string;
    type?: SchemaPrimitive | SchemaPrimitive[];
    enum?: (string | number | boolean | null)[];
    const?: any;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    items?: Schema;
    additionalItems?: Schema;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: Schema;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    properties?: Record<string, Schema>;
    patternProperties?: Record<string, Schema>;
    additionalProperties?: boolean | Schema;
    dependencies?: Record<string, Schema | string[]>;
    propertyNames?: Schema;
    if?: Schema;
    then?: Schema;
    else?: Schema;
    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    not?: Schema;
    definitions?: Record<string, Schema>;
    title?: string;
    description?: string;
    default?: any;
    examples?: any[];
    format?: string;
    root: Schema;
    parent?: Schema;
    basetype: string;
    empty: null | undefined;
    pointer: string;
    nullAllowed?: boolean;
    transient?: boolean;
    trackers: string[];
    target: string[];
    enumFetch?: string;
    isenum: boolean;
    filter?: Function;
    isenumarray: boolean;
    homogeneous: boolean;
    requiredIf: string | Function;
    field: string;
    from?: {
        pointer: string;
        extend: boolean;
    } | ExprFunc<any>;
    order?: FieldOrder[];
    abstract?: string | ExprFunc<string>;
    case?: string | ExprFunc<boolean>;
    visible?: string | ExprFunc<boolean>;
    readonly?: string | ExprFunc<boolean>;
    collapsed?: boolean | ExprFunc<boolean>;
    orderBy?: string | ExprFunc<any>;
    expression?: string | ExprFunc<any>;
    change?: string | ExprFunc<any>;
    nullable: boolean;
    assets?: string;
    preview?: boolean;
    mimetype?: string;
    mask?: string;
    tab?: string;
    group?: string;
}
declare class Schema extends JSONSchemaDraft07 {
    constructor(schema: JSONSchema);
    /**
     * default abstract calculation
     */
    _abstract(value: any): string;
    static _abstractFunc(): (schema: Schema, value: any) => string;
    _default(parent: any): any;
    /**
     * get the schema corresponding to a jsonpointer (absolute or relative)
     * @param root root schema for absolute pointer
     * @param current current schema for relative pointer
     * @param pointer pointer to dereference
     * @returns
     */
    _deref(pointer: string): Schema | undefined;
    /**
     * trackers function parse expression to extract watched values and set trackers
     * array in corresponding schema.
     * a value is watched by using the pointer dereference operation in expresions: $`/a/b/c`
     * the tracker is the Object desribed by the schema and the objserved value is the value
     * pointed by $`...`
     * @param root schema for absolute pointers in expr
     * @param current schema for relative pointer in expr
     * @param expr function body or arrow function body to parse
     */
    _track(expr: string): void;
    _toJSON(): string;
    static wrapSchema(schema: JSONSchema): Schema;
    static inferEnums(schema: Schema): EnumItem[] | undefined;
    _empty(): any;
}

interface IBlobStore {
    put(uuid: string, blob: Blob, filename: string, pointer: string): Promise<void>;
    remove(uuid: string): Promise<void>;
    get(uuid: string): Promise<StoreItem | undefined>;
}

type JSONValue = undefined | string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject {
    [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {
}

type EnumItem = {
    title: string;
    value: any;
};
type ExprFunc<T> = (schema: Schema, value: any, parent: Pojo, property: string | number, $: Function, userdata: object) => T | null;
type EvalFunc<T> = (attribute: keyof Schema, schema: Schema, value: any, parent: Pojo, property: string | number, userdata: object) => T | null;
type FieldOrder = {
    tabnum: number;
    groupnum: number;
    fieldnum: number;
    fieldname: string;
    schema: Schema;
    tabname: string;
    groupname: string;
};
type StoreItem = {
    uuid: string;
    blob: Blob;
    filename: string;
};
interface IAsset {
    select: (fieldasset: any, value: any, selectCallback: (selected: string) => void) => Promise<void>;
    done: () => Promise<void>;
}
type IOptions = {
    storage?: IBlobStore;
    userdata?: any;
    asset?: IAsset;
    dialect?: string;
    enums?: (id: string) => EnumItem[];
};
declare const SCHEMA: unique symbol;
declare const PARENT: unique symbol;
declare const KEY: unique symbol;
declare const ROOT: unique symbol;
declare const EVAL: unique symbol;
type WithMetadata<T> = T & {
    [SCHEMA]?: Schema;
    [SCHEMA]?: Schema;
    [ROOT]?: T;
    [PARENT]?: T;
    [KEY]?: string | number;
    [EVAL]?: EvalFunc<any>;
    [name: string]: T;
    [name: number]: T;
};
type Pojo = WithMetadata<JSONValue>;

declare class Base extends LitElement {
    private handlers;
    static get styles(): lit.CSSResult[];
    listen(target: EventTarget, event: string, handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean): void;
    unlisten(target: EventTarget, event: string, handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

/**
 * @prop schema
 * @prop data
 */
declare class FzForm extends Base {
    static get styles(): lit.CSSResult[];
    private readonly obj;
    private accessor i_options;
    store: IBlobStore;
    asset: IAsset;
    private readonly fieldMap;
    private readonly schemaMap;
    accessor i_schema: Schema;
    accessor actions: boolean;
    accessor readonly: boolean;
    accessor checkIn: boolean;
    accessor checkOut: boolean;
    oninit: string | null;
    onready: string | null;
    onvaliddata: string | null;
    oninvaliddata: string | null;
    onvalidate: string | null;
    ondismiss: string | null;
    private schemaErrors;
    private dataErrors;
    private validator;
    private message;
    constructor();
    get root(): any;
    get valid(): boolean;
    get schema(): Schema;
    set schema(value: Schema);
    get options(): IOptions;
    set options(value: IOptions);
    get data(): Pojo;
    set data(value: Pojo);
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    getField(pointer: string): FzField | undefined;
    addField(schemaPointer: string, dataPointer: string, field: FzField): void;
    removeField(schemaPointer: string, dataPointer: string): void;
    getfieldFromSchema(pointer: string): FzField | undefined;
    updateField(pointer: string): void;
    render(): lit_html.TemplateResult<1> | lit_html.TemplateResult<1>[];
    private renderForm;
    private renderButtons;
    private renderError;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    check(): void;
    /**
     * 'data-updated' event handler for data change.
     * It applies a field.requestUpdate() on each traker associated FzField
     */
    private handleDataUpdate;
    private confirm;
    private cancel;
    private compile;
    debug(pointer: string): void;
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
declare abstract class FzField extends Base {
    accessor pointer: string;
    accessor schema: Schema;
    accessor data: Pojo;
    accessor name: string | null;
    accessor index: number | null;
    accessor touched: boolean;
    accessor errors: string[];
    private _dofocus;
    private _form?;
    abstract renderField(): TemplateResult;
    abstract toField(): void;
    abstract toValue(): void;
    get valid(): boolean;
    get invalid(): boolean;
    get value(): any;
    set value(value: any);
    get validationMap(): lit_html_directive.DirectiveResult<typeof lit_html_directives_class_map.ClassMapDirective>;
    /**
     * this method is called for to update this.value (and must be done only here)
     * @param value
     * @returns
     */
    private cascadeValue;
    get nullable(): boolean | undefined;
    get key(): string | number;
    /**
     * calculate label for this field
     */
    get label(): string;
    /**
     * return true if this field is item of array, false otherwise
     */
    get isItem(): boolean;
    /**
     * return true if this field is property of object, false otherwise
     */
    get isProperty(): boolean;
    /**
     * calculate a visible boolean state for this field
     */
    get visible(): boolean;
    /**
     * calculate a required boolean state for this field
     */
    get required(): boolean;
    /**
     * calculate a readonly boolean state for this field
     */
    get readonly(): boolean;
    get empty(): any;
    get isEmpty(): boolean;
    /**
     * call for focus on next update for field
     */
    dofocus(): void;
    /**
    * preventDefault and stopPropagation on event (helper)
    * @param event
    */
    eventStop(event?: Event): void;
    fields(): FzField[];
    get form(): FzForm;
    static get styles(): lit.CSSResult[];
    /**
     * render method for this field component (calls renderField() abstract rendering method)
     */
    render(): TemplateResult<1>;
    renderErrors(): TemplateResult<1>;
    private toggleError;
    /**
     * render method for label
     */
    get renderLabel(): TemplateResult<1>;
    /**
     * render an item of this field
     * - item may be property of object (property name found in this.name)
     * - item may be element of array (array index found in this.index)
     *
     * only one of them (this.name or this.index is valued).
     * this method is used by composed fields (fz-array and fz-object)
     * @param key
     */
    renderItem(schema: Schema, key: string | number): TemplateResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * before each update
     * - set queried focus
     * @param changedProps changed properties
     */
    update(changedProps: any): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /**
     * 'click' handler when click occurs on field label element
     * may be specialized by subclasses to ac on label clicked event
     * @param changedProps changed properties
     */
    labelClicked(evt: Event): void;
    /**
     *  'change' handler when changes occurs on inputed value
     * - update the model value from the field
     * - eval 'change' keyword
     * - process a validation
     * - triggers needed cha,ge events for update and trackers
     */
    protected change(): void;
    /**
     * calculate an abstract string (summary) for this field or a property/item of field
     */
    abstract(key?: string | number, itemschema?: Schema): string;
    evalExpr(attribute: keyof Schema, schema?: Schema, value?: Pojo, parent?: Pojo, key?: string | number): any;
    /**
     * return tagged template '$' for pointer derefencing in expression or code used in schema
     * the pointer derefencing is done relativatly to this.data
     *  @example $`/a/b/c` // absolute dereferencing
     *  @example $`1/b/c`   // relative dereferencing
     */
    get derefFunc(): (template: {
        raw: readonly string[] | ArrayLike<string>;
    }, ...substitutions: any[]) => any;
    /**
     * this method must be call when global context detect form detects a
     * tracked data had been change
     */
    trackedValueChange(): void;
}

declare class FzMarkdownIt extends Base {
    markdown: string;
    static styles: lit.CSSResult[];
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'markdown-it': FzMarkdownIt;
    }
}

declare global {
    let BarcodeDetector: any;
}

declare global {
    let ImageCapture: any;
}

export { FzForm, FzMarkdownIt };
