import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
import {
  e,
  n as n2
} from "./chunk.OPP7P5NL.js";
import {
  n,
  r,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/steps/step.litcss
var styles = r`:host{display:block}div[part=container]{display:flex}:host([vertical]) div[part=container]{flex-direction:column;display:block}`;
var step_default = styles;

// src/components/steps/steps.styles.ts
var steps_styles_default = r`
  ${component_styles_default}
  ${step_default}
`;

// src/components/steps/steps.ts
var SlSteps = class extends n {
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
    return y`<div part="container">
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
  n2("sl-steps"),
  customStyle()
], SlSteps);
var steps_default = SlSteps;

export {
  steps_default
};
