import {
  progress_ring_styles_default
} from "./chunk.MHQQHKVZ.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/progress-ring/progress-ring.ts
import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
var SlProgressRing = class extends LitElement {
  constructor() {
    super(...arguments);
    this.value = 0;
    this.label = "Progress";
  }
  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("percentage")) {
      const radius = parseFloat(getComputedStyle(this.indicator).getPropertyValue("r"));
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - this.value / 100 * circumference;
      this.indicatorOffset = String(offset) + "px";
    }
  }
  render() {
    return html`
      <div part="base" class="progress-ring" role="progressbar" aria-label=${ifDefined(this.label)} aria-valuemin="0" aria-valuemax="100" aria-valuenow="${this.value}" style="--percentage: ${this.value / 100}">
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <span part="label" class="progress-ring__label">
          <slot></slot>
        </span>
      </div>
    `;
  }
};
SlProgressRing.styles = progress_ring_styles_default;
__decorateClass([
  query(".progress-ring__indicator")
], SlProgressRing.prototype, "indicator", 2);
__decorateClass([
  state()
], SlProgressRing.prototype, "indicatorOffset", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], SlProgressRing.prototype, "value", 2);
__decorateClass([
  property()
], SlProgressRing.prototype, "label", 2);
SlProgressRing = __decorateClass([
  customElement("sl-progress-ring")
], SlProgressRing);

export {
  SlProgressRing
};
