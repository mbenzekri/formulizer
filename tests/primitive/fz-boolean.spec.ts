import { test, expect } from '@playwright/test';
import { TestContext } from '../context';

TestContext.SCHEMA = {
    type: 'object',
    properties: { active: { type: 'boolean' } }
}

TestContext.DATA = { active: true }

const C = new TestContext("/active","input")

test.describe('fz-boolean field', () => {

    test('fz-boolean: should be instance of FzInputBoolean', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputBoolean")
        await C.assert(true,true)
    })


    const testDataset = [
        {
            patch: {}, 
            data: undefined,
            states: [
                { doclick: false, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true }
            ]
        },
        {
            patch: { properties: { active: {type: ['boolean', 'null'] }}}, 
            data: { active: null },
            states: [
                { doclick: false, checked: false, indeterminate: true, active: null, valid: true },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true }
            ]
        },
        {
            patch: undefined, 
            data: { active: undefined },
            states: [
                { doclick: false, checked: false, indeterminate: true, active: undefined, valid: true },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true }
            ]
        },
        {
            patch: undefined, 
            data: { active: "dummy" },
            states: [
                { doclick: false, checked: false, indeterminate: true, active: "dummy", valid: false },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true }
            ]
        }
    ]

    for (const { patch, data, states } of testDataset) {
        test(`fz-boolean: should toggle (${data?.active} => ${states[1].active} => ${states[2].active})`, async ({ page }) => {
            await C.init(page, C.patchSchema(patch), data)
            for (const i of states) {
                if (i.doclick) await C.input.click()
                expect(await C.input.isChecked()).toBe(i.checked)
                expect(await C.input.evaluate((node:HTMLInputElement) => node.indeterminate)).toBe(i.indeterminate)
                await C.assert(i.active,i.valid)
            }
        })
    }

    test('fz-boolean: should not toggle (readonly)', async ({ page }) => {
        await C.init(page,C.patchSchema({ properties: { active: { readonly: "true" } } }), { active: true })

        // on click no change
        // !!! for readonly checkbox DONT USE input_h.click() Playwright FAILS because CSS "event-pointers" set to "none"
        await C.input.evaluate((node:HTMLInputElement) => node.click());
        expect(await C.input.isChecked()).toBe(true);
        expect(await C.input.evaluate((node:HTMLInputElement) => node.indeterminate)).toBe(false);
        await C.assert(true,true)
    })

})
