
## Overview

The `collapsed` keyword in `FzForm` extends JSON Schema to manage the visual state of complex fields (objects or arrays), determining whether they appear expanded or collapsed.

## Description

The `collapsed` keyword accepts the following values:

- `"never"`: The field is always expanded and cannot be collapsed.
- `"always"`: The field is always collapsed and cannot be expanded.
- `"true"`: The field starts collapsed but can be toggled by the user.
- `"false"`: The field starts expanded but can be toggled by the user. This is the default behavior if `collapsed` is not specified.

## Usage

Use the `collapsed` keyword within the schema definition of an object or array field to control its initial display state.

### Examples

1. **Expanded on Init (`"false"`)**
   ```json
   "adr1": {
     "$ref": "#/definitions/address",
     "title": "Expanded (on init)",
     "collapsed": "false"
   }
   ```

2. **Collapsed on Init (`"true"`)**
   ```json
   "adr2": {
     "$ref": "#/definitions/address",
     "title": "Collapsed (on init)",
     "collapsed": "true"
   }
   ```

3. **Never Collapsed (`"never"`)**
   ```json
   "adr3": {
     "$ref": "#/definitions/address",
     "title": "Never Collapsed",
     "collapsed": "never"
   }
   ```

4. **Always Collapsed (`"always"`)**
   ```json
   "adr4": {
     "$ref": "#/definitions/address",
     "title": "Always Collapsed",
     "collapsed": "always"
   }
   ```

These examples demonstrate how to use the `collapsed` keyword to control the visual state of fields in `FzForm`.

---

This documentation provides a clear and concise explanation of the `collapsed` keyword, including its purpose, possible values, and examples for each use case. If you need any further modifications or additional information, feel free to ask!