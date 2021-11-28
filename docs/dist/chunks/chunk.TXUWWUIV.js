import {
  component_styles_default
} from "./chunk.34CCKGOJ.js";
import {
  e,
  n
} from "./chunk.OPP7P5NL.js";
import {
  p,
  r,
  s
} from "./chunk.5BL2X74K.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/step/step.litcss
var styles = r`:host{position:relative;display:inline-block;flex:1;overflow:hidden}:host([finished]){--step-background-color:#fff;--step-border-color:#42b983;--step-icon-color:#42b983;--step-line-color:#42b983}:host([current]){--step-background-color:#42b983;--step-border-color:#42b983;--step-icon-color:#FFF;--step-line-color:#f0f0f0}:host([last]){flex:0 0 auto}:host([direction=vertical]){display:block}div[part=step-container]{box-sizing:border-box;display:flex;overflow:hidden}:host([direction=vertical]) div[part=step-container]{position:relative;display:flex}div[part=step-icon]{display:inline-block;position:relative;background-color:var(--step-background-color,#fff);flex:0 0 auto;width:32px;height:32px;margin:0 8px 0 0;font-size:16px;line-height:32px;text-align:center;border:1px solid var(--step-border-color,rgba(0,0,0,0.25));border-radius:32px;transition:background-color .3s,border-color .3s;color:var(--step-icon-color,inherit)}.step-icon-span{display:inline-block;color:inherit;text-align:center}div[part=step-content]{display:inline-block}:host([direction=vertical]) .div[part=step-content]{min-height:48px}div[part=step-title]{color:rgba(0,0,0,0.85);font-weight:400;display:inline-block;position:relative}:host(:not([direction=vertical]):not([last])) div[part=step-title]::after{position:absolute;top:16px;left:100%;margin-left:10px;display:block;width:9999px;height:1px;background:var(--step-line-color,#f0f0f0);content:""}div[part=step-description]{color:rgba(0,0,0,0.85);white-space:normal;max-width:400px;box-sizing:border-box}:host([direction=vertical]) div[part=step-description]{max-width:none}.tail{display:none}:host([direction=vertical]) .tail{position:absolute;display:block;left:16px;width:1px;height:100%}:host([direction=vertical]) div[part=icon-part]{margin-right:16px;float:left}:host([direction=vertical]:not([last])) .tail::after{display:inline-block;width:100%;height:100%;background:#f0f0f0;border-radius:1px;transition:background-color .3s;background-color:var(--step-border-color,rgba(0,0,0,0.25));content:""}:host([direction=vertical]) div[part=step-content]{display:block;min-height:46px}`;
var step_default = styles;

// src/components/step/step.styles.ts
var step_styles_default = r`
  ${component_styles_default}
  ${step_default}
`;

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
var step_default2 = SlStep;

export {
  step_default2 as step_default
};
