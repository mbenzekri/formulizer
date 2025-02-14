import { html,css, LitElement } from "lit";
import { customElement,property } from "lit/decorators.js";
import { bootstrapCss } from "./bootstrap"
import { bootstrapIconsCss } from "./bootstrap-icons"

@customElement("fz-dialog")
export class FzDialog extends LitElement {
    private modal?: HTMLElement | null
    private backdrop?: HTMLElement | null
    private validable = false
    @property({attribute: 'modal-title'}) accessor modalTitle = "Dialogue"
    @property({attribute: 'ok-label'}) accessor okLabel = "Valider"
    @property({attribute: 'dismiss-label'}) accessor dismissLabel = "Annuler"
    
    static override get styles() {
        return [
            bootstrapCss,
            bootstrapIconsCss,
            css`
            .modal-body {
                max-height: 75vh; min-height: 50vh; overflow-y: auto;
            }`
        ]
    }
    override render() {
        return html`
            <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" >${this.modalTitle}</h5>
                            <button type="button" class="btn btn-secondary " aria-label="Close"  @click="${this.dismiss}">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                        <div class="modal-footer">
                            <button ?disabled="${!this.validable}" type="button" class="btn btn-primary" @click="${this.validate}">${this.okLabel}</button>
                            <button type="button" class="btn btn-danger" @click="${this.dismiss}" >${this.dismissLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop"  style="display: none;" @click="${this.dismiss}"></div>`
    }

    get isOpen() {
        return this.modal?.classList.contains("show")
    }

    override firstUpdated() {
        this.modal = this.shadowRoot?.getElementById('modal');
        this.backdrop = this.shadowRoot?.getElementById('backdrop');
    }

    open() {
        if (this.backdrop) this.backdrop.style.display = "block"
        if (this.modal) {
            this.modal.style.display = "block"
            this.modal.classList.add("show")
        }
        this.requestUpdate()
        this.dispatchEvent(new CustomEvent('fz-dialog-open',{ detail:{} }))
    }
    close() {
        if (this.backdrop) this.backdrop.style.display = "none"
        if (this.modal) {
            this.modal.style.display = "none"
            this.modal.classList.remove("show");
        }
    }

    validate(evt: Event) {
        this.close()
        evt.preventDefault()
        evt.stopPropagation()
        this.dispatchEvent(new CustomEvent('close',{ detail:{dismissed: false} }))
    }

    dismiss(evt: Event) {
        this.close()
        evt.preventDefault()
        evt.stopPropagation()
        this.dispatchEvent(new CustomEvent('close', {detail:{dismissed: true}}));

    }
    valid(validable = true) {
        this.validable = validable
        this.requestUpdate()
    }
}