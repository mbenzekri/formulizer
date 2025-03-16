import { Schema } from "./schema";
import { IBlobStore } from "./storage";

import { ErrorObject } from "ajv/dist/types"

export type AjvError = ErrorObject

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

export type EnumItem = { title: string; value: any }

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

export interface IAsset {
  select: (fieldasset: any, value: any, selectCallback: (selected:string) => void) => Promise<void>,
  done: () => Promise<void>
}

export type IOptions =  {
  storage?: IBlobStore,
  userdata?: any,
  asset?: IAsset,
  dialect?: string
  enums?: (id:string) => EnumItem[] 
}

export type FromObject = { pointer: string, name: string, target: any[], schema: Schema, extend: boolean }