// Import boostrap CSSs as a string
import bootstrapCSS from './assets//bootstrap.css';
import bootstrapVarsCSS from './assets/bs_variables.css';

// this code build the needed style sheet for bootstrap  
const bootstrapSheet = new CSSStyleSheet();
bootstrapSheet.replaceSync(bootstrapCSS);
const bootstrapVarsSheet = new CSSStyleSheet();
bootstrapVarsSheet.replaceSync(bootstrapVarsCSS);

export { bootstrapCSS, bootstrapVarsCSS, bootstrapSheet, bootstrapVarsSheet}

export function adoptBootstrapCss(root: ShadowRoot | null) {
    if (root && 'adoptedStyleSheets' in root) {
        root.adoptedStyleSheets = [bootstrapSheet, ...root.adoptedStyleSheets];
    }
}
