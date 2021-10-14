import {
  castDate,
  isValidDate,
  parseDate
} from "./chunk.2MTL7LGW.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
import {
  e,
  i,
  n as n2,
  t
} from "./chunk.OPP7P5NL.js";
import {
  n,
  r,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/date/index.litcss
var styles = r`:host{display:inline-flex}:host([block]){display:block}:host([block]) sl-dropDown[part=dropDown]{display:block}:host([block]) sl-input{display:block}sl-icon{cursor:pointer}sl-input{display:inline-flex}`;
var date_default = styles;

// src/components/date/date.styles.ts
var date_styles_default = r`
  ${component_styles_default}
  ${date_default}
`;

// src/components/date/date.ts
var SlDate = class extends n {
  constructor() {
    super(...arguments);
    this.placement = "bottom-start";
    this.readonly = false;
    this.clearable = false;
    this.hoist = true;
    this.distance = 5;
    this.size = "medium";
    this.disabled = false;
    this.pill = false;
    this.immediate = true;
    this.mode = "date";
    this.block = false;
    this.invalid = false;
  }
  get maxDate() {
    return this.max ? castDate(this.max) : null;
  }
  get minDate() {
    return this.min ? castDate(this.min) : null;
  }
  firstUpdated(map) {
    super.firstUpdated(map);
  }
  handlerDateSelect(event) {
    this.value = event.detail.value;
    if (this.immediate && !event.detail.key) {
      let dropDown = this.renderRoot.querySelector("#dropDown");
      dropDown.open = false;
    }
    this.emitDateSelect();
  }
  emitDateSelect() {
    emit(this, "sl-date-change", {
      detail: { value: this.valueDateString, date: this.valueDate }
    });
  }
  get valueDateString() {
    return this.valueDate ? parseDate(this.valueDate, this.mode) : "";
  }
  watchDisabledPanel() {
    if (this.disabled || this.readonly) {
      this.dropDown.open = false;
    }
  }
  focus(option) {
    this.updateComplete.then(() => {
      const input = this.renderRoot.querySelector('sl-input[part="sl-date-input"]');
      if (input) {
        input.focus(option);
      }
    });
  }
  watchSelectModeChange() {
    let dateTemp = castDate(this.value);
    if (isValidDate(dateTemp)) {
      this.value = parseDate(this.value, this.mode);
      this.valueDate = new Date(this.value);
    } else {
      this.value = void 0;
      this.valueDate = void 0;
    }
  }
  handlerInputClick(event) {
    let oldDateString = this.valueDateString;
    const input = event.target;
    const date = input.value.trim() == "" ? null : castDate(input.value);
    if (isValidDate(date)) {
      this.value = input.value.trim();
      this.invalid = false;
      this.datePanel.value = this.valueDateString;
      this.watchSelectModeChange();
      this.emitDateSelect();
    } else {
      this.value = void 0;
      input.value = oldDateString;
      this.invalid = true;
    }
  }
  render() {
    return y` <sl-dropdown .distance=${this.distance} id="dropDown" part="dropDown" .placement=${this.placement} .hoist=${this.hoist} .disabled=${this.readonly || this.disabled}>
      <sl-input
        slot="trigger"
        part="sl-date-input"
        exportparts="base:base,input:input"
        @sl-change=${this.handlerInputClick}
        .value=${this.valueDateString}
        .pill=${this.pill}
        .clearable=${this.clearable}
        .placeholder=${this.placeholder}
        .readonly=${this.readonly}
        .disabled=${this.disabled}
        .invalid=${this.invalid}
        .size=${this.size}
        >${this.valueDateString}
        <sl-icon slot="suffix" name="calendar3"></sl-icon>
      </sl-input>
      <div part="date-panel-div">
        <sl-date-panel id="sl-date-panel" .value=${this.value} .mode=${this.mode} .min=${this.min} .max=${this.max} @sl-date-select=${this.handlerDateSelect}></sl-date-panel>
      </div>
    </sl-dropdown>`;
  }
};
SlDate.styles = date_styles_default;
__decorateClass([
  e()
], SlDate.prototype, "placement", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDate.prototype, "readonly", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDate.prototype, "clearable", 2);
__decorateClass([
  e({ type: String, reflect: true, attribute: "placeholder" })
], SlDate.prototype, "placeholder", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlDate.prototype, "hoist", 2);
__decorateClass([
  e({ type: Number, attribute: false })
], SlDate.prototype, "distance", 2);
__decorateClass([
  e({ type: String, attribute: "size" })
], SlDate.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDate.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDate.prototype, "pill", 2);
__decorateClass([
  e({ type: Boolean })
], SlDate.prototype, "immediate", 2);
__decorateClass([
  e({ type: String, attribute: "value" })
], SlDate.prototype, "value", 2);
__decorateClass([
  e({ type: String, attribute: "mode" })
], SlDate.prototype, "mode", 2);
__decorateClass([
  e({ type: String, attribute: false })
], SlDate.prototype, "min", 2);
__decorateClass([
  e({ type: String, attribute: false })
], SlDate.prototype, "max", 2);
__decorateClass([
  e({ type: Boolean, attribute: "block", reflect: true })
], SlDate.prototype, "block", 2);
__decorateClass([
  t()
], SlDate.prototype, "valueDate", 2);
__decorateClass([
  i("#sl-date-panel")
], SlDate.prototype, "datePanel", 2);
__decorateClass([
  i("#dropDown")
], SlDate.prototype, "dropDown", 2);
__decorateClass([
  watchProps(["disabled", "readonly"], { waitUntilFirstUpdate: true })
], SlDate.prototype, "watchDisabledPanel", 1);
__decorateClass([
  watchProps(["value", "mode"])
], SlDate.prototype, "watchSelectModeChange", 1);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDate.prototype, "invalid", 2);
SlDate = __decorateClass([
  n2("sl-date")
], SlDate);
var date_default2 = SlDate;

export {
  date_default2 as date_default
};
