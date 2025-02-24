import { html, css, LitElement } from "lit"
import { property, customElement } from "lit/decorators.js"
import { FzDialog } from "./dialog"
import { bootstrapCss } from "../assets/bootstrap"
import { bootstrapIconsCss } from "../assets/bootstrap-icons"
import { Pojo } from "../lib/types"
import { calculateDefault, getSchema } from "../lib/tools"
import { FzElement } from "../fz-element"


@customElement("fz-item-dlg")
export class FzItemDlg extends LitElement {
    @property({ type: Object }) accessor  reference:  { pointer: string, refname: string, refarray: any[] } | null = null
    private modal?: FzDialog | null
    private arraySchema?: Pojo
    private itemSchema?: Pojo
    private array?: any[]
    private index?: number
    private pointer?: string
    private refname?: string

    static override get styles() {
        return [
            bootstrapCss,
            bootstrapIconsCss,
            css`
            div {
                color: black
            }
            `]
    }

    override render() {
        return html`
            <fz-dialog modal-title="Ajouter un element ..." @click="${this.stopEvent}" @close="${this.close}" > 
                ${(this.itemSchema != null || this.arraySchema?.items.oneOf == null) ? '' :
                html`<div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle btn-sm"
                        @click="${this.toggleDropdown}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${"Choisir le type d'élément"}
                    </button> 
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        ${this.arraySchema?.items.oneOf.map((schema: any, i: number) => html`<a class="dropdown-item"
                        @click="${() => this.addItem(schema)}" >${schema.title || "Type" + i}</a>`)}
                    </div>
                </div>`}
                ${this.itemSchema == null
                ? '' :
                html`<fz-object id="form-object" .pointer="${this.pointer}/${this.index}"  .schema="${this.itemSchema}" .name="${undefined}" .index="${this.index}" .data="${this.array}"></fz-object>`}
            </fz-dialog>`
    }
    protected override updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        if (this.reference ) {
            this.pointer = this.reference?.pointer
            this.array = this.reference?.refarray
            this.refname = this.reference?.refname
            this.arraySchema = getSchema(this.array)
        } else {
            this.pointer = undefined
            this.array =undefined
            this.refname = undefined
            this.arraySchema = undefined
            this.itemSchema = undefined
        }
    }

    private toggleDropdown() {
        const menu = (this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement)
        menu?.style.setProperty("display", menu?.style.display == "block" ? "none" : "block")
    }

    addItem(schema: Pojo) {
        this.itemSchema = schema
        const value = calculateDefault(this.array, this.itemSchema)
        this.index = this.array?.length
        this.array?.push(value)
        this.modal?.valid()
        this.requestUpdate()
    }

    stopEvent(evt: Event) {
        evt.preventDefault()
        evt.stopPropagation()
    }
    close(evt: CustomEvent) {
        const detail = evt.detail
        if (!evt.detail.dismissed) {
            const field = this.shadowRoot?.getElementById("form-object") as FzElement
            evt.detail.value = field.value[this.refname ?? "id"]
            evt.detail.abstract = field.abstract()
        }
        this.reference = null
        this.stopEvent(evt)
        this.dispatchEvent(new CustomEvent("close", { detail }))
        this.modal?.valid(false)

    }

    override firstUpdated() {
        this.modal = this.shadowRoot?.querySelector('fz-dialog')
    }

    open() {
        if (this.modal) this.modal.open()
        if (this.arraySchema?.homogeneous && this.index === undefined) {
            this.addItem(this.arraySchema?.items)
        }

    }

}


