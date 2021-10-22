import {
  component_styles_default
} from "./chunk.UA53BYGW.js";
import {
  r
} from "./chunk.AXN6W67E.js";

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
