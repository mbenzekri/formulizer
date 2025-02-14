/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import { html } from "lit"
import { v1 as uuidv1 } from "uuid"
import { FzElement } from "./fz-element";
import { isEmptyValue } from "./tools"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-uuid")
export class FzUuid extends FzElement {

    renderInput() {
        return html`<div class="input-group" >${this.value}</div>`
    }

    convertToInput(value: any) {
        return (value == null || value == "") ? null : value
    }
    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : value;
    }

    override connectedCallback() {
        super.connectedCallback()
        if (this.value == null) this.value = uuidv1()
    }
}