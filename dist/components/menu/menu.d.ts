import { LitElement } from 'lit';
import type SlMenuItem from '../menu-item/menu-item';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The menu's content, including menu items, menu labels, and dividers.
 *
 * @event {{ item: SlMenuItem }} sl-select - Emitted when a menu item is selected.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlMenu extends LitElement {
    static styles: import("lit").CSSResult;
    menu: HTMLElement;
    defaultSlot: HTMLSlotElement;
    private typeToSelectString;
    private typeToSelectTimeout;
    firstUpdated(): void;
    getAllItems(options?: {
        includeDisabled: boolean;
    }): SlMenuItem[];
    /**
     * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
     * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
     * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
     * enabling type-to-select when the menu doesn't have focus.
     */
    typeToSelect(key: string): void;
    handleClick(event: MouseEvent): void;
    handleKeyUp(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu': SlMenu;
    }
}
//# sourceMappingURL=menu.d.ts.map