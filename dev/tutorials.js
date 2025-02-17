// Fonction déclenchée lors du changement d'onglet
function onTabChange(panel) {
    console.log("Onglet actif : " + panel);
    if (panel == "data-tab") data.innerHTML = JSON.stringify(form.data, undefined, 4).replace(/\n/g, '<br>')

    // Vous pouvez insérer ici votre code personnalisé en fonction de l'onglet actif
}

// Ajout d'un écouteur d'événement pour le changement d'onglet
document.querySelectorAll('a[data-bs-toggle="tab"]').forEach(tabLink => {
    tabLink.addEventListener('shown.bs.tab', function (event) {
        // event.target correspond à l'onglet activé
        onTabChange(event.target.id);
    });
});


// const panels = {
//     form: document.getElementById('formPanel'),
//     schema: document.getElementById('schemaPanel'),
//     data: document.getElementById('dataPanel')
// }
let tutodata = {}
const form = document.getElementById('fzform')
const schema = document.getElementById('fzschema')
const data = document.getElementById('fzdata')
const toc = document.getElementById('toc')
const timer = null
const ignoreC = (key, value) => ["parent", "root"].includes(key) ? undefined : value

// function setPanel(panel) {
//     Object.keys(panels).forEach(id => panels[id].style.display = "none");
//     if (panel == "data") data.value = JSON.stringify(form.data, undefined, 4)
//     if (panel == "schema") schema.value = JSON.stringify(form.schema, ignoreC, 4)
//     panels[panel].style.display = "block"
// }


const md = window.markdownit();
md.renderer.rules.table_open = function (tokens, idx) {
    return '<table class="table">';
};

async function markdown(name) {
    // Récupération du contenu du textarea
    defaultText = "Sorry, no description ..."
    const markdownText = await fetch(`./tutos/${name}.md`).then(r => (r.status == 200) ? r.text() : defaultText).catch(() => defaultText)

    // Conversion du Markdown en HTML
    const resultHtml = md.render(markdownText);
    // Affichage du résultat dans la div
    document.getElementById('markdown').innerHTML = resultHtml;
    document.getElementById('name').innerHTML = name;
}

async function init_toc(form) {
    const toc_schema = await fetch(`./toc.json`).then(r => r.json())
    form.schema = toc_schema
    form.data = { query: "" }
}


async function init_options(form) {

    // app enums references
    const enums = {
        PRIMES: [{ value: 2, title: "2" }, { value: 3, title: "Trois" }, { value: 5, title: "Cinq" }]
    }

    // app data read/write API
    let first_name = "Guillaume"
    let last_name = "Tell"
    let job = "Archer"

    // app document storage API
    const documents = new Map
    const minion = await fetch(`./minion.png`).then(r => r.blob())
    const bad = await fetch(`./bad.png`).then(r => r.blob())
    const agnes = await fetch(`./agnes.png`).then(r => r.blob())
    // add prexisting documents
    documents.set("59cbefd0-6300-11ec-b87d-af00ce201501", { filename: "minion.png", blob: minion, pointer: "/document" })
    documents.set("8724dd60-6301-11ec-9cc0-3783f1582eaa", { filename: "bad.png", blob: bad, pointer: "/documents/0" })
    documents.set("59cbefd0-6300-11ec-b87d-af00ce201999", { filename: "agnes.png", blob: agnes, pointer: "/documents/1" })

    form.options = {
        ref: (enumName) => {
            return enums[enumName] ?? []
        },
        userdata: {
            profil: {
                get first_name() { return first_name },
                set first_name(value) {
                    first_name = value
                    console.log(`first_name updated : ${first_name}`)
                },
                get last_name() { return last_name },
                set last_name(value) {
                    last_name = value
                    console.log(`last_name updated : ${last_name}`)
                },
                get job() { return job },
                set job(value) {
                    job = value
                    console.log(`job updated : ${job}`)
                }
            }
        },
        storage: {
            put: (uuid, blob, filename, pointer) => { documents.set(uuid, { blob, filename, pointer }) },
            remove: (uuid) => { documents.delete(uuid) },
            get: (uuid) => { return documents.get(uuid) }
        }
    }

}
const goto = async (name) => {
    const subject = name ?? "basic"
    if (subject) {
        tutodata = await fetch(`./tutos/${subject}.json`).then(r => r.json())
        await init_options(form)
        await init_toc(toc)
        form.schema = tutodata.form
        form.data = tutodata.data
        if (timer) clearInterval(timer)
        schema.innerHTML = JSON.stringify(tutodata.form, ignoreC, 4).replace(/\n/g, '<br>')
        form.addEventListener('update', () => {
            data.innerHTML = JSON.stringify(form.data, undefined, 4).replace(/\n/g, '<br>')
        })
        markdown(subject)
    }
}

window.addEventListener('load', () => goto("basic"))
