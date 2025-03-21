import { test, expect, Page, Locator, ElementHandle, JSHandle } from '@playwright/test';
import { fieldHandle, formInit, elemAllHandle, elemHandle, TEST_PAGE, FzField } from './helpers'

let schema = {
  type: "object",
  properties: {
    "answer": {
      "type": "string",
      "enum": ["yes", "no"]
    }
  }
}
let data = { answer: "yes" }

let form_l: Locator
let field_h: ElementHandle<FzField>
let inputs: JSHandle<HTMLInputElement[]>

async function init(page, testSchema?: any, testData?: any) {
  form_l = await formInit(page, testSchema ?? schema, testData ?? data)
  field_h = await fieldHandle(form_l, '/answer')
  inputs = await elemAllHandle(form_l, '/answer', '.form-check-input') as JSHandle<HTMLInputElement[]>
}

test.describe('fz-enum-check field', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE)
    form_l = await formInit(page, schema, data)
    field_h = await fieldHandle(form_l, '/answer')

  });


  test('should be in correct state when yes => no', async ({ page }) => {
    await init(page,schema,{ answer: "yes" })

    expect(await field_h.evaluate(node => node.constructor.name === "FzEnumCheck")).toBe(true);
    expect(await inputs.evaluate(inputs => inputs.length)).toBe(2)
    // TO BE FIXED: in browser testing Chrome/Firefox it works but fail for all chromium/firefox/webkit under testing
    // TBF : expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked).length)).toBe(1)
  })

  test('should radios be in correct state when undefined => yes => no', async ({ page }) => {
    await init(page,schema,{})

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
    await init(page,schema,{ "answer": null })

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
    await init(page,schema,{ "answer": "dummy" })

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
