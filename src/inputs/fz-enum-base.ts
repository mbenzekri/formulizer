/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, TemplateResult } from "lit"
import { FzItemDlg } from "../components/fz-item-dlg";
import { getSchema, isArray, isFunction } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";
import { Schema } from "../lib/schema";
import { EnumItem } from "../lib/types";


export abstract class FzEnumBase extends FzInputBase {

    abstract renderEnum(): TemplateResult
    protected enums?: EnumItem[]
    protected refenum: { pointer: string, refname: string, refarray: any[] } | null = null

    get modal() {
        return this.shadowRoot?.querySelector('fz-item-dlg') as FzItemDlg
    }

    get withAdd() {
        return (this.schema.refTo && this.schema.addTo)
    }

    get showNullChoice() {
        if (!this.schema.nullAllowed) return false
        const show = this.schema.nullAllowed && (
            !this.schema.enum?.includes(null) ||
            !this.schema.oneOf?.some((item: any) => item.const === null) ||
            !this.schema.anyOf?.some((item: any) => item.const === null)
        )
        return show
    }

    renderInput() {
        this.evalEnums()
        return html`
            ${ this.withAdd ? html`<fz-item-dlg  @click="${this.eventStop}" .reference="${this.refenum}" @close="${this.close}"></fz-item-dlg>` : "" }
            ${this.renderEnum()}`
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
        } else {
            super.change()
        }
    }

    isSelected(value: any) { return this.value === value }

    evalEnums() {
        this.enums = []
        this.refenum = this.schema.refTo && this.evalExpr("refTo")
        switch (true) {
            case this.refenum?.refname != null && isArray(this.refenum.refarray): {
                const refname = this.refenum?.refname ?? 'id'
                const refarray = this.refenum?.refarray
                this.enums = refarray?.reduce((list: any[], item: any, index: number) => {
                    const schema = getSchema(item)
                    const ok = this.evalExpr('filter', schema, item, refarray, index)
                    if (ok) {
                        const value = item[refname]
                        const label = isFunction(schema?.abstract) ? schema.abstract(schema, item, refarray, index, this.derefFunc) : value
                        list.push({ label, value })
                    }
                    return list
                }, [])
                break
            }
            case this.schema.enumRef != null && this.form.options.ref != null: {
                this.enums = this.form.options.ref(this.schema.enumRef)
                break
            }
            default: {
                const unfiltered = Schema.inferEnums(this.schema)
                this.enums = unfiltered?.reduce((list: EnumItem[], item) => {
                    const ok = this.evalExpr('filter', this.schema, item.value, this.data, this.key)
                    if (ok) list.push(item)
                    return list
                }, [])
            }
        }
    }
}

