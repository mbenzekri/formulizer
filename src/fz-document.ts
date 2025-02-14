/* eslint-disable @typescript-eslint/no-explicit-any */

import { html, css } from "lit";
import { customElement,  property } from "lit/decorators.js";
import { FzElement } from "./fz-element";
import { IDocStorage, DocStorage } from "./docstorage";
import { v1 as uuidv1 } from "uuid"
import { isEmptyValue } from "./tools"

const CACHE_NAME = "FZ-DOC-STORAGE"

/**
 * @prop schema
 * @prop data
 * @prop name
 * @prop index
 * @prop options
 */
 @customElement("fz-document")
export class FzDocument extends FzElement {
    @property({ attribute: false })
    accessor docTypes = [
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

    private url = '';
    private photoModal: any;
    private filename?: string
    get preview(): boolean {
        return this.schema.preview
    }

    get mimetype(): string {
        return (this.schema.mimetype) ? this.schema.mimetype : this.docTypes.join(', ')
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
        return html`
            <fz-photo-dlg></fz-photo-dlg>
            <div class="input-group">
                ${ (this.url && this.preview)  ? html`
                    <div class="input-group-prepend" >
                        <img class="input-group-text img-preview" src="${this.url}" @click="${this.open}"/>
                    </div>` : null
                }
                ${ (!this.isEmpty && !(this.url && this.preview))  ?html`
                    <div class="input-group-prepend">
                        <span class="input-group-text"  @click="${this.open}"><i class="bi bi-eye"></i></span>
                    </div>` : null
                }
                <input class="form-control"  type="text" spellcheck="false"
                    placeholder="photo, document, ..."
                    .value="${this.filename ?? ''}"
                    ?readonly="${this.readonly}" 
                    @mousedown="${(e:Event) => e.preventDefault()}"
                    @paste="${(e:Event) => e.preventDefault()}"
                    @input="${(e:Event) => e.preventDefault()}"
                    @keypress="${(e:Event) => e.preventDefault()}"
                    ?required="${this.required}"
                />
                ${ (this.isEmpty || this.readonly)  ? html`` : html`
                    <button  @click="${this.delete}"  type="button" class="close-right btn-close" aria-label="Close"> </button>`
                }
                ${ ( !this.isEmpty || this.readonly)  ? html`` : html`
                    <span class="input-group-text btn btn-primary" @click="${()=>this.photoModal?.open()}" ><i class=" bi bi-camera"></i></span>
                    <span class="input-group-text fileUpload btn btn-primary">
                        <input type="file"
                            @change="${this.save}"
                            ?disabled="${this.readonly}" 
                            accept="${this.mimetype}"
                            class="btn-block"/>
                        <i class="bi bi-file-earmark-richtext"></i>
                    </span>`
                }
            </div>`
    }

    override change() {
        super.change()
        this.requestUpdate()
    }

    override connectedCallback() {
        super.connectedCallback()
        this.addEventListener('update', () => {
            this.check()
        })
    }

    get docStorage(): IDocStorage {
        return this.form?.docStorage ?? new DocStorage(CACHE_NAME, this.form?.idData || "dummy")
    }

    override async firstUpdated(changedProperties: any) {
        super.firstUpdated(changedProperties)
        this.photoModal = this.shadowRoot?.querySelector('fz-photo-dlg') ?? undefined
        this.photoModal.addEventListener('close' as any, (evt: CustomEvent) => {
            this.set(uuidv1(),evt.detail.blob, "photo.png")
        })
        try {
            if (this.value) {
                const doc = await this.docStorage.get(this.value)
                if (doc) 
                    this.set(this.value, doc.blob, doc.filename)
                else
                    throw Error('not found')
            }
        } catch(e) {
            this.valid = false
            this.message = "Fichier introuvable"
        }
    }

    async open() {
        try {
            const doc = await this.docStorage.get(this.value)
            if (doc) {
                const fileURL = URL.createObjectURL(doc.blob);
                window.open(fileURL);
            }
        } catch (e) {
            this.valid = false
            this.message = "Impossible d'ouvrir le fichier"
        }
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

    async set(id: string, blob: Blob, filename: string) {
        if (!blob || !filename) return
        if (this.value) await this.docStorage.remove(this.value)
        this.filename = filename
        this.value = id
        this.setUrl(blob)
        await this.docStorage.put(this.value, blob, this.filename, this.pointer)
        this.change()
        this.requestUpdate()
    }

    private async save(event: any) {
        await this.set(uuidv1(),event.target.files[0], event.target.files[0].name)
    }

    private async delete() {
        if (this.value) await this.docStorage.remove(this.value)
        this.value = this.empty
        this.url = ""
        this.filename = ""
        this.change()
        this.requestUpdate()
    }

    convertToInput(value: any) {
        return (value == null) ? "" : value
    }

    convertToValue(value: any) {
        return isEmptyValue(value) ? this.empty : value;
    }
}
