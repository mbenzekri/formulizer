## ✅ Overview  

The `dynamic` keyword allow dynamic value calculation for a field.

>- It is a javascript expression that is evaluated in a precise context.
>- You can use `dynamic` on **any field type** (be sure to return suited typed value).
>- to access form data from the expression use pointer (absolute or relative) with $`...` template literal function.
>- It is automatically recalculated depending on the data use in the expression.
>- the field is not automaticaly set to readonly (may be changed manually) but it is a good practice to do so.

To have deeper view about how dynamic expressions may be coded see [expression chapter](#general/expression)

## ✅ Usage

This example show how to set current field to today' datetime 
```json
{
    "type": "string",
    "dynamic": "new Date().toISOString()",
    "readonly" : true
}
```

This example show how to set field a calculated value __using data from the form__
(here using root.a and root.b values)
```json
{
    "type": "sting",
    "dynamic": " $`/a` +  $`/b`",
    "readonly" : true
}
```

## Example explained 

- **today**: is set to today's date time (use readonly to avoid user interaction)
<pre onclick="this.innerHTML = JSON.stringify(form.sourceSchema.properties.today,undefined,4)" >...</pre>

- **distance**: is calculated from weight and angle : `" $\`/weight\` * Math.sin(2 * $\`/angle\` * Math.PI / 180)"`
<pre onclick="this.innerHTML = JSON.stringify(form.sourceSchema.properties.distance,undefined,4)" >...</pre>


