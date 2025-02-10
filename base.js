import { LitElement, css /*, unsafeCSS, CSSResult, CSSResultGroup */ } from 'lit';
// Importation du CSS de Bootstrap en tant que chaîne de caractères
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import bootstrapVarsCSS from './assets/bs_variables.css';
const bootstrapSheet = new CSSStyleSheet();
bootstrapSheet.replaceSync(bootstrapCSS);
const bootstrapVarsSheet = new CSSStyleSheet();
bootstrapVarsSheet.replaceSync(bootstrapVarsCSS);
export class Base extends LitElement {
    canUse_adoptedStyleSheets() {
        return !!this.shadowRoot && 'adoptedStyleSheets' in this.shadowRoot;
    }
    connectedCallback() {
        super.connectedCallback();
        // À ce stade, le shadowRoot est bien créé
        // Vérifiez si l'adoption de feuilles de style est supportée
        if (this.shadowRoot && this.canUse_adoptedStyleSheets()) {
            this.shadowRoot.adoptedStyleSheets = [bootstrapVarsSheet, bootstrapSheet, ...this.shadowRoot.adoptedStyleSheets];
        }
    }
}
Base.styles = [css ``];
//# sourceMappingURL=base.js.map