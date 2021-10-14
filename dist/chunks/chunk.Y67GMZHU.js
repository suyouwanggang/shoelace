import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/tab-panel/tab-panel.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/components/tab-panel/tab-panel.styles.ts
import { css } from "lit";
var tab_panel_styles_default = css`
  ${component_styles_default}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    border: solid 1px transparent;
    padding: var(--padding);
  }
`;

// src/components/tab-panel/tab-panel.ts
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
var tab_panel_default = SlTabPanel;

export {
  tab_panel_default
};
