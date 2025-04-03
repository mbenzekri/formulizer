import { test, expect, ElementHandle, Locator } from '@playwright/test';
import { formLocator, TEST_PAGE, patch, fieldLocator, child, childLocator, formState, FzField } from '../helpers'

const SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["an_integer"],
    "properties": {
        "an_integer": {
            "type": "integer"
        }
    }
}

const DATA = { an_integer: 123 }

let form: Locator
let field: Locator
let input: Locator

async function init(page, testSchema: any = SCHEMA, testData: any = DATA) {
    await page.goto(TEST_PAGE)
    form = await formLocator(page, testSchema ?? SCHEMA, testData ?? DATA)
    field = await fieldLocator(page,'/an_integer')
    input = await childLocator(page,'/an_integer',"input")
}

test.describe('fz-integer field', () => {

    test('fz-integer: should be instance of FzInputInteger', async ({ page }) => {
        await init(page)
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputInteger")
        expect(await input.inputValue()).toBe("123")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.an_integer).toBe(123)
        expect(await field.evaluate((f:FzField) => f.errors.length)).toBe(0)
    })

    test('fz-integer: should init correct state', async ({ page }) => {
        await init(page,SCHEMA,{ an_integer: 123})
        
        expect(await input.inputValue()).toBe("123")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.an_integer).toBe(123)
        expect(await field.evaluate((f:FzField) => f.errors.length)).toBe(0)
    })

    test('fz-integer: should allow all digits', async ({ page }) => {
        await init(page,SCHEMA,{})
        await input.press("1")
        await input.press("2")
        await input.press("3")
        await input.press("4")
        await input.press("5")
        await input.press("6")
        await input.press("7")
        await input.press("8")
        await input.press("9")
        await input.press("0")
        expect(await input.inputValue()).toBe("1234567890")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1234567890)
        const s = await formState(form)
        expect(s.valid).toBe(true)
        expect(s.data.an_integer).toBe(1234567890)
        expect(await field.evaluate((f:FzField) => f.errors.length)).toBe(0)

    })
    test('fz-integer: should disallow not digits', async ({ page }) => {
        await init(page,SCHEMA,{})
        await input.press("a")
        expect(await input.inputValue()).toBe("")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(NaN)
        const s = await formState(form)
        expect(s.valid).toBe(false)
        expect(s.data.an_integer).toBe(undefined)
        expect(await field.evaluate((f:FzField) => f.errors.join(" "))).toContain("required")
    })

    test('fz-integer: should check minimum', async ({ page }) => {
        await init(page,patch(SCHEMA,{properties:{an_integer: {minimum: 100}}}),{})
        await input.press("1")
        await input.press("2")
        expect(await input.inputValue()).toBe("12")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(12)
        const s = await formState(form)
        expect(s.valid).toBe(false)
        expect(s.data.an_integer).toBe(12)
        expect(await field.evaluate((f:FzField) => f.errors.join(" "))).toContain(">= 100")
    })

    test('fz-integer: should check maximum', async ({ page }) => {
        await init(page,patch(SCHEMA,{properties:{an_integer: {maximum: 100}}}),{})
        await input.press("1")
        await input.press("2")
        await input.press("3")
        expect(await input.inputValue()).toBe("123")
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        const s = await formState(form)
        expect(s.valid).toBe(false)
        expect(s.data.an_integer).toBe(123)
        expect(await field.evaluate((f:FzField) => f.errors.join(" "))).toContain("<= 100")
    })

    test('fz-integer: Should coerce to integer when mixed integer/number infering', async ({ page }) => {
        await init(page,patch(SCHEMA,{properties:{an_integer: {type: ["integer","number"]}}}),{})
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputInteger")
    })

    test('fz-integer: should check multipleOf', async ({ page }) => {
        // Initialize the form with a schema that includes the multipleOf constraint
        await init(page, patch(SCHEMA, { properties: { an_integer: { multipleOf: 10 } } }), {});
    
        // Simulate user input that is a multiple of 10
        await input.fill("30");
        expect(await input.inputValue()).toBe("30");
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(30);
        let s = await formState(form);
        expect(s.valid).toBe(true);
        expect(s.data.an_integer).toBe(30);
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0);
    
        // Simulate user input that is not a multiple of 10
        await input.fill("35");
        expect(await input.inputValue()).toBe("35");
        expect(await input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(35);
        s = await formState(form);
        expect(s.valid).toBe(false);
        expect(s.data.an_integer).toBe(35);
        expect(await field.evaluate((f: FzField) => f.errors.join(" "))).toContain("multiple of 10");
    });
    
})
