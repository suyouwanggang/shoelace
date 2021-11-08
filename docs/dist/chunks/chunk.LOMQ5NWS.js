import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  animateTo,
  animate_hide,
  animate_show,
  shimKeyframesHeightAuto
} from "./chunk.BCX7WXWF.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
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

// src/components/ac-panel/ac-panel.litcss
var styles = r`:host{display:block;--ac-tab-active-background-color:rgb(var(--sl-primary-color-100));--ac-header-color:rgba(0,0,0,.65);--ac-header-font-size:1.2em;--ac-header-padding:.3em .6em;--ac-content-padding:.3em .6em}.ac-tab-header{background-color:var(--ac-tab-active-background-color)}.ac-tab-header{border-top:1px solid var(--ac-tab-border-color,#c8c8c8);background-color:var(--ac-tab-background-color,#fafafa);padding:var(--ac-header-padding);font-size:var(--ac-header-font-size);color:var(--ac-header-color);cursor:pointer;display:flex;align-items:center}.ac-tab-header sl-icon{margin-right:var(--ac-panel-icon-margin-right,4px)}span[part=header-span]{flex:1 1 auto}div[part=content]{border-top:1px solid var(--ac-tab-border-color,#c8c8c8);background-color:#fff;padding:var(--ac-content-padding)}div[part=content].close{display:none}`;
var ac_panel_default = styles;

// src/components/ac-panel/ac-panel.styles.ts
var ac_panel_styles_default = r`
  ${component_styles_default}
  ${ac_panel_default}
`;

// src/components/ac-panel/ac-panel.ts
var SlAcPanel = class extends n {
  constructor() {
    super(...arguments);
    this.active = false;
  }
  renderHeader() {
    return y`<header class="ac-tab-header" part="header" @click=${this._clickHeader}>
      <slot name="trigger-icon"><sl-icon library="system" exportparts="base:trigger-icon" name="${this.active ? "chevron-down" : "chevron-right"}"></sl-icon></slot>
      <slot name="header"> <span part="header-span">${this.header}&nbsp;</span></slot>
      <slot name="header-extra"></slot>
    </header>`;
  }
  render() {
    return y`<div part="base">
      ${this.renderHeader()}
      <div part="content" class="${!this.active ? "close" : ""}"><slot></slot></div>
    </div>`;
  }
  get collapsePane() {
    return this.closest("sl-collapse");
  }
  async _clickHeader(_e) {
    const tab = this;
    const panel = this.collapsePane;
    if (!panel) {
      return;
    }
    const event = emit(panel, "sl-before-tab-change", {
      cancelable: true
    });
    if (!event.defaultPrevented) {
      panel.setTabToActive(tab, !tab.active);
      await panel.updateComplete;
      this.contentElement.style.display = "block";
      const currentHeight = parseInt(getCssValue(this.contentElement, "height"));
      this.contentElement.getAnimations().forEach((animateItem) => animateItem.cancel());
      let thisAnimate = animateTo(this.contentElement, shimKeyframesHeightAuto(this.active ? animate_show : animate_hide, currentHeight), {
        duration: SlAcPanel.ANIMATE_duration,
        easing: "ease"
      });
      let allPromise = [thisAnimate];
      Promise.all(allPromise).then(() => {
        this.contentElement.style.removeProperty("display");
        emit(panel, "tab-change", {
          detail: {
            tab
          }
        });
      });
    }
  }
  get contentElement() {
    return this.renderRoot.querySelector("div[part=content]");
  }
};
SlAcPanel.styles = ac_panel_styles_default;
SlAcPanel.ANIMATE_duration = 500;
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlAcPanel.prototype, "active", 2);
__decorateClass([
  e({ type: String, reflect: true })
], SlAcPanel.prototype, "key", 2);
__decorateClass([
  e({ type: String, reflect: true })
], SlAcPanel.prototype, "header", 2);
SlAcPanel = __decorateClass([
  n2("sl-ac-panel")
], SlAcPanel);
var ac_panel_default2 = SlAcPanel;

export {
  ac_panel_default2 as ac_panel_default
};
