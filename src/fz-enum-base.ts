/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, TemplateResult } from "lit"
import { FzElement } from "./fz-element";
import { FzItemDlg } from "./fz-item-dlg";
import { getSchema, isEmptyValue } from "./tools"

export type EnumItem = { label: string; value: any }

export abstract class FzEnumBase extends FzElement {

    abstract renderEnum(): TemplateResult
    protected enums?: EnumItem[]
    protected refenum: { pointer: string, refname: string, refarray: any[] } | null = null

    renderInput() {
        this.evalEnums()
        return html`
            ${ this.withAdd ? html`<fz-item-dlg  @click="${this.eventStop}" .reference="${this.refenum}" @close="${this.close}"></fz-item-dlg>` : "" }
            ${this.renderEnum()}`
    }

    get withAdd() {
        return (this.schema.refTo && this.schema.addTo)
    }

    get showNullChoice() {
        if (!this.schema.nullAllowed) return true
        const show = this.schema.nullAllowed && (
            !this.schema.enum?.includes(null) ||
            !this.schema.oneOf?.some((item: any) => item.const === null) ||
            !this.schema.anyOf?.some((item: any) => item.const === null)
        )
        return show
    }

    get modal() {
        return this.shadowRoot?.querySelector('fz-item-dlg') as FzItemDlg
    }

    close(evt: CustomEvent) {
        if (evt.detail.dismissed) {
            this.refenum?.refarray.pop()
        } else {
            if (this.input && this.input instanceof HTMLSelectElement) {
                const option = document.createElement("option")
                option.value = evt.detail.value
                option.text = evt.detail.abstract
                this.input.add(option)
                option.selected = true
            }
        }
        if (this.refenum?.pointer) this.form?.updateField(this.refenum?.pointer)
        super.change()
        this.requestUpdate()
    }

    override change(_evt?: Event) {
        if (this.input?.value == "~~ADD~~" && this.modal) {
            this.modal.open()
            this.modal.reference = this.refenum
            this.modal.requestUpdate()
        } 
        super.change()
    }

    isSelected(value: any) { return this.value === value }

    convertToInput(value: any) {
        if (value == null) return null
        switch (this.schema.basetype) {
            case 'integer': return isNaN(value) ? null : parseInt(value, 10)
            case 'number': return isNaN(value) ? null : parseFloat(value)
            case 'boolean': return !!value
        }
        return String(value)
    }

    convertToValue(value: any) {
        return (value === "~~ADD~~" || value === "~~EMPTY~~" || isEmptyValue(value)) ? this.empty : value;
    }

    evalEnums() {
        this.enums = []
        this.refenum = this.schema.refTo && this.evalExpr("refTo")
        switch (true) {
            case !!(this.refenum && this.refenum.refname && Array.isArray(this.refenum.refarray)):
                const refname = this.refenum?.refname ?? 'id'
                const refarray = this.refenum?.refarray
                this.enums = refarray?.reduce((list: any[], item: any, index: number) => {
                    const schema = getSchema(item)
                    const ok = this.evalExpr('filter', schema, item, refarray, index)
                    if (ok) {
                        const value = item[refname]
                        const label = schema?.abstract(schema, item, refarray, index, (p: string) => this.derefData(p)) ?? value
                        list.push({ label, value })
                    }
                    return list
                }, [])
                break
            case !!(this.schema.enum):
                this.enums = this.schema.enum.reduce((list: any[], value: any) => {
                    const ok = this.evalExpr('filter', this.schema, value, this.data, this.key)
                    if (ok) list.push({ label: String(value), value })
                    return list
                }, [])
                break
            case !!(this.schema.oneOf):
                this.enums = this.schema.oneOf.reduce((list: any[], type: any) => {
                    const ok = this.evalExpr('filter', type, type.const, this.data, this.key)
                    if (ok) list.push({ label: type.title ?? type.description ?? type.const, value: type.const })
                    return list
                }, [])
                break
            case !!(this.schema.anyOf):
                this.enums = this.schema.anyOf.reduce((list: any[], type: any) => {
                    const ok = this.evalExpr('filter', type, type.const, this.data, this.key)
                    if (ok) list.push({ label: type.title ?? type.description ?? type.const, value: type.const })
                    return list
                }, [])
                break
        }
    }
}

