## Keyword: `visible`

>The `visible` keyword controls whether a field is **shown or hidden** in your form.


## Usage

>- Allways visible when set to `true` (Default)
>- Allways hidden when set to false
>- use a string boolean expression to set it dynamically
    
💡: expression syntax  are discussed  → [chp. general/expression](#general/expression)


## 🔍 Example

- Ⓐ field `reason` will be use to switch visibility of other fields.
    <pre onclick="this.innerHTML = form.sourceSchema.properties.reason._toJSON(4)">...</pre>
- Ⓑ field `sorry` will be visible if reason is "Does not meet my needs".
    <pre onclick="this.innerHTML = form.sourceSchema.properties.sorry._toJSON(4)">...</pre>
- Ⓒ field `offer` will be visible if reason is "Too expensive".
    <pre onclick="this.innerHTML = form.sourceSchema.properties.offer._toJSON(4)">...</pre>

- Ⓓ field `canceled` will be visible if reason is "Project canceled".
    <pre onclick="this.innerHTML = form.sourceSchema.properties.canceled._toJSON(4)">...</pre>

- Ⓔ field `comment` will be visible if reason is "Other".
    <pre onclick="this.innerHTML = form.sourceSchema.properties.comment._toJSON(4)">...</pre>
