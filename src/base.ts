import { LitElement } from 'lit';

import { bootstrapCss } from "./assets/bootstrap"
import { bootstrapIconsCss } from "./assets/bootstrap-icons"

export class Base extends LitElement {

    static override get styles() {
            return [
                bootstrapCss,
                bootstrapIconsCss,
            ]
    }
}
