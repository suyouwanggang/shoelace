import {
  createPopper
} from "./chunk.MMVA6LRD.js";
import {
  dropdown_styles_default
} from "./chunk.SSWMIOC7.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  getTabbableBoundary
} from "./chunk.DTSUHNT6.js";
import {
  scrollIntoView
} from "./chunk.ST4GEPNZ.js";
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

// src/components/dropdown/dropdown.ts
var SlDropdown = class extends s {
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
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    if (!this.containingElement) {
      this.containingElement = this;
    }
    this.updateComplete.then(() => {
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
    });
  }
  firstUpdated() {
    this.panel.hidden = !this.open;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.hide();
    if (this.popover) {
      this.popover.destroy();
    }
  }
  focusOnTrigger() {
    const slot = this.trigger.querySelector("slot");
    const trigger = slot.assignedElements({ flatten: true })[0];
    if (trigger && typeof trigger.focus === "function") {
      trigger.focus();
    }
  }
  getMenu() {
    const slot = this.panel.querySelector("slot");
    return slot.assignedElements({ flatten: true }).filter((el) => el.tagName.toLowerCase() === "sl-menu")[0];
  }
  handleDocumentKeyDown(event) {
    var _a;
    if (event.key === "Escape") {
      this.hide();
      this.focusOnTrigger();
      return;
    }
    if (event.key === "Tab") {
      if (this.open && ((_a = document.activeElement) == null ? void 0 : _a.tagName.toLowerCase()) === "sl-menu-item") {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }
      setTimeout(() => {
        var _a2, _b;
        const activeElement = this.containingElement.getRootNode() instanceof ShadowRoot ? (_b = (_a2 = document.activeElement) == null ? void 0 : _a2.shadowRoot) == null ? void 0 : _b.activeElement : document.activeElement;
        if ((activeElement == null ? void 0 : activeElement.closest(this.containingElement.tagName.toLowerCase())) !== this.containingElement) {
          this.hide();
          return;
        }
      });
    }
  }
  handleDocumentMouseDown(event) {
    const path = event.composedPath();
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
    }
  }
  handleMenuItemActivate(event) {
    const item = event.target;
    scrollIntoView(item, this.panel);
  }
  handlePanelSelect(event) {
    const target = event.target;
    if (!this.stayOpenOnSelect && target.tagName.toLowerCase() === "sl-menu") {
      this.hide();
      this.focusOnTrigger();
    }
  }
  handlePopoverOptionsChange() {
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
  handleTriggerClick() {
    this.open ? this.hide() : this.show();
  }
  handleTriggerKeyDown(event) {
    const menu = this.getMenu();
    const menuItems = menu ? [...menu.querySelectorAll("sl-menu-item")] : [];
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];
    if (event.key === "Escape") {
      this.focusOnTrigger();
      this.hide();
      return;
    }
    if ([" ", "Enter"].includes(event.key)) {
      event.preventDefault();
      this.open ? this.hide() : this.show();
      return;
    }
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (!this.open) {
        this.show();
      }
      if (event.key === "ArrowDown" && firstMenuItem) {
        const menu2 = this.getMenu();
        menu2.setCurrentItem(firstMenuItem);
        firstMenuItem.focus();
        return;
      }
      if (event.key === "ArrowUp" && lastMenuItem) {
        menu.setCurrentItem(lastMenuItem);
        lastMenuItem.focus();
        return;
      }
    }
    const ignoredKeys = ["Tab", "Shift", "Meta", "Ctrl", "Alt"];
    if (this.open && menu && !ignoredKeys.includes(event.key)) {
      menu.typeToSelect(event.key);
      return;
    }
  }
  handleTriggerKeyUp(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }
  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }
  updateAccessibleTrigger() {
    if (this.trigger) {
      const slot = this.trigger.querySelector("slot");
      const assignedElements = slot.assignedElements({ flatten: true });
      const accessibleTrigger = assignedElements.find((el) => getTabbableBoundary(el).start);
      if (accessibleTrigger) {
        accessibleTrigger.setAttribute("aria-haspopup", "true");
        accessibleTrigger.setAttribute("aria-expanded", this.open ? "true" : "false");
      }
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
    this.updateAccessibleTrigger();
    if (this.open) {
      emit(this, "sl-show");
      this.panel.addEventListener("sl-activate", this.handleMenuItemActivate);
      this.panel.addEventListener("sl-select", this.handlePanelSelect);
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
      this.panel.removeEventListener("sl-activate", this.handleMenuItemActivate);
      this.panel.removeEventListener("sl-select", this.handlePanelSelect);
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
        id="dropdown"
        class=${o({
      dropdown: true,
      "dropdown--open": this.open
    })}
      >
        <span part="trigger" class="dropdown__trigger" @click=${this.handleTriggerClick} @keydown=${this.handleTriggerKeyDown} @keyup=${this.handleTriggerKeyUp}>
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div part="panel" class="dropdown__panel" aria-hidden=${this.open ? "false" : "true"} aria-labelledby="dropdown">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlDropdown.styles = dropdown_styles_default;
__decorateClass([
  i(".dropdown__trigger")
], SlDropdown.prototype, "trigger", 2);
__decorateClass([
  i(".dropdown__panel")
], SlDropdown.prototype, "panel", 2);
__decorateClass([
  i(".dropdown__positioner")
], SlDropdown.prototype, "positioner", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDropdown.prototype, "open", 2);
__decorateClass([
  e()
], SlDropdown.prototype, "placement", 2);
__decorateClass([
  e({ type: Boolean })
], SlDropdown.prototype, "disabled", 2);
__decorateClass([
  e({ attribute: "stay-open-on-select", type: Boolean, reflect: true })
], SlDropdown.prototype, "stayOpenOnSelect", 2);
__decorateClass([
  e({ attribute: false })
], SlDropdown.prototype, "containingElement", 2);
__decorateClass([
  e({ type: Number })
], SlDropdown.prototype, "distance", 2);
__decorateClass([
  e({ type: Number })
], SlDropdown.prototype, "skidding", 2);
__decorateClass([
  e({ type: Boolean })
], SlDropdown.prototype, "hoist", 2);
__decorateClass([
  watchProps(["distance", "hoist", "placement", "skidding"])
], SlDropdown.prototype, "handlePopoverOptionsChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDropdown.prototype, "handleOpenChange", 1);
SlDropdown = __decorateClass([
  n("sl-dropdown")
], SlDropdown);
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
  SlDropdown
};
