import * as lit_html from 'lit-html';
import * as lit from 'lit';
import { LitElement, TemplateResult } from 'lit';

declare class Base extends LitElement {
    private handlers;
    static get styles(): lit.CSSResult[];
    listen(target: EventTarget, event: string, handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean): void;
    unlisten(target: EventTarget, event: string, handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

interface IBlobStore {
    put(uuid: string, blob: Blob, filename: string, pointer: string): Promise<void>;
    remove(uuid: string): Promise<void>;
    get(uuid: string): Promise<StoreItem | undefined>;
}

/**
 * @prop schema
 * @prop data
 */
declare class FzForm extends Base {
    static get styles(): lit.CSSResult[];
    private accessor i_options;
    accessor i_schema: Pojo;
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
    private accessor _errors;
    private readonly obj;
    store: IBlobStore;
    asset: IAsset;
    private validator;
    private readonly dataPointerFieldMap;
    private readonly schemaPointerFieldMap;
    private message;
    constructor();
    get root(): any;
    get valid(): boolean;
    get schema(): Pojo;
    set schema(value: Pojo);
    get options(): IOptions;
    set options(value: IOptions);
    get data(): Pojo;
    set data(value: Pojo);
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    render(): lit_html.TemplateResult<1>;
    private renderForm;
    private renderButtons;
    private renderError;
    connectedCallback(): void;
    disconnectedCallback(): void;
    addField(schemaPointer: string, dataPointer: string, field: FzElement): void;
    removeField(schemaPointer: string, dataPointer: string): void;
    getfieldFromSchema(pointer: string): FzElement | undefined;
    getfieldFromData(pointer: string): FzElement | undefined;
    updateField(pointer: string): void;
    /**
     * handle 'observed-change' event for change detection and update
     * between observers and observed data
     * @param evt
     * @returns
     */
    private observedChange;
    private confirm;
    private cancel;
    compile(): void;
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
declare abstract class FzElement extends Base {
    accessor pointer: string;
    accessor schema: Pojo;
    accessor data: Pojo;
    accessor name: string | null;
    accessor index: number | null;
    accessor valid: boolean;
    accessor message: string;
    private _initdone;
    private _dofocus;
    private _form?;
    abstract renderField(): TemplateResult;
    abstract check(): void;
    get value(): any;
    set value(val: any);
    /**
     * this method is called for to update this.value (and must be done only here)
     * @param value
     * @returns
     */
    private cascadeValue;
    get nullable(): any;
    get key(): string | number;
    /**
     * calculate label for this field
     */
    get label(): any;
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
    fields(): FzElement[];
    get form(): FzForm;
    static get styles(): lit.CSSResult[];
    /**
     * render method for this field component (calls renderField() abstract rendering method)
     */
    render(): TemplateResult<1>;
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
    renderItem(schema: Pojo, key: string | number): TemplateResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    requestUpdate(name?: PropertyKey, oldvalue?: unknown): void;
    /**
     * before each update
     * - set queried focus
     * @param changedProps changed properties
     */
    update(changedProps: any): void;
    /**
     * to be specialized if needed
     */
    firstUpdate(): void;
    /**
     * 'click' handler when click occurs on field label element
     * may be specialized by subclasses to ac on label clicked event
     * @param changedProps changed properties
     */
    labelClicked(evt: Event): void;
    /**
     *  'change' handler when changes occurs on inputed value
     * - update the model value of the field
     * - check to update validity
     */
    protected change(): void;
    protected triggerChange(): void;
    /**
     * calculate an abstract string (summary) for this field or a property/item of field
     */
    abstract(key?: string | number, itemschema?: Pojo): string;
    evalExpr(attribute: string, schema?: Pojo, value?: any, parent?: any, key?: string | number): any;
    /**
     * return tagged template '$' for pointer derefencing in expression or code used in schema
     * the pointer derefencing is done relativatly to this.data
     *  @example $`#/a/b/c` // absolute dereferencing
     *  @example $`1/b/c`   // relative dereferencing
     */
    get derefFunc(): (template: {
        raw: readonly string[] | ArrayLike<string>;
    }, ...substitutions: any[]) => any;
}

interface IAsset {
    select: (fieldasset: any, value: any, selectCallback: (selected: string) => void) => Promise<void>;
    done: () => Promise<void>;
}

type Pojo = {
    [key: string]: any;
};
type StoreItem = {
    uuid: string;
    blob: Blob;
    filename: string;
};
type IOptions = {
    storage?: IBlobStore;
    userdata?: any;
    asset?: IAsset;
    dialect?: string;
};

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
