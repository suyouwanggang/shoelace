import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/tag/tag.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

// src/components/tag/tag.styles.ts
import { css } from "lit";
var tag_styles_default = css`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Type modifiers
   */

  .tag--primary {
    background-color: rgb(var(--sl-color-primary-100));
    border-color: rgb(var(--sl-color-primary-200));
    color: rgb(var(--sl-color-primary-700));
  }

  .tag--success {
    background-color: rgb(var(--sl-color-success-100));
    border-color: rgb(var(--sl-color-success-200));
    color: rgb(var(--sl-color-success-700));
  }

  .tag--neutral {
    background-color: rgb(var(--sl-color-neutral-100));
    border-color: rgb(var(--sl-color-neutral-200));
    color: rgb(var(--sl-color-neutral-700));
  }

  .tag--warning {
    background-color: rgb(var(--sl-color-warning-100));
    border-color: rgb(var(--sl-color-warning-200));
    color: rgb(var(--sl-color-warning-700));
  }

  .tag--danger {
    background-color: rgb(var(--sl-color-danger-100));
    border-color: rgb(var(--sl-color-danger-200));
    color: rgb(var(--sl-color-danger-700));
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--small .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-3x-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-2x-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;

// src/components/tag/tag.ts
var SlTag = class extends LitElement {
  constructor() {
    super(...arguments);
    this.type = "neutral";
    this.size = "medium";
    this.pill = false;
    this.removable = false;
  }
  handleRemoveClick() {
    emit(this, "sl-remove");
  }
  render() {
    return html`
      <span
        part="base"
        class=${classMap({
      tag: true,
      "tag--primary": this.type === "primary",
      "tag--success": this.type === "success",
      "tag--neutral": this.type === "neutral",
      "tag--warning": this.type === "warning",
      "tag--danger": this.type === "danger",
      "tag--text": this.type === "text",
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      "tag--pill": this.pill,
      "tag--removable": this.removable
    })}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${this.removable ? html`
              <sl-icon-button
                exportparts="base:remove-button"
                name="x"
                library="system"
                class="tag__remove"
                @click=${this.handleRemoveClick}
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
  }
};
SlTag.styles = tag_styles_default;
__decorateClass([
  property({ reflect: true })
], SlTag.prototype, "type", 2);
__decorateClass([
  property({ reflect: true })
], SlTag.prototype, "size", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlTag.prototype, "pill", 2);
__decorateClass([
  property({ type: Boolean })
], SlTag.prototype, "removable", 2);
SlTag = __decorateClass([
  customElement("sl-tag")
], SlTag);
var tag_default = SlTag;

export {
  tag_default
};
