import { customElement } from "lit/decorators.js"
import { html } from "lit"
import "../components/markdown-it"
import { FzInputBase } from "./fz-input-base"

@customElement("fz-markdown")
export class FzInputMarkdown extends FzInputBase {

    renderInput() {
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