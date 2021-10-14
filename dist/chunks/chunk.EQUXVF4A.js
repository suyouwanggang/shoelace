import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/row/row.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/components/row/row.styles.ts
import { css as css2 } from "lit";

// src/components/row/index.litcss
import { css } from "lit";
var styles = css`:host{display:grid;grid-template-columns:repeat(var(--sl-row-columns),1fr);grid-gap:var(--sl-row-grap,0)}`;
var row_default = styles;

// src/components/row/row.styles.ts
var row_styles_default = css2`
  ${component_styles_default}
  ${row_default}
`;

// src/components/row/row.ts
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
var row_default2 = SlRow;

export {
  row_default2 as row_default
};
