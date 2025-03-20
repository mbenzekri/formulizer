/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-textarea")
export class FzInputTextarea extends FzInputBase {

    override toField(): void {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "")
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined
        }
    }

    renderInput() {
        return html`
            <textarea  
                class="form-control ${this.validationMap}" 
                id="input"
                placeholder="${ifDefined(this.label)}"
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
    //get password() {return !!this.schema.options?.password }

}