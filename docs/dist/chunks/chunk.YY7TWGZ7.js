import {
  createPopper
} from "./chunk.MMVA6LRD.js";
import {
  dropdown_styles_default
} from "./chunk.SSWMIOC7.js";
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
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit,
  waitForEvent
} from "./chunk.YJDN6H4X.js";
import {
  e,
  i,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/dropdown/share-dropdown.ts
var SlShareDropdown = class extends s {
  constructor() {
    super(...arguments);
    this.open = false;
    this.placement = "bottom-start";
    this.disabled = false;
    this.stayOpenOnSelect = false;
    this.distance = 0;
    this.skidding = 0;
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    if (!this.containingElement) {
      this.containingElement = this;
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.hide();
    this.popover ? this.popover.destroy() : null;
  }
  handleDocumentKeyDown(event) {
    if (event.key === "Escape") {
      this.hide();
      return;
    }
  }
  handleDocumentMouseDown(event) {
    const path = event.composedPath();
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
    }
  }
  firstUpdated(changedProps) {
    this.panel.hidden = !this.open;
    super.firstUpdated(changedProps);
  }
  preparedPopover() {
    if (this.popover) {
      this.popover.destroy();
      this.popover = null;
    }
    this.popover = createPopper(this.trigger, this.positioner, {
      placement: this.placement,
      strategy: this.hoist ? "fixed" : "absolute",
      modifiers: [
        {
          name: "flip",
          options: {
            boundary: "viewport"
          }
        },
        {
          name: "offset",
          options: {
            offset: [this.skidding, this.distance]
          }
        }
      ]
    });
  }
  async show(trigger) {
    this.trigger = trigger;
    this.preparedPopover();
    this.updateComplete.then(() => {
      if (this.open) {
      }
      this.open = true;
      return waitForEvent(this, "sl-after-show");
    });
  }
  async hide() {
    var _a;
    if (!this.open) {
      return;
    }
    (_a = this.popover) == null ? void 0 : _a.destroy();
    this.popover = null;
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  reposition() {
    if (!this.open) {
      return;
    }
    this.popover.update();
  }
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }
    if (this.open) {
      emit(this, "sl-show");
      document.addEventListener("keydown", this.handleDocumentKeyDown);
      document.addEventListener("mousedown", this.handleDocumentMouseDown);
      await stopAnimations(this);
      this.popover.update();
      this.panel.hidden = false;
      const { keyframes, options } = getAnimation(this, "dropdown.show");
      await animateTo(this.panel, keyframes, options);
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      document.removeEventListener("mousedown", this.handleDocumentMouseDown);
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "dropdown.hide");
      await animateTo(this.panel, keyframes, options);
      this.panel.hidden = true;
      emit(this, "sl-after-hide");
    }
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      dropdown: true,
      "dropdown--open": this.open
    })}
      >
        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div part="panel" class="dropdown__panel" role="menu" aria-hidden=${this.open ? "false" : "true"} >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlShareDropdown.styles = dropdown_styles_default;
__decorateClass([
  e({ type: Object })
], SlShareDropdown.prototype, "trigger", 2);
__decorateClass([
  i(".dropdown__panel")
], SlShareDropdown.prototype, "panel", 2);
__decorateClass([
  i(".dropdown__positioner")
], SlShareDropdown.prototype, "positioner", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlShareDropdown.prototype, "open", 2);
__decorateClass([
  e()
], SlShareDropdown.prototype, "placement", 2);
__decorateClass([
  e({ type: Boolean })
], SlShareDropdown.prototype, "disabled", 2);
__decorateClass([
  e({ attribute: "stay-open-on-select", type: Boolean, reflect: true })
], SlShareDropdown.prototype, "stayOpenOnSelect", 2);
__decorateClass([
  e({ attribute: false })
], SlShareDropdown.prototype, "containingElement", 2);
__decorateClass([
  e({ type: Number })
], SlShareDropdown.prototype, "distance", 2);
__decorateClass([
  e({ type: Number })
], SlShareDropdown.prototype, "skidding", 2);
__decorateClass([
  e({ type: Boolean })
], SlShareDropdown.prototype, "hoist", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlShareDropdown.prototype, "handleOpenChange", 1);
SlShareDropdown = __decorateClass([
  n("sl-share-dropdown")
], SlShareDropdown);
setDefaultAnimation("dropdown.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.9)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 100, easing: "ease" }
});
setDefaultAnimation("dropdown.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.9)" }
  ],
  options: { duration: 100, easing: "ease" }
});

export {
  SlShareDropdown
};
