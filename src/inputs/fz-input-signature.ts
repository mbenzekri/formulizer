/* eslint-disable @typescript-eslint/no-explicit-any */
import { property, customElement } from "lit/decorators.js"
import { html, css } from "lit"
import { notNull } from "../lib/tools"
import { FzInputBase } from "./fz-input-base";

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
    @property({ attribute: false }) accessor state: 'edit' | 'read' = 'read'

    private get isblank(): any {
        if (!this.context || !this.canvas) return false
        const pixelBuffer = new Uint32Array(
          this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data.buffer
        )
        let white = 0,black = 0
        pixelBuffer.forEach(color => color !== 0 ? black++ : white++ );
        const percent = black * 100 / (black + white)
        return (percent < 0.5 )
    }

    private content?: HTMLElement
    private image?: HTMLImageElement
    private canvas?: HTMLCanvasElement
    private context?: CanvasRenderingContext2D
    private observer?: ResizeObserver
    private offsetX = 0
    private offsetY = 0
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
            img {border: 0}
            .readonly {background-color: rgb(235,235,228)}
            `
        ]
    }

    renderInput() {
        return html`
            <div id="content" class="form-control ${this.validationMap}">
                <button ?hidden="${!this.value || this.required || this.readonly}" @click="${this.del}" type="button" style="float:right" class="btn-close" aria-label="Close"></button>
                <canvas id="canvas" ?hidden="${this.state === 'read'}" height="300" width="300"></canvas>
                <img   id="image" draggable=false ?hidden="${this.state === 'edit' || !this.value }" >
                <div ?hidden="${!!this.value || this.state === 'edit' }" >Aucune</div>
            </div>
            <div>
                <button ?hidden="${this.readonly}" ?disabled="${this.state !== 'read'}" type="button" class="col-sm-3 btn btn-primary btn-sm" @click="${this.edit}">Signer</button>
                <button ?hidden="${this.state === 'read'}" ?disabled="${this.isblank}" type="button" class="col-sm-3 btn btn-primary btn-sm" @click="${this.validate}">Valider</button>
                <button ?hidden="${this.state === 'read'}" ?disabled="${this.isblank}" type="button" class="col-sm-3 btn btn-primary btn-sm" @click="${this.clear}">Effacer</button>
            </div>`
    }
    
    override firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties)
        this.canvas = this.shadowRoot?.getElementById('canvas')as HTMLCanvasElement ?? undefined
        // Gestion des événements
        if (this.canvas) {
            this.context = this.canvas.getContext('2d') ?? undefined
            this.listen(this.canvas,'mousedown', evt => this.onDown(evt))
            this.listen(this.canvas,'mousemove', evt => this.onMove(evt))
            this.listen(this.canvas,'mouseup', evt => this.onUp(evt))
            this.listen(this.canvas,'touchstart', evt => this.onDown(evt),{passive: false})
            this.listen(this.canvas,'touchmove', evt => this.onMove(evt),{passive: false})
            this.listen(this.canvas,'touchend', evt => this.onUp(evt))
        }
        this.content = this.shadowRoot?.getElementById('content') ?? undefined
        if (this.content) {
            this.observer = new ResizeObserver(_entries => this.resize())
            this.observer.observe(this.content);
        }
        this.image = this.shadowRoot?.getElementById('image')as HTMLImageElement ?? undefined
        this.load()
    }
    private resize() {
        if (this.content) {
            const width = this.content.offsetWidth
            const height = Math.floor(this.content.offsetWidth / 2)
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

    private getPos(event: any) {
        if (event.touches && event.touches[0]) {
            this.currentX = event.touches[0].clientX - this.offsetX;
            this.currentY = event.touches[0].clientY - this.offsetY;
        } else if (event.originalEvent && event.originalEvent.touches && event.originalEvent.touches[0]) {
            this.currentX = event.originalEvent.touches[0].clientX - this.offsetX;
            this.currentY = event.originalEvent.touches[0].clientY - this.offsetY;
        } else if (event.offsetX !== undefined) {
            this.currentX = event.offsetX;
            this.currentY = event.offsetY;
        } else { // Firefox compatibility
            this.currentX = event.layerX - event.currentTarget.offsetLeft;
            this.currentY = event.layerY - event.currentTarget.offsetTop;
        }
    }
    private getOffset(event: any) {
        // calculate offsets for touch devices
        if (event.touches || event.originalEvent && event.originalEvent.touches) {
            this.offsetX = 0
            this.offsetY = 0;
            let elt = null;
            
            // originalEvent is present on PC 
            if (event.originalEvent) 
                elt = event.originalEvent.srcElement;
            else {
                // ORiginal Event absent from touch devices
                if (event.touches.length > 0)
                    elt = event.touches[0].target
            }

            if (elt) {
                while (elt) {
                    this.offsetX += elt.offsetLeft - elt.scrollLeft;
                    this.offsetY += elt.offsetTop - elt.scrollTop;
                    elt = elt.offsetParent;
                }
            }
        }
    }
    private onDown(event: Event) {
        this.drawing = !this.readonly
        this.getOffset(event)
        this.getPos(event);

        // start a new line
        if (this.context && this.currentX) {
            this.context.beginPath();
            this.context.moveTo(this.currentX, this.currentY);
            this.context.strokeStyle = "#4bf";
            this.context.lineWidth = 5;
            this.context.lineJoin = 'round';
        }

        this.eventStop(event)
        return false;
    }
    private onMove(event: Event) {
        if (!this.drawing) return
        this.getPos(event)
        if (this.context) {
            this.context.lineTo(this.currentX, this.currentY);
            this.context.stroke();
        }
        this.eventStop(event)
        return false;
    }
    private onUp(event: Event) {
        // On arrête le dessin
        this.drawing = false;
        this.eventStop(event)
        if (!this.isblank) this.save()
        return false;
    }
    //override check() {
        // this.valid = true
        // this.message = ''
        // if (this.required && this.value == null) {
        //     this.valid = false
        //     this.message = formatMsg('valueMissing')
        // }
        // this.content?.classList.add(this.valid ? 'valid' : 'invalid')
        // this.content?.classList.remove(this.valid ? 'invalid' : 'valid')
        // if (this.readonly) {
        //     this.content?.classList.add('readonly')
        // } else {
        //     this.content?.classList.remove('readonly')
        // }
    //}
    private load() {
        if (this.context && this.image && this.value) {
            this.image.src = this.value
        }
    }

    private edit() {
        this.canvas && this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.value = null
        this.state = 'edit'
    }
    private validate() {
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
        this.value= '';
        this.requestUpdate()
    }
    private del() {
        this.clear()
        this.state = 'read'
    }

}