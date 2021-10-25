import {
  component_styles_default
} from "./chunk.L3YJYC74.js";

// src/components/divider/divider.styles.ts
import { css } from "lit";
var divider_styles_default = css`
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
