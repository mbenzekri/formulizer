/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { isNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

@customElement("fz-boolean")
export class FzInputBoolean extends FzInputBase {
    renderInput() {
        return html`
            <div class="form-group row">
                <div class="col-sm-12">
                    <div class="form-check d-flex">
                        <input 
                            id="input"
                            type="checkbox"
                            ?disabled="${this.readonly}"
                            ?required="${this.required}"
                            @change="${super.change}"
                            class="form-check-input align-self-start" 
                        />
                        <label class="form-check-label   ms-2" for="input">${super.label}</label>
                    </div>
                </div>
            </div>
        `;
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
            default:
                // Standard true/false mapping
                this.input.indeterminate = false
                this.input.checked = !!this.value
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