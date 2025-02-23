/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import { isEmptyValue } from "../tools"
import { FzInputBase } from "./fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-constant")
export class FzInputConstant extends FzInputBase {

    renderInput() {
        return html`<div class="input-group">${this.value}</div>`;
    }

    convertToInput(value: any) {
        if (value == null || value == "") return null
        return value
    }
    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : value;
    }

    override connectedCallback() {
        super.connectedCallback()
        if (this.value !== this.schema.const) this.value = this.schema.const
    }
}