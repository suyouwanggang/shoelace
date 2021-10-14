import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/divider/divider.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/components/divider/divider.styles.ts
import { css } from "lit";
var divider_styles_default = css`
  ${component_styles_default}

  :host {
    --color: rgb(var(--sl-panel-border-color));
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

// src/components/divider/divider.ts
var SlDivider = class extends LitElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  firstUpdated() {
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
  render() {
    return html``;
  }
};
SlDivider.styles = divider_styles_default;
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);
SlDivider = __decorateClass([
  customElement("sl-divider")
], SlDivider);
var divider_default = SlDivider;

export {
  divider_default
};
