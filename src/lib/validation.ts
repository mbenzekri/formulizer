import JsonSchemaDraft  from "../assets/draft-07-schema.json"
import Ajv from "ajv";
import { FZ_FORMATS, FZ_KEYWORDS, Schema } from "./schema"
import { AjvError } from "./types";
import { ValidateFunction } from "ajv"
import Ajvi18n from "ajv-i18n/localize/en"
import addFormats from 'ajv-formats'

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
    // type: "string",              // optional: applies to schemas of this type
    // schemaType: "boolean",       // or "object" | "string" | etc.
    // metaSchema: { type: "boolean" }, // to validate the value of the keyword

  



const schemaValidate = ajv.compile(JsonSchemaDraft)
//const schemaValidate = ajv.getSchema("http://json-schema.org/draft-07/schema#")
export function validateSchema(data: any) {
    return schemaValidate ? schemaValidate(data) : false
}

export function validateErrors() {
    Ajvi18n(schemaValidate?.errors)
    return schemaValidate?.errors ?? []
}

export class Validator {
    parser: ValidateFunction
    public errors: AjvError[] =  []
    public text = ""

    constructor(schema: Schema) {
        this.parser = ajv.compile(schema)
    }
    validate(value: any): boolean {
        const result = this.parser(value)
        this.errors = this.parser.errors ?? []
        Ajvi18n(this.errors)
        this.text = ajv.errorsText(this.errors)

        if (typeof result === 'boolean') return result
        throw (`Schema validation result not boolean (not expected) ${result}`)
    }
    static getText(errors: AjvError[]) {
        Ajvi18n(errors)
        return ajv.errorsText(errors)
    }
}

