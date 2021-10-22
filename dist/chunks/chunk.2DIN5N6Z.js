import {
  focusVisibleSelector
} from "./chunk.YF566QN2.js";
import {
  component_styles_default
} from "./chunk.UA53BYGW.js";
import {
  r
} from "./chunk.AXN6W67E.js";

// src/components/checkbox/checkbox.styles.ts
var checkbox_styles_default = r`
  ${component_styles_default}

  :host {
    display: inline-block;
    --sl-checkbox-bg-color: var(--sl-color-primary-500);
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: rgb(var(--sl-input-color));
    vertical-align: middle;
    cursor: pointer;
  }
  /** type primary,neutral, success,danger,warning,dark  */

  :host([type='primary']) {
    --sl-checkbox-bg-color: var(--sl-color-primary-500);
  }
  :host([type='success']) {
    --sl-checkbox-bg-color: var(--sl-color-success-500);
  }
  :host([type='danger']) {
    --sl-checkbox-bg-color: var(--sl-color-danger-500);
  }
  :host([type='warning']) {
    --sl-checkbox-bg-color: var(--sl-color-warning-500);
  }
  :host([type='neutral']) {
    --sl-checkbox-bg-color: var(--sl-color-neutral-500);
  }
  sl-ripple {
    padding: 3px;
  }
  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
    border: solid var(--sl-input-border-width) rgb(var(--sl-input-border-color));
    border-radius: 2px;
    background-color: rgb(var(--sl-input-background-color));
    color: rgb(var(--sl-color-neutral-0));
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color, var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }
  .checkbox__control[shape='circle'] {
    border-radius: 50%;
  }
  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__control .checkbox__icon {
    display: inline-flex;
    width: var(--sl-toggle-size);
    height: var(--sl-toggle-size);
  }

  .checkbox__control .checkbox__icon svg {
    width: 100%;
    height: 100%;
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: rgb(var(--sl-input-border-color-hover));
    background-color: rgb(var(--sl-input-background-color-hover));
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input${focusVisibleSelector} ~ .checkbox__control {
    border-color: rgb(var(--sl-input-border-color-focus));
    background-color: rgb(var(--sl-input-background-color-focus));
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: rgb(var(--sl-checkbox-bg-color));
    background-color: rgb(var(--sl-checkbox-bg-color));
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: rgb(var(--sl-checkbox-bg-color));
    background-color: rgb(var(--sl-checkbox-bg-color));
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input${focusVisibleSelector} ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input${focusVisibleSelector} ~ .checkbox__control {
    border-color: rgb(var(--sl-checkbox-bg-color));
    background-color: rgb(var(--sl-checkbox-bg-color));
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    line-height: var(--sl-toggle-size);
    user-select: none;
  }
  .checkbox_label_hasSlot {
    margin-left: calc(0.4em - 3px);
  }
`;

export {
  checkbox_styles_default
};
