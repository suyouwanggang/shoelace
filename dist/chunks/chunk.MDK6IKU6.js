import {
  tab_styles_default
} from "./chunk.H7LKO4IW.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/tab/tab.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var id = 0;
var SlTab = class extends LitElement {
  constructor() {
    super(...arguments);
    this.componentId = `tab-${++id}`;
    this.panel = "";
    this.active = false;
    this.closable = false;
    this.disabled = false;
  }
  focus(options) {
    this.tab.focus(options);
  }
  blur() {
    this.tab.blur();
  }
  handleCloseClick() {
    emit(this, "sl-close");
  }
  render() {
    this.id = this.id || this.componentId;
    return html`
      <div
        part="base"
        class=${classMap({
      tab: true,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
        role="tab"
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-selected=${this.active ? "true" : "false"}
        tabindex=${this.disabled || !this.active ? "-1" : "0"}
      >
        <slot></slot>
        ${this.closable ? html` <sl-icon-button name="x" library="system" exportparts="base:close-button" class="tab__close-button" @click=${this.handleCloseClick} tabindex="-1" aria-hidden="true"></sl-icon-button> ` : ""}
      </div>
    `;
  }
};
SlTab.styles = tab_styles_default;
__decorateClass([
  query(".tab")
], SlTab.prototype, "tab", 2);
__decorateClass([
  property()
], SlTab.prototype, "panel", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlTab.prototype, "active", 2);
__decorateClass([
  property({ type: Boolean })
], SlTab.prototype, "closable", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlTab.prototype, "disabled", 2);
SlTab = __decorateClass([
  customElement("sl-tab")
], SlTab);

export {
  SlTab
};
