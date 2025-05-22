import { html, css, TemplateResult, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { Base } from "../base";

export abstract class FzDialog extends Base {
    @state() private isopen = false
    @property({ attribute: false }) public valid = false
    @property({ attribute: 'dlg-title' }) accessor dialogTitle = "Dialog"
    @property({ attribute: 'dlg-confirm' }) accessor confirmLabel = "Ok"
    @property({ attribute: 'dlg-cancel' }) accessor cancelLabel = "Cancel"
    private save_overflow?: string

    static override get styles() {
        return [
            ...super.styles,
            css`
            .modal-body {
                max-height: 75vh; min-height: 50vh; overflow-y: auto;
            }`
        ]
    }
    abstract renderDialog(): TemplateResult
    abstract init(): void
    abstract closed(canceled: boolean): void
    override render() {
        this.isopen;
        return html`
            <div class="modal fade" id="modal" tabindex="-1" role="dialog" style="display:none">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" >${this.dialogTitle}</h5>
                            <button type="button" class="close" @click="${this.cancel}"><span>&times;</span></button>
                        </div>
                        <div class="modal-body">
                            ${this.renderDialog()}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" ?disabled=${!this.valid}  @click=${this.confirm}>${this.confirmLabel}</button>
                            <button type="button" class="btn btn-secondary" @click="${this.cancel}" >${this.cancelLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    closeModal() {
        const modal = this.shadowRoot?.querySelector(".modal") as HTMLDivElement
        const backdrop = this.shadowRoot?.querySelector(".modal-backdrop.fade.show") as HTMLElement
        if (modal) {
            backdrop.classList.remove("show")
            if (this.save_overflow) {
                document.body.style.overflow = this.save_overflow
            }
            // We want to remove the show class from the modal outside of the regular DOM thread so that
            // transitions can take effect
            setTimeout(() => modal.classList.remove("show"))

            // We want to set the display style back to none and remove the backdrop div from the body
            // with a delay of 500ms in order to give their transition/animations time to complete
            // before totally hiding and removing them.
            setTimeout(() => {
                modal.style.display = "none";
                backdrop.remove()
            }, 500); // this time we specified a delay
        }
    }

    openModal() {
        const modal = this.shadowRoot?.querySelector(".modal") as HTMLDivElement
        const backdrop = document.createElement("div");
        backdrop.classList.add("modal-backdrop", "fade");
        this.save_overflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        this.shadowRoot?.appendChild(backdrop);
        modal.style.display = "block";

        // We don't need to specify the milliseconds in this timeout, since we don't want a delay,
        // we just want the changes to be done outside of the normal DOM thread.
        setTimeout(() => {
            // Move adding the show class to inside this setTimeout
            modal.classList.add("show");
            // Add the show class to the backdrop in this setTimeout
            backdrop.classList.add("show");
        })
    }

    override firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties)
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback()
    }

    public async open() {
        await this.init()
        this.isopen = true
        this.openModal()
    }
    private confirm(evt: Event) {
        this.valid = false
        this.isopen = false
        this.closeModal()
        this.closed(false)
        this.eventStop(evt)
    }

    private cancel(evt: Event) {
        this.valid = false
        this.isopen = false
        this.closeModal()
        this.closed(true)
        this.eventStop(evt)
    }
}


