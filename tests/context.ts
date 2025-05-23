import { Page, Locator, expect } from '@playwright/test';
import { patch } from './helpers';

export const TEST_PAGE = 'http://127.0.0.1:5500/docs/test.html'

export interface FzForm extends HTMLElement {
    getField(pointer: string): HTMLElement | null;
    schema: any;
    data: any;
    valid: boolean;
}

export interface FzField extends HTMLElement {
    pointer: string;
    inputSelector: string;
    schema: any;
    data: any;
    valid: boolean;
    errors: string[]
}
export abstract class FzLogger {
    static set(...args: any[]):void {}
}

export class TestContext {
    static SCHEMA:any = undefined
    static DATA:any = undefined
    page: Page
    form : Locator
    field: Locator
    input: Locator

    constructor(public pointer: string,public inputSelector: string="") {}

    async init(page:Page, schema=TestContext.SCHEMA, data=TestContext.DATA) {
        this.page = page
        // init FzForm test page (wait for fz-form readiness)
        await page.goto(TEST_PAGE)
        page.on('console', msg => {
            if (msg.type() == "warning" && msg.text().startsWith("strict mode: missing type")) return
            console.log(`[Browser] ${msg.type()}: ${msg.text()}`);
        });
        await page.waitForSelector('fz-form', { state: 'attached' })
        await page.waitForFunction(() => {
            const form = document.querySelector('fz-form') as any
            return form && typeof form.ready;
        })

        // get the form, set schema and data , get field and input
        await this.resetForm()
        await this.form.evaluate((form: any, { schema, data }) => {
            form.schema = schema;
            form.data = data;
        }, { schema, data });
        await this.resetInput()

    }
    async state() {
        return await this.form.evaluate(node => {
            const form = node as FzForm
            const schema = form.schema
            const data = form.data
            const valid = form.valid
            const actions = false
            const readonly = false
            const checkIn = false
            const checkOut = false
    
            return { valid, schema, data, actions, readonly, checkIn, checkOut }
        })
    } 
    async assert(value: any, valid: boolean, error?:string) {
        const s = await this.state()
    
        expect(s.valid).toBe(valid)

        expect(s.data[this.pointer.substring(1)]).toBe(value)
    
        valid && !error
            ? expect(await this.field.evaluate((f: FzField) => f.errors.join(" "))).toBe("")
            : expect(await this.field.evaluate((f: FzField) => f.errors.length)).toBeGreaterThan(0);
    
        if (error) expect(await this.field.evaluate((f: FzField) => f.errors.join(" "))).toContain(error)
        
        // error styling is depending on field touched or not 
        // valid 
        //     ? expect(await C.field.evaluate(f => f.shadowRoot?.querySelectorAll('.is-valid').length)).toBeGreaterThan(0)
        //     : expect(await C.field.evaluate(f => f.shadowRoot?.querySelectorAll('.is-invalid').length)).toBeGreaterThan(0)
    }
    patchSchema(...patches:any) {
        return patch(TestContext.SCHEMA,...patches)
    }
    async child(selector: string) {
        return await this.field.evaluateHandle((field, selector ) => {
            const input = field?.shadowRoot?.querySelector(selector) as HTMLElement
            return input
        }, selector)
    } 
    
    async children(selector: string) {
        return await this.field.evaluateHandle((field, selector ) => {
            const inputs = [...field?.shadowRoot?.querySelectorAll(selector) ?? []] as HTMLElement[]
            return inputs
        }, selector)
    }
    
    async fieldLocator(pointer:string) {
        return await this.page.locator(`[pointer="${pointer}"]`)
    }
    async inputLocator(pointer:string, selector: string) {
        return await this.page.locator(`[pointer="${pointer}"] ${selector}`)
    }

    async resetForm() {
        this.form = await this.page.locator('fz-form');
    }
    async resetField() {
        this.resetForm()
        this.field = await this.fieldLocator(this.pointer)
    }
    async resetInput() {
        this.resetField()
        if (this.inputSelector !== "")
            this.input = await this.inputLocator(this.pointer,this.inputSelector)
    }

    async submit() {
        await this.form.evaluate(f => (f.shadowRoot?.querySelector(".btn-primary") as HTMLInputElement)?.click())
    }
}



