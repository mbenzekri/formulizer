
## Overview  

The `dynamic` keyword allows dynamic value calculation for a field.

>- It is a JavaScript expression that is evaluated within a controlled context.  
>- You can use `dynamic` on **any field type** (ensure you return a value of the appropriate type).  
>- To access form data from the expression, use JSON pointers (absolute or relative) with the **$\`...\`** template literal function.  
>- The expression is automatically recalculated when the data it depends on changes.  
>- Although the field is not automatically set to readonly (and may be changed manually), it is good practice to mark it as readonly.

For a deeper look at how dynamic expressions can be implemented, see the [expression chapter](#general/expression).

## ✅ Usage

This example shows how to set the current field to today's datetime:

```json
{
    "type": "string",
    "dynamic": "new Date().toISOString()",
    "readonly": true
}
```

This example shows how to set a field to a calculated value using data from the form (here, using root.a and root.b values):

```json
{
    "type": "string",
    "dynamic": "$`/a` +  $`/b`",
    "readonly": true
}
```

## Example Explained 

- **today**: Is set to today's datetime (using readonly to avoid user interaction)
  <pre onclick="this.innerHTML = form.sourceSchema.properties.today._toJSON(4)">...</pre>

- **distance**: Is calculated from weight and angle : `weight * sin(2 * angle * PI / 180)`

    First tranform degree to rad
  <pre onclick="this.innerHTML = form.sourceSchema.properties.theta._toJSON(4)">...</pre>
    Then calculate distance
  <pre onclick="this.innerHTML = form.sourceSchema.properties.distance._toJSON(4)">...</pre>

