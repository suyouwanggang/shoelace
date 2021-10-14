import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --padding - The tab panel's padding.
 */
export default class SlTabPanel extends LitElement {
    static styles: import("lit").CSSResult;
    private componentId;
    /** The tab panel's name. */
    name: string;
    /** When true, the tab panel will be shown. */
    active: boolean;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tab-panel': SlTabPanel;
    }
}
