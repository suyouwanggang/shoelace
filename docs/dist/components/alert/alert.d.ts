import { LitElement, TemplateResult } from 'lit';
import '../icon-button/icon-button';
export declare type StackPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export declare type MessageType = {
    text?: string | TemplateResult<1>;
    type: 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
    stack: StackPosition;
    icon: string;
    duration: number;
    afterHide?: (alert: SlAlert) => void;
    afterShow: (alert: SlAlert) => void;
};
/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 *
 * @event sl-show - Emitted when the alert opens.
 * @event sl-after-show - Emitted after the alert opens and all animations are complete.
 * @event sl-hide - Emitted when the alert closes.
 * @event sl-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the alert icon.
 * @csspart message - The alert message.
 * @csspart close-button - The close button.
 *
 * @cssproperty --box-shadow - The alert's box shadow.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */
export default class SlAlert extends LitElement {
    static styles: import("lit").CSSResult;
    private autoHideTimeout;
    base: HTMLElement;
    /** Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /** Makes the alert closable. */
    closable: boolean;
    /** The alert's variant. */
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
    /**
     * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
     * the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`.
     */
    duration: number;
    firstUpdated(): void;
    /** Shows the alert. */
    show(): Promise<void>;
    /** Hides the alert */
    hide(): Promise<void>;
    /**
     * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
     * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
     * calling this method again. The returned promise will resolve after the alert is hidden.
     */
    toast(stack?: StackPosition): Promise<void>;
    restartAutoHide(): void;
    handleCloseClick(): void;
    handleMouseMove(): void;
    handleOpenChange(): Promise<void>;
    handleDurationChange(): void;
    /** 发送全局message 消息 */
    static notify: (message: string | MessageType, type?: "primary" | "success" | "danger" | "warning" | "neutral", icon?: string, duration?: number) => Promise<void>;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-alert': SlAlert;
    }
}
//# sourceMappingURL=alert.d.ts.map