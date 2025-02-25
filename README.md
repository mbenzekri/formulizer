# formulizer

JSON Schema driven WebComponent to display dynamic form (Bootstrap UI 5)    

## TODO LIST

- make Ajv validation work again
- replace local error checking by global one on form dispatch erros on fields
- Use dynamic / Pointers to replace data access and updates
- document build and directory structure 
- replace ref by `staticEnum(enumRef): enumItem[]` and add `asyncEnum(enumRef): Promise<enumItem[]>` 
- replace IAsset by selector(selectorRef,selectcb: (selected:string) => void,donecb:() => void, abortcb:()=>void) : Promise<void> 
    > Fz call options.selector() function and pass ref data, selectcb, donecb and abortcb
    > user code uses those functions to:
    >    - selectcb: to provide selected values
    >    - donecb: to validate selection
    >    - abortcb: to abort update
    >How to manage lists instead of single value