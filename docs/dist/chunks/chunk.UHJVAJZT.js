import {
  getTransformPara
} from "./chunk.IET5S4KB.js";
import {
  ripple_styles_default
} from "./chunk.4O23R3W5.js";
import {
  addEvent
} from "./chunk.3SJG5WV3.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  getOpacity,
  normalizePointerEvent
} from "./chunk.53VVVNUW.js";
import {
  e,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass,
  __spreadProps,
  __spreadValues
} from "./chunk.THXBF3MO.js";

// src/components/ripple/ripple.ts
var RIPPLE_ANIMATION_CONFIG = {
  easing: "ease-out",
  fill: "both"
};
function computeRadius(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) / 2;
}
var RIPPLE_INITIAL_DURATION = 350;
var RIPPLE_RELEASE_DURATION = 500;
var DISPOSEOBJ = {
  dispose() {
  }
};
var SlRipple = class extends s {
  constructor() {
    super(...arguments);
    this.unbounded = false;
    this.centered = false;
    this.overlay = false;
    this.disabled = false;
    this.focusable = false;
    this.autoRelease = false;
    this.initialDuration = RIPPLE_INITIAL_DURATION;
    this.releaseDuration = RIPPLE_RELEASE_DURATION;
    this.role = "presentation";
    this.target = this;
    this.listeners = [];
    this.rippleAnimationListeners = [];
  }
  changeTarget() {
    this.listeners.forEach((item) => item.dispose());
    if (this.target) {
      this.listeners = [];
      const mousedown = addEvent(this.target, "mousedown", (e2) => this.spawnRipple(e2), { passive: true });
      const focusin = addEvent(this.target, "focusin", this.onFocusIn.bind(this), { passive: true });
      const focusout = addEvent(this.target, "focusout", this.onFocusOut.bind(this), { passive: true });
      this.listeners.concat(mousedown, focusin, focusout);
    }
  }
  firstUpdate(map) {
    super.firstUpdated(map);
    this.changeTarget();
  }
  onFocusIn() {
    if (!this.focusable)
      return;
    this.spawnRipple(void 0, { autoRelease: false });
  }
  onFocusOut() {
    if (!this.focusable)
      return;
    this.releaseRipple();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.listeners.forEach((item) => item.dispose());
    this.rippleAnimationListeners.forEach((item) => item.dispose());
  }
  releaseRipple() {
    this.rippleAnimationListeners.forEach((item) => item.dispose());
    this.rippleAnimationListeners = [];
  }
  spawnRipple(e2, config) {
    if (this.disabled) {
      return DISPOSEOBJ;
    }
    this.releaseRipple();
    const rect = this.getBoundingClientRect();
    let x = 0;
    let y = 0;
    if (this.centered || e2 == null) {
      x = rect.width / 2;
      y = rect.height / 2;
    } else {
      let { clientX, clientY } = normalizePointerEvent(e2);
      x = clientX - rect.left;
      y = clientY - rect.top;
    }
    const release = this.showRippleAtCoords({ x, y }, config);
    this.rippleAnimationListeners.push(release);
    if (this.target != null && !this.focusable) {
      this.rippleAnimationListeners.push(addEvent(window, "mouseup", this.releaseRipple.bind(this), { passive: true }));
    }
    return release;
  }
  async showRipple() {
    this.spawnRipple();
    await this.updateComplete;
    this.releaseRipple();
  }
  showRippleAtCoords({ x, y }, config) {
    const { releaseDuration = this.releaseDuration, initialDuration = this.initialDuration, autoRelease = this.autoRelease } = config || {};
    const { offsetWidth, offsetHeight } = this;
    const scale = getTransformPara(this);
    x *= scale.ScaleX === 0 ? 1 : 1 / scale.ScaleX;
    y *= scale.ScaleY === 0 ? 1 : 1 / scale.ScaleY;
    const $ripple = document.createElement("div");
    $ripple.classList.add("ripple");
    const containerRadius = computeRadius(offsetWidth, offsetHeight);
    const extraRadius = computeRadius(Math.abs(offsetWidth / 2 - x), Math.abs(offsetHeight / 2 - y));
    const radius = Math.round(containerRadius + extraRadius * 2);
    const diameter = radius * 2;
    Object.assign($ripple.style, {
      left: `${x - radius}px`,
      top: `${y - radius}px`,
      height: `${diameter}px`,
      width: `${diameter}px`,
      position: "absolute"
    });
    let released = false;
    const release = {
      dispose: () => {
        if (released)
          return;
        released = true;
        const opacity = getOpacity(window.getComputedStyle($ripple));
        const outAnimation = $ripple.animate({
          opacity: [opacity.toString(), `0`]
        }, __spreadProps(__spreadValues({}, RIPPLE_ANIMATION_CONFIG), { duration: releaseDuration }));
        outAnimation.onfinish = () => {
          requestAnimationFrame(() => {
            if (this.shadowRoot.contains($ripple)) {
              this.shadowRoot.removeChild($ripple);
            }
          });
        };
      }
    };
    this.shadowRoot.appendChild($ripple);
    if (autoRelease) {
      release.dispose();
      return DISPOSEOBJ;
    }
    $ripple.animate({
      transform: [`scale(0)`, `scale(1)`]
    }, __spreadProps(__spreadValues({}, RIPPLE_ANIMATION_CONFIG), { duration: initialDuration }));
    return release;
  }
  render() {
    return this.target == this ? p`<slot></slot>` : p``;
  }
  firstUpdated(map) {
    super.firstUpdated(map);
  }
};
SlRipple.styles = ripple_styles_default;
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRipple.prototype, "unbounded", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRipple.prototype, "centered", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRipple.prototype, "overlay", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRipple.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRipple.prototype, "focusable", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRipple.prototype, "autoRelease", 2);
__decorateClass([
  e({ type: Number })
], SlRipple.prototype, "initialDuration", 2);
__decorateClass([
  e({ type: Number })
], SlRipple.prototype, "releaseDuration", 2);
__decorateClass([
  e({ type: String, reflect: true })
], SlRipple.prototype, "role", 2);
__decorateClass([
  e({ type: Object })
], SlRipple.prototype, "target", 2);
__decorateClass([
  watch("target")
], SlRipple.prototype, "changeTarget", 1);
SlRipple = __decorateClass([
  n("sl-ripple")
], SlRipple);

export {
  RIPPLE_ANIMATION_CONFIG,
  computeRadius,
  RIPPLE_INITIAL_DURATION,
  RIPPLE_RELEASE_DURATION,
  SlRipple
};
