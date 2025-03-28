import { css, CSSResult, LitElement, PropertyValues } from 'lit';
import { isString } from './lib/tools';


const BOOTSTRAP_URL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
const ICONS_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
const WOFF_URL = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/fonts/bootstrap-icons.woff2?1fa40e8900654d2863d011707b9fb6f2"


type HandlerItem = { target: EventTarget, event: string, handler: (evt: Event) => void }
export class Base extends LitElement {

    private handlers: HandlerItem[] = []
    static sheets: CSSStyleSheet[] = []

    static override styles: CSSResult[] = [
        css`body {
                font-family: 'Arial', sans-serif !important;
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
    `]

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

    // ------------------------------------------------------------------
    // user API to load external Bootstrap and Bootstap Icons (mandatory)
    // ------------------------------------------------------------------

    static async registerBootstrap(
        bootstrap_url: CSSStyleSheet | string = BOOTSTRAP_URL,
        icons_url: CSSStyleSheet | string = ICONS_URL,
        woff_url: FontFace | string = WOFF_URL
    ): Promise<void> {

        const logger = FzLogger.get("bootstrap")
        logger.info("IN:registerBootstrap()")

        let bootstrap_sheet: CSSStyleSheet
        if (isString(bootstrap_url)) {
            logger.info("Bootstrap CSS to be load from url: %s ", bootstrap_url)
            const bootstrapcss_text = await fetch(bootstrap_url)
                .then(resp => resp.ok ? resp.text() : (console.error(`unable to load boootstrap css: ${String(resp.statusText)}`), ""))
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
        logger.info("OUT:registerBootstrap()")

    }
    static isBootStrapLoaded() {
        return Base.sheets.length > 0
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
    }
}
