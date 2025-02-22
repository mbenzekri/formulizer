import { customElement } from "lit/decorators.js"
import { html } from "lit"
import "./markdown-it"
import { FzBaseInput } from "./fz-base-input"

@customElement("fz-markdown")
export class FzMarkdown extends FzBaseInput {

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