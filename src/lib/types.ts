import { IAsset } from "../inputs/fz-input-asset";
import { IBlobStore } from "./storage";

type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export { JSONValue, JSONObject, JSONArray }

export type JSONSchema = { [key: string]: any }


export type ExprFunc<T> = (schema: Pojo, value: any, parent: Pojo, property: string | number, userdata: object) => T | null
export type Pojo = { [key: string]: any }
export type FieldOrder = {
    tabnum: number;
    groupnum: number;
    fieldnum: number;
    fieldname: string;
    schema: Pojo;
    tabname: string;
    groupname: string;
}

export type StoreItem = {uuid: string, blob: Blob, filename: string}


export type IOptions =  {
  storage?: IBlobStore,
  userdata?: any,
  asset?: IAsset,
  dialect?: string
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

