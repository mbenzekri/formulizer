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

    get map() {
        const logger = FzLogger.get("validation")
        const map=new Map<string,string[]>()
        for (const error of this.errors) {
            let { instancePath, message, params, keyword } = error;
            // required applies to object must down the error to child
            if (keyword === "required") {
                instancePath = `${instancePath === '/' ? '' : ''}/${params.missingProperty}`
                message = "required"
            }
            if (!map.has(instancePath)) map.set(instancePath, [])
            //const detail =Object.entries(params).map(([s,v]) => v == null ? null : `${s}: ${v}`).filter(v => v).join(',')
            map.get(instancePath)?.push(message ?? "unidentified error")
            logger.debug('% -> %s', instancePath, message)
        }

        
        return map
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


// class SimpleJSONSchemaValidator {
//     private schema: JSONSchema;

//     constructor(schema: JSONSchema) {
//         this.schema = schema;
//     }

//     validate(instance: any): string[] {
//         return this.validateInstance(this.schema, instance);
//     }

//     private validateInstance(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];

//         if (schema.type) {
//             switch (schema.type) {
//                 case 'object':
//                     errors.push(...this.validateObject(schema, instance));
//                     break;
//                 case 'array':
//                     errors.push(...this.validateArray(schema, instance));
//                     break;
//                 case 'string':
//                     errors.push(...this.validateString(schema, instance));
//                     break;
//                 case 'number':
//                     errors.push(...this.validateNumber(schema, instance));
//                     break;
//                 case 'boolean':
//                     errors.push(...this.validateBoolean(schema, instance));
//                     break;
//                 case 'null':
//                     errors.push(...this.validateNull(schema, instance));
//                     break;
//                 default:
//                     errors.push(`Unknown type: ${schema.type}`);
//             }
//         }

//         if (schema.required) {
//             errors.push(...this.validateRequired(schema, instance));
//         }

//         return errors;
//     }

//     private validateObject(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'object' || instance === null || Array.isArray(instance)) {
//             errors.push("Expected an object");
//             return errors;
//         }

//         const properties = schema.properties || {};
//         for (const prop in properties) {
//             if (instance.hasOwnProperty(prop)) {
//                 errors.push(...this.validateInstance(properties[prop], instance[prop]));
//             }
//         }

//         return errors;
//     }

//     private validateArray(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (!Array.isArray(instance)) {
//             errors.push("Expected an array");
//             return errors;
//         }

//         const itemsSchema = schema.items || {};
//         for (const item of instance) {
//             errors.push(...this.validateInstance(itemsSchema, item));
//         }

//         if (schema.minItems !== undefined && instance.length < schema.minItems) {
//             errors.push(`Expected at least ${schema.minItems} items`);
//         }

//         if (schema.maxItems !== undefined && instance.length > schema.maxItems) {
//             errors.push(`Expected no more than ${schema.maxItems} items`);
//         }

//         return errors;
//     }

//     private validateString(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'string') {
//             errors.push("Expected a string");
//             return errors;
//         }

//         if (schema.minLength !== undefined && instance.length < schema.minLength) {
//             errors.push(`Expected at least ${schema.minLength} characters`);
//         }

//         if (schema.maxLength !== undefined && instance.length > schema.maxLength) {
//             errors.push(`Expected no more than ${schema.maxLength} characters`);
//         }

//         if (schema.pattern) {
//             const regex = new RegExp(schema.pattern);
//             if (!regex.test(instance)) {
//                 errors.push(`String does not match pattern: ${schema.pattern}`);
//             }
//         }

//         if (schema.format) {
//             errors.push(...this.validateFormat(schema.format, instance));
//         }

//         return errors;
//     }

//     private validateNumber(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'number') {
//             errors.push("Expected a number");
//             return errors;
//         }

//         if (schema.minimum !== undefined && instance < schema.minimum) {
//             errors.push(`Expected value to be at least ${schema.minimum}`);
//         }

//         if (schema.maximum !== undefined && instance > schema.maximum) {
//             errors.push(`Expected value to be at most ${schema.maximum}`);
//         }

//         return errors;
//     }

//     private validateBoolean(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'boolean') {
//             errors.push("Expected a boolean");
//         }
//         return errors;
//     }

//     private validateNull(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (instance !== null) {
//             errors.push("Expected null");
//         }
//         return errors;
//     }

//     private validateRequired(schema: JSONSchema, instance: any): string[] {
//         const errors: string[] = [];
//         if (typeof instance !== 'object' || instance === null || Array.isArray(instance)) {
//             return errors;
//         }

//         const requiredProperties = schema.required || [];
//         for (const prop of requiredProperties) {
//             if (!instance.hasOwnProperty(prop)) {
//                 errors.push(`Missing required property: ${prop}`);
//             }
//         }

//         return errors;
//     }

//     private validateFormat(format: string, instance: string): string[] {
//         const errors: string[] = [];
//         switch (format) {
//             case 'email':
//                 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (!emailRegex.test(instance)) {
//                     errors.push("Invalid email format");
//                 }
//                 break;
//             case 'date':
//                 const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//                 if (!dateRegex.test(instance)) {
//                     errors.push("Invalid date format (YYYY-MM-DD)");
//                 }
//                 break;
//             case 'date-time':
//                 const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;
//                 if (!dateTimeRegex.test(instance)) {
//                     errors.push("Invalid date-time format (YYYY-MM-DDTHH:MM:SSZ)");
//                 }
//                 break;
//             case 'time':
//                 const timeRegex = /^\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;
//                 if (!timeRegex.test(instance)) {
//                     errors.push("Invalid time format (HH:MM:SSZ)");
//                 }
//                 break;
//             case 'uri':
//                 const uriRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
//                 if (!uriRegex.test(instance)) {
//                     errors.push("Invalid URI format");
//                 }
//                 break;
//             // Add more format validations as needed
//             default:
//                 errors.push(`Unknown format: ${format}`);
//         }
//         return errors;
//     }
// }
