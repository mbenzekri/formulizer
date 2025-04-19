>fz-form adds some keywords to JSON Schema to have more control on form rendering and behavior.


## fz-form extension keywords

>Here is the list of added keywords

| name | type | description |
| ---- | ---- | ----------- |
| [empty](#general/empty) | any | set empty value for this field |
| [transient](#general/transient) | boolean | indicate a temporary value not to be return in final result |
| [enumFetch](#enum/fetch) | string  | a list name to provide to app to provide user defined enumeration |
| [filter](#keyword/filter) | Expr | boolean expression to filter enumeration list |
| [requiredIf](#general/required) | Expr | boolean expression for conditional required |
| [from](#enum/from) | object | pointer a data list to use as enumeration |
| [abstract](#keyword/abstract) | TLiteral | a template Literal expression to provide an absract for the field |
| [case](#keyword/case) | Expr | A boolean expression to dicriminate data types |
| [visible](#keyword/visible) | Expe | a boolean expression to set field visibility |
| [readonly](#keyword/readonly) | Expr | a boolean expression to set field readonly state |
| [collapsed](#keyword/collapsed) | string | to set show/expand behavior for arrays or objects |
| [rank](#keyword/rank) | Expr | value to be used for orederind (enum, arrays)
| [dynamic](#keyword/dynamic) | Expr | an expression to dynamically set field value |
| [initialize](#keyword/initialize) | Expr | an expression to dynamically initialize field value |
| [change](#keyword/change) | Expr | and expression to execute when field is updated |
| [picker](#keyword/picker) | string | a name for user defined pick data flow | 
| [preview](#keyword/preview) | boolean | weither to show/hide data preview (thumbnail, ...) |
| [mimetype](#keyword/mimetype) | string | to set document mimetype (see format doc) |
| [precision](#keyword/precision)  | string | to set time presicion (ms, sec, min) |
| [group](#keyword/grouptab) | string | name for a list of field to  group | 
| [tab](#keyword/grouptab) | string | name for a tab to group a list of group |
