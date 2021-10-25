import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The element to receive the aspect ratio. Should be a replaced element, such as `<img>`, `<iframe>`, or `<video>`.
 */
export default class SlResponsiveMedia extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * The aspect ratio of the embedded media in the format of `width:height`, e.g. `16:9`, `4:3`, or `1:1`. Ratios not in
     * this format will be ignored.
     */
    aspectRatio: string;
    /** Determines how content will be resized to fit its container. */
    fit: 'cover' | 'contain';
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-responsive-media': SlResponsiveMedia;
    }
}
//# sourceMappingURL=responsive-media.d.ts.map