import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @cssproperty --border-radius - The skeleton's border radius.
 * @cssproperty --color - The color of the skeleton.
 * @cssproperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
export default class SlSkeleton extends LitElement {
    static styles: import("lit").CSSResult;
    /** Determines which effect the skeleton will use. */
    effect: 'pulse' | 'sheen' | 'none';
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-skeleton': SlSkeleton;
    }
}
//# sourceMappingURL=skeleton.d.ts.map