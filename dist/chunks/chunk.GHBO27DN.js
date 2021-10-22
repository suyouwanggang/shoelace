import {
  avatar_styles_default
} from "./chunk.TVP6UQ6Q.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
  e,
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

// src/components/avatar/avatar.ts
var SlAvatar = class extends s {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.shape = "circle";
  }
  render() {
    return p`
      <div
        part="base"
        class=${o({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        aria-label=${this.alt}
      >
        ${this.initials ? p` <div part="initials" class="avatar__initials">${this.initials}</div> ` : p`
              <div part="icon" class="avatar__icon">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `}
        ${this.image && !this.hasError ? p` <img part="image" class="avatar__image" src="${this.image}" alt="" @error="${() => this.hasError = true}" /> ` : ""}
      </div>
    `;
  }
};
SlAvatar.styles = avatar_styles_default;
__decorateClass([
  t()
], SlAvatar.prototype, "hasError", 2);
__decorateClass([
  e()
], SlAvatar.prototype, "image", 2);
__decorateClass([
  e()
], SlAvatar.prototype, "alt", 2);
__decorateClass([
  e()
], SlAvatar.prototype, "initials", 2);
__decorateClass([
  e({ reflect: true })
], SlAvatar.prototype, "shape", 2);
SlAvatar = __decorateClass([
  n("sl-avatar")
], SlAvatar);

export {
  SlAvatar
};
