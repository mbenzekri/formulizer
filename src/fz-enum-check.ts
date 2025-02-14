/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { FzEnumBase } from "./fz-enum-base";

@customElement("fz-enum-check")
export class FZEnumCheck extends FzEnumBase {

    renderEnum() {
        return html`
            ${this.enums?.map((item, i) => html`
                <div class="form-check form-check-inline">
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name="input" 
                        id="${i}-input" 
                        .value="${item.value}" 
                        ?disabled="${this.readonly}"
                        @click="${this.select}" 
                        ?required="${this.required}"
                        ?checked="${this.isSelected(item.value)}"
                    />
                    <label class="form-check-label" for="input${i}">${item.label}</label>
                </div>`)
            }`
    }

    select(event: MouseEvent) {
        event.stopPropagation()
        event.stopImmediatePropagation()
        if (this.readonly) return
        const input = (event.target as HTMLInputElement)
        const index = parseInt(input.id,10)
        this.value = this.convertToValue(this.enums?.[index].value)
        this.requestUpdate()
    }

}