"use strict"
// handler when selecting tab 
function onTabChange(panel) {
    if (panel == "data-tab") data.innerHTML = JSON.stringify(form.data, undefined, 4).replace(/\n/g, '<br>')
}

// add the handler on each tab
document.querySelectorAll('a[data-bs-toggle="tab"]').forEach(tabLink => {
    tabLink.addEventListener('shown.bs.tab', function (event) {
        // event.target correspond à l'onglet activé
        onTabChange(event.target.id);
    });
});

let tutodata = {}
const form = document.getElementById('fzform')
const schema = document.getElementById('fzschema')
const data = document.getElementById('fzdata')
const toc = document.getElementById('toc')
const timer = null
const ignoreProperties = (key, value) => ["parent", "root"].includes(key) ? undefined : value
const loadAsset = async (name) => fetch(`./assets/${name}`).then(r => r.ok ? r.blob() : null)


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
}

async function init_toc(form) {
    // initialize table of content
    const toc_schema = await fetch(`./toc.json`).then(r => r.json())
    const sections = toc_schema.definitions.toc
    const enumToc = []
    for (const section in sections) {
        for (const chapter in sections[section]) {
            const title = sections[section][chapter]
            enumToc.push({value: chapter ,title: `${section} - ${title}`})
        }
    }
    form.options={ ref:() => enumToc }
    form.schema = toc_schema
    form.data = { query: "" }
    renderToc(sections)
}


async function init_options(form) {

    // Application defined enumerations
    const PRIMES = [
        { value: 2, title: "two" },
        { value: 3, title: "three" },
        { value: 5, title: "five" },
        { value: 7, title: "seven" },
        { value: 11, title: "eleven" }
    ];
    const HEROES = [
        { value: "Iron Man", title: "Tony Stark" },
        { value: "Black Widow", title: "Natacha Romanov" },
        { value: "Captain America", title: "Steve Rogers" }
    ];
    // function to return a given application enum list 
    // by its name
    const ref = (enumName) => {
        switch (enumName) {
            case "PRIMES": return PRIMES;
            case "HEROES": return HEROES;
            default: return [];
        }
    }

    const userdata = {
        first_name: "Guillaume",
        last_name: "Tell",
        job: "Archer",
    }

    // Application defined document storage
    const storage = {
        // preexisting documents already presen in storage
        docs: new Map([
            ["59cbefd0-6300-11ec-b87d-af00ce201501", { filename: "minion.png", blob: await loadAsset("minion.png"), pointer: "/document" }],
            ["8724dd60-6301-11ec-9cc0-3783f1582eaa", { filename: "bad.png", blob: await loadAsset("bad.png"), pointer: "/documents/0" }],
            ["59cbefd0-6300-11ec-b87d-af00ce201999", { filename: "agnes.png", blob: await loadAsset("agnes.png"), pointer: "/documents/1" }]
        ]),
        // fz-form needed API to get,store,delete Application documents
        put(uuid, blob, filename, pointer) {
            return this.docs.set(uuid, { blob, filename, pointer })
        },
        remove(uuid) {
            return this.docs.delete(uuid)
        },
        get(uuid) {
            return this.docs.get(uuid)
        },
    };

    form.options = { ref, userdata, storage }
}

const defaultTuto = {
    "form": {
        "type": "object",
        "properties": {
            "field": {
                "type": "string",
                "markdown": ["No demo for this chapter"]
            }
        }
    },
    "data": {}
}

const goto = async (name) => {
    const subject = name ?? "basic"
    if (subject) {
        tutodata = await fetch(`./examples/${subject}.json`).then(r => r.ok ? r.json() : defaultTuto).catch(() => defaultTuto)
        if (tutodata) {
            await init_toc(toc)
            renderToc()
            await init_options(form)
            form.schema = tutodata.form
            form.data = tutodata.data
            if (timer) clearInterval(timer)
            schema.innerHTML = JSON.stringify(tutodata.form, ignoreProperties, 4).replace(/\n/g, '<br>')
            form.addEventListener('update', () => {
                data.innerHTML = JSON.stringify(form.data, undefined, 4).replace(/\n/g, '<br>')
            })
        }
        markdown(subject)
    }
}

let done = false
function renderToc(tocSections) {
    if (done) return
    done = true
    const toc = document.getElementById('longtoc')
    const htmlSections = []
    for (const section in tocSections) {
        const htmlChapters = []
        for (const chapter in tocSections[section]) {
            const title = tocSections[section][chapter]
            const line = `<li class="chapter nav-item"><a class="nav-link" onclick="goto('${chapter}')">${title}</a></li>`
            htmlChapters.push(line)
        }
        const htmlSection = `
            <li class="nav-item">
                <div class="section nav-link">${section}</div>
                <ul class="nav flex-column ps-3">
                    ${ htmlChapters.join('\n')}
                </ul>
            </li>
        `
        toc.insertAdjacentHTML("beforeend", htmlSection);
    }
}

window.addEventListener('load', () => goto("README"))

