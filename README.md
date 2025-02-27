# formulizer

JSON Schema driven WebComponent to display dynamic form (Bootstrap UI 5)    

## TODO LIST

- ISSUE: in the documentation click chapter "'format' keyword" then "Basic fields"
    the field geolocation from previous form stay displayed in second form
- test Ajv validation working again
- replace local validation for each field by gloabl validation and error dispatching on fields 
- Use dynamic / Pointers to replace data access and updates
- document project build and directory structure 
- replace ref by `staticEnum(enumRef): enumItem[]` and add `asyncEnum(enumRef): Promise<enumItem[]>` 
- replace IAsset by selector(selectorRef,selectcb: (selected:string) => void,donecb:() => void, abortcb:()=>void) : Promise<void> 
    > Fz call options.selector() function and pass ref data, selectcb, donecb and abortcb
    > user code uses those functions to:
    >    - selectcb: to provide selected values
    >    - donecb: to validate selection
    >    - abortcb: to abort update
    >How to manage lists instead of single value