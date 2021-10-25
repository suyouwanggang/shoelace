// src/utilities/common.ts
function getOffset(element) {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }
  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;
  return {
    top: rect.top + (win ? win.pageYOffset : 0),
    left: rect.left + (win ? win.pageXOffset : 0)
  };
}
function getCssValue(el, cssProperty) {
  const win = document.defaultView ? document.defaultView : window;
  return win.getComputedStyle(el, null).getPropertyValue(cssProperty);
}
function animateCss(node, animation, prefix = "animate_") {
  return new Promise((resolve) => {
    const animationName = `${animation}`;
    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}
function animateToogleCss(node, cssClass) {
  node.classList.toggle(cssClass);
  return new Promise((resolve) => {
    function handleAnimationEnd(event) {
      event.stopPropagation();
      resolve("Animation ended");
    }
    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}
function addEvent(node, eventType, hanlder, useCapture = false) {
  node.addEventListener(eventType, hanlder, useCapture);
  return {
    dispose: function() {
      node.removeEventListener(eventType, hanlder, useCapture);
    }
  };
}
function cloneUtils(node, deepClone = true) {
  const cloneNode = node.cloneNode(deepClone);
  return cloneNode;
}
function getChildrenElement(node, cssSelector) {
  return Array.from(node.children).filter((item) => {
    return item && item.matches(cssSelector);
  });
}
var closest = (el, selector) => {
  let node = el;
  if (node.nodeType == Node.TEXT_NODE) {
    node = node.parentNode;
  }
  while (node != null && node.nodeType == Node.ELEMENT_NODE) {
    if (node.matches(selector)) {
      return node;
    } else if (node.parentElement == null) {
      return null;
    }
    node = node.parentNode;
  }
  return null;
};
function onEvent(node, selector, type, callBack, userCapture = false, context) {
  const listener = function(e) {
    const target = e.target;
    const delegateTarget = closest(target, selector);
    e.delegateTarget = delegateTarget;
    if (delegateTarget) {
      callBack.call(context || delegateTarget, e);
    }
  };
  if (typeof userCapture == "undefined") {
    if (type == "mouseenter" || type == "mouseleave" || type == "blur" || type == "focus") {
      userCapture = true;
    }
  }
  return addEvent(node, type, listener, userCapture);
}
function onEventArray(node, selector, eventTypes, callBack, userCapture = false, context) {
  let result = [];
  for (let type of eventTypes) {
    result.push(onEvent(node, selector, type, callBack, userCapture, context));
  }
  return result;
}
function exitFullscreen() {
  const doc = document;
  if (doc.exitFullScreen) {
    return doc.exitFullScreen();
  } else if (doc.mozCancelFullScreen) {
    return doc.mozCancelFullScreen();
  } else if (doc.webkitExitFullscreen) {
    return doc.webkitExitFullscreen();
  } else {
    return doc.msExitFullscreen();
  }
}
function isFullscreen() {
  const doc = document;
  return doc.fullscreen || doc.webkitIsFullScreen || doc.webkitFullScreen || doc.mozFullScreen || doc.msFullScreen;
}
function fullscreen(el) {
  const ele = el;
  if (ele.requestFullscreen) {
    return ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    return ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
    return ele.webkitRequestFullscreen();
  } else {
    return ele.msRequestFullscreen();
  }
}
var isObject = (obj) => {
  return typeof obj == "object" && obj != null;
};
var isArray = (obj) => {
  return obj != null && Object.prototype.toString.call(obj) == "[object Array]";
};
var isFunction = (fun) => {
  return typeof fun === "function";
};

export {
  getOffset,
  getCssValue,
  animateCss,
  animateToogleCss,
  addEvent,
  cloneUtils,
  getChildrenElement,
  closest,
  onEvent,
  onEventArray,
  exitFullscreen,
  isFullscreen,
  fullscreen,
  isObject,
  isArray,
  isFunction
};
