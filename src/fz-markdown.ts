import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { FzElement } from "./fz-element"
import "./markdown-it"

@customElement("fz-markdown")
export class FzMarkdown extends FzElement {

    override renderInput() {
        return html``
    }

    override renderField() {
        return html`
            <div class="form-group row"><markdown-it .markdown="${this.value}"></markdown-it></div>
        `
    }

    override convertToInput(value: any) {
        return value
    }

    override convertToValue(value: any) {
        return (typeof value !== 'string') ? '' : value
    }

}