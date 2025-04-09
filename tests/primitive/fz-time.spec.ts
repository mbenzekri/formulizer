import { test, expect } from '@playwright/test';
import { TestContext } from '../context'

TestContext.SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["a_time"],
    "properties": {
        "a_time": {
            "type": "string",
            "format": "time"
        }
    }
}

TestContext.DATA = { a_time: undefined }

const C = new TestContext("/a_time", "input")


test.describe('fz-time field', () => {

    test('fz-time: should be instance of FzInputTime', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputTime")
        expect(await C.input.inputValue()).toBe("")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsDate)).toBe(null)
        await C.assert(undefined, false, "required")
    })

    test('fz-time: should init correct state', async ({ page }) => {
        await C.init(page, undefined, { a_time: "10:30" })
        expect(await C.input.inputValue()).toBe("10:30")
        await C.assert("10:30", true)

    })

    test('fz-time: should allow digits and PM', async ({ page }, testInfo) => {
        const browser = testInfo.project.name;
        await C.init(page)
        await C.input.focus()
        if (['webkit', 'safari_phone'].includes(browser)) {
            await C.input.evaluate((el: HTMLInputElement) => el.value = '22:30')
            await C.input.evaluate(el => el.dispatchEvent(new Event('input', { bubbles: true })));
            await C.input.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));
        } else {
            await page.keyboard.press('1')
            await page.keyboard.press('0')
            await page.keyboard.press('3')
            await page.keyboard.press('0')
            await page.keyboard.press('P')
        }

        expect(await C.input.inputValue()).toBe("22:30")
        await C.assert("22:30", true)

    })

    test('fz-time: should allow digits and AM', async ({ page }, testInfo) => {
        const browser = testInfo.project.name;

        await C.init(page)
        await C.input.focus()
        await C.input.evaluate((el: HTMLInputElement) => el.value = '10:30')
        await C.input.evaluate(el => el.dispatchEvent(new Event('input', { bubbles: true })));
        await C.input.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));
        expect(await C.input.inputValue()).toBe("10:30")
        await C.assert("10:30", true)

    })

})

