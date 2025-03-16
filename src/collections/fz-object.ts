/* eslint-disable @typescript-eslint/no-explicit-any */
import { property, customElement } from "lit/decorators.js"
import { html, css, TemplateResult } from "lit"
import { FZCollection } from "./fz-collection"
import { FzElement } from "../fz-element"
import { Pojo, FieldOrder } from "../lib/types"
import { Validator } from "../lib/validation"
import { getCircularReplacer } from "../lib/tools"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-object")
export class FzObject extends FZCollection {

    @property({ attribute: false }) accessor collapsed = false
    @property({ attribute: false }) accessor activegroup: { [tabname: string]: string } = {}
    private validator!: Validator
    seen: WeakSet<object> | undefined

    static override get styles() {
        return [
            ...super.styles,
            css`
                .panel {
                    padding:5px;
                    border: solid 1px lightgray;
                    border-radius:10px; 
                    user-select: none;
                }
                `
        ]
    }
    override toField(): void {
        // all is done at rendering
    }
    override toValue(): void {
        // properties are updated but object reference doesn't change 
    }
    override check() {
    //     if (!this.validator) return

    //     this.valid = true
    //     this.message = ''
    //     switch (true) {
    //         case (this.required && this.value == undefined):
    //             this.valid = false
    //             this.message = formatMsg('valueMissing')
    //             break
    //         case !this.required && this.value == undefined:
    //             break
    //         default:
    //             this.valid = this.validator.validate(this.value)
    //             const errors = this.validator.errors.filter(e => e.instancePath.match(/\//g)?.length === 1 )
    //             if (this.valid == false && errors && errors.length > 0) this.message = this.validator.text
    //     }

    //     this.content = this.shadowRoot?.getElementById('content') ?? undefined
    //     this.content?.classList.add(this.valid ? 'valid' : 'invalid')
    //     this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    }

    override connectedCallback() {
        super.connectedCallback()
        this.listen(this, 'update', _ => (this.check(), this.requestUpdate()) )
    }

    override firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties)
        this.setCollapsed()
    }

    override update(changedProperties: Map<string, unknown>) {
        if (!this.validator && changedProperties.has("schema") && Object.keys(this.schema.properties ?? {})?.length > 0) {
            const json = JSON.stringify(this.schema, getCircularReplacer)
            this.validator = new Validator(JSON.parse(json));
            this.check()
        }
        super.update(changedProperties);
    }

    private setCollapsed() {
        // si root on collapse jamais
        this.collapsed = (this.schema.parent == null) ? false : this.evalExpr("collapsed")
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

    get deletable() {
        if (this.schema.parent == null || this.isEmpty) return false
        if (this.schema.nullAllowed && this.nullable) return true;
        if (!this.schema.nullAllowed && !this.required) return true;
        return false
    }

    async delete() {
        this.value = this.empty
        if (this.collapsed !== null) this.collapsed = true
        this.requestUpdate()
        await this.updateComplete
        this.fields().forEach(field => field.check())
    }

    override renderField(): TemplateResult {
        if (!this.schema.properties) return html``
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
        return html`${this.isItem
            ? html`<div>${this.renderLabel}</div>${itemTemplates}`
            : this.schema.title === "" ?  html`<div ?hidden="${this.collapsed}" > ${itemTemplates} </div>`
            : html`<div class="panel" id="content" >
                <div class="panel-heading">
                    <div>
                        ${this.renderLabel}
                        ${this.collapsed ? html`${this.abstract()}` : html``}
                        <button
                            ?hidden="${!this.deletable}"
                            @click="${() => this.delete()}" 
                            type="button" style="float:right" class="btn-close" aria-label="Close">
                        </button>
                    </div>
                </div>
                <hr ?hidden="${this.collapsed}" style="margin: 0 0" >
                <div ?hidden="${this.collapsed}" > ${itemTemplates} </div>
                </div>`}`
    }

    isRequiredProperty(name: string) {
        return !!this.schema.required?.includes(name)
    }

    override fields(): FzElement[] {
        const fields: FzElement[] = []
        const tags = (Object.values(this.schema.properties ?? {}) as Pojo[])
            .map((property: Pojo) => property.field).join(', ')
        const list = this.shadowRoot?.querySelectorAll(tags)
        list?.forEach((elem: Element) => fields.push(elem as FzElement))
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

    toggle(evt: Event) {
        if  (this.collapsed !== null) this.collapsed = !this.collapsed
        this.eventStop(evt)
        this.requestUpdate()
    }
}