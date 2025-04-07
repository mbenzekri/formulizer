import { customElement } from "lit/decorators.js"
import { html } from "lit"
import "../../components/markdown-it"
import { FzInputBase } from "../fz-input-base"

@customElement("fz-markdown")
export class FzInputMarkdown extends FzInputBase {

    override toField() {
        // markdown format doesnt affect field
        return 
    }

    override toValue() {
        // markdown format doesnt affect value
        return 
    }


    renderInput() {
        return html``
    }

    override renderField() {
        return html`
            <div class="form-group row ${this.validation}"><markdown-it .markdown="${this.value ?? ''}"></markdown-it></div>
        `
    }


}