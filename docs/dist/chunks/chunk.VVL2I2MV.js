import {
  resourceLocal
} from "./chunk.JSUGNULT.js";
import {
  getResouceValue
} from "./chunk.QKHSR4DZ.js";
import {
  castDate,
  getDaysPanel,
  isEqualsDate,
  parseDate
} from "./chunk.2MTL7LGW.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  addEvent,
  animateCss,
  onEvent
} from "./chunk.3SJG5WV3.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.34CCKGOJ.js";
import {
  e,
  n,
  t
} from "./chunk.OPP7P5NL.js";
import {
  T,
  p,
  r,
  s
} from "./chunk.5BL2X74K.js";
import {
  __decorateClass,
  __spreadValues
} from "./chunk.QRXTBWFL.js";

// src/components/date-panel/index.litcss
var styles = r`:host{display:inline-block;--sl-date-panel-padding:1em;--sl-date-grid-gap:.5em;--sl-date-hover-color:var(--sl-color-primary-500);--sl-date-color:var(--sl-color-neutral-0)}svg{fill:currentColor}.date-button{position:relative;background:0;border:0;padding:0;outline:0;color:var(--sl-color-neutral-600);border-radius:var(--borderRadius,0.25em);transition:all .3s;display:inline-flex;align-items:center;justify-content:center}.date-day-item{box-sizing:content-box;min-width:2.5em;height:2.5em;cursor:pointer;border-radius:50%;justify-self:center}.date-day-item:hover:not(.current):not([disabled]){background-color:rgba(0,0,0,0.04)}.date-day-item[disabled]{cursor:not-allowed;background-color:rgba(0,0,0,0.1);opacity:.6}.date-day-item[part=item-month]{padding:3px;min-width:2.8em;min-height:2.8em}.date-day-item[part=item-year]{padding:3px;min-width:2.8em;min-height:2.8em}.other{color:var(--sl-color-gray-400);opacity:0;pointer-events:none}.current{color:var(--sl-date-color);background-color:var(--sl-date-hover-color)}.button{border-radius:50%;width:2.5em;height:2.5em;transition:.3s;cursor:pointer;color:rgba(0,0,0,0.87);background:0;display:flex;justify-content:center;align-items:center;outline:0;border:0}.button:hover{color:var(--sl-date-color);background-color:var(--sl-date-hover-color)}.date-base{padding:var(--sl-date-panel-padding);display:relative;overflow:hidden}.date-base .date-head{display:flex;align-items:center}.date-base .date-head .date-switch{flex:1;font-size:14px;display:flex;justify-content:center;cursor:default;border-radius:2px}.date-base .date-panel{margin-top:12px;opacity:1;visibility:visible;transition:.3s opacity,0.3s visibility}.date-base .date-week-item{flex:1;text-align:center;color:rgb(var(--sl-color-gray-400))}.date-base .date-date .date-body{display:grid;grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(6,1fr);grid-gap:var(--sl-date-grid-gap)}.date-base .date-month,.date-base .date-year{position:relative;display:grid;left:0;top:.8em;right:0;bottom:0;grid-gap:var(--sl-date-grid-gap)}.date-base .date-month{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,1fr)}.date-base .date-year{grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(4,1fr)}.date-base .animate-left{animation:slider-left .2s ease-out}.date-base .animate-right{animation:slider-right .2s ease-out}@keyframes slider-left{0%{transform:none;opacity:1}50%{transform:translateX(-50%);opacity:.5}100%{transform:translateX(-100%);opacity:0}}@keyframes slider-right{0%{transform:none;opacity:1}50%{transform:translateX(50%);opacity:.5}100%{transform:translateX(100%);opacity:0}}`;
var date_panel_default = styles;

// src/components/date-panel/date-panel.styles.ts
var date_panel_styles_default = r`
  ${component_styles_default}
  ${date_panel_default}
`;

// src/components/date-panel/date-panel.ts
var SlDatePanel = class extends s {
  constructor() {
    super(...arguments);
    this.mode = "date";
    this.innerMode = "date";
    this.innerDate = new Date();
  }
  get maxDate() {
    return this.max ? castDate(this.max) : null;
  }
  get minDate() {
    return this.min ? castDate(this.min) : null;
  }
  get _innerYear() {
    return this.innerDate.getFullYear();
  }
  get _innerMonth() {
    return this.innerDate.getMonth();
  }
  get valueDateString() {
    return this.valueDate ? parseDate(this.valueDate, this.mode) : "";
  }
  watchSelectModeChange() {
    this.innerMode = this.mode;
    let dateTemp = castDate(this.value);
    if (dateTemp) {
      this.value = parseDate(this.value, this.mode);
      this.innerDate = new Date(+dateTemp);
      this.valueDate = dateTemp;
    }
    if (!this.innerDate) {
      this.innerDate = new Date();
    }
  }
  get innerDisplayDateStr() {
    const date = this.innerDate;
    return getResouceValue("date.showHeaderStr")(date, this.innerMode);
  }
  renderHeader() {
    return p`<button class="button" part="prevButton" id="prevButton">
        <svg class="icon" viewBox="0 0 1024 1024">
          <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
        </svg>
      </button>
      <span class=" date-switch" part="date-switch">${this.innerDisplayDateStr}</span>
      <button class="button" id="nextButton" part="nextButton">
        <svg class="icon" viewBox="0 0 1024 1024">
          <path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path>
        </svg>
      </button> `;
  }
  renderDatePanel() {
    const weekArray = getResouceValue("date.weekDays");
    const weeks = p`${weekArray.map((item) => p`<span class="date-week-item" part="week-head">${item}</span>`)} `;
    let minDate = this.minDate;
    const maxDate = this.maxDate;
    const dateArray = getDaysPanel(this._innerYear, this._innerMonth + 1);
    const dateResult = [];
    for (let i = 0, j = dateArray.length; i < j; i++) {
      const tempDate = dateArray[i];
      let other = this._innerYear !== tempDate.getFullYear() || this._innerMonth !== tempDate.getMonth();
      const disabled = minDate != null && tempDate < minDate || maxDate != null && tempDate > maxDate;
      const isCurent = this.innerDate && isEqualsDate(tempDate, this.valueDate, "date");
      dateResult.push(p`<button part="item-date" class="date-button date-day-item ${other ? "other" : ""} ${isCurent ? "current" : ""} " .date=${tempDate} .disabled=${disabled}>${tempDate.getDate()}</button>`);
    }
    return p`<div class="date-body">${weeks}${dateResult}</div>`;
  }
  renderMonthBody() {
    const current = this.innerDate;
    if (current) {
      const year = current.getFullYear();
      const minDate = this.minDate;
      const maxDate = this.maxDate;
      const month = getResouceValue("date.months");
      return month.map((value, index) => {
        const date = new Date(year, index);
        let disabled = minDate != null && (year < minDate.getFullYear() || minDate.getFullYear() === year && index < minDate.getMonth());
        if (!disabled) {
          disabled = maxDate != null && (year > maxDate.getFullYear() || maxDate.getFullYear() === year && index > maxDate.getMonth());
        }
        return p`<button part="item-month" .date=${date} class="date-button date-day-item ${isEqualsDate(date, this.valueDate, "month") ? "current" : ""}" ?disabled=${disabled}>${value}</button>`;
      });
    }
    return T;
  }
  emitValueSelectEvent(detail = {}) {
    this.watchSelectModeChange();
    emit(this, "sl-date-select", {
      detail: __spreadValues({
        value: this.valueDateString,
        date: this.valueDate
      }, detail)
    });
  }
  renderYearBody() {
    const current = this.innerDate;
    const result = [];
    if (current) {
      const nv = current.getFullYear();
      const n2 = parseInt(String(nv / 20));
      const year = n2 * 20;
      const minDate = this.minDate;
      const maxDate = this.maxDate;
      for (let i = year, j = year + 20; i < j; i++) {
        const date = new Date(i, 0, 1);
        let disabled = minDate != null && i < minDate.getFullYear();
        if (!disabled) {
          disabled = maxDate != null && i > maxDate.getFullYear();
        }
        result.push(p`<button part="item-year" .date=${date} class="date-button date-day-item ${isEqualsDate(date, this.valueDate, "year") ? "current" : ""}" ?disabled=${disabled}>${i}</button>`);
      }
    }
    return result;
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    const baseDIV = this.renderRoot.querySelector("div[part=base]");
    const panelBase = this.renderRoot.querySelector("div[part=panel-base]");
    onEvent(baseDIV, "button[part=prevButton],button[part=nextButton], .date-day-item", "click", (event) => {
      var _a, _b;
      const el = event.delegateTarget;
      if (el.matches("button[part=prevButton]")) {
        const date = this.innerDate;
        if (this.mode == "date") {
          date.setMonth(date.getMonth() - 1);
        } else if (this.mode == "month") {
          date.setFullYear(date.getFullYear() - 1);
        } else if (this.mode == "year") {
          date.setFullYear(date.getFullYear() - 20);
        }
        (_a = panelBase.querySelector(".date-day-item.current")) == null ? void 0 : _a.classList.remove("current");
        animateCss(panelBase, "animate-left").then(() => {
          this.innerDate = new Date(+date);
        });
      } else if (el.matches("button[part=nextButton]")) {
        const date = this.innerDate;
        if (this.mode == "date") {
          date.setMonth(date.getMonth() + 1);
        } else if (this.mode == "month") {
          date.setFullYear(date.getFullYear() + 1);
        } else if (this.mode == "year") {
          date.setFullYear(date.getFullYear() + 20);
        }
        (_b = panelBase.querySelector(".date-day-item.current")) == null ? void 0 : _b.classList.remove("current");
        animateCss(panelBase, "animate-right").then(() => {
          this.innerDate = new Date(+date);
        });
      } else if (el.matches(".date-day-item")) {
        this.value = parseDate(el.date, this.mode);
        this.emitValueSelectEvent();
      }
    });
    addEvent(this, "keydown", (event) => {
      const code = event.key;
      if (this.naviagtorByKeyCode(code)) {
        event.preventDefault();
      }
    });
  }
  naviagtorByKeyCode(keyCode) {
    var _a;
    const panelBase = this.renderRoot.querySelector("div[part=panel-base]");
    let date = this.valueDate;
    if (!date) {
      date = this.innerDate;
    }
    let set = 0;
    switch (keyCode) {
      case "ArrowDown":
        set = 1;
        if (this.innerMode == "year") {
          date.setFullYear(date.getFullYear() + 5);
        } else if (this.innerMode == "month") {
          date.setMonth(date.getMonth() + 4);
        } else if (this.innerMode == "date") {
          date.setDate(date.getDate() + 7);
        }
        break;
      case "ArrowRight":
        set = 1;
        if (this.innerMode == "year") {
          date.setFullYear(date.getFullYear() + 1);
        } else if (this.innerMode == "month") {
          date.setMonth(date.getMonth() + 1);
        } else if (this.innerMode == "date") {
          date.setDate(date.getDate() + 1);
        }
        break;
      case "ArrowUp":
        set = -1;
        if (this.innerMode == "year") {
          date.setFullYear(date.getFullYear() - 5);
        } else if (this.innerMode == "month") {
          date.setMonth(date.getMonth() - 4);
        } else if (this.innerMode == "date") {
          date.setDate(date.getDate() - 7);
        }
        break;
      case "ArrowLeft":
        set = -1;
        if (this.innerMode == "year") {
          date.setFullYear(date.getFullYear() - 1);
        } else if (this.innerMode == "month") {
          date.setMonth(date.getMonth() - 1);
        } else if (this.innerMode == "date") {
          date.setDate(date.getDate() - 1);
        }
        break;
      default:
        break;
    }
    if (set != 0 && date) {
      const dateStr = getResouceValue("date.showHeaderStr")(this.innerDate, this.innerMode);
      const newDateStr = getResouceValue("date.showHeaderStr")(date, this.innerMode);
      if (newDateStr != dateStr) {
        (_a = panelBase.querySelector(".date-day-item.current")) == null ? void 0 : _a.classList.remove("current");
        animateCss(panelBase, set > 0 ? "animate-right" : "animate-left").then(() => {
          this.value = parseDate(date, this.mode);
          this.emitValueSelectEvent({ key: keyCode });
        });
      } else {
        this.value = parseDate(date, this.mode);
        this.emitValueSelectEvent({ key: keyCode });
      }
    }
    return set != 0;
  }
  render() {
    return p`<div class="date-base" part="base">
      <div class="date-head">${this.renderHeader()}</div>
      <div part="panel-base">
        ${this.innerMode == "date" ? p`<div part="date-date" class="date-panel date-date ">${this.renderDatePanel()}</div>` : T}
        ${this.innerMode == "month" ? p`<div part="date-month" class="date-panel date-month">${this.renderMonthBody()}</div>` : T}
        ${this.innerMode == "year" ? p`<div part="date-year" class="date-panel date-year ">${this.renderYearBody()}</div>` : T}
      </div>
    </div>`;
  }
};
SlDatePanel.styles = date_panel_styles_default;
__decorateClass([
  e({ type: String, attribute: "value" })
], SlDatePanel.prototype, "value", 2);
__decorateClass([
  e({ type: String, attribute: "mode" })
], SlDatePanel.prototype, "mode", 2);
__decorateClass([
  e({ type: String, attribute: false })
], SlDatePanel.prototype, "min", 2);
__decorateClass([
  e({ type: String, attribute: false })
], SlDatePanel.prototype, "max", 2);
__decorateClass([
  t()
], SlDatePanel.prototype, "innerMode", 2);
__decorateClass([
  t()
], SlDatePanel.prototype, "valueDate", 2);
__decorateClass([
  t()
], SlDatePanel.prototype, "innerDate", 2);
__decorateClass([
  watchProps(["value", "mode"])
], SlDatePanel.prototype, "watchSelectModeChange", 1);
SlDatePanel = __decorateClass([
  resourceLocal(),
  n("sl-date-panel")
], SlDatePanel);
var date_panel_default2 = SlDatePanel;

export {
  date_panel_default2 as date_panel_default
};
