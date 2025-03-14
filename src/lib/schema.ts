import { isArray, isEmptyValue, isObject, isPrimitive, newValue } from "./tools";
import { EnumItem, ExprFunc, FieldOrder, Pojo } from "./types";


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
    pointer!: string
    nullAllowed?: boolean;
    transient?: boolean;
    observers!: string[];
    target!: string[];
    enumRef?: string;
    isenum!: boolean;
    filter?: Function;
    isenumarray!: boolean;
    homogeneous!: boolean;
    requiredWhen!: string | Function;
    field!: string;
    refTo?: string | ExprFunc<any>;
    order?: FieldOrder[];
    abstract?: string | ExprFunc<string>;
    case?: string | ExprFunc<boolean>;
    visible?: string | ExprFunc<boolean>;
    readonly?: string | ExprFunc<boolean>;
    collapsed?: string | ExprFunc<boolean>;
    orderBy?: string | ExprFunc<any>;
    expression?: string | ExprFunc<any>;
    change?: string | ExprFunc<any>;
    nullable!: boolean;
    addTo?: boolean;
    assets?: string;
    preview?: boolean;
    mimetype?: string;
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
            case isPrimitive(this,true) && 'default' in this:
                return this.default
            case this.basetype === 'object': {
                return Object.entries(this.properties as Pojo).reduce((object, [key, property]) => {
                    if (property.default)
                        object[key] = newValue(JSON.parse(JSON.stringify(property.default)), object, property)
                    else
                        object[key] = object.required?.includes[key] ? property._default(object) : newValue(property.empty(), object, property)
                    return object
                }, newValue({}, parent, this) as any)
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
     * observers function parse expression to extract observed values and set observers
     * array in corresponding schema.
     * a value is observed by using the pointer dereference operation in expresions: $`#/a/b/c`
     * the observer is the Object desribed by the schema and the objserved value is the value 
     * pointed by $`...`
     * @param root schema for absolute pointers in expr
     * @param current schema for relative pointer in expr
     * @param expr function body or arrow function body to parse 
     */
    _addObservers(expr: string): void {
        const POINTER_RE = /\$\`([^`]+)`/g
        let matches
        while ((matches = POINTER_RE.exec(expr)) != null) {
            const pointer = matches[1]
            const observedschema = this._deref(pointer)
            if (observedschema != null && !observedschema.observers.includes(this.pointer)) {
                observedschema.observers.push(this.pointer)
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
        if (isObject(schema.properties)) Object.values(schema.properties).forEach((child)  => Schema.wrapSchema(child)) 
        if (isArray(schema.items))  schema.items.forEach((child)  => Schema.wrapSchema(child)) 
        if (isObject(schema.items)) Schema.wrapSchema(schema.items)
        if (isArray(schema.oneOf)) schema.oneOf.forEach((child)  => Schema.wrapSchema(child)) 
        if (isArray(schema.anyOf)) schema.anyOf.forEach((child)  => Schema.wrapSchema(child)) 
        if (isArray(schema.allOf)) schema.allOf.forEach((child)  => Schema.wrapSchema(child)) 
        if (schema.not) Schema.wrapSchema(schema.not)
        return schema as Schema
    }

    static inferEnums(schema: Schema): EnumItem[] | undefined {
        // Exclude nullish schema, "array" and "object" from being enums
        if (!isObject(schema) || !isPrimitive(schema,true)) return;

        // Direct "enum" keyword
        if (isArray(schema.enum)) {
            return schema.enum.map(value => ({ value, title: String(value) }));
        }

        // "const" keyword (supports primitives, objects, and arrays)
        if (schema.const !== undefined) {
            const value = schema.const
            const title =  String(schema.title ?? schema.const)
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

export abstract class CompilationStep {

    private static sourceCount = 1

    readonly root: Schema
    readonly property: keyof Schema

    constructor(root: Schema, property: keyof Schema) {
        this.root = root
        this.property = property
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

    error(message: string) {
        return Error(`Compilation step ${this.property}: ${message} `)
    }
}

export function isenumarray(schema: Pojo) {
    if (schema.basetype === 'array' && schema.uniqueItems) {
        if (schema.items.oneOf) return !!schema.items.oneOf.every((sch: Pojo) => 'const' in sch)
        else if (schema.items.anyOf) return !!schema.anyOf.every((sch: Pojo) => 'const' in sch)
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

export const DEFAULT_SCHEMA = new Schema({ type: "object", "properties": {} })
export const EMPTY_SCHEMA = new Schema({})


