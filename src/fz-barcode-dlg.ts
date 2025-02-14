import { html, css, LitElement } from "lit"
import { customElement, state } from "lit/decorators.js"
import { FzDialog } from "./fz-dialog"
import { bootstrapCss } from "./bootstrap"
import { bootstrapIconsCss } from "./bootstrap-icons"

enum ModalState { notready = 0, scanning, done, fail }

declare global {
    let BarcodeDetector: any
}
const Barcodes = [ 
    'code_128', 'code_39', 'code_93', 'codabar', 'ean_13', 'ean_8', 
    'itf', 'pdf417', 'upc_a', 'upc_e', 'aztec', 'data_matrix', 'qr_code' 
]
@customElement("fz-barcode-dlg")
export class FzBarcodeDialog extends LitElement {
    private detector?: any
    private code?: string
    @state()
    private accessor state: ModalState = ModalState.notready
    private modal?: FzDialog | null
    private video?: HTMLVideoElement | null
    private status = "Initializing"

    static override get styles() {
        return [
            bootstrapCss,
            bootstrapIconsCss,
            css`
            div {
                color: black
            }
            `]
    }

    override render() {
        return html`
            <fz-dialog modal-title="Scanner un codebar" @click="${this.stopEvent}" @close="${this.close}" > 
                <div class="row">
                    <video  class=col autoplay style="display:block" .title="${this.status}">Chargement en cours ...</video>
                </div>
                <div class="btn-toolbar m-3 row" role="toolbar">
                    <button class="btn btn-primary col m-1" ?disabled="${!this.code}" @click="${this.scan}"><i class="bi bi-upc-scan"></i></button>
                </div>
                <div>${this.status}</div>
            </fz-dialog>
            `
    }

    stopEvent(evt: Event) {
        evt.preventDefault()
        evt.stopPropagation()
    }

    close(evt: CustomEvent) {
        if (this.video) {
            this.video?.pause()
            this.video.srcObject = null
        }
        const detail = evt.detail
        if (!evt.detail.dismissed) evt.detail.code = this.code
        this.dispatchEvent(new CustomEvent("close", { detail }))
        this.modal?.valid(false)
    }

    override firstUpdated() {
        // create new detector
        if (BarcodeDetector) {
            this.detector = new BarcodeDetector({ formats: Barcodes });
        }
        this.modal = this.shadowRoot?.querySelector('fz-dialog')
        this.video = this.shadowRoot?.querySelector('video')
        this.video?.addEventListener("play", _ => this.scan())
    }

    private async initCamera() {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { exact: "environment" } }
            })
            if (this.video) {
                this.video.srcObject = mediaStream
            }
        } catch(err) {
            this.status = `Unable to initialize Camera : ${String(err)}`
        }
    }

    private scan() {
        this.setState(ModalState.scanning)
        const render = async () => {
            try {
                const barcodes = await this.detector.detect(this.video)
                barcodes.filter((bc:any) => bc.rawValue).forEach((bc:any) => {
                        this.code = bc.rawValue
                        this.setState(ModalState.done)
                })

            } catch(e) {
                console.error(String(e))
            }
        }

        const renderLoop = () => {
            if(this.state !== ModalState.scanning) return
            requestAnimationFrame(renderLoop);
            render()
        }
        renderLoop()
    }

    async open() {
        this.setState(ModalState.notready)
        if (this.modal) this.modal.open()
        await this.initCamera()
    }

    setState(state: ModalState) {
        this.state = state
        this.modal?.valid(false)
        switch (state) {
            case ModalState.fail:
                this.status = `${this.state} ⇨ Pas de flux video`
                break
            case ModalState.notready:
                this.status = `${this.state} ⇨ En initialisation`
                break
            case ModalState.scanning:
                this.status = `${this.state} ⇨ Scannez`
                break
            case ModalState.done:
                this.status = `${this.state} ⇨ Resultat: ${this.code}`
                this.modal?.valid(true)
                break
        }
    }
}