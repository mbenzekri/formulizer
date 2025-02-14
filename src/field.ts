

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { html, css /*, CSSResult */ } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Base } from './base';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('fz-field')
class FzField extends Base {

    constructor() {
        super();
    }

    static override styles = [css``];



    /**
     * property to collapse/extend the field.
     */
    @property({type : Boolean, attribute: "collapse"})
    accessor p_collapsed = false;

    override render() {
        // return html`
        //     <div class="panel panel-default">
        //         <div class="panel-heading" @click="${this.collapse}">
        //             ${this.p_collapsed ? html`The computed abstracted value for field` : html`${this.p_label}`}
        //             <button type="button" style="float:right" class="btn-close btn-light" aria-label="Close"
        //                 ?hidden="${!this.p_deletable}" @click="${this.delete}" 
        //             ></button>                
        //         </div>
        //         <div class="panel-body" ?hidden="${this.p_collapsed}> 
        //             The Input must flow here
        //         </div>
        //     </div>
        // `;
        // return html`
        //     <div class="card">
        //         <div class="card-header" @click="${this.collapse}">
        //             ${this.p_collapsed ? html`The computed abstracted value for field` : html`${this.p_label}`}
        //             <button type="button" style="float:right" class="btn-close btn-light" aria-label="Close"
        //                 ?hidden="${!this.p_deletable}" @click="${this.delete}" ></button> 
        //         </div>
        //         <div class="card-body" ?hidden="${this.p_collapsed}" > 
        //             <label for="basic-url" class="form-label">Your vanity URL</label>
        //             <div class="input-group mb-3">
        //                 <span class="input-group-text">$</span>
        //                 <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        //                 <span class="input-group-text">.00</span>
        //             </div>
        //         </div>
        //     </div>
        // `

        return html`
            <label for="basic-url" class="form-label">Your vanity URL</label>
            <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                <span class="input-group-text">.00</span>
            </div>
        `

    }

    delete() {
        alert("Sure ?")
    }
    collapse() {
        this.p_collapsed = !this.p_collapsed;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'fz-field': FzField;
    }
}



export { FzField }