import {
  menu_item_styles_default
} from "./chunk.EXYC4SWX.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
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

// src/components/menu-item/menu-item.ts
var SlMenuItem = class extends s {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.value = "";
    this.disabled = false;
    this.disableRipple = false;
    this.highlight = false;
  }
  firstUpdated() {
    this.setAttribute("role", "menuitem");
    this.requestUpdate();
  }
  handleCheckedChange() {
    this.setAttribute("aria-checked", String(this.checked));
    this.setAttribute("aria-disabled", String(this.disabled));
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      "menu-item": true,
      "menu-item--checked": this.checked,
      "menu-item--highlight": this.highlight,
      "menu-item--disabled": this.disabled
    })}
      >
        <sl-icon
          part="checked-icon"
          class="menu-item__check"
          name="check"
          library="system"
          aria-hidden="true"
        ></sl-icon>

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
], SlMenuItem.prototype, "disableRipple", 2);
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
