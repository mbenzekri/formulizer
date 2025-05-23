## Overview

fz-form makes extensive use of string expressions (since JSON does not permit JavaScript expressions).

>- String expressions are strings containing JavaScript code (only expressions, not statements such as if, while, or for).
>- An expression is associated with the field in which it is defined.
>- Expressions are evaluated dynamically based on their dependencies on other fields (see $`...`).


Two kinds of JavaScript code are handled in fz-form:

- **Expressions:**  
    Full JavaScript expressions (without statements) that compute values and are re-evaluated when their dependencies change.
    ```
        " value.map(x => x.id).join(',') "`
    ```
    Supposing field is an array of object with an "id" property, this expression will return a string joining all the ids.

- **String Literals:**  
    Plain strings that include embedded dynamic parts (via the $ interpolation syntax) and are also recomputed whenever their dependencies change.
    ```
        "${ $`/firstname` } ${ $`/lastname` }"
    ```
    Supposing field is a string to store full name, this string literal will concatenate firstname an lastname properties.


## Dynamic Expression Context Variables

whether for 'expressions' or 'literal strings' the provided code is executed in a specific context of local variables.

The context define the following variables:
- **`schema`**: the schema object of the current field in which the expression is defined.
- **`value`**: the value of the current field.
- **`parent`**: the parent of the current value (i.e., the object or array that contains the current field), equivalent to `$`1.
- **`key`**: the property name (if the parent is an object) or the index (if the parent is an array) of the current field.
- **`appdata`**: application-provided data for managing app-specific use cases.
- **`$`**: the template literal function for form data access (see details above).

⚠️ : JS code is executed in a sandboxed context, then all globals (windows, document, ...) are not accessible within expressions 
only javascript globals are provided (Math, Object, Date...)


## The `$` Template Literal Function

The **$** template literal function is available in expressions for accessing form data.

- The `$` function retrieves a value from the form data.
- It takes a JSON pointer (passed as a template literal) and returns the corresponding value.
- It supports both relative and absolute JSON pointer strings.

>**IMPORTANT**:  
>To access form data and preserve dynamic calculation, the use of the **$\`...\`** function is mandatory. 
>This usage allows fz-form to determine expression dependencies and recalculate dependent expressions. 
>It ensures that dynamic expressions refer to the correct data in the form.
>
>Please avoid introducing circular dependencies between expressions. 
>To prevent an infinite loop, fz-form will automatically break all circular dependencies.

**Syntax:**  

Use template literal syntax (or a string literal) to specify the pointer. For example:
  
- **$\`1/base\`**: This expression dereferences the field located at the JSON pointer `1/base` (relative to the current field).
- **$\`/multiplier\`**: This expression dereferences the field located at the JSON pointer `/multiplier` (absolute position in the form data).

Consider a dynamic expression that multiplies the values of two fields (one relative, one absolute).

<pre onclick="this.innerHTML = form.sourceSchema.properties.result._toJSON(4)">...</pre>

In this case:
- **`$`** retrieves the current values for the fields `base` and `multiplier` using their respective JSON pointers.
- The multiplication is then computed based on those fetched values.

