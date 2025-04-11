/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html, css } from "lit"
import { isNumber, notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";
import { ifDefined } from "lit/directives/if-defined.js";

abstract class FzInputNumber extends FzInputBase {

    override toField(): void {
        if (notNull(this.input)) {
            if (isNumber(this.value)) {
                // updating same value (but different input.value) breaks input 
                if (this.input.valueAsNumber === this.value) return
                this.input.valueAsNumber = this.schema.basetype == "number" ? this.value : Math.floor(this.value)
            } else {
                this.input.value = ""
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
                    type="${this.type}"
                    ?disabled="${this.readonly}"
                    ?readonly="${this.readonly}"
                    ?required="${this.required}"
                    min="${ifDefined(this.min)}"
                    max="${ifDefined(this.max)}"
                    step="${ifDefined(this.step)}"
                    @input="${this.change}"
                    autocomplete=off  spellcheck="false"
                    class="form-control ${this.validation} "
                />
                <div ?hidden="${this.type !== "range"}" class="input-group-append" style="max-width:5em" >
                    <span class="input-group-text" >${this.value ?? '~'}</span>
                </div>
            </div>`
    }
    get max(): number | undefined {
        if (isNumber(this.schema?.exclusiveMaximum) && isNumber(this.schema?.maximum)) {
            // Conflict Resolution: When both minimum and exclusiveMinimum are present in a schema, 
            // the effective constraint is determined by their values.
            // If exclusiveMinimum is greater than minimum, the value must be strictly greater than exclusiveMinimum.
            // If minimum is greater than exclusiveMinimum, the value must be greater than or equal to minimum.
            if (this.schema.exclusiveMaximum < this.schema.maximum) return this.schema.exclusiveMaximum 
            if (this.schema.maximum < this.schema?.exclusiveMaximum) return this.schema.maximum 

        }
        if (isNumber(this.schema?.exclusiveMaximum)) return this.schema.exclusiveMaximum
        if (isNumber(this.schema?.maximum)) return this.schema.maximum
        return
    }
    get min() {
        if (isNumber(this.schema?.exclusiveMinimum) && isNumber(this.schema?.minimum)) {
            // Conflict Resolution: When both minimum and exclusiveMinimum are present in a schema, 
            // the effective constraint is determined by their values.
            // If exclusiveMinimum is greater than minimum, the value must be strictly greater than exclusiveMinimum.
            // If minimum is greater than exclusiveMinimum, the value must be greater than or equal to minimum.
            if (this.schema.exclusiveMinimum > this.schema.minimum) return this.schema.exclusiveMinimum 
            if (this.schema.minimum > this.schema?.exclusiveMinimum) return this.schema.minimum 

        }
        if (isNumber(this.schema?.exclusiveMinimum)) return this.schema.exclusiveMinimum
        if (isNumber(this.schema?.minimum)) return this.schema.minimum
        return
    }
    get step() {
        return isNumber(this.schema?.multipleOf) ? this.schema.multipleOf : undefined
    }
    get type() {
        return this.schema?.field == "fz-range" ? "range" : "number"
    }


}

@customElement("fz-integer")
export class FzInputInteger extends FzInputNumber {
}


@customElement("fz-range")
export class FzInputRange extends FzInputNumber {

    static override get styles() {
        return [
            ...super.styles,
            css`
                input[type=range]::-webkit-slider-runnable-track {
                    background: lightgray;
                    border: 0.2px solid rgba(1, 1, 1, 0.3);
                    border-radius: 25px;
                    width: 100%;
                    height: 8px;
                    cursor: pointer;
                }
                input[type=range]::-webkit-slider-thumb {
                    margin-top: -6px;
                    width: 20px;
                    height: 20px;
                    background: rgb(13, 110, 253);
                    border: 0.2px solid rgba(1, 1, 1, 0.3);
                    border-radius: 10px;
                    cursor: pointer;
                    -webkit-appearance: none;
                }
                input[type=range]::-moz-range-track {
                    background: rgb(13, 110, 253);
                    border: 0.2px solid rgba(1, 1, 1, 0.3);
                    border-radius: 25px;
                    width: 100%;
                    height: 15.6px;
                    cursor: pointer;
                }
                input[type=range]::-moz-range-thumb {
                    width: 16px;
                    height: 36px;
                    background: #00ffff;
                    border: 1px solid #000000;
                    border-radius: 3px;
                    cursor: pointer;
                }
                input[type=range]::-ms-track {
                    background: transparent;
                    border-color: transparent;
                    border-width: 11.2px 0;
                    color: transparent;
                    width: 100%;
                    height: 15.6px;
                    cursor: pointer;
                }
        `]
    }
}


@customElement("fz-float")
export class FzInputFloat extends FzInputNumber {

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
}