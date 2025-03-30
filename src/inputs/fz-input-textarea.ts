/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { isString, notNull } from "../lib/tools"
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
            this.value = isString(this.input.value,true) ? this.input.value : undefined
        }
    }

    renderInput() {
        return html`
            <textarea  
                id="input"
                ?readonly="${this.readonly}"
                ?required="${this.required}"
                placeholder="${ifDefined(this.label)}"
                minlength="${ifDefined(this.minlength)}"
                maxlength="${ifDefined(this.maxlength)}"
                @input="${this.change}"
                @keypress="${this.change}"
                rows="5"
                class="form-control ${this.validation}" 
            ></textarea>`
    }
    get minlength() { return this.schema?.minLength }
    get maxlength() { return this.schema?.maxLength }
    get pattern() { return this.schema?.pattern }
}