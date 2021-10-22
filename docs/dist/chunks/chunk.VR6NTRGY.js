import {
  responsive_media_styles_default
} from "./chunk.6NFD57VK.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
  e,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/responsive-media/responsive-media.ts
var SlResponsiveMedia = class extends s {
  constructor() {
    super(...arguments);
    this.aspectRatio = "16:9";
    this.fit = "cover";
  }
  render() {
    const split = this.aspectRatio.split(":");
    const x = parseInt(split[0]);
    const y = parseInt(split[1]);
    const paddingBottom = x && y ? `${y / x * 100}%` : "0";
    return p`
      <div
        class=${o({
      "responsive-media": true,
      "responsive-media--cover": this.fit === "cover",
      "responsive-media--contain": this.fit === "contain"
    })}
        style="padding-bottom: ${paddingBottom}"
      >
        <slot></slot>
      </div>
    `;
  }
};
SlResponsiveMedia.styles = responsive_media_styles_default;
__decorateClass([
  e({ attribute: "aspect-ratio" })
], SlResponsiveMedia.prototype, "aspectRatio", 2);
__decorateClass([
  e()
], SlResponsiveMedia.prototype, "fit", 2);
SlResponsiveMedia = __decorateClass([
  n("sl-responsive-media")
], SlResponsiveMedia);

export {
  SlResponsiveMedia
};
