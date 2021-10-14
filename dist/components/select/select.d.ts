import { LitElement, TemplateResult } from 'lit';
import type SlDropdown from '../dropdown/dropdown';
import type SlMenu from '../menu/menu';
import type SlMenuItem from '../menu-item/menu-item';
import '../dropdown/dropdown';
import '../icon/icon';
import '../icon-button/icon-button';
import '../menu/menu';
import '../tag/tag';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-dropdown
 * @dependency sl-icon
 * @dependency sl-icon-button
 * @dependency sl-menu
 * @dependency sl-tag
 *
 * @slot - The select's options in the form of menu items.
 * @slot prefix - Used to prepend an icon or similar element to the select.
 * @slot suffix - Used to append an icon or similar element to the select.
 * @slot label - The select's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the select.
 *
 * @event sl-clear - Emitted when the clear button is activated.
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart clear-button - The clear button.
 * @csspart control - The container that holds the prefix, label, and suffix.
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart help-text - The select's help text.
 * @csspart icon - The select's icon.
 * @csspart prefix - The select's prefix.
 * @csspart label - The select's label.
 * @csspart suffix - The select's suffix.
 * @csspart menu - The select menu, an <sl-menu> element.
 * @csspart tag - The multiselect option, an <sl-tag> element.
 * @csspart tags - The container in which multiselect options are rendered.
 */
export default class SlSelect extends LitElement {
    static styles: import("lit").CSSResult;
    dropdown: SlDropdown;
    control: SlDropdown;
    input: HTMLInputElement;
    menu: SlMenu;
    private inputId;
    private helpTextId;
    private labelId;
    private resizeObserver;
    private hasFocus;
    private hasHelpTextSlot;
    private hasLabelSlot;
    private isOpen;
    private displayLabel;
    private displayTags;
    /** Enables multiselect. With this enabled, value will be an array. */
    multiple: boolean;
    /**
     * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
     * number of additional items that are selected. Set to -1 to remove the limit.
     */
    maxTagsVisible: number;
    /** Disables the select control. */
    disabled: boolean;
    /** The select's name. */
    name: string;
    /** The select's placeholder text. */
    placeholder: string;
    /** The select's size. */
    size: 'small' | 'medium' | 'large';
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`.
     */
    hoist: boolean;
    /** The value of the control. This will be a string or an array depending on `multiple`. */
    value: string | number | Array<string | number>;
    /** Draws a filled select. */
    filled: boolean;
    /** Draws a pill-style select with rounded edges. */
    pill: boolean;
    /** The select's label. Alternatively, you can use the label slot. */
    label: string;
    /** The select's help text. Alternatively, you can use the help-text slot. */
    helpText: string;
    /** The select's required attribute. */
    required: boolean;
    /** Adds a clear button when the select is populated. */
    clearable: boolean;
    /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
    invalid: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message: string): void;
    getItemLabel(item: SlMenuItem): string;
    getItems(): SlMenuItem[];
    getValueAsArray(): (string | number)[];
    handleBlur(): void;
    handleClearClick(event: MouseEvent): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleLabelClick(): void;
    handleMenuSelect(event: CustomEvent): void;
    handleMenuShow(): void;
    handleMenuHide(): void;
    handleMultipleChange(): void;
    handleSlotChange(): Promise<void>;
    handleTagInteraction(event: KeyboardEvent | MouseEvent): void;
    handleValueChange(): Promise<void>;
    resizeMenu(): void;
    syncItemsFromValue(): void;
    syncValueFromItems(): void;
    focus(option: FocusOptions): void;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-select': SlSelect;
    }
}
