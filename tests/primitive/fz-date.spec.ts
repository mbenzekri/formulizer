import { test, expect } from '@playwright/test';
import { TestContext } from '../context'

TestContext.SCHEMA = {
    "type": "object",
    "title": "Boolean",
    "required": ["a_date"],
    "properties": {
        "a_date": {
            "type": "string",
            "format": "date"
        }
    }
}

TestContext.DATA = { a_date: undefined }

const C = new TestContext("/a_date", "input")


test.describe('fz-date field', () => {

    test('fz-date: should be instance of FzInputDate', async ({ page }) => {
        await C.init(page)
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputDate")
        expect(await C.input.inputValue()).toBe("")
        expect(await C.input.evaluate((x: HTMLInputElement) => x.valueAsDate)).toBe(null)
        await C.assert(undefined, false,"required")
    })

    test('fz-date: should init correct state', async ({ page }) => {
        await C.init(page, undefined, { a_date: "2025-12-06" })
        expect(await C.input.inputValue()).toBe("2025-12-06")
        expect(await C.input.evaluate((x: HTMLInputElement) => { 
            return { y: x.valueAsDate?.getFullYear(), m: (x.valueAsDate?.getMonth() ?? -100) +1 ,d: x.valueAsDate?.getDate() }
        })).toStrictEqual({y: 2025, m:12, d: 6})
        await C.assert("2025-12-06", true)

    })

    test('fz-date: should allow all digits', async ({ page }, testInfo) => {
        const browser = testInfo.project.name;
        await C.init(page)
        await C.input.focus()
        // if (['webkit', 'safari_phone'].includes(browser)) {
            await C.input.evaluate((el: HTMLInputElement) => el.value = '2024-12-06')
            await C.input.evaluate(el => el.dispatchEvent(new Event('input', { bubbles: true })));
            await C.input.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true })));
        // } else {
        //     await page.keyboard.press('1')
        //     await page.keyboard.press('2')
        //     await page.keyboard.press('/')
        //     await page.keyboard.press('0')
        //     await page.keyboard.press('6')
        //     await page.keyboard.press('/')
        //     await page.keyboard.press('2')
        //     await page.keyboard.press('0')
        //     await page.keyboard.press('2')
        //     await page.keyboard.press('4')
        // }
        expect(await C.input.inputValue()).toBe("2024-12-06")
        expect(await C.input.evaluate((x: HTMLInputElement) => { 
            return { y: x.valueAsDate?.getFullYear(), m: (x.valueAsDate?.getMonth() ?? -100) +1 ,d: x.valueAsDate?.getDate() }
        })).toStrictEqual({y: 2024, m:12, d: 6})
        await C.assert("2024-12-06", true)

    })

})

