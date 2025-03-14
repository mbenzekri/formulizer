/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html, css } from "lit"
import { notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-geolocation")
export class FzInputGeolocation extends FzInputBase {

    override toField(): void {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "")
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined 
        }
    }

    static override get styles() {
        return [
            ...super.styles,
            css`
            input[type="color"] {
                height: 38px
            }`
        ]
    }

    renderInput() {
        return html`
            <div class="input-group">
                <input
                    class="form-control"
                    type="text"
                    id="input"
                    readonly
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}" 
                />
                <div class="btn-group">
                    <button 
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="${this.remove}"
                        aria-label="delete">
                            <i class="bi bi-x"></i>
                    </button>
                    <button 
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="${this.geolocate}"
                        aria-label="Geolocate">
                            <i class="bi bi-geo-alt"></i>
                    </button>
                </div>
            </div>`
    }

    geolocate() { 
        navigator.geolocation.getCurrentPosition((position: any) => {
            this.input.value = `POINT (${position.coords.longitude} ${position.coords.latitude})`
            this.change()
        });
    }

    override remove() {
        this.input.value = ""
        this.change()
    }

}