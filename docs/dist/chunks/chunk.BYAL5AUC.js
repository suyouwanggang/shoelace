import {
  page_btn_styles_default
} from "./chunk.A4VI7MW2.js";
import {
  resourceLocal
} from "./chunk.JSUGNULT.js";
import {
  getResouceValue
} from "./chunk.QKHSR4DZ.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  a,
  c,
  m,
  s as s2,
  u
} from "./chunk.Q2PLIRNK.js";
import {
  onEvent
} from "./chunk.3SJG5WV3.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e as e2,
  i,
  t
} from "./chunk.E2OEF7AF.js";
import {
  e,
  n
} from "./chunk.DIDDF23Y.js";
import {
  T,
  b,
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// node_modules/lit/node_modules/lit-html/directives/repeat.js
var u2 = (e3, s3, t2) => {
  const r = new Map();
  for (let l = s3; l <= t2; l++)
    r.set(e3[l], l);
  return r;
};
var c2 = e2(class extends i {
  constructor(e3) {
    if (super(e3), e3.type !== t.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e3, s3, t2) {
    let r;
    t2 === void 0 ? t2 = s3 : s3 !== void 0 && (r = s3);
    const l = [], o = [];
    let i2 = 0;
    for (const s4 of e3)
      l[i2] = r ? r(s4, i2) : i2, o[i2] = t2(s4, i2), i2++;
    return { values: o, keys: l };
  }
  render(e3, s3, t2) {
    return this.dt(e3, s3, t2).values;
  }
  update(s3, [t2, r, c3]) {
    var d;
    const a2 = a(s3), { values: p2, keys: v } = this.dt(t2, r, c3);
    if (!Array.isArray(a2))
      return this.ct = v, p2;
    const h = (d = this.ct) !== null && d !== void 0 ? d : this.ct = [], m2 = [];
    let y, x, j = 0, k = a2.length - 1, w = 0, A = p2.length - 1;
    for (; j <= k && w <= A; )
      if (a2[j] === null)
        j++;
      else if (a2[k] === null)
        k--;
      else if (h[j] === v[w])
        m2[w] = c(a2[j], p2[w]), j++, w++;
      else if (h[k] === v[A])
        m2[A] = c(a2[k], p2[A]), k--, A--;
      else if (h[j] === v[A])
        m2[A] = c(a2[j], p2[A]), u(s3, m2[A + 1], a2[j]), j++, A--;
      else if (h[k] === v[w])
        m2[w] = c(a2[k], p2[w]), u(s3, a2[j], a2[k]), k--, w++;
      else if (y === void 0 && (y = u2(v, w, A), x = u2(h, j, k)), y.has(h[j]))
        if (y.has(h[k])) {
          const e3 = x.get(v[w]), t3 = e3 !== void 0 ? a2[e3] : null;
          if (t3 === null) {
            const e4 = u(s3, a2[j]);
            c(e4, p2[w]), m2[w] = e4;
          } else
            m2[w] = c(t3, p2[w]), u(s3, a2[j], t3), a2[e3] = null;
          w++;
        } else
          m(a2[k]), k--;
      else
        m(a2[j]), j++;
    for (; w <= A; ) {
      const e3 = u(s3, m2[A + 1]);
      c(e3, p2[w]), m2[w++] = e3;
    }
    for (; j <= k; ) {
      const e3 = a2[j++];
      e3 !== null && m(e3);
    }
    return this.ct = v, s2(s3, m2), b;
  }
});

// src/components/page-btn/page-btn.ts
var SlPageBtn = class extends s {
  constructor() {
    super(...arguments);
    this.value = 1;
    this.pageSize = 20;
    this.showSizeChange = false;
    this.showPageChange = false;
    this.simple = false;
    this.align = "right";
    this.pageSizeOptions = Array.from({ length: 10 }, (_item, value) => 10 + value * 10);
    this.showFirst = false;
    this.showLast = false;
  }
  get pageCount() {
    return Math.ceil(this.total / this.pageSize);
  }
  watchPageChange() {
    if (this.total < 0) {
      this.total = 0;
    }
    if (this.value > this.pageCount) {
      this.value = this.pageCount;
    }
    if (this.value <= 0) {
      this.value = 1;
    }
  }
  _renderSimple() {
    return p`<sl-input size="small" type="number" step="1" min="1" max=${this.pageCount} .value=${this.value + ""}></sl-input><span class="pageCountSpan">共${this.pageCount}页</span>`;
  }
  _renderPageButton() {
    const pageCount = this.pageCount;
    const current = this.value;
    let prev = current - 3;
    let size = 3;
    if (prev <= 1) {
      prev = 1;
      size = current - prev;
    }
    let next = current + (7 - size);
    if (next > pageCount) {
      next = pageCount;
    }
    if (next - prev < 7) {
      prev = next - 7;
      if (prev < 1) {
        prev = 1;
      }
    }
    const array = [];
    for (let i2 = prev; i2 <= next; i2++) {
      array.push(i2);
    }
    return p`${c2(array, (item) => p`<sl-button size="small" data-page-no=${item} .type=${this.value == item ? "primary" : "default"}>${item}</sl-button> `)}`;
  }
  _renderPage() {
    const result = [];
    result.push(this._renderPageButton());
    if (this.showPageChange) {
      result.push(this._renderSimple());
    }
    if (this.showSizeChange) {
      result.push(p`<sl-select size="small" .hoist=${true} part="show-size-change" .value=${this.pageSize + ""}>
        ${c2(this.pageSizeOptions, (value, _index) => p`<sl-menu-item .value=${value + ""}>${value}条</sl-menu-item>`)}
      </sl-select>`);
    }
    return result;
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    let baseDiv = this.renderRoot.querySelector("div[part=base]");
    this._eventDispose1 = onEvent(baseDiv, "sl-button[data-page-no]", "click", async (event) => {
      let pageNo = event.delegateTarget.getAttribute("data-page-no");
      let tempNo = parseInt(pageNo, 10);
      if (isNaN(tempNo)) {
        this.goToPageByKey(pageNo);
      } else {
        this.goToPage(tempNo);
      }
      this._eventDispose2 = onEvent(baseDiv, "sl-input,sl-select[part=show-size-change]", "sl-change", (event2) => {
        let el = event2.delegateTarget;
        const beforeEvent = emit(this, "sl-page-before-change");
        if (!beforeEvent.defaultPrevented) {
          if (el.matches("sl-select[part=show-size-change]")) {
            this.pageSize = Number(el.value);
          } else {
            this.watchPageChange();
            let value = el.value;
            if (isNaN(value)) {
              value = 1;
            }
            value = Number(value);
            if (value > this.pageCount) {
              value = this.pageCount;
            }
            el.value = value;
            this.value = value;
          }
          emit(this, "sl-page-change", {
            detail: { value: this.value }
          });
        }
      });
    });
  }
  disconnectedCallback() {
    var _a, _b;
    super.disconnectedCallback();
    (_a = this._eventDispose1) == null ? void 0 : _a.dispose();
    (_b = this._eventDispose2) == null ? void 0 : _b.dispose();
  }
  goToPageByKey(pageKey) {
    let result = 1;
    pageKey = pageKey.toLowerCase();
    switch (pageKey) {
      case "first":
        result = 1;
        break;
      case "prev":
        result = this.value - 1;
        break;
      case "next":
        result = this.value + 1;
        break;
      case "last":
        result = this.pageCount;
        break;
      default:
        result = this.value;
    }
    this.goToPage(result);
  }
  goToPage(pageNo) {
    const event = emit(this, "sl-page-before-change");
    if (!event.defaultPrevented) {
      if (!isNaN(pageNo)) {
        let tempValue = pageNo;
        if (tempValue <= 0) {
          tempValue = 1;
        } else if (tempValue > this.pageCount) {
          tempValue = this.pageCount;
        }
        this.value = tempValue;
        emit(this, "sl-page-change", {
          detail: { value: this.value }
        });
      }
    }
  }
  render() {
    return p`<div part="base" page-align=${this.align}>
      <slot name="prefix"></slot>
      ${this.total == 0 ? p`<div part="no-data"><slot name="no-data">${getResouceValue("noData")}</slot></div>` : p`
            ${this.showFirst ? p`<sl-tooltip content="${getResouceValue("pageBtn.first")}"
                  ><sl-button size="small" ?disabled=${this.value == 1} data-page-no="first" type="text"><sl-icon part="first" name="chevron-bar-left"></sl-icon></sl-button
                ></sl-tooltip>` : T}
            <sl-tooltip content="${getResouceValue("pageBtn.prev")}">
              <sl-button ?disabled=${this.value == 1} data-page-no="prev" size="small" left type="text"><sl-icon part="prev" name="chevron-left" ?disabled=${this.value <= 1}></sl-icon></sl-button
            ></sl-tooltip>
            <div part="pageWrap">${this.simple ? this._renderSimple() : this._renderPage()}</div>
            <sl-tooltip content="${getResouceValue("pageBtn.next")}"
              ><sl-button size="small" ?disabled=${this.value + 1 > this.pageCount} data-page-no="next" right type="text"><sl-icon part="next" name="chevron-right" ?disabled=${this.value <= 1}></sl-icon></sl-button
            ></sl-tooltip>
            ${this.showLast ? p`<sl-tooltip content="${getResouceValue("pageBtn.last")}"
                  ><sl-button size="small" ?disabled=${this.value == this.pageCount} data-page-no="last" type="text"><sl-icon part="part" name="chevron-bar-right"></sl-icon></sl-button
                ></sl-tooltip>` : T}
          `}
      <slot></slot>
    </div>`;
  }
};
SlPageBtn.styles = page_btn_styles_default;
__decorateClass([
  e({ type: Number, reflect: true, attribute: "value" })
], SlPageBtn.prototype, "value", 2);
__decorateClass([
  e({ type: Number, attribute: "page-size", reflect: true })
], SlPageBtn.prototype, "pageSize", 2);
__decorateClass([
  e({ type: Boolean, attribute: "show-size-change", reflect: true })
], SlPageBtn.prototype, "showSizeChange", 2);
__decorateClass([
  e({ type: Boolean, attribute: "show-page-change", reflect: true })
], SlPageBtn.prototype, "showPageChange", 2);
__decorateClass([
  e({ type: Boolean })
], SlPageBtn.prototype, "simple", 2);
__decorateClass([
  e({ type: String, attribute: "align", reflect: true })
], SlPageBtn.prototype, "align", 2);
__decorateClass([
  e({ type: Number, attribute: "total", reflect: true })
], SlPageBtn.prototype, "total", 2);
__decorateClass([
  e({ type: Array, attribute: false })
], SlPageBtn.prototype, "pageSizeOptions", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlPageBtn.prototype, "showFirst", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlPageBtn.prototype, "showLast", 2);
__decorateClass([
  watchProps(["value", "pageSize", "total"])
], SlPageBtn.prototype, "watchPageChange", 1);
SlPageBtn = __decorateClass([
  resourceLocal(),
  n("sl-page-btn")
], SlPageBtn);

export {
  SlPageBtn
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
