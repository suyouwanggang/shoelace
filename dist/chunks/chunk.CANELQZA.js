import {
  transfer_styles_default
} from "./chunk.OK77OKFQ.js";
import {
  SlTable
} from "./chunk.MIQAOBRK.js";
import {
  e as e2,
  n as n2
} from "./chunk.QAEIWOMC.js";
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
  l
} from "./chunk.FBMRDI7U.js";
import {
  isArray
} from "./chunk.3SJG5WV3.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  n,
  t
} from "./chunk.DIDDF23Y.js";
import {
  T,
  p,
  s,
  w
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/transfer/transfer.ts
var defaultTransfilter = (item, value) => {
  if (value == null || value == "" || value.trim() == "" || typeof item.name == "undefined") {
    return true;
  }
  return item.name.includes(value);
};
var SlTransfer = class extends s {
  constructor() {
    super(...arguments);
    this.sourceTempSelectedKeys = [];
    this.targetTempSelectedKeys = [];
    this.targetSelectedKeys = [];
    this.disabled = false;
    this.cacheDataSource = new Map();
    this.filterTargetDataList = [];
    this.filterSourceDataList = [];
    this.showSelectAll = true;
    this.filterMethod = defaultTransfilter;
    this.sourceSearchValue = [];
    this.targetSearchValue = [];
    this.sourceScrollRef = e2();
    this.targetScrollRef = e2();
  }
  getItemById(id) {
    return this.cacheDataSource.get(id);
  }
  get targetDataList() {
    const result = [];
    for (let key of this.targetSelectedKeys) {
      const item = this.cacheDataSource.get(key);
      if (item != null) {
        result.push(item);
      } else {
        console.warn(`key=${key} is not found in dataSouce by id `);
      }
    }
    return result;
  }
  get sourceDataList() {
    const result = [];
    if (this.dataSource) {
      for (let item of this.dataSource) {
        const key = item.id;
        if (this.targetSelectedKeys && this.targetSelectedKeys.includes(key)) {
          continue;
        }
        result.push(item);
      }
    }
    return result;
  }
  watchDataSourceChanged() {
    this.cacheDataSource.clear();
    if (this.dataSource) {
      for (let item of this.dataSource) {
        this.cacheDataSource.set(item.id, item);
      }
      this.runFilterMethod();
    }
  }
  runFilterMethod() {
    let list = this.targetDataList;
    if (!this.disableFilter && this.targetSearchValue && this.filterMethod) {
      list = list.filter((item) => this.filterMethod(item, ...this.targetSearchValue));
    }
    this.filterTargetDataList = list;
    list = this.sourceDataList;
    if (!this.disableFilter && this.sourceSearchValue && this.filterMethod) {
      list = list.filter((item) => this.filterMethod(item, ...this.sourceSearchValue));
    }
    this.filterSourceDataList = list;
  }
  renderFilter(_direction) {
    const placeholder = typeof this.filterPlaceholder != "undefined" ? isArray(this.filterPlaceholder) ? this.filterPlaceholder[_direction == "source" ? 0 : 1] : this.filterPlaceholder : getResouceValue("seachTransfer");
    return p`<sl-input direction=${_direction} size="small" @sl-input=${(event) => this.doFilterInputHandler(event, _direction)} placeholder=${placeholder} exportparts="base:slInput,input:input" clearable
      ><sl-icon slot="suffix" name="search"></sl-icon
    ></sl-input>`;
  }
  doFilterInputHandler(_event, _direction) {
    const input = _event.target;
    this.inputTimeoutID = globalThis.setTimeout(() => {
      globalThis.clearTimeout(this.inputTimeoutID);
      if (_direction == "source") {
        this.sourceSearchValue[0] = input.value;
      } else {
        this.targetSearchValue[0] = input.value;
      }
      this.sourceSearchValue = [...this.sourceSearchValue];
      this.targetSearchValue = [...this.targetSearchValue];
      this.emitFilterEvent();
    }, 20);
  }
  emitFilterEvent() {
    emit(this, "sl-filter-change", {
      detail: {
        source: this.sourceSearchValue[0],
        target: this.targetSearchValue[0],
        sourceSearchValue: this.sourceSearchValue,
        targetSearchValue: this.targetSearchValue
      }
    });
  }
  processSelectItem(event, item, direction) {
    const li = event.currentTarget;
    const el = li.querySelector("sl-checkbox");
    if (event.target != el) {
      el.click();
    }
    requestAnimationFrame(() => {
      const array = direction == "source" ? this.sourceTempSelectedKeys : this.targetTempSelectedKeys;
      let index = array.indexOf(item.id);
      if (el.checked && index < 0) {
        array.push(item.id);
      } else if (!el.checked && index >= 0) {
        array.splice(index, 1);
      }
      emit(this, "sl-transfer-change", {
        detail: {
          "sourceSelectedKeys:": this.sourceTempSelectedKeys,
          targetSelectedKeys: this.targetTempSelectedKeys
        }
      });
    });
  }
  get sourceScroll() {
    return this.sourceScrollRef.value;
  }
  get targetScroll() {
    return this.targetScrollRef.value;
  }
  tableTemplateChange() {
    const frag = document.createDocumentFragment();
    w(this.tableTemplate("source"), frag);
    this.sourceTable = frag.firstElementChild;
    if (this.sourceTable == null || !(this.sourceTable instanceof SlTable)) {
      throw new Error("tableTemplate should be a function take a parameter string:source|target return Template like html`<sl-table><sl-column></sl-column></sl-table>`");
    }
    this.sourceTable.id = "sourceTable";
    this.sourceTable.classList.add("table");
    const targetfrag = document.createDocumentFragment();
    w(this.tableTemplate("target"), targetfrag);
    this.targetTable = targetfrag.firstElementChild;
    this.targetTable.id = "targetTable";
    if (this.sourceTable == null || !(this.sourceTable instanceof SlTable)) {
      throw new Error("tableTemplate should be a function take a parameter string:source|target return Template like html`<sl-table><sl-column></sl-column></sl-table>`");
    }
    this.targetTable.classList.add("table");
  }
  renderContent(direction) {
    const items = direction == "source" ? this.filterSourceDataList : this.filterTargetDataList;
    if (this.tableTemplate != void 0) {
      direction == "source" ? this.sourceTable.dataSource = items : this.targetTable.dataSource = items;
      return p`${direction == "source" ? this.sourceTable : this.targetTable}`;
    }
    const result = items.map((item) => {
      return p`<li class="render-item" part="render-item" @click=${(event) => this.processSelectItem(event, item, direction)}>
        <sl-checkbox
          part="render-checkbox"
          .shape=${"circle"}
          .checked=${l(direction == "source" ? this.sourceTempSelectedKeys && this.sourceTempSelectedKeys.includes(item.id) : this.targetTempSelectedKeys && this.targetTempSelectedKeys.includes(item.id))}
        >
        </sl-checkbox>
        <div class="render-item-label">${this.renderItem ? this.renderItem(item, direction) : item.name}</div>
      </li>`;
    });
    if (!items || items.length == 0) {
      return p`<div slot=${direction + "-empty"} class="emptyData">${getResouceValue("noData")}</div>`;
    } else {
      return p`<sl-scroll ${n2(direction == "source" ? this.sourceScrollRef : this.targetScrollRef)}>${result}</sl-scroll>`;
    }
  }
  render() {
    return p`<div part='base'>
      <div part='container' class='source' >
        <div part='header'></div>
        <div part='body'>
          ${!this.disableFilter ? p`<div part="search">${this.renderFilter("source")}</div>` : T}
          <div part='body-content'>${this.renderContent("source")}</div>
        </div>
      </div>
      <div part='base-operation'></div>
      <div part='container' class='target'>
        <div part='header'></div>
        <div part='body'>
            ${!this.disableFilter ? p`<div part="search">${this.renderFilter("target")}</div>` : T}
            <div part='body-content'>${this.renderContent("target")}</div>
        </div>
        </div>
      </div>
  </div>`;
  }
};
SlTransfer.styles = transfer_styles_default;
__decorateClass([
  e({ attribute: false, reflect: false })
], SlTransfer.prototype, "dataSource", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlTransfer.prototype, "renderItem", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "sourceTempSelectedKeys", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "targetTempSelectedKeys", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "targetSelectedKeys", 2);
__decorateClass([
  e({ type: Boolean })
], SlTransfer.prototype, "disabled", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "filterTargetDataList", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "filterSourceDataList", 2);
__decorateClass([
  watchProps(["dataSource", "filterMethod", "disableFilter", "targetSearchValue", "sourceSearchValue"])
], SlTransfer.prototype, "watchDataSourceChanged", 1);
__decorateClass([
  e({ type: Boolean, attribute: "disable-filter" })
], SlTransfer.prototype, "disableFilter", 2);
__decorateClass([
  e()
], SlTransfer.prototype, "filterPlaceholder", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlTransfer.prototype, "titleTemplate", 2);
__decorateClass([
  e({ type: Boolean })
], SlTransfer.prototype, "showSelectAll", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTransfer.prototype, "tableTemplate", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlTransfer.prototype, "filterMethod", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlTransfer.prototype, "onSelectChange", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "sourceSearchValue", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "targetSearchValue", 2);
__decorateClass([
  watch("tableTemplate")
], SlTransfer.prototype, "tableTemplateChange", 1);
SlTransfer = __decorateClass([
  resourceLocal(),
  n("sl-transfer")
], SlTransfer);

export {
  SlTransfer
};
