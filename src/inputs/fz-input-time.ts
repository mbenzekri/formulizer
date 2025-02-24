/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import { isEmptyValue } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

function iso(date = new Date()) {
    return date.toISOString().substring(11, 19) 
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-time")
export class FzInputTime extends FzInputBase {

    renderInput() {
        return html`
            <input 
                class="form-control timepicker" 
                type="time" 
                id="input" 
                step="1"
                .value="${this.value}"
                ?readonly="${this.readonly}"
                @input="${this.change}"
                ?required="${this.required}"
            />`
    }

    convertToInput(value: any) {
        switch (true) {
            case typeof value === 'string' : return (value == null) ? null : value
            case typeof value === 'number' : return iso(new Date(value))
            case value instanceof Date : return iso(value)
        }
        return null
    }
    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : iso(new Date(value));
    }
}