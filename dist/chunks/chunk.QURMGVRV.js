import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/column/column.ts
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
var columnUniqueID = 0;
var SlColumn = class extends LitElement {
  constructor() {
    super(...arguments);
    this.hidden = false;
    this.colAlign = "center";
    this.colvAlign = "middle";
    this.align = "left";
    this.vAlign = "middle";
    this.uniqueID = "unique_" + columnUniqueID++;
    this.order = 0;
  }
  get childCanShowColumn() {
    let children = Array.from(this.children).filter((item) => {
      return item instanceof SlColumn && item.hidden != true;
    });
    return children.sort((item1, item2) => item1.order - item2.order);
  }
  get childAllColumn() {
    return Array.from(this.children).filter((item) => {
      return item instanceof SlColumn;
    });
  }
  get table() {
    return this.closest("sl-table");
  }
  updated(map) {
    var _a;
    super.updated(map);
    (_a = this.table) == null ? void 0 : _a.columnChangeHanlder();
  }
  createRenderRoot() {
    return this;
  }
};
__decorateClass([
  property({ attribute: false, type: Object })
], SlColumn.prototype, "renderCol", 2);
__decorateClass([
  property({ attribute: false, type: Object })
], SlColumn.prototype, "renderCell", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: true })
], SlColumn.prototype, "hidden", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: true })
], SlColumn.prototype, "field", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: true })
], SlColumn.prototype, "label", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "col-align" })
], SlColumn.prototype, "colAlign", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "col-valign" })
], SlColumn.prototype, "colvAlign", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "align" })
], SlColumn.prototype, "align", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "valign" })
], SlColumn.prototype, "vAlign", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "sort-able" })
], SlColumn.prototype, "sortAble", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "resize-able" })
], SlColumn.prototype, "resizeAble", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "width" })
], SlColumn.prototype, "width", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "min-width" })
], SlColumn.prototype, "minWidth", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "max-width" })
], SlColumn.prototype, "maxWidth", 2);
__decorateClass([
  property({ type: String, reflect: true, attribute: "uniqueID" })
], SlColumn.prototype, "uniqueID", 2);
__decorateClass([
  property({ type: Number, reflect: true, attribute: "order" })
], SlColumn.prototype, "order", 2);
__decorateClass([
  property({ type: String })
], SlColumn.prototype, "type", 2);
__decorateClass([
  property({ type: Object, attribute: false })
], SlColumn.prototype, "edit", 2);
__decorateClass([
  property({ type: Number })
], SlColumn.prototype, "inputMaxLength", 2);
__decorateClass([
  property({ type: Number })
], SlColumn.prototype, "inputMinLength", 2);
__decorateClass([
  property({ type: Boolean })
], SlColumn.prototype, "editRequired", 2);
__decorateClass([
  property({ type: Array, attribute: false })
], SlColumn.prototype, "items", 2);
SlColumn = __decorateClass([
  customElement("sl-column")
], SlColumn);
var column_default = SlColumn;

export {
  column_default
};
