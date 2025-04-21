import { test, expect } from '@playwright/test';
import { FzField, TestContext } from '../context';

TestContext.SCHEMA = {
    type: 'object',
    properties: {
        field: {
            type: undefined,
            format: undefined,
            required: undefined
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
    { class: "FzInputDoc", type: "string", "format": "doc", value: "<xml>my document</xml>", patch: {} },
    { class: "FzInputLocation", type: "string", "format": "location", value: "POINT(45.12 45.12)", patch: {} },
    // FzInputUuid is N/A (div)
    // FzInputConst is N/A (div)
    // FzInputMarkdown N/A (html/no input)
    // TBD OBJECT / ARRAY / FzInputPicker / FzInputSignature
]

test.describe('required/requiredIf keyword', () => {
    for (const d of dataset) {

        test(`required: ${d.class.substring(7)}/${d.type}/${d.format} should set required (static requiredIf true)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, requiredIf: true,
                        }
                    }
                }, { properties: { field: d.patch } }),
                { field: undefined }
            )
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)

            // on submit errors appears
            C.submit()
            expect(await C.input.evaluate(el => (el as HTMLInputElement).required)).toBe(true)
            await C.assert(undefined,true,"required")
        })

        test(`required:  ${d.class.substring(7)}/${d.type}/${d.format} should not set required (static requiredIf false)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, requiredIf: false
                        }
                    }
                }, { properties: { field: d.patch } }),
                { field: undefined }
            )
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)

            // on submit no errors appears 
            C.submit()
            expect(await C.input.evaluate(el => (el as HTMLInputElement).required)).toBe(false)
            await C.assert(undefined,true)
    
        })

        test(`required: ${d.class.substring(7)}/${d.type}/${d.format} should toggle required (requiredIf dynamic)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, requiredIf: " $`/toggle` ",
                        },
                        toggle: { type: "boolean" }
                    }
                }, {properties: {field: d.patch}}), 
                { "field": d.value, "toggle": true })

            const toggle = await C.inputLocator('/toggle', 'input')
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)

            // on init state is required 
            expect(await C.input.evaluate(el => (el as HTMLInputElement).required)).toBe(true)
            await C.assert(d.value, true)

            // after toggle state is not required
            await toggle.evaluate((node: HTMLInputElement) => node.click())
            expect(await C.input.evaluate(el => (el as HTMLInputElement).required)).toBe(false)
            await C.assert(d.value, true)

            // after toggle state is required again
            await toggle.evaluate((node: HTMLInputElement) => node.click())
            expect(await C.input.evaluate(el => (el as HTMLInputElement).required)).toBe(true)
            await C.assert(d.value, true)

        })
    }
})