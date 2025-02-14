/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { FzEnumBase, EnumItem } from "./fz-enum-base";
import { unsafeHTML } from "lit/directives/unsafe-html.js"

/**
 * an input for long enumeration with typeahead behavior
 */
@customElement("fz-enum-typeahead")
export class FzEnumTypeahead extends FzEnumBase {
    renderEnum() {
        const prefix = this.firstchars
        return html`
            <div class="input-group">
                <input  
                    id="prefix"
                    class="form-control" 
                    type="text" 
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    @keypress="${this.change}"
                    ?required="${this.required}"
                    @focus="${this.openDropdown}"
                />
                <div id="dropdown-menu" class="dropdown-menu w-100">
                    ${ this.showNullChoice ?html`<a class="dropdown-item" @click="${() => this.select({ label: '<vide>', value: this.empty })}" >&lt;vide&gt;</a>` : '' }
                    ${this.enums?.map(item => html`<a class="dropdown-item" @click="${() => this.select(item)}" >${unsafeHTML(this.boldPrefix(item.label, prefix)) }</a>`)}
                </div>
            </div>`
    }

    get firstchars() {
        const input = this.shadowRoot?.getElementById("prefix") as HTMLInputElement
        return input ? input.value : ""
    }

    boldPrefix(label: string, prefix: string): string {
        if (!prefix || prefix.length == 0) return label
        const parts = label.split(new RegExp(prefix,"i"))
        const upper = `<b>${prefix.toUpperCase()}</b>`
        return parts.join(upper)
    }

    override async firstUpdated(changedProperties: any) {
        const input = this.shadowRoot?.getElementById("prefix") as HTMLInputElement
        const item = this.enums?.find(item => this.value === item.value)
        if (input) input.value = item ? item.label : ""
        super.firstUpdated(changedProperties)
    }
    override change() {
        this.requestUpdate()
    }

    private openDropdown() {
        this.shadowRoot?.getElementById("dropdown-menu")?.style.setProperty("display", "block")
            ; (<HTMLInputElement>this.shadowRoot?.getElementById("prefix"))?.select()
    }

    private closeDropdown() {
        this.shadowRoot?.getElementById("dropdown-menu")?.style.setProperty("display", "none")
    }

    select(item: EnumItem) {
        const input = this.shadowRoot?.getElementById("prefix") as HTMLInputElement
        if (input) input.value = item.label
        this.value = this.convertToValue(item.value)
        this.closeDropdown()
        this.requestUpdate()
    }

    override evalEnums(): void {
        super.evalEnums()
        this.enums = this.enums?.filter(item => item.label.toUpperCase().includes(this.firstchars.toUpperCase())).slice(0, 10) ?? []
    }

}