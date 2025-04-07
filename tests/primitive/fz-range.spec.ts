import { test, expect, Locator } from '@playwright/test'
import { formLocator, TEST_PAGE, patch, fieldLocator, childLocator, formState, FzField, formAssert } from '../helpers'

const SCHEMA_BASE = {
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

const DATA = { num: 3 }

let form: Locator
let field: Locator
let input: Locator

async function init(page, testSchema: any = SCHEMA_BASE, testData: any = DATA) {
    await page.goto(TEST_PAGE)
    form = await formLocator(page, testSchema ?? SCHEMA_BASE, testData ?? DATA)
    field = await fieldLocator(page, '/num')
    input = await childLocator(page, '/num', "input[type='range']")
}

async function stepUp(input) {
    await input.evaluate(input => input.stepUp())
    await input.evaluate(input => input.dispatchEvent(new Event('input')))
}
async function stepDown(input) {
    await input.evaluate(input => input.stepDown())
    await input.evaluate(input => input.dispatchEvent(new Event('input')))
}

async function stepTo(input, targetStep) {
    // rewind the handle
    for (let i=0;i<12;i++) {
        await input.evaluate(input => input.stepDown())
    }
    for (let j=0;j<targetStep;j++) {
        await input.evaluate(input => input.stepUp())
    }
    await input.evaluate(input => input.dispatchEvent(new Event('input')))
}

test.describe('fz-range field', () => {

    test('fz-range: should be instance of FzInputRange', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, maximum: 10 } } })
        await init(page,schema)
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputRange")
        expect(await input.evaluate((input: HTMLInputElement) => input.value)).toBe("3")
        await formAssert(form,field,"num",3,true)
    })

    test('fz-range: should respect minimum bound', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 1, maximum: 10 } } })
        await init(page, schema, { num: 3})
        await stepTo(input, 0) // Step down to minimum
        await formAssert(form,field,"num",1,true)

        await stepDown(input) // Attempt to step below minimum
        expect(await input.evaluate((input: HTMLInputElement) => input.valueAsNumber)).toBe(1) // Should stay at minimum
        await formAssert(form,field,"num",1,true)
    })

    test('fz-range: should respect maximum bound', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, maximum: 5 } } })
        await init(page, schema, {})
        await stepTo(input, 5) // Step up to maximum
        await formAssert(form,field,"num",5,true)

        await stepUp(input) // Attempt to step above maximum
        expect(await input.evaluate((input: HTMLInputElement) => input.valueAsNumber)).toBe(5) // Should stay at maximum
        await formAssert(form,field,"num",5,true)
    })

    test('fz-range: should respect exclusiveMinimum constraint', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { exclusiveMinimum: 1, maximum: 10 } } })
        await init(page, schema, {})
        await stepTo(input, 0) // Step down to minimum
        await formAssert(form,field,"num",1,false,"> 1")
    })

    test('fz-range: should respect exclusiveMaximum constraint', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, exclusiveMaximum: 5 } } })
        await init(page, schema, {})
        await stepTo(input, 5) // Step up to maximum
        await formAssert(form,field,"num",5,false,"< 5")
    })

    test('fz-range: should respect multipleOf constraint', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, maximum: 10, multipleOf: 2 } } })
        await init(page, schema, {})
        await stepTo(input, 0) // Step to minimum
        await formAssert(form,field,"num",0,true)
        await stepUp(input) // Attempt to step 
        await formAssert(form,field,"num",2,true)        
    })
    test('fz-range: should respect multipleOf constraint default=1', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, maximum: 10 } } })
        await init(page, schema, {})
        await stepTo(input, 0) // Step to minimum
        await formAssert(form,field,"num",0,true)
        await stepUp(input) // Attempt to step 
        await formAssert(form,field,"num",1,true)        
    })
})
