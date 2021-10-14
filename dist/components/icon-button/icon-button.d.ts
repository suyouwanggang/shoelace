import { LitElement } from 'lit';
import '../icon/icon';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlIconButton extends LitElement {
    static styles: import("lit").CSSResult;
    button: HTMLButtonElement | HTMLLinkElement;
    /** The name of the icon to draw. */
    name: string;
    /** The name of a registered custom icon library. */
    library: string;
    /** An external URL of an SVG file. */
    src: string;
    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    href: string;
    /** Tells the browser where to open the link. Only used when `href` is set. */
    target: '_blank' | '_parent' | '_self' | '_top';
    /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
    download: string;
    /**
     * A description that gets read by screen readers and other assistive devices. For optimal accessibility, you should
     * always include a label that describes what the icon button does.
     */
    label: string;
    /** Disables the button. */
    disabled: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-icon-button': SlIconButton;
    }
}
