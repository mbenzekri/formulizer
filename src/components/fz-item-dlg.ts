import { html, css } from "lit"
import { property, customElement } from "lit/decorators.js"
import { FzDialog } from "./dialog"
import { FzField } from "../fz-field"
import { Schema } from "../lib/schema"
import { FromObject, SCHEMA } from "../lib/types"

export class FzFromDlgCloseEvent extends CustomEvent<{ dialog: FzFromDlg, canceled: boolean, value?: any, abstract?: string }> {
    constructor(dialog: FzFromDlg, canceled: boolean, value?: any, abstract?: string) {
        super('fz-dlg-from-close', { detail: { dialog, canceled, value, abstract } })
    }
}

export interface EventMap {
    'fz-dlg-from-close': FzFromDlgCloseEvent
}

@customElement("fz-dlg-from")
export class FzFromDlg extends FzDialog {
    @property({ type: Object }) accessor reference: FromObject | undefined
    private arraySchema?: Schema
    private itemSchema?: Schema
    private array?: any[]
    private index?: number
    private pointer?: string
    private refname?: string

    static override get styles() {
        return [
            ...super.styles,
            css`
            div {
                color: black
            }
            `]
    }

    override renderDialog() {
        return html`
            ${(this.itemSchema != null || this.arraySchema?.items?.oneOf == null) ? '' :
                html`<div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle btn-sm"
                    @click="${this.toggleDropdown}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${"Choose type"}
                </button> 
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    ${this.arraySchema?.items.oneOf.map((schema: any, i: number) => html`<a class="dropdown-item"
                    @click="${() => this.addItem(schema)}" >${schema.title || "Type" + i}</a>`)}
                </div>
            </div>`}
            ${this.itemSchema == null
                ? '' :
                html`<fz-object id="form-object" .pointer="${this.pointer}/${this.index}" .schema="${this.itemSchema}"></fz-object>`}
        `
    }
    protected override updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        if (this.reference) {
            this.pointer = this.reference?.pointer
            this.array = this.reference?.target
            this.refname = this.reference?.name
            this.arraySchema = (this.array as any)[SCHEMA]
        } else {
            this.pointer = undefined
            this.array = undefined
            this.refname = undefined
            this.arraySchema = undefined
            this.itemSchema = undefined
        }
    }

    private toggleDropdown() {
        const menu = (this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement)
        menu?.style.setProperty("display", menu?.style.display == "block" ? "none" : "block")
    }

    addItem(schema: Schema) {
        this.itemSchema = schema
        const value = this.itemSchema._default(this.array)
        this.index = this.array?.length
        this.array?.push(value)
        this.valid = true
        this.requestUpdate()
    }

    override closed(canceled: boolean) {
        if (canceled) {
            const field = this.shadowRoot?.getElementById("form-object") as FzField
            const value = field.value[this.refname ?? "id"]
            const abstract = field.abstract()
            this.dispatchEvent(new FzFromDlgCloseEvent(this, canceled, value, abstract))
        } else {
            this.dispatchEvent(new FzFromDlgCloseEvent(this, canceled))
        }
        this.reference = undefined
    }

    override init() {
        if (this.arraySchema?.homogeneous && this.index === undefined) {
            this.arraySchema?.items && this.addItem(this.arraySchema?.items)
        }
    }

}


