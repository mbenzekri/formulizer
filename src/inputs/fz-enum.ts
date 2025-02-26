import { customElement } from "lit/decorators.js"
import { html,css } from "lit"
import { FzEnumBase } from "./fz-enum-base";
import { classMap } from 'lit/directives/class-map.js';

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-enum")
export class FzEnum extends FzEnumBase {

    static override get styles() {
        return [
            ...super.styles,
            css`
            .readonly {
                background-color: #ececec
            }`
        ]
    }
    renderEnum() {
        return html`
            <select 
                class="${classMap({ 'form-select': true, 'readonly': this.readonly })}"
                id="input" 
                .value="${this.value}" 
                @input="${this.change}" 
                ?required="${this.required}"
            >
                ${this.withAdd ? html`<option style="color:red;text-align:center" ?disabled="${this.readonly}" ?selected="${false}" .value="${'~~ADD~~'}">Add ...</option>` : ''}
                ${ this.showNullChoice ? html`<option style="color:red;text-align:center" ?disabled="${this.readonly}" ?selected="${this.isSelected(null)}" .value="${'~~EMPTY~~'}"> ${this.required ? 'Choose a value...' : '<vide>'}</option>` : '' }
                ${this.enums?.map(item => html`<option  ?disabled="${this.readonly}"  ?selected="${this.isSelected(item.value)}" .value="${item.value == null ? "" : item.value}"><b>${item.label}</b></option>`)}
            </select>`
    }

}