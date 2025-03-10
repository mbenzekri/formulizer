import {  } from "./types";
import { Schema, CompilationStep } from "./schema";

export class CSUpgradeNullable extends CompilationStep {
    constructor(root: Schema) {
        super(root, "nullable");
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema;
    }

    override apply(_schema: Schema): void {
        // schema.type = Array.isArray(schema.type) ? [...schema.type, "null"] : [schema.type, "null"];
        // schema[this.property] = undefined;
    }
}

export class CSUpgradeId extends CompilationStep {
    constructor(root: Schema) {
        super(root, "$id");
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema && (schema.$id as string).includes("#");
    }

    override apply(schema: Schema): void {
        const [base, _anchor] = (schema.$id as string).split("#");
        schema.$id = base;
        //schema.$anchor = anchor;
    }
}

export class CSUpgradeDependencies extends CompilationStep {
    constructor(root: Schema) {
        super(root, "dependencies");
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema;
    }

    override apply(_schema: Schema): void {
        // schema.dependentRequired = { ...(schema[this.property] as object) };
        // schema[this.property] = undefined;
    }
}

export class CSUpgradeItems extends CompilationStep {
    constructor(root: Schema) {
        super(root, "items");
    }

    override appliable(_schema: Schema): boolean {
        return true 
        //return Array.isArray(schema[this.property]);
    }

    override apply(_schema: Schema): void {
        // schema.prefixItems = schema[this.property] as any[];
        // schema[this.property] = undefined;
    }
}

export class CSUpgradeAdditionalProperties extends CompilationStep {
    constructor(root: Schema) {
        super(root, "additionalProperties");
    }

    override appliable(_schema: Schema): boolean {
        return true
        //return schema[this.property] === false;
    }

    override apply(_schema: Schema): void {
        // schema.unevaluatedProperties = false;
        // schema[this.property] = undefined;
    }
}

export class CSUpgradeRef extends CompilationStep {
    constructor(root: Schema) {
        super(root, "$ref");
    }

    override appliable(schema: Schema): boolean {
        return this.property in schema;
    }

    override apply(_schema: Schema): void {
        // schema.$dynamicRef = schema[this.property] as string;
        // schema[this.property] = undefined;
    }
}




