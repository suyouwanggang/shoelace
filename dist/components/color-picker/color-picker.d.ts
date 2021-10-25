import { LitElement } from 'lit';
import type SlDropdown from '../dropdown/dropdown';
import type SlInput from '../input/input';
import '../button/button';
import '../dropdown/dropdown';
import '../icon/icon';
import '../input/input';
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-button
 * @dependency sl-dropdown
 * @dependency sl-input
 *
 * @event sl-change Emitted when the color picker's value changes.
 *
 * @csspart base - The component's base wrapper
 * @csspart trigger - The color picker's dropdown trigger.
 * @csspart swatches - The container that holds swatches.
 * @csspart swatch - Each individual swatch.
 * @csspart grid - The color grid.
 * @csspart grid-handle - The color grid's handle.
 * @csspart hue-slider - The hue slider.
 * @csspart opacity-slider - The opacity slider.
 * @csspart slider - Hue and opacity sliders.
 * @csspart slider-handle - Hue and opacity slider handles.
 * @csspart preview - The preview color.
 * @csspart input - The text input.
 * @csspart format-button - The toggle format button's base.
 *
 * @cssproperty --grid-width - The width of the color grid.
 * @cssproperty --grid-height - The height of the color grid.
 * @cssproperty --grid-handle-size - The size of the color grid's handle.
 * @cssproperty --slider-height - The height of the hue and alpha sliders.
 * @cssproperty --slider-handle-size - The diameter of the slider's handle.
 * @cssproperty --swatch-size - The size of each predefined color swatch.
 */
export default class SlColorPicker extends LitElement {
    static styles: import("lit").CSSResult;
    input: SlInput;
    previewButton: HTMLButtonElement;
    dropdown: SlDropdown;
    private isSafeValue;
    private lastValueEmitted;
    private inputValue;
    private hue;
    private saturation;
    private lightness;
    private alpha;
    /** The current color. */
    value: string;
    /**
     * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
     * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
     * it to the desired format.
     */
    format: 'hex' | 'rgb' | 'hsl';
    /** Renders the color picker inline rather than inside a dropdown. */
    inline: boolean;
    /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
    size: 'small' | 'medium' | 'large';
    /** Removes the format toggle. */
    noFormatToggle: boolean;
    /** The input's name attribute. */
    name: string;
    /** Disables the color picker. */
    disabled: boolean;
    /**
     * This will be true when the control is in an invalid state. Validity is determined by the `setCustomValidity()`
     * method using the browser's constraint validation API.
     */
    invalid: boolean;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`.
     */
    hoist: boolean;
    /** Whether to show the opacity slider. */
    opacity: boolean;
    /** By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. */
    uppercase: boolean;
    /**
     * An array of predefined color swatches to display. Can include any format the color picker can parse, including
     * HEX(A), RGB(A), HSL(A), and CSS color names.
     */
    swatches: string[];
    connectedCallback(): void;
    /** Returns the current value as a string in the specified format. */
    getFormattedValue(format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'): string;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean | Promise<void>;
    /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
    setCustomValidity(message: string): void;
    handleCopy(): void;
    handleFormatToggle(): void;
    handleAlphaDrag(event: any): void;
    handleHueDrag(event: any): void;
    handleGridDrag(event: any): void;
    handleDrag(event: any, container: HTMLElement, onMove: (x: number, y: number) => void): void;
    handleAlphaKeyDown(event: KeyboardEvent): void;
    handleHueKeyDown(event: KeyboardEvent): void;
    handleGridKeyDown(event: KeyboardEvent): void;
    handleInputChange(event: CustomEvent): void;
    handleInputKeyDown(event: KeyboardEvent): void;
    normalizeColorString(colorString: string): string;
    parseColor(colorString: string): false | {
        hsl: {
            h: any;
            s: any;
            l: any;
            string: string;
        };
        hsla: {
            h: any;
            s: any;
            l: any;
            a: any;
            string: string;
        };
        rgb: {
            r: any;
            g: any;
            b: any;
            string: string;
        };
        rgba: {
            r: any;
            g: any;
            b: any;
            a: any;
            string: string;
        };
        hex: string;
        hexa: string;
    };
    setColor(colorString: string): boolean;
    setLetterCase(string: string): string;
    syncValues(): Promise<void>;
    handleAfterHide(): void;
    handleFormatChange(): void;
    handleOpacityChange(): void;
    handleValueChange(oldValue: string, newValue: string): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-color-picker': SlColorPicker;
    }
}
//# sourceMappingURL=color-picker.d.ts.map