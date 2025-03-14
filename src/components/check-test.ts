/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement,property } from "lit/decorators.js"
import { html, LitElement } from "lit"

@customElement("check-test")
export class CheckTest extends LitElement {
    @property({type: Number, attribute: false}) accessor selected: number = -1
    //@queryAll("input") private accessor radios : HTMLInputElement[] = []
    private enums = [{value: "yes", title: "YES"},{value: "no", title: "NO"}]
    //private value = false
    // override toField() {
    //     if ( notNull(this.input) && notNull(this.selected) && notNull(this.radios)) {
    //         this.radios[this.selected].checked = !!this.value            
    //     }
    // }

    // override toValue() {
    //     if ( notNull(this.selected) && notNull(this.enums)) {
    //         this.value = this.enums[this.selected].value
    //     }
    // }

    override render() {
        return html`
            ${this.enums?.map((item, i) => html`
                <div class="form-check form-check-inline">
                    <input 
                        class="form-check-input" 
                        type="radio" 
                        name="input" 
                        .value=${item.value} 
                        @click="${(evt: MouseEvent) => this.select(i,evt)}"
                        ?checked="${this.selected == i}"
                    />
                    <label class="form-check-label" for="${i}-input">${item.title}</label>
                </div>`)
            }`
    }

    select(index: number, event: MouseEvent) {
        event.stopPropagation()
        this.selected = index
        // if (notNull(this.radios)) {
        //     this.radios[this.selected].checked = true
        // }
        //this.requestUpdate()
        //this.change()
    }

}