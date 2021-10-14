import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  focusVisibleSelector
} from "./chunk.Y5UMS2H6.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/breadcrumb-item/breadcrumb-item.ts
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

// src/components/breadcrumb-item/breadcrumb-item.styles.ts
import { css } from "lit";
var breadcrumb_item_styles_default = css`
  ${component_styles_default}

  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: rgb(var(--sl-color-neutral-600));
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: rgb(var(--sl-color-primary-600));
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: rgb(var(--sl-color-primary-500));
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: rgb(var(--sl-color-primary-600));
  }

  .breadcrumb-item__label${focusVisibleSelector} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-right: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
  }
`;

// src/components/breadcrumb-item/breadcrumb-item.ts
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
var breadcrumb_item_default = SlBreadcrumbItem;

export {
  breadcrumb_item_default
};
