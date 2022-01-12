import { LitElement } from 'lit';
import '../icon-button/icon-button';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The drawer's content.
 * @slot label - The drawer's label. Alternatively, you can use the label prop.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @event sl-show - Emitted when the drawer opens.
 * @event sl-after-show - Emitted after the drawer opens and all animations are complete.
 * @event sl-hide - Emitted when the drawer closes.
 * @event sl-after-hide - Emitted after the drawer closes and all animations are complete.
 * @event sl-initial-focus - Emitted when the drawer opens and the panel gains focus. Calling `event.preventDefault()` will
 *   prevent focus and allow you to set it on a different element in the drawer, such as an input or button.
 * @event sl-request-close - Emitted when the user attempts to close the drawer by clicking the close button, clicking the
 *   overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the drawer from closing. Avoid
 *   using this unless closing the drawer will result in destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay.
 * @csspart panel - The drawer panel (where the drawer and its content is rendered).
 * @csspart header - The drawer header.
 * @csspart title - The drawer title.
 * @csspart close-button - The close button.
 * @csspart body - The drawer body.
 * @csspart footer - The drawer footer.
 *
 * @cssproperty --size - The preferred size of the drawer. This will be applied to the drawer's width or height
 *   depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 * @animation drawer.showTop - The animation to use when showing a drawer with `top` placement.
 * @animation drawer.showEnd - The animation to use when showing a drawer with `end` placement.
 * @animation drawer.showBottom - The animation to use when showing a drawer with `bottom` placement.
 * @animation drawer.showStart - The animation to use when showing a drawer with `start` placement.
 * @animation drawer.hideTop - The animation to use when hiding a drawer with `top` placement.
 * @animation drawer.hideEnd - The animation to use when hiding a drawer with `end` placement.
 * @animation drawer.hideBottom - The animation to use when hiding a drawer with `bottom` placement.
 * @animation drawer.hideStart - The animation to use when hiding a drawer with `start` placement.
 * @animation drawer.denyClose - The animation to use when a request to close the drawer is denied.
 * @animation drawer.overlay.show - The animation to use when showing the drawer's overlay.
 * @animation drawer.overlay.hide - The animation to use when hiding the drawer's overlay.
 */
export default class SlDrawer extends LitElement {
    static styles: import("lit").CSSResult;
    drawer: HTMLElement;
    panel: HTMLElement;
    overlay: HTMLElement;
    private hasSlotController;
    private modal;
    private originalTrigger;
    /** Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /**
     * The drawer's label as displayed in the header. You should always include a relevant label even when using
     * `no-header`, as it is required for proper accessibility.
     */
    label: string;
    /** The direction from which the drawer will open. */
    placement: 'top' | 'end' | 'bottom' | 'start';
    /**
     * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
     * its parent element, set this prop and add `position: relative` to the parent.
     */
    contained: boolean;
    /**
     * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
     * accessible way for users to dismiss the drawer.
     */
    noHeader: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    /** Shows the drawer. */
    show(): Promise<void>;
    /** Hides the drawer */
    hide(): Promise<void>;
    private requestClose;
    handleKeyDown(event: KeyboardEvent): void;
    handleOpenChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-drawer': SlDrawer;
    }
}
//# sourceMappingURL=drawer.d.ts.map