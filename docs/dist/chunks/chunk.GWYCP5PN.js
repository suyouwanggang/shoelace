import {
  icon_button_styles_default
} from "./chunk.U3UDNCU3.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/icon-button/icon-button.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
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

export {
  SlIconButton
};
