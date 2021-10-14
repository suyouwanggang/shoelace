/**
 * 获取原始 相对于window top,left 值
 * @param element
 * @returns
 */
declare function getOffset(element: Element): {
    top: number;
    left: number;
};
/**
 * 获取el 的当前css 属性值
 * @param el DOM元素
 * @param cssProperty
 * @returns
 */
declare function getCssValue(el: Element, cssProperty: string): string;
/**
 * 给 DOM 添加 动画class, 返回动画结束promise;
 * @param node  节点
 * @param animation 动画className
 * @param prefix
 * @returns  返回动画结束promise
 */
declare function animateCss(node: Element, animation: string, prefix?: string): Promise<string>;
/**
 * 给DOM toogle class ,返回动画结束promise
 */
declare function animateToogleCss(node: Element, cssClass: string): Promise<string>;
/**
 * 给node添加事件
 * @param node 节点
 * @param eventType 事件类型
 * @param hanlder 监听
 * @param useCapture 是否捕获
 * @returns  返回一个object ,能够删除node监听
 */
declare function addEvent(node: EventTarget, eventType: string, hanlder: EventListenerObject | EventListener, useCapture?: boolean | AddEventListenerOptions): {
    dispose: () => void;
};
/**
 * node clone 复制（现在因为大量的webcomponent 组件，复制的时候 ，自定义属性是不会复制的，所以导致复制的组件，跟原始组件展示不一样）
 * @param node
 * @param deepClone 是否深度clone, 如果undefined 则深度复制
 */
declare function cloneUtils(node: Element, deepClone?: boolean): Element;
/**
 * 获取所有直接节点
 * @param node
 * @param cssSelector 子节点类型
 * @returns
 */
declare function getChildrenElement(node: Element, cssSelector: string): Element[];
/**
 * 模拟jquery closest
 * @param el
 * @param selector
 * @returns
 */
declare const closest: (el: Node, selector: string) => Element | null;
/**
 * 模拟jquery on 事件
 * @param node 节点
 * @param selector  子选择器
 * @param type 事件类型
 * @param callBack  回调
 * @param userCapture 是否捕获
 * @param context 回调上下文，如果为空，则this 为事件监听的实际节点
 * @returns
 */
declare function onEvent(node: Element, selector: string, type: string, callBack: EventListener, userCapture?: boolean, context?: unknown): {
    dispose: () => void;
};
/**
 * 模拟jquery on 事件
 * @param node 节点
 * @param selector  子选择器
 * @param type 事件类型
 * @param callBack  回调
 * @param userCapture 是否捕获
 * @param context 回调上下文，如果为空，则this 为事件监听的实际节点
 * @returns
 */
declare function onEventArray(node: Element, selector: string, eventTypes: string[], callBack: EventListener, userCapture?: boolean, context?: unknown): {
    dispose: () => void;
}[];
declare function exitFullscreen(): Promise<any>;
declare function isFullscreen(): any;
declare function fullscreen(el: HTMLElement | Window | Document): Promise<any>;
declare const isObject: (obj: any) => obj is object;
declare const isArray: (obj: any) => obj is any[];
declare const isFunction: (fun: any) => fun is Function;
export { isObject, isArray, isFunction, getOffset, getCssValue, animateCss, animateToogleCss, addEvent, cloneUtils, getChildrenElement, closest, onEvent, onEventArray, isFullscreen, exitFullscreen, fullscreen };
