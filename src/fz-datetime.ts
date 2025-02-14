/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import { FzElement } from "./fz-element";
import {ifDefined} from 'lit/directives/if-defined.js';
import { isEmptyValue } from "./tools"

function iso(date = new Date()) {
    return date.toISOString().slice(0, -5) + "Z";
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-datetime")
export class FzDatetime extends FzElement {

    renderInput() {
        return html`<input 
            class="form-control" 
            type="datetime-local" 
            id="input" 
            .value="${this.value}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            ?readonly="${this.readonly}" 
            @input="${this.change}"
            ?required="${this.required}"
        />`
    }

    get min() {
        return this.schema.min
    }

    get max() {
        return this.schema.max
    }

    convertToInput(value: any): any {
        const isore = /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ?/
        let res: any = "";
        switch(true) {
            case typeof value === 'string' && isore.test(value) : 
                res = value.substring(0, 16)
                break
            case typeof value === 'number' : 
                res = new Date(value).toISOString().substring(0, 16)
                break
            case value instanceof Date :
                res = value.toISOString().substring(0, 16)
                break
        }
        return res
    }
    convertToValue(value: any): any {
        return isEmptyValue(value) ? this.empty : iso(new Date(value))
    }
}