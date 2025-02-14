/* eslint-disable @typescript-eslint/no-explicit-any */
import { customElement } from "lit/decorators.js"
import { html, css } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { FzElement } from "./fz-element";

import MarkdownIt from "markdown-it"

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

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-markdown")
export class FzMarkdown extends FzElement {

    static override get styles() {
        return [
            ...super.styles,
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
            table {
                width: 100%;
                max-width: 100%;
                margin-bottom: 20px;
            }
            table > thead > tr > th,
            table > tbody > tr > th,
            table > tfoot > tr > th,
            table > thead > tr > td,
            table > tbody > tr > td,
            table > tfoot > tr > td {
                padding: 8px;
                line-height: 1.42857143;
                vertical-align: top;
                border-top: 1px solid #ddd;
            }
            table > thead > tr > th {
                vertical-align: bottom;
                border-bottom: 2px solid #ddd;
            }
            table > caption + thead > tr:first-child > th,
            table > colgroup + thead > tr:first-child > th,
            table > thead:first-child > tr:first-child > th,
            table > caption + thead > tr:first-child > td,
            table > colgroup + thead > tr:first-child > td,
            table > thead:first-child > tr:first-child > td {
                border-top: 0;
            }
            table > tbody + tbody {
                border-top: 2px solid #ddd;
            }
            table .table {
                background-color: #fff;
            }`
        ]
    }
    
    renderInput() { 
        return html`` 
    }

    override renderField() {
        const markdown = this.value == null ? '' : md.render(this.value)
        return html`
            <div class="form-group row"> <div>${unsafeHTML(markdown)}</div> </div>
        `
    }

    convertToInput(value: any) {
        return value
    }

    convertToValue(value: any) {
        return (typeof value !== 'string') ? '' : value
    }

}