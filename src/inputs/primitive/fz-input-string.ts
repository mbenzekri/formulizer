/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html, css } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-string")
export class FzInputString extends FzInputBase {

    static override get styles() {
        return [
            ...super.styles,
            css`
            input[type="color"] {
                height: 38px
            }`
        ]
    }

    override toField(): void {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "")
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) && this.input.value != "" ? this.input.value : this.empty 
        }
    }

    renderInput() {
        return html`
            <div class="input-group" >
                <input
                    id="input"
                    type="${this.type}" 
                    @input="${this.change}"
                    ?readonly="${this.readonly}"
                    ?required="${this.required}"
                    placeholder="${this.label}"
                    minlength="${ifDefined(this.minlength)}"
                    maxlength="${ifDefined(this.maxlength)}"
                    pattern="${ifDefined(this.pattern)}"
                    autocomplete=off  spellcheck="false"
                    class="form-control ${this.validation}" 
                />
            </div>`
    }

    get minlength() { return this.schema?.minLength }
    get maxlength() { return this.schema?.maxLength }
    get pattern() { return this.schema?.pattern }
    get type() { 
        switch(this.schema?.format) {
            case 'color' :return 'color'
            case 'email' : return 'email'
            case 'password' : return 'password'
            case 'uri' :  return 'url'
            default : return 'text'
        }
    }
    
}