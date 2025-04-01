/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { css, html, TemplateResult } from "lit"
import { repeat } from "lit/directives/repeat.js"
import { FZCollection } from "./fz-collection";
import { Pojo } from "../lib/types";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-enum-array")
export class FzArray extends FZCollection {

    static override get styles() {
        return [
            ...super.styles,
            css`
                ul {
                    max-height: 300px; 
                    overflow-y: scroll
                }
            `
        ]
    }
    override toField(): void {
        // all is done at rendering
    }
    override toValue(): void {
        // items are updated but array reference doesn't change 
    }
    override renderCollapsed(): TemplateResult {
        return this.renderField()
    }
    override renderField(): TemplateResult {
        return html`
            <div class="form-group row">
                ${this.renderLabel()}
                <div class="col-sm">
                    <ul id="content" class="list-group" >
                        ${repeat(this.getItems(), (item: any) => item, (item: any) => 
                            html`
                                <li class="list-group-item">
                                    <div>
                                        <input
                                            type="checkbox"
                                            ?disabled="${this.readonly}"
                                            ?checked="${this.value?.includes(item.value)}"
                                            @click="${() => this.toggleItem(item.value)}"
                                            class="form-check-input"
                                            autocomplete=off  spellcheck="false"
                                        />
                                        <label class="form-check-label">${item.label}</label>
                                    </div>
                                </li>`
                        )}
                    </ul>
                </div>
            </div>`
    }

    toggleItem(value: any) {
        if (this.value == null) this.value = []
        if (this.value.includes(value)) {
            const pos = this.value.indexOf(value)
            if (pos >= 0) this.value.splice(pos, 1)
        }
        else { this.value.push(value) }
    }

    getItems() {
        const enums = this.schema.items?.enum
        const data = this.data as Pojo
        if (enums) {
            return enums.reduce((list: any[], value: any) => {
                const ok = this.evalExpr('filter', this.schema.items, value, data[this.key] as Pojo, -1)
                if (ok) list.push({ label: String(value), value })
                return list
            }, [])
        }

        const consts = this.schema.items?.oneOf
        if (consts) return consts.reduce((list: any[], type: any) => {
            const ok = this.evalExpr('filter', type, type.const, this.data[this.key] as Pojo, -1)
            if (ok) list.push({ label: type.title ?? type.description ?? type.const, value: type.const })
            return list
        }, [])
        return []
    }
}