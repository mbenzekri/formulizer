import { Page, Locator } from '@playwright/test';

export interface FzForm extends HTMLElement {
  getField(pointer: string): HTMLElement | null;
  schema: object;
  data: object;
  valid: boolean;
}

export interface FzFieldElement extends HTMLElement {}

/**
 * Waits for `fz-form` to initialize and sets schema + data.
 * @param page Playwright page instance
 * @param schema JSON Schema object
 * @param data Initial form data
 * @returns `fz-form` instance
 */
export async function formInit(page: Page, schema: object, data: object): Promise<Locator> {
  const formL = page.locator('fz-form');

  await page.waitForSelector('fz-form', { state: 'attached' });
  await page.waitForFunction(() => {
    const form = document.querySelector('fz-form') as any;
    return form && typeof form.getField === 'function';
  });
  page.pause(); // Stops execution and opens DevTools
  await formL.evaluate((form: any, { schema, data }) => {
    form.schema = schema;
    form.data = data;
  }, { schema, data });

  return formL;
}
export async function formStatus(formL: Locator) {

    return await formL.evaluate(node => {
        const form = node as FzForm
        const schema = form.schema
        const data = form.data
        const valid = form.valid
        return {valid, schema, data}
    })
    
}

export async function inputHandler(formL: Locator,pointer:string,selector:string) {

  return await formL.evaluateHandle((node,{pointer, selector}) => {
      const form = node as FzForm
      const field = form.getField(pointer)
      const input = field?.shadowRoot?.querySelector(selector) as HTMLInputElement
      return input
  },{ pointer, selector })
  
}



// /**
//  * Retrieves a field from the form using its JSON Pointer.
//  * @param formL Playwright Locator for `fz-form`
//  * @param pointer JSON Pointer (e.g., `/active`)
//  * @returns Field element inside `fz-form`
//  */
// export async function evaluateField(formL: Locator, pointer: string, page: Page): Promise<Locator> {
//     await page.waitForFunction(
//       (form, pointer) => form.getField && typeof form.getField === 'function' && form.getField(pointer),
//       {},
//       await formL.elementHandle(), // Ensure formL is resolved
//     );
  
//     return formL.locator(`:scope >>> *`).filter({ hasText: pointer }); // Adjust selector if needed
//   }
  
// /**
//  * Retrieves an `<input>` element inside a field’s Shadow DOM.
//  * @param fieldL Playwright Locator for the field
//  * @param selector CSS selector for the input element (default: `'input'`)
//  * @returns Input element inside field
//  */
// export async function evaluateInput(fieldL: Locator, selector: string = 'input'): Promise<Locator> {
//   return fieldL.locator(`:scope >>> ${selector}`);
// }
// // 