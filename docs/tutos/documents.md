## give it a try


## schema 

- `type` : must be "**string**"
- `format` : must "**doc**"
- options attribute provided to fz-form must contain an object property `storage` with following signature: 

```ts
{
    put: PutFunc: (uuid: string, blob: Blob, filename: string, pointer: string) => Promise<void>,
    remove: (uuid: string) => Promise<void>,
    get: (uuid: string) => Promise<{ filename: string, blob: Blob} | null
}
```




