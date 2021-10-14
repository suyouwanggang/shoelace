import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/responsive-media/responsive-media.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

// src/components/responsive-media/responsive-media.styles.ts
import { css } from "lit";
var responsive_media_styles_default = css`
  ${component_styles_default}

  :host {
    display: block;
  }

  .responsive-media {
    position: relative;
  }

  .responsive-media ::slotted(*) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  .responsive-media--cover ::slotted(embed),
  .responsive-media--cover ::slotted(iframe),
  .responsive-media--cover ::slotted(img),
  .responsive-media--cover ::slotted(video) {
    object-fit: cover !important;
  }

  .responsive-media--contain ::slotted(embed),
  .responsive-media--contain ::slotted(iframe),
  .responsive-media--contain ::slotted(img),
  .responsive-media--contain ::slotted(video) {
    object-fit: contain !important;
  }
`;

// src/components/responsive-media/responsive-media.ts
var SlResponsiveMedia = class extends LitElement {
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
    return html`
      <div
        class=${classMap({
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
  property({ attribute: "aspect-ratio" })
], SlResponsiveMedia.prototype, "aspectRatio", 2);
__decorateClass([
  property()
], SlResponsiveMedia.prototype, "fit", 2);
SlResponsiveMedia = __decorateClass([
  customElement("sl-responsive-media")
], SlResponsiveMedia);
var responsive_media_default = SlResponsiveMedia;

export {
  responsive_media_default
};
