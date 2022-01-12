import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The tooltip's target element. Only the first element will be used as the target.
 * @slot content - The tooltip's content. Alternatively, you can use the content prop.
 *
 * @event sl-show - Emitted when the tooltip begins to show.
 * @event sl-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event sl-hide - Emitted when the tooltip begins to hide.
 * @event sl-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --sl-tooltip-background-color - The background color of  tooltip ,like: 87 83 78
 * @cssproperty --sl-tooltip-color - The font color of  tooltip ,like: 87 83 78
 * @cssproperty --max-width - The maximum width of the tooltip.
 * @cssproperty --hide-delay - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay - The amount of time to wait before showing the tooltip when hovering.
 *
 * @animation tooltip.show - The animation to use when showing the tooltip.
 * @animation tooltip.hide - The animation to use when hiding the tooltip.
 */
export default class SlTooltip extends LitElement {
    static styles: import("lit").CSSResult;
    positioner: HTMLElement;
    tooltip: HTMLElement;
    private target;
    private popover;
    private hoverTimeout;
    /** The tooltip's content. Alternatively, you can use the content slot. */
    content: string;
    /**
     * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
     * inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    /**
     *  tooltip theme type .
     */
    type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'blank';
    /** Disables the tooltip so it won't show when triggered. */
    disabled: boolean;
    /** The distance in pixels from which to offset the tooltip away from its target. */
    distance: number;
    /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /** The distance in pixels from which to offset the tooltip along its target. */
    skidding: number;
    /**
     * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
     * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
     * programmatically.
     */
    trigger: string;
    /**
     * Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
     * `overflow: auto|hidden|scroll`.
     */
    hoist: boolean;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    /** Shows the tooltip. */
    show(): Promise<void>;
    /** Hides the tooltip */
    hide(): Promise<void>;
    getTarget(): HTMLElement;
    handleBlur(): void;
    handleClick(): void;
    handleFocus(): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleMouseOver(): void;
    handleMouseOut(): void;
    handleOpenChange(): Promise<void>;
    handleOptionsChange(): void;
    handleContentChange(): void;
    handleDisabledChange(): void;
    hasTrigger(triggerType: string): boolean;
    syncOptions(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tooltip': SlTooltip;
    }
}
//# sourceMappingURL=tooltip.d.ts.map