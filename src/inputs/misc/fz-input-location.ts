/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html } from "lit"
import { notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-location")
export class FzInputLocation extends FzInputBase {
    private watchId?: number

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

    renderInput() {
        return html`
            <div class="input-group ${this.validation}">
                <input
                    id="input"
                    type="text"
                    ?readonly="${this.readonly}" 
                    ?required="${this.required}" 
                    placeholder="POINT(x y)"
                    autocomplete=off  spellcheck="false"
                    class="form-control"
                />
                <div class="btn-group">
                    <button 
                        type="button"
                        @click="${this.remove}"
                        aria-label="delete"
                        class="btn btn-sm"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                    <button 
                        type="button"
                        ?disabled=${!navigator.geolocation}
                        @click="${this.locate}"
                        aria-label="Geolocate"
                        class="btn btn-primary btn-sm"
                    >
                            <i class="bi bi-geo-alt"></i>
                    </button>
                </div>
            </div>`
    }
    clearWatcher() {
        if (this.watchId !== undefined) {
            navigator.geolocation.clearWatch(this.watchId)
            this.watchId = undefined
        }
    }
    locate() { 

        this.watchId = navigator.geolocation.watchPosition(
            position => {
                this.clearWatcher()
                this.value = this.input.value = `POINT (${position.coords.longitude} ${position.coords.latitude})`
                this.change()
            },
            err => {
                this.clearWatcher()
                console.warn("Geolocation error:", err)
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        )
    }


    override remove() {
        this.input.value = this.empty
        this.change()
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()
        this.clearWatcher()
    }

}