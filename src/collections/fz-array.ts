/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, property } from "lit/decorators.js"
import { html, TemplateResult } from "lit"
import { getSchema, isArray, isFunction, isObject, when } from "../lib/tools"
import { FZCollection } from "./fz-collection"
import { EMPTY_SCHEMA, Schema } from "../lib/schema"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-array")
export class FzArray extends FZCollection {

    @property({ attribute: false }) accessor current: number | null = null
    private schemas: Schema[] = []
    private currentSchema?: Schema


    override toField(): void {
        // all is done at rendering
    }
    override toValue(): void {
        // items are updated but array reference doesn't change 
    }

    override connectedCallback() {
        super.connectedCallback()
        this.listen(this, 'toggle-item', evt => (this.close(), this.eventStop(evt)))
    }
    override requestUpdate(name?: PropertyKey | undefined, oldvalue?: unknown): void {
        super.requestUpdate(name, oldvalue)
    }
    override get collapsed() {
        return !isArray(this.value,true) || super.collapsed
    }

    /**
    * render collapsed Object
    */
    protected override renderCollapsed(): TemplateResult {
        return html`
            <div class="form-group row space-before" @click=${this.labelClicked}>
                ${this.renderLabel()}
                <div class="col-sm-9">
                    <div class="input-group ${this.validation}" @click="${this.toggle}" >
                        <div class="form-control">
                            ${ isArray(this.value,true) ? html`${this.chevron()} ${this.abstract()}` : this.actionBtns() }
                        </div>
                    </div>
                </div>
            </div>
            ${this.renderErrors()}
        `
    }
    override labelClicked(evt: Event) {
        this.toggle(evt)
    }

    override renderField() {
        // always process order and schemas before rendering
        this.order()
        this.solveSchemas()

        if (this.collapsed) return this.renderCollapsed()
        const lines = this.value?.map((_i: unknown, i: number) => 
            (this.current === i) ? this.editableItem(i) : this.staticItem(i)
        ) ?? []

        const hidelabel = this.isroot || this.label === ''
        return html`
            <div class="space-before">
                <div class="form-group row ${when(hidelabel, 'd-none')}">
                    ${this.renderLabel()}
                    <div class="col-sm-1 d-none d-sm-block">
                        <div class="input-group ${this.validation}" @click="${this.toggle}" >
                            <div class="form-control border-0">${this.chevron()}</i></div>
                        </div>
                    </div>
                </div>
                <div class="space-after ${when(!hidelabel, 'line-after line-before')}"> 
                    <ul id="content" class="list-group">${lines}</ul>
                </div>
                ${this.renderErrors()}
                <div class="form-group row space-before " @click="${this.close}">
                    ${this.actionBtns()}
                </div>
            </div>
        `
    }


    /**
     * render the array action buttion (add / type select)
     */
    private actionBtns() {
        if (this.readonly) return ''

        const addBtn = html`
            <button 
                type="button" 
                @click="${this.add}" 
                class="btn btn-primary btn-sm col-sm-1"
                >
                <b>+</b>
            </button>`

        const typeSelect = this.schema.homogeneous ? '' : html`
            <div class="btn-group" style="float:right" role="group">
                <button 
                    id="btnGroupDrop1" 
                    type="button"
                    @click="${this.toggleDropdown}" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                    class="btn btn-primary dropdown-toggle btn-sm"
                >${this.currentSchema?.title || "Ajouter"}</button> 
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    ${this.schema.items?.oneOf?.map((schema: any, i: number) => html`
                        <a class="dropdown-item" @click="${() => this.selectSchema(i)}" >${schema.title || "Type" + i}</a>
                    `)}
                </div>
            </div>`
        return [addBtn,typeSelect]


    }

    /**
     * render the static flavour of an array item(abstracted)
     */
    private staticItem(index: number) {
        return html`
        <li 
                id="${index}"
                draggable="true" 
                @dragstart="${(evt: DragEvent) => this.drag(index, evt)}"
                @dragover="${this.allowDrop}"
                @drop="${this.drop}"   
                @click="${(evt: Event) => this.open(index, evt)}"              
                class="list-group-item"
            >
            ${this.badge(index)}
            ${this.abstract(index, this.schemas[index])}            
            ${this.delBtn(index)}
            <div>${this.renderItemErrors(index)}</div>
        </li>`
    }

    /**
     * render the editable flavour of an array item(abstracted)
     */
    private editableItem(index: number) {
        return html`
            <li class="list-group-item">
                ${this.renderItem(this.schemas[index], index)} 
            </li>`
    }
    /**
     * render the delete button for item
     */
    private delBtn(index: number) {
        if (this.readonly) return ''
        return html`<div 
            @click="${(evt: Event) => this.del(index, evt)}" 
            style="float:right;cursor: pointer;:" 
            aria-label="Close">
                <i class="bi bi-trash"></i>
            </div>`
    }

    override focusout(evt: Event) {
        super.focusout(evt)
        this.close()
    }

    open(index: number, evt?: Event) {
        if (this.current === index) {
            this.close()
        } else {
            this.current = index
            this.dofocus()
        }
        this.eventStop(evt)
    }
    close(evt?: Event) {
        this.eventStop(evt)
        this.current = null
        this.change()
    }
    drag(index: number, ev: DragEvent) {
        if (ev.dataTransfer) {
            ev.dataTransfer.setData('text', index.toString());
        }
        else if ((ev as any).originalEvent.dataTransfer) {
            (ev as any).originalEvent.dataTransfer.setData('text', index.toString());
        }
        this.current = null
        this.requestUpdate()
    }
    drop(ev: DragEvent) {
        if (ev.dataTransfer) {
            const from = parseInt(ev.dataTransfer.getData("text"), 10)
            const to = parseInt((ev.target as HTMLElement).id)
            this.value.splice(to, 0, this.value.splice(from, 1)[0])
            this.schemas.splice(to, 0, this.schemas.splice(from, 1)[0])
            this.requestUpdate()
        }
        this.eventStop(ev)
    }
    allowDrop(ev: DragEvent) {
        ev.preventDefault();
    }

    del(index: number, evt?: Event) {
        this.value.splice(index, 1)
        this.schemas.splice(index, 1)
        this.current = null
        this.change()
        this.eventStop(evt)
    }

    add(evt?: Event) {
        if (!this.currentSchema) return
        if (!isArray(this.value)) this.value = []
        const value = this.currentSchema._default(this.data)
        this.value.push(value)
        this.schemas.push(this.currentSchema)
        this.open(this.value.length - 1)
        this.change()
        this.eventStop(evt)
    }

    private toggleDropdown() {
        const display = (this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement)?.style.display
        display == "block" ? this.closeDropdown() : this.openDropdown()
    }

    private closeDropdown() {
        const elem = this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement
        if (elem != null) {
            elem.style.display = "none"
        }
    }

    private openDropdown() {
        const elem = this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement
        if (elem != null) {
            elem.style.display = "block"
        }
    }
    private selectSchema(index: number) {
        this.currentSchema = this.schema.items?.oneOf?.[index]
        this.closeDropdown()
        this.requestUpdate()
    }

    /**
     * calculate schema for each item
     */
    private solveSchemas(force = false) {
        if (!isObject(this.schema?.items)) return
        if (!force && this.currentSchema && this.schemas) return
        if (!this.currentSchema) this.currentSchema = this.schema.homogeneous ? this.schema.items : (this.schema.items.oneOf?.[0] ?? EMPTY_SCHEMA)
        this.schemas = this.value == null ? [] : this.schema.homogeneous
            ? this.value.map(() => this.schema.items)
            : this.value.map((value: any) => getSchema(value) ?? this.schema.items?.oneOf?.find((schema) => isFunction(schema.case) && schema.case(EMPTY_SCHEMA, value, this.data, this.key, this.derefFunc, this.form.options.userdata)))
    }

    /**
     * calculate ordering of the items
     */
    private order() {
        if (!isArray(this.value)) return
        const current = this.value
        const orderedidx = current.map((_x, i: number) => i).sort((ia, ib) => {
            const va = this.evalExpr("rank", this.schemas[ia], current[ia], this.value, ia)
            const vb = this.evalExpr("rank", this.schemas[ib], current[ib], this.value, ib)
            switch (true) {
                case (va === vb): return 0
                case (va == null): return -1
                case (vb == null): return 1
                case (va > vb): return 1
                case (va < vb): return -1
                default: return 0
            }
        })
        const schemas = this.schemas.map(x => x)
        const values = current.map(x => x)
        for (let i = 0; i < orderedidx.length; i++) {
            this.schemas[i] = schemas[orderedidx[i]]
            this.value[i] = values[orderedidx[i]]
        }
    }

}