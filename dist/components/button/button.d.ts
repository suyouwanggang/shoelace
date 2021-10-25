import { LitElement } from 'lit';
import '../spinner/spinner';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-spinner
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @slot - The button's label.
 * @slot prefix - Used to prepend an icon or similar element to the button.
 * @slot suffix - Used to append an icon or similar element to the button.
 *
 *  @csspart ripple - The component's ripple wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The prefix container.
 * @csspart label - The button's label.
 * @csspart suffix - The suffix container.
 * @csspart caret - The button's caret.
 */
export default class SlButton extends LitElement {
    static styles: import("lit").CSSResult;
    button: HTMLButtonElement | HTMLLinkElement;
    private hasFocus;
    private hasLabel;
    private hasPrefix;
    private hasSuffix;
    /** The button's type. */
    type: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    /** The button's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws the button with a caret for use with dropdowns, popovers, etc. */
    caret: boolean;
    /** default ripple animate enabled , false remove ripple animate */
    rippleed: boolean; /** Disables the button. */
    disabled: boolean;
    /** Draws the button in a loading state. */
    loading: boolean;
    /** Draws an outlined button. */
    outline: boolean;
    /** Draws a pill-style button with rounded edges. */
    pill: boolean;
    /** Draws a circle button. */
    circle: boolean;
    /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
    submit: boolean;
    /** An optional name for the button. Ignored when `href` is set. */
    name: string;
    /** An optional value for the button. Ignored when `href` is set. */
    value: string;
    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    href: string;
    /** Tells the browser where to open the link. Only used when `href` is set. */
    target: '_blank' | '_parent' | '_self' | '_top';
    /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
    download: string;
    connectedCallback(): void;
    /** Simulates a click on the button. */
    click(): void;
    /** Sets focus on the button. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the button. */
    blur(): void;
    handleSlotChange(): void;
    handleBlur(): void;
    handleFocus(): void;
    handleClick(event: MouseEvent): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-button': SlButton;
    }
}
//# sourceMappingURL=button.d.ts.map