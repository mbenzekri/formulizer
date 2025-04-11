## Overview

fz-form do a large usage of string expression (as JSON doesnt permit Js expressions)

>- String expression are string containing javascript code (not statements, if, while, for) but JS expressions 
>- An expression is associated to the field where it is defined ()
>- Expressions are evaluated dynamicly depending their dependencies with other fields (see $`...`)

# Dynamic Expression Context Variables

When building dynamic expressions in FzForm, a context of local variables is provided  to each evaluated expression.

- `schema` : the schema object of the current field where expression is defined
- `value` : the value of the current field
- `parent` : the parent of the current value (object or array embeding current field) (same as $`1`)
- `key` : name of the property (parent is object) or index in array (parent is array) of the current field
- `appdata`:  the application provided data to manage app specific use cases
- `$`: template literal function for form data access

## The $\`...\` Function

The **$** template literal function is available to use in expression to access form data.
 
- The `$` function is used to retrieve the value from the form data .
- The `$` function takes a JSON pointer (passed as a template literal) and returns the corresponding value.
- It supports both relative and absolute JSON pointer strings.

>**IMPORTANT**: 
>to access form data and preserve dynamic calculation the use of $`...` function is mandatory. 
>this usage permtits fz-form to locate the expression dependencies and recalculate dependent expressions.
>This ensures that dynamic expressions refer to the correct data in the form, even when the field names or structure change.

**Syntax:**  

Use the template literal syntax (or a string literal) to specify the pointer. For example:
  
-  $`1/base` : This expression dereferences the field located at the JSON pointer `1/base` (relatively to current field).
-  $`/multiplier` : This expression dereferences the field located at the JSON pointer `/multiplier` (absolute position in form data).

Consider a dynamic expression that multiplies the values of two fields (one relative one absolute).

<pre onclick="this.innerHTML = form.sourceSchema.properties.result._toJSON(4)" >...</pre>
In this case:
- `$` retrieves the current values for the fields `base` and `multiplier` using their respective JSON pointers.
- The multiplication is then computed based on those fetched values.

