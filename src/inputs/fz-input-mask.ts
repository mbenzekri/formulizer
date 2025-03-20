import { customElement } from "lit/decorators.js";
import { html, TemplateResult } from "lit";
import { FzInputBase } from "./fz-input-base";

/**
 * FzInputMask: Input field with masked formatting
 * - Stored value is **exactly what is displayed**
 * - Auto-inserts static characters (e.g., dashes, spaces, parentheses)
 * - Handles backspace, delete, and caret position properly
 */
@customElement("fz-mask")
export class FzInputMask extends FzInputBase {

    override toField(): void {
        if (this.input) {
            this.input.value = this.value ?? "";
        }
    }

    override toValue(): void {
        if (this.input) {
            this.value = this.input.value; // Store exactly what the user sees
        }
    }

    override renderInput(): TemplateResult {
        return html`
            <div class="input-group">
                <input
                    class="form-control ${this.validationMap}"
                    type="text"
                    id="input"
                    placeholder="${this.mask}"
                    ?readonly="${this.readonly}"
                    @keydown="${this.handleKeydown}"
                    @input="${this.handleInput}"
                    ?required="${this.required}"
                />
            </div>`;
    }
    get mask() {
        return this.schema.mask ?? ""
    }
    // Handle user input (apply mask and store formatted value)
    private handleInput(event: InputEvent) {
        const input = event.target as HTMLInputElement;
        const formatted = this.applyMask(input.value); // Apply mask formatting

        const oldCaretPosition = input.selectionStart || 0;
        this.value = formatted; // Store the formatted value
        this.requestUpdate();

        // Restore caret position
        this.restoreCaretPosition(input, oldCaretPosition);
    }

    // Handle backspace, delete, and caret movement
    private handleKeydown(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        const key = event.key;
        const caretPos = input.selectionStart || 0;

        if (key === "ArrowLeft" || key === "ArrowRight") return; // Allow navigation keys

        if (key === "Backspace") {
            this.handleBackspace(input, caretPos);
            event.preventDefault();
        } else if (key === "Delete") {
            this.handleDelete(input, caretPos);
            event.preventDefault();
        } else {
            // Auto-insert static characters (e.g., `-`, `(`, `)`)
            const nextChar = this.mask[caretPos];
            if (nextChar && /[-()\s]/.test(nextChar)) {
                input.value += nextChar;
            }
        }
    }

    // Applies mask to input value
    private applyMask(value: string): string {
        let formatted = "";
        let valueIndex = 0;

        for (const char of this.mask) {
            if (char === "#") {
                formatted += value[valueIndex] || "";
                valueIndex++;
            } else {
                formatted += char; // Keep static characters
            }
        }

        return formatted;
    }

    // Handle backspace (remove previous character while preserving mask)
    private handleBackspace(input: HTMLInputElement, caretPos: number) {
        const mask = this.mask;
        let newCaretPos = caretPos;

        if (caretPos > 0) {
            do {
                newCaretPos--;
            } while (newCaretPos > 0 && !/[\dA-Za-z]/.test(mask[newCaretPos])); // Skip static characters
        }

        input.value = input.value.substring(0, newCaretPos) + input.value.substring(caretPos);
        this.restoreCaretPosition(input, newCaretPos);
    }

    // Handle delete (remove next character while preserving mask)
    private handleDelete(input: HTMLInputElement, caretPos: number) {
        const mask = this.mask;
        let newCaretPos = caretPos;

        if (caretPos < input.value.length) {
            do {
                newCaretPos++;
            } while (newCaretPos < input.value.length && !/[\dA-Za-z]/.test(mask[newCaretPos])); // Skip static characters
        }

        input.value = input.value.substring(0, caretPos) + input.value.substring(newCaretPos);
        this.restoreCaretPosition(input, caretPos);
    }

    // Restore caret position after formatting
    private restoreCaretPosition(input: HTMLInputElement, caretPos: number) {
        this.requestUpdate();
        setTimeout(() => input.setSelectionRange(caretPos, caretPos), 0);
    }
}
