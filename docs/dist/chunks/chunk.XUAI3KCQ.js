import {
  avatar_styles_default
} from "./chunk.WLFZC7E7.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  e,
  n,
  t
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/avatar/avatar.ts
var SlAvatar = class extends s {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.shape = "circle";
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        role="img"
        aria-label=${this.label}
      >
        ${this.initials ? $` <div part="initials" class="avatar__initials">${this.initials}</div> ` : $`
              <div part="icon" class="avatar__icon" aria-hidden="true">
                <slot name="icon">
                  <sl-icon name="person-fill" library="system"></sl-icon>
                </slot>
              </div>
            `}
        ${this.image && !this.hasError ? $` <img part="image" class="avatar__image" src="${this.image}" alt="" @error="${() => this.hasError = true}" /> ` : ""}
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
], SlAvatar.prototype, "label", 2);
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
