import {
  requestInclude
} from "./chunk.DTM5B7PO.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/include/include.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/components/include/include.styles.ts
import { css } from "lit";
var include_styles_default = css`
  ${component_styles_default}

  :host {
    display: block;
  }
`;

// src/components/include/include.ts
var SlInclude = class extends LitElement {
  constructor() {
    super(...arguments);
    this.mode = "cors";
    this.allowScripts = false;
  }
  executeScript(script) {
    const newScript = document.createElement("script");
    [...script.attributes].map((attr) => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  }
  async handleSrcChange() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);
      if (src !== this.src) {
        return;
      }
      if (!file) {
        return;
      }
      if (!file.ok) {
        emit(this, "sl-error", { detail: { status: file.status } });
        return;
      }
      this.innerHTML = file.html;
      if (this.allowScripts) {
        [...this.querySelectorAll("script")].map((script) => this.executeScript(script));
      }
      emit(this, "sl-load");
    } catch (e) {
      emit(this, "sl-error", { detail: { status: -1 } });
    }
  }
  render() {
    return html`<slot></slot>`;
  }
};
SlInclude.styles = include_styles_default;
__decorateClass([
  property()
], SlInclude.prototype, "src", 2);
__decorateClass([
  property()
], SlInclude.prototype, "mode", 2);
__decorateClass([
  property({ attribute: "allow-scripts", type: Boolean })
], SlInclude.prototype, "allowScripts", 2);
__decorateClass([
  watch("src")
], SlInclude.prototype, "handleSrcChange", 1);
SlInclude = __decorateClass([
  customElement("sl-include")
], SlInclude);
var include_default = SlInclude;

export {
  include_default
};
