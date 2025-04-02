import { test, expect, Page, ElementHandle, JSHandle, Locator } from '@playwright/test';
import { children, child, fieldLocator, formLocator, formState, FzField, TEST_PAGE } from './helpers'

test.describe('fz-enum-select field', () => {
    const SCHEMA = {
        type: "object",
        properties: {
            "color": {
                "type": "string",
                "enum": ["red", "green", "blue", "yellow", "purple"]
            }
        }
    }
    const DATA = { color: "green" }

    let form_l: Locator
    let field_h: Locator
    let select_h: ElementHandle<HTMLSelectElement>
    let options_h: JSHandle<HTMLOptionElement[]>

    async function init(page: Page, testSchema: any = SCHEMA, testData: any = DATA) {
        form_l = await formLocator(page, testSchema, testData)
        field_h = await fieldLocator(page, '/color')
        select_h = await child(page, '/color', 'select') as ElementHandle<HTMLSelectElement>
        options_h = await children(page, '/color', 'option') as JSHandle<HTMLOptionElement[]>
    }

    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_PAGE)
    })
    test('should be instance of FzEnumSelect', async ({ page }) => {
        await init(page)
        expect(await field_h.evaluate(node => node.constructor.name)).toBe("FzEnumSelect")
    })

    test('should be in correct initial state ', async ({ page }) => {
        await init(page, SCHEMA, { color: "green" })

        // initial state : green
        expect(await options_h.evaluate(inputs => inputs.length)).toBe(5)
        expect(await options_h.evaluate(inputs => inputs.filter(i => i.selected && i.value === "green").length)).toBe(1)
        const s = await formState(form_l)
        expect(s.valid).toBe(true)
        expect(DATA.color).toBe("green")

    })

    test('options should align on update (undefined => red => blue)', async ({ page }) => {
        await init(page, SCHEMA, {})
        await select_h.focus()
        {
            // initial state : undefined
            expect(await options_h.evaluate(inputs => inputs.length)).toBe(5)
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.color).toBe(undefined)
        } {
            // from undefined to red
            await select_h.selectOption("red")
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.color).toBe("red")
        } {
            // from red to blue
            await select_h.selectOption("blue")
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.color).toBe("blue")

        }
    })
    test('options should align on update (null => red => green)', async ({ page }) => {
        await init(page, SCHEMA, { "color": null })
        {
            // initial state : null
            expect(await options_h.evaluate(inputs => inputs.length)).toBe(5)
            const s = await formState(form_l)
            expect(s.valid).toBe(false)
            expect(s.data.color).toBe(null)
        } {
            // from null to red
            await select_h.focus()
            await select_h.selectOption("red")
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.color).toBe("red")
        }
        {
            // from red to green
            await select_h.focus()
            await select_h.selectOption("green")
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.color).toBe("green")
        }

    })

    test('radios should align on update (dummy => red => green)', async ({ page }) => {
        await init(page, SCHEMA, { "color": "dummy" })
        {
            // initial state : dummy
            expect(await options_h.evaluate(inputs => inputs.length)).toBe(5)
            const s = await formState(form_l)
            expect(s.data.color).toBe("dummy")
            expect(s.valid).toBe(false)
        } {
            await select_h.focus()
            await select_h.selectOption("red")
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.color).toBe("red")
        } {
            await select_h.focus()
            await select_h.selectOption("green")
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.color).toBe("green")
        }
    })

})
