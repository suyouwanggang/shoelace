import {
  component_styles_default
} from "./chunk.YU3YC5PN.js";
import {
  r
} from "./chunk.KOO6UQJ3.js";

// src/components/layout/index.litcss
var styles = r`:host{display:flex !important;flex-direction:row}:host([row]){flex-direction:row}:host([column]){flex-direction:column}:host([expand]){flex:1}:host([center]){justify-content:center;align-items:center}`;
var layout_default = styles;

// src/components/layout/layout.styles.ts
var layout_styles_default = r`
  ${component_styles_default}
  ${layout_default}
`;

export {
  layout_styles_default
};
