import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './formdata-event-polyfill';
export class FormSubmitController {
    constructor(host, options) {
        (this.host = host).addController(this);
        this.options = Object.assign({
            form: (input) => input.closest('form'),
            name: (input) => input.name,
            value: (input) => input.value,
            disabled: (input) => input.disabled,
            reportValidity: (input) => {
                return typeof input.reportValidity === 'function' ? input.reportValidity() : true;
            }
        }, options);
        this.handleFormData = this.handleFormData.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    hostConnected() {
        var _a;
        this.form = (_a = this.options) === null || _a === void 0 ? void 0 : _a.form(this.host);
        if (this.form) {
            this.form.addEventListener('formdata', this.handleFormData);
            this.form.addEventListener('submit', this.handleFormSubmit);
        }
    }
    hostDisconnected() {
        if (this.form) {
            this.form.removeEventListener('formdata', this.handleFormData);
            this.form.removeEventListener('submit', this.handleFormSubmit);
            this.form = undefined;
        }
    }
    handleFormData(event) {
        var _a, _b, _c;
        const disabled = (_a = this.options) === null || _a === void 0 ? void 0 : _a.disabled(this.host);
        const name = (_b = this.options) === null || _b === void 0 ? void 0 : _b.name(this.host);
        const value = (_c = this.options) === null || _c === void 0 ? void 0 : _c.value(this.host);
        if (!disabled && name && value !== undefined) {
            if (Array.isArray(value)) {
                value.map(val => event.formData.append(name, val));
            }
            else {
                event.formData.append(name, value);
            }
        }
    }
    handleFormSubmit(event) {
        var _a, _b;
        const form = this.form;
        const disabled = (_a = this.options) === null || _a === void 0 ? void 0 : _a.disabled(this.host);
        const reportValidity = (_b = this.options) === null || _b === void 0 ? void 0 : _b.reportValidity;
        if (form && !form.noValidate && !disabled && reportValidity && !reportValidity(this.host)) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
    submit() {
        // Calling form.submit() seems to bypass the submit event and constraint validation. Instead, we can inject a
        // native submit button into the form, click it, then remove it to simulate a standard form submission.
        const button = document.createElement('button');
        if (this.form) {
            button.type = 'submit';
            button.style.position = 'absolute';
            button.style.width = '0';
            button.style.height = '0';
            button.style.clip = 'rect(0 0 0 0)';
            button.style.clipPath = 'inset(50%)';
            button.style.overflow = 'hidden';
            button.style.whiteSpace = 'nowrap';
            this.form.append(button);
            button.click();
            button.remove();
        }
    }
}
export const renderFormControl = (props, input) => {
    const hasLabel = props.label ? true : !!props.hasLabelSlot;
    const hasHelpText = props.helpText ? true : !!props.hasHelpTextSlot;
    const form_able = props.form_able;
    if (!form_able) {
        return html `${input}`;
    }
    return html `
    <div
      part="form-control"
      class=${classMap({
        'form-control': true,
        'form-control--small': props.size === 'small',
        'form-control--medium': props.size === 'medium',
        'form-control--large': props.size === 'large',
        'form-control--has-label': hasLabel,
        'form-control--has-help-text': hasHelpText
    })}
    >
      <label
        part="label"
        id=${ifDefined(props.labelId)}
        class="form-control__label"
        for=${props.inputId}
        aria-hidden=${hasLabel ? 'false' : 'true'}
        @click=${(event) => (props.onLabelClick ? props.onLabelClick(event) : null)}
      >
        <slot name="label">${props.label}</slot>
      </label>

      <div class="form-control__input">${html `${input}`}</div>

      <div
        part="help-text"
        id=${ifDefined(props.helpTextId)}
        class="form-control__help-text"
        aria-hidden=${hasHelpText ? 'false' : 'true'}
      >
        <slot name="help-text">${props.helpText}</slot>
      </div>
    </div>
  `;
};
export function getLabelledBy(props) {
    const labelledBy = [
        props.label || props.hasLabelSlot ? props.labelId : '',
        props.helpText || props.hasHelpTextSlot ? props.helpTextId : ''
    ].filter(val => val);
    return labelledBy.join(' ') || undefined;
}
