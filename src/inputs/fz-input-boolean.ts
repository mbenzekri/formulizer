/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import { isEmptyValue, notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

@customElement("fz-boolean")
export class FzInputBoolean extends FzInputBase {
    renderInput() {
        return html`
            <div class="form-group row">
                <div class="col-sm-3"></div> 
                <div class="col-sm-9">
                    <input 
                        class="form-check-input" 
                        type="checkbox"
                        id="input"
                        @keypress="${this.toggle}"
                        ?disabled="${this.readonly}"
                        @click="${this.toggle}"
                        ?required="${this.required}"
                    />
                    <label class="form-check-label" for="input" style="text-decoration-line:${!this.value ? 'line-through' : 'none'}">&nbsp;${this.label}</label>
                </div>
            </div>
        `;
    }

    toggle() {
        super.change()
        this.requestUpdate()
    }

    override toField() {
        if (notNull(this.input)) {
            this.input.checked = isEmptyValue(this.value) ? this.empty : !!this.value
        }
    }
    override toValue() {
        if (notNull(this.input)) {
            this.value = this.input.checked ? true : false
        } 
    }
}