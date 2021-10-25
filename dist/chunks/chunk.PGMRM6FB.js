import {
  breadcrumb_item_styles_default
} from "./chunk.IERQDXWF.js";
import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/breadcrumb-item/breadcrumb-item.ts
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
var SlBreadcrumbItem = class extends LitElement {
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
    return html`
      <div
        part="base"
        class=${classMap({
      "breadcrumb-item": true,
      "breadcrumb-item--has-prefix": this.hasPrefix,
      "breadcrumb-item--has-suffix": this.hasSuffix
    })}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix" @slotchange=${this.handleSlotChange}></slot>
        </span>

        ${isLink ? html`
              <a part="label" class="breadcrumb-item__label breadcrumb-item__label--link" href="${this.href}" target="${this.target}" rel=${ifDefined(this.target ? this.rel : void 0)}>
                <slot></slot>
              </a>
            ` : html`
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
  state()
], SlBreadcrumbItem.prototype, "hasPrefix", 2);
__decorateClass([
  state()
], SlBreadcrumbItem.prototype, "hasSuffix", 2);
__decorateClass([
  property()
], SlBreadcrumbItem.prototype, "href", 2);
__decorateClass([
  property()
], SlBreadcrumbItem.prototype, "target", 2);
__decorateClass([
  property()
], SlBreadcrumbItem.prototype, "rel", 2);
SlBreadcrumbItem = __decorateClass([
  customElement("sl-breadcrumb-item")
], SlBreadcrumbItem);

export {
  SlBreadcrumbItem
};
