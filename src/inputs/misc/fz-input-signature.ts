/* eslint-disable @typescript-eslint/no-explicit-any */
import { property, customElement } from "lit/decorators.js"
import { html, css } from "lit"
import { notNull } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";

declare class ResizeObserver {
    constructor(cb: (entries: any) => void)
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 */
@customElement("fz-signature")
export class FzInputSignature extends FzInputBase {

    @property({ attribute: false }) public accessor disabled = false
    @property({ attribute: false }) accessor state: 'valid' | 'edit' | 'read' = 'read'

    private get isblank(): any {
        if (!this.canvasContext || !this.canvas) return false
        const pixelBuffer = new Uint32Array(
          this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height).data.buffer
        )
        let white = 0,black = 0
        pixelBuffer.forEach(color => color !== 0 ? black++ : white++ );
        const percent = black * 100 / (black + white)
        return (percent < 0.5 )
    }

    private content?: HTMLElement
    private image?: HTMLImageElement
    private canvas?: HTMLCanvasElement
    private canvasContext?: CanvasRenderingContext2D
    private observer?: ResizeObserver
    private currentX = 0
    private currentY = 0
    private drawing = false

    override toField(): void {
        if (notNull(this.input)) {
            this.input.value = String(this.value ?? "")
        }
    }
    override toValue(): void {
        if (notNull(this.input)) {
            this.value = notNull(this.input.value) ? this.input.value : undefined
        }
    }

    static override get styles() {
        return [
            ...super.styles,
            css`
            img {
                border: 0;
                max-width: 150px;
                max-height: 50px;
            }
            .readonly {background-color: rgb(235,235,228)}
            canvas {
                max-width: 300px;
                max-height: 150px;
            }
            `
        ]
    }

    renderInput() {
        return html`
            <div class="input-group ${this.validation}">
                <div class="btn-group">
                    <button 
                        type="button"
                        ?hidden="${this.state !== 'read' || this.readonly}" 
                        @click="${this.edit}"
                        aria-label="Sign"
                        class="btn btn-primary btn-sm"
                    >
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button 
                        type="button"
                        ?hidden="${this.state === 'read'|| this.readonly}" 
                        ?disabled="${this.isblank}" 
                        @click="${this.lock}"
                        aria-label="Validate"
                        class="btn btn-primary btn-sm"
                    >
                        <i class="bi bi-check-lg"></i>
                    </button>
                </div>
                <div id="content" class="form-control ${this.validation}" >
                    <canvas id="canvas" ?hidden="${this.state === 'read'}" height="300" width="300" ></canvas>
                    <img   id="image" draggable=false ?hidden="${!this.value || this.state !== 'read'}">
                    <div id="nosign" ?hidden="${this.value || this.state !== 'read' }" >No signature</div>
                </div>
                <div class="btn-group">
                    <button 
                        type="button"
                        ?hidden="${this.value != null || this.readonly}" 
                        @click="${this.del}"
                        aria-label="delete"
                        class="btn btn-sm"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            `
    }
    
    override firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties)
        this.canvas = this.shadowRoot?.getElementById('canvas')as HTMLCanvasElement ?? undefined
        // Gestion des événements
        if (this.canvas) {
            this.canvasContext = this.canvas.getContext('2d') ?? undefined
            this.listen(this.canvas,'pointerdown', evt => this.onDown(evt as PointerEvent))
            this.listen(this.canvas,'pointermove', evt => this.onMove(evt as PointerEvent))
            this.listen(this.canvas,'pointerup', evt => this.onUp(evt as PointerEvent))
            this.listen(this.canvas,'pointerleave', evt => this.onUp(evt as PointerEvent))
        }
        this.content = this.shadowRoot?.getElementById('content') ?? undefined
        if (this.content) {
            this.observer = new ResizeObserver(_entries => this.resize())
            this.observer.observe(this.content);
        }
        this.image = this.shadowRoot?.getElementById('image')as HTMLImageElement ?? undefined
        this.load()
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()
        this.content = undefined as any
        this.image = undefined as any
        this.canvas = undefined as any
        this.canvasContext = undefined as any
        this.observer?.disconnect()
        this.observer = undefined as any

    }

      
    private resize() {
        if (this.content) {
            let width = this.content.offsetWidth
            let height = Math.floor(this.content.offsetWidth / 2)
            if ( this.canvas && this.state === 'read' && 
                (this.canvas.width !== width || this.canvas.height !== height)) 
            {
                this.canvas.width = width
                this.canvas.height = height
            }
            if ( this.image && this.state === 'read' && 
                (this.image.width !== width || this.image.height !== height)) 
            {
                this.image.width = width
                this.image.height = height
            }
        }
    }

    // private getPos(event: any) {
    //     if (isNull(this.canvas)) return
    //     const rect = this.canvas.getBoundingClientRect();
    //     let clientX: number, clientY: number;
    //     if (event instanceof TouchEvent) {
    //       clientX = event.touches[0].clientX;
    //       clientY = event.touches[0].clientY;
    //     } else {
    //       clientX = event.clientX;
    //       clientY = event.clientY;
    //     }
    //     this.currentX = (clientX - rect.left) * (this.canvas.width / rect.width);
    //     this.currentY = (clientY - rect.top) * (this.canvas.height / rect.height);
    // }
    private getPos(event: PointerEvent) {
        if (!this.canvas) return;
      
        // offsetX/Y are relative to the canvas element in CSS pixels
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
      
        // scale to internal canvas resolution
        const scaleX = this.canvas.width  / this.canvas.clientWidth;
        const scaleY = this.canvas.height / this.canvas.clientHeight;
      
        this.currentX = offsetX * scaleX;
        this.currentY = offsetY * scaleY;
      }
    
    private onDown(event: PointerEvent) {
        this.drawing = !this.readonly
        this.getPos(event);

        // start a new line
        if (this.canvasContext && this.currentX) {
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(this.currentX, this.currentY);
            this.canvasContext.strokeStyle = "#4bf";
            this.canvasContext.lineWidth = 5;
            this.canvasContext.lineJoin = 'round';
        }

        this.eventStop(event)
    }
    private onMove(event: PointerEvent) {
        if (!this.drawing) return
        this.getPos(event)
        if (this.canvasContext) {
            this.canvasContext.lineTo(this.currentX, this.currentY);
            this.canvasContext.stroke();
        }
        this.eventStop(event)
    }
    private onUp(event: Event) {
        // Stop drawing
        this.drawing = false;
        this.state = !this.isblank ? "valid" : "edit"
        this.eventStop(event)
    }

    private load() {
        if (this.canvasContext && this.image && this.value) {
            this.image.src = this.value
        }
    }

    private edit() {
        this.canvas && this.canvasContext?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.value = null
        this.state = 'edit'
    }
    private lock() {
        this.save()
        this.state = 'read'
    }
      
    private save() {
        if (this.canvas) {
            const dataurl = this.canvas.toDataURL("image/gif")
            this.value = dataurl
            if (this.image) this.image.src = dataurl
            this.change()
        }
    }
    private clear() {
        if (this.canvas) this.canvas.width = (this.canvas.width as any);
        this.value= undefined;
        this.requestUpdate()
    }
    private del() {
        this.clear()
        this.state = 'read'
    }

}