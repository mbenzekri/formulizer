## Filtering enumeration : `filter` keyword

>The `filter` extension keyword allows dynamically filtering **enum selection lists** based 
>on expressions evaluated against each list item. 
>This enables context-aware dropdowns or selection lists that adapt based on other form inputs.

## Definition
The `filter` keyword is added to an **enum field** and contains an **expression** that determines whether each enum item should be included in the available choices.

## Syntax
```json
"filter": "expression"
```
- The **expression** is evaluated for each enum item.
- The variable `value` represents the current enum item being evaluated.
- The **expression** can reference other form fields using `$` notation.

## Example: Filtering Countries Based on Europe Selection
```json
{
    "form": {
        "type": "object",
        "title": "Demo enum",
        "properties": {
            "europe": {
                "type": "boolean",
                "title": "Only Europe"
            },
            "country": {
                "type": "string",
                "filter": " $`1/europe` ? value.includes('(UE)') : true",
                "enum": [
                    "France (UE)",
                    "Germany (UE)",
                    "Spain (UE)",
                    "Italy (UE)",
                    "United Kingdom",
                    "United States",
                    "Canada",
                    "Brazil",
                    "Argentina",
                    "Mexico",
                    "China",
                    "Japan",
                    "India",
                    "Russia",
                    "Australia",
                    "South Africa"
                ]
            }
        }
    },
    "data": {}
}
```

- The **`europe`** field is a boolean toggle.
- The **`country`** field uses `filter` to adjust the available options dynamically:
  - If `europe` is `true`, only countries containing `"(UE)"` remain.
  - If `europe` is `false`, all countries are available.


