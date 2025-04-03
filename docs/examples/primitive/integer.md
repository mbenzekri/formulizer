
In FzForm, integer fields are defined using the `type` keyword set to `"integer"`. 
Integer fields can have specific constraints to ensure data integrity and enhance user experience.

## Properties

### `type`

- **Value**: `"integer"`
- **Description**: Specifies that the field should accept integer values.

### Constraints

- **`minimum`**: Specifies the minimum value (inclusive) that the integer field can accept.
- **`maximum`**: Specifies the maximum value (inclusive) that the integer field can accept.
- **`exclusiveMinimum`**: Specifies the minimum value (exclusive) that the integer field can accept.
- **`exclusiveMaximum`**: Specifies the maximum value (exclusive) that the integer field can accept.
- **`multipleOf`**: Specifies that the integer value must be a multiple of the given number. 


## Usage

- **Validation**: Constraints like `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`, and `multipleOf` validate the integer input. Non-conforming inputs generate errors.
- **User Experience**: The multipleOf property sets the step attribute of the input field, allowing users to increment or decrement the value by the specified amount, to guiding them to enter valid multiples.
