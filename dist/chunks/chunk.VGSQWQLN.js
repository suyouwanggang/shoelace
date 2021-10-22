import {
  layout_styles_default
} from "./chunk.7Z556U7Z.js";
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

// src/components/layout/layout.ts
var SlLayout = class extends s {
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
    let y;
    switch (this.cross) {
      case "start":
        y = "flex-start";
        break;
      case "end":
        y = "flex-end";
        break;
      default:
        y = this.cross;
        break;
    }
    if (y) {
      this.style.alignItems = y;
    } else {
      this.style.alignItems = "stretch";
    }
  }
  render() {
    return p`<slot></slot> `;
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
  n("sl-layout")
], SlLayout);

export {
  SlLayout
};
