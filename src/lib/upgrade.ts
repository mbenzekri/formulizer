import {  } from "./types";
import { Schema, CompilationStep } from "./schema";

export class CSUpgradeNullable extends CompilationStep {
    constructor(root: Schema) {
        super(root, "nullable","upgrade",[]);
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema;
    }

    override apply(schema: Schema): void {
        if (schema.nullable) {
            if (schema.type === undefined) {
                schema.type = ["null"] 
            } else if (Array.isArray(schema.type)) {
                schema.type = [...schema.type, "null"]
            } else {
                schema.type = [schema.type, "null"]
            }
        }
        schema[this.property] = undefined as never;
    }
}

export class CSUpgradeId extends CompilationStep {
    constructor(root: Schema) {
        super(root, "$id","upgrade",[])
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema && (schema.$id as string).includes("#")
    }

    override apply(schema: Schema): void {
        const [base, anchor] = (schema.$id as string).split("#")
        schema.$id = base
        ;(schema as any).$anchor = anchor
    }
}

export class CSUpgradeDependencies extends CompilationStep {
    constructor(root: Schema) {
        super(root, "dependencies","upgrade",[]);
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema;
    }

    override apply(schema: Schema): void {
        ;(schema as any).dependentRequired = { ...(schema[this.property] as object) }
        schema.dependencies = undefined;
    }
}

export class CSUpgradeItems extends CompilationStep {
    constructor(root: Schema) {
        super(root, "items","upgrade",[]);
    }

    override appliable(schema: Schema): boolean {
        return Array.isArray(schema[this.property]);
    }

    override apply(schema: Schema): void {
        ;(schema as any).prefixItems = schema[this.property] as any[];
        schema.items = undefined;
    }
}

export class CSUpgradeAdditionalProperties extends CompilationStep {
    constructor(root: Schema) {
        super(root, "additionalProperties","upgrade",[]);
    }

    override appliable(schema: Schema): boolean {
        return schema.additionalProperties === false;
    }

    override apply(schema: Schema): void {
        ;(schema as any).unevaluatedProperties = false;
        schema.additionalProperties = undefined;
    }
}

export class CSUpgradeRef extends CompilationStep {
    constructor(root: Schema) {
        super(root, "$ref","upgrade",[]);
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema;
    }

    override apply(schema: Schema): void {
        ;(schema as any).$dynamicRef = schema[this.property] as string;
        schema.$ref = undefined;
    }
}




