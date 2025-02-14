import { LitElement, css /*, unsafeCSS, CSSResult, CSSResultGroup */} from 'lit';

// Import boostrap CSSs as a string
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import bootstrapVarsCSS from './assets/bs_variables.css';

// this code build the needed style sheet for bootstrap  
const bootstrapSheet = new CSSStyleSheet();
bootstrapSheet.replaceSync(bootstrapCSS);
const bootstrapVarsSheet = new CSSStyleSheet();
bootstrapVarsSheet.replaceSync(bootstrapVarsCSS);

export abstract class Base extends LitElement {
    canUse_adoptedStyleSheets(): boolean {
        return !!this.shadowRoot && 'adoptedStyleSheets' in this.shadowRoot
    }

    override connectedCallback() {
        super.connectedCallback();
        // at this step, shadowRoot is created
        if (this.shadowRoot && this.canUse_adoptedStyleSheets()) {
            this.shadowRoot.adoptedStyleSheets = [bootstrapVarsSheet, bootstrapSheet, ...this.shadowRoot.adoptedStyleSheets];
        }
    }
    
    static override styles = [css``]

}
