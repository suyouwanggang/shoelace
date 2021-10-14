import { LitElement } from 'lit';
import '../icon/icon';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot icon - The default icon to use when no image or initials are present.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the avatar icon.
 * @csspart initials - The container that wraps the avatar initials.
 * @csspart image - The avatar image.
 *
 * @cssproperty --size - The size of the avatar.
 */
export default class SlAvatar extends LitElement {
    static styles: import("lit").CSSResult;
    private hasError;
    /** The image source to use for the avatar. */
    image: string;
    /** Alternative text for the image. */
    alt: string;
    /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
    initials: string;
    /** The shape of the avatar. */
    shape: 'circle' | 'square' | 'rounded';
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-avatar': SlAvatar;
    }
}
