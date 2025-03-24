import { Schema } from "./schema";
import { IBlobStore } from "./storage";

type JSONValue =
    | undefined
    | string
    | number
    | boolean
    | null
    | JSONObject
    | JSONArray;

interface JSONObject {
    [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }

export { JSONValue, JSONObject, JSONArray }

export type EnumItem = { title: string; value: any }

export type ExprFunc<T> = (schema: Schema, value: any, parent: Pojo, property: string | number, $: Function, userdata: object) => T | null
export type EvalFunc<T> = (attribute: keyof Schema, schema: Schema, value: any, parent: Pojo, property: string | number, userdata: object) => T | null

export type FieldOrder = {
    tabnum: number;
    groupnum: number;
    fieldnum: number;
    fieldname: string;
    schema: Schema;
    tabname: string;
    groupname: string;
}

export type StoreItem = { uuid: string, blob: Blob, filename: string }

export interface IAsset {
    select: (fieldasset: any, value: any, selectCallback: (selected: string) => void) => Promise<void>,
    done: () => Promise<void>
}

export type IOptions = {
    storage?: IBlobStore,
    userdata?: any,
    asset?: IAsset,
    dialect?: string,
}

export type FromObject = { pointer: string, name: string, target: any[], schema: Schema, extend: boolean }

export const SCHEMA = Symbol("FZ_FORM_SCHEMA")
export const PARENT = Symbol("FZ_FORM_PARENT")
export const KEY = Symbol("FZ_FORM_PARENT")
export const ROOT = Symbol("FZ_FORM_ROOT")
export const EVAL = Symbol("FZ_FORM_EVAL")

export type WithMetadata<T> = T & {
    [SCHEMA]?: Schema;
    [SCHEMA]?: Schema;
    [ROOT]?: T;
    [PARENT]?: T;
    [KEY]?: string | number;
    [EVAL]?: EvalFunc<any>
    [name: string]: T
    [name: number]: T
};

export type Pojo = WithMetadata<JSONValue>

export const IS_VALID = []
export const NOT_TOUCHED = []
