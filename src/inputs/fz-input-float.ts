/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html, css } from "lit"
import { isNumber, notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base"
import { ifDefined } from "lit/directives/if-defined.js"

const DECIMAL_SEPARATOR = (1.1).toLocaleString().substring(1, 2)
/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-float")
export class FzInputFloat extends FzInputBase {

    static override get styles() {
        return [
            ...super.styles,
            css`
            /* Chrome, Safari, Edge, Opera */
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            /* Firefox */
            input[type=number] {
                -moz-appearance: textfield;
            }`
        ]
    }

    override toField(): void {
        if (notNull(this.input)) {
            if (isNumber(this.value) ) {
                this.input.valueAsNumber =  this.value 
            } else {
                this.input.value =  "" 
            }
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = isNumber(this.input.valueAsNumber) ? this.input.valueAsNumber : undefined
        }
    }

    renderInput() {
        return html`
            <div class="input-group">
                <input 
                    class="form-control ${this.validation}" 
                    type="number" 
                    id="input"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    min="${ifDefined(this.min)}"
                    max="${ifDefined(this.max)}"
                    step="1e-12"
                    ?required="${this.required}"
                    @keypress="${this.keypress}"
                    autocomplete=off  spellcheck="false"
                />
            </div>`
    }
    get max(): number | undefined{
        if (isNumber(this.schema?.maximum)) return this.schema.maximum
        if (isNumber(this.schema?.exclusiveMaximum)) return this.schema.exclusiveMaximum
        return
    }
    get min() {
        if (isNumber(this.schema?.minimum)) return this.schema.minimum
        if (isNumber(this.schema?.exclusiveMinimum)) return this.schema.exclusiveMinimum
        return
    }

    keypress(event: KeyboardEvent ){
        // browser issue on "input type=number' we reject decimal sep not in current locale
        if (/[.,]/.test(event.key) && DECIMAL_SEPARATOR !== event.key) {
            event.preventDefault();
        }
    }

}