import {
  component_styles_default
} from "./chunk.YU3YC5PN.js";
import {
  r
} from "./chunk.KOO6UQJ3.js";

// src/components/row/index.litcss
var styles = r`:host{display:grid;grid-template-columns:repeat(var(--sl-row-columns),1fr);grid-gap:var(--sl-row-grap,0)}`;
var row_default = styles;

// src/components/row/row.styles.ts
var row_styles_default = r`
  ${component_styles_default}
  ${row_default}
`;

export {
  row_styles_default
};
