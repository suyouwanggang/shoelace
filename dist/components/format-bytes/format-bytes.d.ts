import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 */
export default class SlFormatBytes extends LitElement {
    /** The number to format in bytes. */
    value: number;
    /** The unit to display. */
    unit: 'bytes' | 'bits';
    /** The locale to use when formatting the number. */
    locale: string;
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-format-bytes': SlFormatBytes;
    }
}
//# sourceMappingURL=format-bytes.d.ts.map