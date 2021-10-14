import { LitElement, PropertyValues } from 'lit';
declare type overflowType = '' | 'hidden';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency
 *
 * @event {{scrollLeft:number,scrollTop:number,value:number}} sl-scroll-y - Emitted when scroll y bar .
 * @event {{scrollLeft:number,scrollTop:number,value:number}} sl-scroll-x - Emitted when scroll x bar .
 * @event {{scrollLeft:number,scrollTop:number}} sl-scroll-y-end - Emitted when scroll y bar to end .
 * @event {{scrollLeft:number,scrollTop:number}} sl-scroll-x-end - Emitted when scroll x bar to end .
 * @event {{scrollLeft:number,scrollTop:number}} sl-scroll-change - Emitted when scroll  bar change .
 * @event resize  Emitted when component size  change
 *
 * @slot - The default slot.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The component's  scroll div.
 * @csspart content-wrap - The component's slot wrapper.
 *
 * @cssproperty --scroll-bar-width - scroll bar width.
 * @cssproperty --scroll-bar-outer-width - scroll bar-outer width.
 */
export default class SlScroll extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * hidden,则水平滚动条永远隐藏，否则根据内容自动显示隐藏
     */
    overflowX: overflowType;
    /**
     * hidden,则竖直滚动条隐藏，，否则根据内容自动显示隐藏
     */
    overflowY: overflowType;
    /**
     * 是否允许 键盘 上下左右按键滚动
     */
    keyEnable: boolean;
    /**
     * 滚动条宽度
     */
    scrollBarWidth: number;
    /**
     * 滚动条 容器宽度，必须大与 滚动条宽度
     */
    scrollBarOutWidth: number;
    /** 滚动条最小值 */
    minScrollSize: number;
    /** 定义滚动值大小 */
    scrollItemValue: number;
    private _wheelHander;
    private _touchStartX;
    private _touchStartY;
    private _touchStartHanlder;
    private _touchMoveHanlder;
    render(): import("lit-html").TemplateResult<1>;
    rightBottom: HTMLElement;
    contentDIV: HTMLDivElement;
    content_wrap_DIV: HTMLDivElement;
    containerDIV: HTMLDivElement;
    partYScroll: HTMLDivElement;
    partYHandler: HTMLDivElement;
    partXScroll: HTMLDivElement;
    partXHandler: HTMLDivElement;
    private _obersver;
    firstUpdated(_changedProperties: PropertyValues): void;
    disconnectedCallback(): void;
    private _isMouseOn;
    private _MouseOnEventHandler;
    private _MouseOutEventHandler;
    private _docEventHandler;
    private _initScrollBarEvent;
    private _intiKeyEvent;
    private _resizeDispachFun;
    /**
     * 当容器，或者子元素发生变化，触发resize 函数和事件
     */
    resize(): void;
    get caculateYBarHeight(): number;
    get caculateXBarWidth(): number;
    caculateYBarPosition(): number;
    caculateXBarPosition(): number;
    private _yDispatchMethod?;
    private _xDispatchMethod?;
    protected get xDispatchMethod(): (oldValue: number, newValue: number) => void;
    protected get yDispatchMethod(): (oldValue: number, newValue: number) => void;
    private _emitEvent;
    private _scrollDispatchMethod?;
    protected get scrollDispatchMethod(): () => void;
    private _scrollEvent;
    /**
     *
     * @param scrollValue 改变竖直内容滚动位置
     */
    changeYScroll(scrollValue?: number): void;
    /**
     * 事件节流时间
     */
    throttTime: number;
    /**
     * 改变水平内容滚动位置
     * @param scrollValue 改变多少
     */
    changeXScroll(scrollValue?: number): void;
    /**
     * 改变竖直滚动调大位置
     *  @param changeValue 竖直滚动条的改变值，>0 向下
     */
    changeYBarPosition(changeValue?: number): void;
    /**
     * 改变水平滚动条的位置
     * @param changeValue 改变的大小
     */
    changeXBarPosition(changeValue?: number): void;
    /**
     * 竖直滚动条 滚动到底部
     */
    scrollYToEnd(): void;
    /**
     * 竖直内容滚动到特定位置
     * @param scrollTop
     */
    scrollYToValue(scrollTop?: number): void;
    /**
     * 水平滚动条滚动到 最右侧
     */
    scrollXToEnd(): void;
    /**
     *
     * @param scrollLeft 水平内容滚动到特定位置
     */
    scrollXToValue(scrollLeft?: number): void;
    update(changedProperties: PropertyValues): void;
    updated(_changedProperties: PropertyValues): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-scroll': SlScroll;
    }
}
export {};
