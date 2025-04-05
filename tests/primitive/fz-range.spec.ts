import { test, expect, Locator } from '@playwright/test';
import { formLocator, TEST_PAGE, patch, fieldLocator, childLocator, formState, FzField } from '../helpers';

const SCHEMA_BASE = {
    "type": "object",
    "title": "Range Input",
    "required": ["num"],
    "properties": {
        "num": {
            "type": "integer",
            "title": "range",
            "minimum": 0,
            "maximum": 10
        }
    }
};

const DATA = { num: 3 };

let form: Locator;
let field: Locator;
let input: Locator;

async function init(page, testSchema: any = SCHEMA_BASE, testData: any = DATA) {
    await page.goto(TEST_PAGE);
    form = await formLocator(page, testSchema ?? SCHEMA_BASE, testData ?? DATA);
    field = await fieldLocator(page, '/num');
    input = await childLocator(page, '/num', "input[type='range']");
}

async function stepUp(input) {
    await input.evaluate(input => input.stepUp());
    await input.evaluate(input => input.dispatchEvent(new Event('input')));
}
async function stepDown(input) {
    await input.evaluate(input => input.stepDown());
    await input.evaluate(input => input.dispatchEvent(new Event('input')));
}

async function stepTo(input, targetStep) {
    // rewind the handle
    for (let i=0;i<12;i++) {
        await input.evaluate(input => input.stepDown());
    }
    for (let i=0;i<targetStep;i++) {
        await input.evaluate(input => input.stepUp());
    }
    await input.evaluate(input => input.dispatchEvent(new Event('input')));
}

test.describe('fz-range field', () => {

    test('fz-range: should be instance of FzInputRange', async ({ page }) => {
        await init(page);
        expect(await field.evaluate(node => node.constructor.name)).toBe("FzInputRange");
        expect(await input.evaluate((input: HTMLInputElement) => input.value)).toBe("3");
        const s = await formState(form);
        expect(s.valid).toBe(true);
        expect(s.data.num).toBe(3);
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0);
    });

    test('fz-range: should respect minimum bound', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 1, maximum: 10 } } });
        await init(page, schema, { num: 3});
        await stepTo(input, 0); // Step down to minimum
        const s = await formState(form);
        expect(s.data.num).toBe(1);
        expect(s.valid).toBe(true);
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0);

        await stepDown(input); // Attempt to step below minimum
        expect(await input.evaluate((input: HTMLInputElement) => input.valueAsNumber)).toBe(1); // Should stay at minimum
        const s2 = await formState(form);
        expect(s2.data.num).toBe(1);
    });

    test('fz-range: should respect maximum bound', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, maximum: 5 } } });
        await init(page, schema, {});
        await stepTo(input, 5); // Step up to maximum
        const s = await formState(form);
        expect(s.valid).toBe(true);
        expect(s.data.num).toBe(5);
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0);

        await stepUp(input); // Attempt to step above maximum
        expect(await input.evaluate((input: HTMLInputElement) => input.valueAsNumber)).toBe(5); // Should stay at maximum
        const s2 = await formState(form);
        expect(s2.data.num).toBe(5);
    });

    test('fz-range: should respect exclusiveMinimum constraint', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { exclusiveMinimum: 1, maximum: 10 } } });
        await init(page, schema, {});
        await stepTo(input, 0); // Step down to minimum
        const s = await formState(form);
        expect(s.valid).toBe(false);
        expect(await field.evaluate((f: FzField) => f.errors.join())).toContain("> 1");

    });

    test('fz-range: should respect exclusiveMaximum constraint', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, exclusiveMaximum: 5 } } });
        await init(page, schema, {});
        await stepTo(input, 5); // Step up to maximum
        const s = await formState(form);
        expect(s.valid).toBe(false);
        expect(await field.evaluate((f: FzField) => f.errors.join())).toContain("< 5");

    });

    test('fz-range: should respect multipleOf constraint', async ({ page }) => {
        const schema = patch(SCHEMA_BASE, { properties: { num: { minimum: 0, maximum: 10, multipleOf: 2 } } });
        await init(page, schema, {});
        await stepTo(input, 0); // Step to minimum

        const s = await formState(form);
        expect(s.valid).toBe(true);
        expect(await field.evaluate((f: FzField) => f.errors.length)).toBe(0);
        const before =s.data.num
        
        await stepUp(input); // Attempt to step 
        const s2 = await formState(form);
        const after =s2.data.num
        expect(after-before).toBe(2); // Should step by multipleOf value
    });
});
