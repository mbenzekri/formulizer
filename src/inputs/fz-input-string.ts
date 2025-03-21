/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html, css } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-string")
export class FzInputString extends FzInputBase {


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

    static override get styles() {
        return [
            ...super.styles,
            css`
            input[type="color"] {
                height: 38px
            }`
        ]
    }
    renderInput() {
        return html`
            <div class="input-group" >
                <input
                    class="form-control ${this.validationMap}" 
                    type="${this.type}" 
                    id="input"
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    minlength="${ifDefined(this.minlength)}"
                    maxlength="${ifDefined(this.maxlength)}"
                    pattern="${ifDefined(this.pattern)}"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                />
                ${this.type === 'color' && this.value != null 
                    ? html`<span class="input-group-text" style="max-width:5em">${this.value}</span>`
                    : ''
                }
            </div>`
    }

    get minlength() { return this.schema.minLength }
    get maxlength() { return this.schema.maxLength }
    get pattern() { return this.schema.pattern }
    get type() { 
        switch(this.schema.format) {
            case 'color' :return 'color'
            case 'email' : return 'email'
            case 'password' : return 'password'
            case 'uri' :  return 'url'
            default : return 'text'
        }
    }
    
}