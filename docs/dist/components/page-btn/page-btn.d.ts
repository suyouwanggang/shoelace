import { LitElement, PropertyValues, TemplateResult } from 'lit';
import '../icon/icon';
import '../select/select';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-button,sl-select,sl-icon
 *
 * @event sl-page-change - Emitted when current page changed   .
 * @event sl-page-before-change - Emitted before  page changed,use can defaultPrevented ,then sl-page-change can not be emit    .
 *
 * @slot prefix The prefix slot.
 * @slot no-data - when total=0 to show .
 * @slot default - tool bar end to show .
 
 * @csspart base - The component's base wrapper.
 * @csspart pageWrap - The component's to page button  wrapper.
 *
 *
 */
export default class SlPageBtn extends LitElement {
    static styles: import("lit").CSSResult;
    /** 当前页 */
    value: number;
    /** 分页大小 */
    pageSize: number;
    /** 是否调整 分页大小 组件*/
    showSizeChange: boolean;
    /** 是否允许直接调整第几页 */
    showPageChange: boolean;
    /** 是否允许 简化分页模式 */
    simple: boolean;
    /**布局对齐方式 */
    align: 'left' | 'right' | 'center';
    /** 总数大小 */
    total: number;
    /** 支持调整的分页大小 */
    pageSizeOptions: Array<Number>;
    /** 是否显示 直接跳转到第一页 */
    showFirst: boolean;
    /** 是否显示 直接跳转到最后一页 */
    showLast: boolean;
    get pageCount(): number;
    watchPageChange(): void;
    _renderSimple(): TemplateResult<1>;
    _renderPageButton(): TemplateResult<1>;
    _renderPage(): TemplateResult<1>[];
    private _eventDispose1;
    private _eventDispose2;
    firstUpdated(map: PropertyValues): void;
    disconnectedCallback(): void;
    private goToPageByKey;
    goToPage(pageNo: number): void;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-page-btn': SlPageBtn;
    }
}
//# sourceMappingURL=page-btn.d.ts.map