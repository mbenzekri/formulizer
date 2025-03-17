import { Page, Locator } from '@playwright/test';

export interface FzForm extends HTMLElement {
  getField(pointer: string): HTMLElement | null;
  schema: any;
  data: any;
  valid: boolean;
}

export interface FzField extends HTMLElement {

}

export const TEST_PAGE = 'http://127.0.0.1:5500/docs/test.html'


export async function formInit(page: Page, schema: any, data: any): Promise<Locator> {
  const formL = page.locator('fz-form');

  await page.waitForSelector('fz-form', { state: 'attached' });
  await page.waitForFunction(() => {
    const form = document.querySelector('fz-form') as any;
    return form && typeof form.getField === 'function';
  });
  await formL.evaluate((form: any, { schema, data }) => {
    form.schema = schema;
    form.data = data;
  }, { schema, data });

  return formL as Locator;
}

export async function formState(formL: Locator) {

  return await formL.evaluate(node => {
    const form = node as FzForm
    const schema = form.schema
    const data = form.data
    const valid = form.valid
    const actions = false
    const readonly = false
    const checkIn = false
    const checkOut = false

    return { valid, schema, data, actions, readonly, checkIn, checkOut }
  })

}

export async function setSchema(formL: Locator,schema: any) {
  return await formL.evaluate((node,schema) => {
    const form = node as FzForm
    form.schema = schema 
  }, schema)
}

export async function setData(formL: Locator,data: any) {
  return await formL.evaluate((node,data) => {
    const form = node as FzForm
    form.data = data 
  },data)
}



export async function fieldHandle(formL: Locator, pointer: string) {

  return await formL.evaluateHandle((node, pointer) => {
    const form = node as FzForm
    const field = form.getField(pointer)
    return field as FzField
  }, pointer)

}

export async function elemHandle(formL: Locator, pointer: string, selector: string) {

  return await formL.evaluateHandle((node, { pointer, selector }) => {
    const form = node as FzForm
    const field = form.getField(pointer)
    const input = field?.shadowRoot?.querySelector(selector) as HTMLElement
    return input
  }, { pointer, selector })

}

export async function elemAllHandle(formL: Locator, pointer: string, selector: string) {
  return await formL.evaluateHandle((node, { pointer, selector }) => {
    const form = node as FzForm
    const field = form.getField(pointer)
    const inputs = [...field?.shadowRoot?.querySelectorAll(selector) ?? []] as HTMLElement[]
    return inputs
  }, { pointer, selector })
}

export function patch(target: Record<string,any>,source: Record<string,any>) {
  const copy = JSON.parse(JSON.stringify(target))
  return deepAssign(copy, source)
}

export function deepAssign(target: Record<string,any>, ...sources: any[]) {
  if (!sources.length) return target;
  
  const source = sources.shift();
  
  if (typeof target !== "object" || typeof source !== "object") {
      return target; // Base case: return if not an object
  }

  for (const key in source) {
      if (source.hasOwnProperty(key)) {
          if (typeof source[key] === "object" && source[key] !== null) {
              if (!target[key] || typeof target[key] !== "object") {
                  target[key] = {}; // Ensure target key is an object before merging
              }
              deepAssign(target[key], source[key]); // Recursively merge
          } else {
              target[key] = source[key]; // Directly assign primitive values
          }
      }
  }

  return deepAssign(target, ...sources);
}
