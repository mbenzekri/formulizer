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