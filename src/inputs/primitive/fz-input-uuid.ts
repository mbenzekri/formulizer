/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import { html } from "lit"
import { v1 as uuidv1 } from "uuid"
import { notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-uuid")
export class FzInputUuid extends FzInputBase {

    override toField(): void {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "")
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : this.empty 
        }
    }

    renderInput() {
        return html`
            <div class="input-group">
                <div id="input" class="form-control">${this.value}</div>
            </div>`
    }

    override connectedCallback() {
        super.connectedCallback()
        if (this.value == null) this.value = uuidv1()
    }
}