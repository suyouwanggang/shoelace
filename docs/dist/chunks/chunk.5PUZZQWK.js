import {
  HasSlotController
} from "./chunk.RBDNGYR3.js";
import {
  card_styles_default
} from "./chunk.7MTSRPVJ.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/card/card.ts
var SlCard = class extends s {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer", "header", "image");
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      card: true,
      "card--has-footer": this.hasSlotController.test("footer"),
      "card--has-image": this.hasSlotController.test("image"),
      "card--has-header": this.hasSlotController.test("header")
    })}
      >
        <div part="image" class="card__image">
          <slot name="image"></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header"></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
};
SlCard.styles = card_styles_default;
SlCard = __decorateClass([
  n("sl-card")
], SlCard);

export {
  SlCard
};
