import { Pojo, FieldOrder, ExprFunc, IOptions, FromObject, SCHEMA, ROOT, PARENT, KEY } from "./types"
import { pointerSchema, derefPointerData, complement, intersect, union, isPrimitive, isArray, isFunction, notNull, getSchema, isObject, isBoolean, isNull, isString } from "./tools";
import { Schema, CompilationStep, isenumarray, } from "./schema";
import { CSUpgradeRef, CSUpgradeAdditionalProperties, CSUpgradeDependencies, CSUpgradeId, CSUpgradeItems, CSUpgradeNullable } from "./upgrade";

/**
 * class to compile schema for fz-form 
 * compilation process is a in-depth walkthrough schema applying in order all 
 * the compile time actions
 *  !!! be carefull action order is primordial
 */

export class SchemaCompiler {
    static implemented = ["draft-07", "2019-09", "2020-12"]
    static unimplemented = ["draft-06", "draft-05", "draft-04", "draft-03", "draft-02"]
    static DIALECT_DRAF_07 = "http://json-schema.org/draft-07/schema"
    static DIALECT_2019_09 = "https://json-schema.org/draft/2019-09/schema"
    static DIALECT_2020_12 = "https://json-schema.org/draft/2020-12/schema"
    readonly root: Schema
    readonly dialect: string
    readonly steps: CompilationStep[]
    readonly passes = {
        upgrade: [] as CompilationStep[],
        pre: [] as CompilationStep[],
        post: [] as CompilationStep[]
      }
  
    errors: string[] = []
    constructor(root: Schema, options: IOptions, data: Pojo) {
        this.root = root
        this.dialect = this.extractDialect(options, root.$schema)

        if (SchemaCompiler.unimplemented.includes(this.dialect))
            throw Error(`schema dialect '${this.dialect}' not implemented (implmented are draft-07,2019-09 and 2020-12)`)

        // upgrade from Draft07 and 2019-09 to 2020-12
        this.steps = [
                new CSUpgradeRef(this.root),
                new CSUpgradeAdditionalProperties(this.root),
                new CSUpgradeDependencies(this.root),
                new CSUpgradeId(this.root),
                new CSUpgradeItems(this.root),
                new CSUpgradeNullable(this.root),

                new CSDefinition(this.root),
                new CSParent(this.root,),
                new CSPointer(this.root,),
                new CSRoot(this.root),
                new CSTargetType(this.root,),
                new CSEmpty(this.root,options),
                new CSEnum(this.root,),
                new CSEnumArray(this.root,),
                new CSUniform(this.root,),
                new CSTrackers(this.root,),
                new CSRequiredIf(this.root,),
                new CSField(this.root),
                new CSOrder(this.root),

                new CSInsideRef(this.root, data),
                new CSTemplate(this.root, 'abstract', Schema._abstractFunc()),
                new CSBool(this.root, 'case', () => false),
                new CSBool(this.root, 'visible', () => true),
                new CSBool(this.root, 'readonly', () => false),
                new CSBool(this.root, 'requiredIf', () => false),
                new CSBool(this.root, 'collapsed', () => false),
                new CSBool(this.root, 'filter', () => true),
                new CSAny(this.root, 'orderBy', () => true),
                new CSAny(this.root, 'expression', () => ''),
                new CSAny(this.root, 'change', () => ''),
        ]
        for (const step of this.steps) {
            this.passes[step.phase].push(step)
        }
        // Sort each phase topologically
        this.passes.upgrade = this.topologicalSort(this.passes.upgrade)
        this.passes.pre = this.topologicalSort(this.passes.pre)
        this.passes.post = this.topologicalSort(this.passes.post)

    }
    extractDialect(options: IOptions, schemaUri?: string) {
        switch (true) {
            case SchemaCompiler.unimplemented.some(draft => schemaUri?.startsWith(`http://json-schema.org/${draft}/schema`)):
                return SchemaCompiler.unimplemented.find(draft => schemaUri?.includes(draft)) ?? "draft-06"
                break
            case schemaUri?.startsWith(SchemaCompiler.DIALECT_DRAF_07):
                return "draft-07"
                break
            case schemaUri?.startsWith(SchemaCompiler.DIALECT_2019_09):
                return "2019-09"
                break
            case schemaUri?.startsWith(SchemaCompiler.DIALECT_2020_12):
                return "2020-12"
                break
            case options.dialect && SchemaCompiler.implemented.includes(options.dialect):
                return options.dialect
            default:
                return "2020-12"
        }
    }
    compile() {
        this.errors = []
        
        //this.walkSchema(this.passes.upgrade, this.root)
        this.walkSchema(this.passes.pre, this.root)
        this.walkSchema(this.passes.post, this.root)

        // this is a special use case when all dependencies between pointers is setted
        // we need to break potential cycle to avoid infinite loop
        CSTrackers.breakCycles()
        return this.errors
    }

    walkSchema(steps: CompilationStep[], schema: Schema, parent?: Schema, name?: string): void {

        for (const step of steps) {
            try {
                if (step.appliable(schema, parent, name)) {
                    step.apply(schema, parent, name)
                }
            } catch (e) {
                this.errors.push(String(e))
            }
        }
        if (schema.properties) return Object.entries(schema.properties).forEach(
            ([name, child]) => this.walkSchema(steps, child, schema, name))
        if (schema.items) {
            if (schema.items.oneOf) return this.walkSchema(steps, schema.items, schema, '*')
            if (schema.items.allOf) return this.walkSchema(steps, schema.items, schema, '*')
            if (schema.items.anyOf) return this.walkSchema(steps, schema.items, schema, '*')
            return this.walkSchema(steps, schema.items, schema, '*')
        }
        if (schema.oneOf) return schema.oneOf.forEach((child: Schema) => this.walkSchema(steps, child, parent, name))
        if (schema.allOf) return schema.allOf.forEach((child: Schema) => this.walkSchema(steps, child, parent, name))
        if (schema.anyOf) return schema.anyOf.forEach((child: Schema) => this.walkSchema(steps, child, parent, name))
    }
    private topologicalSort(steps: CompilationStep[]): CompilationStep[] {
    
        function visit(s: CompilationStep, stack: Set<string>) {
          if (visited.has(s.property)) return
          if (stack.has(s.property)) throw new Error(`Cycle in step dependencies: ${s.property}`)
    
          stack.add(s.property)
          for (const dep of s.after) {
            const match = steps.find(step => step.property === dep)
            if (match) visit(match, stack)
          }
          stack.delete(s.property)
    
          visited.add(s.property)
          sorted.push(s)
        }
    
        const sorted: CompilationStep[] = []
        const visited = new Set<string>()
        for (const step of steps) {
          visit(step, new Set())
        }
        return sorted
      }
    
}

/**
 * Replace schemas defined by reference ($ref) by their real 
 * definition (by copy)).
 */
class CSDefinition extends CompilationStep {

    constructor(root: Schema) {
        super(root, "$ref","pre",[])
    }

    override apply(schema: Schema): void {
        const batch = [] as { parent:Record<string,any>, property: string | number}[]

        for (const [property,child] of Object.entries(schema.properties ?? {})) {
            if (child.$ref) 
                batch.push({parent: schema.properties ?? {},property})
        }
        for (const [i,child] of (schema.oneOf ?? []).entries()) {
            if (child.$ref) batch.push({ parent: schema.oneOf ?? [], property: i })
        }
        for (const [i,child] of (schema.anyOf ?? []).entries()) {
            if (child.$ref) batch.push({ parent: schema.anyOf ?? [], property: i })
        }
        for (const [i,child] of (schema.allOf ?? []).entries()) {
            if (child.$ref) batch.push({ parent: schema.allOf ?? [], property: i })
        }
        // process collected $ref schemas
        for (const item of batch) {
            item.parent[item.property] = this.definition(item.parent[item.property])
        } 
    }

    definition(schema: Schema) {
        const ref = schema.$ref as string
        if (!ref.startsWith("#/definitions/"))
            throw this.error(`only '/definitions/<name>' allowed => ${ref}]`)
        if (this.root.definitions == null)
            throw this.error(`No "definitions" property in root schema`)
        const defname = ref.split("/")[2];
        if (this.root.definitions[defname] == null)
            throw this.error(`No definitions found in schema for ${ref}`)

        const deforig: Schema = this.root.definitions[defname]
        const defcopy: Schema = Object.assign({}, deforig)
        Object.entries(schema).forEach(([n, v]) => (n !== '$ref') && ((defcopy as any)[n] = v))
        return Schema.wrapSchema(defcopy)
    }
}
/** 
 * adds a 'parent' property to each schema
 * it store the parent schema of the currently processed schema
 */
class CSParent extends CompilationStep {

    constructor(root: Schema) {
        super(root, "parent","pre",[])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema)
    }
    override apply(schema: Schema, parent: Schema): void {
        schema.parent = parent
    }
}

/**
 * Adds a 'pointer' property to each schema
 * this porperty store the schema pointer of currently processed schema
 */
class CSPointer extends CompilationStep {

    constructor(root: Schema) {
        super(root, "pointer","pre",[])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema)
    }
    override apply(schema: Schema, parent: Schema, name: string): void {
        schema.pointer = parent ? `${parent.pointer}/${name}` : ``
    }
}

/**
 * Adds a 'root' property to each schema
 * this property store the root schema 
 */
class CSRoot extends CompilationStep {

    constructor(root: Schema) {
        super(root, "root","pre",[])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema)
    }
    override apply(schema: Schema): void {
        schema.root = this.root
    }
}

/**
 * Adds a string property 'basetype' wich identify basetype (not null)
 * @param schema shema to comp base type
 */
class CSTargetType extends CompilationStep {

    static STRINGKW = ["minLength", "maxLength", "pattern", "format"]
    static NUMBERKW = ["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf"]
    static ARRAYKW = ["items", "additionalItems", "minItems", "maxItems", "uniqueItems"]
    static OBJECTKW = ["required", "properties", "additionalProperties", "patternProperties", "minProperties", "maxProperties", "dependencies"]
    static ALL = new Set(["string", "integer", "number", "object", "array", "boolean", "null"])
    constructor(root: Schema) {
        super(root, "basetype","pre",[])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema)
    }

    override apply(schema: Schema, parent?: Schema, name?: string) {
        schema.target = [...(this.infer(schema) ?? [])]
        switch (schema.target.length) {
            case 2:
                if (!schema.target.includes("null")) {
                    throw Error(`Second type must be "null" : ${pointerSchema(parent, name)}`)
                }
                schema.basetype = schema.target.find((t: string) => t !== "null") ?? schema.target[0]
                schema.nullAllowed = true
                break
            case 1:
                schema.basetype = schema.target[0]
                schema.nullAllowed = schema.target[0] == "null"
                break
            case 0:
                schema.basetype = "null"
                schema.nullAllowed = false
                break
            default:
                throw Error(`multiple types not implemented : ${pointerSchema(parent, name)}`)
        }
    }

    infer(schema: Schema): Set<string> | null {

        const possibles: (Set<string> | null)[] = []
        // we call all the helpers that infer types for each keyword
        possibles.push(CSTargetType.ALL)
        possibles.push(this.constKW(schema))
        possibles.push(this.typeKW(schema))
        possibles.push(this.enumKW(schema))
        possibles.push(this.numberKW(schema))
        possibles.push(this.stringKW(schema))
        possibles.push(this.arrayKW(schema))
        possibles.push(this.objectKW(schema))
        possibles.push(this.notKW(schema))
        // Handling "allOf" → intersection of types
        if (schema.allOf) {
            const allOfTypes = schema.allOf.map((s: Schema) => this.infer(s)).filter(x => x != null);
            possibles.push(intersect(allOfTypes));
        }

        // Handling "anyOf" → union of types
        if (schema.anyOf) {
            const anyOfTypes = schema.anyOf.map((s: Schema) => this.infer(s)).map(x => x == null ? CSTargetType.ALL : x);
            possibles.push(union(anyOfTypes));
        }

        // Handling "oneOf" → union of types (similar to anyOf)
        if (schema.oneOf) {
            const oneOfTypes = schema.oneOf.map((s: Schema) => this.infer(s)).map(x => x == null ? CSTargetType.ALL : x);;
            possibles.push(union(oneOfTypes));
        }
        const filtered = possibles.filter(value => value != null)
        return intersect(filtered)
    }

    private notKW(schema: Schema) {
        //  "not" → Compute the complementary set of types
        return schema.not ? complement(this.infer(schema.not), CSTargetType.ALL) : null
    }

    private enumKW(schema: Schema) {
        // infering type from "enum" keyword correspond to a set of all enums value types
        if ("enum" in schema && Array.isArray(schema.enum)) {
            const types = schema.enum.map(value => value == null ? "null" : Array.isArray(value) ? "array" : typeof value)
            return new Set(types)
        }
        return null
    }

    private typeKW(schema: Schema) {
        if ("type" in schema) {
            return new Set(Array.isArray(schema.type) ? schema.type : [schema.type]) as Set<string>
        }
        return null
    }

    private constKW(schema: Schema) {
        if ("const" in schema) {
            if (schema.const == null) return new Set(["null"]);
            if (Array.isArray(schema.const)) return new Set(["array"]);
            const constType = Number.isInteger(schema.const) ? "integer" : typeof schema.const;
            return new Set([constType]);
        }
        return null;
    }

    private arrayKW(schema: Schema) {
        // if one of this keywords is present then type is contrained to "array"
        return CSTargetType.ARRAYKW.some(kw => kw in schema)
            ? new Set(["array"])
            : null
    }
    private numberKW(schema: Schema) {
        // if one of this keywords is present then type is contrained to "number"
        return CSTargetType.NUMBERKW.some(kw => kw in schema)
            ? new Set(["number"])
            : null
    }
    private objectKW(schema: Schema) {
        // if one of this keywords is present then type is contrained to "object"
        return CSTargetType.OBJECTKW.some(kw => kw in schema)
            ? new Set(["object"])
            : null
    }
    private stringKW(schema: Schema) {
        // if one of this keywords is present then type is contrained to "string"
        return CSTargetType.STRINGKW.some(kw => kw in schema)
            ? new Set(["string"])
            : null
    }

}


export class CSEmpty extends CompilationStep {
    private preferNull: boolean
  
    constructor(root: Schema, options: any) {
      super(root, "empty","pre",["basetype"])
      this.preferNull = options?.preferNull ?? false
    }
  
    override appliable(schema: Schema): boolean {
      return !(this.property in schema)
    }
  
    override apply(schema: Schema): void {
      schema.empty = !schema.nullAllowed ? undefined : this.preferNull ? null : undefined
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

    constructor(root: Schema) {
        super(root, "isenum","pre",[])
    }

    override appliable(schema: Schema) { // when property absent
        return !(this.property in schema)
    }
    override apply(schema: Schema): void {
        schema.isenum = false;
        switch (true) {
            // allow only primitive types to be enums
            case !isPrimitive(schema, true): break
            // it is an enumeration only for one of this cases
            case !!schema.enum:
            case schema.oneOf && schema.oneOf.every((sch) => 'const' in sch):
            case schema.anyOf && schema.anyOf.every((sch) => 'const' in sch):
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

    constructor(root: Schema) {
        super(root, "isenumarray","pre",[])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema)
    }
    override apply(schema: Schema): void {
        schema.isenumarray = isPrimitive(schema, true) && isenumarray(schema)
    }
}

/**
 * Adds a boolean property 'homogeneous' true if  schema is
 * array and items are of homegeneous type 
 */
class CSUniform extends CompilationStep {

    constructor(root: Schema) {
        super(root, "homogeneous","pre",["basetype"])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema) && schema.basetype === "array"
    }

    override apply(schema: Schema): void {
        schema.homogeneous = schema.items?.oneOf ? false : true
    }
}

/**
 * adds an empty array property 'trackers' to each schema
 * this property will contain pointers to the tracked values
 * trackers receive 'data-updated' events when data changes occurs 
 * to the pointed data (warning by schema pointer)
 */
class CSTrackers extends CompilationStep {
    static ALL? = new Map<string, string[]>()
    constructor(root: Schema) {
        super(root, "trackers","pre",["pointer"])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema)
    }
    override apply(schema: Schema): void {
        schema.trackers = []
        CSTrackers.ALL?.set(schema.pointer, schema.trackers)
    }
    static breakCycles() {
        if (CSTrackers.ALL == null) return

        const trackMap = CSTrackers.ALL
        const visited = new Set<string>(); // Nodes that have been fully processed
        const stack = new Set<string>(); // Nodes currently in the recursion stack
        const parentMap = new Map<string, string>(); // To track back the cycle path

        for (const [key, trackers] of trackMap) {
            if (trackers.length === 0) {
                trackMap.delete(key)
            }

            function dfs(pointer: string) {
                if (stack.has(pointer)) {

                    // Find the full cycle path
                    let current = pointer;
                    const cycleNodes = new Set<string>();
                    while (parentMap.has(current) && !cycleNodes.has(current)) {
                        cycleNodes.add(current);
                        current = parentMap.get(current)!;
                    }

                    // Remove all cycle links
                    for (const node of cycleNodes) {
                        const parent = parentMap.get(node);
                        if (parent && trackMap.has(parent)) {
                            const trackers = trackMap.get(parent)!;
                            const index = trackers.indexOf(node);
                            if (index !== -1) {
                                console.warn(`Cycle detected: Removing track link from ${parent} → ${node}`);
                                trackers.splice(index, 1); // ✅ Modify array in place
                            }
                        }
                    }

                    return;
                }

                if (visited.has(pointer)) return;

                visited.add(pointer);
                stack.add(pointer);

                for (const tracker of trackMap.get(pointer) || []) {
                    parentMap.set(tracker, pointer);
                    dfs(tracker); // Continue DFS
                }

                stack.delete(pointer);
            }

            // Run DFS on all nodes
            for (const pointer of trackMap.keys()) {
                if (!visited.has(pointer)) {
                    dfs(pointer);
                }
            }
            CSTrackers.ALL = undefined
        }
    }
}


/**
 * Adds a string property 'requiredIf' to each schema which is a required field
 * this field will be compiled to getter to manage conditional mandatory values
 */
class CSRequiredIf extends CompilationStep {

    constructor(root: Schema) {
        super(root, "requiredIf","pre",["basetype"])
    }

    override appliable(schema: Schema) {
        return schema.basetype === "object" && schema.properties != null && schema.required != null
    }
    override apply(schema: Schema): void {
        schema.required?.forEach((name: any) => {
            if (schema.properties && name in schema.properties) schema.properties[name].requiredIf = "true"
        })
    }
}


/**
 * Adds a property 'field' with the web component name to be displayed for this schema
 * depending on 'basetype', 'format', 'const', 'isenum', enum values count, ...
 */
class CSField extends CompilationStep {

    constructor(root: Schema) {
        super(root, "field","pre",["basetype","isenum","isenumarray"])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema)
    }

    override apply(schema: Schema) {
        if ("const" in schema) return schema.field = 'fz-constant'
        if (schema.from && isPrimitive(schema, true)) {
            if (!schema.filter) schema.filter = () => true
            return schema.field = 'fz-enum-select'
        }
        if (schema.isenum) {
            if (!schema.filter) schema.filter = () => true
            switch (true) {
                case schema.enum && schema.enum?.length <= 3: return schema.field = 'fz-enum-check'
                case schema.oneOf && schema.oneOf?.length <= 3: return schema.field = 'fz-enum-check'
                case schema.anyOf && schema.anyOf?.length <= 3: return schema.field = 'fz-enum-check'
                case schema.enum && schema.enum?.length <= 20: return schema.field = 'fz-enum-select'
                case schema.oneOf && schema.oneOf?.length <= 20: return schema.field = 'fz-enum-select'
                case schema.anyOf && schema.anyOf?.length <= 20: return schema.field = 'fz-enum-select'
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
                if (schema.mask) return schema.field = "fz-mask"
                switch (schema.format) {
                    case "uuid": return schema.field = 'fz-uuid'
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
                if (!schema.format && schema.maxLength && schema.maxLength > 256) return schema.field = 'fz-textarea'
                return schema.field = 'fz-string'
        }
        return schema.field = 'fz-error'
    }
}

/**
 * Adds a property 'order' for each schema containing the display order rank
 */
class CSOrder extends CompilationStep {

    constructor(root: Schema) {
        super(root, "order","pre",["basetype"])
    }

    override appliable(schema: Schema) {
        return !(this.property in schema) && schema.basetype === 'object' && schema.properties != null
    }
    override apply(schema: Schema) {
        const properties = schema.properties
        if (!properties) return
        const groupmap: Map<string, number> = new Map()
        const tabmap: Map<string, number> = new Map()
        // order properties with tab and grouping
        let fieldnum = 0
        const fields: FieldOrder[] = Object.entries(properties).map(([fieldname, schema]) => {
            // get or affect tab number
            if (schema.tab && !tabmap.has(schema.tab)) tabmap.set(schema.tab, fieldnum)
            const tabnum = schema.tab ? tabmap.get(schema.tab) as number : fieldnum
            // get or affect group number
            if (schema.group && !groupmap.has(schema.group)) groupmap.set(schema.group, fieldnum)
            const groupnum = schema.group ? groupmap.get(schema.group) as number : fieldnum

            return { tabnum, groupnum, fieldnum: fieldnum++, fieldname, schema, tabname: schema.tab ?? "", groupname: schema.group ?? "" }
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
    constructor(root: Schema, data: Pojo) {
        super(root, "from","post",["pointer","trackers"])
        this.data = data
    }
    override appliable(schema: Schema) {
        return notNull(schema.from) && !isFunction(schema.from)
    }
    override apply(schema: Schema) {
        const from = schema.from as { pointer: string, extend: boolean }
        schema.from = () => null
        const pointer = from.pointer.replace(/\/[^/]+$/, '')
        const name = from.pointer.substr(pointer.length + 1)
        schema._track(`$\`${pointer}\``)
        schema.from = (_schema: Schema, _value: any, parent: Pojo, property: string | number, _userdata: object) => {
            const target = derefPointerData(this.data, parent, property, pointer)
            if (!target) return null
            if (!isArray(target)) {
                console.error(`reference list must be an array ${pointer}`)
                return []
            }
            return { pointer, name, target, schema: getSchema(target), extend: !!from.extend } as FromObject
        }
    }
}

/**
 * compile a given property written as template literal  
 */
class CSTemplate extends CompilationStep {
    private defunc: ExprFunc<string>
    constructor(root: Schema, property: keyof Schema, defunc: ExprFunc<string>) {
        super(root, property,"post",[])
        this.defunc = defunc
    }
    override appliable(schema: Schema) {
        return this.property in schema && typeof schema[this.property] == "string"
    }
    override apply(schema: Schema, _parent: Schema, name: string) {
        const expression = schema[this.property]
        this.set(schema, this.defunc)
        if (isString(expression)) {
            const body = `
                ${this.sourceURL(schema,name)}
                try { 
                    return nvl\`${expression}\`
                } catch(e) {  
                    console.error(
                        \` eval for keyword "${this.property}" failed field:\${parent?.pointer ?? ""} -> \${property ?? ""}\n\`,
                        \`    => \${String(e)}\`) 
                }
                return ''
            `
            this.compileExpr(schema,expression,body)
        }
    }
}


/**
 * compile a given property written as a function returning boolean  
 */
class CSBool extends CompilationStep {
    private defaultFunc: ExprFunc<boolean>
    constructor(root: Schema, property: keyof Schema, defunc: ExprFunc<boolean>) {
        super(root, property,"post",[])
        this.defaultFunc = defunc
    }
    override appliable(schema: Schema) {
        return this.property in schema
    }
    override apply(schema: Schema, _parent: Schema, name: string) {
        const expression = schema[this.property]
        this.set(schema,this.defaultFunc)
        if (isNull(expression) || isBoolean(expression)) return  this.set(schema,() => expression)
        if (!isString(expression)) return  this.set(schema,() => !!(expression))
        const body = `
            ${this.sourceURL(schema,name)}
            try {  
                const result = (${expression}) 
                return result === null ? result : !!result
            } catch(e) {  
                console.error(
                    \` eval for keyword "${this.property}" failed field:\${parent?.pointer ?? ""} -> \${property ?? ""}\n\`,
                    \`    => \${String(e)}\`) 
            }
            return true
        `
        this.compileExpr(schema,expression,body)
    }
}


class CSAny extends CompilationStep {
    private defaultFunc: ExprFunc<any>
    constructor(root: Schema, property: keyof Schema, defunc: ExprFunc<any>) {
        super(root, property,"post",[])
        this.defaultFunc = defunc
    }
    override appliable(schema: Schema) {
        return this.property in schema && typeof schema[this.property] !== "function"

    }
    override apply(schema: Schema, _parent: Schema, name: string) {
        const expression = schema[this.property]
        this.set(schema,this.defaultFunc)
        if (!isString(expression) && !isArray(expression)) return  this.set(schema,() => expression)
        let code =  `return null`
        code =  isString(expression) ? `return ${expression}`: this.buildCode(expression)
        const body = `
            ${this.sourceURL(schema,name)}
            try {
                ${code} 
            } catch(e) {  
                console.error(
                    \` eval for keyword "${this.property}" failed field:\${parent?.pointer ?? ""} -> \${property ?? ""}\n\`,
                    \`    => \${String(e)}\`) }
            return null
        `
        this.compileExpr(schema,expression,body)

    }
}

/**
 * class to compile data for fz-form 
 * compilation process is a in-depth walkthrough schema applying in order compile time actions
 * be carefull action order is primordial
 */

export class DataCompiler {
    data: Pojo
    schema: Schema
    steps: (( schema: Schema, data: Pojo,parent?: Pojo,key?: string | number,) => void)[]
    errors: string[] = []

    constructor(data: Pojo, schema: Schema) {
        this.data = data
        this.schema = schema
        this.steps = [
            (schema, data, parent, key) => {
                if (isObject(data) || isArray(data)) {
                    data[SCHEMA] = schema
                    data[PARENT] = parent
                    data[KEY] = key
                    data[ROOT] = data
                }
            }
        ]
    }
    compile() {
        this.errors = []
        this.walkData(this.schema,this.data)
        return this.errors
    }

    walkData( schema?: Schema, data?: Pojo, parent?: Pojo, key?: string| number) {
        if (schema == null || data == null) return
        try {
            this.steps.forEach(action => action(schema, data, parent, key))
        } catch (e) {
            this.errors.push(String(e))
        }
        if (isArray(data)) {
            if (schema.homogeneous) {
                data.forEach((item:any ,i) =>  this.walkData(schema.items, item as Pojo, data,i) )
            } else {
                data.forEach((item: any, i: any) => {
                    schema.items?.oneOf?.forEach((schema: any) => {
                        const isofthistype = schema.case && schema.case(null, item, data, i, () => null)
                        if (isofthistype) this.walkData(schema, item, data, i)
                    })
                })
            }
            return
        }
        if (isObject(data) && schema.properties) {
            for (const property in data) {
                const child_schema = schema.properties[property]
                const child_data = data[property] as Pojo
                this.walkData( child_schema , child_data, data, property)
            }
            return
        }
    }

}

