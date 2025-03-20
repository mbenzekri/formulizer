/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import { html } from "lit"
import { notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

function iso(date = new Date()) {
    return date.toISOString().substring(11, 19) 
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-time")
export class FzInputTime extends FzInputBase {
    override toField() {
        if (notNull(this.input)) {
            this.input.valueAsDate =  new Date(this.value)
        }
    }
    override toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.valueAsDate) ? iso(this.input.valueAsDate) : undefined
        }
    }
    renderInput() {
        return html`
            <input 
                class="form-control timepicker ${this.validationMap}" 
                type="time" 
                id="input" 
                step="1"
                .value="${this.value}"
                ?readonly="${this.readonly}"
                @input="${this.change}"
                ?required="${this.required}"
            />`
    }


}