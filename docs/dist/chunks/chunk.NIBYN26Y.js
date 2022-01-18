// src/internal/throttle.ts
function debounce(callback, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      return;
    }
    callback.apply(this, [...args]);
    timer = setTimeout(() => timer = null, delay);
  };
}
function debounceWait(fn, wait) {
  let callback = fn;
  let timerId;
  return (...args) => {
    let context = this;
    clearTimeout(timerId);
    timerId = setTimeout(function() {
      callback.apply(context, args);
    }, wait);
  };
}
function throttle(method, delay, scope) {
  let startTime = new Date().getTime();
  return function(...args) {
    const context = scope != null ? scope : this, current = new Date().getTime();
    if (current - startTime >= delay) {
      method.apply(context, args);
      startTime = current;
    }
  };
}
function throttleTimeout(method, wait, mustRun) {
  let startTime = new Date().getTime();
  let timeout;
  return function(...args) {
    const context = this, current = new Date().getTime();
    clearTimeout(timeout);
    if (current - startTime >= mustRun) {
      method.apply(context, args);
      startTime = current;
    } else {
      timeout = window.setTimeout(method, wait);
    }
  };
}

export {
  debounce,
  debounceWait,
  throttle,
  throttleTimeout
};
