import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  e,
  n as n2
} from "./chunk.OPP7P5NL.js";
import {
  n,
  r,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/row/col.ts
var SlCol = class extends n {
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
    return y`<slot></slot>`;
  }
};
SlCol.styles = r`
    :host {
      grid-column: span var(--sl-col-span, 1);
      grid-row: span var(--sl-col-row, 1);
    }
  `;
__decorateClass([
  e({ type: Number, reflect: true, attribute: "span" })
], SlCol.prototype, "span", 2);
__decorateClass([
  e({ type: Number, reflect: true, attribute: "row" })
], SlCol.prototype, "row", 2);
__decorateClass([
  watchProps(["span", "row"])
], SlCol.prototype, "changeSpanMethod", 1);
SlCol = __decorateClass([
  n2("sl-col")
], SlCol);
var col_default = SlCol;

export {
  col_default
};
