import {
  step_styles_default
} from "./chunk.PHTJ54CN.js";
import {
  e,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/step/step.ts
var SlStep = class extends s {
  constructor() {
    super(...arguments);
    this.index = 0;
  }
  isCurrentStep() {
    const steps = this.parentSteps;
    if (steps) {
      return steps.childStep.indexOf(this) === steps.current;
    }
    return false;
  }
  isFinished() {
    const steps = this.parentSteps;
    if (steps) {
      return steps.childStep.indexOf(this) < steps.current;
    }
    return false;
  }
  get parentSteps() {
    return this.closest("sl-steps");
  }
  render() {
    return p`
      <div part="step-container">
        <div class="tail"></div>
        <div part="step-icon">
          <span class="step-icon-span" part="step-icon-span">
            <slot name="step-icon"> ${this.icon ? p`<sl-icon library="system" name="${this.icon}"></sl-icon>` : p`<span>${this.index}</span>`}</slot>
          </span>
        </div>
        <div part="step-content">
          <div part="step-title">
            <slot name="step-title">${this.title}</slot>
          </div>
          <div part="step-description"><slot name="step-description">${this.description}</slot></div>
        </div>
        <slot></slot>
      </div>
    `;
  }
};
SlStep.styles = step_styles_default;
__decorateClass([
  e({ type: String, reflect: true })
], SlStep.prototype, "icon", 2);
__decorateClass([
  e({ type: String, reflect: true })
], SlStep.prototype, "description", 2);
__decorateClass([
  e({ type: String, reflect: true })
], SlStep.prototype, "title", 2);
__decorateClass([
  e({ type: Number })
], SlStep.prototype, "index", 2);
SlStep = __decorateClass([
  n("sl-step")
], SlStep);

export {
  SlStep
};
