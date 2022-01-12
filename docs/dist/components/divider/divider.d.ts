import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 */
export default class SlDivider extends LitElement {
    static styles: import("lit").CSSResult;
    /** Draws the divider in a vertical orientation. */
    vertical: boolean;
    firstUpdated(): void;
    handleVerticalChange(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-divider': SlDivider;
    }
}
//# sourceMappingURL=divider.d.ts.map