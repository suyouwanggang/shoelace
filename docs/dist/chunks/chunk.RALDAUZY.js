import {
  radio_styles_default
} from "./chunk.LKKF2H6K.js";
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

// src/components/radio/radio.ts
var id = 0;
var SlRadio = class extends s {
  constructor() {
    super(...arguments);
    this.inputId = `radio-${++id}`;
    this.labelId = `radio-label-${id}`;
    this.hasFocus = false;
    this.disabled = false;
    this.checked = false;
    this.invalid = false;
    this.hasSlotLabel = false;
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  getAllRadios() {
    const radioGroup = this.closest("sl-radio-group");
    if (!radioGroup) {
      return [this];
    }
    return [...radioGroup.querySelectorAll("sl-radio")].filter((radio) => radio.name === this.name);
  }
  getSiblingRadios() {
    return this.getAllRadios().filter((radio) => radio !== this);
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleCheckedChange() {
    if (this.checked) {
      this.getSiblingRadios().map((radio) => radio.checked = false);
    }
  }
  handleClick() {
    this.checked = true;
    emit(this, "sl-change");
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
  handleKeyDown(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      const radios = this.getAllRadios().filter((radio) => !radio.disabled);
      const incr = ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
      let index = radios.indexOf(this) + incr;
      if (index < 0)
        index = radios.length - 1;
      if (index > radios.length - 1)
        index = 0;
      this.getAllRadios().map((radio) => radio.checked = false);
      radios[index].focus();
      radios[index].checked = true;
      emit(radios[index], "sl-change");
      event.preventDefault();
    }
  }
  slotChangeHandler() {
    this.hasSlotLabel = hasSlot(this);
  }
  render() {
    return p`
      <label
        part="base"
        class=${o({
      radio: true,
      "radio--checked": this.checked,
      "radio--disabled": this.disabled,
      "radio--focused": this.hasFocus
    })}
        for=${this.inputId}
        @keydown=${this.handleKeyDown}
      >
        <input
          id=${this.inputId}
          class="radio__input"
          type="radio"
          name=${l(this.name)}
          value=${l(this.value)}
          .checked=${l2(this.checked)}
          .disabled=${this.disabled}
          aria-checked=${this.checked ? "true" : "false"}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>
        </span>

        <span part="label" id=${this.labelId} class="radio__label ${this.hasSlotLabel ? " radio_label_has" : ""}">
          <slot @slotchange=${this.slotChangeHandler}></slot>
        </span>
      </label>
    `;
  }
};
SlRadio.styles = radio_styles_default;
__decorateClass([
  i('input[type="radio"]')
], SlRadio.prototype, "input", 2);
__decorateClass([
  t()
], SlRadio.prototype, "hasFocus", 2);
__decorateClass([
  e()
], SlRadio.prototype, "name", 2);
__decorateClass([
  e()
], SlRadio.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadio.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadio.prototype, "checked", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadio.prototype, "invalid", 2);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true })
], SlRadio.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlRadio.prototype, "handleDisabledChange", 1);
__decorateClass([
  t()
], SlRadio.prototype, "hasSlotLabel", 2);
SlRadio = __decorateClass([
  n("sl-radio")
], SlRadio);

export {
  SlRadio
};
