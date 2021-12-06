// src/utilities/resize.util.ts
var handerMap = new WeakMap();
var resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    let el = entry.target;
    let handerls = handerMap.get(el);
    if (handerls) {
      for (let h of handerls) {
        h(el, entry);
      }
    }
  }
});
var addResizeHander = (els, callCackFun) => {
  var _a;
  for (let el of els) {
    resizeObserver.observe(el);
    if (handerMap.has(el)) {
      (_a = handerMap.get(el)) == null ? void 0 : _a.push(callCackFun);
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

export {
  addResizeHander
};
