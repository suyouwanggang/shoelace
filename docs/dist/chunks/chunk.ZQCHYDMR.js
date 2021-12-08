import {
  component_styles_default
} from "./chunk.34CCKGOJ.js";
import {
  n
} from "./chunk.OPP7P5NL.js";
import {
  p,
  r,
  s
} from "./chunk.5BL2X74K.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/visually-hidden/visually-hidden.styles.ts
var visually_hidden_styles_default = r`
  ${component_styles_default}

  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;

// src/components/visually-hidden/visually-hidden.ts
var SlVisuallyHidden = class extends s {
  render() {
    return p` <slot></slot> `;
  }
};
SlVisuallyHidden.styles = visually_hidden_styles_default;
SlVisuallyHidden = __decorateClass([
  n("sl-visually-hidden")
], SlVisuallyHidden);
var visually_hidden_default = SlVisuallyHidden;

export {
  visually_hidden_default
};
