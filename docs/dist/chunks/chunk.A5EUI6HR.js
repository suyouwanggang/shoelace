import {
  component_styles_default
} from "./chunk.YU3YC5PN.js";
import {
  r
} from "./chunk.KOO6UQJ3.js";

// src/components/tooltip/tooltip.styles.ts
var tooltip_styles_default = r`
  ${component_styles_default}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip-content {
    display: contents;
  }

  .tooltip-positioner {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    pointer-events: none;
  }

  .tooltip {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
  }
  .tooltip--open{
     border:var(--sl-tooltip-border);
     box-shadow:var(--sl-tooltip-box-shadow);
  }
  :host([type=blank]){
    --sl-tooltip-background-color: #FFF;
    --sl-tooltip-color: #333;
  }
  :host([type='primary']) {
    --sl-tooltip-background-color: var(--sl-color-primary-500);
    --sl-tooltip-color: var(--sl-color-neutral-1000);
  }

  :host([type='success']) {
    --sl-tooltip-background-color: var(--sl-color-success-500);
    --sl-tooltip-color: var(--sl-color-neutral-1000);
  }

  :host([type='warning']) {
    --sl-tooltip-background-color: var(--sl-color-warning-500);
    --sl-tooltip-color: var(--sl-color-neutral-1000);
  }
  :host([type='danger']) {
    --sl-tooltip-background-color: var(--sl-color-danger-500);
    --sl-tooltip-color: var(--sl-color-neutral-1000);
  }

  .tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    z-index:1;
  }

  .tooltip-positioner[data-popper-placement^='top'] .tooltip {
    transform-origin: bottom;
  }

  .tooltip-positioner[data-popper-placement^='bottom'] .tooltip {
    transform-origin: top;
  }

  .tooltip-positioner[data-popper-placement^='left'] .tooltip {
    transform-origin: right;
  }

  .tooltip-positioner[data-popper-placement^='right'] .tooltip {
    transform-origin: left;
  }

  /* Arrow + bottom */
  .tooltip-positioner[data-popper-placement^='bottom'] .tooltip:after {
    bottom: 100%;
    left: calc(50% - var(--sl-tooltip-arrow-size));
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='bottom-start'] .tooltip:after {
    left: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='bottom-end'] .tooltip:after {
    right: var(--sl-tooltip-arrow-start-end-offset);
    left: auto;
  }

  /* Arrow + top */
  .tooltip-positioner[data-popper-placement^='top'] .tooltip:after {
    top: 100%;
    left: calc(50% - var(--sl-tooltip-arrow-size));
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='top-start'] .tooltip:after {
    left: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='top-end'] .tooltip:after {
    right: var(--sl-tooltip-arrow-start-end-offset);
    left: auto;
  }

  /* Arrow + left */
  .tooltip-positioner[data-popper-placement^='left'] .tooltip:after {
    top: calc(50% - var(--sl-tooltip-arrow-size));
    left: 100%;
    border-left: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-top: var(--sl-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='left-start'] .tooltip:after {
    top: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='left-end'] .tooltip:after {
    top: auto;
    bottom: var(--sl-tooltip-arrow-start-end-offset);
  }

  /* Arrow + right */
  .tooltip-positioner[data-popper-placement^='right'] .tooltip:after {
    top: calc(50% - var(--sl-tooltip-arrow-size));
    right: 100%;
    border-right: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-top: var(--sl-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='right-start'] .tooltip:after {
    top: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='right-end'] .tooltip:after {
    top: auto;
    bottom: var(--sl-tooltip-arrow-start-end-offset);
  }
`;

export {
  tooltip_styles_default
};