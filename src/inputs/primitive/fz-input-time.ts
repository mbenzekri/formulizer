/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { isNull, notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";
import { ifDefined } from "lit/directives/if-defined.js";

const TIME_RE = /^(\d{1,2})(?::(\d{2}))?(?::(\d{2})(?:\.(\d{1,3}))?)?$/;

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-time")
export class FzInputTime extends FzInputBase {
    override toField() {
        if (isNull(this.input)) return
        if (TIME_RE.test(String(this.value))) {
            this.input.value = this.parseValue(this.value) ?? ""
        } else {
            this.input.value = ""
        }
    }
    override toValue() {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined
        }
    }
    renderInput() {
        return html`
            <input 
                id="input" 
                type="time" 
                ?readonly="${this.readonly}"
                ?required="${this.required}"
                step="${ifDefined(this.step)}"
                @input="${this.change}"
                autocomplete=off  spellcheck="false"
                class="form-control timepicker ${this.validation}" 
            />`
    }
    get step() {
        const precision = String(this.schema?.precision ?? "min")
        if (precision === "sec") return 1
        if (precision === "ms") return 0.001
        return 60
    }

    private parseValue(value: string) {
        const match = value.match(TIME_RE);
        if (!match) return 
        const [_, h, m = '00', s = '00', ms = '000'] = match;
        const precision = this.schema?.precision ?? "min"
        if (precision == "ms") return `${h}:${m}:${s}.${ms}`
        if (precision == "sec") return `${h}:${m}:${s}`
        return `${h}:${m}`
    }

}