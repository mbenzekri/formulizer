import { CompilationStep } from "./types";
import { JSONSchema } from "./types";

export class CSUpgradeNullable extends CompilationStep {
    constructor(root: JSONSchema) {
        super(root, "nullable");
    }

    override appliable(schema: JSONSchema): boolean {
        return this.property in schema;
    }

    override apply(schema: JSONSchema): void {
        schema.type = Array.isArray(schema.type) ? [...schema.type, "null"] : [schema.type, "null"];
        schema[this.property] = undefined;
    }
}

export class CSUpgradeId extends CompilationStep {
    constructor(root: JSONSchema) {
        super(root, "$id");
    }

    override appliable(schema: JSONSchema): boolean {
        return this.property in schema && (schema.$id as string).includes("#");
    }

    override apply(schema: JSONSchema): void {
        const [base, anchor] = (schema.$id as string).split("#");
        schema.$id = base;
        schema.$anchor = anchor;
    }
}

export class CSUpgradeDependencies extends CompilationStep {
    constructor(root: JSONSchema) {
        super(root, "dependencies");
    }

    override appliable(schema: JSONSchema): boolean {
        return this.property in schema;
    }

    override apply(schema: JSONSchema): void {
        schema.dependentRequired = { ...(schema[this.property] as object) };
        schema[this.property] = undefined;
    }
}

export class CSUpgradeItems extends CompilationStep {
    constructor(root: JSONSchema) {
        super(root, "items");
    }

    override appliable(schema: JSONSchema): boolean {
        return Array.isArray(schema[this.property]);
    }

    override apply(schema: JSONSchema): void {
        schema.prefixItems = schema[this.property] as any[];
        schema[this.property] = undefined;
    }
}

export class CSUpgradeAdditionalProperties extends CompilationStep {
    constructor(root: JSONSchema) {
        super(root, "additionalProperties");
    }

    override appliable(schema: JSONSchema): boolean {
        return schema[this.property] === false;
    }

    override apply(schema: JSONSchema): void {
        schema.unevaluatedProperties = false;
        schema[this.property] = undefined;
    }
}

export class CSUpgradeRef extends CompilationStep {
    constructor(root: JSONSchema) {
        super(root, "$ref");
    }

    override appliable(schema: JSONSchema): boolean {
        return this.property in schema;
    }

    override apply(schema: JSONSchema): void {
        schema.$dynamicRef = schema[this.property] as string;
        schema[this.property] = undefined;
    }
}




