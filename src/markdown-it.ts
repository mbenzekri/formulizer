import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { css, html } from "lit"

import MarkdownIt from "markdown-it"
import { Base } from "./base"

const md = new MarkdownIt({
    html: false,                // Enable HTML tags in source
    xhtmlOut: false,            // Use '/' to close single tags (<br />). This is only for full CommonMark compatibility.
    breaks: false,              // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',    // CSS language prefix for fenced blocks. Can be useful for external highlighters.
    linkify: true,              // Autoconvert URL-like text to links
    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer: true,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '""\'\'',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (_str, _lang) { return ''; }
})

function patchAttr(md: MarkdownIt, tagname: string, attrname: string, content: string) {


    // Save the original rendering rule for table_open (if any)
    const defaultRender = md.renderer.rules.table_open || function defRender(tokens, idx, options, _env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules[`${tagname}_open`] = (tokens, idx, options, env, self) => {
        // Get the current token for the <table> opening tag.
        const token = tokens[idx];

        // Check if there's already a class attribute, and append or create as necessary.
        const classIndex = token.attrIndex(attrname);
        if (classIndex < 0) {
            token.attrPush([attrname, content]); // add new attribute
        } else {
            if (token.attrs) token.attrs[classIndex][1] += ` ${content}`; // append new class
        }

        // Proceed with default rendering.
        return defaultRender(tokens, idx, options, env, self);
    };

}

function patchImg(md: MarkdownIt, width: number, height: number) {

    const defaultImageRender = md.renderer.rules.image ||
        function (tokens, idx, options, _env, self) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        // If no width/height is set, add defaults.
        if (!token.attrGet('width')) token.attrSet('width', `${width}`); // set default width
        if (!token.attrGet('height')) token.attrSet('height', `${height}`); // set default height
        return defaultImageRender(tokens, idx, options, env, self);
    };
}

patchAttr(md, "table", "class", "table table-striped table-responsive")
patchImg(md, 100, 100)

@customElement("markdown-it")
export class FzMarkdownIt extends Base {

    @property({ attribute: "markdown", type: String }) markdown: string = ""

    static override styles = [
        css`
            blockquote {
                padding: 10px 20px;
                margin: 0 0 20px;
                font-size: 17.5px;
                border-left: 5px solid #eee;
            }
            pre {
                display: block;
                padding: 9.5px;
                margin: 0 0 10px;
                font-size: 13px;
                line-height: 1.42857143;
                color: #333;
                word-break: break-all;
                word-wrap: break-word;
                background-color: #f5f5f5;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            pre code {
                padding: 0;
                font-size: inherit;
                color: inherit;
                white-space: pre-wrap;
                background-color: transparent;
                border-radius: 0;
            }
            code {
                padding: 2px 4px;
                font-size: 90%;
                color: #c7254e;
                background-color: #f9f2f4;
                border-radius: 4px;
            }
            h1,h2,h3,h4,h5,h6 {
                text-decoration: underline;
            }
        `]

    override render() {
        const rendered = md.render(this.markdown)
        return html`<div>
            ${unsafeHTML(rendered)}
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'markdown-it': FzMarkdownIt;
    }
}
