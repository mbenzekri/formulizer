## Enum with Labels

> FzForm supports defining enums with human-readable labels using the standard JSON Schema **`oneOf`** construct.

## Defining Labeled Enumerations
A labeled enum is defined with **`oneOf`**, where each option has:
- **`const`**: The stored value.
- **`title`**: The user-visible label.

## 🔍 Example
```json
{
    ...
    "oneOf": [
        { "const": 1, "title": "Doc" },
        { "const": 2, "title": "Sneezy" },
        { "const": 3, "title": "Sleepy" },
        { "const": 4, "title": "Grumpy" },
        { "const": 5, "title": "Happy" },
        { "const": 6, "title": "Bashful" },
        { "const": 7, "title": "Dopey" }
    ]
    ...
}
```
