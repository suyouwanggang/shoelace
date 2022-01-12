import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status experimental
 * @description flex 布局组件实现,默认是flex 垂直布局
 *
 *
 *
 *
 * @slot - The default slot.
 *
 *
 *
 *
 *
 */
export default class SlLayout extends LitElement {
    static styles: import("lit").CSSResult;
    /** 是否按照行进行Flex row布局 */
    row: boolean;
    /** 是否按照列进行Flex column布局 */
    column: boolean;
    /** 是否 主轴，次轴都居中 */
    center: boolean;
    /** 是否扩展剩余空间 */
    expand: boolean;
    /** 主轴子项对齐方式 */
    main: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    /** 次轴子项对齐方式 */
    cross: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    setXYChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-layout': SlLayout;
    }
}
//# sourceMappingURL=layout.d.ts.map