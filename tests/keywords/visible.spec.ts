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
            visible: undefined
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

test.describe('visible keyword', () => {
    for (const d of dataset) {

        test(`visible: ${d.class.substring(7)}/${d.type}/${d.format} should be visible (static true)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, visible: true,
                        }
                    }
                }, { properties: { field: d.patch } }),
                { field: d.value }
            )
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)
            expect( await C.field.evaluate(f => f.shadowRoot?.querySelector("#input"))).not.toBeNull()
            await C.assert(d.value, true)
    
        })

        test(`visible:  ${d.class.substring(7)}/${d.type}/${d.format} should be hidden (static false)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, visible: false
                        }
                    }
                }, { properties: { field: d.patch } }),
                { field: d.value }
            )
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)
            expect( await C.field.evaluate(f => f.shadowRoot?.querySelector("#input"))).toBeNull()
            await C.assert(d.value,true)
        })

        test(`visible: ${d.class.substring(7)}/${d.type}/${d.format} should toggle visibility (visible dynamic)`, async ({ page }) => {
            await C.init(
                page,
                C.patchSchema({
                    properties: {
                        field: {
                            type: d.type, format: d.format, visible: " $`/toggle` ",
                        },
                        toggle: { type: "boolean" }
                    }
                }, {properties: {field: d.patch}}), 
                { "field": d.value, "toggle": true })

            const toggle = await C.inputLocator('/toggle', '#input')
            expect(await C.field.evaluate(node => node.constructor.name)).toBe(d.class)

            // check initial state input must be visible (toggle=true)
            expect( await C.field.evaluate(f => f.shadowRoot?.querySelector("#input"))).not.toBeNull()
            await C.assert(d.value,true)

            // on toggle input must be hidden (toggle=false)
            await toggle.click()
            expect( await C.field.evaluate(f => f.shadowRoot?.querySelector("#input"))).toBeNull()
            await C.assert(d.value,true)

            // on toggle input must be visible (toggle=true)
            await toggle.click()
            expect( await C.field.evaluate(f => f.shadowRoot?.querySelector("#input"))).not.toBeNull()
            await C.assert(d.value,true)

        })
    }

})