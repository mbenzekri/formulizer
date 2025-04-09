import { test, expect, Locator } from '@playwright/test'
import { fieldLocator, childLocator } from '../helpers'
import { TestContext } from '../context'
import { Test } from 'mocha'

TestContext.SCHEMA = {
    "type": "object",
    "required": ["a_color"],
    "properties": {
        "a_color": {
            "type": "string",
            "format": "color"
        }
    }
}

TestContext.DATA = { a_color: "#FFFFFF" }


const C = new TestContext("/a_color", "input")


test.describe('fz-color field', () => {

    test('fz-color: should be instance of FzInputString', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.type)).toBe("color")
        expect((await C.input.inputValue()).toUpperCase()).toBe("#FFFFFF")
        await C.assert("#FFFFFF", true)
    })

    test('fz-color: should init correct state', async ({ page }) => {
        await C.init(page, undefined, { a_color: "#000000" })
        expect(await C.input.inputValue()).toBe("#000000")
        await C.assert("#000000", true)
    })

    test('fz-color: should accept valid color input', async ({ page }) => {
        await C.init(page, undefined, {})
        await C.input.fill("#ff5733")
        expect(await C.input.inputValue()).toBe("#ff5733")
        await C.assert("#ff5733", true)
    })


    test('fz-color: should handle empty input', async ({ page }) => {
        await C.init(page, undefined, { a_color: undefined })
        expect(await C.input.inputValue()).toBe("#000000")
        await C.assert(undefined, false, "required")
        const present = childLocator(page, '/a_color', '.color-empty')
    })

})
