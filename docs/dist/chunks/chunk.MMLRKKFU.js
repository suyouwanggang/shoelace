import {
  layout_styles_default
} from "./chunk.QTJ5AS3C.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/layout/layout.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlLayout = class extends LitElement {
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
    return html`<slot></slot> `;
  }
};
SlLayout.styles = layout_styles_default;
__decorateClass([
  property({ type: Boolean, attribute: "row" })
], SlLayout.prototype, "row", 2);
__decorateClass([
  property({ type: Boolean, attribute: "column" })
], SlLayout.prototype, "column", 2);
__decorateClass([
  property({ type: Boolean, attribute: "center" })
], SlLayout.prototype, "center", 2);
__decorateClass([
  property({ type: Boolean, attribute: "expand" })
], SlLayout.prototype, "expand", 2);
__decorateClass([
  property({ type: String, attribute: "main" })
], SlLayout.prototype, "main", 2);
__decorateClass([
  property({ type: String, attribute: "cross" })
], SlLayout.prototype, "cross", 2);
__decorateClass([
  watchProps(["main", "cross"])
], SlLayout.prototype, "setXYChange", 1);
SlLayout = __decorateClass([
  customElement("sl-layout")
], SlLayout);

export {
  SlLayout
};
