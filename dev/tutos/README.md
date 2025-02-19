

## What is Formulizer

Formulizer is a W3C-compliant web component that dynamically renders UI forms based on 
a declarative JSON Schema to edit plain javascript objects.

>- The tag name of the component is `<fz-form>`
>- Formulizer is provided as a [W3C web component](https://www.webcomponents.org/introduction)
>- The form data description is provided as [JSON Schema ](https://json-schema.org/).
>- The data is provided and retrieved in Javascript plain object (JSON serializable).  
>- The bundle is provided as a unique javascript file to be loaded in your page.
>- Formulizer is developped using typescript and lit3.

## The inevitable "[Hello, world!](./hello.html)" tuto

```html
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello, world!</title>
    <script type="module" src="../dist/formulizer.js"></script>
</head>

<body>
    <fz-form id="my-form"></fz-form>
    <pre id="my-data"></pre>
    <script>
        
        const schema = {
            "title": "Hello ...",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                }
            }
        }

        const data = { "name" : "world" }

        window.addEventListener("load", () => {
            const formElem = document.getElementById("my-form")
            formElem.schema = schema
            formElem.data = data
            const dataElem = document.getElementById("my-data")
            dataElem.innerHTML = `Hello ${formElem.data.name}`
            formElem.addEventListener("change", () => {
                dataElem.innerHTML = `Hello ${formElem.data.name}`
            })
        })
    </script>
</body>
</html>
```
[History of Hello world...](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)

## Example explained

- load the library in the header:
    ```
        <script type="module" src="../dist/formulizer.js"></script>
    ```

- insert the formulizer tag and set attribute id to pick it later
    ```
        <fz-form id="my-form"></fz-form>
    ```

- describe your form using JSON SCHEMA (a declarative language for defining structure and constraints for JSON data) 
    ```
        const schema = {
            "title": "Hello ...",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                }
            }
        }
    ```

- provide your initial data to be edited by the form as plain javascript object 
    ```
        const data = { "name" : "world" }
    ```

- get de `<fz-form>` element from the page and set properties: `schema` (form description) and `data` (initial data) 
    ```
        const formElem = document.getElementById("my-form")
        formElem.schema = schema
        formElem.data = data
    ```

- get updated data from the form on "change" event
    ```
        formElem.addEventListener("change", () => {
            dataElem.innerHTML = `Hello ${formElem.data.name}`
        })
    ```
