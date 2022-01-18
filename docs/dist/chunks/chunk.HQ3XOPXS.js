import {
  SlDialog
} from "./chunk.KKY3RAMQ.js";

// src/react/dialog/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var dialog_default = createComponent(React, "sl-dialog", SlDialog, {
  onSlShow: "sl-show",
  onSlAfterShow: "sl-after-show",
  onSlHide: "sl-hide",
  onSlAfterHide: "sl-after-hide",
  onSlInitialFocus: "sl-initial-focus",
  onSlRequestClose: "sl-request-close",
  onSlResizePositionBefore: "sl-resize-position-before",
  onSlResizePosition: "sl-resize-position"
});

export {
  dialog_default
};
