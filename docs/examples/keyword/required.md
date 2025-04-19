## `required` & `requiredIf` keywords

>The `required` keyword is the standard JSON Schema property used to mark fields as mandatory. 
>FzForm honors this by visually indicating required fields but dont prevent form submission (it's let to app).
>
>The `requiredIf` keyword is a FzForm extension that makes a field required **conditionally**, based on a dynamic expression.

## ✅ Usage

- **`required`**  
  An array of property names. Any field listed here is always required. 
  FzForm will mark it as required and alert if not present  (see valid/invalid/errors method and properties).

- **`requiredIf`**  
  A string containing a JavaScript expression. Use the `$` template literal to access other fields via JSON pointers. 
  When the expression evaluates to `true`, the field becomes required; when `false`, it remains optional.

## 🔍 Example

- Ⓐ field is isted under `"required"`, so this field is always mandatory.

This is the static way to declare a field as required
```json
{
    "type": "object",
    "title": "required and requiredIf demo",
    "properties": {
      "fullname": { ... },
      "getnews": { ... },
      "email": { ... }
    },
    "required": ["fullname"]
}
```

- Ⓑ field a checkbox that lets the user opt in for a newsletter.
    <pre onclick="this.innerHTML = form.sourceSchema.properties.getnews._toJSON(4)">...</pre>

- Ⓒ field switched to `required` or not required depending on "getnews" field.

  When `/getnews` is `true` → **email** becomes required.  
  When `/getnews` is `false` → **email** stays optional.

  <pre onclick="this.innerHTML = form.sourceSchema.properties.email._toJSON(4)">...</pre>
