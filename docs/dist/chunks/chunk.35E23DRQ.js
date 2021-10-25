import {
  breadcrumb_item_styles_default
} from "./chunk.2WEZTU4H.js";
import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  l
} from "./chunk.4G2WRC2L.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
  e,
  n,
  t
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/breadcrumb-item/breadcrumb-item.ts
var SlBreadcrumbItem = class extends s {
  constructor() {
    super(...arguments);
    this.hasPrefix = false;
    this.hasSuffix = false;
    this.rel = "noreferrer noopener";
  }
  handleSlotChange() {
    this.hasPrefix = hasSlot(this, "prefix");
    this.hasSuffix = hasSlot(this, "suffix");
  }
  render() {
    const isLink = this.href ? true : false;
    return p`
      <div
        part="base"
        class=${o({
      "breadcrumb-item": true,
      "breadcrumb-item--has-prefix": this.hasPrefix,
      "breadcrumb-item--has-suffix": this.hasSuffix
    })}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix" @slotchange=${this.handleSlotChange}></slot>
        </span>

        ${isLink ? p`
              <a part="label" class="breadcrumb-item__label breadcrumb-item__label--link" href="${this.href}" target="${this.target}" rel=${l(this.target ? this.rel : void 0)}>
                <slot></slot>
              </a>
            ` : p`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot></slot>
              </button>
            `}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix" @slotchange=${this.handleSlotChange}></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `;
  }
};
SlBreadcrumbItem.styles = breadcrumb_item_styles_default;
__decorateClass([
  t()
], SlBreadcrumbItem.prototype, "hasPrefix", 2);
__decorateClass([
  t()
], SlBreadcrumbItem.prototype, "hasSuffix", 2);
__decorateClass([
  e()
], SlBreadcrumbItem.prototype, "href", 2);
__decorateClass([
  e()
], SlBreadcrumbItem.prototype, "target", 2);
__decorateClass([
  e()
], SlBreadcrumbItem.prototype, "rel", 2);
SlBreadcrumbItem = __decorateClass([
  n("sl-breadcrumb-item")
], SlBreadcrumbItem);

export {
  SlBreadcrumbItem
};
