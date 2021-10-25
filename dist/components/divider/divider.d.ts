import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --spacing - The spacing between the divider and neighboring elements.
 * @cssproperty --width - The width of the divider.
 */
export default class SlDivider extends LitElement {
    static styles: import("lit").CSSResult;
    /** Draws the divider in a vertical orientation. */
    vertical: boolean;
    firstUpdated(): void;
    handleVerticalChange(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-divider': SlDivider;
    }
}
//# sourceMappingURL=divider.d.ts.map