import {
  __spreadProps,
  __spreadValues
} from "./chunk.FHAP4LMI.js";

// src/internal/animate.ts
function animateTo(el, keyframes, options) {
  return new Promise(async (resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function parseDuration(delay) {
  delay = (delay + "").toLowerCase();
  if (delay.indexOf("ms") > -1) {
    return parseFloat(delay);
  }
  if (delay.indexOf("s") > -1) {
    return parseFloat(delay) * 1e3;
  }
  return parseFloat(delay);
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query == null ? void 0 : query.matches;
}
function stopAnimations(el) {
  return Promise.all(el.getAnimations().map((animation) => {
    return new Promise((resolve) => {
      const handleAnimationEvent = requestAnimationFrame(resolve);
      animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
      animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
      animation.cancel();
    });
  }));
}
function shimKeyframesHeightAuto(keyframes, calculatedHeight) {
  return keyframes.map((keyframe) => Object.assign({}, keyframe, {
    height: keyframe.height === "auto" ? `${calculatedHeight}px` : keyframe.height
  }));
}
var animate_show = [
  { height: 0, overflow: "hidden" },
  { height: "auto", overflow: "hidden" }
];
var animate_hide = [
  { height: "auto", overflow: "hidden" },
  { height: 0, overflow: "hidden" }
];

export {
  animateTo,
  parseDuration,
  stopAnimations,
  shimKeyframesHeightAuto,
  animate_show,
  animate_hide
};
