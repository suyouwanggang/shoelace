import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
export default class SlCol extends LitElement {
    static styles: import("lit").CSSResult;
    /** 占多少列 */
    span: number;
    /** 占多少行 */
    row: number;
    changeSpanMethod(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-col': SlCol;
    }
}
//# sourceMappingURL=col.d.ts.map