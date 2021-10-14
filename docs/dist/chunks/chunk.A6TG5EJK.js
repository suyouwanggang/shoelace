import {
  dragHandler
} from "./chunk.L5TP2MIU.js";
import {
  getCssValue
} from "./chunk.UYG3ZEVK.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
import {
  e,
  n as n2
} from "./chunk.OPP7P5NL.js";
import {
  n,
  r,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/splitter/index.litcss
var styles = r`:host{display:block;--sl-split-width:2px;--sl-split-hover-color:var(--sl-color-neutral-200);border:1px solid rgb(var(--sl-color-neutral-200));--sl-split-body-padding:var(--sl-spacing-x-small)}div[part=spliter]{background-color:#FFF;transition:background-color .2ms cubic-bezier(0.075,0.82,0.165,1);flex:0 0 auto}div[part=spliter]:hover,div[part=spliter]:focus-visible{background-color:rgb(var(--sl-split-hover-color))}div[part=main]{padding:var(--sl-split-body-padding);flex:1 0 auto;overflow:auto}div[part=exta]{flex:0 0 auto;overflow:auto}div[part=base]{width:100%;height:100%;display:flex;overflow:hidden}div[part=base][type=left] div[part=exta]{order:0}div[part=base][type=left] div[part=spliter]{width:var(--sl-split-width);border-left:solid 1px rgb(var(--sl-color-neutral-200));order:1;cursor:w-resize}div[part=base][type=left] div[part=main]{order:2;flex:1 1 auto}div[part=base][type=right] div[part=exta]{order:2}div[part=base][type=right] div[part=spliter]{width:var(--sl-split-width);border-left:solid 1px rgb(var(--sl-color-neutral-200));order:1;cursor:w-resize}div[part=base][type=right] div[part=main]{order:0;flex:1 1 auto}div[part=base][type=top]{flex-direction:column}div[part=base][type=top] div[part=exta]{order:0}div[part=base][type=top] div[part=spliter]{flex-basis:var(--sl-split-width);border-top:solid 1px rgb(var(--sl-color-neutral-200));order:1;cursor:n-resize}div[part=base][type=top] div[part=main]{order:2}div[part=base][type=bottom]{flex-direction:column}div[part=base][type=bottom] div[part=exta]{flex:0 0 auto;order:2}div[part=base][type=bottom] div[part=spliter]{border-top:solid 1px rgb(var(--sl-color-neutral-200));flex-basis:var(--sl-split-width);flex:0 0 auto;order:1;cursor:n-resize}div[part=base][type=bottom] div[part=main]{flex:1 1 auto;order:0}`;
var splitter_default = styles;

// src/components/splitter/splitter.styles.ts
var splitter_styles_default = r`
  ${component_styles_default}
  ${splitter_default}
`;

// src/components/splitter/splitter.ts
var SlSplitter = class extends n {
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
    return y`<div part="base" class="base" type=${this.splitType}>
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
  e({ type: String, attribute: true })
], SlSplitter.prototype, "splitType", 2);
__decorateClass([
  e({ type: Boolean, attribute: "split-able" })
], SlSplitter.prototype, "splitAble", 2);
__decorateClass([
  e({ type: Number, attribute: "min-size", reflect: true })
], SlSplitter.prototype, "minSize", 2);
__decorateClass([
  e({ type: Number, attribute: "max-size", reflect: true })
], SlSplitter.prototype, "maxSize", 2);
__decorateClass([
  e({ type: Boolean, attribute: true })
], SlSplitter.prototype, "border", 2);
__decorateClass([
  watch("splitType", { waitUntilFirstUpdate: true })
], SlSplitter.prototype, "changeSplitType", 1);
SlSplitter = __decorateClass([
  n2("sl-splitter")
], SlSplitter);
var splitter_default2 = SlSplitter;

export {
  splitter_default2 as splitter_default
};
