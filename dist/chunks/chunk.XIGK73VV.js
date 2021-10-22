import {
  component_styles_default
} from "./chunk.UA53BYGW.js";
import {
  r
} from "./chunk.AXN6W67E.js";

// src/components/divider/divider.styles.ts
var divider_styles_default = r`
  ${component_styles_default}

  :host {
    --color: rgb(var(--sl-panel-border-color));
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) .menu-divider {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    height: 100%;
  }

  :host([vertical]) .menu-divider {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

export {
  divider_styles_default
};
