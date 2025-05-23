/* eslint-disable @typescript-eslint/no-explicit-any */

import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { IBlobStore } from "../../lib/storage";
import { v1 as uuidv1 } from "uuid"
import { notNull, when } from "../../lib/tools"
import { FzInputBase } from "../fz-input-base";
import { FzPhotoDlgCloseEvent } from "../../components/fz-photo-dlg";

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop options
 */
@customElement("fz-doc")
export class FzInputDoc extends FzInputBase {

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

    private static docTypes = [
        // Documents images
        "image/png"
        , "image/jpeg"
        , "image/gif"
        // Documents texte
        , "text/plain"
        // Documents PDF
        , "application/pdf"
        // Documents Office Microsoft
        , "application/msword"
        , "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        , "application/vnd.ms-excel"
        , "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        , "application/vnd.ms-powerpoint"
        , "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        // Documents Open Office
        , "application/vnd.oasis.opendocument.text"
        , "application/vnd.oasis.opendocument.spreadsheet"
        , "application/vnd.oasis.opendocument.presentation"
        , "application/vnd.oasis.opendocument.graphics"
    ];

    private photoModal: any;
    private url = '';
    private filename?: string

    get hasPreview(): boolean {
        return !!this.schema.preview
    }

    get mimetype(): string {
        return this.schema?.mimetype ? this.schema.mimetype : FzInputDoc.docTypes.join(', ')
    }

    get store(): IBlobStore {
        return this.context.store
    }

    static override get styles() {
        return [
            ...super.styles,
            css`
                .fileUpload {
                    position: relative;
                    overflow: hidden;
                    margin: 0px;
                }
                .fileUpload input {
                    position: absolute !important;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: 0;
                    padding: 0;
                    cursor: pointer;
                    opacity: 0 !important;
                    filter: alpha(opacity=0) !important;
                }
                .img-preview {
                    width:100px;
                    height:auto;
                }
                .close-right {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    z-index: 10;
                    display: block;
                    padding: 0.25rem 0.5rem;
                    color: #818a91;
                    cursor: pointer;
                    background-color: transparent;
                    border: 0;
                    border-radius: 0.25rem;
                }
                `
        ]
    }

    renderInput() {

        const previewdiv = when(this.url && this.hasPreview, html`
            <img class="input-group-text img-preview" src="${this.url}" @dblclick="${this.open}"/>
        `)

        const openbtn = when(!this.isempty && !(this.url && this.hasPreview), html`
            <span class="input-group-text"  @click="${this.open}"><i class="bi bi-eye"></i></span>
        `)

        const camerabtn = when(this.isempty && !this.readonly, html`
            <span class="input-group-text btn btn-primary" @click="${() => this.photoModal?.open()}" >
                <i class="bi bi-camera"></i>
            </span>`)

        const uploadbtn =when(this.isempty && !this.readonly, html`
            <span class="input-group-text btn btn-primary btn btn-primary fileUpload">
                <input type="file"
                    @change="${this.save}"
                    ?disabled="${this.readonly}" 
                    accept="${this.mimetype}"
                    class="btn-block"
                    autocomplete=off  spellcheck="false"/>
                <i class="bi bi-file-earmark-richtext"></i>
            </span>`)

        const deletebtn = when(!this.isempty && !this.readonly, html`
            <button class="input-group-text btn btn-light" @click="${this.delete}" aria-label="delete" >
                <i class="bi bi-trash"></i>
            </button>`)

        return html`
            <fz-dlg-photo id=modal ></fz-dlg-photo>
            <div class="input-group">
                ${camerabtn}
                ${uploadbtn}
                ${previewdiv}
                <input
                    id="input"
                    type="text"
                    ?readonly="${this.readonly}"
                    ?required="${this.required}"
                    placeholder=""
                    .value="${this.filename ?? ''}"
                    @mousedown=${this.eventStop}"
                    @paste=${this.eventStop}
                    @input=${this.eventStop}
                    @keypress=${this.eventStop}
                    autocomplete=off  spellcheck="false"
                    class="form-control ${this.validation}"  
                />
                ${openbtn}
                ${deletebtn}
            </div>`
    }

    override async firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties)
        this.photoModal = this.shadowRoot?.querySelector('fz-dlg-photo') ?? undefined
        this.listen(this.photoModal, 'fz-dlg-photo-close', (evt:Event) => this.set(uuidv1(), (evt as FzPhotoDlgCloseEvent).detail.blob, "photo.png"))
        if (this.value != null) {
            const doc = await this.store.get(this.value)
            if (doc) {
                this.set(this.value, doc.blob, doc.filename)
                this.localErrors.delete("document not found")
            } else {
                this.dirty = true
                this.localErrors.add("document not found")
            }
        }
    }

    private async open() {
        if (this.value == null) return
        const doc = await this.store.get(this.value)
        let fileURL
        if (doc) {
            fileURL = URL.createObjectURL(doc.blob);
        } else {
            const blob = new Blob([`FzForm ERROR: Couldn't open document uuid=${this.value}`], { type: "text/plain" });
            fileURL = URL.createObjectURL(blob);
        }
        window.open(fileURL);
    }
    private setUrl(blob: Blob) {
        this.url = ''
        if (blob.type.startsWith('image')) {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = (event) => {
                this.url = (event.target?.result as string)
                this.requestUpdate()
            }
        }
    }

    private async set(id: string, blob?: Blob, filename?: string) {
        if (!blob || !filename) return
        if (this.value) await this.store.remove(this.value)
        this.filename = filename
        this.value = id
        this.setUrl(blob)
        if (this.value) await this.store.put(this.value, blob, this.filename, this.pointer)
        this.change()
    }

    private async save(event: any) {
        await this.set(uuidv1(), event.target.files[0], event.target.files[0].name)
    }

    private async delete() {
        if (this.value) await this.store.remove(this.value)
        this.value = this.empty
        this.url = ""
        this.filename = ""
        this.change()
    }

}
