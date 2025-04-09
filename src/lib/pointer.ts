
const POINTER_RE = /^(?:\d+|\/(?:[^/~]*(?:~[01])?)*)$/;
export class Pointer {
    private readonly root: any
    private readonly path: (string | number)[]
    private readonly key?: string | number

    constructor(root: any, pointer = "/") {
        if (!pointer.startsWith("/")) throw new Error(`Pointer.constructor: ${pointer}" must start with '/'`)
        this.root = root
        const parts = this.parse(pointer)
        this.path = parts.path
        this.key = parts.key
    }
    private parse(pointer: string) {
        if (!POINTER_RE.test(pointer)) throw new Error(`Pointer.parse: Malformed Pointer: "${pointer}"`);
    
        const tokens = pointer
            .replace(/~1/g, "/").replace(/~0/g, "~")
            .split("/")
            .map(token => /^\d+$/.test(token) ? parseInt(token, 10) : token);
    
        const first = tokens.shift();
        const up = first === "" ? -1 : (first as number); // -1 means absolute pointer
        const path: (string | number)[] = tokens.length > 1 ? tokens.slice(0, -1) : [];
        const key: string | number | undefined = tokens.length ? tokens[tokens.length - 1] : undefined;
    
        return { up, path, key };
    }
    
    at(pointer: string): Pointer {
        const { up, path, key } = this.parse(pointer); // Reuse `parse`
        if (up === -1)  return new Pointer(this.root, pointer);
        const tokens = this.path.slice(0, Math.max(0, this.path.length - up)).concat(path);
        return new Pointer(this.root, `/${tokens.join("/")}/${key ?? ""}`);
    }

    set value(newValue: any) {
        if (this.isRoot) throw new Error("Pointer.del: Cannot set root");
        const parent = this.path.reduce((acc, token) => acc?.[token], this.root);
        if (parent === undefined)  throw new Error(`Pointer.value: Path not found: "${this.path}"`);
        parent[this.key!] = newValue;
    }

    del(): void {
        if (this.isRoot) throw new Error("Pointer.del: Cannot delete root")
        const parent = this.path.reduce((acc, token) => acc?.[token], this.root)
        if (parent === undefined) throw new Error(`Pointer.del: Path not found: "${this.path}"`)
        parent[this.key!] = undefined
    }

    get parent(): Pointer | null {
        return (this.path.length === 0) ? null : new Pointer(this.root, `/${this.path.join("/")}`);
    }
    toString() {
        return `/${this.path.join("/")}/${this.key ?? ""}`
    }
    toJSON() {
        return this.toString()
    }
    get isRoot() {
        return (this.path.length === 0) 
    }
}
