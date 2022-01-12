import {
  transfer_styles_default
} from "./chunk.UYZ525KC.js";
import {
  SlTable
} from "./chunk.QLHXPC2N.js";
import {
  e as e2,
  n as n2
} from "./chunk.C3DPGPIE.js";
import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  resourceLocal
} from "./chunk.RO3WIRWC.js";
import {
  getResouceValue
} from "./chunk.MC7JRT3U.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  l
} from "./chunk.AOA7W6OJ.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  isArray
} from "./chunk.3SJG5WV3.js";
import {
  e,
  n,
  t
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s,
  w,
  x
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

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
    this.targetKeys = [];
    this.disabled = false;
    this.cacheDataSource = /* @__PURE__ */ new Map();
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
    for (let key of this.targetKeys) {
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
        if (this.targetKeys && this.targetKeys.includes(key)) {
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
    if (this.customFilterTemplate) {
      return this.customFilterTemplate(_direction);
    }
    const placeholder = typeof this.filterPlaceholder != "undefined" ? isArray(this.filterPlaceholder) ? this.filterPlaceholder[_direction == "source" ? 0 : 1] : this.filterPlaceholder : getResouceValue("seachTransfer");
    return $`<sl-input direction=${_direction} size="small" @sl-input=${(event) => this.doFilterInputHandler(event, _direction)} placeholder=${placeholder} exportparts="base:slInput,input:input" clearable
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
      direction == "source" ? this.sourceTempSelectedKeys = [...array] : this.targetTempSelectedKeys = [...array];
      this.dispatchTransferChange();
    });
  }
  dispatchTransferChange() {
    emit(this, "sl-transfer-change", {
      detail: {
        "sourceSelectedKeys:": this.sourceTempSelectedKeys,
        targetSelectedKeys: this.targetTempSelectedKeys
      }
    });
    if (this.selectChangeCallback) {
      this.selectChangeCallback(this.sourceTempSelectedKeys, this.targetTempSelectedKeys);
    }
  }
  get sourceScroll() {
    return this.sourceScrollRef.value;
  }
  get targetScroll() {
    return this.targetScrollRef.value;
  }
  dispatchScrollEvent(event, direction) {
    let scroll = event.target;
    emit(this, "sl-scroll-item", {
      detail: { scroll, direction }
    });
  }
  tableTemplateChange() {
    const frag = document.createDocumentFragment();
    x(this.tableTemplate("source"), frag);
    this.sourceTable = frag.firstElementChild;
    if (this.sourceTable == null || !(this.sourceTable instanceof SlTable)) {
      throw new Error("tableTemplate should be a function take a parameter string:source|target return Template like html`<sl-table><sl-column></sl-column></sl-table>`");
    }
    this.sourceTable.id = "sourceTable";
    this.sourceTable.classList.add("table");
    const targetfrag = document.createDocumentFragment();
    x(this.tableTemplate("target"), targetfrag);
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
      return $`${direction == "source" ? this.sourceTable : this.targetTable}`;
    }
    const result = items.map((item) => {
      return $`<li class="render-item" part="render-item" @click=${(event) => this.processSelectItem(event, item, direction)}>
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
      return $`<div slot=${direction + "-empty"} class="emptyData">${getResouceValue("noData")}</div>`;
    } else {
      return $`<sl-scroll @sl-scroll-y=${(event) => this.dispatchScrollEvent(event, direction)} ${n2(direction == "source" ? this.sourceScrollRef : this.targetScrollRef)}>${result}</sl-scroll>`;
    }
  }
  getTempSelecteDataList(direction) {
    const item = direction == "source" ? this.sourceDataList : this.targetDataList;
    const selectedKeys = direction == "source" ? this.sourceTempSelectedKeys : this.targetTempSelectedKeys;
    return item.filter((item2) => selectedKeys.includes(item2.id));
  }
  renderTitle(direction) {
    const item = direction == "source" ? this.filterSourceDataList : this.filterTargetDataList;
    const totalItem = "source" ? this.sourceDataList : this.targetDataList;
    const selecteItems = this.getTempSelecteDataList(direction);
    const changeSelectAll = (event) => {
      let checkbox = event.target;
      let checked = checkbox.checked;
      const selectedKeys = checked ? direction == "source" ? this.sourceTempSelectedKeys : this.targetTempSelectedKeys : [];
      item.forEach((item2) => {
        let index = selectedKeys.indexOf(item2.id);
        if (checked && index < 0) {
          selectedKeys.push(item2.id);
        } else if (!checked) {
          selectedKeys.splice(index, 1);
        }
      });
      if (direction == "source") {
        this.sourceTempSelectedKeys = [...selectedKeys];
      } else {
        this.targetTempSelectedKeys = [...selectedKeys];
      }
    };
    const selectAllTemp = this.showSelectAll ? $`<sl-checkbox
          .indeterminate=${item.length > 0 && selecteItems.length > 0 && selecteItems.length < item.length}
          .checked=${item.length > 0 && item.length == selecteItems.length}
          part="selectAll"
          name="${direction}"
          @sl-change=${changeSelectAll}
        ></sl-checkbox>` : "";
    let titleHtml = this.titleTemplate ? isArray(this.titleTemplate) ? $`<span part="title">${this.titleTemplate[direction == "source" ? 0 : 1]}</span>` : this.titleTemplate(direction) : "";
    const selectItemSizeHtml = this.customSelectedTiitleTemplate ? this.customSelectedTiitleTemplate(selecteItems.length, item.length, totalItem.length) : getResouceValue("transferSelectedFun")(selecteItems.length, item.length);
    return $`${selectAllTemp}<span part="selecteItems-span">${selectItemSizeHtml}</span>${titleHtml}`;
  }
  render() {
    return $`<div part='base'>
      <div part='container' class='source' >
        <div part='header'>${this.renderTitle("source")}</div>
        <div part='body'>
          ${!this.disableFilter ? $`<div part="search">${this.renderFilter("source")}</div>` : w}
          <div part='body-content'>${this.renderContent("source")}</div>
        </div>
      </div>
      <div part='base-operation'></div>
      <div part='container' class='target'>
        <div part='header'>${this.renderTitle("target")}</div>
        <div part='body'>
            ${!this.disableFilter ? $`<div part="search">${this.renderFilter("target")}</div>` : w}
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
  e({ type: Array })
], SlTransfer.prototype, "targetKeys", 2);
__decorateClass([
  e({ type: Boolean })
], SlTransfer.prototype, "disabled", 2);
__decorateClass([
  watchProps(["dataSource", "filterMethod", "disableFilter", "targetSearchValue", "sourceSearchValue"])
], SlTransfer.prototype, "watchDataSourceChanged", 1);
__decorateClass([
  t()
], SlTransfer.prototype, "filterTargetDataList", 2);
__decorateClass([
  t()
], SlTransfer.prototype, "filterSourceDataList", 2);
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
], SlTransfer.prototype, "selectChangeCallback", 2);
__decorateClass([
  e({ attribute: false })
], SlTransfer.prototype, "customFilterTemplate", 2);
__decorateClass([
  e({ attribute: false })
], SlTransfer.prototype, "customSelectedTiitleTemplate", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlTransfer.prototype, "sourceSearchValue", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlTransfer.prototype, "targetSearchValue", 2);
__decorateClass([
  watch("tableTemplate")
], SlTransfer.prototype, "tableTemplateChange", 1);
SlTransfer = __decorateClass([
  resourceLocal(),
  customStyle(),
  n("sl-transfer")
], SlTransfer);

export {
  SlTransfer
};
