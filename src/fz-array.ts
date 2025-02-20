/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement,property} from "lit/decorators.js"
import {  html, css } from "lit"
import { FzElement } from "./fz-element"
import { Pojo } from "./types"
import { DataValidator, getCircularReplacer, getSchema, isEmptyValue } from "./tools"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-array")
export class FzArray extends FzElement {

    @property({ attribute: false }) accessor current: number | null = null
    private schemas: Pojo[] = []
    private currentSchema?: Pojo
    private content?: HTMLElement
    private validator!: DataValidator
    get nomore(): boolean {
        return this.schema.maxItems && this.value && this.value.length >= this.schema.maxItems
    }

    get noless(): boolean {
        return this.schema.minItems && this.value && this.value.length <= this.schema.minItems
    }

    convertToInput(_value: any) {
        throw new Error("IMPOSSIBLE : PAS D'INPUT POUR LES ARRAY!")
    }
    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : value;
    }

    static override get styles() {
        return [
            ...super.styles,
            css`.panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }`
        ]
    }

    override update(changedProperties: Map<string, unknown>) {
        if (!this.validator && changedProperties.has("schema") && Object.keys(this.schema).length !== 0) {
            const json = JSON.stringify(this.schema, getCircularReplacer)
            this.validator = new DataValidator(JSON.parse(json));

            this.check()
        }
        super.update(changedProperties);
    }

    override check() {
        if (!this.validator) return

        this.valid = true
        this.message = ''
        switch (true) {
            case (this.required && this.value == undefined):
                this.valid = false
                this.message = this.getMessage('valueMissing')
                break
            case !this.required && this.value == undefined:
                break
            default:
                this.valid = this.validator.validate(this.value)
                const errors = this.validator.errors()?.filter(e => e.instancePath.match(/\//g)?.length === 1 )
                if (this.valid == false && errors && errors.length > 0) this.message = this.validator.errorsText(errors)
        }

        this.content = this.shadowRoot?.getElementById('content') ?? undefined
        this.content?.classList.add(this.valid ? 'valid' : 'invalid')
        this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    }

    override connectedCallback() {
        super.connectedCallback()
        this.addEventListener('update', () => {
            this.check()
        })
        this.addEventListener('toggle-item',(evt) => {
            this.close()
            this.eventStop(evt)
        })
    }
    override requestUpdate(name?: PropertyKey | undefined, oldvalue?: unknown): void {
        if (name !== undefined) {
            this.solveSchemas(true)
            super.requestUpdate(name,oldvalue)    
        }
    }

    renderInput() {
        return html``
    }

    override renderField() {
        this.solveSchemas()
        const lines = (!this.data || !this.value) ? [] : this.value.map((_i: unknown, i: number) => html`${(this.current === i) ? this.renderEditable(i) : this.renderStatic(i)}`)
        return html`
            <div @focusout="${this.focusout}">
                <div class="form-group row">
                ${ this.schema.title === "" ? html`` : this.renderLabel }
                    <div class="col-sm">
                        <ul id="content" class="list-group">
                            ${lines}
                            ${this.readonly? html`` : html`
                                <li class="list-group-item" @click="${this.close}">
                                    <button type="button" @click="${this.add}" ?disabled="${this.nomore}" class="btn btn-primary btn-sm "><b>+</b></button>
                                    ${ this.schema.homogeneous ? null : html`
                                        <div class="btn-group" style="float:right" role="group">
                                            <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle btn-sm"
                                                @click="${this.toggleDropdown}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            ${this.currentSchema?.title || "Ajouter"}
                                            </button> 
                                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                ${this.schema.items.oneOf.map((schema: any, i: number) => html`<a class="dropdown-item"
                                                    @click="${() => this.selectSchema(i)}" >${schema.title || "Type" + i}</a>`)}
                                            </div>
                                        </div>`
                                    }
                                </li>
                            `}
                        </ul>
                    </div>
                </div>
            </div>`
    }

    private renderStatic(index: number) {
        this.solveOrder()
        this.solveSchemas()
        return html`
        <li 
                id="${index}"
                draggable="true" 
                @dragstart="${(evt: DragEvent) => this.drag(index,evt)}"
                @dragover="${this.allowDrop}"
                @drop="${this.drop}"   
                @click="${(evt: Event) => this.open(index,evt)}"              
                class="list-group-item"
            >
            ${this.abstract(index,this.schemas[index])}
            ${this.readonly? html`` : html`<button ?hidden="${this.noless}" @click="${(evt: Event) => this.del(index,evt)}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>`}
        </li>`
    }

    private renderEditable(index: number) {
        const schema = this.schemas[index]
        return html`<li class="list-group-item"> ${this.renderItem(schema, index)} </li>`
    }

    focusout() {
        // MBZ A VERIFIER this.close()
        this.triggerChange()
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
        this.current = null
        this.triggerChange()
        this.eventStop(evt)
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
    del(index: number,evt?: Event) {
        if (this.noless) return
        this.remItem(index)
        this.eventStop(evt)
    }
    add(evt?: Event) {
        if (this.nomore || !this.currentSchema) return
        this.addItem(this.currentSchema)
        this.eventStop(evt)
    }
    private remItem(index: number) {
        this.value.splice(index, 1)
        this.schemas.splice(index, 1)
        this.current = null
        this.requestUpdate()
        this.triggerChange()
        this.check()
    }
    private addItem(schema: Pojo, edit = true) {
        if (this.value == null) this.value = []
        const value = this.default(this.data, schema)
        this.value.push(value)
        this.schemas.push(schema)
        if (edit) this.open(this.value.length-1)
        this.triggerChange()
        this.requestUpdate()
        this.check()
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
        this.currentSchema = this.schema.items.oneOf[index]
        this.closeDropdown()
        this.requestUpdate()
    }
    private solveSchemas(force = false) {
        if (!this.schema?.items) return
        if (!force && this.currentSchema && this.schemas) return
        if (!this.currentSchema) this.currentSchema = this.schema.homogeneous ?  this.schema.items : this.schema.items.oneOf[0]
        this.schemas = this.value == null ? [] : this.schema.homogeneous
            ? this.value.map(() => this.schema.items)
            : this.value.map((value: any) => getSchema(value) ?? this.schema.items.oneOf.find((schema: any) => schema.case && schema.case(null, value, this.data, this.key, this.derefFunc)))
    }
    private solveOrder() {
        if (this.value == null) return
        const current = this.value as any[]
        const orderedidx = current.map((_x , i:number) => i).sort((ia, ib ) => {
            const va = this.evalExpr("orderBy",this.schemas[ia],current[ia],this.value,ia)
            const vb = this.evalExpr("orderBy",this.schemas[ib],current[ib],this.value,ib)
            switch (true) {
                case (va === vb): return 0
                case (va == null): return -1
                case (vb == null): return 1
                case (va > vb ): return 1
                case (va < vb): return -1
                default: return 0 
            }
        })
        const schemas = this.schemas.map(x => x)
        const values = current.map(x => x)
        for (let i=0;i <orderedidx.length;i++) {
            this.schemas[i] = schemas[orderedidx[i]]
            this.value[i] = values[orderedidx[i]]
        }
    }

}