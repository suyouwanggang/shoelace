import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { FormSubmitController } from '../../internal/form-control';
import { isArray, isObject } from '../../utilities/common';
import '../ripple/ripple';
import SlRipple from '../ripple/ripple';
import styles from './checkbox.styles';
import { HasSlotController } from '../../internal/slot';

let id = 0;

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The checkbox's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-before-change - Emitted before  the control's checked state changes,user can cancel default.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The checkbox control.
 * @csspart checked-icon - The container the wraps the checked icon.
 * @csspart indeterminate-icon - The container that wraps the indeterminate icon.
 * @csspart label - The checkbox label.
 */
@customElement('sl-checkbox')
export default class SlCheckbox extends LitElement {
  static styles = styles;

  @query('input[type="checkbox"]') input: HTMLInputElement;
  @query('sl-ripple') ripple: SlRipple;
  // @ts-ignore
  private formSubmitController = new FormSubmitController(this, {
    value: (control: SlCheckbox) => (control.checked ? control.value : undefined)
  });
  private hasSlotController = new HasSlotController(this, '[defaut]', 'label');
  private inputId = `checkbox-${++id}`;
  private labelId = `checkbox-label-${id}`;

  @state() private hasFocus = false;

  /** The checkbox's name attribute. */
  @property() name: string;

  /** The checkbox's value attribute. */
  @property() value: string | number | any;

  /** Disables the checkbox. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Draws the checkbox in an indeterminate state. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  @property({ type: String, reflect: true }) type: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' = 'primary';
  @property({ type: String, reflect: false, attribute: false }) shape: 'circle' | 'square' = 'square';

  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  /** Sets focus on the checkbox. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  handleClick() {
    const beforeCheck = emit(this, 'sl-before-change', {
      cancelable: true
    });
    if (!beforeCheck.defaultPrevented) {
      this.checked = !this.checked;
      this.indeterminate = false;
      this.ripple.showRipple();
      emit(this, 'sl-change');
    }
  }

  handleBlur() {
    this.hasFocus = false;
    emit(this, 'sl-blur');
  }

  @watch('disabled')
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  handleFocus() {
    this.hasFocus = true;
    emit(this, 'sl-focus');
  }

  @watch('checked', { waitUntilFirstUpdate: true })
  @watch('indeterminate', { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
  }

  render() {
    return html`
      <label
        part="base"
        class=${classMap({
          checkbox: true,
          'checkbox--checked': this.checked,
          'checkbox--disabled': this.disabled,
          'checkbox--focused': this.hasFocus,
          'checkbox--indeterminate': this.indeterminate
        })}
        for=${this.inputId}
      >
        <input
          id=${this.inputId}
          class="checkbox__input"
          type="checkbox"
          name=${ifDefined(this.name)}
          value=${isObject(this.value) || isArray(this.value) ? '' : ifDefined(this.value)}
          .indeterminate=${live(this.indeterminate)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="checkbox"
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        <sl-ripple unbounded centered id=${this.inputId + '_ripple'} .disabled=${this.disabled}>
          <span part="control" class="checkbox__control" shape=${this.shape}>
            ${this.checked
              ? html`
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
                `
              : ''}
            ${!this.checked && this.indeterminate
              ? html`
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
                `
              : ''}
          </span>
        </sl-ripple>
        <span part="label" id=${this.labelId} class="checkbox__label ${this.hasSlotController.test('default') ? 'checkbox_label_hasSlot' : ''}">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-checkbox': SlCheckbox;
  }
}
