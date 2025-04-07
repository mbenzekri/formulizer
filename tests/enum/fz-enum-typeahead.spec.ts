import { test, expect, Page, ElementHandle, JSHandle, Locator } from '@playwright/test';
import { children, child } from '../helpers'
import { TestContext } from '../context';

TestContext.SCHEMA = {
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

TestContext.DATA = { country: "Spain" }

class TestTypeaheadContext extends TestContext {

    constructor(pointer: string, inputSelector: string, public listSelector: string) {
        super(pointer, inputSelector)
    }

    // as list is dynamic allways get new handle
    async list() {
        return this.children(this.listSelector)
    }
}

const C = new TestTypeaheadContext('/country', '#query', '.dropdown-item')


test.describe('fz-enum-typeahead', () => {

    test('fz-enum-typeahead: should be instance of FzEnumSelect', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzEnumTypeahead")
    })

    test('fz-enum-typeahead: should be in correct initial state', async ({ page }) => {
        await C.init(page)

        { // initial state value=Spain : check filter / check value
            await C.input.evaluate(query => query.focus())
            const list_h = await children(page, '/country', '.dropdown-item')
            expect(await list_h.evaluate(items => items.length)).toBe(1)
            expect(await list_h.evaluate(items => items[0].innerText)).toBe("Spain")
            await C.assert("Spain", true)
        }
    })
    test('fz-enum-typeahead: should filter when keys pressed', async ({ page }) => {
        await C.init(page)

        // initial state value=Spain : query=Spain => press "g" => check filter (value unchanged)
        await C.input.focus()
        await C.input.press("g")
        let list = await C.list()
        expect(await list.evaluate(items => items.map(x => x.innerText))).toStrictEqual(["Germany", "United Kingdom", "Argentina", "Egypt", "Nigeria",])

        await C.assert("Spain", true)
        // initial state : query='g' => press "e" => check filter (value unchanged)
        await C.input.press("e")
        list = await C.list()
        expect(await list.evaluate(items => items.map(x => x.innerText))).toStrictEqual(["Germany", "Argentina", "Nigeria",])
        await C.assert("Spain", true)

        // initial state : query='gE' => click option 3=Nigeria => check filter / check value=Nigeria)
        list = await C.list()
        expect(await list.evaluate(items => items[2].click()))
        expect(await C.input.inputValue()).toBe("Nigeria")
        expect(await C.field.evaluate(field => (field as any).isopen)).toBe(false)
        await C.assert("Nigeria", true)

    })
    test('fz-enum-typeahead: Tab should leave closed/align value', async ({ page }) => {
        await C.init(page)

        // initial state value=Spain : query=Spain => press "ge" => press "Tab" => closed and query = value
        await C.input.focus()
        await C.input.press("g")
        await C.input.press("e")
        const list = await C.list()
        expect(await list.evaluate(items => items.map(x => x.innerText))).toStrictEqual(["Germany", "Argentina", "Nigeria",])
        await C.input.press("Tab")
        expect(await C.input.inputValue()).toBe("Spain")
        await C.assert("Spain", true)

    })

})
