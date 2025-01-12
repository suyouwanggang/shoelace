import {
  radio_styles_default
} from "./chunk.LGDS4QIT.js";
import {
  l as l2
} from "./chunk.AOA7W6OJ.js";
import {
  FormSubmitController
} from "./chunk.7FUXINNM.js";
import {
  HasSlotController
} from "./chunk.RBDNGYR3.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  l
} from "./chunk.JVCXZKVY.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  e,
  i,
  n,
  t
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/radio/radio.ts
var SlRadio = class extends s {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      value: (control) => control.checked ? control.value : void 0
    });
    this.hasSlotController = new HasSlotController(this, "[default]");
    this.hasFocus = false;
    this.disabled = false;
    this.checked = false;
    this.invalid = false;
  }
  firstUpdated() {
    const radios = this.getAllRadios();
    const checkedRadio = radios.find((radio) => radio.checked);
    radios.map((radio) => {
      if (radio.input) {
        radio.input.tabIndex = -1;
      }
    });
    if (checkedRadio) {
      checkedRadio.input.tabIndex = 0;
    } else if (radios.length) {
      radios[0].input.tabIndex = 0;
    }
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
      this.input.tabIndex = 0;
      this.getSiblingRadios().map((radio) => {
        radio.input.tabIndex = -1;
        radio.checked = false;
      });
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
      this.getAllRadios().map((radio) => {
        radio.checked = false;
        radio.input.tabIndex = -1;
      });
      radios[index].focus();
      radios[index].checked = true;
      radios[index].input.tabIndex = 0;
      emit(radios[index], "sl-change");
      event.preventDefault();
    }
  }
  render() {
    this.setAttribute("role", "radio");
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    return $`
      <label
        part="base"
        class=${o({
      radio: true,
      "radio--checked": this.checked,
      "radio--disabled": this.disabled,
      "radio--focused": this.hasFocus
    })}
        @keydown=${this.handleKeyDown}
      >
        <input
          class="radio__input"
          type="radio"
          name=${l(this.name)}
          value=${l(this.value)}
          .checked=${l2(this.checked)}
          .disabled=${this.disabled}
          aria-hidden="true"
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

        <span part="label" class="radio__label ${this.hasSlotController.hasDefaultSlot() ? " radio_label_has" : ""}">
          <slot></slot>
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
SlRadio = __decorateClass([
  n("sl-radio")
], SlRadio);

export {
  SlRadio
};
