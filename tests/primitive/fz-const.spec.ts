import { test, expect } from '@playwright/test';
import { FzField, TestContext } from '../context';

TestContext.SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["a_const"],
    "properties": {
        "a_const": {
            "const": 12
        }
    }
}

TestContext.DATA = { "a_const": undefined }

const C = new TestContext("/a_const","#input")

test.describe('fz-const field', () => {

    test('fz-const: should be instance of FzInputConstant', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputConstant")
    })

    test('fz-const: should instanciate const if undefined', async ({ page }) => {
        await C.init(page)
        await C.assert(12,true)
    })
    test('fz-const: should not update if const', async ({ page }) => {
        await C.init(page,undefined,{ "a_const": 123 })
        await C.assert(12,true)
    })


    
})
