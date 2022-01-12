import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  ac_panel_styles_default
} from "./chunk.PJY3IH37.js";
import {
  animateTo,
  animate_hide,
  animate_show,
  shimKeyframesHeightAuto
} from "./chunk.R4MROFKW.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/ac-panel/ac-panel.ts
var SlAcPanel = class extends s {
  constructor() {
    super(...arguments);
    this.active = false;
  }
  renderHeader() {
    return $`<header class="ac-tab-header" part="header" @click=${this._clickHeader}>
      <slot name="trigger-icon"><sl-icon library="system" exportparts="base:trigger-icon" name="${this.active ? "chevron-down" : "chevron-right"}"></sl-icon></slot>
      <slot name="header"> <span part="header-span">${this.header}&nbsp;</span></slot>
      <slot name="header-extra"></slot>
    </header>`;
  }
  render() {
    return $`<div part="base">
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
  n("sl-ac-panel")
], SlAcPanel);

export {
  SlAcPanel
};
