import { JSONSchema, Pojo } from "../lib/types"
// MBZ-TOFIX import draft from "./draft-07-schema.json"
// MBZ-TOFIX import { Ajv } from "ajv"
// MBZ-TOFIX import { ValidateFunction, ErrorObject } from "ajv"
// MBZ-TOFIX import Ajvi18n from "ajv-i18n/localize/fr"

const primitivetypes = new Set<string>(['string', 'integer', 'number', 'boolean', 'array'])
export function isprimitive(name: string) { return primitivetypes.has(name) }

export function isenumarray(schema: Pojo) {
    if (schema.basetype === 'array' && schema.uniqueItems) {
        if (schema.items.oneOf) return !!schema.items.oneOf.every((sch: Pojo) => 'const' in sch)
        else if (schema.items.anyOf) return !!schema.anyOf.every((sch: Pojo) => 'const' in sch)
    }
    return false
}

// const ajv = new Ajv({ strictNumbers: false, strictSchema: false, coerceTypes: true })

// MBZ-TOFIX ajv.addFormat("color", /./)
// MBZ-TOFIX ajv.addFormat("signature", /./)
// MBZ-TOFIX ajv.addFormat("password", /./)
// MBZ-TOFIX ajv.addFormat("doc", /./)
// MBZ-TOFIX ajv.addFormat("uuid", /./)
// MBZ-TOFIX ajv.addFormat("geo", /./)
// MBZ-TOFIX ajv.addFormat("markdown", /./)
// MBZ-TOFIX ajv.addFormat("asset", /./)
// MBZ-TOFIX ajv.addFormat("date", /./)
// MBZ-TOFIX ajv.addFormat("time", /./)
// MBZ-TOFIX ajv.addFormat("date-time", /./)
// MBZ-TOFIX ajv.addFormat("email", /./)


export const jsonAttributeConverter = {
    fromAttribute(value: string | null): unknown {
      try {
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('fromAttribute:JSON parsing error:', error);
        return null;
      }
    },
    toAttribute(value: unknown): string | null {
      try {
        return value != null ? JSON.stringify(value) : null;
      } catch (error) {
        console.error('toAttribute: JSON stringifycation failure:', error);
        return null;
      }
    }
  };
  

export function calculateDefault(parent: any, schema: Pojo): any {
    switch (true) {
        case ("const" in schema):
            return schema.const
        case isprimitive(schema.basetype) && 'default' in schema:
            return schema.default
        case schema.basetype === 'object': {
            return Object.entries(schema.properties as Pojo).reduce((object, [key, property]) => {
                if (property.default)  object[key] = newValue(JSON.parse(JSON.stringify(property.default)),object,property)
                else object[key] = object.required?.includes[key] ? calculateDefault(object, property) : newValue(getEmptyValue(property), object, property)
                return object
            }, newValue({}, parent, schema) as any)
        }
        case schema.basetype === 'array':
            return newValue([], parent, schema)
        default: return newValue(getEmptyValue(schema), parent, schema)
    }
}

/**
 * find in the ancestors of an element a webcomponent matching a given selector
 * @param selector selector to matching the searched element
 * @param el element from which to start searching  
 * @returns Element corresponding to selector, null otherwise
 */

export function closestAscendantFrom(selector:string, item: Element): Element | null {
    if (item instanceof Element) {
        const elem = item.assignedSlot ?? item 
        const found = elem.closest(selector)
        const parent = (elem.getRootNode() as ShadowRoot).host
        return found ?? closestAscendantFrom(selector, parent);
    }
    return null
}

//const schemaValidate = ajv.compile(draft)
//const schemaValidate = ajv.getSchema("http://json-schema.org/draft-07/schema#")
export function validateSchema(_data: any) {
    return true
    // MBZ-TOFIX return schemaValidate ? schemaValidate(data) : false
}

export function validateErrors() {
    return []
    // MBZ-TOFIX Ajvi18n(schemaValidate?.errors)
    // MBZ-TOFIX return schemaValidate?.errors
}

class ErrorObject {

    get instancePath() {
        return "/a/b/c";
    }

}

export class DataValidator {
    // MBZ-TOFIX parser: ValidateFunction
    constructor(_schema: Pojo) {
        // MBZ-TOFIX this.parser = ajv.compile(schema)
    }
    validate(_value: any): boolean {
        // MBZ-TOFIX const result = this.parser(value)
        // MBZ-TOFIX if (typeof result === 'boolean') return result
        return true
        // MBZ-TOFIX throw (`NE DOIT JAMAIS ARRIVER`)
    }
    errors(): ErrorObject[] | null | undefined {
        // MBZ-TOFIX return this.parser.errors
        return null
    }

    errorsText(_errors: ErrorObject[] | null | undefined): string {
        // MBZ-TOFIX Ajvi18n(errors)
        // MBZ-TOFIX return ajv.errorsText(errors)
        return 'an error message'
    }
}

/**
 * get the schema corresponding to a jsonpointer (absolute or relative)
 * @param root root schema for absolute pointer
 * @param current current schema for relative pointer
 * @param pointer pointer to dereference
 * @returns 
 */
export function derefPointerSchema(root: Pojo, current: Pojo, pointer: string): Pojo | null {
    const tokens = pointer.split(/\//)
    const relative = /^\d+$/.test(tokens[0])
    let base = relative ? current : root
    if (relative) {
        const count = parseInt(tokens[0])
        for (let i = 0; i < count; i++) base = base.parent
        if (!base) {
            console.error(`in context ${current.pointer} enable to dereference pointer ${pointer} (not enough ascendant')`)
            return null
        }
    }
    tokens.shift()
    for (const token of tokens) {
        const prev = base
        base = (token === '*') ? base.items : base.properties[token]
        if (!base) {
            console.error(`in context ${current.pointer} enable to dereference pointer ${pointer}(property '${token}' not found in ${prev.pointer})`)
            return null
        }
    }
    return base
}

/**
 * get the data corresponding to a jsonpointer (absolute or relative)
 * @param root root data for absolute pointer
 * @param parent current data for relative pointer
 * @param pointer pointer to dereference
 * @returns 
 */
export function derefPointerData(root: Pojo, parent: Pojo, key: string | number, pointer: string): any {
    const tokens = pointer.split(/\//)
    const relative = /^\d+$/.test(tokens[0])
    let base = relative ? parent : root
    if (relative) {
        const count = parseInt(tokens[0])
        if (count === 0) {
            base = base[key]
        } else {
            for (let i = 1; i < count; i++) base = getParent(base)
        }
        if (!base) {
            console.error(`enable to dereference pointer ${pointer} (no more parents)`)
            return null
        }
    }
    tokens.shift()
    for (const token of tokens) {
        if (base == null || !["array", "object"].includes(typeof base)) return undefined
        const key = /^\d+$/.test(token) ? parseInt(token) : token
        base = base[key]
    }
    return base

}

export function pointerData(parent: Pojo | null, key: string | number | null, prev = ""): string {
    if (!parent) return (key != null ? String(key) : "")
    if (!key) return ""
    const root = getRoot(parent)
    prev = key + ((prev === "") ? "" : "/" + prev);
    if (root == parent) return "/" + prev
    return pointerData(getParent(parent), prev)
}

export function pointerSchema(parent?: JSONSchema, property?: string, prev = ""): string {
    if (!parent) return (property ? property : "")
    if (!property) return ""
    const root = parent.root
    prev = property + ((prev === "") ? "" : "/" + prev);
    if (root == parent) return "/" + prev
    return pointerSchema(parent.parent, prev)
}

const SCHEMASYM = Symbol("FZ_FORM_SCHEMA")
const PARENTSYM = Symbol("FZ_FORM_PARENT")
const ROOTSYM = Symbol("FZ_FORM_ROOT")

function setHiddenProperty(data: any, property: symbol, value: any) {
    if (data && typeof data === "object" && value) {
        Object.defineProperty(data, property, {
            enumerable: false,
            value: value,
            writable: true,
        })
    }
    return data
}

// export function initChild(data: any, parent: any , schema: Pojo) {
//     setSchema(data,schema)
//     setParent(data,parent)
//     setRoot(data,getRoot(parent))
//     return data
// }

export function newValue(value: any, parent: any, schema: Pojo) {
    setSchema(value, schema)
    setParent(value, parent)
    setRoot(value, getRoot(parent))
    return value
}


export function setSchema(data: any, schema: Pojo) {
    return setHiddenProperty(data, SCHEMASYM, schema)
}

export function getSchema(data: any) {
    return data?.[SCHEMASYM]
}

export function setParent(data: any, parent: any) {
    return setHiddenProperty(data, PARENTSYM, parent)
}

export function getParent(data: any): any {
    return data[PARENTSYM]
}

export function setRoot(data: any, root: any) {
    return setHiddenProperty(data, ROOTSYM, root)
}

export function getRoot(data: any): any {
    return data[ROOTSYM]
}

/**
    * stringify method to remove circular references in JSON object
    * @param key key of the attribute to find
    * @param value value of the attribute to replace
    *
*/
export function getCircularReplacer(key: any, value: any) {
    if (key === 'root') return undefined
    if (key === 'parent') return undefined
    return value;
}

export function isEmptyValue(value: any): boolean {
    if (value === undefined) return true
    if (value === null) return true
    if (value === "") return true
    if (typeof value === 'object') return Object.keys(value).every(key => value[key] === undefined)
    if (Array.isArray(value)) return value.length === 0
    return false
}

export function getEmptyValue(schema: Pojo) {
    if (!schema) return undefined
    if (schema.basetype == 'array') return []
    if (schema.basetype == 'object') return {}
    // const is a special case (emptyValue is same as not empty)
    if (schema.const) return schema.const
    return schema.nullAllowed ? null : undefined
}

/**
 * default abstract calculator
 * @param schema shema of the value to abstract
 * @param schema value abstract
 */
export function abstract(schema: Pojo, value: any): string {
    switch (true) {
        case schema == null || isEmptyValue(value) || value == null: return '~'
        case Array.isArray(value):
            return (value as Array<any>)
                .map((item: any) => item ? abstract(schema.items, item) : item)
                .filter((v: any) => v)
                .join(',')
        case typeof value === 'object':
            return schema.properties ? Object.keys(schema.properties)
                .filter((property: string) => !(value[property] == null))
                .map((property: string) => abstract(schema.properties[property], value[property]))
                .join(',') : ""
        default: return value
    }
}

export function formatMsg(key: string, input?: HTMLInputElement): string {
    switch (key) {
        case 'valueMissing':
            return `mandatory`
        case 'badInput':
            return `incorrect value`
        case 'patternMismatch':
            return `invalid pattern=${input ? input.getAttribute('pattern') : '?'})`
        case 'tooLong':
            return `too long (max=${input ? input.getAttribute('maxlength') : '?'})`
        case 'tooShort':
            return `too short (min=${input ? input.getAttribute('minlength') : '?'})`
        case 'rangeOverflow':
            return `range overflow (max= ${input ? input.getAttribute('max') : '?'})`
        case 'rangeUnderflow':
            return `range underflow (min=${input ? input.getAttribute('min') : '?'})`
        case 'stepMismatch':
            return `step mismatch (pas=${input ? input.getAttribute('step') : '?'})`
        case 'customError':
            return `custom error`
        case 'typeMismatch':
            return `syntax error`
        default: return ''
    }
}

export function cleanJSON(data: Pojo) {
    // we avoid returning object having only nullish values , or empty arrays
    const replacer = function (this: any, name: string, value: any) {
        const schema = getSchema(value)
        const pschema = getSchema(this)
        if (pschema?.properties?.[name]?.transient) return undefined
        if (schema && Array.isArray(value) && value.length === 0) {
            return schema.nullAllowed ? null : undefined
        }
        if (schema && value != null && typeof value === "object" && Object.keys(value).every(key => value[key] == null)) {
            return schema.nullAllowed ? null : undefined
        }
        return value;
    }
    const jsonstr = JSON.stringify(data, replacer)
    const jsonobj = jsonstr == null ? null : JSON.parse(jsonstr)
    return jsonobj
}

(window as any).nvl = function nvl(templates: { raw: readonly string[] | ArrayLike<string> }, ...values: any[]) {
    const cleaned = values.map(v => v ?? '')
    return String.raw(templates,cleaned)
}
