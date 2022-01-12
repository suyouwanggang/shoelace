import { ReactiveElement } from "lit";
export declare function emit(el: HTMLElement | Window, name: string, options?: CustomEventInit): CustomEvent<any>;
export { emit as emitEvent };
/**
 * 给组件绑定 全局对象(例如window,document)的事件
 * @param el 组件
 * @param target  事件对象
 * @param eventType 事件类型
 * @param handler  处理器(注意，handler this 等于参数el)
 */
export declare function addEventController(el: ReactiveElement, target: Document | Window | Element, eventType: string, handler: (this: ReactiveElement, event: Event) => void): void;
export declare function waitForEvent(el: HTMLElement, eventName: string): Promise<void>;
/**
 * Determines whether an event is a touch event.
 * @param event
 */
export declare function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent;
export declare function normalizePointerEvent(e: MouseEvent | TouchEvent): {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    isTouch: boolean;
};
export declare function getOpacity(computedStyle: CSSStyleDeclaration): number;
//# sourceMappingURL=event.d.ts.map