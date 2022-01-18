import {
  SlGallery
} from "./chunk.HI3O4OEB.js";

// src/react/gallery/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var gallery_default = createComponent(React, "sl-gallery", SlGallery, {
  onSlGalleryBeforeChange: "sl-gallery-before-change",
  onSlGalleryChange: "sl-gallery-change",
  onSlGalleryImageLoad: "sl-gallery-image-load",
  onSlGalleryImageClick: "sl-gallery-image-click"
});

export {
  gallery_default
};
