import { test, expect } from '@playwright/test'
import { TestContext } from '../context'

TestContext.SCHEMA = {
    "type": "object",
    "title": "String Field",
    "required": ["a_string"],
    "properties": {
        "a_string": {
        }
    }
}

TestContext.DATA = { a_string: "example" }

const C = new TestContext('/a_string', "input")


test.describe('fz-string field', () => {

    test('fz-string: should be instance of FzInputString', async ({ page }) => {

        await C.init(page, C.patchSchema({ properties: { a_string: { type: "string" } } }))
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        expect(await C.input.inputValue()).toBe("example")
        await C.assert("example",true)

    })

    test('fz-string: should update on keypress', async ({ page }) => {

        await C.init(page, C.patchSchema({ properties: { a_string: { type: "string" } } }), {})
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        await C.input.press("a")
        await C.assert("a",true)
        await C.input.press("b")
        await C.assert("ab",true)
        await C.input.press("c")
        await C.assert("abc",true)

    })

    test('fz-string: should respect minLength constraint', async ({ page }) => {

        await C.init(page, C.patchSchema({ properties: { a_string: { type: "string", minLength: 5 } } }))
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        await C.input.fill("test")
        await C.assert("test",false,"must NOT be shorter than 5 characters")

    })

    test('fz-string: should respect maxLength constraint', async ({ page }) => {

        await C.init(page, C.patchSchema({ properties: { a_string: { maxLength: 7 } } }), {})
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        await C.input.fill("this is a long string")
        await C.assert("this is",true)

    })

    test('fz-string: should respect pattern constraint', async ({ page }) => {

        await C.init(page, C.patchSchema({ properties: { a_string: { pattern: "^[A-Z]+$" } } }), {})
        await C.input.fill("lowercase")
        await C.assert("lowercase",false,"pattern")
        await C.input.fill("UPPERCASE")
        await C.assert("UPPERCASE",true)

    })

    const formats = [
        { format: "email", classname: "FzInputString", type: "email" },
        { format: "uri", classname: "FzInputString", type: "url" },
        { format: "date-time", classname: "FzInputDatetime", type: "datetime-local" },
        { format: "date", classname: "FzInputDate", type: "date" },
        { format: "time", classname: "FzInputTime", type: "time" },
        { format: "uuid", classname: "FzInputUuid", type: undefined },
        { format: "uri-reference", classname: "FzInputString", type: "text" },
        //{ format: "iri", classname: "FzInputString", type: "text" },
        //{ format: "iri-reference", classname: "FzInputString", type: "text" },
        //{ format: "idn-email", classname: "FzInputString", type: "text" },
        { format: "hostname", classname: "FzInputString", type: "text" },
        //{ format: "idn-hostname", classname: "FzInputString", type: "text" },
        { format: "ipv4", classname: "FzInputString", type: "text" },
        { format: "ipv6", classname: "FzInputString", type: "text" },
        { format: "uri-template", classname: "FzInputString", type: "text" },
        { format: "json-pointer", classname: "FzInputString", type: "text" },
        { format: "relative-json-pointer", classname: "FzInputString", type: "text" },
        { format: "regex", classname: "FzInputString", type: "text" },
    ]
    for (const {format, classname, type} of formats) {
        test(`z-string: should infer FzInputString for ${format} format `, async ({ page }) => {
            await C.init(page, C.patchSchema({ properties: { a_string: { format } } }), {})
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(classname)
            if (type) expect(await C.input.evaluate((i: HTMLInputElement) => i.type)).toBe(type)
        })
    }

})
