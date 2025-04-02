/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, property, query } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { styleMap } from "lit/directives/style-map.js";
import { html, PropertyValues } from "lit"
import { FETCHING, FzEnumBase } from "./fz-enum-base";
import { EnumItem } from "../../lib/types";
import { isNull } from "../../lib/tools";

/**
 * an input for long enumeration with typeahead behavior
 */
@customElement("fz-enum-typeahead")
export class FzEnumTypeahead extends FzEnumBase {

    @property({type: Boolean, attribute: false}) accessor isopen: boolean = false
    @property({type: Number, attribute: false}) accessor selected: number = -1
    @query('#query') declare private queryElem: HTMLInputElement;
    private filtered: EnumItem[] = []

    override toField() {
        // only synced at initialisation (see firstUpdated)
        // on other moments queryElem must preserve user input for filtering
    }

    override toValue() {
        if (this.selected >= 0) {
            this.value = this.filtered[this.selected].value
        }
    }
    override focusout(evt: Event): void {
        super.focusout(evt)
        //this.isopen = false
    }

    private alignFromValue(): void {
        if (!this.queryElem) {
            this.selected = -1
        } else if (isNull(this.value) || isNull(this.enums))  {
            this.queryElem.value= ""
            this.selected = -1
        } else {
            const item = this.enums.find(item => item.value == this.value) 
            this.queryElem.value = item ? item.title : ""
            this.selected = item ? 0 : -1 
        } 
    }

    override firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties)
        this.alignFromValue()
    }

    renderEnum() {
        if (this.enums == FETCHING) {
            return html`
                <div class="form-control d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-secondary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                </div>`
        }

        const styles = { display: this.isopen ? "block" : "none" };
        return html`
            <div class="dropdown">
                <input  
                    id="query"
                    type="text" 
                    placeholder=${this.label ?? ""}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    @keydown=${this.tabhandle}
                    @input=${this.filter}
                    @change=${this.filter}
                    @focus=${this.show}
                    class="form-control" 
                    autocomplete=off  spellcheck="false"
                />
                <div id="list" style="${styleMap(styles)}" class="dropdown-menu w-100">
                    ${ this.filtered?.length == 0 ? html`<a class="dropdown-item disabled"  style="font-style: italic">No match...</a>` : '' }
                    ${ this.filtered?.map((item,i) => html`<a class="dropdown-item" @click="${(_e: Event) => this.select(i)}" >${this.boldMatch(item.title) }</a>`)}
                </div>
            </div>`
    }
    // get the  inputed query string
    get query() {
        return  this.queryElem?.value ?? ""
    }

    // return the given label with query part bolded 
    private boldMatch(label: string) {
        if (this.query == null || this.query.length == 0) return label;
    
        // Create a case-insensitive regex to find all occurrences of the query
        const regex = new RegExp(this.query, 'gi');
        const bolded = label.replace(regex, match => `<b><u>${match}</u></b>`);
    
        return unsafeHTML(bolded);
    }
    
    private show() {
        this.isopen = true
        this.queryElem.select()
        this.filter()
    }
    
    private select(index: number) {
        this.selected = index
        this.isopen = false
        this.queryElem.value = this.filtered[this.selected].title
        this.value = this.filtered[this.selected].value
        this.change()
    }
    // get the enum list to display filter by query string (first 10 items)
    private filter(): void {
        super.evalEnums()
        const upper = this.query.toUpperCase()
        const matching = (item: EnumItem) => item.title.toUpperCase().includes(upper)
        this.filtered = this.showNullChoice ? [{ title: '~ empty', value: this.empty }] : []
        this.filtered.push(...this.enums?.filter(matching).slice(0, 10) ?? [])
        this.selected = -1
        this.requestUpdate()
    }
    private tabhandle(evt: KeyboardEvent) {
        if (evt.key === 'Tab') {
            this.alignFromValue()
            this.isopen = false
            this.queryElem.setSelectionRange(this.queryElem.value.length, this.queryElem.value.length);
        }
    }

}