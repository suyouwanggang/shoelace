import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 */
export default class SlRelativeTime extends LitElement {
    private updateTimeout;
    private isoTime;
    private relativeTime;
    private titleTime;
    /** The date from which to calculate time from. */
    date: Date | string;
    /** The locale to use when formatting the number. */
    locale: string;
    /** The formatting style to use. */
    format: 'long' | 'short' | 'narrow';
    /**
     * When `auto`, values such as "yesterday" and "tomorrow" will be shown when possible. When `always`, values such as
     * "1 day ago" and "in 1 day" will be shown.
     */
    numeric: 'always' | 'auto';
    /** Keep the displayed value up to date as time passes. */
    sync: boolean;
    disconnectedCallback(): void;
    updateTime(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-relative-time': SlRelativeTime;
    }
}
//# sourceMappingURL=relative-time.d.ts.map