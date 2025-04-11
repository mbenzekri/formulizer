
## Overview

`FzForm` allows users to display Markdown content within a field by specifying a `type` of `"string"` and a `format` of `"markdown"`. This feature enables the rendering of rich text using Markdown syntax.

## Description

To use the Markdown feature, you must define a field with the following properties:

- `type`: Set to `"string"`.
- `format`: Set to `"markdown"`.
- `expression`: An array of template literals containing the Markdown code to be rendered.

### Configuration

- **On-Demand Loading**: The Markdown-it library, while not heavy in terms of performance, adds a significant size (126 KB) to the application bundle. To optimize loading times, this feature is not enabled by default. To use the Markdown feature, add the boolean attribute `usemarkdown` to your `<fz-form>` tag.

  ```html
  <fz-form usemarkdown></fz-form>
  ```

### Usage

The Markdown feature is useful for displaying formatted text, such as headers, lists, links, or any other Markdown-supported elements, directly within a form field.

### Example

```json
{
  "type": "string",
  "format": "markdown",
  "dynamic": [
    "# Welcome to FzForm",
    "This is a **Markdown** example with data: ${$`/a/b/c`}.",
    "- Bullet point 1",
    "- Bullet point 2",
    "[Learn more about Markdown](https://www.markdownguide.org/)"
  ]
}
```

### Explanation

- **`type`**: Specifies that the field is a string.
- **`format`**: Indicates that the string content should be interpreted as Markdown.
- **`expression`**: Contains the Markdown code as an array of template literals. Each string in the array represents a line of Markdown.
  - Ensure that the Markdown content is valid and follows standard Markdown syntax.
  - **Template Literals**: Use `${}` to embed data extracted from the form.
  - **Data Extraction**: Use the `$` function with a JSON Pointer to extract data from the form. For example, `${$`/a/b/c`}` retrieves data from `root.a.b.c`.


### Implementation Details

- **Markdown-it**: `FzForm` uses [Markdown-it](https://github.com/markdown-it/markdown-it) to parse and render Markdown content. Markdown-it is a flexible, extensible, and fast Markdown parser with plugins for additional functionality.


