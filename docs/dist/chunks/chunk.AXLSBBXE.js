import {
  range_styles_default
} from "./chunk.RFT3OZQD.js";
import {
  getLabelledBy,
  renderFormControl
} from "./chunk.GPWZ2NXO.js";
import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/range/range.ts
import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
var id = 0;
var SlRange = class extends LitElement {
  constructor() {
    super(...arguments);
    this.inputId = `input-${++id}`;
    this.helpTextId = `input-help-text-${id}`;
    this.labelId = `input-label-${id}`;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasLabelSlot = false;
    this.hasTooltip = false;
    this.name = "";
    this.value = 0;
    this.label = "";
    this.helpText = "";
    this.disabled = false;
    this.invalid = false;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.tooltip = "top";
    this.tooltipFormatter = (value) => value.toString();
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange;
    this.resizeObserver = new ResizeObserver(() => this.syncRange());
    this.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
    if (this.value === void 0 || this.value === null)
      this.value = this.min;
    if (this.value < this.min)
      this.value = this.min;
    if (this.value > this.max)
      this.value = this.max;
    this.handleSlotChange();
    this.updateComplete.then(() => {
      this.syncRange();
      this.resizeObserver.observe(this.input);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
    this.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleInput() {
    this.value = Number(this.input.value);
    emit(this, "sl-change");
    requestAnimationFrame(() => this.syncRange());
  }
  handleBlur() {
    this.hasFocus = false;
    this.hasTooltip = false;
    emit(this, "sl-blur");
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    this.hasTooltip = true;
    emit(this, "sl-focus");
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, "help-text");
    this.hasLabelSlot = hasSlot(this, "label");
  }
  handleThumbDragStart() {
    this.hasTooltip = true;
  }
  handleThumbDragEnd() {
    this.hasTooltip = false;
  }
  syncRange() {
    const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));
    this.syncProgress(percent);
    if (this.tooltip !== "none") {
      this.syncTooltip(percent);
    }
  }
  syncProgress(percent) {
    this.input.style.background = `linear-gradient(to right, var(--track-color-active) 0%, var(--track-color-active) ${percent * 100}%, var(--track-color-inactive) ${percent * 100}%, var(--track-color-inactive) 100%)`;
  }
  syncTooltip(percent) {
    if (this.output) {
      const inputWidth = this.input.offsetWidth;
      const tooltipWidth = this.output.offsetWidth;
      const thumbSize = getComputedStyle(this.input).getPropertyValue("--thumb-size");
      const x = `calc(${inputWidth * percent}px - calc(calc(${percent} * ${thumbSize}) - calc(${thumbSize} / 2)))`;
      this.output.style.transform = `translateX(${x})`;
      this.output.style.marginLeft = `-${tooltipWidth / 2}px`;
    }
  }
  render() {
    return renderFormControl({
      inputId: this.inputId,
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpTextId: this.helpTextId,
      helpText: this.helpText,
      hasHelpTextSlot: this.hasHelpTextSlot,
      size: "medium"
    }, html`
        <div
          part="base"
          class=${classMap({
      range: true,
      "range--disabled": this.disabled,
      "range--focused": this.hasFocus,
      "range--tooltip-visible": this.hasTooltip,
      "range--tooltip-top": this.tooltip === "top",
      "range--tooltip-bottom": this.tooltip === "bottom"
    })}
          @mousedown=${this.handleThumbDragStart}
          @mouseup=${this.handleThumbDragEnd}
          @touchstart=${this.handleThumbDragStart}
          @touchend=${this.handleThumbDragEnd}
        >
          <input
            part="input"
            type="range"
            class="range__control"
            name=${ifDefined(this.name)}
            ?disabled=${this.disabled}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            step=${ifDefined(this.step)}
            .value=${live(String(this.value))}
            aria-labelledby=${ifDefined(getLabelledBy({
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpText: this.helpText,
      helpTextId: this.helpTextId,
      hasHelpTextSlot: this.hasHelpTextSlot
    }))}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          ${this.tooltip !== "none" && !this.disabled ? html` <output part="tooltip" class="range__tooltip"> ${this.tooltipFormatter(this.value)} </output> ` : ""}
        </div>
      `);
  }
};
SlRange.styles = range_styles_default;
__decorateClass([
  query(".range__control")
], SlRange.prototype, "input", 2);
__decorateClass([
  query(".range__tooltip")
], SlRange.prototype, "output", 2);
__decorateClass([
  state()
], SlRange.prototype, "hasFocus", 2);
__decorateClass([
  state()
], SlRange.prototype, "hasHelpTextSlot", 2);
__decorateClass([
  state()
], SlRange.prototype, "hasLabelSlot", 2);
__decorateClass([
  state()
], SlRange.prototype, "hasTooltip", 2);
__decorateClass([
  property()
], SlRange.prototype, "name", 2);
__decorateClass([
  property({ type: Number })
], SlRange.prototype, "value", 2);
__decorateClass([
  property()
], SlRange.prototype, "label", 2);
__decorateClass([
  property({ attribute: "help-text" })
], SlRange.prototype, "helpText", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlRange.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlRange.prototype, "invalid", 2);
__decorateClass([
  property({ type: Number })
], SlRange.prototype, "min", 2);
__decorateClass([
  property({ type: Number })
], SlRange.prototype, "max", 2);
__decorateClass([
  property({ type: Number })
], SlRange.prototype, "step", 2);
__decorateClass([
  property()
], SlRange.prototype, "tooltip", 2);
__decorateClass([
  property({ attribute: false })
], SlRange.prototype, "tooltipFormatter", 2);
__decorateClass([
  watch("disabled")
], SlRange.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("label"),
  watch("helpText")
], SlRange.prototype, "handleSlotChange", 1);
SlRange = __decorateClass([
  customElement("sl-range")
], SlRange);

export {
  SlRange
};
