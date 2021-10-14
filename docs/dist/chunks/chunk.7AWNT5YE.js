import {
  onEvent
} from "./chunk.UYG3ZEVK.js";
import {
  o
} from "./chunk.ODPXQ3L3.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
import {
  e,
  i,
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

// src/components/radio-group/radio-group.styles.ts
var radio_group_styles_default = r`
  ${component_styles_default}

  :host {
    display: block;
  }

  .radio-group {
    border: solid var(--sl-panel-border-width) rgb(var(--sl-panel-border-color));
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-large);
    padding-top: var(--sl-spacing-x-small);
  }

  .radio-group .radio-group__label {
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: rgb(var(--sl-input-color));
    padding: 0 var(--sl-spacing-2x-small);
  }

  ::slotted(sl-radio:not(:last-of-type)) {
    display: block;
    margin-bottom: var(--sl-spacing-2x-small);
  }

  .radio-group:not(.radio-group--has-fieldset) {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .radio-group:not(.radio-group--has-fieldset) .radio-group__label {
    position: absolute;
    width: 0;
    height: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`;

// src/components/radio-group/radio-group.ts
var SlRadioGroup = class extends n {
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
    return y`
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
  n2("sl-radio-group")
], SlRadioGroup);
var radio_group_default = SlRadioGroup;

export {
  radio_group_default
};
