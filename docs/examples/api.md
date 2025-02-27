

## formulizer API

Formulizer is a W3C-compliant web component:

- load the bundle formulizer.js (dev env) or formulizer.min.js (prod env) 
- the tag to be used is: `<fz-form ></fz-form>`
- inner content is ignored (please dont put content , may be used later )
- pass mandatory attributes `schema` and `data` at least

## Attributes 
| name | M | type | description |
| ---- | - | ---- | ----------- |
| schema | x | JSON | an annotated JSON Schema form description the form data structure [see detail here](./Schema_for_fz-form.md) |
| data | x | JSON | initial data to be updated throught the form. |
| actions |  | boolean | if true will show actions buttons to validate or cancel the form (default to false / absent)|
| readonly |   | boolean | if true form will show a readonly state of the data otherwise will allow form to allow update (default to false / absent) |
| checkin |   | boolean | if true fzform reject the data not conforming to the JSON Schema (error message / no form) (default to false / absent) |

__note__ : 
    type JSON here means a JSON serialisable object or a JSON string (correctly formated).
    As components attributes are passed as strings serialization will occur. 
    Meaning that objects you provide are never updated (copied)

## Events 

| name | description |
| ---- | ----------- |
| init | trigerred at end of form initialization phase(before schema and data compilation). May be used to initialize options programmaticaly  |
| ready | trigerred when form is displayed (after schema and data compilation). May be used to provide late initialization |
| data-valid | trigerred when form is updated and in valid state |
| data-invalid | trigerred when form is updated and in invalid state |

The listeners on those trigerred events will receive a CustomEvent 
containing `target` property will be the fzform

You could then access form throw this event property.

- get valid or invalid status: `evt.target.valid`
- get the data: `evt.target.data`
- get the schema: `evt.target.schema` ...