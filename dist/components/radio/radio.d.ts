import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The radio's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The radio control.
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart label - The radio label.
 */
export default class SlRadio extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    private inputId;
    private labelId;
    private hasFocus;
    /** The radio's name attribute. */
    name: string;
    /** The radio's value attribute. */
    value: string;
    /** Disables the radio. */
    disabled: boolean;
    /** Draws the radio in a checked state. */
    checked: boolean;
    /**
     * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
     * provided by the `setCustomValidity` method.
     */
    invalid: boolean;
    /** Simulates a click on the radio. */
    click(): void;
    /** Sets focus on the radio. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the radio. */
    blur(): void;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message: string): void;
    getAllRadios(): this[];
    getSiblingRadios(): this[];
    handleBlur(): void;
    handleCheckedChange(): void;
    handleClick(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    private hasSlotLabel;
    private slotChangeHandler;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio': SlRadio;
    }
}
