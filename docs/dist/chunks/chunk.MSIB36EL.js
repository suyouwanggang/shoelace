import {
  page_btn_styles_default
} from "./chunk.6BMVY4OY.js";
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
  onEvent
} from "./chunk.3SJG5WV3.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/page-btn/page-btn.ts
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
var SlPageBtn = class extends LitElement {
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
    return html`<sl-input size="small" type="number" step="1" min="1" max=${this.pageCount} .value=${this.value + ""}></sl-input><span class="pageCountSpan">共${this.pageCount}页</span>`;
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
    for (let i = prev; i <= next; i++) {
      array.push(i);
    }
    return html`${repeat(array, (item) => html`<sl-button size="small" data-page-no=${item} .type=${this.value == item ? "primary" : "default"}>${item}</sl-button> `)}`;
  }
  _renderPage() {
    const result = [];
    result.push(this._renderPageButton());
    if (this.showPageChange) {
      result.push(this._renderSimple());
    }
    if (this.showSizeChange) {
      result.push(html`<sl-select size="small" .hoist=${true} part="show-size-change" .value=${this.pageSize + ""}>
        ${repeat(this.pageSizeOptions, (value, _index) => html`<sl-menu-item .value=${value + ""}>${value}条</sl-menu-item>`)}
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
    return html`<div part="base" page-align=${this.align}>
      <slot name="prefix"></slot>
      ${this.total == 0 ? html`<div part="no-data"><slot name="no-data">${getResouceValue("noData")}</slot></div>` : html`
            ${this.showFirst ? html`<sl-tooltip content="${getResouceValue("pageBtn.first")}"
                  ><sl-button size="small" ?disabled=${this.value == 1} data-page-no="first" type="text"><sl-icon part="first" name="chevron-bar-left"></sl-icon></sl-button
                ></sl-tooltip>` : nothing}
            <sl-tooltip content="${getResouceValue("pageBtn.prev")}">
              <sl-button ?disabled=${this.value == 1} data-page-no="prev" size="small" left type="text"><sl-icon part="prev" name="chevron-left" ?disabled=${this.value <= 1}></sl-icon></sl-button
            ></sl-tooltip>
            <div part="pageWrap">${this.simple ? this._renderSimple() : this._renderPage()}</div>
            <sl-tooltip content="${getResouceValue("pageBtn.next")}"
              ><sl-button size="small" ?disabled=${this.value + 1 > this.pageCount} data-page-no="next" right type="text"><sl-icon part="next" name="chevron-right" ?disabled=${this.value <= 1}></sl-icon></sl-button
            ></sl-tooltip>
            ${this.showLast ? html`<sl-tooltip content="${getResouceValue("pageBtn.last")}"
                  ><sl-button size="small" ?disabled=${this.value == this.pageCount} data-page-no="last" type="text"><sl-icon part="part" name="chevron-bar-right"></sl-icon></sl-button
                ></sl-tooltip>` : nothing}
          `}
      <slot></slot>
    </div>`;
  }
};
SlPageBtn.styles = page_btn_styles_default;
__decorateClass([
  property({ type: Number, reflect: true, attribute: "value" })
], SlPageBtn.prototype, "value", 2);
__decorateClass([
  property({ type: Number, attribute: "page-size", reflect: true })
], SlPageBtn.prototype, "pageSize", 2);
__decorateClass([
  property({ type: Boolean, attribute: "show-size-change", reflect: true })
], SlPageBtn.prototype, "showSizeChange", 2);
__decorateClass([
  property({ type: Boolean, attribute: "show-page-change", reflect: true })
], SlPageBtn.prototype, "showPageChange", 2);
__decorateClass([
  property({ type: Boolean })
], SlPageBtn.prototype, "simple", 2);
__decorateClass([
  property({ type: String, attribute: "align", reflect: true })
], SlPageBtn.prototype, "align", 2);
__decorateClass([
  property({ type: Number, attribute: "total", reflect: true })
], SlPageBtn.prototype, "total", 2);
__decorateClass([
  property({ type: Array, attribute: false })
], SlPageBtn.prototype, "pageSizeOptions", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], SlPageBtn.prototype, "showFirst", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], SlPageBtn.prototype, "showLast", 2);
__decorateClass([
  watchProps(["value", "pageSize", "total"])
], SlPageBtn.prototype, "watchPageChange", 1);
SlPageBtn = __decorateClass([
  resourceLocal(),
  customElement("sl-page-btn")
], SlPageBtn);

export {
  SlPageBtn
};
