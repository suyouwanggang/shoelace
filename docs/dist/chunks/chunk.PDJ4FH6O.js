import {
  tag_styles_default
} from "./chunk.GWD2SZVE.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/tag/tag.ts
var SlTag = class extends s {
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
    return p`
      <span
        part="base"
        class=${o({
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

        ${this.removable ? p` <sl-icon-button exportparts="base:remove-button" name="x" library="system" class="tag__remove" @click=${this.handleRemoveClick}></sl-icon-button> ` : ""}
      </span>
    `;
  }
};
SlTag.styles = tag_styles_default;
__decorateClass([
  e({ reflect: true })
], SlTag.prototype, "type", 2);
__decorateClass([
  e({ reflect: true })
], SlTag.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTag.prototype, "pill", 2);
__decorateClass([
  e({ type: Boolean })
], SlTag.prototype, "removable", 2);
SlTag = __decorateClass([
  n("sl-tag")
], SlTag);

export {
  SlTag
};
