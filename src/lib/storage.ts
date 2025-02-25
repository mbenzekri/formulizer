import { StoreItem } from "../lib/types"

export interface IBlobStore {
    put(uuid: string, blob: Blob, filename: string, pointer: string): Promise<void>
    remove(uuid: string): Promise<void>
    get(uuid: string): Promise<StoreItem | undefined>
}

export class BlobStoreWrapper implements IBlobStore {
    private store: IBlobStore

    constructor(store: IBlobStore) {
        this.store = store
    }

    async put(uuid: string, blob: Blob, filename: string, pointer: string) {
        try {
            return this.store.put?.(uuid,blob,filename,pointer)
        } catch(e) {
            console.error(`storage: unable to put blob for uuid=${uuid} ptr=${pointer}\n    - ${String(e)}`)
        }
    }

    async remove(uuid: string) {
        try {
            return this.store.remove?.(uuid)
        } catch(e) {
            console.error(`storage: unable to remove blob for uuid=${uuid}\n    - ${String(e)}`)
        }
    }

    async get(uuid: string) {
        try {
            return this.store.get?.(uuid) ?? null
        } catch(e) {
            console.error(`storage: unable to get blob for uuid=${uuid}\n    - ${String(e)}`)
            return null
        }
   }

}

export class BlobCache implements IBlobStore {
    private cacheName: string
    private cache?: Cache

    constructor(cacheName: string) {
        this.cacheName = cacheName
    }

    private available(): boolean {
        return 'caches' in self
    }

    private async open(): Promise<void> {
        if (this.available()) this.cache = await caches.open(this.cacheName);
    }

    private async findKey(uuid: string) {
        const keys = await this.cache?.keys() ?? []
        for (const key of keys) {
            if (key.url.includes(uuid)) {
                const url = new URL(key.url)
                const filename = url.searchParams.get("name") ?? ""
                const response = await this.cache?.match(url, { ignoreSearch: true })
                const blob = await response?.blob()
                if (blob != null) return { uuid: uuid, blob: blob , filename}
            }
        }
        return null
    }

    async put(uuid: string, blob: Blob, filename: string, _pointer: string) {
        const url = `/${uuid}?name=${filename}`
        await this.open()
        await this.cache?.put(url, new Response(blob))
    }

    async remove(uuid: string) {
        await this.open()
        await this.cache?.delete(`/${uuid}`, { ignoreSearch: true })
    }

    async get(uuid: string) {
        await this.open()
        const found = await this.findKey(uuid)
        return found ?  found : null
    }


}


export class BlobMemory implements IBlobStore {
    store = new Map<string, StoreItem>()

    async put(uuid: string, blob: Blob, filename: string, _pointer: string) {
        this.store.set(uuid,{uuid, blob, filename})
    }

    async remove(uuid: string) {
        await this.store.delete(uuid)
    }

    async get(uuid: string) {
        return this.store.get(uuid)
    }

}
