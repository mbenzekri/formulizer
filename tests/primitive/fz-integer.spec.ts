import { test, expect } from '@playwright/test';
import { FzField, TestContext } from '../context';

TestContext.SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["an_integer"],
    "properties": {
        "an_integer": {
            "type": "integer"
        }
    }
}

TestContext.DATA = { an_integer: 123 }

const C = new TestContext("/an_integer","input")

test.describe('fz-integer field', () => {

    test('fz-integer: should be instance of FzInputInteger', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputInteger")
        expect(await C.input.inputValue()).toBe("123")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        await C.assert(123,true)
    })

    test('fz-integer: should init correct state', async ({ page }) => {
        await C.init(page,undefined,{ an_integer: 123})
        
        expect(await C.input.inputValue()).toBe("123")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        await C.assert(123,true)
    })

    test('fz-integer: should allow all digits', async ({ page }) => {
        await C.init(page,undefined,{})
        await C.input.press("1")
        await C.input.press("2")
        await C.input.press("3")
        await C.input.press("4")
        await C.input.press("5")
        await C.input.press("6")
        await C.input.press("7")
        await C.input.press("8")
        await C.input.press("9")
        await C.input.press("0")
        expect(await C.input.inputValue()).toBe("1234567890")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(1234567890)
        await C.assert(1234567890,true)
    })

    test('fz-integer: should disallow not digits', async ({ page }) => {
        await C.init(page,undefined,{})
        await C.input.press("a")
        expect(await C.input.inputValue()).toBe("")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(NaN)
        await C.assert(undefined,false,'required')
    })

    test('fz-integer: should check minimum', async ({ page }) => {
        await C.init(page,C.patchSchema({properties:{an_integer: {minimum: 100}}}),{})
        await C.input.press("1")
        await C.input.press("2")
        expect(await C.input.inputValue()).toBe("12")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(12)
        await C.assert(12,false,'>= 100')
    })

    test('fz-integer: should check maximum', async ({ page }) => {
        await C.init(page,C.patchSchema({properties:{an_integer: {maximum: 100}}}),{})
        await C.input.press("1")
        await C.input.press("2")
        await C.input.press("3")
        expect(await C.input.inputValue()).toBe("123")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(123)
        await C.assert(123,false,'<= 100')

    })

    test('fz-integer: Should coerce to integer when mixed integer/number infering', async ({ page }) => {
        await C.init(page,C.patchSchema({properties:{an_integer: {type: ["integer","number"]}}}),{})
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputInteger")
    })

    test('fz-integer: should check multipleOf', async ({ page }) => {
        // Initialize the form with a schema that includes the multipleOf constraint
        await C.init(page, C.patchSchema({ properties: { an_integer: { multipleOf: 10 } } }), {});
    
        // Simulate user input that is a multiple of 10
        await C.input.fill("30");
        expect(await C.input.inputValue()).toBe("30");
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(30);
        await C.assert(30,true)
    
        // Simulate user input that is not a multiple of 10
        await C.input.fill("35");
        expect(await C.input.inputValue()).toBe("35");
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsNumber)).toBe(35);
        await C.assert(35,false,'multiple of 10')
    });
    
})
