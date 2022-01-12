import {
  __spreadProps,
  __spreadValues
} from "./chunk.FHAP4LMI.js";

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n = (n2) => (e5) => typeof e5 == "function" ? ((n3, e6) => (window.customElements.define(n3, e6), e6))(n2, e5) : ((n3, e6) => {
  const { kind: t2, elements: i3 } = e6;
  return { kind: t2, elements: i3, finisher(e7) {
    window.customElements.define(n3, e7);
  } };
})(n2, e5);

// node_modules/@lit/reactive-element/decorators/property.js
var i = (i3, e5) => e5.kind === "method" && e5.descriptor && !("value" in e5.descriptor) ? __spreadProps(__spreadValues({}, e5), { finisher(n2) {
  n2.createProperty(e5.key, i3);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  typeof e5.initializer == "function" && (this[e5.key] = e5.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e5.key, i3);
} };
function e(e5) {
  return (n2, t2) => t2 !== void 0 ? ((i3, e6, n3) => {
    e6.constructor.createProperty(n3, i3);
  })(e5, n2, t2) : i(e5, n2);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t(t2) {
  return e(__spreadProps(__spreadValues({}, t2), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o = ({ finisher: e5, descriptor: t2 }) => (o2, n2) => {
  var r;
  if (n2 === void 0) {
    const n3 = (r = o2.originalKey) !== null && r !== void 0 ? r : o2.key, i3 = t2 != null ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return e5 != null && (i3.finisher = function(t3) {
      e5(t3, n3);
    }), i3;
  }
  {
    const r2 = o2.constructor;
    t2 !== void 0 && Object.defineProperty(o2, n2, t2(n2)), e5 == null || e5(r2, n2);
  }
};

// node_modules/@lit/reactive-element/decorators/event-options.js
function e2(e5) {
  return o({ finisher: (r, t2) => {
    Object.assign(r.prototype[t2], e5);
  } });
}

// node_modules/@lit/reactive-element/decorators/query.js
function i2(i3, n2) {
  return o({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n3;
      return (n3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i3)) !== null && n3 !== void 0 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return this[n3] === void 0 && (this[n3] = (t3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i3)) !== null && t3 !== void 0 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-all.js
function e3(e5) {
  return o({ descriptor: (r) => ({ get() {
    var r2, o2;
    return (o2 = (r2 = this.renderRoot) === null || r2 === void 0 ? void 0 : r2.querySelectorAll(e5)) !== null && o2 !== void 0 ? o2 : [];
  }, enumerable: true, configurable: true }) });
}

// node_modules/@lit/reactive-element/decorators/query-async.js
function e4(e5) {
  return o({ descriptor: (r) => ({ async get() {
    var r2;
    return await this.updateComplete, (r2 = this.renderRoot) === null || r2 === void 0 ? void 0 : r2.querySelector(e5);
  }, enumerable: true, configurable: true }) });
}

export {
  n,
  e,
  t,
  e2,
  i2 as i,
  e3,
  e4
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
