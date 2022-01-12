import {
  menu_label_styles_default
} from "./chunk.EV3BHDA2.js";
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

// src/components/menu-label/menu-label.ts
var SlMenuLabel = class extends s {
  render() {
    return $`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `;
  }
};
SlMenuLabel.styles = menu_label_styles_default;
SlMenuLabel = __decorateClass([
  n("sl-menu-label")
], SlMenuLabel);

export {
  SlMenuLabel
};
