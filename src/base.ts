import { css, CSSResult, html, LitElement, PropertyValues } from 'lit';
import { isString } from './lib/tools';


const BOOTSTRAP_URL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
const ICONS_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
const WOFF_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/fonts/bootstrap-icons.woff2?1fa40e8900654d2863d011707b9fb6f2"


type HandlerItem = { target: EventTarget, event: string, handler: (evt: Event) => void }
export class Base extends LitElement {

    private static loaded = false
    private static sheets: CSSStyleSheet[] = []

    static override styles: CSSResult[] = [
        css`:host {
                font-family: Arial, sans-serif;
            }
            .space-before {
                padding-top:10px; 
            }
            .space-after {
                padding-bottom:5px
            }
            .line-after {
                border-bottom: 1px solid gray;
            }
            .line-before {
                border-top: 1px solid gray;
            }
            .invalid {
                border: 1px solid rgba(220,53,69) !important;
            }
            .invalid:focus, input:out-of-range:focus {
                box-shadow:0 0 0 .25rem rgba(220,53,69,.25);
                border: 1px solid red !important;
            }
            .valid {
                border: 1px solid rgba(25,135,84) !important;
            }
            .valid:focus {
                box-shadow:0 0 0 .25rem rgba(25,135,84,.25) !important;
                border: 1px solid green !important;
            }
            .error-message {
                margin:0;
                text-align: right;
                font-size:small;
                font-style: italic;
                color: rgba(220,53,69);
                float: right;
            }
            .error-truncated {
                white-space: nowrap;
                overflow:hidden !important;
                text-overflow: ellipsis;
            }
            /* Apply the thin scrollbar */
            .scrollable-div::-webkit-scrollbar {
                width: 4px;
            }

            .scrollable-div::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
            }
        `]

    private handlers: HandlerItem[] = []

    badge(value:number|string) {
        return html`<span class="badge bg-primary badge-pill">${value}</span>`
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        this.adoptBootStrap()
        super.firstUpdated(_changedProperties)
    }

    public listen(target: EventTarget, event: string, handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean) {
        const i = this.handlers.findIndex(item => item.target === target && item.event === event && item.handler === handler)
        if (i < 0) {
            this.handlers.push({ target, event, handler })
            target.addEventListener(event, handler, options)
        }
    }
    public unlisten(target: EventTarget, event: string, handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean) {
        const i = this.handlers.findIndex(item => item.target === target && item.event === event && item.handler === handler)
        if (i >= 0) {
            this.handlers.splice(i, 1)
            target.removeEventListener(event, handler, options)
        }
    }

    override connectedCallback() {
        super.connectedCallback()
    }

    override disconnectedCallback() {
        super.disconnectedCallback()
        for (const item of this.handlers) {
            item.target.removeEventListener(item.event, item.handler)
        }
        this.handlers = []
    }

    /**
     * preventDefault and stopPropagation on event (helper)
     */
    eventStop(event?: Event): void {
        if (!event) return
        event.preventDefault()
        event.stopPropagation()
    }


    // ------------------------------------------------------------------
    // user API to load external Bootstrap and Bootstap Icons (mandatory)
    // ------------------------------------------------------------------

    static async loadBootstrap(
        bootstrap_url: CSSStyleSheet | string = BOOTSTRAP_URL,
        icons_url: CSSStyleSheet | string = ICONS_URL,
        woff_url: FontFace | string = WOFF_URL
    ): Promise<void> {

        if (Base.isBootStrapLoaded()) return;

        const logger = FzLogger.get("lazy")
        logger.info(">>> loadBootstrap()")

        let bootstrap_sheet: CSSStyleSheet
        if (isString(bootstrap_url)) {
            logger.info("Bootstrap CSS to be load from url: %s ", bootstrap_url)
            const bootstrapcss_text = await fetch(bootstrap_url)
                .then(resp => resp.ok ? resp.text() : (console.error(`unable to load bootstrap css: ${String(resp.statusText)}`), ""))
                .catch(e => (console.error(`unable to load boootstrap css: ${String(e)}`), ''))
            bootstrap_sheet = new CSSStyleSheet()
            bootstrap_sheet.replaceSync(bootstrapcss_text.replaceAll(':root', ':host, :root'))
            logger.info("Bootstrap CSS loaded")
        } else {
            logger.info("Bootstrap CSS provided by user")
            bootstrap_sheet = bootstrap_url
        }

        let icons_sheet: CSSStyleSheet
        if (isString(icons_url)) {
            logger.info("Bootstrap icons CSS to be load from url: %s ", bootstrap_url)
            const iconscss_text = await fetch(icons_url)
                .then(resp => resp.ok ? resp.text() : (console.error(`unable to load boootstrap css: ${String(resp.statusText)}`), ""))
                .catch(e => (console.error(`unable to load icons css: ${String(e)}`), ''))
            icons_sheet = new CSSStyleSheet()
            icons_sheet.replaceSync(iconscss_text.replaceAll(':root', ':host, :root'))
            logger.info("Bootstrap icons CSS loaded")
        } else {
            logger.info("Bootstrap icons CSS provided by user")
            icons_sheet = icons_url
        }

        let font_face: FontFace
        if (isString(woff_url)) {
            logger.info("Bootstrap icons fonts to be load from url: %s ", bootstrap_url)
            font_face = new FontFace("bootstrap-icons", `url("${woff_url}")`)
        } else {
            logger.info("Bootstrap icons fonts provided by user")
            font_face = woff_url
        }

        const loaded = await font_face.load()
        document.fonts.add(loaded)

        logger.info("Bootstrap fonts loaded")
        Base.sheets = [bootstrap_sheet, icons_sheet]


        //await new Promise((resolve,_) => setTimeout(() => resolve(null),10000))
        Base.loaded = true

        // bootstrap loading is async FzForm already inserted in dom must adopt and refresh
        for (const item of document.getElementsByTagName("fz-form") as HTMLCollectionOf<Base>) {
            logger.info("Adopting bootstrap to fz-form Element")
            item.adoptBootStrap()
        }
        
        logger.info("<<< loadBootstrap()")

    }
    static isBootStrapLoaded() {
        return Base.loaded
    }
    /**
     * called in firstUpdated to adopt Bootstrap style
     * called also in all FzForm element found in document because loading may
     * arrive later due to async 
     */
    adoptBootStrap() {
        Base.sheets
            .filter(sheet => !this.shadowRoot?.adoptedStyleSheets.includes(sheet))
            .forEach(sheet => this.shadowRoot?.adoptedStyleSheets.push(sheet))
        this.requestUpdate()
    }

    /**
     * find in the ancestors of an element a webcomponent matching a given selector
     *  IMPORTANT: traverse Shadow DOM 
     * @param selector selector to matching the searched element
     * @param el element from which to start searching  
     * @returns Element corresponding to selector, null otherwise
     */

    queryClosest<T>(selector: string,item: Element = this): T | null {
        if (item instanceof Element) {
            const elem = item.assignedSlot ?? item
            const found = elem.closest(selector) as T | null
            const parent = (elem.getRootNode() as ShadowRoot).host
            return found ??  this.queryClosest<T>(selector, parent);
        }
        return null
    }

}
