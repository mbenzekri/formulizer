/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  css, html } from "lit"
import { isNumber, notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base"
import { ifDefined } from "lit/directives/if-defined.js"

//const DECIMAL_SEPARATOR = (1.1).toLocaleString().substring(1, 2)
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
                // updating same value (but different input.value) breaks input 
                 if (this.input.valueAsNumber === this.value) return
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
                    id="input"
                    type="number" 
                    ?readonly="${this.readonly}"
                    ?required="${this.required}"
                    min="${ifDefined(this.min)}"
                    max="${ifDefined(this.max)}"
                    step="${ifDefined(this.step)}"
                    @input="${this.change}"
                    autocomplete=off  spellcheck="false"
                    class="form-control ${this.validation}" 
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

    keypress(_event: KeyboardEvent ){
        // // browser issue on "input type=number' we reject decimal sep not in current locale
        // if (/[.,]/.test(event.key) && DECIMAL_SEPARATOR !== event.key) {
        //     event.preventDefault();
        // }
    }
    get step() {
        return isNumber(this.schema?.multipleOf) ? this.schema.multipleOf : undefined
    }


}