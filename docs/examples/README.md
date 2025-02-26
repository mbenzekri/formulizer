

## What is Formulizer

Formulizer is a W3C-compliant web component that dynamically renders UI forms based on 
a declarative JSON Schema to edit plain javascript objects.

>- Formulizer is provided as a [W3C web component](https://www.webcomponents.org/introduction)
>- The component (tag: `<fz-form>`) expect a form description (in `schema` property) and initial data (in `data` property)
>- The form description is provided as [JSON Schema ](https://json-schema.org/).
>- The generated form UI is designed with bootstrap 5.
>- JSON Schema didn't provided UI oriented keywords therefor keywords have been added to customize your form
>- The data is provided and retrieved in Javascript plain object (JSON serializable).  
>- The bundle is provided as a unique javascript file to be loaded in your page (provide in CDN).
>- Formulizer is developped using typescript and lit3.

## How to read this documentation 

This README page is the root of the formulizer documentation.
Here is some important pages.
- `<fz-form>` web component API documentation (go there link)
- JSON Schema keywords and how that impact the form rendering (go there link)
- Some examples : use the search box to select an example (ch. Examples)

## The unsurprising "[Hello, world!](./hello.html)" tuto

```html
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="module" src="./formulizer.js"></script>
    </head>
    <body>
        <fz-form id="myform" ></fz-form>
        <pre id="mydata" lang=""></pre>
        <script>
            window.onload = () => {
                const form = document.getElementById("myform")
                form.schema = {
                    "title": "Say hello to...",
                    "type": "object",
                    "properties": {
                        "who": {
                            "type": "string",
                        },
                        "hello": {
                            "type": "string",
                            "expression": " `Hello, ${ $`#/who` } !` ",
                            "readonly" : true
                        }
                    }
                }
                form.data = { "who" : "world!" }
                form.addEventListener("change", () => {
                    document.getElementById("mydata").innerHTML = JSON.stringify(form.data)
                })
            }
        </script>
    </body>
</html>
```
[History of Hello world...](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)

## Example explained

- load formulizer library in the header:
    ```
        <script type="module" src="./formulizer.js"></script>
    ```

- insert the formulizer tag and set attribute id to pick it later
    ```
        <fz-form id="myform" ></fz-form>
    ```

- in the on load handler, get de `<fz-form>` element from the page 
    ```
        const form = document.getElementById("myform")
    ```

- set property `schema` of your form using JSON SCHEMA 

    JSONSchema is a declarative language for defining structure and constraints for JSON data
    ```
        form.schema = {
            "title": "Say hello to...",
            "type": "object",
            "properties": {
                "who": {
                    "type": "string",
                },
                "hello": {
                    "type": "string",
                    "expression": " `Hello, ${ $`#/who` } !` ",
                    "readonly" : true
                }
            }
        }
    ```
    - First bracketed object describe the root object (type object)
    - "properties"  describle the object expected properties
    - a property "who" of type "string" to store to who you say hello
    - a property "hello" of type "string" to store the hello result
    - "readonly" property to avoid user modification to this field (see ...)
    - "expression" property to dynamicaly calculate field value (see ...) 

- set the property `data` with initial data to be edited by the form as plain javascript object
    ```
        form.data = { "who" : "world" }
    ```

- get updated data from the form using "change" event
    ```
        form.addEventListener("change", () => {
            document.getElementById("mydata").innerHTML = JSON.stringify(form.data)
        })
    ```
