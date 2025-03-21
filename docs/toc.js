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
    form.options={ }
    form.schema = toc_schema
    form.data = { query: "" }
    form.addEventListener('enum', (e) => setTimeout(() => e.detail.success(enumToc) ),9000)
    renderToc(sections)
}

