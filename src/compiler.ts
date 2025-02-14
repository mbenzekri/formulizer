import { Pojo, FieldOrder, ExprFunc } from "./types"
import { derefPointerSchema, pointerSchema, isprimitive, isenumarray} from "./tools";
import {  } from "./types";

/**
 * observers function parse expression to extract observed values and set observers
 * array in corresponding schema   
 * @param root schema for absolute pointers in expr
 * @param current schema for relative pointer in expr
 * @param expr function body or arrow function body to parse 
 */
export function observers(root: Pojo, current: Pojo, expr: string): void {
    if (!root || !current) return
    const POINTER_RE = /((#|\d+)(\/[^"']+)+)/g
    let matches
    while ((matches = POINTER_RE.exec(expr)) != null) {
        const pointer = matches[1]
        const observedschema = derefPointerSchema(root, current, pointer)
        if (observedschema && !observedschema.observers.includes(current.pointer)) observedschema.observers.push(current.pointer)
    }
}

/**
 * solveref replace schema defined by reference ($ref) by the real definition (copy)
 * @param definition function to retrieve a schema by it's pointer reference
 * @returns a function to apply remplacement of $ref by the correspondind schema definition
 */

export const solveref = (definition: (ref: Pojo) => Pojo) => {
    return (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
        const properties: { [key: string]: any } = schema.properties
        properties && Object.entries(properties).forEach(
            ([pname, pschema]) => pschema.$ref && (properties[pname] = definition(pschema))
        )
        schema.items && schema.items.$ref && (schema.items = definition(schema.items))
        schema.items && schema.items.oneOf && (schema.items.oneOf = schema.items.oneOf.map((schema: Pojo) => schema.$ref ? definition(schema) : schema))
    }
}

/**
 * solveenum adds a boolean property 'isenum' true if enumeration detected
 * only basic types may be enums
 * 3 flavors : 
 *      (a) having an "enums" property
 *      (b) having an "oneOf" property with a array of constants
 *      (c) having an "anyOf" property with a array of constants
 * @param schema schema to solve enum state
 * @example {type '...'}
 */
 export const solveenum = (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
    if ("isenum" in schema) return
    schema.isenum = false;
    schema.isenumarray = false;
    switch (true) {
        case !isprimitive(schema.basetype): break
        case isenumarray(schema):
            schema.isenumarray = true
            break
        case !!schema.enum:
        case schema.oneOf && schema.oneOf.every((sch: Pojo) => 'const' in sch):
        case schema.anyOf && schema.anyOf.every((sch: Pojo) => 'const' in sch):
            if (!schema.filter) schema.filter = () => true
            schema.isenum = true;
            break
    }
}

/**
 * solveobservers adds an empty array property 'observers'
 * this property will contain jsonpath to the value which is 
 * observing the data described by this 'schema' 
 * 
 * observers have to be alerted when changes occurs to the data described 
 * by this schema (see event 'observed-changed' in FzField base class)
 * 
 * @param schema schema to solve enum state
 * @example {type '...'}
 */
 export const solveobservers = (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
    if (schema.observers) return
    schema.observers = []
}

/**
 * solveparent adds a 'parent' schema property to each schema
 * 
 * @param schema schema to solve enum state
 * @example {type '...'}
 */
export const solveparent = (schema: Pojo, parent: Pojo | null, _name: string | null) => {
    if (schema.parent) return
    schema.parent = parent
}

/**
 * solveparent adds a 'parent' schema property to each schema
 * 
 * @param schema schema to solve enum state
 * @example {type '...'}
 */
export const solvepointer = (schema: Pojo, parent: Pojo | null, name: string | null) => {
    if (schema.pointer) return
    schema.pointer = parent ? `${parent.pointer}/${name}` : `#`
}


/**
 * solvehomogeneous adds a boolean property 'homogeneous' true 
 * if :  
 *      - "type" is "array" 
 *      - "items" is "oneOf"  
 * @param schema schema to solve enum state
 * @example {type '...'}
 */
export const solvehomogeneous = (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
    if (schema.basetype !== "array") return
    schema.homogeneous = schema.items.oneOf ? false : true
}

/**
 * solverequired adds a string property 'requiredWhen' =  "true"  to all properties 
 * required for this type
 * if :  
 *      - "type" is "object" 
 *      - "properties" is set  
 * @param schema schema to solve required list
 * @example {type '...'}
 */
export const solverequired = (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
    if (schema.basetype !== "object" || !schema.properties || !schema.required) return
    schema.required.forEach((name: any) => {
        if (name in schema.properties) schema.properties[name].requiredWhen = "true"
    })
}

/**
 * solvebasetype adds a string property 'basetype' with real type (not null) if array of "type"
 * @param schema shema to solve base type
 */
export const solvebasetype = (schema: Pojo, parent: Pojo | null, name: string | null) => {
    if (Array.isArray(schema.type)) {
        if (schema.type.length > 2) {
            throw Error(`Type multiples non implementé : ${pointerSchema(parent, name)}`)
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

/**
 * solvetype adds a string property 'field' with the target web component for this schema
 * depending on properties type an isenum (see. solveenum)
 * @param schema shema to solve references
 */
export const solvetype = (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
    if (schema.field) return
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
            default:  return schema.field = 'fz-enum-typeahead'
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
export const solveorder = (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
    if (schema.basetype !== 'object' || !schema.properties || schema.order) return
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

export const solvestring = (root: Pojo, property: string, defaultf: ExprFunc<string>) => {
    return (schema: Pojo, _parent: Pojo | null, _name: string | null) => {
        if (!(property in schema) || typeof schema[property] === "function") return
        const expression = schema[property]
        schema[property] = defaultf
        if (typeof expression == 'string') {
            const code = `try { 
                    return nvl\`${expression}\`
                } catch(e) { 
                    console.error(\`unable to produce ${property} property due to :\${e.toString()}\`)
                }
                return ''
            `
            try {
                observers(root, schema, expression)
                schema[property] = new Function("schema", "value", "parent", "property", "$", "userdata", code)
                schema[property].expression = expression
            } catch (e) {
                console.error(`unable to compile ${property} expression "${expression}" due to ::\n\t=>${String(e)}`)
            }
        }
    }
}
export const solveboolean = (root: Pojo, property: string, defaultv: ExprFunc<boolean>) => {
    return (schema: Pojo, parent: Pojo | null, name: string | null) => {
        if (!(property in schema) || typeof schema[property] === "function") return
        const expression = schema[property]
        schema[property] = defaultv
        if (typeof expression == 'boolean' || expression === null) {
                schema[property] = expression === null ? () => null :  () => expression
        } else if (typeof expression == 'string') {
            const code = `
            //# sourceURL=${property}_${(parent && name) ? pointerSchema(parent, name).replace(/\//g, "") : Math.floor(Math.random() * 1e9)}.js
            try {  
                    const result = (${expression}) 

                    return result === null ? result : !!result
                }
                catch(e) {  console.error(\`unable to produce ${property} property due to :\n\t=>\${e.toString()}\`) }
                return true
            `
            try {
                observers(root, schema, expression)
                schema[property] = new Function("schema", "value", "parent", "property", "$", "userdata", code)
                schema[property].expression = expression
            } catch (e) {
                console.error(`unable to compile ${property} expression "${expression}" due to ::\n\t=>${String(e)}`)
            }
        }
    }
}

export const solveany = (root: Pojo, property: string, defaultv: ExprFunc<any>) => {
    return (schema: Pojo, parent: Pojo | null, name: string | null) => {
        if (!(property in schema) || typeof schema[property] === "function") return
        const expression = schema[property]
        schema[property] = defaultv
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
            //# sourceURL=${property}_${(parent && name) ? pointerSchema(parent, name).replace(/\//g, "") : Math.floor(Math.random() * 1e9)}.js
            try {  
                ${code} 
            }
            catch(e) {  console.error(\`unable to produce ${property} property due to :\n\t=>\${e.toString()}\`) }
            return null
        `
        try {
            if (Array.isArray(expression)) expression.forEach((expr: string) => observers(root, schema, expr))
            if (typeof expression == 'string') observers(root, schema, expression)
            schema[property] = new Function("schema", "value", "parent", "property", "$", "userdata", body)
            schema[property].expression = expression
        } catch (e) {
            console.error(`unable to compile ${property} expression "${expression}" due to ::\n\t=>${String(e)}`)
        }
    }
}

export const walkSchema = (schema: Pojo, parent: Pojo | null, name: string | null, actions: ((schema: Pojo, parent: Pojo | null, name: string | null) => void)[]): void => {
    actions.forEach(action => {
        try {
            action(schema, parent, name)
        } catch (e) {
            console.error(`Error while compiling schema ${String(e)}\naction: ${action.name}\nschema: ${pointerSchema(parent, name)}`)
        }
    })
    if (schema.properties) return Object.entries(schema.properties as Pojo[]).forEach(
        ([name, child]) => walkSchema(child, schema, name, actions))
    if (schema.items) {
        if (schema.items.oneOf) return walkSchema(schema.items, schema, '*', actions)
        if (schema.items.allOf) return walkSchema(schema.items, schema, '*', actions)
        if (schema.items.anyOf) return walkSchema(schema.items, schema, '*', actions)
        return walkSchema(schema.items, schema, '*', actions)
    }
    if (schema.oneOf) return schema.oneOf.forEach((child: Pojo) => walkSchema(child, parent, name, actions))
    if (schema.allOf) return schema.allOf.forEach((child: Pojo) => walkSchema(child, parent, name, actions))
    if (schema.anyOf) return schema.anyOf.forEach((child: Pojo) => walkSchema(child, parent, name, actions))
}

/**
 * 
 * @param data data (plain old javascript object)
 * @param schema schema describing data
 * @param actions actions (functions) to apply on each data
 * @returns 
 */
export const walkData = (data: Pojo, schema: Pojo, pdata: Pojo | null, pschema: Pojo | null, actions: ((data: Pojo, schema: Pojo, pdata: Pojo | null, pschema: Pojo | null) => void)[]) => {
    if (schema == null || data == null) return
    actions.forEach(action => action(data, schema, pdata, pschema))
    if (Array.isArray(data)) {
        if (schema.homogeneous) {
            data.forEach((item: Pojo) => walkData(item, schema.items, data, schema, actions))
        } else {
            data.forEach((item: any, i: any) => {
                schema.items.oneOf.forEach((schema: any) => {
                    if (schema.case && schema.case(null, item, data, i, () => null)) walkData(item, schema, data, schema, actions)
                })
            })
        }
        return
    }
    if (typeof data === 'object') {
        for (const property in data) {
            const propschema = schema.properties[property]
            walkData(data[property], propschema, data, schema, actions)
        }
        return
    }
}

(window as any).nvl = function nvl(strarr: string[], ...valarr: any[]) {
    const all: any[] = []
    strarr.forEach((str, i) => (i == 0)
        ? all.push(str)
        : all.push(valarr[i - 1] == null ? '' : valarr[i - 1], str))
    return all.join('')
}
