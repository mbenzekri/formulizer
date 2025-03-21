/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

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
export class FzInputDatetime extends FzInputBase {

    override toField() {
        if (notNull(this.input)) {
            const redate = /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ?/
            this.input.valueAsDate = redate.test(this.value) ? new Date(this.value.substring(0, 16))  : null
        }
    }

    override toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.valueAsDate) ? iso(this.input.valueAsDate) : undefined 
        }
    }

    renderInput() {
        return html`<input 
            id="input" 
            type="datetime-local" 
            @input="${this.change}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            ?readonly="${this.readonly}" 
            ?required="${this.required}"
            class="form-control ${this.validationMap}"
            autocomplete=off  spellcheck="false"
        />`
    }

    get min() {
        return this.schema.minimum
    }

    get max() {
        return this.schema.maximum
    }
}