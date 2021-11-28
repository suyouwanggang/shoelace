import { LitElement, PropertyValues } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 * @event  sl-date-select - Emitted when a date select.
 *
 *
 *
 * @csspart base - The component's base wrapper.
 * @csspart prevButton - The component's prevButton .
 * @csspart nextButton - The component's prevButton .
 * @csspart panel-base - The component's  panel wrap select DIV.
 * @csspart date-date - The component's  select date panel.
 * @csspart date-month - The component's  select month panel.
 * @csspart date-year - The component's  select year panel.
 * @csspart item-year - The component's year panel item: item year.
 * @csspart item-month - The component's month panel item: item month.
 * @csspart item-date - The component's day panel item: item day .
 *
 * @cssproperty --example - An example CSS custom property.
 */
export default class SlDatePanel extends LitElement {
    static styles: import("lit").CSSResult;
    /** 选中日期 ,格式：2018，2018-02, 2018/01， 2018/02/02 ,2018-01-02 */
    value?: string;
    /**选择模式，年，月，日 */
    mode: 'year' | 'month' | 'date';
    /** 最小值 */
    min?: string | number;
    /** 最大值 */
    max?: string | number;
    get maxDate(): Date | null | undefined;
    get minDate(): Date | null | undefined;
    private innerMode;
    private get _innerYear();
    private get _innerMonth();
    /** 内部 value 所对应的日期 */
    valueDate?: Date;
    get valueDateString(): string;
    /** 内部：维护切换上下面板后显示的时间 */
    private innerDate;
    watchSelectModeChange(): void;
    private get innerDisplayDateStr();
    /** 渲染顶部 */
    private renderHeader;
    /** 渲染 周和月的天 */
    private renderDatePanel;
    /** 渲染 年选月Body */
    private renderMonthBody;
    /** 触发 date-select 事件 */
    private emitValueSelectEvent;
    /** 渲染 年选月Body */
    private renderYearBody;
    firstUpdated(map: PropertyValues): void;
    naviagtorByKeyCode(keyCode: string): boolean;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-date-panel': SlDatePanel;
    }
}
//# sourceMappingURL=date-panel.d.ts.map