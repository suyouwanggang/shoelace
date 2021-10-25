import {
  avatar_styles_default
} from "./chunk.3XXCT5VO.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/avatar/avatar.ts
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var SlAvatar = class extends LitElement {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.shape = "circle";
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        aria-label=${this.alt}
      >
        ${this.initials ? html` <div part="initials" class="avatar__initials">${this.initials}</div> ` : html`
              <div part="icon" class="avatar__icon">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `}
        ${this.image && !this.hasError ? html` <img part="image" class="avatar__image" src="${this.image}" alt="" @error="${() => this.hasError = true}" /> ` : ""}
      </div>
    `;
  }
};
SlAvatar.styles = avatar_styles_default;
__decorateClass([
  state()
], SlAvatar.prototype, "hasError", 2);
__decorateClass([
  property()
], SlAvatar.prototype, "image", 2);
__decorateClass([
  property()
], SlAvatar.prototype, "alt", 2);
__decorateClass([
  property()
], SlAvatar.prototype, "initials", 2);
__decorateClass([
  property({ reflect: true })
], SlAvatar.prototype, "shape", 2);
SlAvatar = __decorateClass([
  customElement("sl-avatar")
], SlAvatar);

export {
  SlAvatar
};
