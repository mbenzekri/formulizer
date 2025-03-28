/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement, property } from "lit/decorators.js"
import { html, TemplateResult } from "lit"
import { getSchema, isFunction, isObject, when } from "../lib/tools"
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
    //private content?: HTMLElement
    //private validator!: DataValidator
    get nomore(): boolean {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems
    }

    get noless(): boolean {
        return this.schema.minItems && this.value && this.value.length <= this.schema.minItems
    }

    static override get styles() {
        return [
            ...super.styles,
        ]
    }

    override toField(): void {
        // all is done at rendering
    }
    override toValue(): void {
        // items are updated but array reference doesn't change 
    }

    // override check() {
    //     this.content = this.shadowRoot?.getElementById('content') ?? undefined
    //     this.content?.classList.add(this.valid ? 'valid' : 'invalid')
    //     this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    // }

    override connectedCallback() {
        super.connectedCallback()
        this.listen(this, 'toggle-item', evt => (this.close(), this.eventStop(evt)))
    }
    override requestUpdate(name?: PropertyKey | undefined, oldvalue?: unknown): void {
        super.requestUpdate(name, oldvalue)
        // if (name !== undefined) {
        //     this.solveSchemas(true)
        //     super.requestUpdate(name,oldvalue)    
        // }
    }

    /**
    * render collapsed Object
    */
    protected override renderCollapsed(): TemplateResult {
        return html`
            <div class="form-group row space-before">
                ${this.renderLabel()}
                <div class="col-sm-9">
                    <div class="input-group ${this.validation}" @click="${this.toggle}" >
                        <div class="form-control">${this.chevron()} ${this.abstract()}</div>
                    </div>
                </div>
            </div>
        `
    }

    override renderField() {
        this.order()
        this.solveSchemas()

        const lines = this.value?.map((_i: unknown, i: number) => 
            (this.current === i) ? this.editableItem(i) : this.staticItem(i)
        ) ?? []

        // property case (this field is part of object.values())
        const hidelabel = this.isroot || this.label === ''
        return html`
            <div class="space-before">
                <div class="form-group row ${when(hidelabel, 'd-none')}">
                    ${this.renderLabel()}
                    <div class="col-sm-1 d-none d-sm-block">
                        <div class="input-group ${this.validation}" @click="${this.toggle}" >
                            <div class="form-control border-0">${this.chevron()}</div>
                        </div>
                    </div>
                </div>
                <div ?hidden="${this.collapsed || lines.length == 0}" class="space-after ${when(!hidelabel, 'line-after line-before')}"> 
                    <ul id="content" class="list-group"> ${lines.length > 0 ? lines : '~ Aucun item'}</ul>
                </div>
                ${this.actionBtns()}
            </div>
        `

    }


    /**
     * render the array action buttion (add / type select)
     */
    private actionBtns() {
        if (this.readonly) return ''
        return html`
            <div class="form-group row space-before" @click="${this.close}">
                <button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm col-sm-1"><b>+</b></button>
                ${this.schema.homogeneous ? null : html`
                    <div class="btn-group" style="float:right" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle btn-sm"
                            @click="${this.toggleDropdown}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${this.currentSchema?.title || "Ajouter"}
                        </button> 
                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            ${this.schema.items?.oneOf?.map((schema: any, i: number) => html`<a class="dropdown-item"
                                @click="${() => this.selectSchema(i)}" >${schema.title || "Type" + i}</a>`)}
                        </div>
                    </div>`
            }
            </div>`
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
    renderItemErrors(index: number) {
        const errors= this.form.errors(`${this.pointer}/${index}`)
        return html`
            <span id="error" class="error-message error-truncated">
                ${errors.join(', ')}
            </span>`
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
        return html`
            <button 
                ?hidden="${this.noless}" 
                @click="${(evt: Event) => this.del(index, evt)}" 
                type="button" 
                style="float:right" 
                class="btn-close" 
                aria-label="Close">
            </button>`
    }

    focusout() {
        this.change()
    }

    override focus() {
        if (this.fields().length > 0) {
            const first = this.fields()[0]
            first.dofocus()
        }
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
        if (this.noless) return
        this.value.splice(index, 1)
        this.schemas.splice(index, 1)
        this.current = null
        this.change()
        this.eventStop(evt)
    }

    add(evt?: Event) {
        if (this.nomore || !this.currentSchema) return
        if (this.value == null) this.value = []
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
        if (this.value == null) return
        const current = this.value as any[]
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