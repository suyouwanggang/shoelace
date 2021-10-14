import {
  focusVisibleSelector
} from "./chunk.Y5UMS2H6.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/icon-button/icon-button.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

// src/components/icon-button/icon-button.styles.ts
import { css } from "lit";
var icon_button_styles_default = css`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: rgb(var(--sl-color-neutral-500));
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
    color: rgb(var(--sl-color-primary-500));
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: rgb(var(--sl-color-primary-600));
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button${focusVisibleSelector} {
    box-shadow: var(--sl-focus-ring);
  }
`;

// src/components/icon-button/icon-button.ts
var SlIconButton = class extends LitElement {
  constructor() {
    super(...arguments);
    this.label = "";
    this.disabled = false;
  }
  render() {
    const isLink = this.href ? true : false;
    const interior = html` <sl-icon name=${ifDefined(this.name)} library=${ifDefined(this.library)} src=${ifDefined(this.src)} aria-hidden="true"></sl-icon> `;
    return isLink ? html`
          <a
            ref=${(el) => this.button = el}
            part="base"
            class="icon-button"
            href=${ifDefined(this.href)}
            target=${ifDefined(this.target)}
            download=${ifDefined(this.download)}
            rel=${ifDefined(this.target ? "noreferrer noopener" : void 0)}
            role="button"
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-label="${this.label}"
            tabindex=${this.disabled ? "-1" : "0"}
          >
            ${interior}
          </a>
        ` : html`
          <button
            part="base"
            class=${classMap({
      "icon-button": true,
      "icon-button--disabled": this.disabled
    })}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${interior}
          </button>
        `;
  }
};
SlIconButton.styles = icon_button_styles_default;
__decorateClass([
  query("button")
], SlIconButton.prototype, "button", 2);
__decorateClass([
  property()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  property()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  property()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  property()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  property()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  property()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  property()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);
SlIconButton = __decorateClass([
  customElement("sl-icon-button")
], SlIconButton);
var icon_button_default = SlIconButton;

export {
  icon_button_default
};
