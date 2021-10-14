import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input. Alternatively, you can use the help-text prop.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart input - The native range input.
 * @csspart tooltip - The range tooltip.
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the track.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive: The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height: The height of the track.
 */
export default class SlRange extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    output: HTMLOutputElement;
    private inputId;
    private helpTextId;
    private labelId;
    private resizeObserver;
    private hasFocus;
    private hasHelpTextSlot;
    private hasLabelSlot;
    private hasTooltip;
    /** The input's name attribute. */
    name: string;
    /** The input's value attribute. */
    value: number;
    /** The range's label. Alternatively, you can use the label slot. */
    label: string;
    /** The range's help text. Alternatively, you can use the help-text slot. */
    helpText: string;
    /** Disables the input. */
    disabled: boolean;
    /**
     * This will be true when the control is in an invalid state. Validity in range inputs is determined by the message
     * provided by the `setCustomValidity` method.
     */
    invalid: boolean;
    /** The input's min attribute. */
    min: number;
    /** The input's max attribute. */
    max: number;
    /** The input's step attribute. */
    step: number;
    /** The preferred placedment of the tooltip. */
    tooltip: 'top' | 'bottom' | 'none';
    /** A function used to format the tooltip's value. */
    tooltipFormatter: (value: number) => string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Sets focus on the input. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the input. */
    blur(): void;
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message: string): void;
    handleInput(): void;
    handleBlur(): void;
    handleDisabledChange(): void;
    handleFocus(): void;
    handleSlotChange(): void;
    handleThumbDragStart(): void;
    handleThumbDragEnd(): void;
    syncRange(): void;
    syncProgress(percent: number): void;
    syncTooltip(percent: number): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-range': SlRange;
    }
}
