
## Embedded Enum (`from`)
> FzForm introduces the `from` extension keyword to dynamically populate an enum list from an embedded value present in the form data. 
> This allows referencing an existing list elsewhere in the form and ensures that selection values remain consistent.

## Defining `from`
To define an embedded enum use extension keyword "from" (object) and provide following properties:
- **`from`**: (string) A JSON Pointer (`#/path/to/data`) to the array containing valid choices.
- **`key`**: (string) indicates the property in each object within `from` that should be used as the enum values.
- **`extend`**: (boolean) if true indicates that from list may be extended in place else only present value are selectable.

As human readable labels list FzForm will use **`abstract`** of each value in the list 

## 🔍 Example
```json
{
    "type": "object",
    "properties": {
        "addresses": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": { "type": "string" },
                    "street": { "type": "string", "abstract": "Street Name" }
                }
            }
        },
        "selectedAddress": {
            "type": "string",
            "from": { "pointer": "#/addresses", "key": "id" }
        }
    }
}
```

