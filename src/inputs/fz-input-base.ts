/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, TemplateResult } from "lit";
import { FzElement } from "../fz-element";
import { getCircularReplacer } from "../lib/tools";

const invalidkeys = [
    'valueMissing',
    'badInput',
    'patternMismatch',
    'tooLong',
    'tooShort',
    'rangeOverflow',
    'rangeUnderflow',
    'stepMismatch',
    'customError',
    'typeMismatch'
]


export abstract class FzInputBase extends FzElement {

    abstract renderInput(): any;
    abstract override toField(): void;
    abstract override toValue(): void;

    /**
     * return HTMLInputElement used to edit field value
     * pay attention may not always exit, some fields dont use HTML inputs (ex: signature) 
     */
    get input() {
        return (this.shadowRoot?.getElementById('input') as HTMLInputElement)
    }

    override renderField(): TemplateResult {
        return html`
            <div class="form-group row">
                ${this.renderLabel}
                <div class="col-sm">${this.renderInput()}</div>
            </div>`
    }

    /**
     * on first updated set listeners
     */
    override firstUpdated(_changedProperties: any) {
        // for debug 'F9' output state of field
        if (this.input) this.listen(this.input,'keydown', (evt: Event) => this.debugKey(evt as KeyboardEvent))
        // initialize input from value
        this.toField()
        this.check()
    }

    /**
     * overide focus for all input based fields
     */
    override focus() { this.input?.focus() }

    /**
     * trap F9 key down to log debug Field state
     * @param evt keyboard event to trap key
     */
    private debugKey(evt: KeyboardEvent) {
        if (evt.key === 'F9') {
            (window as any)._FZ_FORM_FIELD_DEBUG = this
            console.log(invalidkeys.map((key) => `${key} = ${(this.input.validity as any)[key]}`).join('\n'))
            const outlist = [
                ['name', this.name],
                ['valid', this.valid],
                ['visible', this.visible],
                ['required', this.required],
                ['readonly', this.readonly],
                ['check', JSON.stringify(this.input.validity)],
                ['data', JSON.stringify(this.data, (key, value) => typeof key === 'symbol' ? undefined : value, 4)],
                ['input', this.input.value],
                ['value', this.value],
                ['schema', JSON.stringify(this.schema, getCircularReplacer)],
            ]
            console.log(outlist.map(item => item.join(" = ")).join("\n"))
            this.eventStop(evt)
            debugger
        }
    }

    override check() {
        // const input = this.input
        // if (!input) {
        //     this.valid = false
        //     this.message = ''
        //     return
        // }
        // const validity = this.input.validity
        // let countinvalid = 0
        // let message = ''
        // invalidkeys.forEach(key => {
        //     if (key === 'valid') return
        //     const keyinvalid = (validity as any)[key]
        //     countinvalid += keyinvalid ? 1 : 0
        //     if (keyinvalid) message = formatMsg(key, input)
        // })
        // this.valid = (countinvalid === 0)
        //     || (countinvalid === 1 && validity.badInput && this.value == null && !this.required)
        // this.message = this.valid ? '' : message
        // this.input?.classList.add(this.valid ? 'valid' : 'invalid')
        // this.input?.classList.remove(this.valid ? 'invalid' : 'valid')
    }

}