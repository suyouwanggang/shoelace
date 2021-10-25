import {
  menu_item_styles_default
} from "./chunk.7ZH6AE6M.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
  e,
  i,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/menu-item/menu-item.ts
var SlMenuItem = class extends s {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.value = "";
    this.disabled = false;
    this.highlight = false;
  }
  firstUpdated() {
    this.setAttribute("role", "menuitem");
  }
  handleCheckedChange() {
    this.setAttribute("aria-checked", String(this.checked));
    this.setAttribute("aria-disabled", String(this.disabled));
  }
  render() {
    return p`
      <sl-ripple class="ripple-wrap" ?disabled=${this.disabled}>
        <div
          part="base"
          class=${o({
      "menu-item": true,
      "menu-item--checked": this.checked,
      "menu-item--highlight": this.highlight,
      "menu-item--disabled": this.disabled
    })}
        >
          <span part="checked-icon" class="menu-item__check">
            <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
          </span>

          <span part="prefix" class="menu-item__prefix">
            <slot name="prefix"></slot>
          </span>

          <span part="label" class="menu-item__label">
            <slot></slot>
          </span>

          <span part="suffix" class="menu-item__suffix">
            <slot name="suffix"></slot>
          </span>
        </div>
      </sl-ripple>
    `;
  }
};
SlMenuItem.styles = menu_item_styles_default;
__decorateClass([
  i(".menu-item")
], SlMenuItem.prototype, "menuItem", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "checked", 2);
__decorateClass([
  e()
], SlMenuItem.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "highlight", 2);
__decorateClass([
  watchProps(["checked", "disabled"])
], SlMenuItem.prototype, "handleCheckedChange", 1);
SlMenuItem = __decorateClass([
  n("sl-menu-item")
], SlMenuItem);

export {
  SlMenuItem
};
