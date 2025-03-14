/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html, TemplateResult } from "lit"
import { repeat } from "lit/directives/repeat.js"
import { DataValidator } from "../lib/validation"
import { formatMsg, getCircularReplacer } from "../lib/tools";
import { FZCollection } from "./fz-collection";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-enum-array")
export class FzArray extends FZCollection {
    private content?: HTMLElement
    private validator!: DataValidator

    override toField(): void {
        // all is done at rendering
    }
    override toValue(): void {
        // items are updated but array reference doesn't change 
    }

    override renderField(): TemplateResult {
        return html`
            <div class="form-group row">
                ${this.renderLabel}
                <div class="col-sm">
                    <ul id="content" class="list-group"   style="max-height: 300px; overflow-y: scroll">
                            ${repeat(this.getItems(), (item: any) => item, (item: any) =>
                                html`
                                    <li class="list-group-item">
                                        <div>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                ?disabled="${this.readonly ? true : false}"
                                                ?checked="${this.value?.includes(item.value)}"
                                                @click="${() => this.toggle(item.value)}"/>
                                            <label class="form-check-label">${item.label}</label>
                                        </div>
                                    </li>
                                `)}
                    </ul>
                </div>
            </div>`
    }

    override check() {
        if (!this.validator) return
        this.valid = true
        this.message = ''
        switch (true) {
            case (this.required && this.value == undefined):
                this.valid = false
                this.message = formatMsg('valueMissing')
                break
            case !this.required && this.value == undefined:
                break
            default:
                this.valid = this.validator.validate(this.value)
                const errors = this.validator.errors()?.filter(e => e.instancePath.match(/\//g)?.length === 1)
                if (this.valid == false && errors && errors.length > 0) this.message = this.validator.errorsText(errors)
        }

        this.content = this.shadowRoot?.getElementById('content') ?? undefined
        this.content?.classList.add(this.valid ? 'valid' : 'invalid')
        this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
    }

    override connectedCallback() {
        super.connectedCallback()
        this.listen(this, 'update', () =>  this.check())
    }

    override update(changedProperties: Map<string, unknown>) {
        if (!this.validator && changedProperties.has("schema") && Object.keys(this.schema).length !== 0) {
            const json = JSON.stringify(this.schema, getCircularReplacer)
            this.validator = new DataValidator(JSON.parse(json));

            this.check()
        }
        super.update(changedProperties)
    }

    toggle(value: any) {
        if (this.value == null) this.value = []
        if (this.value.includes(value)) {
            const pos = this.value.indexOf(value)
            if (pos >= 0) this.value.splice(pos, 1)
        }
        else { this.value.push(value) }
    }

    getItems() {
        const enums = this.schema.items?.enum
        if (enums) return enums.reduce((list: any[], value: any) => {
            const ok = this.evalExpr('filter', this.schema.items, value, this.data[this.key], -1)
            if (ok) list.push({ label: String(value), value })
            return list
        }, [])

        const consts = this.schema.items?.oneOf
        if (consts) return consts.reduce((list: any[], type: any) => {
            const ok = this.evalExpr('filter', type, type.const, this.data[this.key], -1)
            if (ok) list.push({ label: type.title ?? type.description ?? type.const, value: type.const })
            return list
        }, [])
        return []
    }
}