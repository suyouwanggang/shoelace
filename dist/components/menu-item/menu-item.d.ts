import { LitElement } from 'lit';
import '../ripple/ripple';
import '../icon/icon';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @csspart base - The component's base wrapper.
 * @csspart checked-icon - The container that wraps the checked icon.
 * @csspart prefix - The prefix container.
 * @csspart label - The menu item label.
 * @csspart suffix - The suffix container.
 */
export default class SlMenuItem extends LitElement {
    static styles: import("lit").CSSResult;
    menuItem: HTMLElement;
    /** Draws the item in a checked state. */
    checked: boolean;
    /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
    value: number | string;
    /** Draws the menu item in a disabled state. */
    disabled: boolean;
    /** disable ripple. */
    disableRipple: boolean;
    /** hightlight this menu-item */
    highlight: boolean;
    firstUpdated(): void;
    handleCheckedChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-item': SlMenuItem;
    }
}
//# sourceMappingURL=menu-item.d.ts.map