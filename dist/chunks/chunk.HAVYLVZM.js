import {
  getChildrenElement
} from "./chunk.UYG3ZEVK.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/collapse/collapse.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/components/collapse/collapse.styles.ts
import { css as css2 } from "lit";

// src/components/collapse/collapse.litcss
import { css } from "lit";
var styles = css`:host{display:block;border:1px solid var(--sl-collapse-border-color,#c8c8c8);border-top:0}`;
var collapse_default = styles;

// src/components/collapse/collapse.styles.ts
var collapse_styles_default = css2`
  ${component_styles_default}
  ${collapse_default}
`;

// src/components/collapse/collapse.ts
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
var collapse_default2 = SlCollapse;

export {
  collapse_default2 as collapse_default
};
