import {
  progress_bar_styles_default
} from "./chunk.3UCEWXAR.js";
import {
  LocalizeController
} from "./chunk.CCTU25PV.js";
import {
  i
} from "./chunk.H55UERJW.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  l
} from "./chunk.JVCXZKVY.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/progress-bar/progress-bar.ts
var SlProgressBar = class extends s {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.indeterminate = false;
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      "progress-bar": true,
      "progress-bar--indeterminate": this.indeterminate
    })}
        role="progressbar"
        title=${l(this.title)}
        aria-label=${this.label || this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? 0 : this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${i({ width: this.value + "%" })}>
          ${!this.indeterminate ? $`
                <span part="label" class="progress-bar__label">
                  <slot></slot>
                </span>
              ` : ""}
        </div>
      </div>
    `;
  }
};
SlProgressBar.styles = progress_bar_styles_default;
__decorateClass([
  e({ type: Number, reflect: true })
], SlProgressBar.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlProgressBar.prototype, "indeterminate", 2);
__decorateClass([
  e()
], SlProgressBar.prototype, "label", 2);
__decorateClass([
  e()
], SlProgressBar.prototype, "lang", 2);
SlProgressBar = __decorateClass([
  n("sl-progress-bar")
], SlProgressBar);

export {
  SlProgressBar
};
