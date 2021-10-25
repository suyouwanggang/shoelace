import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot label - The textarea's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart form-control - The form control that wraps the label, textarea, and help text.
 * @csspart label - The textarea label.
 * @csspart textarea - The textarea control.
 * @csspart help-text - The textarea help text.
 */
export default class SlTextarea extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLTextAreaElement;
    private inputId;
    private helpTextId;
    private labelId;
    private resizeObserver;
    private hasFocus;
    private hasHelpTextSlot;
    private hasLabelSlot;
    /** The textarea's size. */
    size: 'small' | 'medium' | 'large';
    /** The textarea's name attribute. */
    name: string;
    /** The textarea's value attribute. */
    value: string;
    /** Draws a filled textarea. */
    filled: boolean;
    /** The textarea's label. Alternatively, you can use the label slot. */
    label: string;
    /** The textarea's help text. Alternatively, you can use the help-text slot. */
    helpText: string;
    /** The textarea's placeholder text. */
    placeholder: string;
    /** The number of rows to display by default. */
    rows: number;
    /** Controls how the textarea can be resized. */
    resize: 'none' | 'vertical' | 'auto';
    /** Disables the textarea. */
    disabled: boolean;
    /** Makes the textarea readonly. */
    readonly: boolean;
    /** The minimum length of input that will be considered valid. */
    minlength: number;
    /** The maximum length of input that will be considered valid. */
    maxlength: number;
    /** A pattern to validate input against. */
    pattern: string;
    /** Makes the textarea a required field. */
    required: boolean;
    /**
     * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
     * `required`, `minlength`, and `maxlength` using the browser's constraint validation API.
     */
    invalid: boolean;
    /** The textarea's autocaptialize attribute. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /** The textarea's autocorrect attribute. */
    autocorrect: string;
    /** The textarea's autocomplete attribute. */
    autocomplete: string;
    /** The textarea's autofocus attribute. */
    autofocus: boolean;
    /** Enables spell checking on the textarea. */
    spellcheck: boolean;
    /** The textarea's inputmode attribute. */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    /** Sets focus on the textarea. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the textarea. */
    blur(): void;
    /** Selects all the text in the textarea. */
    select(): void;
    /** Gets or sets the textarea's scroll position. */
    scrollPosition(position?: {
        top?: number;
        left?: number;
    }): {
        top: number;
        left: number;
    } | undefined;
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message: string): void;
    handleBlur(): void;
    handleChange(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleInput(): void;
    handleRowsChange(): void;
    handleSlotChange(): void;
    handleValueChange(): void;
    setTextareaHeight(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-textarea': SlTextarea;
    }
}
//# sourceMappingURL=textarea.d.ts.map