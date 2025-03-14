/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement,property,queryAll } from "lit/decorators.js"
import { html } from "lit"
import { FzEnumBase } from "./fz-enum-base";
import { isNull, notNull } from "../lib/tools";

@customElement("fz-enum-check")
export class FZEnumCheck extends FzEnumBase {
    @property({type: Number, attribute: false}) accessor selected: number = -1
    @queryAll("input") private accessor radios : HTMLInputElement[] = []

    override toField() {
        if (isNull(this.radios)) return
        this.radios.forEach(r => { r.checked = false; r.removeAttribute("checked") })
        if (isNull(this.value) || isNull(this.enums))  {
            this.selected = -1
        } else {
            this.selected = this.enums.findIndex(item => item.value == this.value) 
            if (this.selected > 0)  this.radios[this.selected].checked = true
        }
    }

    override toValue() {
        if ( notNull(this.selected) && notNull(this.enums)) {
            this.value = this.enums[this.selected].value
        }
    }

    renderEnum() {
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
                        ?checked="${this.selected == i}"
                        class="form-check-input" 
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