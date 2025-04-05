import { test, expect, Locator } from '@playwright/test'
import { formLocator, TEST_PAGE, patch, fieldLocator, childLocator, formState, FzField } from '../helpers'

const SCHEMA = {
    "type": "object",
    "title": "Number",
    "required": ["a_number"],
    "properties": {
        "a_number": {
            "type": "number"
        }
    }
}

const DATA = { a_number: 123.45 }

let form: Locator
let field: Locator
let input: Locator

async function init(page, testSchema: any = SCHEMA, testData: any = DATA) {
    await page.goto(TEST_PAGE)
    form = await formLocator(page, testSchema ?? SCHEMA, testData ?? DATA)
    field = await fieldLocator(page, '/a_number')
    input = await childLocator(page, '/a_number', "input")
}

test.describe('fz-float field', () => {

    test('fz-float: should be instance of FzInputFloat', async ({ page }) => {
        await init(page)
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputFloat")
        expect(await input.inputValue()).toBe("123.45")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(123.45)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
    })

    test('fz-float: should init correct state', async ({ page }) => {
        await init(page, SCHEMA, { a_number: 123.45 })
        expect(await input.inputValue()).toBe("123.45")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(123.45)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
    })

    test('fz-float: should allow decimal input', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("123.45")
        expect(await input.inputValue()).toBe("123.45")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(123.45)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
    })

    test('fz-float: should allow exponential input', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("1.23e2")
        expect(parseFloat(await input.inputValue())).toBe(123)
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(123)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
    })

    test('fz-float: should allow negative input', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("-123.45")
        expect(await input.inputValue()).toBe("-123.45")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(-123.45)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(-123.45)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
    })

    test('fz-float: should handle very small numbers', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("1e-10")
        expect(await input.inputValue()).toBe("1e-10")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1e-10)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(1e-10)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
    })

    test('fz-float: should handle very large numbers', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("1e+30")
        expect(await input.inputValue()).toBe("1e+30")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1e+30)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(1e+30)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
    })

    test('fz-float: should handle undefined initialization', async ({ page }) => {
        await init(page, SCHEMA, { a_number: undefined })
        expect(await input.inputValue()).toBe("")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(NaN)
        const s = await formState(form)
        expect(s.valid).toBe(false)
        expect(s.data.a_number).toBe(undefined)
        expect(await field.evaluate((f: FzField) => f.errors.join(" "))).toContain("required")
    })

    test('fz-float: should check minimum', async ({ page }) => {
        await init(page, patch(SCHEMA, { properties: { a_number: { minimum: 100 } } }), {})
        await input.fill("99.99")
        expect(await input.inputValue()).toBe("99.99")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(99.99)
        const s = await formState(form)
        expect(s.valid).toBe(false)
        expect(s.data.a_number).toBe(99.99)
        expect(await field.evaluate((f: FzField) => f.errors.join(" "))).toContain(">= 100")
    })

    test('fz-float: should check maximum', async ({ page }) => {
        await init(page, patch(SCHEMA, { properties: { a_number: { maximum: 100 } } }), {})
        await input.fill("100.01")
        expect(await input.inputValue()).toBe("100.01")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(100.01)
        const s = await formState(form)
        expect(s.valid).toBe(false)
        expect(s.data.a_number).toBe(100.01)
        expect(await field.evaluate((f: FzField) => f.errors.join(" "))).toContain("<= 100")
    })

    test('fz-float: should check multipleOf', async ({ page }) => {
        await init(page, patch(SCHEMA, { properties: { a_number: { multipleOf: 0.1 } } }), {})
        await input.fill("0.3")
        expect(await input.inputValue()).toBe("0.3")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(0.3)
        let s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.a_number).toBe(0.3)
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)

        await input.fill("0.35")
        expect(await input.inputValue()).toBe("0.35")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(0.35)
        s = await formState(form)
        expect(s.valid).toBe(false)
        expect(s.data.a_number).toBe(0.35)
        expect(await field.evaluate((f: FzField) => f.errors.join(" "))).toContain("multiple of 0.1")
    })


})
