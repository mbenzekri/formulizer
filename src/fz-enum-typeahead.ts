/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, query } from "lit/decorators.js"
import { html } from "lit"
import { FzEnumBase, EnumItem } from "./fz-enum-base";
import { unsafeHTML } from "lit/directives/unsafe-html.js"

/**
 * an input for long enumeration with typeahead behavior
 */
@customElement("fz-enum-typeahead")
export class FzEnumTypeahead extends FzEnumBase {

    @query('#query') declare private queryElem: HTMLInputElement;
    @query('#list') declare private listElem: HTMLElement;

    renderEnum() {
        return html`
            <div class="input-group">
                <input  
                    id="query"
                    class="form-control" 
                    type="text" 
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    @keypress="${this.change}"
                    ?required="${this.required}"
                    @focus="${this.openList}"
                    autocomplete="off"
                />
                <div id="list" class="dropdown-menu w-100">
                    ${ this.enums?.length == 0 ? html`<a class="dropdown-item">No match...</a>` : '' }
                    ${ this.showNullChoice ? html`<a class="dropdown-item" @click="${() => this.select({ label: '<vide>', value: this.empty })}" >&lt;vide&gt;</a>` : '' }
                    ${this.enums?.map(item => html`<a class="dropdown-item" @click="${() => this.select(item)}" >${this.boldPrefix(item.label) }</a>`)}
                </div>
            </div>`
    }
    // get the  inputed query string
    get query() {
        return this.queryElem ? this.queryElem.value : ""
    }
    
    // return the given label with query part bolded 
    private boldPrefix(label: string) {
        if (this.query == null || this.query.length == 0) return label
        const parts = label.split(new RegExp(this.query,"i"))
        const bolded = parts.join(`<b>${this.query}</b>`) 
        return unsafeHTML(bolded)
    }

    override async firstUpdated(changedProperties: any) {
        const item = this.enums?.find(item => this.value === item.value)
        this.queryElem.value = item ? item.label : ""
        super.firstUpdated(changedProperties)
    }

    override change() {
        this.requestUpdate()
    }

    private openList() {
        this.listElem.style.setProperty("display", "block")
        this.queryElem.select()
    }

    private closeList() {
        this.listElem.style.setProperty("display", "none")
    }

    private select(item: EnumItem) {
        this.queryElem.value = item.label
        this.value = this.convertToValue(item.value)
        this.closeList()
        this.requestUpdate()
    }

    // get the enum list to display filter by query string (first 10 items)
    override evalEnums(): void {
        super.evalEnums()
        const upper = this.query.toUpperCase()
        const matching = (item: EnumItem) => item.label.toUpperCase().includes(upper)
        this.enums = this.enums?.filter(matching).slice(0, 10) ?? []
    }

}