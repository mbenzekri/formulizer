## Basic enumeration

>Formulizer adapts how enum fields are displayed based on the number of available options.
>- Small lists use radio buttons for quick selection.
>- Medium lists use dropdowns for easy browsing.
>- Large lists use typeahead search for efficiency.
> you can specify the input you want (see force input)

__🎨 Display Rules__

| Number of Options | Display Method |
|------------------|---------------|
| **1 - 3** options | Option List (Radio Buttons) |
| **4 - 20** options | Dropdown List |
| **21+** options | Typeahead Input (Searchable Dropdown) |

## 🔍 Example
- **`answer` enum** (2 options: "yes", "no") → **Radio buttons**.
- **`color` enum** (4 options) → **Dropdown list**.
- **`country` enum** (25 options) → **Typeahead input**.

