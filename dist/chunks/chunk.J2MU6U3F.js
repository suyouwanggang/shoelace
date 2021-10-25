import {
  qr_code_styles_default
} from "./chunk.U6RMZBHN.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/qr-code/qr-code.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import QrCreator from "qr-creator";
var SlQrCode = class extends LitElement {
  constructor() {
    super(...arguments);
    this.value = "";
    this.label = "";
    this.size = 128;
    this.fill = "#000";
    this.background = "#fff";
    this.radius = 0;
    this.errorCorrection = "H";
  }
  firstUpdated() {
    this.generate();
  }
  generate() {
    if (!this.hasUpdated) {
      return;
    }
    QrCreator.render({
      text: this.value,
      radius: this.radius,
      ecLevel: this.errorCorrection,
      fill: this.fill,
      background: this.background === "transparent" ? null : this.background,
      size: this.size * 2
    }, this.canvas);
  }
  render() {
    return html`
      <div
        class="qr-code"
        part="base"
        style=${styleMap({
      width: `${this.size}px`,
      height: `${this.size}px`
    })}
      >
        <canvas role="img" aria-label=${this.label || this.value}></canvas>
      </div>
    `;
  }
};
SlQrCode.styles = qr_code_styles_default;
__decorateClass([
  query("canvas")
], SlQrCode.prototype, "canvas", 2);
__decorateClass([
  property()
], SlQrCode.prototype, "value", 2);
__decorateClass([
  property()
], SlQrCode.prototype, "label", 2);
__decorateClass([
  property({ type: Number })
], SlQrCode.prototype, "size", 2);
__decorateClass([
  property()
], SlQrCode.prototype, "fill", 2);
__decorateClass([
  property()
], SlQrCode.prototype, "background", 2);
__decorateClass([
  property({ type: Number })
], SlQrCode.prototype, "radius", 2);
__decorateClass([
  property({ attribute: "error-correction" })
], SlQrCode.prototype, "errorCorrection", 2);
__decorateClass([
  watch("background"),
  watch("errorCorrection"),
  watch("fill"),
  watch("radius"),
  watch("size"),
  watch("value")
], SlQrCode.prototype, "generate", 1);
SlQrCode = __decorateClass([
  customElement("sl-qr-code")
], SlQrCode);

export {
  SlQrCode
};
