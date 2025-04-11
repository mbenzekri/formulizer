/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import { FzInputBase } from "../fz-input-base";
import { notNull } from "../../lib/tools";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-const")
export class FzInputConstant extends FzInputBase {


    override toField(): void {
        if (notNull(this.input)) {
            this.input.value = String(this.schema?.const ?? "")
        }
    }
    override toValue(): void {
        this.value = this.schema?.const
    }

    renderInput() {
        return html`<div id=input class="input-group ${this.validation}">${this.value}</div>`;
    }

    override connectedCallback() {
        super.connectedCallback()
        if (this.value !== this.schema?.const) this.value = this.schema.const
    }
}