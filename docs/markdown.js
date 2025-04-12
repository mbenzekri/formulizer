// initialize markdown-it for documentation TOC
const md = new window.markdownit({
    html: true,                // Enable HTML tags in source
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

function patchAttr(md, tagname, attrname, content) {


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

function patchImg(md, width, height) {

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


async function markdown(name) {
    // Get description markdown
    const defaultText = "Sorry, no description ..."
    const markdownText = await fetch(`./examples/${name}.md`).then(r => r.ok ? r.text() : defaultText).catch(() => defaultText)
    const markdownHTML = md.render(markdownText)
    // render the html into the div
    document.getElementById('markdown').innerHTML = markdownHTML;
    document.getElementById('name').innerHTML = name;
    // solve <pre> example extraction code 
    for (const elem of document.querySelectorAll('pre[onclick]')) {
        elem.click()
    }
}