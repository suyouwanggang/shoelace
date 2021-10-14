export declare type DisposeObject = {
    dispose: () => void;
};
/**
 * 监听元素大小发生变化
 * @param els 需要被监听resize 的元素
 * @param callCackFun 回调函数
 * @returns 返回一个对象，通过dispose() 解除对象的监听
 */
export declare const addResizeHander: (els: Array<Element>, callCackFun: (el: Element, entry: ResizeObserverEntry) => void) => DisposeObject;
