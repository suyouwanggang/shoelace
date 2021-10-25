import {
  menu_label_styles_default
} from "./chunk.AOOK6OHW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/menu-label/menu-label.ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
var SlMenuLabel = class extends LitElement {
  render() {
    return html`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `;
  }
};
SlMenuLabel.styles = menu_label_styles_default;
SlMenuLabel = __decorateClass([
  customElement("sl-menu-label")
], SlMenuLabel);

export {
  SlMenuLabel
};
