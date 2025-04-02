import { test, expect, ElementHandle, Locator } from '@playwright/test';
import { formLocator, TEST_PAGE, patch, fieldLocator, child } from './helpers'

const SCHEMA = {
    type: 'object',
    properties: { active: { type: 'boolean' } }
}

const DATA = { active: true }

let form_l: Locator
let field_h: Locator
let input_h: ElementHandle<HTMLInputElement>

async function init(page, testSchema: any = SCHEMA, testData: any = DATA) {
    form_l = await formLocator(page, testSchema ?? SCHEMA, testData ?? DATA)
    field_h = await fieldLocator(page,'/active')
    input_h = await child(page, '/active', 'input') as ElementHandle<HTMLInputElement>
}

test.describe('fz-boolean field', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_PAGE)
    });

    test('should be instance of FzInputBoolean', async ({ page }) => {
        await init(page)
        expect(await field_h.evaluate(node => node.constructor.name)).toBe("FzInputBoolean")
    })


    const testDataset = [
        {
            schema: SCHEMA, data: DATA,
            states: [
                { doclick: false, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true }
            ]
        },
        {
            schema: patch(SCHEMA, { properties: { active: {type: ['boolean', 'null'] }} }), data: { active: null },
            states: [
                { doclick: false, checked: false, indeterminate: true, active: null, valid: true },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true }
            ]
        },
        {
            schema: SCHEMA, data: { active: undefined },
            states: [
                { doclick: false, checked: false, indeterminate: true, active: undefined, valid: true },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true }
            ]
        },
        {
            schema: SCHEMA, data: { active: "dummy" },
            states: [
                { doclick: false, checked: false, indeterminate: true, active: "dummy", valid: false },
                { doclick: true, checked: true, indeterminate: false, active: true, valid: true },
                { doclick: true, checked: false, indeterminate: false, active: false, valid: true }
            ]
        }
    ]

    for (const { schema, data, states } of testDataset) {
        test(`should toggle (${data.active} => ${states[1].active} => ${states[2].active})`, async ({ page }) => {
            await init(page, schema, data)
        
            for (const i of states) {
                if (i.doclick) await input_h.click()
                expect(await input_h.isChecked()).toBe(i.checked)
                expect(await input_h.evaluate(node => node.indeterminate)).toBe(i.indeterminate)
                expect(await form_l.evaluate((node: any) => node.data.active)).toBe(i.active)
                expect(await form_l.evaluate((node: any) => node.valid)).toBe(i.valid)
            }
        })
    }

    test('should not toggle (readonly)', async ({ page }) => {
        await init(page,
            patch(SCHEMA, { properties: { active: { readonly: true } } }),
            { active: true }
        )
        {
            // on click no change
            // !!! for readonly checkbox DONT USE input_h.click() Playwright FAILS because CSS "event-pointers" set to "none"
            await input_h.evaluate(node => node.click());
            expect(await input_h.isChecked()).toBe(true);
            expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
            expect(await form_l.evaluate((node: any) => node.data.active)).toBe(true);
            expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
        }
    })

})
