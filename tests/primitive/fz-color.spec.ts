import { test, expect, Locator } from '@playwright/test'
import { formLocator, TEST_PAGE, patch, fieldLocator, childLocator, formState, FzField, formAssert } from '../helpers'

const SCHEMA = {
  "type": "object",
  "required": ["a_color"],
  "properties": {
    "a_color": {
      "type": "string",
      "format": "color"
    }
  }
}

const DATA = { a_color: "#FFFFFF" }

let form: Locator
let field: Locator
let input: Locator

async function init(page, testSchema: any = SCHEMA, testData: any = DATA) {
  await page.goto(TEST_PAGE)
  form = await formLocator(page, testSchema ?? SCHEMA, testData ?? DATA)
  field = await fieldLocator(page, '/a_color')
  input = await childLocator(page, '/a_color', "input")
}

test.describe('fz-color field', () => {

  test('fz-color: should be instance of FzInputString', async ({ page }) => {
    await init(page)
    expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputString")
    expect(await input.evaluate((x:HTMLInputElement) => x.type)).toBe("color")
    expect((await input.inputValue()).toUpperCase()).toBe("#FFFFFF")
    await formAssert(form,field,"a_color","#FFFFFF",true)
  })

  test('fz-color: should init correct state', async ({ page }) => {
    await init(page, SCHEMA, { a_color: "#000000" })
    expect(await input.inputValue()).toBe("#000000")
    await formAssert(form,field,"a_color","#000000",true)
  })

  test('fz-color: should accept valid color input', async ({ page }) => {
    await init(page, SCHEMA, {})
    await input.fill("#ff5733")
    expect(await input.inputValue()).toBe("#ff5733")
    await formAssert(form,field,"a_color","#ff5733",true)
  })


  test('fz-color: should handle empty input', async ({ page }) => {
    await init(page, SCHEMA, { a_color: undefined })
    expect(await input.inputValue()).toBe("#000000")
    await formAssert(form,field,"a_color",undefined,false,"required")
    const present = childLocator(page, '/a_color', '.color-empty') 
  })

})
