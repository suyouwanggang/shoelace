import {
  spinner_styles_default
} from "./chunk.5KWGFLAR.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/spinner/spinner.ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
var SlSpinner = class extends LitElement {
  render() {
    return html`
      <svg part="base" class="spinner" aria-busy="true" aria-live="polite">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass([
  customElement("sl-spinner")
], SlSpinner);

export {
  SlSpinner
};
