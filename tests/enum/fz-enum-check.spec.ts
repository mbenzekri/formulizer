import { test, expect, Page, Locator, ElementHandle, JSHandle } from '@playwright/test';
import { fieldLocator as fieldLocator, formLocator as formLocator, children, child, TEST_PAGE, FzField, formState } from '../helpers'

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
let radios: JSHandle<HTMLInputElement[]>

async function init(page, testSchema?: any, testData?: any) {
  form_l = await formLocator(page, testSchema ?? SCHEMA, testData ?? DATA)
  field_h = await fieldLocator(page, '/answer')
  radios = await children(page, '/answer', '.form-check-input') as JSHandle<HTMLInputElement[]>
}

test.describe('fz-enum-check field', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE)
  });


  test('should be in correct state when yes => no', async ({ page }) => {
    await init(page,SCHEMA,DATA)

    expect(await field_h.evaluate(node => node.constructor.name)).toBe("FzEnumCheck");
    expect(await radios.evaluate(inputs => inputs.length)).toBe(2)
    // TO BE FIXED: in browser testing Chrome/Firefox it works but fail for all chromium/firefox/webkit under testing
    // TBF : expect(await inputs.evaluate(inputs => inputs.filter(i => i.checked).length)).toBe(1)
  })

  test('should radios be in correct state when undefined => yes => no', async ({ page }) => {
    await init(page,SCHEMA,{})
    
    expect(await radios.evaluate(inputs => inputs.length)).toBe(2)
    //expect(await inputs.evaluate(inputs =>  inputs.every(i => !i.checked))).toBe(true)

    await radios.evaluate(node => node[0].click())
    expect(await radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("yes");

    await radios.evaluate(node => node[1].click())
    expect(await radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("no");

  })

  test('should radios be in correct state when null => yes => no', async ({ page }) => {
    await init(page,SCHEMA,{ "answer": null })

    expect(await radios.evaluate(inputs => inputs.length)).toBe(2)
    //expect(await inputs.evaluate(inputs => inputs.every(i => !i.checked))).toBe(true)
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(false);

    await radios.evaluate(node => node[0].click())
    expect(await radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("yes");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

    await radios.evaluate(node => node[1].click())
    expect(await radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("no");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

  })

  test('should radios be in correct state when dummy => yes => no', async ({ page }) => {
    await init(page,SCHEMA,{ "answer": "dummy" })

    expect(await radios.evaluate(inputs => inputs.length)).toBe(2)
    //expect(await inputs.evaluate(inputs => inputs.every(i => !i.checked))).toBe(true)
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(false);

    await radios.evaluate(node => node[0].click())
    expect(await radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "yes").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("yes");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

    await radios.evaluate(node => node[1].click())
    expect(await radios.evaluate(inputs => inputs.filter(i => i.checked && i.value === "no").length)).toBe(1)
    expect(await form_l.evaluate((node: any) => node.data.answer)).toBe("no");
    expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);

  })

    test('boolean type and oneOf must generate checks', async ({ page }) => {
        await init(page, {
            "type": "object",
            "properties": {
                "answer": {
                    "type": ["boolean", "null"],
                    "title": "Got it ?",
                    "oneOf": [
                        { "const": true, "title": "Yes" },
                        { "const": false, "title": "No" },
                        { "const": null, "title": "Don't know" }
                    ]
                }
            }
        }, { "answer": true})
        expect(await field_h.evaluate(node => node.constructor.name)).toBe("FzEnumCheck")
        expect(await radios.evaluate(inputs => inputs.map(i => i.checked))).toStrictEqual([true, false,false])
        expect(await radios.evaluate(inputs => inputs.map(i => i.value))).toStrictEqual(["true", "false",""])
        let s = await formState(form_l)
        expect(s.data.answer).toBe(true)
        expect(s.valid).toBe(true)
        expect(await radios.evaluate(inputs => inputs[1].click()))
        s = await formState(form_l)
        expect(s.data.answer).toBe(false)
        expect(s.valid).toBe(true)
        expect(await radios.evaluate(inputs => inputs[2].click()))
        s = await formState(form_l)
        expect(s.data.answer).toBe(null)
        expect(s.valid).toBe(true)
    })

})
