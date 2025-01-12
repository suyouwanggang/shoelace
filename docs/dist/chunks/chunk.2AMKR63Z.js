import {
  LocalizeController
} from "./chunk.CCTU25PV.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/internal/number.ts
function formatBytes(bytes, options) {
  options = Object.assign({
    unit: "bytes",
    formatter: (number) => number.toLocaleString()
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
  const numString = options.formatter ? options.formatter(num) : num;
  const prefix = isNegative ? "-" : "";
  return `${prefix}${numString} ${units[i]}`;
}

// src/components/format-bytes/format-bytes.ts
var SlFormatBytes = class extends s {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.unit = "bytes";
  }
  render() {
    return formatBytes(this.value, {
      unit: this.unit,
      formatter: (num) => this.localize.number(num)
    });
  }
};
__decorateClass([
  e({ type: Number })
], SlFormatBytes.prototype, "value", 2);
__decorateClass([
  e()
], SlFormatBytes.prototype, "unit", 2);
__decorateClass([
  e()
], SlFormatBytes.prototype, "lang", 2);
SlFormatBytes = __decorateClass([
  n("sl-format-bytes")
], SlFormatBytes);

export {
  SlFormatBytes
};
