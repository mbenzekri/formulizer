import { Page, Locator, expect } from '@playwright/test';

export interface FzForm extends HTMLElement {
    getField(pointer: string): HTMLElement | null;
    schema: any;
    data: any;
    valid: boolean;
}

export interface FzField extends HTMLElement {
    pointer: string;
    schema: any;
    data: any;
    valid: boolean;
    errors: string[]
}

export interface FzField extends HTMLElement {

}

export const TEST_PAGE = 'http://127.0.0.1:5500/docs/test.html'


export async function formLocator(page: Page, schema: any, data: any): Promise<Locator> {
    page.on('console', msg => {
        console.log(`[Browser] ${msg.type()}: ${msg.text()}`);
    });

    await page.waitForSelector('fz-form', { state: 'attached' });
    await page.waitForFunction(() => {
        const form = document.querySelector('fz-form') as any;
        return form && typeof form.getField === 'function';
    });
    const formL = page.locator('fz-form');
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
export async function formAssert(form: Locator,field: Locator, property: string, value: any, valid: boolean, error?:string) {
    const s = await formState(form)

    expect(s.valid).toBe(valid)
    expect(s.data[property]).toBe(value)

    valid
        ? expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0)
        : expect(await field.evaluate((f: FzField) => f.errors.length)).toBeGreaterThan(0);

    if (error)expect(await field.evaluate((f: FzField) => f.errors.join(" "))).toContain(error);
    
    // error styling is depending on field touched or not 
    // valid 
    //     ? expect(await field.evaluate(f => f.shadowRoot?.querySelectorAll('.is-valid').length)).toBeGreaterThan(0)
    //     : expect(await field.evaluate(f => f.shadowRoot?.querySelectorAll('.is-invalid').length)).toBeGreaterThan(0)
}

export async function setSchema(formL: Locator, schema: any) {
    return await formL.evaluate((node, schema) => {
        const form = node as FzForm
        form.schema = schema
    }, schema)
}

export async function setData(formL: Locator, data: any) {
    return await formL.evaluate((node, data) => {
        const form = node as FzForm
        form.data = data
    }, data)
}

export async function fieldLocator(page: Page,pointer: string) {
    return await page.locator(`[pointer="${pointer}"]`)
}

export async function childLocator(page: Page, pointer: string, selector: string) {
    return await page.locator(`[pointer="${pointer}"] ${selector}`)
}

export async function count(page: Page, pointer: string, selector: string) {
    const field = await fieldLocator(page, pointer)
    return await field.evaluate((field, selector ) => {
        const inputs = [...field?.shadowRoot?.querySelectorAll(selector) ?? []] as HTMLElement[]
        return inputs.length
    }, selector)
}
export async function child(page: Page, pointer: string, selector: string) {
    const field = await fieldLocator(page, pointer)
    return await field.evaluateHandle((field, selector ) => {
        const input = field?.shadowRoot?.querySelector(selector) as HTMLElement
        return input
    }, selector)
} 

export async function children(page: Page, pointer: string, selector: string) {
    const field = await fieldLocator(page, pointer)
    return await field.evaluateHandle((field, selector ) => {
        const inputs = [...field?.shadowRoot?.querySelectorAll(selector) ?? []] as HTMLElement[]
        return inputs
    }, selector)
}


function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}


/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}

export function patch(target, ...sources) {
    const copy = JSON.parse(JSON.stringify(target))
    return merge(copy,...sources)
}