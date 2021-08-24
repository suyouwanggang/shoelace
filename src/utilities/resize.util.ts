const handerMap = new WeakMap<Element, Array<(elment: Element) => void>>();
const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (let entry of entries) {
    let el = entry.target;
    let handerls = handerMap.get(el);
    if (handerls) {
      for (let h of handerls) {
        h(el);
      }
    }
  }
});
export type DisposeObject = {
  dispose: () => void;
};
/**
 * 监听元素大小发生变化
 * @param els 需要被监听resize 的元素
 * @param callCackFun 回调函数
 * @returns 返回一个对象，通过dispose() 解除对象的监听
 */
export const addResizeHander = (els: Array<Element>, callCackFun: (el: Element) => void): DisposeObject => {
  for (let el of els) {
    resizeObserver.observe(el);
    if (handerMap.has(el)) {
      handerMap.get(el)?.push(callCackFun);
    } else {
      handerMap.set(el, [callCackFun]);
    }
  }
  return {
    dispose() {
      for (let el of els) {
        resizeObserver.unobserve(el);
        const array = handerMap.get(el);
        if (array) {
          let index = array.indexOf(callCackFun);
          if (index >= 0) {
            array.splice(index, 1);
          }
          if (array.length == 0) {
            handerMap.delete(el);
          }
        }
      }
    }
  };
};
