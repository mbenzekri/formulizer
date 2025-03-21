import { customElement, property, queryAll } from "lit/decorators.js"
import { html,css } from "lit"
import { FETCHING, FzEnumBase } from "./fz-enum-base";
import { classMap } from 'lit/directives/class-map.js';
import { isNull, notNull } from "../../lib/tools";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-enum-select")
export class FzEnumSelect extends FzEnumBase {
    @property({type: Number, attribute: false}) accessor selected: number = -1
    @queryAll("option") private accessor options : HTMLOptionElement[] = []

    override toField() {
        this.options.forEach(r =>  r.selected = false)
        if (isNull(this.value) || isNull(this.enums))  {
            this.selected = -1
        } else {
            this.selected = this.enums.findIndex(item => item.value == this.value) 
            if (this.selected >= 0)  this.options[this.selected].selected = true
        }
    }

    override toValue() {
        if (notNull(this.enums) && this.selected >= 0) {
            this.value = this.enums[this.selected].value
        }
    }

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
        if (this.enums == FETCHING) {
            return html`
                <div class="form-control d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-secondary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                </div>`
        }

        return html`
            <select 
                id="input" 
                @change="${this.select}" 
                ?required="${this.required}"
                class="${classMap({ 'form-select': true, 'readonly': this.readonly })}"
            >
                ${this.extend ? html`<option style="color:red;text-align:center" ?disabled="${this.readonly}" ?selected="${false}" .value="${'~~ADD~~'}">Add ...</option>` : ''}
                ${ this.showNullChoice ? html`<option style="color:red;text-align:center" ?disabled="${this.readonly}" ?selected="${this.isSelected(null)}" .value="${'~~EMPTY~~'}"> ${this.required ? 'Choose a value...' : '<vide>'}</option>` : '' }
                ${this.enums?.map((item,i) => html`
                    <option id="option" ?disabled="${this.readonly}"  ?selected="${this.selected === i}">
                        <b>${item.title}</b>
                    </option>`)}
            </select>`
    }

    private select() {
        this.options.forEach((o,i) => o.selected ? (this.selected = i) : null)
        this.change()
    }

}