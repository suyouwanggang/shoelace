import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/card/card.ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

// src/components/card/card.styles.ts
import { css } from "lit";
var card_styles_default = css`
  ${component_styles_default}

  :host {
    --border-color: rgb(var(--sl-color-neutral-200));
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--sl-surface-base-alt));
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image ::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card__body {
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;

// src/components/card/card.ts
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
var card_default = SlCard;

export {
  card_default
};
