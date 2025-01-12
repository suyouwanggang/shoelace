import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  l
} from "./chunk.JVCXZKVY.js";
import {
  $
} from "./chunk.KOO6UQJ3.js";

// src/internal/formdata-event-polyfill.ts
var FormDataEventPolyfill = class extends Event {
  constructor(formData) {
    super("formdata");
    this.formData = formData;
  }
};
var FormDataPolyfill = class extends FormData {
  constructor(form) {
    super(form);
    this.form = form;
    form.dispatchEvent(new FormDataEventPolyfill(this));
  }
  append(name, value) {
    let input = this.form.elements[name];
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      this.form.appendChild(input);
    }
    if (this.has(name)) {
      const entries = this.getAll(name);
      const index = entries.indexOf(input.value);
      if (index !== -1) {
        entries.splice(index, 1);
      }
      entries.push(value);
      this.set(name, entries);
    } else {
      super.append(name, value);
    }
    input.value = value;
  }
};
function supportsFormDataEvent() {
  const form = document.createElement("form");
  let isSupported = false;
  document.body.append(form);
  form.addEventListener("submit", (event) => {
    new FormData(event.target);
    event.preventDefault();
  });
  form.addEventListener("formdata", () => isSupported = true);
  form.dispatchEvent(new Event("submit", { cancelable: true }));
  form.remove();
  return isSupported;
}
function polyfillFormData() {
  if (!window.FormData || supportsFormDataEvent()) {
    return;
  }
  window.FormData = FormDataPolyfill;
  window.addEventListener("submit", (event) => {
    if (!event.defaultPrevented) {
      new FormData(event.target);
    }
  });
}
polyfillFormData();

// src/internal/form-control.ts
var FormSubmitController = class {
  constructor(host, options) {
    (this.host = host).addController(this);
    this.options = Object.assign({
      form: (input) => input.closest("form"),
      name: (input) => input.name,
      value: (input) => input.value,
      disabled: (input) => input.disabled,
      reportValidity: (input) => {
        return typeof input.reportValidity === "function" ? input.reportValidity() : true;
      }
    }, options);
    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  hostConnected() {
    var _a;
    this.form = (_a = this.options) == null ? void 0 : _a.form(this.host);
    if (this.form) {
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
    }
  }
  hostDisconnected() {
    if (this.form) {
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form = void 0;
    }
  }
  handleFormData(event) {
    var _a, _b, _c;
    const disabled = (_a = this.options) == null ? void 0 : _a.disabled(this.host);
    const name = (_b = this.options) == null ? void 0 : _b.name(this.host);
    const value = (_c = this.options) == null ? void 0 : _c.value(this.host);
    if (!disabled && name && value !== void 0) {
      if (Array.isArray(value)) {
        value.map((val) => event.formData.append(name, val));
      } else {
        event.formData.append(name, value);
      }
    }
  }
  handleFormSubmit(event) {
    var _a, _b;
    const form = this.form;
    const disabled = (_a = this.options) == null ? void 0 : _a.disabled(this.host);
    const reportValidity = (_b = this.options) == null ? void 0 : _b.reportValidity;
    if (form && !form.noValidate && !disabled && reportValidity && !reportValidity(this.host)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  submit() {
    const button = document.createElement("button");
    if (this.form) {
      button.type = "submit";
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clip = "rect(0 0 0 0)";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
};
var renderFormControl = (props, input) => {
  const hasLabel = props.label ? true : !!props.hasLabelSlot;
  const hasHelpText = props.helpText ? true : !!props.hasHelpTextSlot;
  const form_able = props.form_able;
  if (!form_able) {
    return $`${input}`;
  }
  return $`
    <div
      part="form-control"
      class=${o({
    "form-control": true,
    "form-control--small": props.size === "small",
    "form-control--medium": props.size === "medium",
    "form-control--large": props.size === "large",
    "form-control--has-label": hasLabel,
    "form-control--has-help-text": hasHelpText
  })}
    >
      <label
        part="label"
        id=${l(props.labelId)}
        class="form-control__label"
        for=${props.inputId}
        aria-hidden=${hasLabel ? "false" : "true"}
        @click=${(event) => props.onLabelClick ? props.onLabelClick(event) : null}
      >
        <slot name="label">${props.label}</slot>
      </label>

      <div class="form-control__input">${$`${input}`}</div>

      <div
        part="help-text"
        id=${l(props.helpTextId)}
        class="form-control__help-text"
        aria-hidden=${hasHelpText ? "false" : "true"}
      >
        <slot name="help-text">${props.helpText}</slot>
      </div>
    </div>
  `;
};
function getLabelledBy(props) {
  const labelledBy = [
    props.label || props.hasLabelSlot ? props.labelId : "",
    props.helpText || props.hasHelpTextSlot ? props.helpTextId : ""
  ].filter((val) => val);
  return labelledBy.join(" ") || void 0;
}

export {
  FormSubmitController,
  renderFormControl,
  getLabelledBy
};
