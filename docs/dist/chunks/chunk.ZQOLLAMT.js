import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  card_styles_default
} from "./chunk.7SSFWG7Z.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/card/card.ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var SlCard = class extends LitElement {
  constructor() {
    super(...arguments);
    this.hasFooter = false;
    this.hasImage = false;
    this.hasHeader = false;
  }
  handleSlotChange() {
    this.hasFooter = hasSlot(this, "footer");
    this.hasImage = hasSlot(this, "image");
    this.hasHeader = hasSlot(this, "header");
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      card: true,
      "card--has-footer": this.hasFooter,
      "card--has-image": this.hasImage,
      "card--has-header": this.hasHeader
    })}
      >
        <div part="image" class="card__image">
          <slot name="image" @slotchange=${this.handleSlotChange}></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header" @slotchange=${this.handleSlotChange}></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
};
SlCard.styles = card_styles_default;
__decorateClass([
  state()
], SlCard.prototype, "hasFooter", 2);
__decorateClass([
  state()
], SlCard.prototype, "hasImage", 2);
__decorateClass([
  state()
], SlCard.prototype, "hasHeader", 2);
SlCard = __decorateClass([
  customElement("sl-card")
], SlCard);

export {
  SlCard
};
