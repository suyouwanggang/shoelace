import { LitElement, PropertyValues } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 * @event {{size:number}} sl-splitter-change - Emitted when split value .
 *
 * @slot - The default slot.
 * @slot  exta - 需要被拖动的小部分容器.
 *
 * @csspart base - The component's base wrapper.
 * @csspart exta - The component's base exta wrapper.
 * @csspart main - The component's base main wrapper.
 *
 * @cssproperty --sl-split-width - spit div width.
 * @cssproperty --sl-split-hover-color- spit div hover color.
 */
export default class SlSplitter extends LitElement {
    static styles: import("lit").CSSResult;
    /** Split 切割位置. */
    splitType: 'left' | 'right' | 'top' | 'bottom';
    /** 是否允许拖动改变位置 */
    splitAble: boolean;
    /**分隔允许的最小位置  */
    minSize?: number;
    maxSize?: number;
    /**整体是否显示边框  */
    border: boolean;
    changeSplitType(old: string, newType: string): void;
    firstUpdated(map: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-splitter': SlSplitter;
    }
}
