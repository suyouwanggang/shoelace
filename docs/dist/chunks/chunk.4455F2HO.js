import {
  SlTransfer
} from "./chunk.RWF3D5DC.js";

// src/react/transfer/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var transfer_default = createComponent(React, "sl-transfer", SlTransfer, {
  onSlFilterChange: "sl-filter-change",
  onSlTransferChange: "sl-transfer-change",
  onSlScrollItem: "sl-scroll-item"
});

export {
  transfer_default
};
