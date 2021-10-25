import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  ac_panel_styles_default
} from "./chunk.BUQCIHRZ.js";
import {
  animateTo,
  animate_hide,
  animate_show,
  shimKeyframesHeightAuto
} from "./chunk.UWBLHGHY.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/ac-panel/ac-panel.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlAcPanel = class extends LitElement {
  constructor() {
    super(...arguments);
    this.active = false;
  }
  renderHeader() {
    return html`<header class="ac-tab-header" part="header" @click=${this._clickHeader}>
      <slot name="trigger-icon"><sl-icon library="system" exportparts="base:trigger-icon" name="${this.active ? "chevron-down" : "chevron-right"}"></sl-icon></slot>
      <slot name="header"> <span part="header-span">${this.header}&nbsp;</span></slot>
      <slot name="header-extra"></slot>
    </header>`;
  }
  render() {
    return html`<div part="base">
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
  property({ type: Boolean, reflect: true })
], SlAcPanel.prototype, "active", 2);
__decorateClass([
  property({ type: String, reflect: true })
], SlAcPanel.prototype, "key", 2);
__decorateClass([
  property({ type: String, reflect: true })
], SlAcPanel.prototype, "header", 2);
SlAcPanel = __decorateClass([
  customElement("sl-ac-panel")
], SlAcPanel);

export {
  SlAcPanel
};
