/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, PropertyValues, TemplateResult } from "lit";
import { FzField } from "../fz-element";
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


export abstract class FzInputBase extends FzField {

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
                ${this.renderLabel()}
                <div class="col-sm">${this.renderInput()}</div>
            </div>`
    }

    /**
     * on first updated set listeners
     */
    override firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties)
        // for debug 'F9' output state of field
        if (this.input) this.listen(this.input,'keydown', (evt: Event) => this.debugKey(evt as KeyboardEvent))
    }

    override disconnectedCallback(): void {
        this.input && (this.input.value = "")
        super.disconnectedCallback()
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
        const logger = FzLogger.get("input",{field:this})
        if (evt.key === 'F9') {
            (window as any)._FZ_FORM_FIELD_DEBUG = this
            const mapping = invalidkeys.map((key) => `${key} = ${(this.input.validity as any)[key]}`).join('\n')
            logger.info("invalid mapping \n%s",mapping)
            const outlist = [
                ['schema', JSON.stringify(this.schema, getCircularReplacer).substring(0,100)],
                ['data', JSON.stringify(this.data, (key, value) => typeof key === 'symbol' ? undefined : value).substring(1,100)],
                ['pointer',this.pointer],
                ['name', this.name],
                ['valid', this.valid],
                ['visible', this.visible],
                ['required', this.required],
                ['readonly', this.readonly],
                ['check', JSON.stringify(this.input.validity)],
                ['input', this.input.value],
                ['value', this.value],
            ].map(item => item.join(" = ")).join("\n")
            logger.info("Field info",outlist)
            this.eventStop(evt)
        }
    }

    // override check() {
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
    // }

}