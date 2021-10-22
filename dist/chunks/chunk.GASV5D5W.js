import {
  e,
  i,
  t
} from "./chunk.E2OEF7AF.js";
import {
  b
} from "./chunk.AXN6W67E.js";

// node_modules/lit/node_modules/lit-html/directives/style-map.js
var i2 = e(class extends i {
  constructor(t2) {
    var e2;
    if (super(t2), t2.type !== t.ATTRIBUTE || t2.name !== "style" || ((e2 = t2.strings) === null || e2 === void 0 ? void 0 : e2.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r) => {
      const s = t2[r];
      return s == null ? e2 : e2 + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(e2, [r]) {
    const { style: s } = e2.element;
    if (this.ut === void 0) {
      this.ut = new Set();
      for (const t2 in r)
        this.ut.add(t2);
      return this.render(r);
    }
    this.ut.forEach((t2) => {
      r[t2] == null && (this.ut.delete(t2), t2.includes("-") ? s.removeProperty(t2) : s[t2] = "");
    });
    for (const t2 in r) {
      const e3 = r[t2];
      e3 != null && (this.ut.add(t2), t2.includes("-") ? s.setProperty(t2, e3) : s[t2] = e3);
    }
    return b;
  }
});

export {
  i2 as i
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
