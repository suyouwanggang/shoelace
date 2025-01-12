import {
  progress_ring_styles_default
} from "./chunk.QRQL6BLZ.js";
import {
  LocalizeController
} from "./chunk.CCTU25PV.js";
import {
  e,
  i,
  n,
  t
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/progress-ring/progress-ring.ts
var SlProgressRing = class extends s {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
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
    return $`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label || this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value / 100}"
      >
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
  i(".progress-ring__indicator")
], SlProgressRing.prototype, "indicator", 2);
__decorateClass([
  t()
], SlProgressRing.prototype, "indicatorOffset", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlProgressRing.prototype, "value", 2);
__decorateClass([
  e()
], SlProgressRing.prototype, "label", 2);
__decorateClass([
  e()
], SlProgressRing.prototype, "lang", 2);
SlProgressRing = __decorateClass([
  n("sl-progress-ring")
], SlProgressRing);

export {
  SlProgressRing
};
