/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, TemplateResult } from "lit"
import { FzItemDlg } from "../../components/fz-item-dlg";
import { getSchema, isFunction, isNull, notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";
import { isFrom, Schema } from "../../lib/schema";
import { EnumItem, FromObject } from "../../lib/types";
import { query } from "lit/decorators.js";


export abstract class FzEnumBase extends FzInputBase {

    @query('fz-item-dlg') private modal?: FzItemDlg
    abstract renderEnum(): TemplateResult
    protected enums?: EnumItem[]
    protected refenum?: FromObject

    get extend() {
        return !!this.refenum?.extend
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
            ${ this.extend ? html`<fz-item-dlg  @click="${this.eventStop}" .reference="${this.refenum}" @close="${this.close}"></fz-item-dlg>` : "" }
            ${this.renderEnum()}`
    }


    close(evt: CustomEvent) {
        if (evt.detail.dismissed) {
            this.refenum?.target.pop()
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
        switch (true) {
            case isFunction(this.schema.from):
                this.enums = this.getInsideEnum()
                break
            case notNull(this.schema.enumRef):
                this.enums = this.getUserEnum()
                break
            default: 
                this.enums = this.getEnum()
        }
    }

    private getEnum() {
        const unfiltered = Schema.inferEnums(this.schema)
        if (isNull(unfiltered)) return []
        return unfiltered?.reduce((list: EnumItem[], item) => {
            const ok = this.evalExpr('filter', this.schema, item.value, this.data, this.key)
            if (ok) list.push(item)
            return list
        }, []) 
    }

    private getUserEnum() {
        const name = this.schema.enumRef
        const event = new CustomEvent("enum", {
            detail: { name, enum: [] as EnumItem[] },
            bubbles: true,
            cancelable: false,
            composed: true

        })
        this.dispatchEvent(event);
        return event.detail.enum
    }

    private getInsideEnum(): EnumItem[] {
        const obj = this.evalExpr("from")
        if (isFrom(obj)) {
            this.refenum = obj 
            const name = this.refenum.name
            const target = this.refenum.target
            return target.reduce((list: EnumItem[], item: any, index: number) => {
                const schema = getSchema(item)
                const ok = this.evalExpr('filter', schema, item, target, index)
                if (ok) {
                    const value = item[name]
                    const title = isFunction(schema?.abstract) ? schema.abstract(schema, item, target, index, this.derefFunc) : value
                    list.push({ title, value })
                }
                return list
            }, [] as EnumItem[])
        }
        return []
    }
}

