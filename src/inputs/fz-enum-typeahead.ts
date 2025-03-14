/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, property, query } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { styleMap } from "lit/directives/style-map.js";
import { html } from "lit"
import { FzEnumBase } from "./fz-enum-base";
import { EnumItem } from "../lib/types";
import { isNull } from "../lib/tools";

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
        if (isNull(this.value) || isNull(this.enums))  {
            this.queryElem.value= ""
            this.selected = -1
        } else {
            const item = this.enums.find(item => item.value == this.value) 
            this.queryElem.value = item ? item.title : ""
            this.selected = item ? 0 : -1 
        }
    }

    override toValue() {
        if (this.selected >= 0) {
            this.value = this.filtered[this.selected].value
        }
    }

    renderEnum() {
        const styles = { display: this.isopen ? "block" : "none" };

        return html`
            <div class="dropdown">
                <input  
                    id="query"
                    class="form-control" 
                    type="text" 
                    autocomplete="off"
                    placeholder=${this.label ?? ""}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    @input=${this.filter}
                    @change=${this.filter}
                    @focus=${this.show}
                />
                <div id="list" style="${styleMap(styles)}" class="dropdown-menu w-100">
                    ${ this.filtered?.length == 0 ? html`<a class="dropdown-item disabled"  style="font-style: italic">No match...</a>` : '' }
                    ${ this.filtered?.map((item,i) => html`<a class="dropdown-item" @click="${() => this.select(i)}" >${this.boldPrefix(item.title) }</a>`)}
                </div>
            </div>`
    }
    // get the  inputed query string
    get query() {
        return  this.queryElem?.value ?? ""
    }

    // return the given label with query part bolded 
    private boldPrefix(label: string) {
        if (this.query == null || this.query.length == 0) return label
        const parts = label.split(new RegExp(this.query,"i"))
        const bolded = parts.join(`<b><u>${this.query}</u></b>`) 
        return unsafeHTML(bolded)
    }
    private show() {
        this.isopen = true
        this.queryElem.select()
        this.filter()
    }
    
    private select(index: number) {
        this.selected = index
        this.queryElem.value = this.filtered[this.selected].title
        this.change()
        this.isopen = false
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

}