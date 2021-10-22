import {
  row_styles_default
} from "./chunk.Y33BBFFW.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  e,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/row/row.ts
var SlRow = class extends s {
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
    return p`<slot></slot>`;
  }
};
SlRow.styles = row_styles_default;
__decorateClass([
  e({ type: Number, attribute: "columns" })
], SlRow.prototype, "columns", 2);
__decorateClass([
  e({ type: String, attribute: "grap" })
], SlRow.prototype, "grap", 2);
__decorateClass([
  watchProps(["columns", "grap"])
], SlRow.prototype, "changeSpanMethod", 1);
SlRow = __decorateClass([
  n("sl-row")
], SlRow);

export {
  SlRow
};
