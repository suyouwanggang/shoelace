import {
  tooltip_styles_default
} from "./chunk.A5EUI6HR.js";
import {
  createPopper
} from "./chunk.MMVA6LRD.js";
import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.UTEQRIIY.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  animateTo,
  parseDuration,
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

// src/components/tooltip/tooltip.ts
var SlTooltip = class extends s {
  constructor() {
    super(...arguments);
    this.content = "";
    this.placement = "top";
    this.type = "default";
    this.disabled = false;
    this.distance = 10;
    this.open = false;
    this.skidding = 0;
    this.trigger = "hover focus";
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.updateComplete.then(() => {
      this.addEventListener("blur", this.handleBlur, true);
      this.addEventListener("focus", this.handleFocus, true);
      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("mouseover", this.handleMouseOver);
      this.addEventListener("mouseout", this.handleMouseOut);
      this.target = this.getTarget();
      this.syncOptions();
    });
  }
  firstUpdated() {
    this.tooltip.hidden = !this.open;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("blur", this.handleBlur, true);
    this.removeEventListener("focus", this.handleFocus, true);
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("mouseover", this.handleMouseOver);
    this.removeEventListener("mouseout", this.handleMouseOut);
    if (this.popover) {
      this.popover.destroy();
    }
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
  getTarget() {
    const target = [...this.children].find((el) => el.tagName.toLowerCase() !== "style" && el.getAttribute("slot") !== "content");
    if (!target) {
      throw new Error("Invalid tooltip target: no child element was found.");
    }
    return target;
  }
  handleBlur() {
    if (this.hasTrigger("focus")) {
      this.hide();
    }
  }
  handleClick() {
    if (this.hasTrigger("click")) {
      this.open ? this.hide() : this.show();
    }
  }
  handleFocus() {
    if (this.hasTrigger("focus")) {
      this.show();
    }
  }
  handleKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.hide();
    }
  }
  handleMouseOver() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => this.show(), delay);
    }
  }
  handleMouseOut() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => this.hide(), delay);
    }
  }
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }
    if (this.open) {
      emit(this, "sl-show");
      await stopAnimations(this.tooltip);
      if (this.popover) {
        this.popover.destroy();
      }
      this.popover = createPopper(this.target, this.positioner, {
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
      this.tooltip.hidden = false;
      const { keyframes, options } = getAnimation(this, "tooltip.show");
      await animateTo(this.tooltip, keyframes, options);
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      await stopAnimations(this.tooltip);
      const { keyframes, options } = getAnimation(this, "tooltip.hide");
      await animateTo(this.tooltip, keyframes, options);
      this.tooltip.hidden = true;
      if (this.popover) {
        this.popover.destroy();
      }
      emit(this, "sl-after-hide");
    }
  }
  handleOptionsChange() {
    this.syncOptions();
  }
  handleContentChange() {
    if (this.popover && this.open) {
      this.popover.update();
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  syncOptions() {
    if (this.popover) {
      this.popover.setOptions({
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
  }
  render() {
    return $`
      <div class="tooltip-content" aria-described-by="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${o({
      tooltip: true,
      "tooltip--open": this.open
    })}
          role="tooltip"
          aria-hidden=${this.open ? "false" : "true"}
        >
          <slot name="content"> ${this.content} </slot>
        </div>
      </div>
    `;
  }
};
SlTooltip.styles = tooltip_styles_default;
__decorateClass([
  i(".tooltip-positioner")
], SlTooltip.prototype, "positioner", 2);
__decorateClass([
  i(".tooltip")
], SlTooltip.prototype, "tooltip", 2);
__decorateClass([
  e()
], SlTooltip.prototype, "content", 2);
__decorateClass([
  e()
], SlTooltip.prototype, "placement", 2);
__decorateClass([
  e({ attribute: true, reflect: true })
], SlTooltip.prototype, "type", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTooltip.prototype, "disabled", 2);
__decorateClass([
  e({ type: Number })
], SlTooltip.prototype, "distance", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTooltip.prototype, "open", 2);
__decorateClass([
  e({ type: Number })
], SlTooltip.prototype, "skidding", 2);
__decorateClass([
  e()
], SlTooltip.prototype, "trigger", 2);
__decorateClass([
  e({ type: Boolean })
], SlTooltip.prototype, "hoist", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("placement"),
  watch("distance"),
  watch("skidding"),
  watch("hoist")
], SlTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch("content")
], SlTooltip.prototype, "handleContentChange", 1);
__decorateClass([
  watch("disabled")
], SlTooltip.prototype, "handleDisabledChange", 1);
SlTooltip = __decorateClass([
  n("sl-tooltip")
], SlTooltip);
setDefaultAnimation("tooltip.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 150, easing: "ease" }
});
setDefaultAnimation("tooltip.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 150, easing: "ease" }
});

export {
  SlTooltip
};
