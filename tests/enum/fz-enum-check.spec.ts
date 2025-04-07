import { test, expect, JSHandle } from '@playwright/test';
import { TestContext } from '../context';
import { children } from '../helpers';

TestContext.SCHEMA = {
    type: "object",
    properties: {
        "answer": {
            "type": "string",
            "enum": ["yes", "no"]
        }
    }
}

TestContext.DATA = { answer: "yes" }

class TestCheckContext extends TestContext {
    radios: JSHandle<HTMLInputElement[]>
    constructor(pointer: string, public radiosSelector: string) {
        super(pointer, "")
    }
    override async init(page: any, schema?: any, data?: any): Promise<void> {
        await super.init(page, schema, data)
        this.radios = await children(page, '/answer', '.form-check-input') as JSHandle<HTMLInputElement[]>
    }
}

const C = new TestCheckContext('/answer', '.form-check-input')


test.describe('fz-enum-check field', () => {
    test('fz-enum-check: should be in correct state when yes => no', async ({ page }) => {
        await C.init(page)

        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzEnumCheck");
        expect(await C.radios.evaluate(inputs => inputs.length)).toBe(2)
        // TO BE FIXED: in browser testing Chrome/Firefox it works but fail for all chromium/firefox/webkit under testing
        // TBF : expect(await C.inputs.evaluate(inputs => inputs.filter(i => i.checked).length)).toBe(1)
    })

    test('fz-enum-check: should radios be in correct state when undefined => yes => no', async ({ page }) => {
        await C.init(page, undefined, {})

        expect(await C.radios.evaluate(inputs => inputs.length)).toBe(2)
        //expect(await C.inputs.evaluate(inputs =>  inputs.every(i => !i.checked))).toBe(true)

        await C.radios.evaluate(node => node[0].click())
        expect(await C.radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
        expect(await C.form.evaluate((node: any) => node.data.answer)).toBe("yes");

        await C.radios.evaluate(node => node[1].click())
        expect(await C.radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
        expect(await C.form.evaluate((node: any) => node.data.answer)).toBe("no");

    })

    test('fz-enum-check: should radios be in correct state when null => yes => no', async ({ page }) => {
        await C.init(page, undefined, { "answer": null })

        expect(await C.radios.evaluate(inputs => inputs.length)).toBe(2)
        //expect(await C.inputs.evaluate(inputs => inputs.every(i => !i.checked))).toBe(true)
        expect(await C.form.evaluate((node: any) => node.valid)).toBe(false);

        await C.radios.evaluate(node => node[0].click())
        expect(await C.radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
        expect(await C.form.evaluate((node: any) => node.data.answer)).toBe("yes");
        expect(await C.form.evaluate((node: any) => node.valid)).toBe(true);

        await C.radios.evaluate(node => node[1].click())
        expect(await C.radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
        expect(await C.form.evaluate((node: any) => node.data.answer)).toBe("no");
        expect(await C.form.evaluate((node: any) => node.valid)).toBe(true);

    })

    test('fz-enum-check: should radios be in correct state when dummy => yes => no', async ({ page }) => {
        await C.init(page, undefined, { "answer": "dummy" })

        expect(await C.radios.evaluate(inputs => inputs.length)).toBe(2)
        //expect(await C.inputs.evaluate(inputs => inputs.every(i => !i.checked))).toBe(true)
        expect(await C.form.evaluate((node: any) => node.valid)).toBe(false);

        await C.radios.evaluate(node => node[0].click())
        expect(await C.radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
        expect(await C.form.evaluate((node: any) => node.data.answer)).toBe("yes");
        expect(await C.form.evaluate((node: any) => node.valid)).toBe(true);

        await C.radios.evaluate(node => node[1].click())
        expect(await C.radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
        expect(await C.form.evaluate((node: any) => node.data.answer)).toBe("no");
        expect(await C.form.evaluate((node: any) => node.valid)).toBe(true);

    })

    test('fz-enum-check: boolean type and oneOf must generate checks', async ({ page }) => {
        await C.init(page, {
            "type": "object",
            "properties": {
                "answer": {
                    "type": ["boolean", "null"],
                    "title": "Got it ?",
                    "oneOf": [
                        { "const": true, "title": "Yes" },
                        { "const": false, "title": "No" },
                        { "const": null, "title": "Don't know" }
                    ]
                }
            }
        }, { "answer": true })

        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzEnumCheck")
        expect(await C.radios.evaluate(inputs => inputs.map(i => i.checked))).toStrictEqual([true, false, false])
        expect(await C.radios.evaluate(inputs => inputs.map(i => i.value))).toStrictEqual(["true", "false", ""])
        await C.assert(true, true)

        await C.radios.evaluate(inputs => inputs[1].click())
        await C.assert(false, true)

        await C.radios.evaluate(inputs => inputs[2].click())
        await C.assert(null, true)

    })

})
