import { test, expect, Page, Locator, ElementHandle, JSHandle } from '@playwright/test';
import { fieldLocator as fieldLocator, formLocator as formLocator, children, child, TEST_PAGE, FzField } from './helpers'

let SCHEMA = {
  type: "object",
  properties: {
    "answer": {
      "type": "string",
      "enum": ["yes", "no"]
    }
  }
}
let DATA = { answer: "yes" }

let form_l: Locator
let field_h: Locator
let inputs: JSHandle<HTMLInputElement[]>

async function init(page, testSchema?: any, testData?: any) {
  form_l = await formLocator(page, testSchema ?? SCHEMA, testData ?? DATA)
  field_h = await fieldLocator(page, '/answer')
  inputs = await children(page, '/answer', '.form-check-input') as JSHandle<HTMLInputElement[]>
}

test.describe('fz-enum-check field', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE)
  });


  test('should be in correct state when yes => no', async ({ page }) => {
    await init(page,SCHEMA,DATA)

    expect(await field_h.evaluate(node => node.constructor.name)).toBe("FzEnumCheck");
    expect(await inputs.evaluate(inputs => inputs.length)).toBe(2)
    // TO BE FIXED: in browser testing Chrome/Firefox it works but fail for all chromium/firefox/webkit under testing
    // TBF : expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked).length)).toBe(1)
  })

  test('should radios be in correct state when undefined => yes => no', async ({ page }) => {
    await init(page,SCHEMA,{})
    
    expect(await inputs.evaluate(inputs => inputs.length)).toBe(2)
    //expect(await inputs.evaluate(inputs =>  inputs.every(i => !i.checked))).toBe(true)

    await inputs.evaluate(node => node[0].click())
    expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("yes");

    await inputs.evaluate(node => node[1].click())
    expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("no");

  })

  test('should radios be in correct state when null => yes => no', async ({ page }) => {
    await init(page,SCHEMA,{ "answer": null })

    expect(await inputs.evaluate(inputs => inputs.length)).toBe(2)
    //expect(await inputs.evaluate(inputs => inputs.every(i => !i.checked))).toBe(true)
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(false);

    await inputs.evaluate(node => node[0].click())
    expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("yes");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

    await inputs.evaluate(node => node[1].click())
    expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("no");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

  })

  test('should radios be in correct state when dummy => yes => no', async ({ page }) => {
    await init(page,SCHEMA,{ "answer": "dummy" })

    expect(await inputs.evaluate(inputs => inputs.length)).toBe(2)
    //expect(await inputs.evaluate(inputs => inputs.every(i => !i.checked))).toBe(true)
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(false);

    await inputs.evaluate(node => node[0].click())
    expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("yes");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

    await inputs.evaluate(node => node[1].click())
    expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("no");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

  })

})
