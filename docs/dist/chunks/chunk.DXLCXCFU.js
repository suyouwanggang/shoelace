import {
  splitter_styles_default
} from "./chunk.BNLWMYNP.js";
import {
  isNumberWidth
} from "./chunk.7XFZEBHP.js";
import {
  dragHandler
} from "./chunk.JBNGIKRU.js";
import {
  i
} from "./chunk.H55UERJW.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/splitter/splitter.ts
var SlSplitter = class extends s {
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
      exta.style.flexBasis = value + "px";
      emit(this, "sl-splitter-change", {
        detail: {
          size: value
        }
      });
    });
  }
  _getExtaStyle() {
    const extaStyle = {};
    if (this.minSize) {
      if (this.splitType == "bottom" || this.splitType == "top") {
        extaStyle["min-height"] = isNumberWidth(this.minSize) ? this.minSize + "px" : this.minSize;
      }
      if (this.splitType == "left" || this.splitType == "right") {
        extaStyle["min-width"] = isNumberWidth(this.minSize) ? this.minSize + "px" : this.minSize;
      }
    }
    if (this.maxSize) {
      if (this.splitType == "bottom" || this.splitType == "top") {
        extaStyle["max-height"] = isNumberWidth(this.maxSize) ? this.maxSize + "px" : this.maxSize;
      }
      if (this.splitType == "left" || this.splitType == "right") {
        extaStyle["max-width"] = isNumberWidth(this.maxSize) ? this.maxSize + "px" : this.maxSize;
      }
    }
    return extaStyle;
  }
  render() {
    return $`<div part="base" class="base" type=${this.splitType}>
      <div part="exta" style=${i(this._getExtaStyle())}>
        <slot name="exta"></slot>
      </div>
      <div part="spliter"></div>
      <div part="main"><slot></slot></div>
    </div> `;
  }
};
SlSplitter.styles = splitter_styles_default;
__decorateClass([
  e({ type: String, attribute: true })
], SlSplitter.prototype, "splitType", 2);
__decorateClass([
  e({ type: Boolean, attribute: "split-able" })
], SlSplitter.prototype, "splitAble", 2);
__decorateClass([
  e({ type: String, attribute: "min-size", reflect: true })
], SlSplitter.prototype, "minSize", 2);
__decorateClass([
  e({ type: String, attribute: "max-size", reflect: true })
], SlSplitter.prototype, "maxSize", 2);
__decorateClass([
  e({ type: Boolean, attribute: true })
], SlSplitter.prototype, "border", 2);
__decorateClass([
  watch("splitType", { waitUntilFirstUpdate: true })
], SlSplitter.prototype, "changeSplitType", 1);
SlSplitter = __decorateClass([
  n("sl-splitter")
], SlSplitter);

export {
  SlSplitter
};
