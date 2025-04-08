import { test, expect } from '@playwright/test';
import { FzField, TestContext } from '../context';

TestContext.SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["a_uuid"],
    "properties": {
        "a_uuid": {
            "type": "string",
            "format": "uuid"
        }
    }
}

TestContext.DATA = { "a_uuid": undefined }

const C = new TestContext("/a_uuid",".form-control")

test.describe('fz-uuid field', () => {

    test('fz-uuid: should be instance of FzInputUuid', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputUuid")
    })

    test('fz-uuid: should instanciate uuid if undefined', async ({ page }) => {
        await C.init(page)
        const uuid = await C.input.textContent()
        //expect(await C.field.evaluate((node: HTMLElement) => node.innerText)).toBe("zzz")
        await C.assert(uuid,true)
    })
    test('fz-uuid: should not update if uuid present', async ({ page }) => {
        await C.init(page,undefined,{a_uuid: "6dfdf620-14bd-11f0-98f4-0368326f7e9a"})
        await C.assert("6dfdf620-14bd-11f0-98f4-0368326f7e9a",true)
    })


    
})
