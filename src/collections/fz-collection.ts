import { html, TemplateResult } from "lit";
import { FzField } from "../fz-field";
import { Schema } from "../lib/schema";
import { when } from "../lib/tools";

const fiedtypes = [
    "fz-array",
    'fz-enum-array',
    "fz-object",

    'fz-enum-check',
    'fz-enum-select',
    "fz-enum-typeahead",

    "fz-picker",
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

    /**
     * render collapsed collection  Array or Object
     */
    protected abstract renderCollapsed(): TemplateResult 

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
                <div class="${when(!this.collapsed,'line-after')}" >${label}</div>
            </label>`
        
    }

    /**
     * render an item of this field 
     * - item may be property of object (property name found in this.name)
     * - item may be element of array (array index found in this.index)
     * 
     * only one of them (this.name or this.index is valued).
     * this method is used by composed fields (fz-array and fz-object)
     * @param key 
     */
    protected renderItem(schema: Schema, key: string | number): TemplateResult {
        if (!this.schema) return html``

        switch (schema.field) {
            case 'fz-enum-select': return html`<fz-enum-select .pointer="${this.pointer}/${key}" .schema="${schema}" ></fz-enum-select>`
            case 'fz-enum-check': return html`<fz-enum-check .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-enum-check>`
            case "fz-date": return html`<fz-date .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-date>`
            case "fz-time": return html`<fz-time .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-time>`
            case "fz-datetime": return html`<fz-datetime .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-datetime>`
            case "fz-textarea": return html`<fz-textarea .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-textarea>`
            case "fz-string": return html`<fz-string .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-string>`
            case "fz-mask": return html`<fz-mask .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-mask>`
            case "fz-picker": return html`<fz-picker .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-picker>`
            case "fz-signature": return html`<fz-signature .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-signature>`
            case "fz-boolean": return html`<fz-boolean .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-boolean>`
            case "fz-float": return html`<fz-float .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-float>`
            case "fz-integer": return html`<fz-integer .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-integer>`
            case "fz-range": return html`<fz-range .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-range>`
            case "fz-location": return html`<fz-location .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-location>`
            case "fz-array": return html`<fz-array .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-array>`
            case "fz-object": return html` <fz-object .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-object>`
            case "fz-const": return html` <fz-const .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-const>`
            case "fz-enum-array": return html` <fz-enum-array .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-enum-array>`
            case "fz-doc": return html` <fz-doc .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-doc>`
            case "fz-uuid": return html` <fz-uuid .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-uuid>`
            case "fz-markdown": return html` <fz-markdown .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-markdown>`
            case "fz-enum-typeahead": return html` <fz-enum-typeahead .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-enum-typeahead>`
            case "fz-color": return html` <fz-color .pointer="${this.pointer}/${key}"  .schema="${schema}" ></fz-color>`
            case 'fz-error':
            default: return html`<div class="alert alert-warning" role="alert">field=${this.pointer} type ${schema.basetype}/${schema.field} not implemented !</div>`
        }
    }

    protected renderItemErrors(index: number|string) {
        const errors= this.context.errors(`${this.pointer}/${index}`)
        return html`
            <span id="error" class="error-message error-truncated">
                ${errors.join(', ')}
            </span>`
    }

    /**
     * when asked for focus , set focus to first field of the collection
     */
    override focus() {
        if (this.fields.length > 0) {
            const first = this.fields[0]
            first.dofocus()
        }
    }

    delete() {
        this.value = this.empty
    }

    override firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties)
    }

}