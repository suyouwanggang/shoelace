import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  r,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/row/col.ts
var SlCol = class extends s {
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
    return $`<slot></slot>`;
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
  n("sl-col")
], SlCol);

export {
  SlCol
};
