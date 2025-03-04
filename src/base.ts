import { LitElement } from 'lit';

import { bootstrapCss } from "./assets/bootstrap"
import { bootstrapIconsCss } from "./assets/bootstrap-icons"

type HandlerItem = { target: EventTarget, event: string, handler:(evt: Event) => void }
export class Base extends LitElement {

    private handlers: HandlerItem[] = []

    static override get styles() {
            return [
                bootstrapCss,
                bootstrapIconsCss,
            ]
    }

    public listen(target: EventTarget, event: string,handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean) {
        const i = this.handlers.findIndex(item => item.target === target && item.event === event && item.handler === handler)
        if (i < 0) {
            this.handlers.push({target, event, handler})
            target.addEventListener(event,handler,options)
        }
    }
    public unlisten(target: EventTarget, event: string,handler: (evt: Event) => void, options?: AddEventListenerOptions | boolean) {
        const i = this.handlers.findIndex(item => item.target === target && item.event === event && item.handler === handler)
        if (i >= 0) {
            this.handlers.splice(i,1)
            target.removeEventListener(event, handler, options)
        }
    }

    override connectedCallback() {
        super.connectedCallback()
    }

    override disconnectedCallback() {
        super.disconnectedCallback()
        for (const item of this.handlers) {
            item.target.removeEventListener(item.event, item.handler)
        }
    }

}
