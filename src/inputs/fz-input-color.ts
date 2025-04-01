/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
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


    override toField(): void{
        if (notNull(this.input)) {
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
        return html`
            <div class="input-group ${this.validation}" >
                <input
                    id="input"
                    type="color" 
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    ?required="${this.required}"
                    autocomplete=off  spellcheck="false"
                    class="form-control form-control-color" 
                />
                <span class="input-group-text" style="max-width:5em">${ isNull(this.value) ? '~' :this.value }</span>
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
}