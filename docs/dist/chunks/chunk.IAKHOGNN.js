import {
  skeleton_styles_default
} from "./chunk.N5TGAMUE.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/skeleton/skeleton.ts
var SlSkeleton = class extends s {
  constructor() {
    super(...arguments);
    this.effect = "none";
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
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
  e()
], SlSkeleton.prototype, "effect", 2);
SlSkeleton = __decorateClass([
  n("sl-skeleton")
], SlSkeleton);

export {
  SlSkeleton
};
