import {
  menu_label_styles_default
} from "./chunk.E23D6E4W.js";
import {
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/menu-label/menu-label.ts
var SlMenuLabel = class extends s {
  render() {
    return p`
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
