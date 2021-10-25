import {
  collapse_styles_default
} from "./chunk.52M4GUM2.js";
import {
  getChildrenElement
} from "./chunk.3SJG5WV3.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/collapse/collapse.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlCollapse = class extends LitElement {
  constructor() {
    super(...arguments);
    this.multi = false;
  }
  render() {
    return html`<div part="base"><slot id="slot"></slot></div> `;
  }
  get childTabPanel() {
    return getChildrenElement(this, "sl-ac-panel");
  }
  findTab(key) {
    return this.childTabPanel.find((item) => {
      return item.key == key;
    });
  }
  getTabIndex(tab) {
    const children = this.childTabPanel;
    return children.indexOf(tab);
  }
  findTabByIndex(index) {
    const children = this.childTabPanel;
    return index < children.length ? children[index] : null;
  }
  get activeTab() {
    return this.childTabPanel.filter((item) => {
      return item.active;
    });
  }
  setTabToActive(tab, active = false) {
    if (active && !this.multi) {
      const tabs = this.activeTab;
      tabs.forEach((item) => {
        item.active = false;
      });
    }
    tab.active = active;
  }
};
SlCollapse.styles = collapse_styles_default;
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlCollapse.prototype, "multi", 2);
SlCollapse = __decorateClass([
  customElement("sl-collapse")
], SlCollapse);

export {
  SlCollapse
};
