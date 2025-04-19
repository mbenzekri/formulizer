import { test, expect } from '@playwright/test';
import { TestContext } from '../context';
import { assert } from 'console';
import { scheduler } from 'timers/promises';

TestContext.SCHEMA = {
    type: 'object',
    properties: {
        field: {
            type: undefined,
            format: undefined,
            readonly: undefined
        }
    }
}

TestContext.DATA = { field: undefined }

const C = new TestContext("/field", "#input")

const dataset = [
    // expected field class, schema type, schema format, initial value, propertis patch (specific)
    { class: "FzInputBoolean", type: "boolean", "format": undefined, value: true, patch: {} },
    { class: "FzInputString", type: "string", "format": undefined, value: "abc", patch: {} },
    { class: "FzInputColor", type: "string", "format": "color", value: "#aabbcc", patch: {} },
    { class: "FzInputDatetime", type: "string", "format": "date-time", value: "2025-02-01T20:30", patch: {} },
    { class: "FzInputDate", type: "string", "format": "date", value: "2024-06-12", patch: {} },
    { class: "FzInputTime", type: "string", "format": "time", value: "10:30", patch: {} },
    { class: "FzInputFloat", type: "number", "format": undefined, value: 123, patch: {} },
    { class: "FzInputRange", type: "integer", "format": undefined, value: 2, patch: { minimum: 1, maximum: 5 } },
    { class: "FzInputInteger", type: "integer", "format": undefined, value: 123, patch: {} },
    { class: "FzInputTextarea", type: "string", "format": undefined, value: "abc", patch: { maxLength: 300 } },
    { class: "FzInputDoc", type: "string", "format": "doc", value: undefined, patch: {} },
    { class: "FzInputLocation", type: "string", "format": "location", value: "POINT(45.12 45.12)", patch: {} },
    // FzInputUuid is readonly by design (div)
    // FzInputConst is readonly by design (div)
    // FzInputMarkdown is readonly by design (html/no input)
    // TBD OBJECT / ARRAY / FzInputPicker / FzInputSignature
]

test.describe('readonly keyword', () => {
    for (const d of dataset) {

        test(`readonly: ${d.class.substring(7)}/${d.type}/${d.format} should set readonly (static true)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, readonly: true,
                        }
                    }
                }, { properties: { field: d.patch } }),
                { field: d.value }
            )
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)

            // when trying update => can't change
            expect(await C.input.evaluate(el => (el as HTMLInputElement).readOnly)).toBe(true)
            await C.assert(d.value, true)
        })

        test(`readonly:  ${d.class.substring(7)}/${d.type}/${d.format} should set read/write (static false)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, readonly: false
                        }
                    }
                }, { properties: { field: d.patch } }),
                { field: d.value }
            )
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)
            // on init state is read/write 
            expect(await C.input.evaluate(el => (el as HTMLInputElement).readOnly)).toBe(false)
            await C.assert(d.value, true)
        })

        test(`readonly: ${d.class.substring(7)}/${d.type}/${d.format} should toggle readonly (readonly dynamic)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, readonly: " $`/toggle` ",
                        },
                        toggle: { type: "boolean" }
                    }
                }, {properties: {field: d.patch}}), 
                { "field": d.value, "toggle": true })

            const toggle = await C.inputLocator('/toggle', 'input')
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)

            // on init state is readonly 
            expect(await C.input.evaluate(el => (el as HTMLInputElement).readOnly)).toBe(true)
            await C.assert(d.value, true)

            // after toggle state is read/write
            await toggle.evaluate((node: HTMLInputElement) => node.click())
            expect(await C.input.evaluate(el => (el as HTMLInputElement).readOnly)).toBe(false)
            await C.assert(d.value, true)

            // after toggle state is readonly again
            await toggle.evaluate((node: HTMLInputElement) => node.click())
            expect(await C.input.evaluate(el => (el as HTMLInputElement).readOnly)).toBe(true)
            await C.assert(d.value, true)

        })
    }
})