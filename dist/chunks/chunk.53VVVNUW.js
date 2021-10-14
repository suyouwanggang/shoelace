// src/internal/event.ts
function emit(el, name, options) {
  const event = new CustomEvent(name, Object.assign({
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {}
  }, options));
  el.dispatchEvent(event);
  return event;
}
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}
function isTouchEvent(event) {
  return event.changedTouches != null;
}
function normalizePointerEvent(e) {
  let isTouch = false;
  let pointerEvent;
  if (isTouchEvent(e)) {
    pointerEvent = e.changedTouches[0];
    isTouch = true;
  } else {
    pointerEvent = e;
  }
  let { clientX, clientY, pageX, pageY } = pointerEvent;
  return { clientX, clientY, pageX, pageY, isTouch };
}
function getOpacity(computedStyle) {
  if (computedStyle.getPropertyValue("width") === "0px" || computedStyle.getPropertyValue("height") === "0px") {
    return 0;
  }
  const opacityString = computedStyle.getPropertyValue("opacity");
  return isNaN(+opacityString) ? 0 : Number(opacityString);
}

export {
  emit,
  waitForEvent,
  normalizePointerEvent,
  getOpacity
};
