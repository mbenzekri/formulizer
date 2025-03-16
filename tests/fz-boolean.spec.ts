import { test, expect, Page } from '@playwright/test';
import { formInit, inputHandler } from './helpers'

test.describe('fz-boolean field', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/docs/test.html')
  });

  test('should toggle correctly', async ({ page }) => {
    const schema = {
      type: 'object',
      properties: { active: { type: 'boolean' } }
    }
    const data = { active: true }  
    const formL = await formInit(page,schema,data)
    const inputH = await inputHandler(formL, '#/active','input')

    expect(await inputH.evaluate(node => node.checked)).toBe(true);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(true);

    await inputH.evaluate(node => node.click())
    expect(await inputH.evaluate(node => node.checked)).toBe(false);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(false);
    
    await inputH.evaluate(node => node.click())
    expect(await inputH.evaluate(node => node.checked)).toBe(true);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(true);
  })
  
  test('should init null to indeterminate ', async ({ page }) => {
    const schema = {
      type: 'object',
      properties: { active: { type: ['boolean','null'] } }
    }
    const data = { active: null }  
    const formL = await formInit(page,schema,data)
    const inputH = await inputHandler(formL, '#/active','input')

    expect(await inputH.evaluate(node => node.checked)).toBe(false);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(true);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(null);
    expect(await formL.evaluate((node:any)  => node.valid)).toBe(true);

    await inputH.evaluate(node => node.click())
    expect(await inputH.evaluate(node => node.checked)).toBe(true);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(true);
    expect(await formL.evaluate((node:any)  => node.valid)).toBe(true);

    await inputH.evaluate(node => node.click())
    expect(await inputH.evaluate(node => node.checked)).toBe(false);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.valid)).toBe(true);

  })

  test('should init undefined to indeterminate ', async ({ page }) => {
    const schema = {
      type: 'object',
      properties: { active: { type: 'boolean' } }
    }
    const data = { active: undefined }  
    const formL = await formInit(page,schema,data)
    const inputH = await inputHandler(formL, '#/active','input')

    expect(await inputH.evaluate(node => node.checked)).toBe(false);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(true);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(undefined);
    expect(await formL.evaluate((node:any)  => node.valid)).toBe(true);

    await inputH.evaluate(node => node.click())
    expect(await inputH.evaluate(node => node.checked)).toBe(true);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(true);
    expect(await formL.evaluate((node:any)  => node.valid)).toBe(true);

    await inputH.evaluate(node => node.click())
    expect(await inputH.evaluate(node => node.checked)).toBe(false);
    expect(await inputH.evaluate(node => node.indeterminate)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.data.active)).toBe(false);
    expect(await formL.evaluate((node:any)  => node.valid)).toBe(true);

  })

})
