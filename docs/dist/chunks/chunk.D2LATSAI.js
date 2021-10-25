import {
  progress_bar_styles_default
} from "./chunk.E5K2OVJR.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/progress-bar/progress-bar.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
var SlProgressBar = class extends LitElement {
  constructor() {
    super(...arguments);
    this.value = 0;
    this.indeterminate = false;
    this.label = "Progress";
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      "progress-bar": true,
      "progress-bar--indeterminate": this.indeterminate
    })}
        role="progressbar"
        title=${ifDefined(this.title)}
        aria-label=${ifDefined(this.label)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? 0 : this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${styleMap({ width: this.value + "%" })}>
          ${!this.indeterminate ? html`
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
  property({ type: Number, reflect: true })
], SlProgressBar.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlProgressBar.prototype, "indeterminate", 2);
__decorateClass([
  property()
], SlProgressBar.prototype, "label", 2);
SlProgressBar = __decorateClass([
  customElement("sl-progress-bar")
], SlProgressBar);

export {
  SlProgressBar
};
