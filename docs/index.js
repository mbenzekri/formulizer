"use strict"

const defaultTuto = {
    "form": {
        "type": "object",
        "title": "",
        "properties": {
            "field": {"const": "No demo for this chapter", title:""}
        }
    },
    "data": {}
}

let tutodata = {}
const form = document.getElementById('fzform')
const schema = document.getElementById('fzschema')
const data = document.getElementById('fzdata')
const toc = document.getElementById('toc')
const timer = null
const ignoreProperties = (key, value) => ["parent", "root"].includes(key) ? undefined : value
const loadAsset = async (name) => fetch(`./assets/${name}`).then(r => r.ok ? r.blob() : null)

// add the handler on each tab change
document.querySelectorAll('a[data-bs-toggle="tab"]').forEach(tabLink => {
    tabLink.addEventListener('shown.bs.tab', function () {
        // event.target correspond to activated tab
        updateHandler()
    });
});

async function options(form) {

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

    const userdata = {
        first_name: "Guillaume",
        last_name: "Tell",
        job: "Archer",
        email: "gtell@target.sw",
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

    return { userdata, storage }
}

// handler to update event
const updateHandler = () =>  {
    //console.log("handling event `update`")
    data.innerHTML = JSON.stringify(form.data, undefined, 4)?.replace(/\n/g, '<br>')
}

// handler to enum event
const enumHandler = (evt) =>  {
    console.log("handling event `enum`")
    switch (evt.detail.name) {
        case "PRIMES": return evt.detail.success(PRIMES);
        case "HEROES": return evt.detail.success(HEROES);
        default: return evt.detail.success([]);
    }
}

// function to load and render provided name example
const goto = async (name) => {
    //await FzLogger.set("DEBUG","validation","tracker","compilation","input","data-update")
    const hash = window.location.hash == "" ? null : window.location.hash.substring(1) 
    const subject = name ?? hash ??  "general/whatis" 
    if (subject) {
        tutodata = await fetch(`./examples/${subject}.doc.json`).then(r => r.ok ? r.json() : defaultTuto).catch(() => defaultTuto)
        if (tutodata) {
            await init_toc(toc)
            renderToc()
            form.options =  options(form)
            form.schema = tutodata.form
            form.data = tutodata.data
            if (timer) clearInterval(timer)
            schema.innerHTML = JSON.stringify(tutodata.form, ignoreProperties, 4).replace(/\n/g, '<br>')
            data.innerHTML = JSON.stringify(form.data, undefined, 4)?.replace(/\n/g, '<br>')
            form.addEventListener('update', updateHandler )
            form.addEventListener('enum', enumHandler )
            updateHandler()
        }
        markdown(subject)
    }
}
// goto general page example (hello world)
window.addEventListener('load',_ => goto())
window.addEventListener('hashchange',_ => goto());


