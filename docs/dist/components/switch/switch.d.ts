import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The switch's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The switch control.
 * @csspart thumb - The switch position indicator.
 * @csspart label - The switch label.
 *
 * @cssproperty --width - The width of the switch.
 * @cssproperty --height - The height of the switch.
 * @cssproperty --thumb-size - The size of the thumb.
 */
export default class SlSwitch extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    private switchId;
    private labelId;
    private hasFocus;
    /** The switch's name attribute. */
    name: string;
    /** The switch's value attribute. */
    value: string;
    /** Disables the switch. */
    disabled: boolean;
    /** Makes the switch a required field. */
    required: boolean;
    /** Draws the switch in a checked state. */
    checked: boolean;
    /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
    invalid: boolean;
    firstUpdated(): void;
    /** Simulates a click on the switch. */
    click(): void;
    /** Sets focus on the switch. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the switch. */
    blur(): void;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message: string): void;
    handleBlur(): void;
    handleCheckedChange(): void;
    handleClick(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-switch': SlSwitch;
    }
}
//# sourceMappingURL=switch.d.ts.map