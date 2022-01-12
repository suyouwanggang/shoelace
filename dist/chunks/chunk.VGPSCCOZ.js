import {
  SlRadio
} from "./chunk.RA3V25LP.js";

// src/react/radio/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var radio_default = createComponent(React, "sl-radio", SlRadio, {
  onSlBlur: "sl-blur",
  onSlChange: "sl-change",
  onSlFocus: "sl-focus"
});

export {
  radio_default
};
