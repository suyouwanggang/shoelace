import { LitElement } from 'lit';
import '../icon/icon';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot prefix - Used to prepend an icon or similar element to the input.
 * @slot suffix - Used to append an icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Help text that describes how to use the input. Alternatively, you can use the help-text prop.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-clear - Emitted when the clear button is activated.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart form-control - The form control that wraps the label, input, and help-text.
 * @csspart label - The input label.
 * @csspart input - The input control.
 * @csspart prefix - The input prefix container.
 * @csspart clear-button - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 * @csspart suffix - The input suffix container.
 * @csspart help-text - The input help text.
 */
export default class SlInput extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    private inputId;
    private helpTextId;
    private labelId;
    private hasFocus;
    private hasHelpTextSlot;
    private hasLabelSlot;
    private isPasswordVisible;
    /** The input's type. */
    type: 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /** The input's size. */
    size: 'small' | 'medium' | 'large';
    /** The input's name attribute. */
    name: string;
    /** The input's value attribute. */
    value: string;
    /** Draws a filled input. */
    filled: boolean;
    /** Draws a pill-style input with rounded edges. */
    pill: boolean;
    /** The input's label. Alternatively, you can use the label slot. */
    label: string;
    /** The input's help text. Alternatively, you can use the help-text slot. */
    helpText: string;
    /** Adds a clear button when the input is populated. */
    clearable: boolean;
    /** Adds a password toggle button to password inputs. */
    togglePassword: boolean;
    /** The input's placeholder text. */
    placeholder: string;
    /** Disables the input. */
    disabled: boolean;
    /** Makes the input readonly. */
    readonly: boolean;
    /** The minimum length of input that will be considered valid. */
    minlength: number;
    /** The maximum length of input that will be considered valid. */
    maxlength: number;
    /** The input's minimum value. */
    min: number | string;
    /** The input's maximum value. */
    max: number | string;
    /** The input's step attribute. */
    step: number;
    /** A pattern to validate input against. */
    pattern: string;
    /** Makes the input a required field. */
    required: boolean;
    /**
     * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
     * `required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API.
     */
    invalid: boolean;
    /** The input's autocaptialize attribute. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /** The input's autocorrect attribute. */
    autocorrect: string;
    /** The input's autocomplete attribute. */
    autocomplete: string;
    /** The input's autofocus attribute. */
    autofocus: boolean;
    /** Enables spell checking on the input. */
    spellcheck: boolean;
    /** The input's inputmode attribute. */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    /** Sets focus on the input. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the input. */
    blur(): void;
    /** Selects all the text in the input. */
    select(): void;
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
    handleClearClick(event: MouseEvent): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleInput(): void;
    handleInvalid(): void;
    handlePasswordToggle(): void;
    handleSlotChange(): void;
    handleValueChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-input': SlInput;
    }
}
//# sourceMappingURL=input.d.ts.map