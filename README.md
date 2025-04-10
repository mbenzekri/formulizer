# FzForm

JSON Schema driven WebComponent to display dynamic form (Bootstrap UI 5)    
- developement technologies: typescript, lit3 (Web component), bootstrap, rollup, JSON Schema draft07, ajv 
- test: Playwright
- doc: hand made : TOC + Markdown page + example
- debug: devtools / Live Server

## development

```
./
│
├─ .vscode      : VSCODE config
├─ dist         : distribution bundles (dev bundle, minified, lazy modules)
├─ docs         : documentation (toc `dist/index.html`)
├─ src          : FzForm source code (typescript)
└─ tests        : Playwright E2E test suites
```


### checkout the project 
>```
>git clone https://github.com/mbenzekri/formulizer.git 
>```

### install
>```
>npm install
>```

### build 
- dev and production
>```
>npm build
>```
- dev only 
>```
>npm build:dev
>```
- watch build for debuging
>```
>npm run build:watch
>```

### view documentation 
- Ensure Live Sserver running and open [docs link](http://127.0.0.1:5500/docs/index.html) 

### debug specific schema/data

- update `./docs/debug.json` file with the initial schema/data to debug
- Ensure Live Sserver running and open [debug link](http://127.0.0.1:5500/docs/debug.html#debug) 

## Directory structure
# TODO LIST

- from to data example not working
- ISSUE: in the documentation click chapter "'format' keyword" then "Basic fields"
    the field geolocation from previous form stay displayed in second form

- Use dynamic / Pointers to replace data access and updates
- document project build and directory structure 
- replace IAsset by selector(selectorRef,selectcb: (selected:string) => void,donecb:() => void, abortcb:()=>void) : Promise<void> 
    > Fz call options.selector() function and pass ref data, selectcb, donecb and abortcb
    > user code uses those functions to:
    >    - selectcb: to provide selected values
    >    - donecb: to validate selection
    >    - abortcb: to abort update
    >How to manage lists instead of single value