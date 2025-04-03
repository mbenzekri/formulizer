/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import { html } from "lit"
import { isNumber, notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-integer")
export class FzInputInteger extends FzInputBase {

    override toField(): void {
        if (notNull(this.input)) {
            if (isNumber(this.value)) {
                this.input.valueAsNumber =  this.value
            } else {
                this.input.value = ""
            }
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = isNumber(this.input.valueAsNumber) ? Math.floor(this.input.valueAsNumber) : undefined
        }
    }
    
    renderInput() {
        return html`
            <div class="input-group">
                <input 
                    class="form-control ${this.validation}" 
                    type="number"  
                    id="input"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    @keypress="${this.keypress}"
                    min="${ifDefined(this.min)}"
                    max="${ifDefined(this.max)}"
                    step="${this.step}"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                />
            </div>`
    }
    get max(): number | undefined{
        if (isNumber(this.schema?.maximum)) return this.schema.maximum
        if (isNumber(this.schema?.exclusiveMaximum)) return this.schema.exclusiveMaximum
        return
    }
    get min() {
        if (isNumber(this.schema?.minimum)) return this.schema.minimum
        if (isNumber(this.schema?.exclusiveMinimum)) return this.schema.exclusiveMinimum
        return
    }
    keypress(_event: KeyboardEvent ){
        // if (!/[-0123456789]/.test(event.key)) return event.preventDefault();
        // if (this.min >= 0 && event.key === '-') return event.preventDefault();
        return
   }
   get step() {
        return isNumber(this.schema?.multipleOf) ? this.schema.multipleOf : 1
   }


}