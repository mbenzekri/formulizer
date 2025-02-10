import { LitElement, css /*, unsafeCSS, CSSResult, CSSResultGroup */} from 'lit';

// Importation du CSS de Bootstrap en tant que chaîne de caractères
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import bootstrapVarsCSS from './assets/bs_variables.css';


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
        // À ce stade, le shadowRoot est bien créé
        // Vérifiez si l'adoption de feuilles de style est supportée
        if (this.shadowRoot && this.canUse_adoptedStyleSheets()) {
            this.shadowRoot.adoptedStyleSheets = [bootstrapVarsSheet, bootstrapSheet, ...this.shadowRoot.adoptedStyleSheets];
        }
    }
    
    static override styles = [css``]

    // /**
    //  * On redéfinit la propriété statique `styles` pour y inclure
    //  * d'une part le CSS de Bootstrap, et d'autre part les styles propres
    //  * au composant (définis via `localStyles`).
    //  */
    // static override get styles(): CSSResultGroup {
    //     return [
    //         // Inclusion du CSS de Bootstrap dans le Shadow DOM
    //         css`${unsafeCSS(bootstrapVarsCSS)}`,
    //         css`${unsafeCSS(bootstrapCSS)}`,
    //         // Inclusion des styles locaux du composant (définis dans la classe dérivée)
    //         this.localStyles
    //     ];
    //     return css``;
    // }

    // /**
    //  * Les composants dérivés pourront redéfinir cette propriété statique
    //  * pour ajouter leurs styles spécifiques.
    //  */
    // static get localStyles(): CSSResult {
    //     return css``;
    // }
}
