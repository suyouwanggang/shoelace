import {
  onEvent
} from "./chunk.UYG3ZEVK.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/radio-group/radio-group.ts
import { html, LitElement } from "lit";

// node_modules/lit-html/lit-html.js
var t;
var i;
var s = globalThis.trustedTypes;
var e = s ? s.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o = `lit$${(Math.random() + "").slice(9)}$`;
var n = "?" + o;
var l = `<${n}>`;
var h = document;
var r = (t3 = "") => h.createComment(t3);
var d = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var u = Array.isArray;
var v = (t3) => {
  var i3;
  return u(t3) || typeof ((i3 = t3) === null || i3 === void 0 ? void 0 : i3[Symbol.iterator]) == "function";
};
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var a = /-->/g;
var f = />/g;
var _ = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var g = /'/g;
var m = /"/g;
var $ = /^(?:script|style|textarea)$/i;
var p = (t3) => (i3, ...s2) => ({ _$litType$: t3, strings: i3, values: s2 });
var y = p(1);
var b = p(2);
var T = Symbol.for("lit-noChange");
var x = Symbol.for("lit-nothing");
var w = new WeakMap();
var C = h.createTreeWalker(h, 129, null, false);
var P = (t3, i3) => {
  const s2 = t3.length - 1, n2 = [];
  let h2, r2 = i3 === 2 ? "<svg>" : "", d2 = c;
  for (let i4 = 0; i4 < s2; i4++) {
    const s3 = t3[i4];
    let e3, u3, v2 = -1, p2 = 0;
    for (; p2 < s3.length && (d2.lastIndex = p2, u3 = d2.exec(s3), u3 !== null); )
      p2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = a : u3[1] !== void 0 ? d2 = f : u3[2] !== void 0 ? ($.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = _) : u3[3] !== void 0 && (d2 = _) : d2 === _ ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, v2 = -1) : u3[1] === void 0 ? v2 = -2 : (v2 = d2.lastIndex - u3[2].length, e3 = u3[1], d2 = u3[3] === void 0 ? _ : u3[3] === '"' ? m : g) : d2 === m || d2 === g ? d2 = _ : d2 === a || d2 === f ? d2 = c : (d2 = _, h2 = void 0);
    const y2 = d2 === _ && t3[i4 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s3 + l : v2 >= 0 ? (n2.push(e3), s3.slice(0, v2) + "$lit$" + s3.slice(v2) + o + y2) : s3 + o + (v2 === -2 ? (n2.push(void 0), i4) : y2);
  }
  const u2 = r2 + (t3[s2] || "<?>") + (i3 === 2 ? "</svg>" : "");
  return [e !== void 0 ? e.createHTML(u2) : u2, n2];
};
var V = class {
  constructor({ strings: t3, _$litType$: i3 }, e3) {
    let l2;
    this.parts = [];
    let h2 = 0, d2 = 0;
    const u2 = t3.length - 1, v2 = this.parts, [c2, a2] = P(t3, i3);
    if (this.el = V.createElement(c2, e3), C.currentNode = this.el.content, i3 === 2) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (; (l2 = C.nextNode()) !== null && v2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t4 = [];
          for (const i4 of l2.getAttributeNames())
            if (i4.endsWith("$lit$") || i4.startsWith(o)) {
              const s2 = a2[d2++];
              if (t4.push(i4), s2 !== void 0) {
                const t5 = l2.getAttribute(s2.toLowerCase() + "$lit$").split(o), i5 = /([.?@])?(.*)/.exec(s2);
                v2.push({ type: 1, index: h2, name: i5[2], strings: t5, ctor: i5[1] === "." ? k : i5[1] === "?" ? H : i5[1] === "@" ? I : M });
              } else
                v2.push({ type: 6, index: h2 });
            }
          for (const i4 of t4)
            l2.removeAttribute(i4);
        }
        if ($.test(l2.tagName)) {
          const t4 = l2.textContent.split(o), i4 = t4.length - 1;
          if (i4 > 0) {
            l2.textContent = s ? s.emptyScript : "";
            for (let s2 = 0; s2 < i4; s2++)
              l2.append(t4[s2], r()), C.nextNode(), v2.push({ type: 2, index: ++h2 });
            l2.append(t4[i4], r());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === n)
          v2.push({ type: 2, index: h2 });
        else {
          let t4 = -1;
          for (; (t4 = l2.data.indexOf(o, t4 + 1)) !== -1; )
            v2.push({ type: 7, index: h2 }), t4 += o.length - 1;
        }
      h2++;
    }
  }
  static createElement(t3, i3) {
    const s2 = h.createElement("template");
    return s2.innerHTML = t3, s2;
  }
};
function E(t3, i3, s2 = t3, e3) {
  var o3, n2, l2, h2;
  if (i3 === T)
    return i3;
  let r2 = e3 !== void 0 ? (o3 = s2._$Cl) === null || o3 === void 0 ? void 0 : o3[e3] : s2._$Cu;
  const u2 = d(i3) ? void 0 : i3._$litDirective$;
  return (r2 == null ? void 0 : r2.constructor) !== u2 && ((n2 = r2 == null ? void 0 : r2._$AO) === null || n2 === void 0 || n2.call(r2, false), u2 === void 0 ? r2 = void 0 : (r2 = new u2(t3), r2._$AT(t3, s2, e3)), e3 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e3] = r2 : s2._$Cu = r2), r2 !== void 0 && (i3 = E(t3, r2._$AS(t3, i3.values), r2, e3)), i3;
}
var N = class {
  constructor(t3, i3) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i3;
    const { el: { content: s2 }, parts: e3 } = this._$AD, o3 = ((i3 = t3 == null ? void 0 : t3.creationScope) !== null && i3 !== void 0 ? i3 : h).importNode(s2, true);
    C.currentNode = o3;
    let n2 = C.nextNode(), l2 = 0, r2 = 0, d2 = e3[0];
    for (; d2 !== void 0; ) {
      if (l2 === d2.index) {
        let i4;
        d2.type === 2 ? i4 = new S(n2, n2.nextSibling, this, t3) : d2.type === 1 ? i4 = new d2.ctor(n2, d2.name, d2.strings, this, t3) : d2.type === 6 && (i4 = new L(n2, this, t3)), this.v.push(i4), d2 = e3[++r2];
      }
      l2 !== (d2 == null ? void 0 : d2.index) && (n2 = C.nextNode(), l2++);
    }
    return o3;
  }
  m(t3) {
    let i3 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t3[i3])), i3++;
  }
};
var S = class {
  constructor(t3, i3, s2, e3) {
    var o3;
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s2, this.options = e3, this._$Cg = (o3 = e3 == null ? void 0 : e3.isConnected) === null || o3 === void 0 || o3;
  }
  get _$AU() {
    var t3, i3;
    return (i3 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i3 !== void 0 ? i3 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return i3 !== void 0 && t3.nodeType === 11 && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = E(this, t3, i3), d(t3) ? t3 === x || t3 == null || t3 === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t3 !== this._$AH && t3 !== T && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.S(t3) : v(t3) ? this.M(t3) : this.$(t3);
  }
  A(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  S(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
  }
  $(t3) {
    this._$AH !== x && d(this._$AH) ? this._$AA.nextSibling.data = t3 : this.S(h.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i3;
    const { values: s2, _$litType$: e3 } = t3, o3 = typeof e3 == "number" ? this._$AC(t3) : (e3.el === void 0 && (e3.el = V.createElement(e3.h, this.options)), e3);
    if (((i3 = this._$AH) === null || i3 === void 0 ? void 0 : i3._$AD) === o3)
      this._$AH.m(s2);
    else {
      const t4 = new N(o3, this), i4 = t4.p(this.options);
      t4.m(s2), this.S(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = w.get(t3.strings);
    return i3 === void 0 && w.set(t3.strings, i3 = new V(t3)), i3;
  }
  M(t3) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s2, e3 = 0;
    for (const o3 of t3)
      e3 === i3.length ? i3.push(s2 = new S(this.A(r()), this.A(r()), this, this.options)) : s2 = i3[e3], s2._$AI(o3), e3++;
    e3 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e3), i3.length = e3);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    this._$AM === void 0 && (this._$Cg = t3, (i3 = this._$AP) === null || i3 === void 0 || i3.call(this, t3));
  }
};
var M = class {
  constructor(t3, i3, s2, e3, o3) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e3, this.options = o3, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = x;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s2, e3) {
    const o3 = this.strings;
    let n2 = false;
    if (o3 === void 0)
      t3 = E(this, t3, i3, 0), n2 = !d(t3) || t3 !== this._$AH && t3 !== T, n2 && (this._$AH = t3);
    else {
      const e4 = t3;
      let l2, h2;
      for (t3 = o3[0], l2 = 0; l2 < o3.length - 1; l2++)
        h2 = E(this, e4[s2 + l2], i3, l2), h2 === T && (h2 = this._$AH[l2]), n2 || (n2 = !d(h2) || h2 !== this._$AH[l2]), h2 === x ? t3 = x : t3 !== x && (t3 += (h2 != null ? h2 : "") + o3[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e3 && this.k(t3);
  }
  k(t3) {
    t3 === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
};
var k = class extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t3) {
    this.element[this.name] = t3 === x ? void 0 : t3;
  }
};
var H = class extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t3) {
    t3 && t3 !== x ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
};
var I = class extends M {
  constructor(t3, i3, s2, e3, o3) {
    super(t3, i3, s2, e3, o3), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s2;
    if ((t3 = (s2 = E(this, t3, i3, 0)) !== null && s2 !== void 0 ? s2 : x) === T)
      return;
    const e3 = this._$AH, o3 = t3 === x && e3 !== x || t3.capture !== e3.capture || t3.once !== e3.once || t3.passive !== e3.passive, n2 = t3 !== x && (e3 === x || o3);
    o3 && this.element.removeEventListener(this.name, this, e3), n2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i3 = this.options) === null || i3 === void 0 ? void 0 : i3.host) !== null && s2 !== void 0 ? s2 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var L = class {
  constructor(t3, i3, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    E(this, t3);
  }
};
(t = globalThis.litHtmlPolyfillSupport) === null || t === void 0 || t.call(globalThis, V, S), ((i = globalThis.litHtmlVersions) !== null && i !== void 0 ? i : globalThis.litHtmlVersions = []).push("2.0.0");

// node_modules/lit-html/directive.js
var t2 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e2 = (t3) => (...e3) => ({ _$litDirective$: t3, values: e3 });
var i2 = class {
  constructor(t3) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t3, e3, i3) {
    this._$Ct = t3, this._$AM = e3, this._$Ci = i3;
  }
  _$AS(t3, e3) {
    return this.update(t3, e3);
  }
  update(t3, e3) {
    return this.render(...e3);
  }
};

// node_modules/lit-html/directives/class-map.js
var o2 = e2(class extends i2 {
  constructor(t3) {
    var i3;
    if (super(t3), t3.type !== t2.ATTRIBUTE || t3.name !== "class" || ((i3 = t3.strings) === null || i3 === void 0 ? void 0 : i3.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t3) {
    return " " + Object.keys(t3).filter((i3) => t3[i3]).join(" ") + " ";
  }
  update(i3, [s2]) {
    var r2, o3;
    if (this.st === void 0) {
      this.st = new Set(), i3.strings !== void 0 && (this.et = new Set(i3.strings.join(" ").split(/\s/).filter((t3) => t3 !== "")));
      for (const t3 in s2)
        s2[t3] && !((r2 = this.et) === null || r2 === void 0 ? void 0 : r2.has(t3)) && this.st.add(t3);
      return this.render(s2);
    }
    const e3 = i3.element.classList;
    this.st.forEach((t3) => {
      t3 in s2 || (e3.remove(t3), this.st.delete(t3));
    });
    for (const t3 in s2) {
      const i4 = !!s2[t3];
      i4 === this.st.has(t3) || ((o3 = this.et) === null || o3 === void 0 ? void 0 : o3.has(t3)) || (i4 ? (e3.add(t3), this.st.add(t3)) : (e3.remove(t3), this.st.delete(t3)));
    }
    return T;
  }
});

// src/components/radio-group/radio-group.ts
import { customElement, property, query } from "lit/decorators.js";

// src/components/radio-group/radio-group.styles.ts
import { css } from "lit";
var radio_group_styles_default = css`
  ${component_styles_default}

  :host {
    display: block;
  }

  .radio-group {
    border: solid var(--sl-panel-border-width) rgb(var(--sl-panel-border-color));
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-large);
    padding-top: var(--sl-spacing-x-small);
  }

  .radio-group .radio-group__label {
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: rgb(var(--sl-input-color));
    padding: 0 var(--sl-spacing-2x-small);
  }

  ::slotted(sl-radio:not(:last-of-type)) {
    display: block;
    margin-bottom: var(--sl-spacing-2x-small);
  }

  .radio-group:not(.radio-group--has-fieldset) {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .radio-group:not(.radio-group--has-fieldset) .radio-group__label {
    position: absolute;
    width: 0;
    height: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`;

// src/components/radio-group/radio-group.ts
var SlRadioGroup = class extends LitElement {
  constructor() {
    super(...arguments);
    this.label = "";
    this.fieldset = false;
  }
  handleFocusIn() {
    requestAnimationFrame(() => {
      const checkedRadio = [...this.defaultSlot.assignedElements({ flatten: true })].find((el) => el.tagName.toLowerCase() === "sl-radio" && el.checked);
      if (checkedRadio) {
        checkedRadio.focus();
      }
    });
  }
  get allRadios() {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => el.tagName.toLowerCase() === "sl-radio");
  }
  valueChange() {
    const checkedRadio = this.allRadios;
    checkedRadio.forEach((item) => {
      if (item.value == this.value) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    if (this.value) {
      this.valueChange();
    } else {
      const checkedRadio = this.allRadios;
      checkedRadio.forEach((item) => {
        if (item.checked) {
          this.value = item.value;
          return;
        }
      });
    }
    this._eventHandler = onEvent(this, "sl-radio", "sl-change", (event) => {
      let radio = event.delegateTarget;
      let group = radio.closest("sl-radio-group");
      if (group == this) {
        this.value = radio.value;
        emit(this, "sl-check-change");
      }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._eventHandler) {
      this._eventHandler.dispose();
    }
  }
  render() {
    return html`
      <fieldset
        part="base"
        class=${o2({
      "radio-group": true,
      "radio-group--has-fieldset": this.fieldset
    })}
        role="radiogroup"
        @focusin=${this.handleFocusIn}
      >
        <legend part="label" class="radio-group__label">
          <slot name="label">${this.label}</slot>
        </legend>
        <slot></slot>
      </fieldset>
    `;
  }
};
SlRadioGroup.styles = radio_group_styles_default;
__decorateClass([
  query("slot:not([name])")
], SlRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  property()
], SlRadioGroup.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, attribute: "fieldset" })
], SlRadioGroup.prototype, "fieldset", 2);
__decorateClass([
  property({ type: Object })
], SlRadioGroup.prototype, "value", 2);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlRadioGroup.prototype, "valueChange", 1);
SlRadioGroup = __decorateClass([
  customElement("sl-radio-group")
], SlRadioGroup);
var radio_group_default = SlRadioGroup;

export {
  radio_group_default
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
