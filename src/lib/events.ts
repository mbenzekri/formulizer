
import { FzField } from "../fz-field";
import { FzForm } from "../fz-form";
import { Schema } from "./schema";
import { EnumItem } from "./types";

export class FzUpdateEvent extends CustomEvent<{ data: any, schema: Schema, field: FzField }> {
    constructor(data: any, schema: Schema, field: FzField) {
        super("update", {
            detail: { data, schema, field },
            bubbles: true,
            composed: true
        })
    }
}
export class FzTrackEvent extends CustomEvent<{ trackers: string[], schema: Schema, field: FzField }> {
    constructor(trackers: string[], schema: Schema, field: FzField ) {
        super("data-updated", {
            detail: { trackers, schema, field },
            bubbles: true,
            composed: true
        })
    }
}

export class FzFormReadyEvent extends CustomEvent<{ form: FzForm }> {
    constructor(form: FzForm) {
        super("ready", { detail: {form }})
    }
}
    
export class FzFormInitEvent extends CustomEvent<{ form: FzForm }> {
    constructor(form: FzForm) {
        super("init", { detail: {form }})
    }
}
    
export class FzFormValidateEvent extends CustomEvent<{ form: FzForm }> {
    constructor(form: FzForm) {
        super("validate", { detail: {form }})
    }
}
export class FzFormDismissEvent extends CustomEvent<{ form: FzForm }> {
    constructor(form: FzForm) {
        super("dismiss", { detail: {form }})
    }
}
    
export class FzFormValidEvent extends CustomEvent<{ form: FzForm }> {
    constructor(form: FzForm) {
        super("data-valid", { detail: {form }})
    }
}
export class FzFormInvalidEvent extends CustomEvent<{ form: FzForm }> {
    constructor(form: FzForm) {
        super("data-invalid", { detail: {form }})
    }
}

type FzFieldEnumEventDetail = { 
    name: string,
    field: FzField, 
    success: (data: EnumItem[]) => void, 
    failure: (message: string) => void, 
    timeout: number 
}

export class FzFieldEnumEvent extends CustomEvent<FzFieldEnumEventDetail> {
    constructor(detail: FzFieldEnumEventDetail ) {
        super("enum", { 
            detail, 
            bubbles: true,
            cancelable: false,
            composed: true
        })
    }
}

// add Custom events to the map
export interface EventMap {
    'update': FzUpdateEvent;
    'data-updated' : FzTrackEvent,
    'ready': FzFormReadyEvent,
    'init' : FzFormInitEvent,
    'validate': FzFormValidateEvent,
    'dismiss': FzFormDismissEvent,
    'data-valid': FzFormValidEvent,
    'data-invalid': FzFormInvalidEvent,
}
