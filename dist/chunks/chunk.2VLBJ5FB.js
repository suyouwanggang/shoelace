import {
  skeleton_styles_default
} from "./chunk.4HMIRKSU.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/skeleton/skeleton.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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

export {
  SlSkeleton
};
