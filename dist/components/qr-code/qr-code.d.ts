import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlQrCode extends LitElement {
    static styles: import("lit").CSSResult;
    canvas: HTMLElement;
    /** The QR code's value. */
    value: string;
    /** The label used when screen readers announce the code. If unspecified, the value will be used. */
    label: string;
    /** The size of the code's overall square in pixels. */
    size: number;
    /** The fill color. This can be any valid CSS color, but not a CSS custom property. */
    fill: string;
    /** The background color. This can be any valid CSS color or `transparent`, but not a CSS custom property. */
    background: string;
    /** The edge radius of each module. Must be between 0 and 0.5. */
    radius: number;
    /** The level of error correction to use. */
    errorCorrection: 'L' | 'M' | 'Q' | 'H';
    firstUpdated(): void;
    generate(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-qr-code': SlQrCode;
    }
}
//# sourceMappingURL=qr-code.d.ts.map