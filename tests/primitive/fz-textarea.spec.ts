import { test, expect } from '@playwright/test';
import { FzField, TestContext } from '../context';

TestContext.SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["a_text"],
    "properties": {
        "a_text": {
            "type": "string",
            "maxLength": 300
        }
    }
}

TestContext.DATA = { a_text: undefined }

const C = new TestContext("/a_text","textarea")

test.describe('fz-textarea field', () => {

    test('fz-textarea: should be instance of FzInputTextarea', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputTextarea")
        expect(await C.input.inputValue()).toBe("")
        await C.assert(undefined,false,"required")
    })
    
    test('fz-textarea: should update on keypress', async ({ page }) => {

        await C.init(page, C.patchSchema({ properties: { a_string: { type: "string" } } }), {})
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputTextarea")
        await C.input.press("a")
        await C.assert("a",true)
        await C.input.press("b")
        await C.assert("ab",true)
        await C.input.press("c")
        await C.assert("abc",true)

    })

    test('fz-textarea: should init correct state', async ({ page }) => {
        await C.init(page,undefined,{ a_text: "abcdfeghi"})
        
        expect(await C.input.inputValue()).toBe("abcdfeghi")
        await C.assert("abcdfeghi",true)
    })
    
})
