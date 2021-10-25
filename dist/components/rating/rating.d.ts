import { LitElement } from 'lit';
import '../icon/icon';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @event sl-change - Emitted when the rating's value changes.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --symbol-color - The inactive color for symbols.
 * @cssproperty --symbol-color-active - The active color for symbols.
 * @cssproperty --symbol-size - The size of symbols.
 * @cssproperty --symbol-spacing - The spacing to use around symbols.
 */
export default class SlRating extends LitElement {
    static styles: import("lit").CSSResult;
    rating: HTMLElement;
    private hoverValue;
    private isHovering;
    /** The current rating. */
    value: number;
    /** The highest rating to show. */
    max: number;
    /** The minimum increment value allowed by the control. */
    precision: number;
    /** Makes the rating readonly. */
    readonly: boolean;
    /** Disables the rating. */
    disabled: boolean;
    /** The name of the icon to display as the symbol. */
    getSymbol: (value: number) => string;
    /** Sets focus on the rating. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the rating. */
    blur(): void;
    getValueFromMousePosition(event: MouseEvent): number;
    getValueFromTouchPosition(event: TouchEvent): number;
    getValueFromXCoordinate(coordinate: number): number;
    handleClick(event: MouseEvent): void;
    setValue(newValue: number): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseEnter(): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseLeave(): void;
    handleTouchStart(event: TouchEvent): void;
    handleTouchMove(event: TouchEvent): void;
    handleTouchEnd(event: TouchEvent): void;
    handleValueChange(): void;
    roundToPrecision(numberToRound: number, precision?: number): number;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-rating': SlRating;
    }
}
//# sourceMappingURL=rating.d.ts.map