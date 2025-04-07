import { test, expect, Locator } from '@playwright/test'
import { formLocator, TEST_PAGE, patch, fieldLocator, childLocator, formState, FzField, formAssert } from '../helpers'

const SCHEMA = {
    "type": "object",
    "title": "String Field",
    "required": ["a_string"],
    "properties": {
        "a_string": {
        }
    }
}

const DATA = { a_string: "example" }

let form: Locator
let field: Locator
let input: Locator

async function init(page, testSchema: any = SCHEMA, testData: any = DATA) {
    await page.goto(TEST_PAGE)
    form = await formLocator(page, testSchema ?? SCHEMA, testData ?? DATA)
    field = await fieldLocator(page, '/a_string')
    input = await childLocator(page, '/a_string', "input")
}

test.describe('fz-string field', () => {

    test('fz-string: should be instance of FzInputString', async ({ page }) => {
        const schema = patch(SCHEMA, { properties: { a_string: { type: "string" } } })
        await init(page, schema, DATA)
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        expect(await input.inputValue()).toBe("example")
        await formAssert(form,field,"a_string","example",true)

    })

    test('fz-string: should update on keypress', async ({ page }) => {
        const schema = patch(SCHEMA, { properties: { a_string: { type: "string" } } })
        await init(page, schema, {})
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        await input.press("a")
        await formAssert(form,field,"a_string","a",true)
        await input.press("b")
        await formAssert(form,field,"a_string","ab",true)
        await input.press("c")
        await formAssert(form,field,"a_string","abc",true)
    })

    test('fz-string: should respect minLength constraint', async ({ page }) => {
        const schema = patch(SCHEMA, { properties: { a_string: { type: "string", minLength: 5 } } })
        await init(page, schema, DATA)
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        await input.fill("test")
        await formAssert(form,field,"a_string","test",false,"must NOT be shorter than 5 characters")
    })

    test('fz-string: should respect maxLength constraint', async ({ page }) => {
        const schema = patch(SCHEMA, { properties: { a_string: { maxLength: 7 } } })
        await init(page, schema, {})
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputString")
        await input.fill("this is a long string")
        await formAssert(form,field,"a_string","this is",true)
    })

    test('fz-string: should respect pattern constraint', async ({ page }) => {
        const schema = patch(SCHEMA, { properties: { a_string: { pattern: "^[A-Z]+$" } } })
        await init(page, schema, {})

        await input.fill("lowercase")
        await formAssert(form,field,"a_string","lowercase",false,"pattern")

        await input.fill("UPPERCASE")
        await formAssert(form,field,"a_string","UPPERCASE",true)

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
            const schema = patch(SCHEMA, { properties: { a_string: { format } } })
            await init(page, schema, {})
            expect(await field.evaluate(node => node.constructor.name)).toBe(classname)
            if (type) expect(await input.evaluate((i: HTMLInputElement) => i.type)).toBe(type)
        })
    }

})
