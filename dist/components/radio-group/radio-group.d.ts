import { LitElement, PropertyValues } from 'lit';
import type SlRadio from '../radio/radio';
/**
 * @since 2.0
 * @status stable
 * @event sl-check-change - Emitted when the radio selected changed.
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The radio group label.
 */
export default class SlRadioGroup extends LitElement {
    static styles: import("lit").CSSResult;
    defaultSlot: HTMLSlotElement;
    /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
    label: string;
    /** Shows the fieldset and legend that surrounds the radio group. */
    fieldset: boolean;
    /**  选中值 */
    value: unknown;
    handleFocusIn(): void;
    get allRadios(): SlRadio[];
    valueChange(): void;
    private _eventHandler;
    firstUpdated(map: PropertyValues): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio-group': SlRadioGroup;
    }
}
