/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  css, html } from "lit"
import { isNull, isString, notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";


const RGBA_RE = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-color")
export class FzInputString extends FzInputBase {

    static override get styles() {
        return [
            ...super.styles,
            css`
                .color-empty {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                pointer-events: none;
                font-size: 14px;
            }`
        ]
    }


    override toField(): void{
        if (notNull(this.input) && isString(this.value) && /^#[0-9A-F]/i.test(this.value)) {
            if (!isString(this.value)) this.input.value ="#000000"
            else if (this.value.match(RGBA_RE)) this.input.value = this.rgbaToHex(this.value)
            else this.input.value = this.value
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            if (!isString(this.input.value,true)) this.value = this.empty
            else if (this.input.value.match(RGBA_RE)) this.value = this.rgbaToHex(this.input.value)
            else this.value = this.input.value
        }
    }

    renderInput() {
        const useeyedropper = ("EyeDropper" in window)
        return html`
            <div class="input-group ${this.validation}" >
                <input
                    id="input"
                    type="color" 
                    ?required="${this.required}"
                    ?readonly="${this.readonly}"
                    placeholder="${this.label}"
                    @input="${this.change}"
                    autocomplete=off  spellcheck="false"
                    class="form-control form-control-color" 
                />
                ${this.isempty ? html`<span class="color-empty">Choose a color</span>` : ''}
                <span class="input-group-text" >${ isNull(this.value) ? '~' :this.value }</span>
                ${ useeyedropper ? html`<span class="input-group-text btn btn-primary" @click="${this.eyedropper}" ><i class="bi bi-eyedropper"></i></span>` : ''}
            </div>`
    }


    private rgbaToHex(rgba: string): string {
        // Regular expression to extract the RGBA components
        const match = rgba.match(RGBA_RE);
        if (!match)  throw new Error("Invalid RGBA format");
        const [, r, g, b, _a] = match.map(Number);
    
        // Convert RGB components to hexadecimal
        const toHex = (component: number): string => {
            const hex = component.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
    
        const hex = `${toHex(r)}${toHex(g)}${toHex(b)}`;
        return `#${hex}`;
    }
    private async eyedropper() {
        // ... eyedropper code
        this.eventStop()
        try {
            const eyeDropper = new (window as any).EyeDropper();
            const result = await eyeDropper.open()
            const color = this.rgbaToHex(result.sRGBHex)
            console.log("Color collected", color);
            this.value = color
        } catch(e) {
            console.error("Failed to open/collect color with EyeDropper", String(e));
        }
    }
  
}