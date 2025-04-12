
## Keyword: `abstract`

The `abstract` keyword helps provide a **readable summary** of a property in different situations.
- when 'object' panel is collapsed
- when item of 'array' is displayed (not displayed for edition)
- when choice list are displayed for selection

## Usage

>- You can use `abstract` on **any field type**.
>- It displays a **short summary** of the property value to improve readability in various contexts.
>- If the property is an **`object`**, the summary appears at the top of its section (see [`collapsed`](#collapsed)).
>- If the property is an **`array`**, the summary appears in place of the items that are not currently edited.
>- `abstract` is used in other context likz list, select,typeahed where expanded form version is not relevant.
>- The value must be a [template string](#template_string) that defines what the summary should look like.
>- If `abstract` is not set, a **default summary** is automatically generated (recursive concatenation).

```json
"name": {
   "type": "object",
   "abstract": "${$`firstname`} ${lastname}",
   ...
}
```

## 🔍 Example

- Ⓐ field has an `abstract` that shows the first and last name of a contact..
    <pre onclick="this.innerHTML = form.sourceSchema.properties.user._toJSON(4)">...</pre>

- Ⓑ field does not have an `abstract`, so a **default summary** is used.
    <pre onclick="this.innerHTML = form.sourceSchema.properties.default._toJSON(4)">...</pre>

- Ⓒ field shows `abstract` for an **empty property (null|undefined)**.
  <pre onclick="this.innerHTML = form.sourceSchema.properties.empty._toJSON(4)">...</pre>


💡: You can **click on the panel headers** to expand and see the full objects property.

