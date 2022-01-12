import { LitElement } from 'lit';
import '../ripple/ripple';
import SlRipple from '../ripple/ripple';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The checkbox's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-before-change - Emitted before  the control's checked state changes,user can cancel default.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The checkbox control.
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart indeterminate-icon - The container that wraps the indeterminate icon.
 * @csspart label - The checkbox label.
 */
export default class SlCheckbox extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    ripple: SlRipple;
    private formSubmitController;
    private hasSlotController;
    private inputId;
    private labelId;
    private hasFocus;
    /** The checkbox's name attribute. */
    name: string;
    /** The checkbox's value attribute. */
    value: string | number | any;
    /** Disables the checkbox. */
    disabled: boolean;
    /** Makes the checkbox a required field. */
    required: boolean;
    /** Draws the checkbox in a checked state. */
    checked: boolean;
    /** Draws the checkbox in an indeterminate state. */
    indeterminate: boolean;
    /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
    invalid: boolean;
    type: 'primary' | 'success' | 'danger' | 'warning' | 'neutral';
    shape: 'circle' | 'square';
    firstUpdated(): void;
    /** Simulates a click on the checkbox. */
    click(): void;
    /** Sets focus on the checkbox. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the checkbox. */
    blur(): void;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message: string): void;
    handleClick(): void;
    handleBlur(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleStateChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-checkbox': SlCheckbox;
    }
}
//# sourceMappingURL=checkbox.d.ts.map