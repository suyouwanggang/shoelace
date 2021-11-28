import { LitElement } from 'lit';
import type SlMenu from '../menu/menu';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The dropdown's content.
 * @slot trigger - The dropdown's trigger, usually a `<sl-button>` element.
 *
 * @event sl-show - Emitted when the dropdown opens.
 * @event sl-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event sl-hide - Emitted when the dropdown closes.
 * @event sl-after-hide - Emitted after the dropdown closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The container that wraps the trigger.
 * @csspart panel - The panel that gets shown when the dropdown is open.
 *
 * @animation dropdown.show - The animation to use when showing the dropdown.
 * @animation dropdown.hide - The animation to use when hiding the dropdown.
 */
export default class SlDropdown extends LitElement {
    static styles: import("lit").CSSResult;
    trigger: HTMLElement;
    panel: HTMLElement;
    positioner: HTMLElement;
    private componentId;
    private popover;
    /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /**
     * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
     * inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    /** Disables the dropdown so the panel will not open. */
    disabled: boolean;
    /**
     * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
     * controls that allow multiple selections.
     */
    stayOpenOnSelect: boolean;
    /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
    containingElement: HTMLElement;
    /** The distance in pixels from which to offset the panel away from its trigger. */
    distance: number;
    /** The distance in pixels from which to offset the panel along its trigger. */
    skidding: number;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`.
     */
    hoist: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    focusOnTrigger(): void;
    getMenu(): SlMenu;
    handleDocumentKeyDown(event: KeyboardEvent): void;
    handleDocumentMouseDown(event: MouseEvent): void;
    handleMenuItemActivate(event: CustomEvent): void;
    handlePanelSelect(event: CustomEvent): void;
    handlePopoverOptionsChange(): void;
    handleTriggerClick(): void;
    handleTriggerKeyDown(event: KeyboardEvent): void;
    handleTriggerKeyUp(event: KeyboardEvent): void;
    handleTriggerSlotChange(): void;
    updateAccessibleTrigger(): void;
    /** Shows the dropdown panel. */
    show(): Promise<void>;
    /** Hides the dropdown panel */
    hide(): Promise<void>;
    /**
     * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
     * is activated.
     */
    reposition(): void;
    handleOpenChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-dropdown': SlDropdown;
    }
}
//# sourceMappingURL=dropdown.d.ts.map