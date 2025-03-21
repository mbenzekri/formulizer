/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement,property,queryAll } from "lit/decorators.js"
import { html } from "lit"
import { FETCHING, FzEnumBase } from "./fz-enum-base";
import { isNull, notNull } from "../../lib/tools";

@customElement("fz-enum-check")
export class FzEnumCheck extends FzEnumBase {
    @property({type: Number, attribute: false}) accessor selected: number = -1
    @queryAll("input") private accessor radios : HTMLInputElement[] = []

    override toField() {
        if (isNull(this.radios)) return
        this.radios.forEach(r => { r.checked = false; r.removeAttribute("checked") })
        if (this.value === undefined || isNull(this.enums))  {
            this.selected = -1
        } else {
            this.selected = this.enums.findIndex(item => item.value === this.value) 
            if (this.selected >= 0)  this.radios[this.selected].checked = true
        }
    }

    override toValue() {
        if ( this.selected >= 0 && notNull(this.enums)) {
            this.value = this.enums[this.selected].value
        }
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
                        // ?checked="${this.selected == i}"
        return html`
            ${this.enums?.map((item, i) => html`
                <div class="form-check form-check-inline">
                    <input 
                        type="radio"
                        name="group" 
                        .value=${item.value} 
                        ?disabled=${this.readonly}
                        @click="${() => this.select(i)}"
                        ?required=${this.required}
                        class="form-check-input"
                        autocomplete=off  spellcheck="false" tabindex=${i+1} 
                    />
                    <label class="form-check-label" for="${i}-input">${item.title}</label>
                </div>`)
            }`
    }

    select(index: number) {
        if (this.readonly) return
        this.selected = index
        this.radios[this.selected].checked = true
        this.change()
    }

}