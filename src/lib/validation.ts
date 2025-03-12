import JsonSchemaDraft  from "../assets/draft-07-schema.json"
import Ajv from "ajv";
import { Schema } from "./schema"

import { ValidateFunction, ErrorObject } from "ajv"
import Ajvi18n from "ajv-i18n/localize/en"
const ajv = new Ajv({ strictNumbers: false, strictSchema: false, coerceTypes: true })

ajv.addFormat("color", /./)
ajv.addFormat("signature", /./)
ajv.addFormat("password", /./)
ajv.addFormat("doc", /./)
ajv.addFormat("uuid", /./)
ajv.addFormat("geo", /./)
ajv.addFormat("markdown", /./)
ajv.addFormat("asset", /./)
ajv.addFormat("date", /./)
ajv.addFormat("time", /./)
ajv.addFormat("date-time", /./)
ajv.addFormat("email", /./)


const schemaValidate = ajv.compile(JsonSchemaDraft)
//const schemaValidate = ajv.getSchema("http://json-schema.org/draft-07/schema#")
export function validateSchema(data: any) {
    return schemaValidate ? schemaValidate(data) : false
}

export function validateErrors() {
    Ajvi18n(schemaValidate?.errors)
    return schemaValidate?.errors ?? []
}

export class DataValidator {
    parser: ValidateFunction
    constructor(schema: Schema) {
        this.parser = ajv.compile(schema)
    }
    validate(value: any): boolean {
        const result = this.parser(value)
        if (typeof result === 'boolean') return result
        throw (`Schema validation result not boolean (not expected) ${result}`)
    }
    errors(): ErrorObject[] | null | undefined {
        return this.parser.errors
        return null
    }

    errorsText(errors: ErrorObject[] | null | undefined): string {
        Ajvi18n(errors)
        return ajv.errorsText(errors)
    }
}

