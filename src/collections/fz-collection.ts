import { html, TemplateResult } from "lit";
import { FzField } from "../fz-field";

const fiedtypes = [
    "fz-array",
    'fz-enum-array',
    "fz-object",

    'fz-enum-check',
    'fz-enum-select',
    "fz-enum-typeahead",

    "fz-asset",
    "fz-boolean",
    "fz-color",
    "fz-const",
    "fz-date",
    "fz-datetime",
    "fz-doc",
    "fz-float",
    "fz-integer",
    "fz-location",
    "fz-location",
    "fz-mask",
    'fz-markdown',
    "fz-range",
    "fz-signature",
    "fz-string",
    "fz-textarea",
    "fz-time",
    "fz-uuid",

]
const fieldtypeslist = fiedtypes.join(',')
export abstract class FZCollection extends FzField {

    //@queryAll(fieldtypeslist) readonly fields!: FzField[]

    get fields(): FzField[] {
        const fields = [...this.shadowRoot?.querySelectorAll(fieldtypeslist)  ?? []] as FzField[]
        return fields
    }

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

    /**
     * when asked for focus , set focus to first field of the collection
     */
    override focus() {
        if (this.fields.length > 0) {
            const first = this.fields[0]
            first.dofocus()
        }
    }

}