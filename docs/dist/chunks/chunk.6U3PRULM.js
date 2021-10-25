import {
  divider_styles_default
} from "./chunk.5W3JPGCN.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/divider/divider.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlDivider = class extends LitElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  firstUpdated() {
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
  render() {
    return html` <div part="base" class="menu-divider"></div> `;
  }
};
SlDivider.styles = divider_styles_default;
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);
SlDivider = __decorateClass([
  customElement("sl-divider")
], SlDivider);

export {
  SlDivider
};
