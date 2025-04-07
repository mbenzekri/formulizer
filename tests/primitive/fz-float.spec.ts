import { test, expect, Locator } from '@playwright/test'
import { formLocator, TEST_PAGE, patch, fieldLocator, childLocator, formState, FzField, formAssert } from '../helpers'

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

        await formAssert(form,field,"a_number",123.45,true)
    })

    test('fz-float: should init correct state', async ({ page }) => {
        await init(page, SCHEMA, { a_number: 123.45 })
        expect(await input.inputValue()).toBe("123.45")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)
        await formAssert(form,field,"a_number",123.45,true)
    })

    test('fz-float: should allow decimal input', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("123.45")
        expect(await input.inputValue()).toBe("123.45")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123.45)
        await formAssert(form,field,"a_number",123.45,true)
    })

    test('fz-float: should allow exponential input', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("1.23e2")
        expect(parseFloat(await input.inputValue())).toBe(123)
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        await formAssert(form,field,"a_number",123,true)
    })

    test('fz-float: should allow negative input', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("-123.45")
        expect(await input.inputValue()).toBe("-123.45")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(-123.45)
        await formAssert(form,field,"a_number",-123.45,true)
    })

    test('fz-float: should handle very small numbers', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("1e-10")
        expect(await input.inputValue()).toBe("1e-10")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1e-10)
        await formAssert(form,field,"a_number",1e-10,true)
    })

    test('fz-float: should handle very large numbers', async ({ page }) => {
        await init(page, SCHEMA, {})
        await input.fill("1e+30")
        expect(await input.inputValue()).toBe("1e+30")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1e+30)
        await formAssert(form,field,"a_number",1e+30,true)
    })

    test('fz-float: should handle undefined initialization', async ({ page }) => {
        await init(page, SCHEMA, { a_number: undefined })
        expect(await input.inputValue()).toBe("")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(NaN)
        await formAssert(form,field,"a_number",undefined,false,"required")
    })

    test('fz-float: should check minimum', async ({ page }) => {
        await init(page, patch(SCHEMA, { properties: { a_number: { minimum: 100 } } }), {})
        await input.fill("99.99")
        expect(await input.inputValue()).toBe("99.99")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(99.99)
        await formAssert(form,field,"a_number",99.99,false,">= 100")
    })

    test('fz-float: should check maximum', async ({ page }) => {
        await init(page, patch(SCHEMA, { properties: { a_number: { maximum: 100 } } }), {})
        await input.fill("100.01")
        expect(await input.inputValue()).toBe("100.01")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(100.01)
        await formAssert(form,field,"a_number",100.01,false,"<= 100")
    })

    test('fz-float: should check multipleOf', async ({ page }) => {
        await init(page, patch(SCHEMA, { properties: { a_number: { multipleOf: 0.1 } } }), {})

        await input.fill("0.3")
        expect(await input.inputValue()).toBe("0.3")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(0.3)
        await formAssert(form,field,"a_number",0.3,true)

        await input.fill("0.35")
        expect(await input.inputValue()).toBe("0.35")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(0.35)
        await formAssert(form,field,"a_number",0.35,false,"multiple of 0.1")
    })


})
