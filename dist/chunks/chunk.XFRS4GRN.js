import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/skeleton/skeleton.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

// src/components/skeleton/skeleton.styles.ts
import { css } from "lit";
var skeleton_styles_default = css`
  ${component_styles_default}

  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: rgb(var(--sl-color-neutral-200));
    --sheen-color: rgb(var(--sl-color-neutral-300));

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

// src/components/skeleton/skeleton.ts
var SlSkeleton = class extends LitElement {
  constructor() {
    super(...arguments);
    this.effect = "none";
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      skeleton: true,
      "skeleton--pulse": this.effect === "pulse",
      "skeleton--sheen": this.effect === "sheen"
    })}
        aria-busy="true"
        aria-live="polite"
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `;
  }
};
SlSkeleton.styles = skeleton_styles_default;
__decorateClass([
  property()
], SlSkeleton.prototype, "effect", 2);
SlSkeleton = __decorateClass([
  customElement("sl-skeleton")
], SlSkeleton);
var skeleton_default = SlSkeleton;

export {
  skeleton_default
};
