
## Keyword: `readonly`

The `readonly` keyword provided dynamic field read only locking/unlocking.
- set it to true or false for a static readonly state (default is false)
- set it to a dynamic expression to make it dependant on some conditions.


## 🔍 Example

- Ⓐ field : `readonly`is set to true to avoid changing nickname
    <pre onclick="this.innerHTML = form.sourceSchema.properties.nickname._toJSON(4)">...</pre>

- Ⓑ field is used as a switcher to lock/unlock password field access
    <pre onclick="this.innerHTML = form.sourceSchema.properties.change._toJSON(4)">...</pre>

- Ⓒ field shows `readonly` dynamic setting when "change" property is updated.
  <pre onclick="this.innerHTML = form.sourceSchema.properties.password._toJSON(4)">...</pre>

💡: **try to change** "nickname" readonly locked field .
💡: **click the change checkbox** make password field locked/unlocked.

