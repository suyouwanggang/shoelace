import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The badge's content.
 *
 * @csspart base - The base wrapper
 */
export default class SlBadge extends LitElement {
    static styles: import("lit").CSSResult;
    /** The badge's variant. */
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
    /** Draws a pill-style badge with rounded edges. */
    pill: boolean;
    /** Makes the badge pulsate to draw attention. */
    pulse: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-badge': SlBadge;
    }
}
//# sourceMappingURL=badge.d.ts.map