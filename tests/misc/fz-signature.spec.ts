// tests/e2e/fz-signature.spec.ts
import { test, expect, Page } from '@playwright/test'
import { TestContext } from '../context'
import { assertNotNull } from '../helpers'

//
// 1) Define the form schema and initial data
//
TestContext.SCHEMA = {
    type: 'object',
    title: 'Signature Demo',
    properties: {
        field: {
            title: 'Your Signature',
            type: 'string',
            format: 'signature'
        }
    }
}
TestContext.DATA = { signature: undefined }

class TestSignatureContext extends TestContext {

    // draw a cross stroke on the canvas
    async drawSample() {
        const canvas = this.canvas
        const box = await canvas.boundingBox()
        assertNotNull(box)
        await this.page.mouse.move(box.x + 5, box.y + 5)
        await this.page.mouse.down()
        await this.page.mouse.move(box.x + 95, box.y + 95)
        await this.page.mouse.up()

        await this.page.mouse.move(box.x + 95, box.y + 5)
        await this.page.mouse.down()
        await this.page.mouse.move(box.x + 5, box.y + 95)
        await this.page.mouse.up()
    }
    get canvas() {
        return this.field.locator('canvas#canvas')
    }
    get image() {
        return this.field.locator('img#image')
    }

    get noSignature() {
        return this.field.locator('div#nosign')
    }

    get btnEdit() {
        return this.field.locator('button:has(> i.bi-pencil-square)')
    }
    get btnDelete() {
        return this.field.locator('button:has(> i.bi-trash)')
    }
    get btnConfirm() {
        return this.field.locator('button:has(> i.bi-check-lg)')
    }

}

const C = new TestSignatureContext('/field','canvas')

test.describe('fz-signature', () => {

    test.beforeEach(async ({ page }) => {
        await C.init(page)
    })

    test('fz-signature: initial state – read mode, no signature', async () => {
        expect(await C.field.evaluate(node => node.constructor.name)).toBe("FzInputSignature")

        await expect(C.canvas).toBeHidden()
        await expect(C.image).toBeHidden()
        await expect(C.noSignature).toBeVisible()
        await expect(C.btnEdit).toBeVisible()
    })

    test('fz-signature: can draw and validate a signature', async () => {

        await C.btnEdit.click()
        await C.drawSample() 
        await expect(C.canvas).toBeVisible()
        await expect(C.image).toBeHidden()
        await expect(C.noSignature).toBeHidden()
        await expect(C.btnConfirm).toBeVisible()
        await expect(C.btnConfirm).toBeEnabled()
        await C.btnConfirm.click()

        // back in read mode: canvas hidden, image shown
        await expect(C.canvas).toBeHidden()
        await expect(C.image).toBeVisible()
        await expect(C.noSignature).toBeHidden()

        // the form’s data.signature must be a GIF data‑URL
        const s = await C.state()
        expect(s.data.field).toMatch(/^data:image\/png;base64,/)
        expect (s.valid).toBe(true)

    })

    test('fz-signature: can delete an existing signature', async () => {
        // first create one
        await C.btnEdit.click()
        await C.drawSample()
        await C.btnConfirm.click()
        const s = await C.state()
        expect(s.data.field).toMatch(/^data:image\/png;base64,/)

        // now delete
        await C.btnDelete.click()
        await expect(C.canvas).toBeHidden()
        await expect(C.image).toBeHidden()
        await expect(C.noSignature).toBeVisible()
        await C.assert(undefined,true)
    })
})
