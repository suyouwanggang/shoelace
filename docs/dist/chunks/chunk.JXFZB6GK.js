import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
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

// src/components/row/index.litcss
var styles = r`:host{display:grid;grid-template-columns:repeat(var(--sl-row-columns),1fr);grid-gap:var(--sl-row-grap,0)}`;
var row_default = styles;

// src/components/row/row.styles.ts
var row_styles_default = r`
  ${component_styles_default}
  ${row_default}
`;

// src/components/row/row.ts
var SlRow = class extends n {
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
    return y`<slot></slot>`;
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
  n2("sl-row")
], SlRow);
var row_default2 = SlRow;

export {
  row_default2 as row_default
};
