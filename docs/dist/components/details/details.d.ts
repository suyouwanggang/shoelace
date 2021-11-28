import { LitElement } from 'lit';
import '../icon/icon';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot - The details' content.
 * @slot summary - The details' summary. Alternatively, you can use the summary prop.
 *
 * @event sl-show - Emitted when the details opens.
 * @event sl-after-show - Emitted after the details opens and all animations are complete.
 * @event sl-hide - Emitted when the details closes.
 * @event sl-after-hide - Emitted after the details closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The summary header.
 * @csspart summary - The details summary.
 * @csspart summary-icon - The expand/collapse summary icon.
 * @csspart content - The details content.
 *
 * @animation details.show - The animation to use when showing details. You can use `height: auto` with this animation.
 * @animation details.hide - The animation to use when hiding details. You can use `height: auto` with this animation.
 */
export default class SlDetails extends LitElement {
    static styles: import("lit").CSSResult;
    details: HTMLElement;
    header: HTMLElement;
    body: HTMLElement;
    private componentId;
    /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /** The summary to show in the details header. If you need to display HTML, use the `summary` slot instead. */
    summary: string;
    /** Disables the details so it can't be toggled. */
    disabled: boolean;
    firstUpdated(): void;
    /** Shows the details. */
    show(): Promise<void>;
    /** Hides the details */
    hide(): Promise<void>;
    handleSummaryClick(): void;
    handleSummaryKeyDown(event: KeyboardEvent): void;
    handleOpenChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-details': SlDetails;
    }
}
//# sourceMappingURL=details.d.ts.map