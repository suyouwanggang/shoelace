import {
  collapse_styles_default
} from "./chunk.T5TEV57L.js";
import {
  getChildrenElement
} from "./chunk.3SJG5WV3.js";
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

// src/components/collapse/collapse.ts
var SlCollapse = class extends s {
  constructor() {
    super(...arguments);
    this.multi = false;
  }
  render() {
    return p`<div part="base"><slot id="slot"></slot></div> `;
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
  e({ type: Boolean, reflect: true })
], SlCollapse.prototype, "multi", 2);
SlCollapse = __decorateClass([
  n("sl-collapse")
], SlCollapse);

export {
  SlCollapse
};
