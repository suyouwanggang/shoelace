import { LitElement } from 'lit';
import SlSteps from '../steps/steps';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot step-icon The icon slot.
 * @slot step-title - The title slot.
 * @slot step-description - The description slot.
 *
 * @csspart step-container - The component's base wrapper.
 * @csspart step-content - The component's step content wrapper.
 * @csspart step-icon - The component's step title wrapper.
 * @csspart step-title - The component's step title wrapper.
 * @csspart step-description - The component's step description wrapper.
 *
 * @cssproperty --step-background-color - background-color for step.
 * @cssproperty --step-border-color - color for step border-color.
 * @cssproperty --step-icon-color - color for step icon color.
 */
export default class SlStep extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * 图标
     */
    icon: string;
    /**
     * 描述
     */
    description: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 顺序号
     */
    index: number;
    isCurrentStep(): boolean;
    isFinished(): boolean;
    get parentSteps(): SlSteps;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-step': SlStep;
    }
}
