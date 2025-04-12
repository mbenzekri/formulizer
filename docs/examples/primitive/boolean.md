## Boolean Value
> Boolean values can be defined in JSON Schema to represent **true/false** choices. 
> Additionally, if needed, boolean fields can support an `null` (as **indeterminate state**) 
> to represent "not set/don't know" values.

## Basic Boolean Field
A standard boolean field in fz-form can be defined as:

```json
{
    "type": "boolean",
    "title": "I like to move it !"
}
```

- displayed as a **checkbox** by default.
- `true` → checkbox is checked.
- `false` → checkbox is unchecked .
- no value → checkbox indeterminate state.


## Boolean as radios buttons list
If a boolean field needs to support a "not set" or "unknown" state, it must explicitly allow `null`:

```json
{
    "type": ["boolean", "null"],
    "title": "Got it ?",
    "oneOf": [
        { "const": true, "title": "Yes" },
        { "const": false, "title": "No" },
        { "const": null, "title": "Don't know" }
    ]
}
```
- displayed as list of **radio buttons**.
- true/false/not set : depends on the cliked radio 


