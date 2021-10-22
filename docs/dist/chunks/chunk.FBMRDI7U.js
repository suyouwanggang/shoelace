import {
  r,
  s
} from "./chunk.Q2PLIRNK.js";
import {
  e,
  i,
  t
} from "./chunk.E2OEF7AF.js";
import {
  T,
  b
} from "./chunk.AXN6W67E.js";

// node_modules/lit/node_modules/lit-html/directives/live.js
var l = e(class extends i {
  constructor(r2) {
    if (super(r2), r2.type !== t.PROPERTY && r2.type !== t.ATTRIBUTE && r2.type !== t.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r(r2))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r2) {
    return r2;
  }
  update(i2, [t2]) {
    if (t2 === b || t2 === T)
      return t2;
    const o = i2.element, l2 = i2.name;
    if (i2.type === t.PROPERTY) {
      if (t2 === o[l2])
        return b;
    } else if (i2.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o.hasAttribute(l2))
        return b;
    } else if (i2.type === t.ATTRIBUTE && o.getAttribute(l2) === t2 + "")
      return b;
    return s(i2), t2;
  }
});

export {
  l
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
