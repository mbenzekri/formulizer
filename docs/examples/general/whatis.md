

## Overview

fz-form is a W3C-compliant web component that dynamically renders UI forms. Formz produced by fz-form are described by 
an extended JSON Schema format.

>- fz-form is provided as a [W3C web component](https://www.webcomponents.org/introduction)
>- The component (tag: `<fz-form>`) expect a form description (`schema` property) and initial data (`data` property)
>- The form description is provided in [JSON Schema ](https://json-schema.org/) format.
>- fz-form extends JSON Schema with UI and Form [specific keywords](#general/schema).
>- The generated form UI is designed with bootstrap 5 [bootstrap integration](#general/bootstrap).
>- The data is provided and retrieved in JSON (JSON serializable JS objects).
>- The bundle is provided as a unique javascript file to be loaded in your page (provide in CDN).
>- fz-form is developped using typescript and lit3.

## This documentation 

This page is the root of the fz-form documentation.Here is some important pages:
>- `<fz-form>` web component [documentation](#general/api)
>- JSON Schema keywords and how that impact the form rendering: [JSON Schema](#general/schema)
>- fz-form  added keywords to manage form specific features : [JSON Schema](#general/schema)
>- how to add dynamic behavior in fz-form with [evaluated expression](#general/expression)
>- a special page dedicated to the  [emptiness problem](#general/typenull)
>- Some examples : use the search box to select an example or click a Table Of Content item.

## 💡 A tribute to ["hello world"](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program)...

You could test the hello world tuto here :[Hello, world!](./hello.html)"

### Hello world explained

- load fz-form library in the header:
    ```
        <script type="module" src="./formulizer.js"></script>
    ```

- insert the fz-form tag and set attribute id to pick it later
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
                    "dynamic": " `Hello, ${ $`#/who` } !` ",
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
    - "dynamic" property to dynamicaly calculate field value (see ...) 

- set the property `data` with initial data to be edited by the form as plain javascript object
    ```
        form.data = { "who" : "world" }
    ```

- get updated data from the form using "update" event
    ```
        form.addEventListener("update", () => {
            document.getElementById("mydata").innerHTML = JSON.stringify(form.data)
        })
    ```
