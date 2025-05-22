import { html, css, PropertyValues } from "lit"
import { customElement,state } from "lit/decorators.js"
import { FzDialog } from "./dialog"

enum PhotoState { notready = 0, video, lowres, hires }

export class FzPhotoDlgCloseEvent extends CustomEvent<{dialog: FzPhotoDlg, canceled: boolean, imageBitmap?: ImageBitmap, url?: string, blob?: Blob }> {
    constructor(dialog: FzPhotoDlg,canceled: boolean,imageBitmap?:ImageBitmap,url?:string, blob?: Blob) {
        super('fz-dlg-photo-close', { detail: { dialog, canceled, imageBitmap, url, blob} })
    }
}

export interface EventMap {
    'fz-dlg-photo-close': FzPhotoDlgCloseEvent
}

declare global {
    let ImageCapture: any
}
@customElement("fz-dlg-photo")
export class FzPhotoDlg extends FzDialog {
    @state()
    private accessor state: PhotoState = PhotoState.video
    private video?: HTMLVideoElement | null
    private canvas?: HTMLCanvasElement | null
    private imageCapture?: any
    private imageBitmap?: ImageBitmap
    private status = "Initializing"
    private get isVideo() { return this.state === PhotoState.video }
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
            <div class="row">
                <canvas class=col id='canvas' style="display:none" ></canvas>
            </div>
            <div class="btn-toolbar m-3 row" role="toolbar">
                    <button class="btn btn-primary col m-1" ?disabled="${this.isVideo}" @click="${this.retry}"><i class="bi bi-arrow-counterclockwise"></i></button>
                    <button class="btn btn-primary col m-1" ?disabled="${!this.isVideo}" @click="${this.snapLowres}"><i class="bi bi-camera"></i><sup> - </sup></button>
                    <button class="btn btn-primary col m-1" ?disabled="${!this.isVideo}" @click="${this.snapHires}"><i class="bi bi-camera"></i><sup> + </sup></button>
            </div>
        `
    }

    override init() {
        this.setState(PhotoState.notready)
        this.getUserMedia()
    }

    override closed(canceled: boolean) {
        if (this.video) {
            this.video?.pause()
            this.video.srcObject = null
            this.imageCapture?.track.stop()
        }
        if (canceled) {
            this.dispatchEvent(new FzPhotoDlgCloseEvent(this, canceled))
        } else {
            this.canvas?.toBlob((blob: Blob | null) => {
                const url = blob ? URL.createObjectURL(blob) : undefined
                this.dispatchEvent(new FzPhotoDlgCloseEvent(this, canceled,this.imageBitmap,url, blob?? undefined))
                this.imageBitmap = undefined
            }, "image/png", 0.80)
        }
    }

    override firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties)
        this.video = this.shadowRoot?.querySelector('video')
        this.canvas = this.shadowRoot?.querySelector('canvas')
    }

    private getUserMedia() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(mediaStream => {
                if (this.video) {
                    this.video.srcObject = mediaStream
                    const track = mediaStream.getVideoTracks()[0]
                    this.imageCapture = new ImageCapture(track)
                    this.setState(PhotoState.video)
                }
            })
            .catch(error => this.status = `Unable to initialize Camera : ${String(error)}`)
    }

    private retry(evt: Event) {
        this.eventStop(evt)
        this.imageBitmap = undefined
        this.valid = false
        this.setState(PhotoState.video)
    }
    private snapLowres(evt: Event) {
        this.eventStop(evt)
        if (this.imageCapture) {
            this.imageCapture.grabFrame()
                .then((imageBitmap: any) => {
                    this.imageBitmap = imageBitmap
                    this.valid = true
                    this.drawCanvas()
                    this.setState(PhotoState.lowres)
                })
                .catch((error: any) => this.status = `Unable to grab Lowres photo : ${String(error)}`)
        }
    }

    private snapHires(evt: Event) {
        this.eventStop(evt)
        if (this.imageCapture) {
            this.imageCapture.takePhoto()
                .then((blob: ImageBitmapSource) => createImageBitmap(blob))
                .then((imageBitmap: ImageBitmap) => {
                    this.imageBitmap = imageBitmap
                    this.valid = true
                    this.drawCanvas()
                    this.setState(PhotoState.hires)
                })
                .catch((error: any) => this.status = `Unable to grab Hires photo : ${String(error)}`)
        }
    }

    private drawCanvas() {
        if (!this.canvas || !this.video || !this.imageBitmap) return
        this.canvas.width = this.video.offsetWidth
        this.canvas.height = this.video.offsetHeight
        const ratio = Math.min(this.canvas.width / this.imageBitmap.width, this.canvas.height / this.imageBitmap.height)
        const x = (this.canvas.width - this.imageBitmap.width * ratio) / 2
        const y = (this.canvas.height - this.imageBitmap.height * ratio) / 2
        this.canvas.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.getContext('2d')?.drawImage(this.imageBitmap, 0, 0, this.imageBitmap.width, this.imageBitmap.height, x, y, this.imageBitmap.width * ratio, this.imageBitmap.height * ratio)
    }

    setState(state: PhotoState) {
        if (this.video && this.canvas) {
            switch (state) {
                case PhotoState.notready:
                    this.video.style.display = 'block'
                    this.canvas.style.display = 'none'
                    this.status = 'NOTREADY'
                    break
                case PhotoState.video:
                    this.video.style.display = 'block'
                    this.canvas.style.display = 'none'
                    this.status = 'VIDEO'
                    break
                case PhotoState.lowres:
                    this.video.style.display = 'none'
                    this.canvas.style.display = 'block'
                    this.status = `IMAGE LOWRES : ${this.imageBitmap?.width} x ${this.imageBitmap?.height} px`
                    break

                case PhotoState.hires:
                    this.video.style.display = 'none'
                    this.canvas.style.display = 'block'
                    this.status = `IMAGE HIRES : ${this.imageBitmap?.width} x ${this.imageBitmap?.height} px`
                    break
            }
        }
        this.state = state
    }
}