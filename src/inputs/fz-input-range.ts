/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html, css } from "lit"
import { isEmptyValue, isNumber } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-range")
export class FzRange extends FzInputBase {

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
    renderInput() {
        return html`
            <div class="input-group">
                <input 
                    class="form-control" 
                    type="range"  
                    id="input" 
                    .value="${this.value}" 
                    ?disabled="${this.readonly}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    min="${ifDefined(this.min)}"
                    max="${ifDefined(this.max)}"
                    step="1"
                    ?required="${this.required}"
                />
                <div class="input-group-append" style="max-width:5em" >
                    <span class="input-group-text" >${this.value}</span>
                </div>
            </div>`
    }
    override change() {
        super.change()
        this.requestUpdate()
    }
    get max(): number | undefined{
        if (isNumber(this.schema.maximum)) return this.schema.maximum
        if (isNumber(this.schema.exclusiveMaximum)) return this.schema.exclusiveMaximum
        return
    }
    get min() {
        if (isNumber(this.schema.minimum)) return this.schema.minimum
        if (isNumber(this.schema.exclusiveMinimum)) return this.schema.exclusiveMinimum
        return
    }
    keypress( ){
        // if (!/[-0123456789]/.test(event.key)) return event.preventDefault();
        // if (this.min >= 0 && event.key === '-') return event.preventDefault();
        return
   }

   convertToInput(value: any) {
        switch(true) {
            case typeof value === 'string' : return isNaN(parseInt(value, 10)) ? null : parseInt(value, 10)
            case typeof value === 'number' : return Math.floor(value)
            default: return null
        }
    }

    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : value;
    }
}