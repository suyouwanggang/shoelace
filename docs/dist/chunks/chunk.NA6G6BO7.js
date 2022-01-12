import {
  resourceLocal
} from "./chunk.RXN3P6JZ.js";
import {
  getResouceValue
} from "./chunk.5CN3MB73.js";
import {
  castDate,
  getDaysPanel,
  isEqualsDate,
  parseDate
} from "./chunk.2MTL7LGW.js";
import {
  date_panel_styles_default
} from "./chunk.M52EB7HO.js";
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
  e,
  n,
  t
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s,
  w
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass,
  __spreadValues
} from "./chunk.FHAP4LMI.js";

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
    return $`<button class="button" part="prevButton" id="prevButton">
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
    const weeks = $`${weekArray.map((item) => $`<span class="date-week-item" part="week-head">${item}</span>`)} `;
    let minDate = this.minDate;
    const maxDate = this.maxDate;
    const dateArray = getDaysPanel(this._innerYear, this._innerMonth + 1);
    const dateResult = [];
    for (let i = 0, j = dateArray.length; i < j; i++) {
      const tempDate = dateArray[i];
      let other = this._innerYear !== tempDate.getFullYear() || this._innerMonth !== tempDate.getMonth();
      const disabled = minDate != null && tempDate < minDate || maxDate != null && tempDate > maxDate;
      const isCurent = this.innerDate && isEqualsDate(tempDate, this.valueDate, "date");
      dateResult.push($`<button part="item-date" class="date-button date-day-item ${other ? "other" : ""} ${isCurent ? "current" : ""} " .date=${tempDate} .disabled=${disabled}>${tempDate.getDate()}</button>`);
    }
    return $`<div class="date-body">${weeks}${dateResult}</div>`;
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
        return $`<button part="item-month" .date=${date} class="date-button date-day-item ${isEqualsDate(date, this.valueDate, "month") ? "current" : ""}" ?disabled=${disabled}>${value}</button>`;
      });
    }
    return w;
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
        result.push($`<button part="item-year" .date=${date} class="date-button date-day-item ${isEqualsDate(date, this.valueDate, "year") ? "current" : ""}" ?disabled=${disabled}>${i}</button>`);
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
    return $`<div class="date-base" part="base">
      <div class="date-head">${this.renderHeader()}</div>
      <div part="panel-base">
        ${this.innerMode == "date" ? $`<div part="date-date" class="date-panel date-date ">${this.renderDatePanel()}</div>` : w}
        ${this.innerMode == "month" ? $`<div part="date-month" class="date-panel date-month">${this.renderMonthBody()}</div>` : w}
        ${this.innerMode == "year" ? $`<div part="date-year" class="date-panel date-year ">${this.renderYearBody()}</div>` : w}
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

export {
  SlDatePanel
};
