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

// src/components/layout/index.litcss
var styles = r`:host{display:flex !important;flex-direction:row}:host([row]){flex-direction:row}:host([column]){flex-direction:column}:host([expand]){flex:1}:host([center]){justify-content:center;align-items:center}`;
var layout_default = styles;

// src/components/layout/layout.styles.ts
var layout_styles_default = r`
  ${component_styles_default}
  ${layout_default}
`;

// src/components/layout/layout.ts
var SlLayout = class extends n {
  constructor() {
    super(...arguments);
    this.row = true;
    this.column = false;
    this.center = false;
    this.expand = false;
  }
  setXYChange() {
    let x;
    switch (this.main) {
      case "start":
        x = "flex-start";
        break;
      case "end":
        x = "flex-end";
        break;
      default:
        x = this.main;
        break;
    }
    if (x) {
      this.style.justifyContent = x;
    } else {
      this.style.justifyContent = "flex-start";
    }
    let y2;
    switch (this.cross) {
      case "start":
        y2 = "flex-start";
        break;
      case "end":
        y2 = "flex-end";
        break;
      default:
        y2 = this.cross;
        break;
    }
    if (y2) {
      this.style.alignItems = y2;
    } else {
      this.style.alignItems = "stretch";
    }
  }
  render() {
    return y`<slot></slot> `;
  }
};
SlLayout.styles = layout_styles_default;
__decorateClass([
  e({ type: Boolean, attribute: "row" })
], SlLayout.prototype, "row", 2);
__decorateClass([
  e({ type: Boolean, attribute: "column" })
], SlLayout.prototype, "column", 2);
__decorateClass([
  e({ type: Boolean, attribute: "center" })
], SlLayout.prototype, "center", 2);
__decorateClass([
  e({ type: Boolean, attribute: "expand" })
], SlLayout.prototype, "expand", 2);
__decorateClass([
  e({ type: String, attribute: "main" })
], SlLayout.prototype, "main", 2);
__decorateClass([
  e({ type: String, attribute: "cross" })
], SlLayout.prototype, "cross", 2);
__decorateClass([
  watchProps(["main", "cross"])
], SlLayout.prototype, "setXYChange", 1);
SlLayout = __decorateClass([
  n2("sl-layout")
], SlLayout);
var layout_default2 = SlLayout;

export {
  layout_default2 as layout_default
};
