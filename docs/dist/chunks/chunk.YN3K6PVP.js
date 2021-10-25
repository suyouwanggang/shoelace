import {
  row_styles_default
} from "./chunk.S2LJ3OQ7.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/row/row.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlRow = class extends LitElement {
  constructor() {
    super(...arguments);
    this.columns = 12;
    this.grap = "0";
  }
  changeSpanMethod() {
    let grapPx = isNaN(Number(this.grap)) ? this.grap : Number(this.grap) + "px";
    this.style.setProperty("--sl-row-columns", this.columns + "");
    this.style.setProperty("--sl-row-grap", grapPx);
  }
  render() {
    return html`<slot></slot>`;
  }
};
SlRow.styles = row_styles_default;
__decorateClass([
  property({ type: Number, attribute: "columns" })
], SlRow.prototype, "columns", 2);
__decorateClass([
  property({ type: String, attribute: "grap" })
], SlRow.prototype, "grap", 2);
__decorateClass([
  watchProps(["columns", "grap"])
], SlRow.prototype, "changeSpanMethod", 1);
SlRow = __decorateClass([
  customElement("sl-row")
], SlRow);

export {
  SlRow
};
