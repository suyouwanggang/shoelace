import {
  textarea_styles_default
} from "./chunk.NVNPU4ID.js";
import {
  getLabelledBy,
  renderFormControl
} from "./chunk.NYH2E522.js";
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

// src/components/textarea/textarea.ts
var id = 0;
var SlTextarea = class extends s {
  constructor() {
    super(...arguments);
    this.inputId = `textarea-${++id}`;
    this.helpTextId = `textarea-help-text-${id}`;
    this.labelId = `textarea-label-${id}`;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasLabelSlot = false;
    this.size = "medium";
    this.value = "";
    this.filled = false;
    this.helpText = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.invalid = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
    this.handleSlotChange();
    this.updateComplete.then(() => {
      this.setTextareaHeight();
      this.resizeObserver.observe(this.input);
    });
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
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
  select() {
    return this.input.select();
  }
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number")
        this.input.scrollTop = position.top;
      if (typeof position.left === "number")
        this.input.scrollLeft = position.left;
      return;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  setRangeText(replacement, start, end, selectMode = "preserve") {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      emit(this, "sl-input");
    }
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
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
    this.setTextareaHeight();
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
  handleInput() {
    this.value = this.input.value;
    this.setTextareaHeight();
    emit(this, "sl-input");
  }
  handleRowsChange() {
    this.setTextareaHeight();
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
  setTextareaHeight() {
    if (this.input) {
      if (this.resize === "auto") {
        this.input.style.height = "auto";
        this.input.style.height = this.input.scrollHeight + "px";
      } else {
        this.input.style.height = void 0;
      }
    }
  }
  render() {
    var _a;
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
      textarea: true,
      "textarea--small": this.size === "small",
      "textarea--medium": this.size === "medium",
      "textarea--large": this.size === "large",
      "textarea--standard": !this.filled,
      "textarea--filled": this.filled,
      "textarea--disabled": this.disabled,
      "textarea--focused": this.hasFocus,
      "textarea--empty": ((_a = this.value) == null ? void 0 : _a.length) === 0,
      "textarea--invalid": this.invalid,
      "textarea--resize-none": this.resize === "none",
      "textarea--resize-vertical": this.resize === "vertical",
      "textarea--resize-auto": this.resize === "auto"
    })}
        >
          <textarea
            part="textarea"
            id=${this.inputId}
            class="textarea__control"
            name=${l(this.name)}
            .value=${l2(this.value)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${l(this.placeholder)}
            rows=${l(this.rows)}
            minlength=${l(this.minlength)}
            maxlength=${l(this.maxlength)}
            autocapitalize=${l(this.autocapitalize)}
            autocorrect=${l(this.autocorrect)}
            ?autofocus=${this.autofocus}
            spellcheck=${l(this.spellcheck)}
            inputmode=${l(this.inputmode)}
            aria-labelledby=${l(getLabelledBy({
      label: this.label,
      labelId: this.labelId,
      hasLabelSlot: this.hasLabelSlot,
      helpText: this.helpText,
      helpTextId: this.helpTextId,
      hasHelpTextSlot: this.hasHelpTextSlot
    }))}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          ></textarea>
        </div>
      `);
  }
};
SlTextarea.styles = textarea_styles_default;
__decorateClass([
  i(".textarea__control")
], SlTextarea.prototype, "input", 2);
__decorateClass([
  t()
], SlTextarea.prototype, "hasFocus", 2);
__decorateClass([
  t()
], SlTextarea.prototype, "hasHelpTextSlot", 2);
__decorateClass([
  t()
], SlTextarea.prototype, "hasLabelSlot", 2);
__decorateClass([
  e({ reflect: true })
], SlTextarea.prototype, "size", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "name", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "filled", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "label", 2);
__decorateClass([
  e({ attribute: "help-text" })
], SlTextarea.prototype, "helpText", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "placeholder", 2);
__decorateClass([
  e({ type: Number })
], SlTextarea.prototype, "rows", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "resize", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "readonly", 2);
__decorateClass([
  e({ type: Number })
], SlTextarea.prototype, "minlength", 2);
__decorateClass([
  e({ type: Number })
], SlTextarea.prototype, "maxlength", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "pattern", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "required", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTextarea.prototype, "invalid", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "autocapitalize", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "autocorrect", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "autocomplete", 2);
__decorateClass([
  e({ type: Boolean })
], SlTextarea.prototype, "autofocus", 2);
__decorateClass([
  e({ type: Boolean })
], SlTextarea.prototype, "spellcheck", 2);
__decorateClass([
  e()
], SlTextarea.prototype, "inputmode", 2);
__decorateClass([
  watch("disabled")
], SlTextarea.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("rows")
], SlTextarea.prototype, "handleRowsChange", 1);
__decorateClass([
  watch("helpText"),
  watch("label")
], SlTextarea.prototype, "handleSlotChange", 1);
__decorateClass([
  watch("value")
], SlTextarea.prototype, "handleValueChange", 1);
SlTextarea = __decorateClass([
  n("sl-textarea")
], SlTextarea);

export {
  SlTextarea
};
