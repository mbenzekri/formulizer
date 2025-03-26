/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { isBoolean, isNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

@customElement("fz-boolean")
export class FzInputBoolean extends FzInputBase {

    renderInput() {
        return html`
            <div class="form-group row">
                <div class="col-sm-12">
                    <div class="form-control">
                        <input 
                            id="input"
                            type="checkbox"
                            ?required="${this.required}"
                            @change="${this.tryChange}"
                            @click="${this.tryChange}"
                            autocomplete=off  spellcheck="false"
                            class="form-check-input align-self-start ${this.validationMap}"
                        />
                        <label class="form-check-label ms-2" for="input">${super.label}</label>
                    </div>
                </div>
            </div>
        `;
    }
    private tryChange(event: Event) {
        if (this.readonly) event.preventDefault()
        else this.change()
    }
    override get label() { return "" }

    override toField() {
        if (isNull(this.input)) return
        switch (true) {
            case this.value === undefined:
                // Always treat undefined as "not set" (indeterminate)
                this.input.indeterminate = true
                this.input.checked = false
                break
            case this.value === null && this.schema.nullAllowed:
                // Only treat null as indeterminate if null is allowed
                this.input.indeterminate = true
                this.input.checked = false
                break
            case isBoolean(this.value):
                // Standard true/false 
                this.input.indeterminate = false
                this.input.checked = this.value
                break
            default:
                // other not boolean/not nullish
                this.input.indeterminate = true
                this.input.checked = false
        }
    }
    override toValue() {
        if (isNull(this.input)) return
        if (this.input.indeterminate) {
            this.value = this.schema.nullAllowed ? null : undefined
        } else {
            this.value = !!this.input.checked
        }
    }
}