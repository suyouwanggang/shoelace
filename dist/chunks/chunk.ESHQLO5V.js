import {
  dragHandler
} from "./chunk.JBNGIKRU.js";
import {
  splitter_styles_default
} from "./chunk.GYYDOQGK.js";
import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/splitter/splitter.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlSplitter = class extends LitElement {
  constructor() {
    super(...arguments);
    this.splitType = "left";
    this.splitAble = true;
    this.border = true;
  }
  changeSplitType(old, newType) {
    const exta = this.renderRoot.querySelector("div[part=exta]");
    if (exta) {
      if ((old == "left" || old == "right") && (newType == "top" || newType == "bottom")) {
        exta.style.flexBasis = "auto";
      }
      if ((newType == "left" || newType == "right") && (old == "top" || old == "bottom")) {
        exta.style.flexBasis = "auto";
      }
    }
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    const spliter = this.renderRoot.querySelector("div[part=spliter]");
    const exta = this.renderRoot.querySelector("div[part=exta]");
    const base = this.renderRoot.querySelector("div[part=base]");
    dragHandler(spliter, (change) => {
      if (!this.splitAble) {
        return;
      }
      let baseWidth = parseInt(getCssValue(base, "width"));
      let baseheight = parseInt(getCssValue(base, "height"));
      let type = this.splitType;
      let value;
      let width;
      let height;
      switch (type) {
        case "left":
          width = parseInt(getCssValue(exta, "width"));
          value = width + change.x;
          if (value > baseWidth) {
            value = baseWidth - 10;
          }
          break;
        case "right":
          width = parseInt(getCssValue(exta, "width"));
          value = width - change.x;
          if (value > baseWidth) {
            value = baseWidth - 10;
          }
          break;
        case "top":
          height = parseInt(getCssValue(exta, "height"));
          value = height + change.y;
          if (value > baseheight) {
            value = baseheight - 10;
          }
          break;
        case "bottom":
          height = parseInt(getCssValue(exta, "height"));
          value = height - change.y;
          if (value > baseheight) {
            value = baseheight - 10;
          }
          break;
      }
      if (this.minSize && value < this.minSize) {
        value = this.minSize;
      }
      if (this.maxSize && value > this.maxSize) {
        value = this.maxSize;
      }
      exta.style.flexBasis = value + "px";
      emit(this, "sl-splitter-change", {
        detail: {
          size: value
        }
      });
    });
  }
  render() {
    return html`<div part="base" class="base" type=${this.splitType}>
      <div part="exta">
        <slot name="exta"></slot>
      </div>
      <div part="spliter"></div>
      <div part="main"><slot></slot></div>
    </div> `;
  }
};
SlSplitter.styles = splitter_styles_default;
__decorateClass([
  property({ type: String, attribute: true })
], SlSplitter.prototype, "splitType", 2);
__decorateClass([
  property({ type: Boolean, attribute: "split-able" })
], SlSplitter.prototype, "splitAble", 2);
__decorateClass([
  property({ type: Number, attribute: "min-size", reflect: true })
], SlSplitter.prototype, "minSize", 2);
__decorateClass([
  property({ type: Number, attribute: "max-size", reflect: true })
], SlSplitter.prototype, "maxSize", 2);
__decorateClass([
  property({ type: Boolean, attribute: true })
], SlSplitter.prototype, "border", 2);
__decorateClass([
  watch("splitType", { waitUntilFirstUpdate: true })
], SlSplitter.prototype, "changeSplitType", 1);
SlSplitter = __decorateClass([
  customElement("sl-splitter")
], SlSplitter);

export {
  SlSplitter
};
