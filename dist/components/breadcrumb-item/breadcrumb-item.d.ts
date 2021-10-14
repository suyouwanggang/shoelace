import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The breadcrumb item's label.
 * @slot prefix - An optional prefix, usually an icon or icon button.
 * @slot suffix - An optional suffix, usually an icon or icon button.
 * @slot separator - The separator to use for the breadcrumb item. This will only change the separator for this item. If
 * you want to change it for all items in the group, set the separator on `<sl-breadcrumb>` instead.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The breadcrumb item's label.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart separator - The container that wraps the separator slot.
 */
export default class SlBreadcrumbItem extends LitElement {
    static styles: import("lit").CSSResult;
    hasPrefix: boolean;
    hasSuffix: boolean;
    /**
     * Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered
     * internally. When unset, a button will be rendered instead.
     */
    href: string;
    /** Tells the browser where to open the link. Only used when `href` is set. */
    target: '_blank' | '_parent' | '_self' | '_top';
    /** The `rel` attribute to use on the link. Only used when `href` is set. */
    rel: string;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-breadcrumb-item': SlBreadcrumbItem;
    }
}
