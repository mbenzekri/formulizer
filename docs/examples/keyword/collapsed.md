
## Overview

The `collapsed` keyword extends JSON Schema to manage the visual state of complex fields (objects or arrays), 
determining whether they appear expanded or collapsed.

## Description

The `collapsed` keyword accepts the following values:

- `"never"`: The field is always expanded and cannot be collapsed.
- `"always"`: The field is always collapsed and cannot be expanded.
- `true`: The field starts collapsed but can be toggled by the user.
- `false`: The field starts expanded but can be toggled by the user (default).

## Usage

Use the `collapsed` keyword within the schema definition of an object or array field to control its initial display state.

### 🔍 Examples

1. Ⓐ field **Expanded on Init**: `false`
  <pre onclick="this.innerHTML = form.sourceSchema.properties.adr1._toJSON(4)">...</pre>

2. Ⓑ field **Collapsed on Init**: `true`
  <pre onclick="this.innerHTML = form.sourceSchema.properties.adr2._toJSON(4)">...</pre>

3. Ⓒ field **Never Collapsed**: `"never"`
  <pre onclick="this.innerHTML = form.sourceSchema.properties.adr3._toJSON(4)">...</pre>

4. Ⓓ field **Always Collapsed**: `"always"`
  <pre onclick="this.innerHTML = form.sourceSchema.properties.adr4._toJSON(4)">...</pre>

These examples demonstrate how to use the `collapsed` keyword to control the visual state of fields in `fz-form`.
