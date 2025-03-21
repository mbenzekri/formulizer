/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html } from "lit"
import { isEmptyValue, notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";
import { ifDefined } from "lit/directives/if-defined.js";

enum SelectionState {
    idle, selecting
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop required
 */
@customElement("fz-asset")
export class FzInputAsset extends FzInputBase {
    private state = SelectionState.idle
    private oldValue = ""

    override toField(): void {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "")
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = isEmptyValue(this.input.value) ? this.empty : String(this.input.value)
        }
    }


    get assets() { return (this.schema.assets ?? "").split(","); }
    get asset() { return this.form.asset }

    renderInput() {
        return html`
            <div class="input-group">
                <input
                    id="input"
                    type="text"
                    @input="${this.change}"
                    placeholder="${ifDefined(this.label ?? "")}"
                    readonly
                    class="form-control ${this.validationMap}"
                    autocomplete=off  spellcheck="false"
                />
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    ?hidden="${this.state == SelectionState.selecting}"
                    @click="${this.start}">
                    <i class="bi bi-globe"></i>
                </button>
                <button
                    ?hidden="${!(this.state == SelectionState.idle && !this.isEmpty)}"
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="${this.clear}">
                    <i class="bi bi-x"></i>
                </button>
                <button
                    ?hidden="${this.state != SelectionState.selecting}"
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="${this.cancel}">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </button>
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    ?hidden="${this.state != SelectionState.selecting}"
                    @click="${this.done}">
                    <i class="bi bi-check"></i>
                </button>
            </div>
        `
    }

    override firstUpdated(changedProperties: any): void {
        super.firstUpdated(changedProperties);
        this.state = SelectionState.idle
    }

    clear(): void {
        this.value = this.empty
        this.requestUpdate()
    }

    async start(): Promise<void> {
        this.oldValue = this.value
        await this.asset?.select(this.schema.assets, this.value, selected => {
            this.value = selected
            this.state = SelectionState.selecting
            this.requestUpdate()
        })
        this.state = SelectionState.selecting
        this.requestUpdate()
    }

    async cancel(): Promise<void> {
        await this.asset?.done()
        this.value = this.oldValue
        this.state = SelectionState.idle
        this.requestUpdate()
    }

    async done(): Promise<void> {
        await this.asset?.done()
        this.state = SelectionState.idle
        this.requestUpdate()
        this.change()
    }
}