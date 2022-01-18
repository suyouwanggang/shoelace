import {
  steps_styles_default
} from "./chunk.WIAPO7AV.js";
import {
  customStyle
} from "./chunk.AWEQNTTU.js";
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

// src/components/steps/steps.ts
var SlSteps = class extends s {
  constructor() {
    super(...arguments);
    this.current = 0;
    this.vertical = false;
    this.startIndex = 1;
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    const slotItem = this.renderRoot.querySelector("#slot");
    slotItem.addEventListener("slotchange", () => {
      this._setChildStepCss();
    });
  }
  _setChildStepCss() {
    const childItems = this.childStep;
    const length = childItems.length;
    childItems.forEach((item, index) => {
      if (index === 0) {
        item.setAttribute("first", "");
      } else {
        item.removeAttribute("first");
      }
      if (index === this.current) {
        item.setAttribute("current", "");
      } else {
        item.removeAttribute("current");
      }
      if (index < this.current) {
        item.setAttribute("finished", "");
      } else {
        item.removeAttribute("finished");
      }
      item.index = this.startIndex + index;
      if (index === length - 1) {
        item.setAttribute("last", "");
      } else {
        item.removeAttribute("last");
      }
      if (this.vertical) {
        item.setAttribute("direction", "vertical");
      } else {
        item.removeAttribute("direction");
      }
    });
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (this.hasUpdated) {
      if (_changedProperties.has("vertical") || _changedProperties.has("current")) {
        this._setChildStepCss();
        if (_changedProperties.has("current")) {
          emit(this, "sl-change", { detail: this.current });
        }
      }
    }
  }
  get childStep() {
    const children = Array.from(this.children);
    return children.filter((item) => {
      return item.tagName.toLowerCase() == "sl-step";
    });
  }
  render() {
    return $`<div part="container">
      <slot id="slot"></slot>
    </div>`;
  }
};
SlSteps.styles = steps_styles_default;
__decorateClass([
  e({ type: Number, reflect: true })
], SlSteps.prototype, "current", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlSteps.prototype, "vertical", 2);
__decorateClass([
  e({ type: Number, reflect: true })
], SlSteps.prototype, "startIndex", 2);
__decorateClass([
  e({ type: String, reflect: true })
], SlSteps.prototype, "size", 2);
SlSteps = __decorateClass([
  n("sl-steps"),
  customStyle()
], SlSteps);

export {
  SlSteps
};
