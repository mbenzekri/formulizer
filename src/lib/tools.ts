import { Pojo, Sandbox } from "../lib/types"
import { Schema } from "../lib/schema"

export function notNull<A>(value:A): value is Exclude<A,null|undefined>
{
    return value != null
}

export function isNull(value:any): value is null|undefined
{
    return value == null
}

export function isString(value: any,and_notempty=false): value is string {
    if (typeof value !== "string") return false
    if (and_notempty) value.length > 0
    return true
}

export function isNumber(value: any): value is number {
    return typeof value === "number" && !isNaN(value)
}

export function isBoolean(value: any): value is boolean {
    return typeof value === "boolean" 
}


export function isObject(value: unknown,and_notempty=false): value is Record<string,any> {
    if (value == null || typeof value !== "object" || Array.isArray(value)) return false
    if (and_notempty) Object.values(value).some(v => v !== undefined)
    return true
}

export function isArray(value: any,and_notempty = false): value is Array<any> {
    if (!Array.isArray(value)) return false
    if (and_notempty) return value.length > 0
    return true
}

export function isFunction(value: unknown): value is Function {
    return typeof value === "function"
}


const primitivetypes = new Set<string>(['string', 'integer', 'number', 'boolean'])
const primitiveornulltypes = new Set<string>(['string', 'integer', 'number', 'boolean', 'null'])

export function isPrimitive(schema?: Schema): boolean;
export function isPrimitive(schema?: Schema, ornull?: boolean): boolean;
export function isPrimitive(type?: string): type is ('string' | 'integer' | 'number' | 'boolean' | 'array');
export function isPrimitive(type?: string, ornull?: true): type is ('string' | 'integer' | 'number' | 'boolean' | 'null');
export function isPrimitive(value?: string | Schema, ornull?: boolean) {
    if (!ornull  && isObject(value) && value.target.every(t => primitivetypes.has(t))) return true  
    if (ornull  && isObject(value) && value.target.every(t => primitiveornulltypes.has(t))) return true  
    if (!ornull && typeof value == "string" && primitivetypes.has(value)) return true
    if (ornull && typeof value == "string" && primitiveornulltypes.has(value)) return true
    return false
}

export function when<T>(test:any,value: T) {
    if (test) return value
    return ''
}

export function isCollection(schema?: Schema): boolean {
    if (isObject(schema) && ["object","array]"].includes(schema.basetype)) return true  
    return false
}


export function intersect(sets: Set<string>[]): Set<string> {
    return sets.reduce((acc, set) => new Set([...acc].filter(x => set.has(x))), sets[0]);
}

export function complement(set: Set<string>|null,full: Set<string>): Set<string> {
    if (set == null) return new Set()
    return new Set([...full].filter(x => !set.has(x)));
}
export function union(sets: Set<string>[]): Set<string> {
    return sets.reduce((acc, set) => new Set([...acc, ...set]), new Set());
}    


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

export function newSandbox(schema:Schema, value: any, parent: any, key: string|number|undefined, $: Function, appdata:any): Sandbox & Record<string,any> {
    return {
        // Whitelist of provided global objects
        document: null, window:null,
        undefined, Infinity,NaN,
        // Core constructors and types (without Function)
        Object, Array, Number, Boolean, String, Error,
        // Utility objects & functions
        Math, JSON, parseInt, parseFloat, isNaN, isFinite,
        schema, value, parent, key, $, appdata
    }
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
    let base: Pojo|undefined = relative ? parent : root
    if (relative) {
        const count = parseInt(tokens[0])
        if (count === 0) {
            base = base[key] as Pojo
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
        base = base[key] as Pojo
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

export function pointerSchema(parent?: Schema, property?: string, prev = ""): string {
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

export function newValue(value: any, parent: any, schema: Schema): Pojo {
    setSchema(value, schema)
    setParent(value, parent)
    setRoot(value, getRoot(parent))
    return value
}


export function setSchema(data: any, schema: Schema) {
    return setHiddenProperty(data, SCHEMASYM, schema)
}

export function getSchema(data: any): Schema {
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
            return undefined
        }
        if (schema && value != undefined && typeof value === "object" && Object.keys(value).every(key => value[key] === undefined)) {
            return undefined
        }
        return value;
    }
    const jsonstr = JSON.stringify(data, replacer)
    const jsonobj = jsonstr == null ? undefined : JSON.parse(jsonstr)
    return jsonobj
}

(window as any).nvl = function nvl(templates: { raw: readonly string[] | ArrayLike<string> }, ...values: any[]) {
    const cleaned = values.map(v => v ?? '')
    return String.raw(templates, cleaned)
}

export function setGlobalHandler(target: EventTarget, event: string, value: string | null) {
    if (value) {
        const fn = (window as any)[value]; // Look up the function in the global scope
        if (typeof fn === 'function') {
            target.addEventListener(event, fn)
        }
    }
}

