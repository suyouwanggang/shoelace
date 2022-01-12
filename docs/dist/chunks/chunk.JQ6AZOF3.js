import {
  radio_group_styles_default
} from "./chunk.OVDX7XRH.js";
import {
  onEvent
} from "./chunk.3SJG5WV3.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  i,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/radio-group/radio-group.ts
var SlRadioGroup = class extends s {
  constructor() {
    super(...arguments);
    this.label = "";
    this.fieldset = false;
  }
  handleFocusIn() {
    requestAnimationFrame(() => {
      const checkedRadio = [...this.defaultSlot.assignedElements({ flatten: true })].find((el) => el.tagName.toLowerCase() === "sl-radio" && el.checked);
      if (checkedRadio) {
        checkedRadio.focus();
      }
    });
  }
  get allRadios() {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => el.tagName.toLowerCase() === "sl-radio");
  }
  valueChange() {
    const checkedRadio = this.allRadios;
    checkedRadio.forEach((item) => {
      if (item.value == this.value) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    if (this.value) {
      this.valueChange();
    } else {
      const checkedRadio = this.allRadios;
      checkedRadio.forEach((item) => {
        if (item.checked) {
          this.value = item.value;
          return;
        }
      });
    }
    this._eventHandler = onEvent(this, "sl-radio", "sl-change", (event) => {
      let radio = event.delegateTarget;
      let group = radio.closest("sl-radio-group");
      if (group == this) {
        this.value = radio.value;
        emit(this, "sl-check-change");
      }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._eventHandler) {
      this._eventHandler.dispose();
    }
  }
  render() {
    return $`
      <fieldset
        part="base"
        class=${o({
      "radio-group": true,
      "radio-group--has-fieldset": this.fieldset
    })}
        role="radiogroup"
        @focusin=${this.handleFocusIn}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <slot></slot>
      </fieldset>
    `;
  }
};
SlRadioGroup.styles = radio_group_styles_default;
__decorateClass([
  i("slot:not([name])")
], SlRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  e()
], SlRadioGroup.prototype, "label", 2);
__decorateClass([
  e({ type: Boolean, attribute: "fieldset" })
], SlRadioGroup.prototype, "fieldset", 2);
__decorateClass([
  e({ type: Object })
], SlRadioGroup.prototype, "value", 2);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlRadioGroup.prototype, "valueChange", 1);
SlRadioGroup = __decorateClass([
  n("sl-radio-group")
], SlRadioGroup);

export {
  SlRadioGroup
};
