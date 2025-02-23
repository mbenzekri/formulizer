/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement} from "lit/decorators.js"
import {  html, css } from "lit"
import {ifDefined} from 'lit/directives/if-defined.js';
import { isEmptyValue } from "../tools"
import { FzInputBase } from "./fz-input-base";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-string")
export class FzInputString extends FzInputBase {

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
            <div class="input-group" >
                <input  
                    class="form-control" 
                    type="${this.type}" 
                    id="input"
                    placeholder="${this.label}"
                    ?readonly="${this.readonly}"
                    @input="${this.change}"
                    @keypress="${this.change}"
                    minlength="${ifDefined(this.minlength)}"
                    maxlength="${ifDefined(this.maxlength)}"
                    pattern="${ifDefined(this.pattern)}"
                    ?required="${this.required}"
                />
                <div ?hidden="${this.type !== 'color' || this.value == undefined}" class="input-group-append" style="max-width:5em" >
                    <span class="input-group-text" >${this.value}</span>
                </div>
            </div>`
    }
    override change() {
        super.change()
        this.requestUpdate()
    }
    get minlength() { return this.schema.minLength }
    get maxlength() { return this.schema.maxLength }
    get pattern() { return this.schema.pattern }
    get type() { 
        switch(this.schema.format) {
            case 'color' :return 'color'
            case 'email' : return 'email'
            case 'password' : return 'password'
            case 'uri' :  return 'url'
            default : return 'text'
        }
        // 'month' : HTML5 un contrôle qui permet de saisir un mois et une année (sans fuseau horaire).
        // 'week' : HTML5 un contrôle permettant de saisir une date représentée par un numéro de semaine et une année (sans indication de fuseau horaire        }
        // hidden : un contrôle qui n'est pas affiché mais dont la valeur est envoyée au serveur.
        // file : un contrôle qui permet de sélectionner un fichier. L'attribut accept définit les types de fichiers qui peuvent être sélectionnés.
    }
    
    convertToInput(value: any) {
        return (value == null || value == "") ? "" : value.toString()
    }

    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : value.toString();
    }
}