import { test, expect, Page, JSHandle, ElementHandle, Locator } from '@playwright/test';
import { formInit, elemHandle, TEST_PAGE, FzField, fieldHandle, setData, patch } from './helpers'

const SCHEMA = {
  type: 'object',
  properties: { active: { type: 'boolean' } }
}

const DATA = { active: true }

let form_l: Locator
let field_h: ElementHandle<FzField>
let input_h: ElementHandle<HTMLInputElement>

async function init(page, testSchema: any = SCHEMA, testData: any = DATA) {
  form_l = await formInit(page, testSchema ?? SCHEMA, testData ?? DATA)
  field_h = await fieldHandle(form_l, '#/active')
  input_h = await elemHandle(form_l, '#/active', 'input') as ElementHandle<HTMLInputElement>
}

test.describe('fz-boolean field', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE)
  });

  test('should be instance of FzInputBoolean', async ({ page }) => {
    await init(page)
    expect(await field_h.evaluate(node => node.constructor.name === "FzInputBoolean")).toBe(true)
  })

  test('should toggle (true => false => true)', async ({ page }) => {
    await init(page)
    {
      // initial true => checked && !indeterminate
      expect(await input_h.isChecked()).toBe(true);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    } {
      // false => !checked && !indeterminate
      await input_h.click()
      expect(await input_h.isChecked()).toBe(false);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    } {
      // true => checked && !indeterminate
      await input_h.click()
      expect(await input_h.isChecked()).toBe(true);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    }
  })

  test('should toggle (null => true => false) ', async ({ page }) => {
    await init(page,
      patch(SCHEMA, {properties: { type: ['boolean', 'null'] }}),
      { active: null }
    )
    {
      // initial state null : !checked && indeterminate
      expect(await input_h.isChecked()).toBe(false);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(null);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    }
    {
      // null => true : checked && !indeterminate
      await input_h.click()
      expect(await input_h.isChecked()).toBe(true);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    } {
      // true => false: !checked && !indeterminate 
      await input_h.click()
      expect(await input_h.isChecked()).toBe(false);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    }
  })

  test('should toggle (undefined => true => false)', async ({ page }) => {
    await init(page,SCHEMA, { active: undefined })

    {
      expect(await input_h.isChecked()).toBe(false);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(undefined);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    } {
      await input_h.click()
      expect(await input_h.isChecked()).toBe(true);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    } {
      await input_h.click()
      expect(await input_h.isChecked()).toBe(false);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    }
  })
  test('should toggle (dummy => true => false)', async ({ page }) => {
    await init(page,SCHEMA, { active: "dummy" })

    {
      expect(await input_h.isChecked()).toBe(false);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe("dummy");
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(false);
    } {
      await input_h.click()
      expect(await input_h.isChecked()).toBe(true);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    } {
      await input_h.click()
      expect(await input_h.isChecked()).toBe(false);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    }
  })

  test('should not toggle (readonly)', async ({ page }) => {
    await init(page,
      patch(SCHEMA, {properties: { active: { readonly: true }}}),
      { active: true }
    )
    {
      // on click no change
      // !!! for readonly checkbox DONT USE input_h.click() Playwright FAILS because CSS "event-pointers" set to "none"
      await input_h.evaluate(node => node.click());
      expect(await input_h.isChecked()).toBe(true);
      expect(await input_h.evaluate(node => node.indeterminate)).toBe(false);
      expect(await form_l.evaluate((node: any) => node.data.active)).toBe(true);
      expect(await form_l.evaluate((node: any) => node.valid)).toBe(true);
    }
  })

})
