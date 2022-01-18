import {
  component_styles_default
} from "./chunk.YU3YC5PN.js";
import {
  r
} from "./chunk.KOO6UQJ3.js";

// src/components/ripple/index.litcss
var styles = r`:host{position:relative;outline:0;display:inline-flex;align-items:center;user-select:none}:host(:not([unbounded])){overflow:hidden}:host([overlay]){position:absolute;top:50%;left:50%;width:100%;height:100%;border-radius:inherit;transform:translate(-50%,-50%)}.ripple{background:var(--ripple-color,currentcolor);opacity:var(--ripple-opacity,0.15);border-radius:100%;pointer-events:none;will-change:opacity,transform}`;
var ripple_default = styles;

// src/components/ripple/ripple.styles.ts
var ripple_styles_default = r`
  ${component_styles_default}
  ${ripple_default}
`;

export {
  ripple_styles_default
};
