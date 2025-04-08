import { test, expect } from '@playwright/test';
import { TestContext } from '../context'

TestContext.SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["a_timestamp"],
    "properties": {
        "a_timestamp": {
            "type": "string",
            "format": "date-time"
        }
    }
}

TestContext.DATA = { a_timestamp: undefined }

const C = new TestContext("/a_timestamp", "input")


test.describe('fz-datetime field', () => {

    test('fz-datetime: should be instance of FzInputDatetime', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputDatetime")
        expect(await C.input.inputValue()).toBe("")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsDate)).toBe(null)
        await C.assert(undefined, false,"required")
    })

    test('fz-datetime: should init correct state', async ({ page }) => {
        await C.init(page, undefined, { a_timestamp: "2025-12-06T10:30" })
        expect(await C.input.inputValue()).toBe("2025-12-06T10:30")
        // valueAsDate not working with datetime-local
        //expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsDate?.toISOString())).toBe("2025-12-06T10:30")
        await C.assert("2025-12-06T10:30", true)

    })

    test('fz-datetime: should allow all digits', async ({ page }, testInfo) => {
        const browser = testInfo.project.name;
        await C.init(page)

        // strange behavior of Datetime ... (have to do all in one browser context)
        expect (await C.input.evaluate((el: HTMLInputElement) => {
            el.value = "2024-06-12T10:30";
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
            return el.value
          })).toBe("2024-06-12T10:30")

        await C.assert("2024-06-12T10:30:00", true)

    })

})

