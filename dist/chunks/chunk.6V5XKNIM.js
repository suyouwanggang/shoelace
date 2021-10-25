import {
  step_styles_default
} from "./chunk.KMBXD4PT.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/step/step.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlStep = class extends LitElement {
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
    return html`
      <div part="step-container">
        <div class="tail"></div>
        <div part="step-icon">
          <span class="step-icon-span" part="step-icon-span">
            <slot name="step-icon"> ${this.icon ? html`<sl-icon library="system" name="${this.icon}"></sl-icon>` : html`<span>${this.index}</span>`}</slot>
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
  property({ type: String, reflect: true })
], SlStep.prototype, "icon", 2);
__decorateClass([
  property({ type: String, reflect: true })
], SlStep.prototype, "description", 2);
__decorateClass([
  property({ type: String, reflect: true })
], SlStep.prototype, "title", 2);
__decorateClass([
  property({ type: Number })
], SlStep.prototype, "index", 2);
SlStep = __decorateClass([
  customElement("sl-step")
], SlStep);

export {
  SlStep
};
