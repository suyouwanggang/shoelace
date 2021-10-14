import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/row/col.ts
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlCol = class extends LitElement {
  constructor() {
    super(...arguments);
    this.span = 1;
    this.row = 1;
  }
  changeSpanMethod() {
    this.style.setProperty("--sl-col-span", this.span + "");
    this.style.setProperty("--sl-col-row", this.row + "");
  }
  render() {
    return html`<slot></slot>`;
  }
};
SlCol.styles = css`
    :host {
      grid-column: span var(--sl-col-span, 1);
      grid-row: span var(--sl-col-row, 1);
    }
  `;
__decorateClass([
  property({ type: Number, reflect: true, attribute: "span" })
], SlCol.prototype, "span", 2);
__decorateClass([
  property({ type: Number, reflect: true, attribute: "row" })
], SlCol.prototype, "row", 2);
__decorateClass([
  watchProps(["span", "row"])
], SlCol.prototype, "changeSpanMethod", 1);
SlCol = __decorateClass([
  customElement("sl-col")
], SlCol);
var col_default = SlCol;

export {
  col_default
};
