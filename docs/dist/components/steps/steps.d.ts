import { LitElement, PropertyValues } from 'lit';
import '../icon/icon';
import SlStep from '../step/step';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-step,sl-icon
 *
 * @event sl-change - Emitted as current step change.
 *
 * @slot - The default slot accept <sl-step> chilldrens.
 *
 * @csspart container - The component's container wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
export default class SlSteps extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * 当前步骤，默认从0
     */
    current: number;
    /**
     * 是否为竖直
     */
    vertical: boolean;
    /**
     * 起始节点显示 序号，默认为1
     */
    startIndex: number;
    /**
     *  进度点 圆圈大小
     */
    size: 'small' | 'mid' | 'larger';
    firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void;
    private _setChildStepCss;
    updated(_changedProperties: PropertyValues): void;
    get childStep(): Array<SlStep>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-steps': SlSteps;
    }
}
//# sourceMappingURL=steps.d.ts.map