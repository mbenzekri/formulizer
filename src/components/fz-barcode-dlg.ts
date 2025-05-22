import { html, css } from "lit"
import { customElement, query, state } from "lit/decorators.js"
import { FzDialog } from "./dialog"

enum ModalState { notready = 0, scanning, done, fail }

declare global {
    let BarcodeDetector: any
}
const Barcodes = [ 
    'code_128', 'code_39', 'code_93', 'codabar', 'ean_13', 'ean_8', 
    'itf', 'pdf417', 'upc_a', 'upc_e', 'aztec', 'data_matrix', 'qr_code' 
]

export class FzBarcodeDlgCloseEvent extends CustomEvent<{ dialog: FzBarcodeDlg, canceled: boolean, code?: string}> {
    constructor(dialog: FzBarcodeDlg, canceled: boolean, code?: string) {
        super('fz-dlg-barcode-close', { detail: { dialog, canceled, code } })
    }
}

export interface EventMap {
    'fz-dlg-barcode-close': FzBarcodeDlgCloseEvent
}

@customElement("fz-dlg-barcode")
export class FzBarcodeDlg extends FzDialog {
    @state()
    private accessor state: ModalState = ModalState.notready
    private detector?: any
    private code?: string
    @query("video")
    private video?: HTMLVideoElement | null
    private status = "Initializing"

    static override get styles() {
        return [
            ...super.styles,
            css`
            div {
                color: black
            }
            `]
    }

    override renderDialog() {
        return html`
            <div class="row">
                <video  class=col autoplay style="display:block" .title="${this.status}">Loading ...</video>
            </div>
            <div class="btn-toolbar m-3 row" role="toolbar">
                <button class="btn btn-primary col m-1" ?disabled="${!this.code}" @click="${this.scan}"><i class="bi bi-upc-scan"></i></button>
            </div>
            <div>${this.status}</div>
        `
    }

    override closed(canceled: boolean) {
        if (this.video) {
            this.video?.pause()
            this.video.srcObject = null
        }
        const code = this.code
        this.dispatchEvent(new FzBarcodeDlgCloseEvent(this, canceled, code))
    }

    override firstUpdated() {
        // create new detector
        if (BarcodeDetector) {
            this.detector = new BarcodeDetector({ formats: Barcodes });
        }
        this.video = this.shadowRoot?.querySelector('video')
        if (this.video)  this.listen(this.video, "play", _ => this.scan())
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

    override async init() {
        this.setState(ModalState.notready)
        await this.initCamera()
    }

    setState(state: ModalState) {
        this.state = state
        this.valid = false
        switch (state) {
            case ModalState.fail:
                this.status = `${this.state} ⇨ No video stream`
                break
            case ModalState.notready:
                this.status = `${this.state} ⇨ Initializing`
                break
            case ModalState.scanning:
                this.status = `${this.state} ⇨ Scan`
                break
            case ModalState.done:
                this.status = `${this.state} ⇨ Result: ${this.code}`
                this.valid = true
                break
        }
        console.log(this.status)
    }
}