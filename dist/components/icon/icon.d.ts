import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @event sl-load - Emitted when the icon has loaded.
 * @event {{ status: number }} sl-error - Emitted when the icon fails to load due to an error.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlIcon extends LitElement {
    static styles: import("lit").CSSResult;
    private svg;
    /** The name of the icon to draw. */
    name: string;
    /** An external URL of an SVG file. */
    src: string;
    /** An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. */
    label: string;
    /** The name of a registered custom icon library. */
    library: string;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    getLabel(): string;
    private getUrl;
    /** @internal Fetches the icon and redraws it. Used to handle library registrations. */
    redraw(): void;
    setIcon(): Promise<void>;
    handleChange(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-icon': SlIcon;
    }
}
//# sourceMappingURL=icon.d.ts.map