import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/avatar/avatar.ts
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

// src/components/avatar/avatar.styles.ts
import { css } from "lit";
var avatar_styles_default = css`
  ${component_styles_default}

  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: rgb(var(--sl-color-neutral-400));
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: rgb(var(--sl-color-neutral-0));
    overflow: hidden;
    user-select: none;
    vertical-align: middle;
  }

  .avatar--circle {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// src/components/avatar/avatar.ts
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
var avatar_default = SlAvatar;

export {
  avatar_default
};
