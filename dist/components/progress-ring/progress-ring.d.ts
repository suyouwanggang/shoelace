import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the ring.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The progress ring label.
 *
 * @cssproperty --size - The diameter of the progress ring (cannot be a percentage).
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The indicator color.
 */
export default class SlProgressRing extends LitElement {
    static styles: import("lit").CSSResult;
    indicator: SVGCircleElement;
    indicatorOffset: string;
    /** The current progress, 0 to 100. */
    value: number;
    updated(changedProps: Map<string, any>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-progress-ring': SlProgressRing;
    }
}
