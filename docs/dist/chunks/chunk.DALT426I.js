import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.UTEQRIIY.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  animateTo,
  stopAnimations
} from "./chunk.R4MROFKW.js";
import {
  alert_styles_default
} from "./chunk.H2BRLAWC.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit,
  waitForEvent
} from "./chunk.53VVVNUW.js";
import {
  e,
  i,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s,
  x
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/alert/alert.ts
var toastStackMap = {};
var getStatckDIV = (stack) => {
  let el = toastStackMap[stack];
  if (!el) {
    el = Object.assign(document.createElement("div"), { className: "sl-toast-stack" });
    el.setAttribute("stack", stack);
    toastStackMap[stack] = el;
  }
  return el;
};
var notify = (message, type = "primary", icon = "info-circle", duration = 3e3) => {
  const isString = typeof message == "string";
  const messageObj = message;
  let alert;
  const messageText = !isString ? messageObj.text : message;
  const alterTemplat = $`<sl-alert
    closable
    .type=${!isString && messageObj.type ? messageObj.type : type}
    .duration=${!isString && typeof messageObj.duration != "undefined" ? messageObj.duration : duration}
    @sl-after-show=${() => !isString && messageObj.afterShow ? messageObj.afterShow(alert) : ""}
    @sl-after-hide=${() => !isString && messageObj.afterHide ? messageObj.afterHide(alert) : ""}
  >
    <sl-icon name=${!isString && messageObj.icon ? messageObj.icon : icon} slot="icon"></sl-icon>
    ${messageText}</sl-alert
  >`;
  const frag = document.createDocumentFragment();
  x(alterTemplat, frag);
  alert = frag.querySelector("sl-alert");
  return alert.toast(!isString ? message.stack : void 0);
};
var SlAlert = class extends s {
  constructor() {
    super(...arguments);
    this.open = false;
    this.closable = false;
    this.variant = "primary";
    this.duration = Infinity;
  }
  firstUpdated() {
    this.base.hidden = !this.open;
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  async toast(stack = "top-right") {
    return new Promise((resolve) => {
      const toastStack = getStatckDIV(stack);
      if (!toastStack.parentElement) {
        document.body.append(toastStack);
      }
      toastStack.appendChild(this);
      requestAnimationFrame(() => {
        this.clientWidth;
        this.show();
      });
      this.addEventListener("sl-after-hide", () => {
        if (toastStack.contains(this)) {
          toastStack.removeChild(this);
        }
        resolve();
        if (!toastStack.querySelector("sl-alert")) {
          toastStack.remove();
        }
      }, { once: true });
    });
  }
  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }
  handleCloseClick() {
    this.hide();
  }
  handleMouseMove() {
    this.restartAutoHide();
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "sl-show");
      if (this.duration < Infinity) {
        this.restartAutoHide();
      }
      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, "alert.show");
      await animateTo(this.base, keyframes, options);
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      clearTimeout(this.autoHideTimeout);
      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, "alert.hide");
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;
      emit(this, "sl-after-hide");
    }
  }
  handleDurationChange() {
    this.restartAutoHide();
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      alert: true,
      "alert--open": this.open,
      "alert--closable": this.closable,
      "alert--primary": this.variant === "primary",
      "alert--success": this.variant === "success",
      "alert--neutral": this.variant === "neutral",
      "alert--warning": this.variant === "warning",
      "alert--danger": this.variant === "danger"
    })}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <span part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </span>

        <span part="message" class="alert__message">
          <slot></slot>
        </span>

        ${this.closable ? $`
              <span class="alert__close">
                <sl-icon-button
                  exportparts="base:close-button"
                  name="x"
                  library="system"
                  @click=${this.handleCloseClick}
                ></sl-icon-button>
              </span>
            ` : ""}
      </div>
    `;
  }
};
SlAlert.styles = alert_styles_default;
SlAlert.notify = notify;
__decorateClass([
  i('[part="base"]')
], SlAlert.prototype, "base", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlAlert.prototype, "open", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlAlert.prototype, "closable", 2);
__decorateClass([
  e({ reflect: true })
], SlAlert.prototype, "variant", 2);
__decorateClass([
  e({ type: Number })
], SlAlert.prototype, "duration", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlAlert.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("duration")
], SlAlert.prototype, "handleDurationChange", 1);
SlAlert = __decorateClass([
  n("sl-alert")
], SlAlert);
setDefaultAnimation("alert.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("alert.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 250, easing: "ease" }
});

export {
  SlAlert
};
