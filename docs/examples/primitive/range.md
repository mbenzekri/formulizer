
## Configuration

The `FzForm` range input is used for integer type within a specified range (few possible values). 
It is automatically infered when the JSON schema defines an integer type with both lower and upper limits and an optional `multipleOf` 
property, provided the number of possible values is 10 or fewer.

Ensure the schema is correctly configured to meet these criteria for the range input to appear.

- **`type`**: Must be set to `"integer"`.
- **`minimum`** and **`maximum`** or **`exclusiveMinimum`** and **`exclusiveMaximum`**: Define the lower and upper bounds of the range.
- **`multipleOf`** (optional): Specifies the increment between possible values. Defaults to `1` for integers if not specified.


## Example 1: Basic Range with Default Increment

```json
{
  "type": "integer",
  "title": "range [1,5]",
  "minimum": 1,
  "maximum": 5
}
```

- **Description**: Defines a range from 1 to 5 with a default increment of 1.
- **Possible Values**: 1, 2, 3, 4, 5 (5 values).

## Example 2: Range with Custom Increment

```json
{
  "type": "integer",
  "title": "range ]10,100[",
  "exclusiveMinimum": 10,
  "exclusiveMaximum": 100,
  "multipleOf": 10
}
```

- **Description**: Defines a range from 20 to 90 with an increment of 10.
- **Possible Values**: 20, 30, 40, ..., 90 (8 values).


