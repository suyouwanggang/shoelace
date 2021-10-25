import {
  menu_item_styles_default
} from "./chunk.DOAVZRT7.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/menu-item/menu-item.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var SlMenuItem = class extends LitElement {
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
    return html`
      <sl-ripple class="ripple-wrap" ?disabled=${this.disabled}>
        <div
          part="base"
          class=${classMap({
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
  query(".menu-item")
], SlMenuItem.prototype, "menuItem", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "checked", 2);
__decorateClass([
  property()
], SlMenuItem.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "highlight", 2);
__decorateClass([
  watchProps(["checked", "disabled"])
], SlMenuItem.prototype, "handleCheckedChange", 1);
SlMenuItem = __decorateClass([
  customElement("sl-menu-item")
], SlMenuItem);

export {
  SlMenuItem
};
