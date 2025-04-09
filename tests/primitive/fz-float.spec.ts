import { test, expect } from '@playwright/test'
import { TestContext } from '../context'

TestContext.SCHEMA = {
    "type": "object",
    "title": "Number",
    "required": ["a_number"],
    "properties": {
        "a_number": {
            "type": "number"
        }
    }
}

TestContext.DATA = { a_number: 123.45 }

const C = new TestContext('/a_number', "input")

test.describe('fz-float field', () => {

    test('fz-float: should be instance of FzInputFloat', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputFloat")
        expect(await C.input.inputValue()).toBe("123.45")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)

        await C.assert(123.45, true)
    })

    test('fz-float: should init correct state', async ({ page }) => {
        await C.init(page, undefined, { a_number: 123.45 })
        expect(await C.input.inputValue()).toBe("123.45")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)
        await C.assert(123.45, true)
    })

    test('fz-float: should allow decimal input', async ({ page }) => {
        await C.init(page, undefined, {})
        await C.input.fill("123.45")
        expect(await C.input.inputValue()).toBe("123.45")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)
        await C.assert(123.45, true)
    })

    test('fz-float: should allow exponential input', async ({ page }) => {
        await C.init(page, undefined, {})
        await C.input.fill("1.23e2")
        expect(parseFloat(await C.input.inputValue())).toBe(123)
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        await C.assert(123, true)
    })

    test('fz-float: should allow negative input', async ({ page }) => {
        await C.init(page, undefined, {})
        await C.input.fill("-123.45")
        expect(await C.input.inputValue()).toBe("-123.45")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(-123.45)
        await C.assert(-123.45, true)
    })

    test('fz-float: should handle very small numbers', async ({ page }) => {
        await C.init(page, undefined, {})
        await C.input.fill("1e-10")
        expect(await C.input.inputValue()).toBe("1e-10")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1e-10)
        await C.assert(1e-10, true)
    })

    test('fz-float: should handle very large numbers', async ({ page }) => {
        await C.init(page, undefined, {})
        await C.input.fill("1e+30")
        expect(await C.input.inputValue()).toBe("1e+30")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1e+30)
        await C.assert(1e+30, true)
    })

    test('fz-float: should handle undefined initialization', async ({ page }) => {
        await C.init(page, undefined, { a_number: undefined })
        expect(await C.input.inputValue()).toBe("")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(NaN)
        await C.assert(undefined, false, "required")
    })

    test('fz-float: should check minimum', async ({ page }) => {
        await C.init(page, C.patchSchema({ properties: { a_number: { minimum: 100 } } }), {})
        await C.input.fill("99.99")
        expect(await C.input.inputValue()).toBe("99.99")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(99.99)
        await C.assert(99.99, false, ">= 100")
    })

    test('fz-float: should check maximum', async ({ page }) => {
        await C.init(page, C.patchSchema({ properties: { a_number: { maximum: 100 } } }), {})
        await C.input.fill("100.01")
        expect(await C.input.inputValue()).toBe("100.01")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(100.01)
        await C.assert(100.01, false, "<= 100")
    })

    test('fz-float: should check multipleOf', async ({ page }) => {
        await C.init(page, C.patchSchema({ properties: { a_number: { multipleOf: 0.1 } } }), {})

        await C.input.fill("0.3")
        expect(await C.input.inputValue()).toBe("0.3")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(0.3)
        await C.assert(0.3, true)

        await C.input.fill("0.35")
        expect(await C.input.inputValue()).toBe("0.35")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(0.35)
        await C.assert(0.35, false, "multiple of 0.1")
    })


})
