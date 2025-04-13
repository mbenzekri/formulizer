import { test, expect } from '@playwright/test';
import { TestContext } from '../context';
import { assert } from 'console';
import { scheduler } from 'timers/promises';

TestContext.SCHEMA = {
    type: 'object',
    properties: { 
        l: { type: 'integer' },
        h: { type: 'integer' },
        l2: { type: 'number', dynamic: " $`/l` ** 2 "},
        h2: { type: 'number', dynamic: "  $`/h` ** 2  "},
        d: { type: 'number', dynamic: " Math.sqrt($`/l2` + $`/h2`) "},
    }
}

TestContext.DATA = { l: 2, h : 3 }

const C = new TestContext("")

test.describe('fz-boolean field', () => {

    test('dynamic: should init calculation', async ({ page }) => {
        await C.init(page)
        const s = await C.state()
        expect(s.data.l).toBe(2)
        expect(s.data.h).toBe(3)
        expect(s.data.l2).toBe(4)
        expect(s.data.h2).toBe(9)
        expect(s.data.d).toBe(Math.sqrt(13))
    })
    test('dynamic: should update calculation on dependeny change', async ({ page }) => {
        await C.init(page)
        const input = await C.inputLocator('/l','input')
        await input.fill("3")
        const s = await C.state()
        expect(s.data.l).toBe(3)
        expect(s.data.h).toBe(3)
        expect(s.data.l2).toBe(9)
        expect(s.data.h2).toBe(9)
        expect(s.data.d).toBe(Math.sqrt(18))
    })
    test('dynamic: should update calculation on two update dependeny change', async ({ page }) => {
        await C.init(page)
        const input_l = await C.inputLocator('/l','input')
        const input_h = await C.inputLocator('/h','input')
        await input_l.fill("3")
        await input_h.fill("4")
        const s = await C.state()
        expect(s.data.l).toBe(3)
        expect(s.data.h).toBe(4)
        expect(s.data.l2).toBe(9)
        expect(s.data.h2).toBe(16)
        expect(s.data.d).toBe(5)
    })

    test('dynamic: should break circular dependeny', async ({ page }) => {
        const schema = {
            type: 'object',
            properties: { 
                v1: { type: 'integer', dynamic: " $`/v3` * 2 "},
                v2: { type: 'number', dynamic: " $`/v1` * 2 "},
                v3: { type: 'number', dynamic: "  $`/v2` * 2  "},
            }
        }
        const data = { v1: 2, v2:2, v3:3}
        await C.init(page,schema,data)
        const s = await C.state()
        expect(s.data.v1).toBeGreaterThan(0)
        expect(s.data.v2).toBeGreaterThan(0)
        expect(s.data.v3).toBeGreaterThan(0)
    })

})
