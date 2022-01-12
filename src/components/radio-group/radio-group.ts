import { html, LitElement, PropertyValues } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { onEvent } from '../../utilities/common';
import { DisposeObject } from '../../utilities/resize.util';

import type SlRadio from '../radio/radio';
import styles from './radio-group.styles';

/**
 * @since 2.0
 * @status stable
 * @event sl-check-change - Emitted when the radio selected changed.
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The radio group label.
 */
@customElement('sl-radio-group')
export default class SlRadioGroup extends LitElement {
  static styles = styles;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  @property() label = '';

  /** Shows the fieldset and legend that surrounds the radio group. */
  @property({ type: Boolean, attribute: 'fieldset' }) fieldset = false;

  /**  选中值 */
  @property({ type: Object }) value: unknown;

  handleFocusIn() {
    // When tabbing into the fieldset, make sure it lands on the checked radio
    requestAnimationFrame(() => {
      const checkedRadio = [...this.defaultSlot.assignedElements({ flatten: true })].find(
        el => el.tagName.toLowerCase() === 'sl-radio' && (el as SlRadio).checked
      ) as SlRadio;

      if (checkedRadio) {
        checkedRadio.focus();
      }
    });
  }
  get allRadios() {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter(el => el.tagName.toLowerCase() === 'sl-radio') as SlRadio[];
  }
  @watch('value', { waitUntilFirstUpdate: true })
  valueChange() {
    const checkedRadio = this.allRadios;
    checkedRadio.forEach(item => {
      if (item.value == this.value) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  }
  private _eventHandler: DisposeObject;
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    if (this.value) {
      this.valueChange();
    } else {
      const checkedRadio = this.allRadios;
      checkedRadio.forEach(item => {
        if (item.checked) {
          this.value = item.value;
          return;
        }
      });
    }
    this._eventHandler = onEvent(this, 'sl-radio', 'sl-change', (event: Event) => {
      let radio = event.delegateTarget as SlRadio;
      let group = radio.closest('sl-radio-group');
      if (group == this) {
        this.value = radio.value;
        emit(this, 'sl-check-change');
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
    return html`
      <fieldset
        part="base"
        class=${classMap({
          'radio-group': true,
          'radio-group--has-fieldset': this.fieldset
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
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-radio-group': SlRadioGroup;
  }
}
