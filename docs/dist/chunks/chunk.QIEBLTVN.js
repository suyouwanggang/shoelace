import {
  getLabelledBy,
  renderFormControl
} from "./chunk.NYH2E522.js";
import {
  input_styles_default
} from "./chunk.QU5CC5T2.js";
import {
  l as l2
} from "./chunk.FBMRDI7U.js";
import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  l
} from "./chunk.4G2WRC2L.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  i,
  n,
  t
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/input/input.ts
var id = 0;
var SlInput = class extends s {
  constructor() {
    super(...arguments);
    this.inputId = `input-${++id}`;
    this.helpTextId = `input-help-text-${id}`;
    this.labelId = `input-label-${id}`;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasLabelSlot = false;
    this.isPasswordVisible = false;
    this.type = "text";
    this.size = "medium";
    this.value = "";
    this.filled = false;
    this.pill = false;
    this.helpText = "";
    this.clearable = false;
    this.togglePassword = false;
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.invalid = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  select() {
    return this.input.select();
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  setRangeText(replacement, start, end, selectMode = "preserve") {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      emit(this, "sl-input");
      emit(this, "sl-change");
    }
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    emit(this, "sl-change");
  }
  handleClearClick(event) {
    this.value = "";
    emit(this, "sl-clear");
    emit(this, "sl-input");
    emit(this, "sl-change");
    this.input.focus();
    event.stopPropagation();
  }
  handleDisabledChange() {
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    emit(this, "sl-input");
  }
  handleInvalid() {
    this.invalid = true;
  }
  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this, "help-text");
    this.hasLabelSlot = hasSlot(this, "label");
  }
  handleValueChange() {
    if (this.input) {
      this.invalid = !this.input.checkValidity();
    }
  }
  render() {
    var _a, _b;
    return renderFormControl({
      inputId: this.inputId,
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpTextId: this.helpTextId,
      helpText: this.helpText,
      hasHelpTextSlot: this.hasHelpTextSlot,
      size: this.size
    }, p`
        <div
          part="base"
          class=${o({
      input: true,
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": ((_a = this.value) == null ? void 0 : _a.length) === 0,
      "input--invalid": this.invalid
    })}
        >
          <span part="prefix" class="input__prefix">
            <slot name="prefix"></slot>
          </span>

          <input
            part="input"
            id=${this.inputId}
            class="input__control"
            type=${this.type === "password" && this.isPasswordVisible ? "text" : this.type}
            name=${l(this.name)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${l(this.placeholder)}
            minlength=${l(this.minlength)}
            maxlength=${l(this.maxlength)}
            min=${l(this.min)}
            max=${l(this.max)}
            step=${l(this.step)}
            .value=${l2(this.value)}
            autocapitalize=${l(this.autocapitalize)}
            autocomplete=${l(this.autocomplete)}
            autocorrect=${l(this.autocorrect)}
            ?autofocus=${this.autofocus}
            spellcheck=${l(this.spellcheck)}
            pattern=${l(this.pattern)}
            inputmode=${l(this.inputmode)}
            aria-labelledby=${l(getLabelledBy({
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpText: this.helpText,
      helpTextId: this.helpTextId,
      hasHelpTextSlot: this.hasHelpTextSlot
    }))}
            aria-invalid=${this.invalid ? "true" : "false"}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />

          ${this.clearable && ((_b = this.value) == null ? void 0 : _b.length) > 0 ? p`
                <button part="clear-button" class="input__clear" type="button" @click=${this.handleClearClick} tabindex="-1">
                  <slot name="clear-icon">
                    <sl-icon name="x-circle" library="system"></sl-icon>
                  </slot>
                </button>
              ` : ""}
          ${this.togglePassword ? p`
                <button part="password-toggle-button" class="input__password-toggle" type="button" @click=${this.handlePasswordToggle} tabindex="-1">
                  ${this.isPasswordVisible ? p`
                        <slot name="show-password-icon">
                          <sl-icon name="eye-slash" library="system"></sl-icon>
                        </slot>
                      ` : p`
                        <slot name="hide-password-icon">
                          <sl-icon name="eye" library="system"></sl-icon>
                        </slot>
                      `}
                </button>
              ` : ""}

          <span part="suffix" class="input__suffix">
            <slot name="suffix"></slot>
          </span>
        </div>
      `);
  }
};
SlInput.styles = input_styles_default;
__decorateClass([
  i(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass([
  t()
], SlInput.prototype, "hasFocus", 2);
__decorateClass([
  t()
], SlInput.prototype, "hasHelpTextSlot", 2);
__decorateClass([
  t()
], SlInput.prototype, "hasLabelSlot", 2);
__decorateClass([
  t()
], SlInput.prototype, "isPasswordVisible", 2);
__decorateClass([
  e({ reflect: true })
], SlInput.prototype, "type", 2);
__decorateClass([
  e({ reflect: true })
], SlInput.prototype, "size", 2);
__decorateClass([
  e()
], SlInput.prototype, "name", 2);
__decorateClass([
  e()
], SlInput.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput.prototype, "filled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput.prototype, "pill", 2);
__decorateClass([
  e()
], SlInput.prototype, "label", 2);
__decorateClass([
  e({ attribute: "help-text" })
], SlInput.prototype, "helpText", 2);
__decorateClass([
  e({ type: Boolean })
], SlInput.prototype, "clearable", 2);
__decorateClass([
  e({ attribute: "toggle-password", type: Boolean })
], SlInput.prototype, "togglePassword", 2);
__decorateClass([
  e()
], SlInput.prototype, "placeholder", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
__decorateClass([
  e({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass([
  e({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass([
  e()
], SlInput.prototype, "min", 2);
__decorateClass([
  e()
], SlInput.prototype, "max", 2);
__decorateClass([
  e({ type: Number })
], SlInput.prototype, "step", 2);
__decorateClass([
  e()
], SlInput.prototype, "pattern", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlInput.prototype, "invalid", 2);
__decorateClass([
  e()
], SlInput.prototype, "autocapitalize", 2);
__decorateClass([
  e()
], SlInput.prototype, "autocorrect", 2);
__decorateClass([
  e()
], SlInput.prototype, "autocomplete", 2);
__decorateClass([
  e({ type: Boolean })
], SlInput.prototype, "autofocus", 2);
__decorateClass([
  e({ type: Boolean })
], SlInput.prototype, "spellcheck", 2);
__decorateClass([
  e()
], SlInput.prototype, "inputmode", 2);
__decorateClass([
  watch("disabled")
], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("helpText"),
  watch("label")
], SlInput.prototype, "handleSlotChange", 1);
__decorateClass([
  watch("value")
], SlInput.prototype, "handleValueChange", 1);
SlInput = __decorateClass([
  n("sl-input")
], SlInput);

export {
  SlInput
};
