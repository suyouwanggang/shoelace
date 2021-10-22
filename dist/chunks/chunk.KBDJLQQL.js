import {
  spinner_styles_default
} from "./chunk.LEJATYC3.js";
import {
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/spinner/spinner.ts
var SlSpinner = class extends s {
  render() {
    return p`
      <svg part="base" class="spinner" aria-busy="true" aria-live="polite">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass([
  n("sl-spinner")
], SlSpinner);

export {
  SlSpinner
};
