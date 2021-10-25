import { LitElement, PropertyValues } from 'lit';
import SlDatePanel from '../date-panel/date-panel';
import SlDropdown from '../dropdown/dropdown';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-date-panel
 *
 * @event sl-date-change - Emitted when date change  .
 *
 *
 *
 * @csspart sl-date-panel - The component's base wrapper.
 * @csspart input - The input text.
 * @csspart base - The input wrap container.
 *
 */
export default class SlDate extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
     * inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    /** Makes the input readonly. */
    readonly: boolean;
    clearable: boolean;
    placeholder: string;
    /** Makes  dropDown hoist. */
    hoist: boolean;
    /** set  dropDown distance for trigger. */
    distance: number;
    /** set input size  */
    size: 'small' | 'medium' | 'large';
    /** Disables the input. */
    disabled: boolean;
    /** Draws a pill-style button with rounded edges. */
    pill: boolean;
    /** if true,  select a date ,close the dropDown */
    immediate: boolean;
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
    /** display  as  block div */
    block: boolean;
    firstUpdated(map: PropertyValues): void;
    private handlerDateSelect;
    protected emitDateSelect(): void;
    /** 内部 value 所对应的日期 */
    valueDate?: Date;
    /**获取 日期显示值 */
    get valueDateString(): string;
    datePanel: SlDatePanel;
    dropDown: SlDropdown;
    watchDisabledPanel(): void;
    focus(option: FocusOptions): void;
    watchSelectModeChange(): void;
    invalid: boolean;
    private handlerInputClick;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-date': SlDate;
    }
}
//# sourceMappingURL=date.d.ts.map