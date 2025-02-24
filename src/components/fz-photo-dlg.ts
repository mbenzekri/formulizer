import { html, css } from "lit"
import { customElement,state } from "lit/decorators.js"
import { FzDialog } from "./dialog"
import { Base } from "../base"

enum PhotoState { notready = 0, video, lowres, hires }

declare global {
    let ImageCapture: any
}
@customElement("fz-photo-dlg")
export class FzPhotoDlg extends Base {
    @state()
    private accessor state: PhotoState = PhotoState.video
    private modal?: FzDialog | null
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
    override render() {
        return html`
            <fz-dialog modal-title="Prendre une photo ..." @click="${this.stopEvent}" @close="${this.close}" > 
                <div class="row">
                    <video  class=col autoplay style="display:block" .title="${this.status}">Chargement en cours ...</video>
                </div>
                <div class="row">
                    <canvas class=col id='canvas' style="display:none" ></canvas>
                </div>
                <div class="btn-toolbar m-3 row" role="toolbar">
                        <button class="btn btn-primary col m-1" ?disabled="${this.isVideo}" @click="${this.retry}"><i class="bi bi-arrow-counterclockwise"></i></button>
                        <button class="btn btn-primary col m-1" ?disabled="${!this.isVideo}" @click="${this.takePhotoLowres}"><i class="bi bi-camera"></i><sup> - </sup></button>
                        <button class="btn btn-primary col m-1" ?disabled="${!this.isVideo}" @click="${this.takePhotoHires}"><i class="bi bi-camera"></i><sup> + </sup></button>
               </div>
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
            this.imageCapture?.track.stop()
        }
        const detail = evt.detail
        this.canvas?.toBlob((blob: Blob | null) => {
            if (!blob) return
            const url = URL.createObjectURL(blob)
            if (!evt.detail.dismissed) {
                evt.detail.imageBitmap = this.imageBitmap
                evt.detail.url = url
                evt.detail.blob = blob
            }
            this.dispatchEvent(new CustomEvent("close", { detail }))
            this.imageBitmap = undefined
            this.modal?.valid(false)
        }, "image/png", 0.80)
    }

    override firstUpdated() {
        this.modal = this.shadowRoot?.querySelector('fz-dialog')
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
        evt.preventDefault()
        evt.stopPropagation()
        this.imageBitmap = undefined
        this.modal?.valid(false)
        this.setState(PhotoState.video)
    }
    private takePhotoLowres(evt: Event) {
        evt.preventDefault()
        evt.stopPropagation()
        if (this.imageCapture) {
            this.imageCapture.grabFrame()
                .then((imageBitmap: any) => {
                    this.imageBitmap = imageBitmap
                    this.modal?.valid(true)
                    this.drawCanvas()
                    this.setState(PhotoState.lowres)
                })
                .catch((error: any) => this.status = `Unable to grab Lowres photo : ${String(error)}`)
        }
    }

    private takePhotoHires(evt: Event) {
        evt.preventDefault()
        evt.stopPropagation()
        if (this.imageCapture) {
            this.imageCapture.takePhoto()
                .then((blob: ImageBitmapSource) => createImageBitmap(blob))
                .then((imageBitmap: ImageBitmap) => {
                    this.imageBitmap = imageBitmap
                    this.modal?.valid(true)
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

    open() {
        this.setState(PhotoState.notready)
        if (this.modal) this.modal.open()
        this.getUserMedia()
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