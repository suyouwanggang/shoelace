import {
  visually_hidden_styles_default
} from "./chunk.EKUCAWXV.js";
import {
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/visually-hidden/visually-hidden.ts
var SlVisuallyHidden = class extends s {
  render() {
    return $` <slot></slot> `;
  }
};
SlVisuallyHidden.styles = visually_hidden_styles_default;
SlVisuallyHidden = __decorateClass([
  n("sl-visually-hidden")
], SlVisuallyHidden);

export {
  SlVisuallyHidden
};
