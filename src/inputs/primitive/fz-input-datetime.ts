/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
// import { ifDefined } from 'lit/directives/if-defined.js';
import { isString, notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";


const DATETIME_ISO_RE = /^(\d{4}-\d{2}-\d{2})(T(\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3}))?)?)?)?(Z|[+-]\d{2}:\d{2})?$/
// function iso(date = new Date()) {
//     return date.toISOString().slice(0, -5) + "Z";
// }

function normalizeIsoInput(dtstr: string): string | null {
    if (!isString(dtstr)) return null 
    const match = dtstr.match(DATETIME_ISO_RE)
    if (!match) return null;

    let [_, date, , hh = "00", , mm = "00", , ss = "00", , ms = "", tz = ""] = match
    const time = `${hh}:${mm}:${ss}${ms ? '.' + ms.padEnd(3, '0') : ''}`
    return `${date}T${time}${tz}`
}

function parseLooseIsoDate(input: string): Date | null {
    const normalized = normalizeIsoInput(input)
    if (!normalized) return null

    const date = new Date(normalized)
    return isNaN(date.getTime()) ? null : date
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
            const normalized = normalizeIsoInput(this.value)
            if (notNull(normalized)) {
                const datetime = parseLooseIsoDate(normalized)
                if (notNull(datetime)) {

                    if (this.input.type === "datetime-local" && this.input.isConnected) {
                        // IMPORTANT : valueAsDate is not working with "datetime-local" 
                        this.input.value = normalized
                    }

                    return
                }
            }
            // not a conform datetime
            this.input.value = ""
        }
    }

    override toValue() {
        if (isString(this.input?.value)) {
            // IMPORTANT : valueAsDate is not working with "datetime-local" 
            this.value = normalizeIsoInput(this.input.value) ?? undefined
        }
    }

    renderInput() {
        return html`<input 
            id="input" 
            type="datetime-local" 
            ?readonly="${this.readonly}" 
            ?required="${this.required}"
            @input="${this.change}"
            autocomplete=off  spellcheck="false"
            class="form-control ${this.validation}"
        />`
    }

    get min() {
        return this.schema?.minimum
    }

    get max() {
        return this.schema?.maximum
    }
    get step() {
        const precision = String(this.schema.precision ?? "min")
        if (precision === "sec") return 1
        if (precision === "ms") return 0.001
        return 60
    }
    // step="${ifDefined(this.step)}"
    // min="${ifDefined(this.min)}"
    // max="${ifDefined(this.max)}"

}