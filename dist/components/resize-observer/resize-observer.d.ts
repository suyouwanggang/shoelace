import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - One or more elements to watch for resizing.
 *
 * @event {{ entries: ResizeObserverEntry[] }} sl-resize - Emitted when the element is resized.
 */
export default class SlResizeObserver extends LitElement {
    static styles: import("lit").CSSResult;
    private resizeObserver;
    private observedElements;
    /** Disables the observer. */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleSlotChange(): void;
    startObserver(): void;
    stopObserver(): void;
    handleDisabledChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-resize-observer': SlResizeObserver;
    }
}
