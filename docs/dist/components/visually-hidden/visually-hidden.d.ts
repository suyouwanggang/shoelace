import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 * @slot - The content you'd like to be visually hidden.
 */
export default class SlVisuallyHidden extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-visually-hidden': SlVisuallyHidden;
    }
}
//# sourceMappingURL=visually-hidden.d.ts.map