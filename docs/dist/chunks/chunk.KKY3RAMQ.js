import {
  isNumberWidth
} from "./chunk.7XFZEBHP.js";
import {
  Modal,
  isPreventScrollSupported
} from "./chunk.2TLFN72Y.js";
import {
  dialog_styles_default
} from "./chunk.BKM4VGNQ.js";
import {
  dragResizeController,
  renderResizeAble
} from "./chunk.CZDPHLDV.js";
import {
  i as i2
} from "./chunk.H55UERJW.js";
import {
  lockBodyScrolling,
  unlockBodyScrolling
} from "./chunk.ST4GEPNZ.js";
import {
  HasSlotController
} from "./chunk.RBDNGYR3.js";
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
  l
} from "./chunk.JVCXZKVY.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit,
  waitForEvent
} from "./chunk.YJDN6H4X.js";
import {
  isFunction
} from "./chunk.3SJG5WV3.js";
import {
  e,
  i,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  r,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/directives/choose.ts
var when = (condition, trueCase, falseCase) => {
  return condition ? isFunction(trueCase) ? trueCase() : trueCase : isFunction(falseCase) ? falseCase == null ? void 0 : falseCase() : falseCase;
};
var whenRef = when;

// src/components/dialog/dialog_resize.litcss
var styles = r`.not-mask{inset:unset;transform:translate(50%,50%)}[part=exta-title]{display:flex;align-items:center}.dialog__panel .resize_heler{position:absolute;z-index:99}.dialog__panel .resize_heler[pos=top]{width:100%;height:2px;left:0;top:0;cursor:n-resize}.dialog__panel .resize_heler[pos=bottom]{width:100%;height:2px;left:0;bottom:0;cursor:n-resize}.dialog__panel .resize_heler[pos=left]{height:100%;width:2px;cursor:w-resize;left:0;top:0}.dialog__panel .resize_heler[pos=right]{cursor:w-resize;height:100%;width:2px;top:0;right:0}.dialog__panel .resize_heler[pos=left-top]{left:0;top:0;cursor:nw-resize;width:7px;height:7px}.dialog__panel .resize_heler[pos=left-bottom]{left:0;bottom:0;cursor:sw-resize;width:7px;height:7px}.dialog__panel .resize_heler[pos=right-top]{right:0;top:0;cursor:ne-resize;width:7px;height:7px}.dialog__panel .resize_heler[pos=right-bottom]{right:0;bottom:0;cursor:se-resize;width:7px;height:7px}.dialog__header.dragHead{cursor:move;user-select:none}`;
var dialog_resize_default = styles;

// src/components/dialog/dialog.ts
var hasPreventScroll = isPreventScrollSupported();
var SlDialog = class extends s {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.open = false;
    this.dragHead = false;
    this.resizeAble = false;
    this.mask = true;
    this.maskClosable = true;
    this.escCloseable = false;
    this.label = "";
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.modalObj = new Modal(this);
    dragResizeController(this);
  }
  firstUpdated() {
    this.dialog.hidden = !this.open;
    if (this.open) {
      this.modalObj.activate();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }
  async show(pos) {
    if (this.open) {
      return;
    }
    if (pos && pos.x) {
      this.panelElement.style.left = pos.x + "px";
    }
    if (pos && pos.y) {
      this.panelElement.style.top = pos.y + "px";
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
  requestClose() {
    if (!this.maskClosable) {
      return;
    }
    this.requestIconClose();
  }
  requestIconClose() {
    const slRequestClose = emit(this, "sl-request-close", { cancelable: true });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "dialog.denyClose");
      animateTo(this.panelElement, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.requestClose();
    }
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "sl-show");
      this.originalTrigger = document.activeElement;
      this.modalObj.activate();
      lockBodyScrolling(this);
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlayElement)]);
      this.dialog.hidden = false;
      if (hasPreventScroll) {
        const slInitialFocus = emit(this, "sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panelElement.focus({ preventScroll: true });
        }
      }
      const panelAnimation = getAnimation(this, "dialog.show");
      const overlayAnimation = getAnimation(this, "dialog.overlay.show");
      await Promise.all([
        animateTo(this.panelElement, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlayElement, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      if (!hasPreventScroll) {
        const slInitialFocus = emit(this, "sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panelElement.focus({ preventScroll: true });
        }
      }
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      this.modalObj.deactivate();
      await Promise.all([stopAnimations(this.dialog), this.overlayElement ? stopAnimations(this.overlayElement) : null]);
      const panelAnimation = getAnimation(this, "dialog.hide");
      const overlayAnimation = getAnimation(this, "dialog.overlay.hide");
      await Promise.all([
        animateTo(this.panelElement, panelAnimation.keyframes, panelAnimation.options),
        this.overlayElement ? animateTo(this.overlayElement, overlayAnimation.keyframes, overlayAnimation.options) : null
      ]);
      this.dialog.hidden = true;
      unlockBodyScrolling(this);
      const trigger = this.originalTrigger;
      if (trigger && typeof trigger.focus === "function") {
        setTimeout(() => trigger.focus());
      }
      emit(this, "sl-after-hide");
    }
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      dialog: true,
      "dialog--open": this.open,
      "dialog--has-footer": this.hasSlotController.test("footer")
    })}
        @keydown=${this.handleKeyDown}
      >
       ${whenRef(this.mask, () => $`<div part="overlay" class="dialog__overlay" @click=${this.requestClose} tabindex="-1"></div>`)}
        <div
          part="panel"
          class="dialog__panel ${this.mask ? "" : "not-mask"}"
          role="dialog"
          style=${i2(this.panelStyle)}
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l(!this.noHeader ? "title" : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? $`
                <header part="header" class="dialog__header ${this.dragHead ? "dragHead" : ""}">
                  <span part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label || String.fromCharCode(65279)} </slot>
                  </span>
                  <span part='exta-title'>
                    <slot name='exta-title'></slot>
                  </span>
                  <span class='dialog__close'  @click="${this.requestIconClose}">
                    <slot name='close-button'>
                      <sl-icon-button
                          exportparts="base:close-button"
                          class="closeImg"
                          name="x"
                          library="system"
                        ></sl-icon-button>
                      </slot>
                  </span>
                </header>
              ` : ""}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
          ${this.resizeAble ? renderResizeAble() : ""}
        </div>
      </div>
    `;
  }
  get panelStyle() {
    const style = {};
    if (this.minHeight) {
      style.minHeight = isNumberWidth(this.minHeight) ? this.minHeight + "px" : this.minHeight;
    }
    if (this.maxHeight) {
      style.maxHeight = isNumberWidth(this.maxHeight) ? this.maxHeight + "px" : this.maxHeight;
    }
    if (this.minWidth) {
      style.minWidth = isNumberWidth(this.minWidth) ? this.minWidth + "px" : this.minWidth;
    }
    if (this.maxWidth) {
      style.maxWidth = isNumberWidth(this.maxWidth) ? this.maxWidth + "px" : this.maxWidth;
    }
    return style;
  }
};
SlDialog.styles = [dialog_styles_default, dialog_resize_default];
__decorateClass([
  i(".dialog")
], SlDialog.prototype, "dialog", 2);
__decorateClass([
  i(".dialog__panel")
], SlDialog.prototype, "panelElement", 2);
__decorateClass([
  i(".dialog__overlay")
], SlDialog.prototype, "overlayElement", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDialog.prototype, "open", 2);
__decorateClass([
  e({ type: Boolean, reflect: true, attribute: "drag-head" })
], SlDialog.prototype, "dragHead", 2);
__decorateClass([
  e({ type: Boolean, reflect: true, attribute: "resize-able" })
], SlDialog.prototype, "resizeAble", 2);
__decorateClass([
  e({ type: String, reflect: true, attribute: "min-width" })
], SlDialog.prototype, "minWidth", 2);
__decorateClass([
  e({ type: String, reflect: true, attribute: "max-width" })
], SlDialog.prototype, "maxWidth", 2);
__decorateClass([
  e({ type: String, reflect: true, attribute: "min-height" })
], SlDialog.prototype, "minHeight", 2);
__decorateClass([
  e({ type: String, reflect: true, attribute: "max-height" })
], SlDialog.prototype, "maxHeight", 2);
__decorateClass([
  e({ type: Boolean, reflect: true, attribute: "mask" })
], SlDialog.prototype, "mask", 2);
__decorateClass([
  e({ type: Boolean, reflect: true, attribute: "mask-closeable" })
], SlDialog.prototype, "maskClosable", 2);
__decorateClass([
  e({ type: Boolean, reflect: true, attribute: "esc-closeable" })
], SlDialog.prototype, "escCloseable", 2);
__decorateClass([
  e({ reflect: true })
], SlDialog.prototype, "label", 2);
__decorateClass([
  e({ attribute: "no-header", type: Boolean, reflect: true })
], SlDialog.prototype, "noHeader", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDialog.prototype, "handleOpenChange", 1);
SlDialog = __decorateClass([
  n("sl-dialog")
], SlDialog);
setDefaultAnimation("dialog.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

export {
  SlDialog
};
