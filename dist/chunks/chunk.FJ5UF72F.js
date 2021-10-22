import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  card_styles_default
} from "./chunk.VDXBOYUB.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
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

// src/components/card/card.ts
var SlCard = class extends s {
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
    return p`
      <div
        part="base"
        class=${o({
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
  t()
], SlCard.prototype, "hasFooter", 2);
__decorateClass([
  t()
], SlCard.prototype, "hasImage", 2);
__decorateClass([
  t()
], SlCard.prototype, "hasHeader", 2);
SlCard = __decorateClass([
  n("sl-card")
], SlCard);

export {
  SlCard
};
