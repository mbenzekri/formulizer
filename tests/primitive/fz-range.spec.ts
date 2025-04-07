import { test, expect } from '@playwright/test'
import { TestContext } from '../context'

TestContext.SCHEMA = {
    "type": "object",
    "title": "Range Input",
    "required": ["num"],
    "properties": {
        "num": {
            "title": "range",
            "type": "integer",
        }
    }
}

TestContext.DATA = { num: 3 }

class TestRangeContext extends TestContext {
    async stepUp() {
        await C.input.evaluate((input:HTMLInputElement) => input.stepUp())
        await C.input.evaluate(input => input.dispatchEvent(new Event('input')))
    }
    async stepDown() {
        await C.input.evaluate((input:HTMLInputElement) => input.stepDown())
        await C.input.evaluate(input => input.dispatchEvent(new Event('input')))
    }
    async stepTo(targetStep) {
        // rewind the handle
        for (let i=0;i<12;i++) {
            await C.input.evaluate((input:HTMLInputElement) => input.stepDown())
        }
        for (let j=0;j<targetStep;j++) {
            await C.input.evaluate((input:HTMLInputElement) => input.stepUp())
        }
        await C.input.evaluate(input => input.dispatchEvent(new Event('input')))
    }
    
}
const C = new TestRangeContext('/num', "input[type='range']")



test.describe('fz-range field', () => {

    test('fz-range: should be instance of FzInputRange', async ({ page }) => {

        await C.init(page,C.patchSchema({ properties: { num: { minimum: 0, maximum: 10 } } }))
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputRange")
        expect(await C.input.evaluate((input: HTMLInputElement) => input.value)).toBe("3")
        await C.assert(3,true)

    })

    test('fz-range: should respect minimum bound', async ({ page }) => {

        await C.init(page, C.patchSchema({ properties: { num: { minimum: 1, maximum: 10 } } }), { num: 3})
        await C.stepTo(0) // Step down to minimum
        await C.assert(1,true)
        await C.stepDown() // Attempt to step below minimum
        expect(await C.input.evaluate((input: HTMLInputElement) => input.valueAsNumber)).toBe(1) // Should stay at minimum
        await C.assert(1,true)

    })

    test('fz-range: should respect maximum bound', async ({ page }) => {

        await C.init(page, C.patchSchema( { properties: { num: { minimum: 0, maximum: 5 } } }), {})
        await C.stepTo( 5) // Step up to maximum
        await C.assert(5,true)

        await C.stepUp() // Attempt to step above maximum
        expect(await C.input.evaluate((input: HTMLInputElement) => input.valueAsNumber)).toBe(5) // Should stay at maximum
        await C.assert(5,true)

    })

    test('fz-range: should respect exclusiveMinimum constraint', async ({ page }) => {

        await C.init(page, C.patchSchema( { properties: { num: { exclusiveMinimum: 1, maximum: 10 } } }), {})
        await C.stepTo( 0) // Step down to minimum
        await C.assert(1,false,"> 1")
    })

    test('fz-range: should respect exclusiveMaximum constraint', async ({ page }) => {

        await C.init(page, C.patchSchema( { properties: { num: { minimum: 0, exclusiveMaximum: 5 } } }), {})
        await C.stepTo( 5) // Step up to maximum
        await C.assert(5,false,"< 5")
    })

    test('fz-range: should respect multipleOf constraint', async ({ page }) => {

        await C.init(page, C.patchSchema( { properties: { num: { minimum: 0, maximum: 10, multipleOf: 2 } } }), {})
        await C.stepTo( 0) // Step to minimum
        await C.assert(0,true)
        await C.stepUp() // Attempt to step 
        await C.assert(2,true)
        
    })
    test('fz-range: should respect multipleOf constraint default=1', async ({ page }) => {

        await C.init(page, C.patchSchema( { properties: { num: { minimum: 0, maximum: 10 } } }), {})
        await C.stepTo( 0) // Step to minimum
        await C.assert(0,true)
        await C.stepUp() // Attempt to step 
        await C.assert(1,true)
        
    })
})
