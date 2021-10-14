import {
  clamp
} from "./chunk.T56CG5BM.js";
import {
  focusVisibleSelector
} from "./chunk.Y5UMS2H6.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/rating/rating.ts
import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

// src/components/rating/rating.styles.ts
import { css } from "lit";
var rating_styles_default = css`
  ${component_styles_default}

  :host {
    --symbol-color: rgb(var(--sl-color-neutral-300));
    --symbol-color-active: #ffbe00;
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating${focusVisibleSelector} {
    box-shadow: var(--sl-focus-ring);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbols--indicator {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--symbol-color-active);
    pointer-events: none;
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) transform;
  }

  .rating__symbol--hover {
    transform: scale(1.2);
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover .rating--readonly .rating__symbol--hover {
    transform: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }
`;

// src/components/rating/rating.ts
var SlRating = class extends LitElement {
  constructor() {
    super(...arguments);
    this.hoverValue = 0;
    this.isHovering = false;
    this.value = 0;
    this.max = 5;
    this.precision = 1;
    this.readonly = false;
    this.disabled = false;
    this.getSymbol = (value) => '<sl-icon name="star-fill" library="system"></sl-icon>';
  }
  focus(options) {
    this.rating.focus(options);
  }
  blur() {
    this.rating.blur();
  }
  getValueFromMousePosition(event) {
    return this.getValueFromXCoordinate(event.clientX);
  }
  getValueFromTouchPosition(event) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }
  getValueFromXCoordinate(coordinate) {
    const containerLeft = this.rating.getBoundingClientRect().left;
    const containerWidth = this.rating.getBoundingClientRect().width;
    return clamp(this.roundToPrecision((coordinate - containerLeft) / containerWidth * this.max, this.precision), 0, this.max);
  }
  handleClick(event) {
    this.setValue(this.getValueFromMousePosition(event));
  }
  setValue(newValue) {
    if (this.disabled || this.readonly) {
      return;
    }
    this.value = newValue === this.value ? 0 : newValue;
    this.isHovering = false;
  }
  handleKeyDown(event) {
    if (this.disabled || this.readonly) {
      return;
    }
    if (event.key === "ArrowLeft") {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }
    if (event.key === "ArrowRight") {
      const increment = event.shiftKey ? 1 : this.precision;
      this.value = Math.min(this.max, this.value + increment);
      event.preventDefault();
    }
    if (event.key === "Home") {
      this.value = 0;
      event.preventDefault();
    }
    if (event.key === "End") {
      this.value = this.max;
      event.preventDefault();
    }
  }
  handleMouseEnter() {
    this.isHovering = true;
  }
  handleMouseMove(event) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }
  handleMouseLeave() {
    this.isHovering = false;
  }
  handleTouchStart(event) {
    this.hoverValue = this.getValueFromTouchPosition(event);
    event.preventDefault();
  }
  handleTouchMove(event) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromTouchPosition(event);
  }
  handleTouchEnd(event) {
    this.isHovering = false;
    this.setValue(this.hoverValue);
    event.preventDefault();
  }
  handleValueChange() {
    emit(this, "sl-change");
  }
  roundToPrecision(numberToRound, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }
  render() {
    const counter = Array.from(Array(this.max).keys());
    let displayValue = 0;
    if (this.disabled || this.readonly) {
      displayValue = this.value;
    } else {
      displayValue = this.isHovering ? this.hoverValue : this.value;
    }
    return html`
      <div
        part="base"
        class=${classMap({
      rating: true,
      "rating--readonly": this.readonly,
      "rating--disabled": this.disabled
    })}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-readonly=${this.readonly ? "true" : "false"}
        aria-value=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${counter.map((index) => {
      return html`
              <span
                class=${classMap({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${unsafeHTML(this.getSymbol(index + 1))}
              </span>
            `;
    })}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${counter.map((index) => {
      return html`
              <span
                class=${classMap({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                style=${styleMap({
        clipPath: displayValue > index + 1 ? "none" : `inset(0 ${100 - (displayValue - index) / 1 * 100}% 0 0)`
      })}
                role="presentation"
              >
                ${unsafeHTML(this.getSymbol(index + 1))}
              </span>
            `;
    })}
        </span>
      </div>
    `;
  }
};
SlRating.styles = rating_styles_default;
__decorateClass([
  query(".rating")
], SlRating.prototype, "rating", 2);
__decorateClass([
  state()
], SlRating.prototype, "hoverValue", 2);
__decorateClass([
  state()
], SlRating.prototype, "isHovering", 2);
__decorateClass([
  property({ type: Number })
], SlRating.prototype, "value", 2);
__decorateClass([
  property({ type: Number })
], SlRating.prototype, "max", 2);
__decorateClass([
  property({ type: Number })
], SlRating.prototype, "precision", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlRating.prototype, "readonly", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlRating.prototype, "disabled", 2);
__decorateClass([
  property()
], SlRating.prototype, "getSymbol", 2);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlRating.prototype, "handleValueChange", 1);
SlRating = __decorateClass([
  customElement("sl-rating")
], SlRating);
var rating_default = SlRating;

export {
  rating_default
};
