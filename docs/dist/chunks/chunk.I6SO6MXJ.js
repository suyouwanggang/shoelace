import {
  getChildrenElement
} from "./chunk.3SJG5WV3.js";
import {
  component_styles_default
} from "./chunk.34CCKGOJ.js";
import {
  e,
  n
} from "./chunk.OPP7P5NL.js";
import {
  p,
  r,
  s
} from "./chunk.5BL2X74K.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/collapse/collapse.litcss
var styles = r`:host{display:block;border:1px solid var(--sl-collapse-border-color,#c8c8c8);border-top:0}`;
var collapse_default = styles;

// src/components/collapse/collapse.styles.ts
var collapse_styles_default = r`
  ${component_styles_default}
  ${collapse_default}
`;

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
var collapse_default2 = SlCollapse;

export {
  collapse_default2 as collapse_default
};
