import { Pojo, FieldOrder, ExprFunc, JSONSchema } from "./types"
import { derefPointerSchema, pointerSchema, isprimitive, isenumarray, abstract, derefPointerData} from "./tools";
import { setSchema,setParent,setRoot} from "./tools"

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
export function observers(root: JSONSchema, current: JSONSchema, expr: string): void {
    if (!root || !current) return
    const POINTER_RE = /\$\`([^`]+)`/g
    let matches
    while ((matches = POINTER_RE.exec(expr)) != null) {
        const pointer = matches[1]
        const observedschema = derefPointerSchema(root, current, pointer)
        if (observedschema && !observedschema.observers.includes(current.pointer)) observedschema.observers.push(current.pointer)
    }
}

/**
 * class to compile schema for fz-form 
 * compilation process is a in-depth walkthrough schema applying in order all 
 * the compile time actions
 *  !!! be carefull action order is primordial
 */

export class SchemaCompiler {
    readonly root: JSONSchema
    readonly steps_pass1: CompilationStep[]
    readonly steps_pass2: CompilationStep[]
    errors: string[] = []
    constructor(root: JSONSchema, options: any, data: Pojo) {
        this.root = root
        this.steps_pass1 = [
            new CSDefinition(this.root),
            new CSTargetType(this.root,),
            new CSAppEnum(this.root,options,),
            new CSEnum(this.root,),
            new CSEnumArray(this.root,),
            new CSUniform(this.root,), 
            new CSObservers(this.root,),
            new CSParent(this.root,),
            new CSPointer(this.root,),
            new CSRoot(this.root),
            new CSRequiredWhen(this.root,),
            new CSField(this.root),
            new CSOrder(this.root),
        ]
        this.steps_pass2 = [
            new CSInsideRef(this.root, data),
            new CSTemplate(this.root,'abstract',abstract),
            new CSBool(this.root,'case',() => false),
            new CSBool(this.root,'visible',() => true),
            new CSBool(this.root,'readonly',() => false),
            new CSBool(this.root,'requiredWhen',() => false),
            new CSBool(this.root,'collapsed',() => false),
            new CSBool(this.root,'filter', () => true),
            new CSAny(this.root,'orderBy',() => true),
            new CSAny(this.root,'expression',() => ''),
            new CSAny(this.root,'change',() => ''),

        ]

    }
    compile() {
        this.errors = []
        this.walkSchema(this.steps_pass1, this.root)
        this.walkSchema(this.steps_pass2, this.root)
        return this.errors
    }

    walkSchema(steps: CompilationStep[], schema: JSONSchema, parent?: JSONSchema, name?: string): void {

        for (const step of steps) {
            try {
                if (step.appliable(schema, parent, name)) {
                    step.apply(schema, parent, name)
                }
            } catch (e) {
                this.errors.push(String(e))
            }
        }
        if (schema.properties) return Object.entries(schema.properties as JSONSchema[]).forEach(
            ([name, child]) => this.walkSchema(steps, child, schema, name))
        if (schema.items) {
            if (schema.items.oneOf) return this.walkSchema(steps, schema.items, schema, '*')
            if (schema.items.allOf) return this.walkSchema(steps, schema.items, schema, '*')
            if (schema.items.anyOf) return this.walkSchema(steps, schema.items, schema, '*')
            return this.walkSchema(steps, schema.items, schema, '*')
        }
        if (schema.oneOf) return schema.oneOf.forEach((child: Pojo) => this.walkSchema(steps, child, parent, name))
        if (schema.allOf) return schema.allOf.forEach((child: Pojo) => this.walkSchema(steps, child, parent, name))
        if (schema.anyOf) return schema.anyOf.forEach((child: Pojo) => this.walkSchema(steps, child, parent, name))
    }

}

export abstract class CompilationStep {

    private static sourceCount = 1

    readonly root: JSONSchema
    readonly property: string

    constructor(root: JSONSchema, property: string) {
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
        let source = `_FZ_${this.property}_${ dataProperty ?? ''}_${CompilationStep.sourceCount++}.js`.replace(/ +/g,"_")
        source = source.replace(/[^a-z0-9_]/ig,"")
        console.log(`builded source :${source}`)
        return `\n    //# sourceURL=${source}\n`
    }

    error(message: string) {
        return Error(`Compilation step ${this.property}: ${message} `)
    }
}


/**
 * Replace schemas defined by reference ($ref) by their real 
 * definition (by copy)).
 */
class CSDefinition extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"$ref")
    }

    override apply(schema: JSONSchema): void {
        const properties: { [key: string]: any } = schema.properties
        properties && Object.entries(properties).forEach(
            ([pname, pschema]) => pschema.$ref && (properties[pname] = this.definition(pschema))
        )
        schema.items && schema.items.$ref && (schema.items = this.definition(schema.items))
        schema.items && schema.items.oneOf && (schema.items.oneOf = schema.items.oneOf.map((schema: Pojo) => schema.$ref ? this.definition(schema) : schema))
    }

    definition(schema: JSONSchema) {
        const ref = schema.$ref as string
        if (!ref.startsWith("#/definitions/"))
            throw this.error(`only '#/definitions/<name>' allowed => ${ref}]`)
        if (!this.root.definitions)
            throw this.error(`No "definitions" property in root schema`)
        const defname = ref.split("/")[2];
        if (defname in this.root.definitions) {
            const deforig: Pojo = this.root.definitions[defname]
            const defcopy: Pojo = Object.assign({}, deforig)
            Object.entries(schema).forEach(([n, v]) => (n !== '$ref') && (defcopy[n] = v))
            return defcopy
        }
        throw this.error(`No definitions found in schema for ${ref}`)
    }
}

/**
 * Adds a string property 'basetype' wich identify basetype (not null)
 * @param schema shema to comp base type
 */
class CSTargetType extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"basetype")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema)
    }

    override apply(schema: JSONSchema, parent?: JSONSchema, name?: string) {
        if (Array.isArray(schema.type) && parent && name) {
            if (schema.type.length > 2) {
                throw Error(`multiple types not implemented : ${pointerSchema(parent, name)}`)
            }

            if (!schema.type.includes("null")) {
                throw Error(`Second type must be "null" : ${pointerSchema(parent, name)}`)
            }
            schema.basetype = schema.type.find(t => t !== "null") ?? "null"
            schema.nullAllowed = true
        }
        else {
            schema.basetype = schema.type
            schema.nullAllowed = false
        }
    }

}
/**
 * Adds a oneOf enum schema obtained through options.ref callback 
 * provided at form initialization
 */
class CSAppEnum extends CompilationStep {
    private options: any

    constructor(root: JSONSchema, options: any) {
        super(root,"enumRef")
        this.options = options
    }

    override appliable(schema: JSONSchema) { // when property absent
        return this.property in schema
    }
    override apply(schema: JSONSchema): void {
        if (!this.options.ref)
            throw Error(`missing 'enumRef' function in options`)
        const list = this.options.ref(schema.enumRef)
        const oneof: any[] = list.map((x: any) => ({ "const": x.value, "title": x.title }))
        schema.oneOf = oneof
    }
}

/**
 * Adds a boolean property 'isenum' true if enumeration detected
 * and only primitive types may be enums
 * 3 flavors : 
 *      (a) having an "enums" property
 *      (b) having an "oneOf" property containing an array of constants
 *      (c) having an "anyOf" property containing an array of constants
 */
class CSEnum extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"isenum")
    }

    override appliable(schema: JSONSchema) { // when property absent
        return !(this.property in schema)
    }
    override apply(schema: JSONSchema): void {
        schema.isenum = false;
        switch (true) {
            // allow only primitive types to be enums
            case !isprimitive(schema.basetype): break
            // it is an enumeration only for one of this cases
            case !!schema.enum:
            case schema.oneOf && schema.oneOf.every((sch: Pojo) => 'const' in sch):
            case schema.anyOf && schema.anyOf.every((sch: Pojo) => 'const' in sch):
                if (!schema.filter) schema.filter = () => true
                schema.isenum = true;
                break
        }
    }

}
/**
 * Adds a boolean property 'isenumarray' true if arry detected
 * and array items is an enum. Only primitive types may be enums
 */
class CSEnumArray extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"isenumarray")
    }

    override appliable(schema: JSONSchema) {  
        return !(this.property in schema)
    }
    override apply(schema: JSONSchema): void {
        schema.isenumarray = isprimitive(schema.basetype) && isenumarray(schema)
    }
}

/**
 * Adds a boolean property 'homogeneous' true if  schema is
 * array and items are of homegeneous type 
 */
class CSUniform extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"homogeneous")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema) && schema.basetype === "array"
    }

    override apply(schema: JSONSchema): void {
        schema.homogeneous = schema.items.oneOf ? false : true
    }
}

/**
 * adds an empty array property 'observers' to each schema
 * this property will contain jsonpath to the value which is 
 * observing the data described by this 'schema' 
 * 
 * observers have to be alerted when changes occurs to the data described 
 * by this schema (see event 'observed-changed' in FzField base class)
 * 
 */
class CSObservers extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"observers")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema)
    }
    override apply(schema: JSONSchema): void {
        schema.observers = []
    }
}

/** 
 * adds a 'parent' property to each schema
 * it store the parent schema of the currently processed schema
 */
class CSParent extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"parent")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema)
    }
    override apply(schema: JSONSchema,parent: JSONSchema): void {
        schema.parent = parent
    }
}


/**
 * Adds a 'pointer' property to each schema
 * this porperty store the schema pointer of currently processed schema
 */
class CSPointer extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"pointer")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema)
    }
    override apply(schema: JSONSchema,parent: JSONSchema, name: string): void {
        schema.pointer = parent ? `${parent.pointer}/${name}` : `#`
    }
}

/**
 * Adds a 'root' property to each schema
 * this property store the root schema 
 */
class CSRoot extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"root")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema)
    }
    override apply(schema: JSONSchema): void {
        schema.root = this.root
    }
}

/**
 * Adds a string property 'requiredWhen' to each schema which is a required field
 * this field will be compiled to getter to manage conditional mandatory values
 */
class CSRequiredWhen extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"requiredWhen")
    }

    override appliable(schema: JSONSchema) {
        return schema.basetype === "object" && schema.properties != null && schema.required != null
    }
    override apply(schema: JSONSchema): void {
        schema.required.forEach((name: any) => {
            if (name in schema.properties) schema.properties[name].requiredWhen = "true"
        })
    }
}


/**
 * Adds a property 'field' with the web component name to be displayed for this schema
 * depending on 'basetype', 'format', 'const', 'isenum', enum values count, ...
 */
class CSField extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"field")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema)
    }

    override apply(schema: JSONSchema) {
        if ("const" in schema) return schema.field = 'fz-constant'
        if (schema.refTo && isprimitive(schema.basetype)) {
            if (!schema.filter) schema.filter = () => true
            return schema.field = 'fz-enum'
        }
        if (schema.isenum) {
            if (!schema.filter) schema.filter = () => true
            switch (true) {
                case schema.enum?.length <= 3: return schema.field = 'fz-enum-check'
                case schema.oneOf?.length <= 3: return schema.field = 'fz-enum-check'
                case schema.anyOf?.length <= 3: return schema.field = 'fz-enum-check'
                case schema.enum?.length <= 20: return schema.field = 'fz-enum'
                case schema.oneOf?.length <= 20: return schema.field = 'fz-enum'
                case schema.anyOf?.length <= 20: return schema.field = 'fz-enum'
                default: return schema.field = 'fz-enum-typeahead'
            }
        }
        switch (schema.basetype) {
            case 'object': return schema.field = 'fz-object'
            case 'array': {
                if (schema.isenumarray) {
                    if (!schema.filter) schema.filter = () => true
                    return schema.field = 'fz-enum-array'
                }
                return schema.field = 'fz-array'
            }
            case 'integer':
                return (schema.minimum && schema.maximum && (schema.maximum - schema.minimum) <= 10)
                    ? schema.field = 'fz-range'
                    : schema.field = 'fz-integer'
            case 'number': return schema.field = 'fz-float'
            case 'boolean': return schema.field = 'fz-boolean'
            case 'string':
                switch (schema.format) {
                    case "uuid": return schema.field = 'fz-uuid'
                    case "signature": return schema.field = 'fz-signature'
                    case "date": return schema.field = 'fz-date'
                    case "time": return schema.field = 'fz-time'
                    case "date-time": return schema.field = 'fz-datetime'
                    case "geo": return schema.field = 'fz-geolocation'
                    case "doc": return schema.field = 'fz-document'
                    case "markdown": return schema.field = 'fz-markdown'
                    case "asset": return schema.field = 'fz-asset'
                }
                if (!schema.format && schema.maxLength > 256) return schema.field = 'fz-textarea'
                return schema.field = 'fz-string'
        }
        return schema.field = 'fz-error'    
    }
}

/**
 * Adds a property 'order' for each schema containing the display order rank
 */
class CSOrder extends CompilationStep {

    constructor(root: JSONSchema) {
        super (root,"order")
    }

    override appliable(schema: JSONSchema) {
        return !(this.property in schema) && schema.basetype === 'object' && schema.properties != null
    }
    override apply(schema: JSONSchema) {
        const properties = schema.properties
        const groupmap: Map<string, number> = new Map()
        const tabmap: Map<string, number> = new Map()
        // order properties with tab and grouping
        let fieldnum = 0
        const fields: FieldOrder[] = Object.entries(properties as Pojo).map(([fieldname, schema]) => {
            // get or affect tab number
            if (schema.tab && !tabmap.has(schema.tab)) tabmap.set(schema.tab, fieldnum)
            const tabnum = schema.tab ? tabmap.get(schema.tab) as number : fieldnum
            // get or affect group number
            if (schema.group && !groupmap.has(schema.group)) groupmap.set(schema.group, fieldnum)
            const groupnum = schema.group ? groupmap.get(schema.group) as number : fieldnum

            return { tabnum, groupnum, fieldnum: fieldnum++, fieldname, schema, tabname: schema.tab, groupname: schema.group }
        })

        fields.sort((fa, fb) => {
            const diff = Math.min(fa.tabnum, fa.groupnum, fa.fieldnum) - Math.min(fb.tabnum, fb.groupnum, fb.fieldnum)
            return (diff === 0) ? fa.fieldnum - fb.fieldnum : diff
        })
        schema.order = fields
    }
}

class CSInsideRef extends CompilationStep {
    private data: Pojo
    constructor(root:JSONSchema, data: Pojo) {
        super(root,"enumRef")
        this.data = data
    }
    override appliable(schema: JSONSchema) {
        return this.property in schema && typeof schema.refTo !== "function"
    }
    override apply(schema: JSONSchema) {
        const refto = schema.refTo as string
        schema.refTo = () => null
        const pointer = refto.replace(/\/[^/]+$/, '')
        const refname = refto.substr(pointer.length + 1)
        observers(this.root, schema, `$('${pointer}'')`)
        schema.refTo = (_schema: Pojo, _value: any, parent: any, property: string, _$: any) => {
            const refarray = derefPointerData(this.data.content, parent, property, pointer)
            if (!refarray) return null
            if (!Array.isArray(refarray)) {
                console.error(`reference list must be an array ${pointer}`)
                return null
            }
            return { pointer, refname, refarray }
        }
    }
}


/**
 * compile a given property written as template literal  
 */
class CSTemplate extends CompilationStep {
    private defunc:  ExprFunc<string>
    constructor(root: JSONSchema,property: string,defunc: ExprFunc<string>) {
        super(root, property)
        this.defunc = defunc
    }
    override appliable(schema: JSONSchema) {
        return this.property in schema && typeof schema[this.property] == "string"
    }
    override apply(schema: JSONSchema, _parent: JSONSchema, name:string) {
        const expression = schema[this.property]
        schema[this.property] = this.defunc
        if (typeof expression == 'string') {
            const code = `
                ${this.sourceURL(name)}
                try { 
                    return nvl\`${expression}\`
                } catch(e) { 
                    console.error(\`unable to produce ${this.property} property due to :\${e.toString()}\`)
                }
                return ''
            `
            try {
                observers(this.root, schema, expression)
                schema[this.property] = new Function("schema", "value", "parent", "property", "$", "userdata", code)
                schema[this.property].expression = expression
            } catch (e) {
                throw Error(`unable to compile ${this.property} expression "${expression}" due to ::\n\t=>${String(e)}`)
            }
        }
    }
}


/**
 * compile a given property written as a function returning boolean  
 */
class CSBool extends CompilationStep {
    private defunc:  ExprFunc<boolean>
    constructor(root: JSONSchema,property: string,defunc: ExprFunc<boolean>) {
        super(root, property)
        this.defunc = defunc
    }
    override appliable(schema: JSONSchema) {
        return this.property in schema && ["string","boolean"].includes(typeof schema[this.property])
    }
    override apply(schema: JSONSchema, _parent: JSONSchema, name: string) {
        const expression = schema[this.property]
        schema[this.property] = this.defunc
        if (typeof expression == 'boolean' || expression === null) {
            schema[this.property] = expression === null ? () => null : () => expression
        } else if (typeof expression == 'string') {
            const code = `
            ${this.sourceURL(name)}
            try {  
                    const result = (${expression}) 

                    return result === null ? result : !!result
                }
                catch(e) {  console.error(\`unable to produce ${this.property} property due to :\n\t=>\${e.toString()}\`) }
                return true
            `
            try {
                observers(this.root, schema, expression)
                schema[this.property] = new Function("schema", "value", "parent", "property", "$", "userdata", code)
                schema[this.property].expression = expression
            } catch (e) {
                throw Error(`unable to compile ${this.property} expression "${expression}" due to ::\n\t=>${String(e)}`)
            }
        }
    }
}


class CSAny extends CompilationStep {
    private defunc:  ExprFunc<any>
    constructor(root: JSONSchema,property: string,defunc: ExprFunc<any>) {
        super(root, property)
        this.defunc = defunc
    }
    override appliable(schema: JSONSchema) {
        return this.property in schema && typeof schema[this.property] !== "function" 

    }
    override apply(schema: JSONSchema, _parent: JSONSchema, name: string) {
        const expression = schema[this.property]
        schema[this.property] = this.defunc
        let code = "return null"
        switch (true) {
            case typeof expression == 'boolean':
                code = expression ? `return true ;` : `return false ;`
                break
            case typeof expression == 'string':
                code = `return ${expression} ;`
                break
            case Array.isArray(expression):
                const lines = expression.map((expr: any, i: any) => `    const cst${i} = \`${expr}\n\``)
                lines.push(`return ( ${expression.map((_e: any, i: number) => `cst${i}`).join(' + ')} );`)
                code = lines.join(';\n')
                break
        }
        const body = `
            try {  
                ${code} 
            }
            catch(e) {  console.error(\`unable to produce ${this.property} property due to :\n\t=>\${e.toString()}\`) }
            return null
            ${this.sourceURL(name)}
        `
        try {
            if (Array.isArray(expression)) expression.forEach((expr: string) => observers(this.root, schema, expr))
            if (typeof expression == 'string') observers(this.root, schema, expression)
            schema[this.property] = new Function("schema", "value", "parent", "property", "$", "userdata", body)
            schema[this.property].expression = expression
        } catch (e) {
            console.error(`unable to compile ${this.property} expression "${expression}" due to ::\n\t=>${String(e)}`)
        }
    }
}

/**
 * class to compile data for fz-form 
 * compilation process is a in-depth walkthrough schema applying in order compile time actions
 * be carefull action order is primordial
 */
export class DataCompiler {
    data: Pojo
    schema: JSONSchema
    steps: ((data: Pojo, schema: JSONSchema, pdata?: Pojo, pschema?: JSONSchema) =>void)[]
    constructor(data: Pojo, schema: JSONSchema) {
        this.data = data
        this.schema = schema
        this.steps = [
            (data, schema, pdata, _pschema) => {
                setSchema(data, schema)
                setParent(data, pdata)
                setRoot(data, this.data.content)
            }
        ]
    }
    compile() {
        this.walkData(this.data.content, this.schema)
    }

    walkData(data: Pojo, schema: Pojo, pdata?: Pojo, pschema?: Pojo) {
        if (schema == null || data == null) return
        this.steps.forEach(action => action(data, schema, pdata, pschema))
        if (Array.isArray(data)) {
            if (schema.homogeneous) {
                data.forEach((item: Pojo) => this.walkData(item, schema.items, data, schema))
            } else {
                data.forEach((item: any, i: any) => {
                    schema.items.oneOf.forEach((schema: any) => {
                        if (schema.case && schema.case(null, item, data, i, () => null)) this.walkData(item, schema, data, schema)
                    })
                })
            }
            return
        }
        if (typeof data === 'object') {
            for (const property in data) {
                const propschema = schema.properties[property]
                this.walkData(data[property], propschema, data, schema)
            }
            return
        }
    }
    
}

(window as any).nvl = function nvl(strarr: string[], ...valarr: any[]) {
    const all: any[] = []
    strarr.forEach((str, i) => (i == 0)
        ? all.push(str)
        : all.push(valarr[i - 1] == null ? '' : valarr[i - 1], str))
    return all.join('')
}
