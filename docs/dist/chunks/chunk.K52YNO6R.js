import {
  component_styles_default
} from "./chunk.YU3YC5PN.js";
import {
  r
} from "./chunk.KOO6UQJ3.js";

// src/components/tree/style.litcss
var styles = r`:host{position:relative;display:block;--tree-body-spacing:var(--sl-spacing-x-small);--tree-footer-spacing:var(--sl-spacing-xx-small)}div[part=base]{display:flex;position:relative;flex-direction:column}div[part=base] .modal{background-color:rgb(var(--sl-overlay-background-color)/var(--sl-overlay-opacity));position:absolute;width:100%;height:100%;z-index:10}div[part=base] .loading{position:absolute;left:50%;top:3em;width:3em;height:3em;margin-left:-1.5em;border-radius:50%;--track-color:rgb(var(--sl-color-neutral-500) / 15%);--indicator-color:rgb(var(--sl-color-primary-500));--stroke-width:4px;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}div[part=base] div[part=filter]{flex:0 0 auto;align-items:center}div[part=base] div[part=filter] sl-input{margin:5px 10px;width:98%}div[part=base] div[part=tree-body]{flex:1 1 auto;padding:var(--tree-body-spacing);overflow:auto}div[part=base].base-has-footer div[part=tree-footer]{display:flex}div[part=base] div[part=tree-footer]{display:none;flex:0 0 auto;align-items:center;justify-content:flex-end;padding:var(--tree-footer-spacing)}`;
var style_default = styles;

// src/components/tree/tree.styles.ts
var tree_styles_default = r`
  ${component_styles_default}
  ${style_default}
`;

export {
  tree_styles_default
};
