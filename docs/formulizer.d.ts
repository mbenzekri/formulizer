import * as lit_html from 'lit-html';
import * as lit from 'lit';
import { LitElement, TemplateResult } from 'lit';

declare abstract class Base extends LitElement {
    connectedCallback(): void;
}

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
declare class FzField extends Base {
    constructor();
    static styles: lit.CSSResult[];
    /**
     * property to collapse/extend the field.
     */
    accessor p_collapsed: boolean;
    render(): lit_html.TemplateResult<1>;
    delete(): void;
    collapse(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'fz-field': FzField;
    }
}

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
declare class MyElement extends Base {
    constructor();
    static styles: lit.CSSResult[];
    /**
     * The name to say "Hello" to.
     */
    accessor name: string;
    /**
     * The number of times the button has been clicked.
     */
    accessor count: number;
    render(): lit_html.TemplateResult<1>;
    private _onClick;
    /**
     * Formats a greeting
     * @param name The name to say "Hello" to
     */
    sayHello(name: string): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}

type Pojo = {
    [key: string]: any;
};

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
declare abstract class FzElement extends LitElement {
    accessor schema: Pojo;
    accessor data: Pojo;
    accessor name: string | null;
    accessor index: number | null;
    accessor valid: boolean;
    accessor message: string;
    accessor pointer: string;
    private _initdone;
    private _handlers;
    private _dofocus;
    private _form?;
    abstract renderInput(): TemplateResult;
    abstract convertToInput(value: any): any;
    abstract convertToValue(value: any): any;
    get value(): any;
    set value(val: any);
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
     * return HTMLInputElement used to edit field value
     * pay attention may not always exit, some fields dont use HTML inputs (ex: signature)
     */
    get input(): HTMLInputElement;
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
    renderField(): TemplateResult;
    /**
     * set focus to input if exists, overriden for composed fields
     * to use dofocus() to delay focus() call on next update on object and array
     */
    focus(): void;
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
    registerHandler(event: string, handler: (evt: Event) => void): (evt: Event) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    requestUpdate(name?: PropertyKey, oldvalue?: unknown): void;
    /**
     * on first updated set listeners
     * @param _changedProperties (unused)
     */
    firstUpdated(_changedProperties: any): void;
    /**
     * to be specialized if needed
     */
    firstUpdate(): void;
    /**
     * before each update
     * - set queried focus
     * @param changedProps changed properties
     */
    update(changedProps: any): void;
    /**
     * 'click' handler when click occurs on field label element
     * may be specialized by subclasses to ac on label clicked event
     * @param changedProps changed properties
     */
    labelClicked(evt: Event): void;
    /**
     *  'change' handler when changes occurs on this.input
     * - update the model value of the field
     * - check to update validity
     * @param changedProps changed properties
     */
    change(): void;
    /**
     * calculate an abstract string (summary) for this field or a property/item of field
     */
    abstract(key?: string | number, itemschema?: Pojo): string;
    /**
     * calculate a default value a given schema
     */
    default(parent: any, schema: Pojo): any;
    /**
     * eval "expression" calculated field
     */
    eval(): void;
    check(): void;
    getMessage(key: string, input?: HTMLInputElement): string;
    /**
     * trap F9 key down to log debug Field state
     * @param evt keyboard event to trap key
     */
    private debugKey;
    protected triggerChange(): void;
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

interface IBlobStore {
    put(uuid: string, blob: Blob, filename: string, pointer: string): Promise<void>;
    remove(uuid: string): Promise<void>;
    get(uuid: string): Promise<{
        uuid: string;
        filename: string;
        blob: Blob;
    } | null>;
}

interface IAsset {
    select: (fieldasset: any, value: any, selectCallback: (selected: string) => void) => Promise<void>;
    done: () => Promise<void>;
}

declare class FzMarkdownIt extends LitElement {
    markdown: string;
    static styles: (CSSStyleSheet | lit.CSSResult)[];
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

/**
 * @prop schema
 * @prop data
 */
declare class FzForm extends LitElement {
    accessor i_schema: Pojo;
    private accessor i_options;
    private accessor obj;
    get root(): any;
    accessor submitlabel: string;
    accessor cancellabel: string;
    accessor buttonsVisible: boolean;
    accessor idData: string;
    accessor readonly: boolean;
    accessor notValidate: boolean;
    store: IBlobStore;
    asset?: IAsset;
    private validator?;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    get schema(): Pojo;
    set schema(value: Pojo);
    get options(): any;
    set options(value: any);
    private accessor _errors;
    get data(): Pojo;
    set data(value: Pojo);
    get valid(): boolean;
    private dataPointerFieldMap;
    private schemaPointerFieldMap;
    private message;
    private observedChangedHandler;
    constructor();
    addField(schemaPointer: string, dataPointer: string, field: FzElement): void;
    removeField(schemaPointer: string, dataPointer: string): void;
    getfieldFromSchema(pointer: string): FzElement | undefined;
    getfieldFromData(pointer: string): FzElement | undefined;
    updateField(pointer: string): void;
    static get styles(): lit.CSSResult[];
    render(): lit_html.TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    confirm(evt: Event): void;
    cancel(evt: Event): void;
    compile(): void;
    /**
     * handle 'observed-change' event for change detection and update
     * between observers and observed data
     * @param evt
     * @returns
     */
    observedChange(evt: Event): void;
}

export { FzField, FzForm, FzMarkdownIt, MyElement };
