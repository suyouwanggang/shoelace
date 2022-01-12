import { LitElement } from 'lit';
import SlCollapse from '../collapse/collapse';
import '../icon/icon';
/**
 * @since 2.0
 * @status experimental
 * @dependency  sl-collapse
 *
 * @slot - The content slot.
 * @slot header-extra - header-extra slot ,use for header right icon
 * @slot trigger-icon - slot used  before title
 * @slot header - header title slot
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger-icon - The header icon part.
 * @csspart content - The component content div.
 *
 * @cssproperty --ac-tab-active-background-color - header active background-color.
 * @cssproperty --ac-header-color - header font color.
 * @cssproperty --ac-header-font-size - header font size.
 * @cssproperty --ac-header-padding - header padding.
 * @cssproperty --ac-content-padding - the component content  container padding.
 */
export default class SlAcPanel extends LitElement {
    static styles: import("lit").CSSResult;
    static ANIMATE_duration: number;
    active: boolean;
    key: string;
    header: string;
    renderHeader(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    get collapsePane(): SlCollapse | null;
    private _clickHeader;
    get contentElement(): HTMLElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-ac-panel': SlAcPanel;
    }
}
//# sourceMappingURL=ac-panel.d.ts.map