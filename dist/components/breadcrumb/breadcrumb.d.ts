import { LitElement } from 'lit';
import '../icon/icon';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more breadcrumb items to display.
 * @slot separator - The separator to use between breadcrumb items.
 *
 * @dependency sl-icon
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlBreadcrumb extends LitElement {
    static styles: import("lit").CSSResult;
    defaultSlot: HTMLSlotElement;
    separatorSlot: HTMLSlotElement;
    /**
     * The label to use for the breadcrumb control. This will not be shown, but it will be announced by screen readers and
     * other assistive devices.
     */
    label: string;
    private getSeparator;
    handleSlotChange(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-breadcrumb': SlBreadcrumb;
    }
}
//# sourceMappingURL=breadcrumb.d.ts.map