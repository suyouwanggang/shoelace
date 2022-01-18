import {
  tab_styles_default
} from "./chunk.ES3QOF3R.js";
import {
  LocalizeController
} from "./chunk.CCTU25PV.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  e,
  i,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/tab/tab.ts
var SlTab = class extends s {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
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
    return $`
      <div
        part="base"
        class=${o({
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
        ${this.closable ? $` <sl-icon-button name="x" library="system" label=${this.localize.term("close")} exportparts="base:close-button" class="tab__close-button" @click=${this.handleCloseClick} tabindex="-1"></sl-icon-button> ` : ""}
      </div>
    `;
  }
};
SlTab.styles = tab_styles_default;
__decorateClass([
  i(".tab")
], SlTab.prototype, "tab", 2);
__decorateClass([
  e({ reflect: true })
], SlTab.prototype, "panel", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTab.prototype, "active", 2);
__decorateClass([
  e({ type: Boolean })
], SlTab.prototype, "closable", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTab.prototype, "disabled", 2);
__decorateClass([
  e()
], SlTab.prototype, "lang", 2);
SlTab = __decorateClass([
  n("sl-tab")
], SlTab);

export {
  SlTab
};
