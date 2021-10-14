import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/format-bytes/format-bytes.ts
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/internal/number.ts
function formatBytes(bytes, options) {
  options = Object.assign({
    unit: "bytes",
    locale: void 0
  }, options);
  const byteUnits = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const bitUnits = ["b", "kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"];
  const units = options.unit === "bytes" ? byteUnits : bitUnits;
  const isNegative = bytes < 0;
  bytes = Math.abs(bytes);
  if (bytes === 0)
    return "0 B";
  const i = Math.min(Math.floor(Math.log10(bytes) / 3), units.length - 1);
  const num = Number((bytes / Math.pow(1e3, i)).toPrecision(3));
  const numString = num.toLocaleString(options.locale);
  const prefix = isNegative ? "-" : "";
  return `${prefix}${numString} ${units[i]}`;
}

// src/components/format-bytes/format-bytes.ts
var SlFormatBytes = class extends LitElement {
  constructor() {
    super(...arguments);
    this.value = 0;
    this.unit = "bytes";
  }
  render() {
    return formatBytes(this.value, {
      unit: this.unit,
      locale: this.locale
    });
  }
};
__decorateClass([
  property({ type: Number })
], SlFormatBytes.prototype, "value", 2);
__decorateClass([
  property()
], SlFormatBytes.prototype, "unit", 2);
__decorateClass([
  property()
], SlFormatBytes.prototype, "locale", 2);
SlFormatBytes = __decorateClass([
  customElement("sl-format-bytes")
], SlFormatBytes);
var format_bytes_default = SlFormatBytes;

export {
  format_bytes_default
};
