import {
  SlRouter
} from "./chunk.YLPUMYB3.js";

// src/react/router/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var router_default = createComponent(React, "sl-router", SlRouter, {
  onHashRouterBefore: "hash-router-before",
  onHashRouterAfter: "hash-router-after",
  onHashPrevented: "hash-prevented",
  onNotFound: "not-found"
});

export {
  router_default
};
