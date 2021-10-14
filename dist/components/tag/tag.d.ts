import { LitElement } from 'lit';
import '../icon-button/icon-button';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The tag's content.
 *
 * @event sl-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag content.
 * @csspart remove-button - The remove button.
 */
export default class SlTag extends LitElement {
    static styles: import("lit").CSSResult;
    /** The tag's type. */
    type: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    /** The tag's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a pill-style tag with rounded edges. */
    pill: boolean;
    /** Makes the tag removable. */
    removable: boolean;
    handleRemoveClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tag': SlTag;
    }
}
