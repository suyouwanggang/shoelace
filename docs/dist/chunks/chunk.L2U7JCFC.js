import {
  gallery_default
} from "./chunk.BGTVBLBA.js";

// src/react/gallery/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var gallery_default2 = createComponent(React, "sl-gallery", gallery_default, {
  onSlGalleryBeforeChange: "sl-gallery-before-change",
  onSlGalleryChange: "sl-gallery-change",
  onSlGalleryImageLoad: "sl-gallery-image-load",
  onSlGalleryImageClick: "sl-gallery-image-click"
});

export {
  gallery_default2 as gallery_default
};
