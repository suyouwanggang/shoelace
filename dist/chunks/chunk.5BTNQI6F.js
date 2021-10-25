import {
  tag_styles_default
} from "./chunk.437YGYE6.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/tag/tag.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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

        ${this.removable ? html` <sl-icon-button exportparts="base:remove-button" name="x" library="system" class="tag__remove" @click=${this.handleRemoveClick}></sl-icon-button> ` : ""}
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

export {
  SlTag
};
