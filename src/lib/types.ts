import { IAsset } from "../inputs/fz-input-asset";
import { Schema } from "./schema";
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

export type EnumOption = {
    value: JSONValue;
    title: string;
  
} 

export type ExprFunc<T> = (schema: Schema, value: any, parent: Pojo, property: string | number, userdata: object) => T | null
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

