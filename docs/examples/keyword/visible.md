## Keyword: `visible`

>The `visible` keyword controls whether a field is **shown or hidden** in your form.


## Always Visible (Default)

```json
{
    "type": "string",
    "visible": true
}
```

## Always Hidden

```json
{
    "type": "string",
    "visible": false
}
```

## Conditional Visibility (Using Expressions)

- provide a FzForm boolean expression (in string).
- the field will show or hide depending on the result.
- expression syntax  are discussed  → <a href=# onclick="goto('expression')">here</a>.

```json
{
    "type": "string",
    "visible": "$`1/reason` === 'other'"
}
```

