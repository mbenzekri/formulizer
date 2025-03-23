import { test, expect, Page, ElementHandle, JSHandle, Locator } from '@playwright/test';
import { elemAllHandle, elemHandle, fieldHandle, formInit, formState, FzField, TEST_PAGE } from './helpers'

test.describe('fz-enum-typeahead', () => {
    const SCHEMA = {
        type: "object",
        properties: {
            "country": {
                "type": "string",
                "enum": [
                    "France", "Germany", "Spain", "Italy", "United Kingdom", "United States",
                    "Canada", "Brazil", "Argentina", "Mexico", "China", "Japan", "India", "Russia",
                    "Australia", "South Africa", "Egypt", "Nigeria", "Saudi Arabia", "Turkey",
                    "South Korea", "Indonesia", "Thailand", "Vietnam", "Colombia"
                ]
            }
        }
    }
    const DATA = { country: "Spain" }

    let form_l: Locator
    let field_h: ElementHandle<FzField>
    let query_h: ElementHandle<HTMLSelectElement>
    let list_h: JSHandle<HTMLOptionElement[]>

    async function init(page: Page, testSchema: any = SCHEMA, testData: any = DATA) {
        form_l = await formInit(page, testSchema, testData)
        field_h = await fieldHandle(form_l, '/country')
        query_h = await elemHandle(form_l, '/country', '#query') as ElementHandle<HTMLSelectElement>
        list_h = await elemAllHandle(form_l, '/country', '.dropdown-item') as JSHandle<HTMLOptionElement[]>
    }

    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_PAGE)
    })
    test('typeahead: should be instance of FzEnumSelect', async ({ page }) => {
        await init(page)
        expect(await field_h.evaluate(node => node.constructor.name === "FzEnumTypeahead")).toBe(true)
    })

    test('typeahead: should be in correct initial state', async ({ page }) => {
        await init(page, SCHEMA)

        // initial state : Spain

        await query_h.evaluate(query => query.focus())
        expect(await list_h.evaluate(items => items.length)).toBe(1) // list contains only Spain (initial value) 
        expect(await list_h.evaluate(items => items[0].innerText)).toBe("Spain")
        const s = await formState(form_l)
        expect(s.valid).toBe(true)
        expect(s.data.country).toBe("Spain")

    })

    // test('options should align on update (undefined => red => blue)', async ({ page }) => {
    //     await init(page, SCHEMA, {})
    //     await query_h.focus()
    //     {
    //         // initial state : undefined
    //         expect(await list_h.evaluate(inputs => inputs.length)).toBe(5)
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(true)
    //         expect(s.data.country).toBe(undefined)
    //     } {
    //         // from undefined to red
    //         await query_h.selectOption("red")
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(true)
    //         expect(s.data.country).toBe("red")
    //     } {
    //         // from red to blue
    //         await query_h.selectOption("blue")
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(true)
    //         expect(s.data.country).toBe("blue")

    //     }
    // })

    // test('options should align on update (null => red => green)', async ({ page }) => {
    //     await init(page, SCHEMA, { "country": null })
    //     {
    //         // initial state : null
    //         expect(await list_h.evaluate(inputs => inputs.length)).toBe(5)
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(false)
    //         expect(s.data.country).toBe(null)
    //     } {
    //         // from null to red
    //         await query_h.focus()
    //         await query_h.selectOption("red")
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(true)
    //         expect(s.data.country).toBe("red")
    //     }
    //     {
    //         // from red to green
    //         await query_h.focus()
    //         await query_h.selectOption("green")
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(true)
    //         expect(s.data.country).toBe("green")
    //     }

    // })

    // test('radios should align on update (dummy => red => green)', async ({ page }) => {
    //     await init(page, SCHEMA, { "country": "dummy" })
    //     {
    //         // initial state : dummy
    //         expect(await list_h.evaluate(inputs => inputs.length)).toBe(5)
    //         const s = await formState(form_l)
    //         expect(s.data.country).toBe("dummy")
    //         expect(s.valid).toBe(false)
    //     } {
    //         await query_h.focus()
    //         await query_h.selectOption("red")
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(true)
    //         expect(s.data.country).toBe("red")
    //     } {
    //         await query_h.focus()
    //         await query_h.selectOption("green")
    //         const s = await formState(form_l)
    //         expect(s.valid).toBe(true)
    //         expect(s.data.country).toBe("green")
    //     }
    // })

})
