/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { notNull } from "../lib/tools"
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

    override toField() {
        if (notNull(this.input)) {
            const redate = /\d\d\d\d-\d\d-\d\d/
            this.input.valueAsDate = redate.test(this.value) ? new Date(this.value) : null
        }
    }

    override toValue() {
        if (notNull(this.input)) {
            this.value =  notNull(this.input.valueAsDate) ? iso(this.input.valueAsDate) : undefined
        }
    }

    renderInput() {
        return html`<input
            id="input" 
            type="date" 
            @input="${this.change}"
            ?readonly="${this.readonly}" 
            ?required="${this.required}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            autocomplete=off  spellcheck="false"
            class="form-control ${this.validationMap}" 
        />`
    }

    get min() {
        return this.schema?.minimum
    }

    get max() {
        return this.schema?.maximum
    }

}