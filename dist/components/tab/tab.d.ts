import { LitElement } from 'lit';
import '../icon-button/icon-button';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The tab's label.
 *
 * @event sl-close - Emitted when the tab is closable and the close button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart close-button - The close button, which is the icon button's base wrapper.
 */
export default class SlTab extends LitElement {
    static styles: import("lit").CSSResult;
    private localize;
    tab: HTMLElement;
    /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
    panel: string;
    /** Draws the tab in an active state. */
    active: boolean;
    /** Makes the tab closable and shows a close icon. */
    closable: boolean;
    /** Draws the tab in a disabled state. */
    disabled: boolean;
    /** The locale to render the component in. */
    lang: string;
    /** Sets focus to the tab. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the tab. */
    blur(): void;
    handleCloseClick(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tab': SlTab;
    }
}
//# sourceMappingURL=tab.d.ts.map