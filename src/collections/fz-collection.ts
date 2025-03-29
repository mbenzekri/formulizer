import { html, TemplateResult } from "lit";
import { FzField } from "../fz-element";

export abstract class FZCollection extends FzField {

    override renderLabel(): TemplateResult<1> {
        const required = this.required ? '*' : ''
        const label = `${this.label}${required}`

        // labels for object/array properties have collapse chevron
        return html`
            <label for="input" class="col-sm-3 col-form-label" @click="${this.labelClicked}">
                <div>${label}</div>
            </label>`
        
    }


    delete() {
        if (this.collapsed !== null) this.collapsed = true
        this.value = this.empty
    }

    get deletable() {
        if (this.isroot == null || this.isempty) return false
        if (this.schema.nullAllowed && this.nullable) return true;
        if (!this.schema.nullAllowed && !this.required) return true;
        return false
    }

    override firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties)
        this.collapsed = this.isroot ? false : !!this.evalExpr("collapsed")
    }
    
    renderItemErrors(index: number|string) {
        const errors= this.form.errors(`${this.pointer}/${index}`)
        return html`
            <span id="error" class="error-message error-truncated">
                ${errors.join(', ')}
            </span>`
    }

    /**
     * render collapsed collection  Array or Object
     */
    protected abstract renderCollapsed(): TemplateResult 
}