import { Page } from "@playwright/test"

export async function fieldLocator(page: Page,pointer: string) {
    return await page.locator(`[pointer="${pointer}"]`)
}

export async function childLocator(page: Page, pointer: string, selector: string) {
    return await page.locator(`[pointer="${pointer}"] ${selector}`)
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

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
