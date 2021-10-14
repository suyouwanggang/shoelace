import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The menu label's content.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlMenuLabel extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-label': SlMenuLabel;
    }
}
