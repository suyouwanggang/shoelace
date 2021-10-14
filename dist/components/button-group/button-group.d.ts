import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlButtonGroup extends LitElement {
    static styles: import("lit").CSSResult;
    defaultSlot: HTMLSlotElement;
    /** A label to use for the button group's `aria-label` attribute. */
    label: string;
    handleFocus(event: CustomEvent): void;
    handleBlur(event: CustomEvent): void;
    handleMouseOver(event: CustomEvent): void;
    handleMouseOut(event: CustomEvent): void;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-button-group': SlButtonGroup;
    }
}
