/* eslint-disable @typescript-eslint/no-explicit-any */
import { property, customElement } from "lit/decorators.js"
import { html, TemplateResult } from "lit"
import { FZCollection } from "./fz-collection"
import { FzField } from "../fz-element"
import { Pojo, FieldOrder } from "../lib/types"
import { when } from "../lib/tools"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-object")
export class FzObject extends FZCollection {

    @property({ attribute: false }) accessor activegroup: { [tabname: string]: string } = {}
    seen: WeakSet<object> | undefined

    static override get styles() {
        return [
            ...super.styles,
        ]
    }
    override toField(): void {
        // all is done at rendering
    }
    override toValue(): void {
        // properties are updated but object reference doesn't change 
    }
    // override check() {
    //     // this.content = this.shadowRoot?.getElementById('content') ?? undefined
    //     // this.content?.classList.add(this.valid ? 'valid' : 'invalid')
    //     // this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    // }

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


    private renderSingle(itemTemplates: TemplateResult[], fields: FieldOrder[], fieldpos: number): number {
        // render single item
        const fieldname = fields[fieldpos].fieldname
        const schema = this.schema.properties?.[fieldname]
        itemTemplates.push(schema ? this.renderItem(schema, fieldname) : html``)
        fieldpos += 1
        return fieldpos
    }

    private renderGroup(itemTemplates: TemplateResult[], fields: FieldOrder[], fieldpos: number): number {
        const group = []
        const groupnum = fields[fieldpos].groupnum
        const groupname = fields[fieldpos].groupname
        // render group items
        for (; fieldpos < fields.length && groupnum === fields[fieldpos].groupnum; fieldpos++) {
            const fieldname = fields[fieldpos].fieldname
            const schema = this.schema.properties?.[fieldname]
            group.push(schema ? this.renderItem(schema, fieldname) : html``)
        }
        // render group
        itemTemplates.push(html`
                <div class="card shadow" style="margin-bottom:5px">
                    <div class="card-header d-flex justify-content-between align-items-center">${groupname}</div>
                    <div class="card-body">${group}</div>
                </div>`)
        return fieldpos
    }

    private renderTabGroup(itemTemplates: TemplateResult[], fields: FieldOrder[], fieldpos: number): number {
        const group = []
        const groupnum = fields[fieldpos].groupnum
        const groupname = fields[fieldpos].groupname
        const tabname = fields[fieldpos].tabname
        // render group items
        for (; fieldpos < fields.length && groupnum === fields[fieldpos].groupnum; fieldpos++) {
            const fieldname = fields[fieldpos].fieldname
            const schema = this.schema.properties?.[fieldname]
            const hidden = this.activegroup[tabname] !== groupname
            group.push(
                html`<div 
                        class="tab-pane active container" 
                        style="margin:0;max-width:100%"  
                        id="content" 
                        ?hidden="${hidden}" 
                        data-tabname="${tabname}" 
                        data-groupname="${groupname}">
                        ${schema ? this.renderItem(schema, fieldname) : ''}
                    </div>`
            )
        }
        // render group
        itemTemplates.push(html`${group}`)
        return fieldpos
    }

    private renderTab(itemTemplates: TemplateResult[], fields: FieldOrder[], fieldpos: number): number {
        const tab: TemplateResult[] = []
        const tabnum = fields[fieldpos].tabnum
        const tabname = fields[fieldpos].tabname
        const firstpos = fieldpos
        this.activegroup[tabname] = fields[fieldpos].groupname

        while (fieldpos < fields.length && tabnum === fields[fieldpos].tabnum) {
            fieldpos = this.renderTabGroup(tab, fields, fieldpos)
        }
        const mapgroup: Pojo = {}
        for (let i = firstpos; i < fieldpos; i++) {
            const groupname = fields[i].groupname
            mapgroup[groupname] = 1
        }
        const groupnames = Object.keys(mapgroup)
        // render tab headers
        itemTemplates.push(
            html`<ul class="nav nav-tabs" id="content">
                ${groupnames.map(groupname =>
                html`<li class="nav-item">
                        <a class="nav-link" data-tabname="${tabname}" data-groupname="${groupname}" @click="${this.toggleTab}" aria-current="page" href="#" data-toggle="tab" href="#${groupname}">${groupname}</a>
                    </li>`)
                }
            </ul>`)
        // render tab contents
        itemTemplates.push(html`<div class="tab-content border border-top-0" id="content" style="padding-bottom:5px;margin-bottom:5px">${tab}</div>`)
        return fieldpos
    }


    override renderField(): TemplateResult {
        if (!this.schema?.properties) return html``
        if (this.collapsed) return this.renderCollapsed()
        const itemTemplates: TemplateResult[] = [];
        const fields = this.schema.order as FieldOrder[]
        let fieldpos = 0
        while (fields && fieldpos < fields.length) {
            const current = fields[fieldpos]
            if (current.tabname && current.groupname) {
                fieldpos = this.renderTab(itemTemplates, fields, fieldpos)
            } else if (current.groupname) {
                fieldpos = this.renderGroup(itemTemplates, fields, fieldpos)
            } else {
                fieldpos = this.renderSingle(itemTemplates, fields, fieldpos)
            }
        }

        // item case (this field is item of an array)
        if (this.isItem) {
            return (this.label=== "")
                ? html`<div>${this.renderLabel()}</div>${itemTemplates}`
                : html`<div ?hidden="${this.collapsed}" > ${itemTemplates} </div>`
        }

        // property case (this field is part of object.values())
        const hidelabel = this.isroot || this.label === ''
        return html`
            <div class="space-before">
                <div class="form-group row ${when(hidelabel,'d-none')}">
                    ${this.renderLabel()}
                    <div class="col-sm-1 d-none d-sm-block">
                        <div class="input-group ${this.validation}" @click="${this.toggle}" >
                            <div class="form-control border-0">${this.chevron()}</div>
                        </div>
                    </div>
                </div>
                <div ?hidden="${this.collapsed}" class="space-after ${when(!hidelabel ,'line-after line-before')}"> 
                    ${itemTemplates} 
                </div>
            </div>
        `
    }

    isRequiredProperty(name: string) {
        return !!this.schema.required?.includes(name)
    }

    override fields(): FzField[] {
        const fields: FzField[] = []
        const tags = Object.values(this.schema.properties ?? {})
            .map((property) => property.field).join(', ')
        const list = this.shadowRoot?.querySelectorAll(tags)
        list?.forEach((elem: Element) => fields.push(elem as FzField))
        return fields
    }

    override focus() {
        const fields = this.fields()
        const first = fields[0]
        first.dofocus()
    }

    override labelClicked(evt: Event) {
        if (this.isItem) {
            this.dispatchEvent(new CustomEvent('toggle-item', {
                detail: {
                    field: this
                },
                bubbles: true,
                composed: true
            }))
        } else {
            this.toggle(evt)
        }
        super.labelClicked(evt)
    }

    toggleTab(evt: Event) {
        const elem = evt.target as HTMLElement
        const tabname = elem.getAttribute("data-tabname") as string
        const groupname = elem.getAttribute("data-groupname") as string
        const tabs = elem.parentElement?.parentElement as HTMLElement
        const childs = tabs?.querySelectorAll('a') ?? []
        for (const item of childs) item.classList.remove("active")
        elem.classList.add("active")
        this.activegroup[tabname] = groupname
        const content = tabs.nextElementSibling
        const panes = content?.querySelectorAll('.tab-pane') ?? []
        if (panes) {
            for (const item of panes) {
                (item as HTMLElement).hidden = item.getAttribute("data-groupname") !== groupname ? true : false
            }
        }
        this.eventStop(evt)
    }

}