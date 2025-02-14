/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import { FzElement } from "./fz-element";
import { isEmptyValue } from "./tools"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-integer")
export class FzInteger extends FzElement {

    renderInput() {
        return html`
            <div class="input-group">
                <input 
                    class="form-control" 
                    type="number"  
                    id="input"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    @keypress="${this.keypress}"
                    .min="${this.min}"
                    .max="${this.max}"
                    step="1"
                    ?required="${this.required}"
                />
            </div>`
    }
    get max() {  
        if (this.schema.maximumExclusive && 'maximum' in this.schema) return this.schema.maximum-1
        if ('maximum' in this.schema) return this.schema.maximum
        return ''
    }
    get min() { 
        if (this.schema.minimumExclusive && 'minimum' in this.schema) return this.schema.minimum+1
        if ('minimum' in this.schema) return this.schema.minimum
        return ''
    }
    keypress(event: KeyboardEvent ){
        if (!/[-0123456789]/.test(event.key)) return event.preventDefault();
        if (this.min >= 0 && event.key === '-') return event.preventDefault();
        return
   }

   convertToInput(value: any) {
        return isNaN(value) ? null : Math.floor(value)
    }

    convertToValue(value: any) {
        return isEmptyValue(value) || isNaN(value) ? this.empty : value;
    }
}