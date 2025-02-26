/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html, css } from "lit"
import { isEmptyValue } from "../lib/tools"
import { FzInputBase } from "./fz-input-base"

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

    renderInput() {
        return html`
            <div class="input-group">
                <input 
                    class="form-control" 
                    type="number" 
                    id="input"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    .min="${this.min}"
                    .max="${this.max}"
                    step="1e-12"
                    ?required="${this.required}"
                    @keypress="${this.keypress}"
                />
            </div>`
    }
    get max() {
        if (this.schema.maximumExclusive && 'maximum' in this.schema) return this.schema.maximum - 1e-12
        if ('maximum' in this.schema) return this.schema.maximum
        return ''
    }
    get min() {
        if (this.schema.minimumExclusive && 'minimum' in this.schema) return this.schema.minimum + 1e-12
        if ('minimum' in this.schema) return this.schema.minimum
        return ''
    }

    keypress(event: KeyboardEvent ){
        // browser issue on "input type=number' we reject decimal sep not in current locale
        if (/[.,]/.test(event.key) && DECIMAL_SEPARATOR !== event.key) {
            event.preventDefault();
        }
    }

    convertToInput(value: any) {
        return isNaN(value) ? null : value
    }

    convertToValue(value: any) {
        return isEmptyValue(value) || isNaN(value) ? this.empty : value;
    }
}