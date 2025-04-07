import { test, expect, JSHandle } from '@playwright/test';
import { children } from '../helpers'
import { TestContext } from '../context'

TestContext.SCHEMA = {
    type: "object",
    properties: {
        "color": {
            "type": "string",
            "enum": ["red", "green", "blue", "yellow", "purple"]
        }
    }
}

TestContext.DATA = { color: "green" }
class TestSelectContext extends TestContext {
    options: JSHandle<HTMLOptionElement[]>

    constructor(pointer: string, inputSelector: string, public optionsSelector:string) {
        super(pointer,inputSelector)
    }
    override async init(page: any, schema?: any, data?: any): Promise<void> {
        await super.init(page, schema, data)
        this.options = await children(page, this.pointer, this.optionsSelector) as JSHandle<HTMLOptionElement[]>
    }
}

const C = new TestSelectContext('/color', 'select','option')



test.describe('fz-enum-select field', () => {

    test('fz-enum-select: should be instance of FzEnumSelect', async ({ page }) => {

        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzEnumSelect")
    })

    test('fz-enum-select: should be in correct initial state ', async ({ page }) => {

        await C.init(page, undefined, { color: "green" })
        // initial state : green
        expect(await C.options.evaluate(inputs => inputs.length)).toBe(5)
        expect(await C.options.evaluate(inputs => inputs.filter(i => i.selected && i.value === "green").length)).toBe(1)
            await C.assert("green",true)

    })

    test('fz-enum-select: options should align on update (undefined => red => blue)', async ({ page }) => {
        await C.init(page, undefined, {})

            // initial state : undefined
            await C.input.focus()
            expect(await C.options.evaluate(inputs => inputs.length)).toBe(5)
            await C.assert(undefined,true)

            // from undefined to red
            await C.input.selectOption("red")
            await C.assert("red",true)

            // from red to blue
            await C.input.selectOption("blue")
            await C.assert("blue",true)

    })
    test('fz-enum-select: options should align on update (null => red => green)', async ({ page }) => {
        await C.init(page, undefined, { "color": null })

        // initial state : null
        expect(await C.options.evaluate(inputs => inputs.length)).toBe(5)
            await C.assert(null,false)

        // from null to red
        await C.input.focus()
        await C.input.selectOption("red")
            await C.assert("red",true)

        // from red to green
        await C.input.focus()
        await C.input.selectOption("green")
            await C.assert("green",true)

    })

    test('fz-enum-select: radios should align on update (dummy => red => green)', async ({ page }) => {

        await C.init(page, undefined, { "color": "dummy" })

        // initial state : dummy
        expect(await C.options.evaluate(inputs => inputs.length)).toBe(5)
            await C.assert("dummy",false)

        await C.input.focus()
        await C.input.selectOption("red")
            await C.assert("red",true)

        await C.input.focus()
        await C.input.selectOption("green")
            await C.assert("green",true)

    })

})
