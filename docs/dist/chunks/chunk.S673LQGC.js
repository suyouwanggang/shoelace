import {
  requestInclude
} from "./chunk.VHNS4GLL.js";
import {
  include_styles_default
} from "./chunk.VF3HGRCG.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
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

// src/components/include/include.ts
var SlInclude = class extends s {
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
    } catch (e2) {
      emit(this, "sl-error", { detail: { status: -1 } });
    }
  }
  render() {
    return $`<slot></slot>`;
  }
};
SlInclude.styles = include_styles_default;
__decorateClass([
  e()
], SlInclude.prototype, "src", 2);
__decorateClass([
  e()
], SlInclude.prototype, "mode", 2);
__decorateClass([
  e({ attribute: "allow-scripts", type: Boolean })
], SlInclude.prototype, "allowScripts", 2);
__decorateClass([
  watch("src")
], SlInclude.prototype, "handleSrcChange", 1);
SlInclude = __decorateClass([
  n("sl-include")
], SlInclude);

export {
  SlInclude
};
