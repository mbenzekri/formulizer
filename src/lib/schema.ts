import { isArray, isEmptyValue, isObject, isPrimitive, isString, newValue, notNull } from "./tools";
import { EnumItem, ExprFunc, FieldOrder, FromObject } from "./types";


// // Define the method structure as a Type
// type SchemaMethods = {
//     _abstract(this: Schema, value: any): string;
//     _default(this: Schema, parent: any): any;
//     _deref(this: Schema, pointer: string): Schema | undefined;
//     _toJSON(this: Schema): string;
//     _wrapSchema(schema: JSONSchema, parent?: JSONSchema, name?: string): Schema | undefined;
// };

export class JSONSchema {
    [key: string]: any
}
const SchemaAnnotation = ["parent", "root",]
type SchemaPrimitive = "null" | "boolean" | "object" | "array" | "number" | "string" | "integer"

class JSONSchemaDraft07 {
    $id?: string;
    $schema?: string;
    $ref?: string;
    $comment?: string;

    type?: SchemaPrimitive | SchemaPrimitive[];
    enum?: (string | number | boolean | null)[];
    const?: any;

    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    maxLength?: number;
    minLength?: number;
    pattern?: string;

    items?: Schema;//  | Schema[];                      // tuple case NOT IMPLEMENTED : TO BE FIXED LATER
    additionalItems?: Schema;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: Schema;

    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    properties?: Record<string, Schema>;
    patternProperties?: Record<string, Schema>;         // IGNORED by formulizer (except for validation)
    additionalProperties?: boolean | Schema;            // IGNORED by formulizer (except for validation)
    dependencies?: Record<string, Schema | string[]>;
    propertyNames?: Schema;

    if?: Schema;
    then?: Schema;
    else?: Schema;

    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    not?: Schema;

    definitions?: Record<string, Schema>;
    title?: string;
    description?: string;
    default?: any;
    examples?: any[];
    format?: string;

    // Fz Annotations
    root!: Schema;
    parent?: Schema;
    basetype!: string;
    empty!: null | undefined;
    pointer!: string
    nullAllowed?: boolean;
    transient?: boolean;
    trackers!: string[];
    target!: string[];
    enumFetch?: string;
    isenum!: boolean;
    filter?: Function;
    isenumarray!: boolean;
    homogeneous!: boolean;
    requiredIf!: string | Function;
    field!: string;
    from?: { pointer: string, extend: boolean } | ExprFunc<any>;
    order?: FieldOrder[];
    abstract?: string | ExprFunc<string>;
    case?: string | ExprFunc<boolean>;
    visible?: string | ExprFunc<boolean>;
    readonly?: string | ExprFunc<boolean>;
    collapsed?: boolean | ExprFunc<boolean>;
    orderBy?: string | ExprFunc<any>;
    expression?: string | ExprFunc<any>;
    change?: string | ExprFunc<any>;
    nullable!: boolean;
    assets?: string;
    preview?: boolean;
    mimetype?: string;
    mask?: string;

    tab?: string;
    group?: string;
}

export const FZ_FORMATS = ["color", "signature", "password", "doc", "uuid", "geo", "markdown", "asset", "date", "time", "date-time", "email","barcode"]
export const FZ_KEYWORDS = [
    "root",
    "parent",
    "basetype",
    "pointer",
    "nullAllowed",
    "transient",
    "trackers",
    "target",
    "enumFetch",
    "isenum",
    "filter",
    "isenumarray",
    "homogeneous",
    "requiredIf",
    "field",
    "from",
    "order",
    "abstract",
    "case",
    "visible",
    "readonly",
    "collapsed",
    "orderBy",
    "expression",
    "change",
    //"nullable",
    "assets",
    "preview",
    "mimetype",
    "mask",
    "tab",
    "group",
]

export function isSchema(value: unknown): value is Schema {
    return notNull(value) && value instanceof Schema
}


export function isFrom(value: unknown): value is FromObject {
    if (!isObject(value)) return false
    if (!isString(value.pointer)) return false
    if (!isString(value.name)) return false
    if (!isArray(value.target)) return false
    if (!isSchema(value.schema)) return false
    return true
}

// Define the prototype separately with explicit type annotation
export class Schema extends JSONSchemaDraft07 {

    constructor(schema: JSONSchema) {
        super();
        return Schema.wrapSchema(schema)
    }
    /**
     * default abstract calculation
     */
    _abstract(value: any): string {
        if (isEmptyValue(value) || value == null) return '~'

        if (isArray(value) && this.items instanceof Schema && this.items != null) {
            const items = this.items
            return (value)
                .map((item) => items._abstract(item))
                .filter((v: any) => v)
                .join(',')
        }
        if (isArray(value) && isArray(this.items)) {
            //const items = this.items
            return ''
        }
        if (isObject(this.properties)) {
            const properties = this.properties
            return this.properties ? Object.keys(this.properties)
                .filter((property: string) => value[property] != null)
                .map((property: string) => properties[property]._abstract(value[property]))
                .join(',') : ""
        }

        return String(value)
    }
    static _abstractFunc() {
        return (schema: Schema, value: any) => schema._abstract(value)
    }
    _default(parent: any): any {
        switch (true) {
            case ("const" in this):
                return this.const
            case isPrimitive(this, true) && 'default' in this:
                return this.default
            case this.basetype === 'object': {
                return this.properties ? Object.entries(this.properties).reduce((object, [key, property]) => {
                    if (property.default)
                        object[key] = newValue(JSON.parse(JSON.stringify(property.default)), object, property)
                    else
                        object[key] = object.required?.includes[key] ? property._default(object) : newValue(property._empty(), object, property)
                    return object
                }, newValue({}, parent, this) as any) : {}
            }
            case this.basetype === 'array':
                return newValue([], parent, this)
            default: return newValue(this._empty(), parent, this)
        }
    }
    /**
     * get the schema corresponding to a jsonpointer (absolute or relative)
     * @param root root schema for absolute pointer
     * @param current current schema for relative pointer
     * @param pointer pointer to dereference
     * @returns 
     */
    _deref(pointer: string): Schema | undefined {
        const tokens = pointer.split(/\//)
        const relative = /^\d+$/.test(tokens[0])
        let base: Schema | undefined = relative ? this : this.root as Schema
        if (relative) {
            const count = parseInt(tokens[0])
            for (let i = 0; i < count; i++) base = base?.parent
            if (!base) {
                console.error(`in context ${this.pointer} enable to dereference pointer ${pointer} (not enough ascendant')`)
                return
            }
        }
        tokens.shift()
        for (const token of tokens) {
            const prev = base
            base = (token === '*') ? base.items : base.properties?.[token]
            if (!base) {
                console.error(`in context ${this.pointer} enable to dereference pointer ${pointer}(property '${token}' not found in ${prev.pointer})`)
                return
            }
        }
        return base
    }
    /**
     * trackers function parse expression to extract watched values and set trackers
     * array in corresponding schema.
     * a value is watched by using the pointer dereference operation in expresions: $`/a/b/c`
     * the tracker is the Object desribed by the schema and the objserved value is the value 
     * pointed by $`...`
     * @param root schema for absolute pointers in expr
     * @param current schema for relative pointer in expr
     * @param expr function body or arrow function body to parse 
     */
    _track(expr: string): void {
        const POINTER_RE = /\$\`([^`]+)`/g
        let matches
        while ((matches = POINTER_RE.exec(expr)) != null) {
            const pointer = matches[1]
            const trackedSchema = this._deref(pointer)
            if (trackedSchema != null && !trackedSchema.trackers.includes(this.pointer)) {
                trackedSchema.trackers.push(this.pointer)
            }
        }
    }

    _toJSON() {

        return JSON.stringify(this,
            (key: any, value: any) => SchemaAnnotation.includes(key) ? undefined : value
        )
    }

    static wrapSchema(schema: JSONSchema) {
        Object.setPrototypeOf(schema, Schema.prototype)
        if (isObject(schema.properties)) Object.values(schema.properties).forEach((child) => Schema.wrapSchema(child))
        if (isArray(schema.items)) schema.items.forEach((child) => Schema.wrapSchema(child))
        if (isObject(schema.items)) Schema.wrapSchema(schema.items)
        if (isArray(schema.oneOf)) schema.oneOf.forEach((child) => Schema.wrapSchema(child))
        if (isArray(schema.anyOf)) schema.anyOf.forEach((child) => Schema.wrapSchema(child))
        if (isArray(schema.allOf)) schema.allOf.forEach((child) => Schema.wrapSchema(child))
        if (schema.not) Schema.wrapSchema(schema.not)
        return schema as Schema
    }

    static inferEnums(schema: Schema): EnumItem[] | undefined {
        // Exclude nullish schema, "array" and "object" from being enums
        if (!isObject(schema) || !isPrimitive(schema, true)) return;

        // Direct "enum" keyword
        if (isArray(schema.enum)) {
            return schema.enum.map(value => ({ value, title: String(value) }));
        }

        // "const" keyword (supports primitives, objects, and arrays)
        if (schema.const !== undefined) {
            const value = schema.const
            const title = String(schema.title ?? schema.const)
            return [{ value, title }];
        }

        // "oneOf" / "anyOf" with `const` values
        if (Array.isArray(schema.oneOf)) {
            return schema.oneOf.flatMap(item => Schema.inferEnums(item) ?? []);
        }

        if (Array.isArray(schema.anyOf)) {
            return schema.anyOf.flatMap(item => Schema.inferEnums(item) || []);
        }

        // "allOf": If one of the subschemas defines an enum, use that
        if (Array.isArray(schema.allOf)) {
            for (const subschema of schema.allOf) {
                const values = Schema.inferEnums(subschema);
                if (values) return values;
            }
        }
        // Exclude values from `not` (Negation)
        if (schema.not) {
            const excluded = Schema.inferEnums(schema.not) ?? [];
            return Schema.inferEnums(schema)?.filter(item => !excluded.some(e => e.value === item.value))
        }

        return;
    }

    _empty() {
        if (this.basetype == 'array') return []
        if (this.basetype == 'object') return {}
        // const is a special case (emptyValue is same as not empty)
        if (this.const) return this.const
        return this.nullAllowed ? null : undefined
    }

}
export type CompilationPhase = "upgrade" | "pre" | "post"

export abstract class CompilationStep {

    private static sourceCount = 1
    constructor(readonly root: Schema, readonly property: keyof Schema, readonly phase: CompilationPhase, readonly after: (keyof Schema)[]) {
        // only properties to init
    }
    appliable(_schema: JSONSchema, _parent?: JSONSchema, _name?: string): boolean {
        // default applied on all schemas
        return true
    }

    /**
     * @param schema shema to compile the property
     * @param parent parent schema to compile containing propery <name> the property
     * @param name name of the property to compile in <parent> 
     */
    abstract apply(schema: JSONSchema, parent?: JSONSchema, name?: string): void;

    sourceURL(dataProperty?: string) {
        let source = `_FZ_${this.property}_${dataProperty ?? ''}_${CompilationStep.sourceCount++}.js`.replace(/ +/g, "_")
        source = source.replace(/[^a-z0-9_]/ig, "")
        console.log(`builded source :${source}`)
        return `\n    //# sourceURL=${source}\n`
    }
    set(schema: Schema, value: any, expr?: string | any[]) {
        (schema as any)[this.property] = value
        if (expr) schema[this.property].expresion = expr
    }
    compileExpr(schema: Schema, expression: string | any[], body: string) {
        const arrexpr = isString(expression) ? [expression] : expression
        try {
            arrexpr.forEach(expr => schema._track(expr))
            this.set(schema, new Function("schema", "value", "parent", "property", "$", "userdata", body), expression)
        } catch (e) {
            throw Error(`compilation for keyword ${this.property} failed schema:${schema.pointer}\n    - ${String(e)}`)
        }
    }
    buildCode(expression: any[]) {
        const lines = expression.map((expr: any, i: any) =>
            `    const cst${i} = \`${expr}\n\``
        )
        lines.push(
            `    return ( ${expression.map((_e: any, i: number) => `cst${i}`).join(' + ')} ) `
        )
        return lines.join(';\n')
    }

    error(message: string) {
        return Error(`Compilation step ${this.property}: ${message} `)
    }
}

export function isenumarray(schema: Schema) {
    if (schema.basetype === 'array' && schema.uniqueItems) {
        if (schema.items?.oneOf) return !!schema.items.oneOf.every((sch) => 'const' in sch)
        else if (schema.items?.anyOf) return !!schema.items?.anyOf.every((sch) => 'const' in sch)
    }
    return false
}

export const schemaAttrConverter = {
    fromAttribute(value: string | null): Schema {
        try {
            return value != null ? new Schema(JSON.parse(value)) : DEFAULT_SCHEMA
        } catch (error) {
            console.error('fromAttribute:JSON parsing error:', error)
        }
        return DEFAULT_SCHEMA
    },
    toAttribute(value: Schema): string | null {
        try {
            return value != null ? value._toJSON() : null;
        } catch (error) {
            console.error('toAttribute: JSON stringifycation failure:', error)
            return null
        }
    }
}

export const DEFAULT_SCHEMA = new Schema({ type: "object", properties: {}, collapsed: false })
export const EMPTY_SCHEMA = new Schema({})


