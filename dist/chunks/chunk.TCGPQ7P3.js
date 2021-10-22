import {
  checkbox_styles_default
} from "./chunk.2DIN5N6Z.js";
import {
  l as l2
} from "./chunk.FBMRDI7U.js";
import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  isArray,
  isObject
} from "./chunk.3SJG5WV3.js";
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

// src/components/checkbox/checkbox.ts
var id = 0;
var SlCheckbox = class extends s {
  constructor() {
    super(...arguments);
    this.inputId = `checkbox-${++id}`;
    this.labelId = `checkbox-label-${id}`;
    this.hasFocus = false;
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.indeterminate = false;
    this.invalid = false;
    this.type = "primary";
    this.shape = "square";
    this.hasLabelSlot = false;
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
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
  handleClick() {
    const beforeCheck = emit(this, "sl-before-change", {
      cancelable: true
    });
    if (!beforeCheck.defaultPrevented) {
      this.checked = !this.checked;
      this.indeterminate = false;
      this.ripple.showRipple();
      emit(this, "sl-change");
    }
  }
  handleBlur() {
    this.hasFocus = false;
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
    emit(this, "sl-focus");
  }
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
  }
  labelSlotChange() {
    this.hasLabelSlot = hasSlot(this);
  }
  render() {
    return p`
      <label
        part="base"
        class=${o({
      checkbox: true,
      "checkbox--checked": this.checked,
      "checkbox--disabled": this.disabled,
      "checkbox--focused": this.hasFocus,
      "checkbox--indeterminate": this.indeterminate
    })}
        for=${this.inputId}
      >
        <input
          id=${this.inputId}
          class="checkbox__input"
          type="checkbox"
          name=${l(this.name)}
          value=${isObject(this.value) || isArray(this.value) ? "" : l(this.value)}
          .indeterminate=${l2(this.indeterminate)}
          .checked=${l2(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="checkbox"
          aria-checked=${this.checked ? "true" : "false"}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        <sl-ripple unbounded centered id=${this.inputId + "_ripple"} .disabled=${this.disabled}>
          <span part="control" class="checkbox__control" shape=${this.shape}>
            ${this.checked ? p`
                  <span part="checked-icon" class="checkbox__icon">
                    <svg viewBox="0 0 16 16">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                        <g stroke="currentColor" stroke-width="2">
                          <g transform="translate(3.428571, 3.428571)">
                            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
                            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                ` : ""}
            ${!this.checked && this.indeterminate ? p`
                  <span part="indeterminate-icon" class="checkbox__icon">
                    <svg viewBox="0 0 16 16">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                        <g stroke="currentColor" stroke-width="2">
                          <g transform="translate(2.285714, 6.857143)">
                            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                ` : ""}
          </span>
        </sl-ripple>
        <span part="label" id=${this.labelId} class="checkbox__label ${this.hasLabelSlot ? "checkbox_label_hasSlot" : ""}">
          <slot @slotchange=${this.labelSlotChange}></slot>
        </span>
      </label>
    `;
  }
};
SlCheckbox.styles = checkbox_styles_default;
__decorateClass([
  i('input[type="checkbox"]')
], SlCheckbox.prototype, "input", 2);
__decorateClass([
  i("sl-ripple")
], SlCheckbox.prototype, "ripple", 2);
__decorateClass([
  t()
], SlCheckbox.prototype, "hasFocus", 2);
__decorateClass([
  e()
], SlCheckbox.prototype, "name", 2);
__decorateClass([
  e()
], SlCheckbox.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "checked", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "invalid", 2);
__decorateClass([
  e({ type: String, reflect: true })
], SlCheckbox.prototype, "type", 2);
__decorateClass([
  e({ type: String, reflect: false, attribute: false })
], SlCheckbox.prototype, "shape", 2);
__decorateClass([
  watch("disabled")
], SlCheckbox.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true }),
  watch("indeterminate", { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleStateChange", 1);
__decorateClass([
  t()
], SlCheckbox.prototype, "hasLabelSlot", 2);
SlCheckbox = __decorateClass([
  n("sl-checkbox")
], SlCheckbox);

export {
  SlCheckbox
};
