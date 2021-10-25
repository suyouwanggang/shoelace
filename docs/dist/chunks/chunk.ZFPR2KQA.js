import {
  tab_panel_styles_default
} from "./chunk.3AY5PLDA.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/tab-panel/tab-panel.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
var id = 0;
var SlTabPanel = class extends LitElement {
  constructor() {
    super(...arguments);
    this.componentId = `tab-panel-${++id}`;
    this.name = "";
    this.active = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.id || this.componentId;
  }
  render() {
    this.style.display = this.active ? "block" : "none";
    return html`
      <div part="base" class="tab-panel" role="tabpanel" aria-selected=${this.active ? "true" : "false"} aria-hidden=${this.active ? "false" : "true"}>
        <slot></slot>
      </div>
    `;
  }
};
SlTabPanel.styles = tab_panel_styles_default;
__decorateClass([
  property()
], SlTabPanel.prototype, "name", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlTabPanel.prototype, "active", 2);
SlTabPanel = __decorateClass([
  customElement("sl-tab-panel")
], SlTabPanel);

export {
  SlTabPanel
};
