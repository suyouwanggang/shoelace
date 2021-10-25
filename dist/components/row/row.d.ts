import { LitElement } from 'lit';
import './col';
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 *
 *
 * @slot - The default slot.
 *
 *
 */
export default class SlRow extends LitElement {
    static styles: import("lit").CSSResult;
    /** grid等分多少列 */
    columns: number;
    /** grid 单元格的间距 */
    grap: string;
    changeSpanMethod(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-row': SlRow;
    }
}
//# sourceMappingURL=row.d.ts.map