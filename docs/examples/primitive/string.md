
## Overview

The `string` type in `fz-form` is used to define fields that accept text input. This type supports several JSON Schema keywords that allow you to validate and constrain the input, ensuring it meets specific criteria.

## Description

### `type: "string"`

- **Purpose**: Specifies that the field is a text input.
- **Usage**: Use this type for any field that requires textual data, such as names, descriptions, or codes.

### `maxLength`

- **Purpose**: Defines the maximum number of characters allowed in the input.
- **Behavior**: Prevents the user from entering more characters than the specified limit.
- **Example**:
  ```json
  "maxLength": 8
  ```
  - Limits the input to a maximum of 8 characters.

### `minLength`

- **Purpose**: Defines the minimum number of characters required in the input.
- **Behavior**: Generates an error if the input length is less than the specified minimum.
- **Example**:
  ```json
  "minLength": 5
  ```
  - Requires the input to be at least 5 characters long.

### `pattern`

- **Purpose**: Specifies a regular expression pattern that the input must match.
- **Behavior**: Shows an error if the input does not conform to the specified pattern.
- **Example**:
  ```json
  "pattern": "^[A-Z]*$"
  ```
  - Ensures that only uppercase letters are allowed in the input.


