/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import { html } from "lit"
import { isNull, isNumber, notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-time")
export class FzInputTime extends FzInputBase {
    override toField() {
        if (isNull(this.input)) return
        if (/^(\d\d(:\d\d(:\d\d(\.d+)?)?)?)$/.test(String(this.value))) {
            this.input.value =  this.value
        } else {
            this.input.value = ""
        }
    }
    override toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined
        }
    }
    renderInput() {
        return html`
            <input 
                class="form-control timepicker ${this.validation}" 
                type="time" 
                id="input" 
                step="1"
                ?readonly="${this.readonly}"
                @input="${this.change}"
                ?required="${this.required}"
                autocomplete=off  spellcheck="false"
            />`
    }
    get step() {
        return isNumber(this.schema?.precision) ? this.schema?.precision : 60
    }


}