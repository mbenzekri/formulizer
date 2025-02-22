/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { isEmptyValue } from "./tools"
import { FzBaseInput } from "./fz-base-input";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-textarea")
export class FzTextarea extends FzBaseInput {

    renderInput() {
        return html`
            <textarea  
                class="form-control" 
                id="input"
                placeholder="${this.label}"
                .value="${this.value}" 
                ?readonly="${this.readonly}"
                @input="${this.change}"
                @keypress="${this.change}"
                minlength="${ifDefined(this.minlength)}"
                maxlength="${ifDefined(this.maxlength)}"
                ?required="${this.required}"
                rows="5"
            ></textarea>`
    }
    get minlength() { return this.schema.minLength }
    get maxlength() { return this.schema.maxLength }
    get pattern() { return this.schema.pattern }
    get password() {return !!this.schema.options?.password }
    
    convertToInput(value: any) {
        return value == null ? null : value.toString()
    }
    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : value.toString();
    }
}