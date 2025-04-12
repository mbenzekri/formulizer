

The `title` keyword provide a **label** for each property.

## ✅ Usage

>- You can use `title` on **any field type**.
>- It displays a **label** for the property aside the input.
>- Set it to "" (epmty string) to remove label

```json
"name": {
   "type": "string",
   "title": "First name",
   ...
}
```

## 🔍 Example explained

- Ⓐ field has a `title` to shows the "First name" label (primitive types).
    <pre onclick="this.innerHTML = form.sourceSchema.properties.name._toJSON(4)">...</pre>

- Ⓑ field is special case as checkboxes show label at right side.
    <pre onclick="this.innerHTML = form.sourceSchema.properties.gotit._toJSON(4)">...</pre>

- Ⓒ set`title`  to "" to hide the label .
  <pre onclick="this.innerHTML = form.sourceSchema.properties.nolabel._toJSON(4)">...</pre>

- Ⓓ field shows `title` for an **array**.
  You can click on the label to expand/hide array content.
    <pre onclick="this.innerHTML = form.sourceSchema.properties.palette._toJSON(4)">...</pre>

- Ⓔ field shows `title` for an **object**.
  You can click on the label to expand/hide object content.
  <pre onclick="this.innerHTML = form.sourceSchema.properties.palette._toJSON(4)">...</pre>



