import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.EVK2ASE6.js";
import {
  focusVisibleSelector
} from "./chunk.Y5UMS2H6.js";
import {
  animateTo,
  shimKeyframesHeightAuto,
  stopAnimations
} from "./chunk.LWC4BV5U.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit,
  waitForEvent
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/details/details.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

// src/components/details/details.styles.ts
import { css } from "lit";
var details_styles_default = css`
  ${component_styles_default}

  :host {
    display: block;
  }

  .details {
    border: solid 1px rgb(var(--sl-color-neutral-200));
    border-radius: var(--sl-border-radius-medium);
    background-color: rgb(var(--sl-color-neutral-0));
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    cursor: pointer;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header${focusVisibleSelector} {
    box-shadow: var(--sl-focus-ring);
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header${focusVisibleSelector} {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) transform ease;
  }

  .details--open .details__summary-icon {
    transform: rotate(90deg);
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    padding: var(--sl-spacing-medium);
  }
`;

// src/components/details/details.ts
var id = 0;
var SlDetails = class extends LitElement {
  constructor() {
    super(...arguments);
    this.componentId = `details-${++id}`;
    this.open = false;
    this.disabled = false;
  }
  firstUpdated() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? "auto" : "0";
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  handleSummaryClick() {
    if (!this.disabled) {
      this.open ? this.hide() : this.show();
      this.header.focus();
    }
  }
  handleSummaryKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.open ? this.hide() : this.show();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "sl-show");
      await stopAnimations(this);
      this.body.hidden = false;
      const { keyframes, options } = getAnimation(this, "details.show");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = "auto";
      emit(this, "sl-after-show");
    } else {
      emit(this, "sl-hide");
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "details.hide");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = "auto";
      emit(this, "sl-after-hide");
    }
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      details: true,
      "details--open": this.open,
      "details--disabled": this.disabled
    })}
      >
        <header
          part="header"
          id=${`${this.componentId}-header`}
          class="details__header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls=${`${this.componentId}-content`}
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" library="system"></sl-icon>
          </span>
        </header>

        <div class="details__body">
          <div part="content" id=${`${this.componentId}-content`} class="details__content" role="region" aria-labelledby=${`${this.componentId}-header`}>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlDetails.styles = details_styles_default;
__decorateClass([
  query(".details")
], SlDetails.prototype, "details", 2);
__decorateClass([
  query(".details__header")
], SlDetails.prototype, "header", 2);
__decorateClass([
  query(".details__body")
], SlDetails.prototype, "body", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlDetails.prototype, "open", 2);
__decorateClass([
  property()
], SlDetails.prototype, "summary", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlDetails.prototype, "disabled", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDetails.prototype, "handleOpenChange", 1);
SlDetails = __decorateClass([
  customElement("sl-details")
], SlDetails);
var details_default = SlDetails;
setDefaultAnimation("details.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 250, easing: "linear" }
});
setDefaultAnimation("details.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 250, easing: "linear" }
});

export {
  details_default
};
