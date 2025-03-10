/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { isEmptyValue } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

function iso(date = new Date()) {
    return date.toISOString().substring(0, 10) 
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-date")
export class FzInputDate extends FzInputBase {

    renderInput() {
        return html`<input 
            class="form-control" 
            type="date" id="input"
            ?readonly="${this.readonly}" 
            @input="${this.change}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            ?required="${this.required}"
        />`
    }

    get min() {
        return this.schema.minimum
    }

    get max() {
        return this.schema.maximum
    }

    convertToInput(value: any): any {
        const isore = /\d\d\d\d-\d\d-\d\d/
        switch(true) {
            case typeof value === 'string' && isore.test(value) : return iso(new Date(value))
            case typeof value === 'number' : return iso(new Date(value))
            case value instanceof Date : return iso(value)
            default: return ""
        }
    }
    
    convertToValue(value: any): any {
        return isEmptyValue(value) ? this.empty : iso(new Date(value))
    }
}