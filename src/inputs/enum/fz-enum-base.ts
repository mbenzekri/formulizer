/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, TemplateResult } from "lit"
import { FzFromDlg } from "../../components/fz-item-dlg";
import { isFunction, isNull, isString, notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";
import { isFrom, Schema } from "../../lib/schema";
import { EnumItem, FromObject, Pojo, SCHEMA } from "../../lib/types";
import { query } from "lit/decorators.js";
import { FzFieldEnumEvent } from "../../lib/events";

export const FETCHING = []
export const EMPTY = []
const DEFAULT_FETCH_TIMEOUT = 10000 // 10sec 
export abstract class FzEnumBase extends FzInputBase {

    @query('fz-item-dlg') private modal?: FzFromDlg
    abstract renderEnum(): TemplateResult
    protected enums?: EnumItem[] = []
    protected refenum?: FromObject

    get extend() {
        return !!this.refenum?.extend
    }

    get showNullChoice() {
        if (!this.schema?.nullAllowed) return false
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
        if (this.refenum?.pointer) this.context?.updateField(this.refenum?.pointer)
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
        // if fetching is on going just wait result 
        if (this.enums == FETCHING || this.enums == EMPTY) return
        switch (true) {
            case isFunction(this.schema?.from):
                this.enums = this.getFrom()
                break
            case notNull(this.schema?.enumFetch):
                this.fetchEnum()
                .then(
                    (enums) => {
                        this.enums = enums
                        this.localErrors.delete("unable to fetch enum")
                    },
                    () => {
                        this.localErrors.add("unable to fetch enum")
                    },
                ).finally(() => {
                    this.requestUpdate()
                })
                break
            default: 
                this.enums = this.getEnum()
                if (this.enums.length == 0) this.enums = EMPTY
        }
        // result is empty enum , or fetching , or no empty enum list
        if (this.enums != FETCHING && this.enums?.length == 0) this.enums = EMPTY
    }

    private getEnum() {
        const unfiltered = Schema.inferEnums(this.schema)
        if (isNull(unfiltered)) return []
        return unfiltered?.reduce((list: EnumItem[], item) => {
            const ok = this.evalExpr('filter', this.schema, item.value, this.parent, this.key)
            if (ok) list.push(item)
            return list
        }, []) 
    }

    private async fetchEnum(): Promise<EnumItem[]> {
        return new Promise<EnumItem[]>((resolve, reject) => {
            if (!isString(this.schema.enumFetch)) return reject(`Schema:${this.schema.pointer} doesnt define "enumFetch" keyword`)
            const name = this.schema.enumFetch
            const field = this
            let resolved = false;
            const success = (data: EnumItem[]) => {
                clearTimeout(timeout)
                resolved = true 
                resolve(data) 
            }
            const failure = (message: string) => {
                clearTimeout(timeout)
                resolved = true
                reject(new Error(`EnumFetch "${name}" failed: ${message}`))
            }
            const timeoutfunc  = () => {
                if (!resolved)  reject(new Error(`Timeout when fetching enumeration"${name}"`))
            }
            const event = new FzFieldEnumEvent({name,field,success,failure,timeout:DEFAULT_FETCH_TIMEOUT}) 
            this.dispatchEvent(event);
            const timeout = setTimeout(timeoutfunc, event.detail.timeout)
        })
    }
    
    private getFrom(): EnumItem[] {
        const obj = this.evalExpr("from")
        if (isFrom(obj)) {
            this.refenum = obj 
            const name = this.refenum.name
            const target = this.refenum.target
            return target.reduce((list: EnumItem[], item: any, index: number) => {
                const schema = item[SCHEMA]
                const ok = schema._evalExpr('filter', schema, item, target as Pojo, index,this.derefFunc,this.context.appdata)
                if (ok) {
                    const value = item[name]
                    const title = schema._evalExpr('abstract',schema, item, target as Pojo, index, this.derefFunc, this.context.appdata)
                    list.push({ title, value })
                }
                return list
            }, [] as EnumItem[])
        }
        return []
    }
}

