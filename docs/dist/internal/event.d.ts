export declare function emit(el: HTMLElement | Window, name: string, options?: CustomEventInit): CustomEvent<any>;
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