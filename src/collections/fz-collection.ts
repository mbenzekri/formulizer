import { TemplateResult } from "lit";
import { FzField } from "../fz-element";

export abstract class FZCollection extends FzField {


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
        this.collapsed = this.isroot ? false : this.evalExpr("collapsed")
    }

    /**
     * render collapsed collection  Array or Object
     */
    protected abstract renderCollapsed(): TemplateResult 
}