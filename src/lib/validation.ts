//import Ajv from "ajv";
//import Ajvi18n from "ajv-i18n/localize/en"
//import { ValidateFunction, ValidationError } from "./types";
//import addFormats from 'ajv-formats'

import JsonSchemaDraft from "../assets/draft-07-schema.json"
import { FZ_FORMATS, FZ_KEYWORDS, Schema } from "./schema"

type AjvInterface = { 
    compile(schema: Schema, _meta?: boolean): ValidateFunction 
    addFormat(...args:any[]): void
    addKeyword(...args:any[]): void
}
type AjvConstructor = { new (options?: any): AjvInterface }

let Ajv: AjvConstructor
let Ajvi18n: (arg:any) => void
let addFormats: (arg:any) => void

async function loadValidator(useAjv = false) {
    if (useAjv) {
        {
            const mod = await import("ajv")
            Ajv = mod.default as unknown as AjvConstructor
        }
        {
            const mod = await import("ajv-i18n/localize/en")
            Ajvi18n = mod.default as (arg: any) => void
        }
        {
            const mod = await import("ajv-formats")
            addFormats = mod.default as (arg: any) => void
        }
    }
}
loadValidator(false)

export type ValidationError = {
    keyword: string;
    instancePath: string;
    schemaPath: string;
    params: Record<string, any>;
    propertyName?: string;
    message?: string;
    schema?: Schema;
    parentSchema?: Schema;
    data?: unknown;
}

export interface ValidateFunction {
    (this: any, data: any): boolean;
    errors?: null | ValidationError[];
    evaluated?: any;
    schema: Schema;
    schemaEnv: any;
    source?: any;
}

export class Validator {

    get schemaValid() { return true }
    get schemaErrors():ValidationError[] { return [] }
    get valid() { return true }
    validate(_data: any):void {}
    get errors():ValidationError[] { return [] }

    errorMap() {
        const errorMap=new Map<string,string[]>()
        for (const error of this.errors) {
            let { instancePath, message, params, keyword } = error;
            instancePath = `/${instancePath}`
            // required applies to object must down the error to child
            if (keyword === "required") {
                instancePath = `${instancePath === '/' ? '' : ''}/${params.missingProperty}`
                message = "required"
            }
            if (!errorMap.has(instancePath)) errorMap.set(instancePath, [])
            //const detail =Object.entries(params).map(([s,v]) => v == null ? null : `${s}: ${v}`).filter(v => v).join(',')
            errorMap.get(instancePath)?.push(message ?? "unidentified error")
        }
        return errorMap
    }

    // AJV library loader 
    private static get loaded() {
        return Ajv != null
    }
    static getValidator(schema:Schema): Validator {
        if (Ajv == null) return new DefaultValidator(schema)
            const ajv = new Ajv({
                allErrors: true,
                //strict: true,
                allowUnionTypes: true,
                strictSchema: true,
                strictNumbers: false,
                coerceTypes: false
            })
            addFormats(ajv)
            // register FzForm added formats 
            FZ_FORMATS.forEach(format => ajv.addFormat(format, /./))
            // register FzForm specific keywords
            FZ_KEYWORDS.forEach(keyword => ajv.addKeyword({ keyword, valid: true }))

    
        return new AjvValidator(ajv, schema)

    }
    static async loadValidator(useAjv=false) {
        if (useAjv && !Validator.loaded) {
            await loadValidator(useAjv)
        }
    }

}

export class DefaultValidator extends Validator {
    constructor(_schema: Schema) {
        super()
    }
}


export class AjvValidator extends Validator {
    private ajv: AjvInterface
    private dataParser: ValidateFunction
    private schemaParser: ValidateFunction

    constructor(ajv: AjvInterface,schema: Schema) {
        super()
        this.ajv = ajv
        this.schemaParser = this.ajv.compile(JsonSchemaDraft as unknown as Schema)
        this.schemaParser(schema)
        Ajvi18n(this.schemaParser.errors)
        this.dataParser = this.ajv.compile(schema) as ValidateFunction
    }
    override get schemaValid() { return (this.schemaParser.errors?.length ?? 0) == 0 }
    override get schemaErrors() { return this.schemaParser.errors ?? [] }
    override get valid() { return (this.dataParser.errors?.length ?? 0) == 0  }
    override validate(value: any): void {
        this.dataParser(value)
        Ajvi18n(this.dataParser.errors)
    }
    override get errors():ValidationError[] { return this.dataParser.errors ?? [] }

}

