/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { isBoolean, isNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";

@customElement("fz-boolean")
export class FzInputBoolean extends FzInputBase {
    /**
     * bor check box no leading label 
     */
    override renderLabel() {
        return html`
        <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
            <div>&nbsp</div>
        </label>`
    }

    renderInput() {
        return html`
            <div class="form-control">
                <input 
                    id="input"
                    type="checkbox"
                    ?required="${this.required}"
                    @change="${this.tryChange}"
                    @click="${this.tryChange}"
                    autocomplete=off  spellcheck="false"
                    class="form-check-input align-self-start ${this.validation}"
                />
                <label class="form-check-label ms-2" for="input">${super.label}</label>
            </div>
        `;
    }
    private tryChange(event: Event) {
        this.readonly ? event.preventDefault() : this.change()
    }

    override toField() {
        if (isNull(this.input)) return
        switch (true) {
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