

## Web component documentation

fz-form is a W3C-compliant web component:

>- load the bundle formulizer.js (dev env) or formulizer.min.js (prod env) 
>- the tag to be used is: `<fz-form ></fz-form>`
>- inner content is ignored (please dont put content , may be used later )
>- pass mandatory attributes `schema` and `data` at least

## Attributes 
| name | M | type | description |
| ---- | - | ---- | ----------- |
| schema | x | JSON | an annotated JSON Schema form description the form data structure [see detail here](#general/schema) |
| data | x | JSON | initial data to be updated throught the form. |
| bootstrap |  | boolean | if present fz-form will load bootstrap from CDN [bootstrap chapter](#general/bootstrap) |
| useajv |  | boolean | if present fz-form will load Ajv validator (lazy loading module) |
| usemarkdown |  | boolean | if present fz-form will load Markdown field type  (lazy loading module) |
| actions |  | boolean | if true will show actions buttons to validate or cancel the form (default to false / absent)|
| readonly |   | boolean | if true form will show a readonly state of the data otherwise will allow form to allow update (default to false / absent) |

__note__ : 
    type JSON here means a JSON serialisable object or a JSON string (correctly formated).
    As components attributes are passed as strings serialization will occur. 
    Meaning that objects you provide are never updated (copied)

## Members

| name | type | description |
| ---- | ---- | ----------- |
| valid | boolean | return true if this.data conform to schema |
| schema | Object | return the schema describing the form |
| data | Object | return the actual edited data |

## Methods

| name | return | description |
| ---- | ---- | ----------- |
| errors() | string[] | return a string array of all validation the errors for data |
| errors(pointer:string) | string[] | return a string array of all the errors for a given pointer in data|


## Events 

| name | description |
| ---- | ----------- |
| init | trigerred at end of form initialization phase(before schema and data compilation). May be used to initialize options programmaticaly  |
| ready | trigerred when form is rendered (after schema and data compilation). May be used to provide late initialization |
| update | trigerred when form is updated weither data is valid or invalid  |
| data-valid | trigerred when form is updated and in valid state |
| data-invalid | trigerred when form is updated and in invalid state |

All those event are CustomEvent with `target` property setted to fz-form

You could then access form throw this event property:
- get valid or invalid status: `evt.target.valid`
- get the data: `evt.target.data`
- get the schema: `evt.target.schema` ...