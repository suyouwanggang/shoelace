import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - A label to show inside the indicator.
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The progress bar indicator.
 * @csspart label - The progress bar label.
 *
 * @cssproperty --height - The progress bar's height.
 * @cssproperty --track-color - The track color.
 * @cssproperty --indicator-color - The indicator color.
 * @cssproperty --label-color - The label color.
 */
export default class SlProgressBar extends LitElement {
    static styles: import("lit").CSSResult;
    private localize;
    /** The current progress, 0 to 100. */
    value: number;
    /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
    indeterminate: boolean;
    /** A custom label for the progress bar's aria label. */
    label: string;
    /** The locale to render the component in. */
    lang: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-progress-bar': SlProgressBar;
    }
}
//# sourceMappingURL=progress-bar.d.ts.map