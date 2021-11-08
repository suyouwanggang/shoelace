import {
  R
} from "./chunk.HHQFDLZX.js";

// node_modules/lit-html/directive-helpers.js
var { H: i } = R;
var v = (o, i2) => {
  var t, n;
  return i2 === void 0 ? ((t = o) === null || t === void 0 ? void 0 : t._$litType$) !== void 0 : ((n = o) === null || n === void 0 ? void 0 : n._$litType$) === i2;
};
var r = (o) => o.strings === void 0;
var e = () => document.createComment("");
var u = (o, t, n) => {
  var v2;
  const l = o._$AA.parentNode, d = t === void 0 ? o._$AB : t._$AA;
  if (n === void 0) {
    const t2 = l.insertBefore(e(), d), v3 = l.insertBefore(e(), d);
    n = new i(t2, v3, o, o.options);
  } else {
    const i2 = n._$AB.nextSibling, t2 = n._$AM, r2 = t2 !== o;
    if (r2) {
      let i3;
      (v2 = n._$AQ) === null || v2 === void 0 || v2.call(n, o), n._$AM = o, n._$AP !== void 0 && (i3 = o._$AU) !== t2._$AU && n._$AP(i3);
    }
    if (i2 !== d || r2) {
      let o2 = n._$AA;
      for (; o2 !== i2; ) {
        const i3 = o2.nextSibling;
        l.insertBefore(o2, d), o2 = i3;
      }
    }
  }
  return n;
};
var c = (o, i2, t = o) => (o._$AI(i2, t), o);
var f = {};
var s = (o, i2 = f) => o._$AH = i2;
var a = (o) => o._$AH;
var m = (o) => {
  var i2;
  (i2 = o._$AP) === null || i2 === void 0 || i2.call(o, false, true);
  let t = o._$AA;
  const n = o._$AB.nextSibling;
  for (; t !== n; ) {
    const o2 = t.nextSibling;
    t.remove(), t = o2;
  }
};
var p = (o) => {
  o._$AR();
};

export {
  v,
  r,
  u,
  c,
  s,
  a,
  m,
  p
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
