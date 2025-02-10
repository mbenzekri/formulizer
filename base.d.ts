import { LitElement, CSSResult, CSSResultGroup } from 'lit';
export declare abstract class Base extends LitElement {
    /**
     * On redéfinit la propriété statique `styles` pour y inclure
     * d'une part le CSS de Bootstrap, et d'autre part les styles propres
     * au composant (définis via `localStyles`).
     */
    static get styles(): CSSResultGroup;
    /**
     * Les composants dérivés pourront redéfinir cette propriété statique
     * pour ajouter leurs styles spécifiques.
     */
    static get localStyles(): CSSResult;
}
//# sourceMappingURL=base.d.ts.map