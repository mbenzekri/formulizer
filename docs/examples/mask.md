# FzInputMask: User Documentation

## Introduction
`FzInputMask` is a field type in **Formulizer** that ensures users enter data in a structured format. It helps with inputs like:

- **Credit Card Numbers** (`####-####-####-####`)
- **Phone Numbers** (`+1 (###) ###-####`)
- **Social Security Numbers** (`###-##-####`)

## How to Use
### 1️⃣ **Defining a Masked Field in Your Form**
In **Formulizer**, you can define an input field with a `mask` property:
```json
{
    "type": "string",
    "title": "Credit Card Number",
    "mask": "####-####-####-####"
}
```
✅ This ensures the user enters a properly formatted credit card number.

### 2️⃣ **Examples of Masks**
| **Field Type**      | **Mask Format**        | **Example Input**       |
|---------------------|-----------------------|-------------------------|
| Credit Card        | `####-####-####-####`  | `1234-5678-9012-3456`   |
| US Phone Number    | `+1 (###) ###-####`    | `+1 (555) 123-4567`     |
| Social Security No.| `###-##-####`          | `123-45-6789`           |
| License Plate      | `AA-####`              | `AB-1234`               |
| Postal Code (FR)   | `#####`                | `75001`                 |

## Behavior in Formulizer
### **Typing and Formatting**
- Users **type only numbers**, static characters like `-`, `(`, `)` appear automatically.
- The **saved value is the same as what is displayed**.
- Example: Typing `1234` into a field with `####-####` will display `1234-`.

### **Editing Values**
- **Backspace/Delete work naturally**:
  - **Backspace** removes the previous number while keeping the format.
  - **Delete** removes the next number while keeping the format.
- **Cursor movement** is preserved:
  - Arrow keys allow users to navigate between numbers.
  - The cursor skips over static characters.

### **Validating Input**
- The mask ensures **only valid input is accepted**.
- If a required field is incomplete, Formulizer will mark it as **invalid**.

## Example in a Formulizer Form
To define a field inside a Formulizer form:
```json
{
    "type": "object",
    "title": "User Information",
    "properties": {
        "phone": {
            "type": "string",
            "title": "Phone Number",
            "mask": "+1 (###) ###-####"
        }
    }
}
```
✅ This ensures the user enters a phone number in the correct format.

## Summary
✅ **Formulizer automatically applies formatting** as users type.
✅ **Users do not need to worry about special characters (`-`, `(`, `)`).**
✅ **Stored values match exactly what is displayed.**
✅ **Validation ensures the format is respected.**

With `FzInputMask`, Formulizer provides a smooth and structured input experience!

