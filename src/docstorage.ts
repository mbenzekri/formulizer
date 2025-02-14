type PutFunc = (uuid: string, blob: Blob, filename: string, pointer: string) => Promise<void>
type RemoveFunc = (uuid: string) => Promise<void>
type GetFunc = (uuid: string) => Promise<{ filename: string, blob: Blob} | null>

type ObjStorage = {
    put: PutFunc,
    remove: RemoveFunc,
    get: GetFunc
}

export interface IDocStorage {
    put(uuid: string, blob: Blob, filename: string, pointer: string): Promise<void>
    remove(uuid: string): Promise<void>
    get(uuid: string): Promise<{ filename: string, blob: Blob} | null>
}

export class IDocUserStorage implements IDocStorage {
    userput: PutFunc
    userremove: RemoveFunc
    userget: GetFunc

    constructor(storage: ObjStorage) {
        const fct = ["put", "get", "remove"]

        if (!fct.every(f => (f in storage))) throw Error("Les méthodes put, get, remove d'options.storage ne sont pas toutes présentes.")
        if (!fct.every((f) => typeof (storage as any)[f] == "function")) throw Error("Les méthodes put, get, remove d'options.storage doivent être des fonctions.")
        this.userput = storage.put
        this.userremove = storage.remove
        this.userget = storage.get
    }

    async put(uuid: string, blob: Blob, filename: string, pointer: string): Promise<void> {
        return await this.userput(uuid, blob, filename, pointer)
    }
    async remove(uuid: string): Promise<void> {
        return await this.userremove(uuid)
    }
    async get(uuid: string): Promise<any> {
        return await this.userget(uuid)
    }
}

export class DocStorage implements IDocStorage {
    private cacheName: string
    private cache?: Cache
    private idData: string
    private filename: string | null = ""

    constructor(cacheName: string, idData: string) {
        this.cacheName = cacheName
        this.idData = idData
    }

    private available(): boolean {
        return 'caches' in self
    }

    private async open(): Promise<void> {
        if (this.available()) this.cache = await caches.open(this.cacheName);
    }

    // Adding to cache

    async put(uuid: string, blob: Blob, filename: string) {
        const url = `/FZ-FORM/${this.idData}/${uuid}?name=${filename}`
        await this.open()
        await this.cache?.put(url, new Response(blob))
    }

    // Removing entry from cache

    async remove(uuid: string) {
        const url = `/FZ-FORM/${this.idData}/${uuid}`
        await this.open()
        await this.cache?.delete(url, { ignoreSearch: true })
        this.filename = null
    }

    // get entry from cache

    findKey(cacheKeys: any, uuid: string) {
        if (cacheKeys) {
            for (const key of cacheKeys) {
                if (key.url.includes(uuid)) {
                    const url = new URL(key.url)
                    this.filename = url.searchParams.get("name")
                }
            }
        }
    }

    async get(uuid: string) {
        const url = `/FZ-FORM/${this.idData}/${uuid}`
        await this.open()
        const keys = await this.cache?.keys()
        this.findKey(keys, uuid)

        const response = await this.cache?.match(url, { ignoreSearch: true })
        const blob = await response?.blob()

        return (blob && this.filename) ? {
            blob: blob,
            filename: this.filename
        } : null
    }
}