import { test, expect, Page, ElementHandle, JSHandle, Locator } from '@playwright/test';
import { children, child, fieldLocator, formLocator, formState, FzField, TEST_PAGE } from './helpers'

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
    let field_h: Locator
    let query_h: ElementHandle<HTMLSelectElement>
    let list_h: JSHandle<HTMLOptionElement[]>

    async function init(page: Page, testSchema: any = SCHEMA, testData: any = DATA) {
        form_l = await formLocator(page, testSchema, testData)
        field_h = await fieldLocator(page, '/country')
        query_h = await child(page, '/country', '#query') as ElementHandle<HTMLSelectElement>
        list_h = await children(page, '/country', '.dropdown-item') as JSHandle<HTMLOptionElement[]>
    }

    test.beforeEach(async ({ page }) => {
        await page.goto(TEST_PAGE)
    })
    test('typeahead: should be instance of FzEnumSelect', async ({ page }) => {
        await init(page)
        expect(await field_h.evaluate(node => node.constructor.name)).toBe("FzEnumTypeahead")
    })

    test('typeahead: should be in correct initial state', async ({ page }) => {
        await init(page)

        { // initial state value=Spain : check filter / check value
            await query_h.evaluate(query => query.focus())
            const list_h = await children(page, '/country', '.dropdown-item')
            expect(await list_h.evaluate(items => items.length)).toBe(1)
            expect(await list_h.evaluate(items => items[0].innerText)).toBe("Spain")
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.country).toBe("Spain")
        }
    })
    test('typeahead: should filter when keys pressed', async ({ page }) => {
        await init(page)

        {   // initial state value=Spain : query=Spain => press "g" => check filter (value unchanged)
            await query_h.focus()
            await query_h.press("g")
            const list_h = await children(page, '/country', '.dropdown-item')
            expect(await list_h.evaluate(items => items.map(x => x.innerText))).toStrictEqual(["Germany","United Kingdom","Argentina","Egypt","Nigeria",])
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.country).toBe("Spain")
        }
        {   // initial state : query='g' => press "e" => check filter (value unchanged)
            await query_h.press("e")
            const list_h = await children(page, '/country', '.dropdown-item')
            expect(await list_h.evaluate(items => items.map(x => x.innerText))).toStrictEqual(["Germany","Argentina","Nigeria",])
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.country).toBe("Spain")
        }
        {   // initial state : query='gE' => click option 3=Nigeria => check filter / check value=Nigeria)
            const list_h = await children(page, '/country', '.dropdown-item')
            expect(await list_h.evaluate(items => items[2].click()))
            expect(await query_h.inputValue()).toBe("Nigeria")
            expect(await field_h.evaluate(field => (field as any).isopen)).toBe(false)
            const s = await formState(form_l)
            expect(s.valid).toBe(true)
            expect(s.data.country).toBe("Nigeria")
        }

    })

})
