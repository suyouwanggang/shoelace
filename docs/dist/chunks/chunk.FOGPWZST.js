import {
  getCellContext,
  getTableHeadCellContext,
  renderTdCellTemplate,
  renderThColTemplate,
  spread
} from "./chunk.OPWNCEO3.js";
import {
  defaultSortConfig,
  defaultTreeConfig
} from "./chunk.YA7IIDTE.js";
import {
  vituralScrollCalc
} from "./chunk.QY7IOFXV.js";
import {
  iteratorNodeData
} from "./chunk.KKWK7GGC.js";
import {
  editNone,
  n as n3
} from "./chunk.LVEIYLOF.js";
import {
  getColumnCacheData,
  tableHelper_default
} from "./chunk.J5LEIX36.js";
import {
  removeTableCacheByKey,
  restoreFromLocalCache,
  saveAsDefaultTableCache,
  updateTableCache
} from "./chunk.ZX3DXCG7.js";
import {
  debounce,
  throttleTimeout
} from "./chunk.NIBYN26Y.js";
import {
  dragOnHandler
} from "./chunk.L5TP2MIU.js";
import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  addResizeHander
} from "./chunk.TOSAMJIL.js";
import {
  getResouceValue
} from "./chunk.TPWBEAY3.js";
import {
  i as i2
} from "./chunk.75OJMBEA.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  column_default
} from "./chunk.MSNVOLD5.js";
import {
  addEvent,
  getCssValue,
  isArray,
  isFunction,
  onEvent,
  onEventArray
} from "./chunk.UYG3ZEVK.js";
import {
  o
} from "./chunk.ODPXQ3L3.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
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
  x,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass,
  __spreadProps,
  __spreadValues
} from "./chunk.QRXTBWFL.js";

// src/components/table/index.litcss
var styles = r`@charset "UTF-8";:host{display:block;--sl-th-padding-size:12px 8px;--sl-table-border-color:var(--sl-color-netural-200);--sl-table-border-color:var(--sl-color-neutral-200);--sl-table-header-bg-color:var(--sl-color-neutral-50);--sl-table-scroll-barWidth:16px;--sl-table-td-right-width:0;--sl-table-td-right-width:0;--sl-table-td-bottom-width:1px;--sl-table-stripe-color:var(--sl-color-blue-gray-50)}td,th{background-color:rgb(var(--sl-table-background-color))}.noBorder{border:0}.tdBorder,table[part=table] th,table[part=table] td{border-bottom:solid var(--sl-table-td-bottom-width) rgb(var(--sl-table-border-color));border-right:solid var(--sl-table-td-right-width) rgb(var(--sl-table-border-color))}.cell,table[part=table] th,table[part=table] td{padding:var(--sl-th-padding-size);transition:background-color 1s cubic-bezier(0.075,0.82,0.165,1)}table[part=table]{border-collapse:separate;border-spacing:0}table[part=table] thead{position:sticky;top:0;z-index:2}table[part=table] .fixedFoot{position:sticky;bottom:0;z-index:2}table[part=table] th{position:relative;font-weight:normal;background-color:rgb(var(--sl-table-header-bg-color))}:host([border]) table[part=table]{--sl-table-td-right-width:1px;border-top:solid 1px rgb(var(--sl-table-border-color));border-left:solid 1px rgb(var(--sl-table-border-color))}:host([border]) table[part=table]::before{content:"";top:0;left:0;z-index:11;position:absolute;width:100%;border-top:solid 1px rgb(var(--sl-table-border-color))}:host([border]) table[part=table]::after{z-index:11;content:"";top:0;left:0;position:absolute;height:100%;border-left:solid 1px rgb(var(--sl-table-border-color))}.stripe,.sl-table-base-scroll-div[stripe] tbody tr:nth-child(odd) td,.sl-table-base-scroll-div[hover-able] table tbody tr:hover td{background-color:rgb(var(--sl-table-stripe-color))}.sl-table-base{position:relative;overflow:hidden}.sl-table-base[size=small]{--sl-th-padding-size:8px}.sl-table-base[size=larger]{--sl-th-padding-size:16px}.sl-table-base-scroll-div{overflow:auto}.cursor{cursor:pointer}.thWrap{display:flex;word-break:break-all;align-items:center}th[align=center] .thWrap{justify-content:center}th[align=right] .thWrap{justify-content:flex-end}.column-title{display:inline-flex}.sort-wrap{cursor:pointer;position:relative;padding:0 6px;white-space:normal;color:#bfbfbf;display:inline-flex;flex-direction:column;font-size:10px;line-height:10px;flex:0 0 auto;font-size:12px;line-height:12px;transition:color .3s;min-width:12px;min-height:12px}.sort-wrap .current{color:rgb(var(--sl-color-gray-700))}.sort-wrap svg{width:1em;height:1em}.th-resize-helper{position:absolute;top:0;right:0;bottom:0;width:6px;text-align:center;cursor:col-resize}.th-resize-helper::before{content:"";position:absolute;left:5px;width:1px;height:100%;border-left:solid 1px rgb(var(--sl-table-border-color))}:host([border]) .th-resize-helper::before{left:6px}.nowrap-tree-node{white-space:nowrap}.tree-node-inner{display:flex;align-items:center}.tree-node-inner .tree-node-icon{position:relative;cursor:pointer;font-size:var(--sl-tree-trriger-icon,14px);padding:var(--sl-tree-trriger-padding,0 4px 0 2px)}.tree-node-inner .tree-node-empty-node{display:inline;width:16px}.tree-node-inner svg{width:1em;height:1em}.expand-toogle{display:flex;align-items:center}.expand-toogle .expand-toogle-icon{position:relative;cursor:pointer;top:2px;font-size:var(--sl-tree-trriger-icon,14px);padding:var(--sl-tree-trriger-padding,0 4px)}.expand-toogle svg{width:1em;height:1em}.tdWrap{word-break:break-all;word-wrap:break-word}.cellBox{display:-webkit-box;overflow:hidden;-webkit-line-clamp:var(--sl-table-cell-box-lines,1);-webkit-box-orient:vertical}.edit_input::part(input){min-width:10px;width:10px}.edit_date::part(input){min-width:10px;width:10px}.edit_select::part(select_label){min-width:0;width:0}.edit_multi-checkbox sl-checkbox+sl-checkbox{margin-left:.8em}`;
var table_default = styles;

// src/components/table/table.styles.ts
var table_styles_default = r`
  ${component_styles_default}
  ${table_default}
`;

// src/components/table/table.ts
var rowContextMap = new WeakMap();
var setRowContext = (tr, context) => {
  if (tr) {
    rowContextMap.set(tr, context);
  }
};
var getRowContext = (tr) => {
  return rowContextMap.get(tr);
};
var componentID = 0;
var SlTable = class extends n {
  constructor() {
    super(...arguments);
    this.componentID = `${"tableID_" + componentID++}`;
    this.size = "small";
    this.border = false;
    this.hoverAble = true;
    this.stripe = false;
    this.sortConfig = __spreadValues({}, defaultSortConfig);
    this.fixedFoot = false;
    this.treeLoadingNode = [];
    this.expandRowData = [];
    this.expandLazy = false;
    this.expandAccordion = false;
    this.expandingRowData = [];
    this.cacheExpandLazyLoadDataMap = new Map();
    this.isAsyncTableWidth = false;
    this.virtualItemHeight = 45;
    this.editEnable = false;
    this.editMode = "row";
    this.editAccordion = false;
    this.editTrigger = "click";
    this.currentEditRow = [];
    this.currentEditColumn = [];
    this.enableCellBox = false;
    this.cellBoxLines = 1;
    this.checkTreeCasecadeDown = true;
    this.checkTreeCasecadeUp = false;
    this.theadRows = [];
    this.tdRenderColumns = [];
    this.isColumnHanlderFlag = true;
  }
  locacheIDChange(oldKey) {
    if (oldKey) {
      removeTableCacheByKey(oldKey);
    }
    if (this.cacheKey) {
      restoreFromLocalCache(this);
    }
  }
  sortConfigChange() {
    this.sortConfig = __spreadValues(__spreadValues({}, defaultSortConfig), this.sortConfig);
    if (!this.sortConfig.multi) {
      if (Array.isArray(this.sortValue) && this.sortValue.length > 0) {
        this.sortValue = this.sortValue[this.sortValue.length - 1];
      }
    } else {
      if (!Array.isArray(this.sortValue) && this.sortValue) {
        this.sortValue = [this.sortValue];
      }
    }
  }
  getRenderDataSource() {
    return this.innerDataSource;
  }
  treeNodeHasChildren(rowData) {
    if (typeof rowData.children == "undefined" && this.treeConfig && this.treeConfig.lazy) {
      return rowData[this.treeConfig.hasChildProp];
    } else {
      return rowData.children ? rowData.children.length > 0 : false;
    }
  }
  async doExpandRowData(rowData) {
    const table = this;
    const index = table.expandRowData.indexOf(rowData);
    const isExpend = index >= 0;
    const expandEvent = emit(table, `sl-table-expand-before`, {
      cancelable: true,
      detail: {
        expended: isExpend,
        rowData
      }
    });
    if (!expandEvent.defaultPrevented) {
      if (!isExpend) {
        if (table.expandAccordion) {
          table.expandRowData.splice(0, table.expandRowData.length);
        }
        table.expandRowData.push(rowData);
      } else {
        table.expandRowData.splice(index, 1);
      }
      table.expandRowData = [...table.expandRowData];
      table.updateComplete.then(() => {
        emit(table, "sl-table-expand", {
          detail: {
            expended: !isExpend,
            rowData
          }
        });
      });
    }
  }
  getRowDataTreeLevel(rowData) {
    var _a;
    return (_a = this.cacheTreeNodeMap.get(rowData)) == null ? void 0 : _a.level;
  }
  getRowDataParentData(rowData) {
    var _a;
    return (_a = this.cacheTreeNodeMap.get(rowData)) == null ? void 0 : _a.parent;
  }
  getRowDataDataIndex(rowData) {
    var _a;
    return (_a = this.cacheTreeNodeMap.get(rowData)) == null ? void 0 : _a.seqno;
  }
  get treeDataCache() {
    return this.cacheTreeNodeMap;
  }
  updated(map) {
    super.updated(map);
    this.asynTableHeaderWidth();
  }
  asynTableHeaderWidth() {
    if (!this.isAsyncTableWidth) {
      this.isAsyncTableWidth = true;
      Promise.resolve().then(() => {
        this.watchFixedColumnsChange();
        this.isAsyncTableWidth = false;
        emit(this, "sl-table-resize");
      });
    }
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    this.columnChangeHanlder();
    this._resizeResult = addResizeHander([this, this.table], () => {
      this.asynTableHeaderWidth();
    });
    connectTableHanlder(this);
  }
  connectedCallback() {
    var _a;
    super.connectedCallback();
    (_a = this._resizeResult) == null ? void 0 : _a.dispose();
  }
  _renderNoDataTemplate() {
    if (this.innerDataSource && this.innerDataSource.length == 0) {
      return y`<slot @slotchange=${this.columnChangeHanlder} name="no-data">${getResouceValue("noData")}</slot>`;
    }
    return ``;
  }
  caculateFixedColumnStyle(col, tableRect, fixedLeft) {
    let td = this.table.querySelector(`td[uniqueid="${col.uniqueID}"]`);
    if (!td) {
      td = this.table.querySelector(`th[uniqueid="${col.uniqueID}"]`);
    }
    if (td) {
      return `
          th[uniqueid="${col.uniqueID}"],
          td[uniqueid="${col.uniqueID}"]{
            position:sticky !important;z-index:1; 
            ${fixedLeft ? `left:${td.getBoundingClientRect().left - tableRect.left}px;` : ""}
            ${!fixedLeft ? `right:${tableRect.right - td.getBoundingClientRect().right}px;` : ""}
          }
        `;
    }
    return "";
  }
  watchFixedColumnsChange() {
    this.fixedStyleElement.textContent = "";
    let style = "";
    if (this.fixedColumns) {
      let array = Array.isArray(this.fixedColumns) ? this.fixedColumns : String(this.fixedColumns).split(",");
      let left = parseInt("" + array[0]);
      let right = array.length > 1 ? parseInt("" + array[1]) : 0;
      let thead = this.thead;
      let tableRect = thead.getBoundingClientRect();
      let columnSize = this.tdRenderColumns.length;
      if (!isNaN(left)) {
        for (let i3 = 0, j = Math.min(left, columnSize); i3 < j; i3++) {
          let col = this.tdRenderColumns[i3];
          while (col != null && col.tagName.toLowerCase() == "sl-column") {
            style += this.caculateFixedColumnStyle(col, tableRect, true);
            col = col.parentElement;
          }
        }
      }
      if (!isNaN(right)) {
        for (let i3 = columnSize - 1, j = 0; j < right && i3 >= 0; ) {
          let col = this.tdRenderColumns[i3];
          while (col != null && col.tagName.toLowerCase() == "sl-column") {
            style += this.caculateFixedColumnStyle(col, tableRect, false);
            col = col.parentElement;
          }
          i3--;
          j++;
        }
      }
    }
    this.fixedStyleElement.textContent = style;
  }
  render() {
    let tableStyle = {};
    this.tableHeight ? tableStyle["height"] = `calc( ${isNaN(Number(this.tableHeight)) ? this.tableHeight : this.tableHeight + "px"} )` : "";
    this.tableMaxHeight ? tableStyle["maxHeight"] = `calc( ${isNaN(Number(this.tableMaxHeight)) ? this.tableMaxHeight : this.tableMaxHeight + "px"} )` : "";
    this.tableMinHeight ? tableStyle["minHeight"] = `calc( ${isNaN(Number(this.tableMinHeight)) ? this.tableMinHeight : this.tableMinHeight + "px"} )` : "";
    return y` <style id="styleID"></style>
      <div class="sl-table-base" part="base" size=${this.size}>
        <div class="sl-table-base-scroll-div" style=${i2(tableStyle)} part="scroll-div" ?hover-able=${this.hoverAble} ?stripe=${this.stripe} ?border=${this.border}>
          <!--渲染table 区 -->
          <table part="table" id="tableID" componentID=${this.componentID}>
            <thead part="thead" componentID=${this.componentID}>
              ${this._renderTheadRows()}
            </thead>
            <tbody componentID=${this.componentID}>
              ${this._renderDataSourceRows()}
            </tbody>
            <tfoot part="tfoot" class=${this.fixedFoot ? "fixedFoot" : ""}>
              ${this.customRenderFooter ? this.customRenderFooter(this.tdRenderColumns) : ""}
            </tfoot>
          </table>
          ${this._renderNoDataTemplate()}
        </div>
        <slot @slotchange=${this.columnChangeHanlder}></slot>
      </div>`;
  }
  _renderTheadRows() {
    const table = this;
    const trTemplates = (rowColumn, rowIndex) => {
      return y`<tr .columns=${rowColumn}>
        ${rowColumn.map((column, index) => {
        const cache = getColumnCacheData(column);
        const context = {
          column,
          colIndex: index,
          rowspan: cache.rowspan,
          colspan: cache.colspan,
          colRowIndex: rowIndex
        };
        return renderThColTemplate(context, table);
      })}
      </tr>`;
    };
    return this.theadRows.map((items, index) => trTemplates(items, index));
  }
  changeEditAccordion() {
    if (this.editAccordion) {
      if (this.currentEditRow && this.currentEditRow.length > 0) {
        this.currentEditRow = [this.currentEditRow[0]];
      }
      if (this.currentEditColumn && this.currentEditColumn.length > 0) {
        this.currentEditColumn = [this.currentEditColumn[0]];
      }
    }
  }
  watchCellBoxLinesChange() {
    this.style.setProperty("--sl-table-cell-box-lines", this.cellBoxLines + "");
  }
  getRowDataCheckValue(rowData) {
    const rowCheckValue = isFunction(this.checkPropField) ? this.checkPropField(rowData) : this.checkPropField ? rowData[this.checkPropField] : rowData;
    return rowCheckValue;
  }
  forEachCheckValue(vistorFun) {
    if (this.dataSource) {
      const wrapVistor = (rowData, ...args) => {
        if (this.isRowDataChecked(rowData)) {
          vistorFun(rowData, ...args);
        }
      };
      if (this.treeConfig) {
        for (let l of this.dataSource) {
          iteratorNodeData(l, wrapVistor);
        }
      } else {
        for (let i3 = 0, j = this.dataSource.length; i3 < j; i3++) {
          wrapVistor(this.dataSource[i3], i3);
        }
      }
    }
  }
  isRowDataChecked(rowData) {
    let rowCheckValue = this.getRowDataCheckValue(rowData);
    return isArray(this.checkValue) ? this.checkValue.includes(rowCheckValue) : this.checkValue != void 0 && this.checkValue == rowCheckValue;
  }
  isRowDataRadioChecked(rowData) {
    let rowCheckValue = this.getRowDataCheckValue(rowData);
    return this.radioValue == rowCheckValue;
  }
  isRowDataCheckedDisabled(rowData) {
    return isFunction(this.checkDisablePropField) ? this.checkDisablePropField(rowData) : this.checkDisablePropField ? rowData[this.checkDisablePropField] : false;
  }
  watchDataSourceChange() {
    if (this.treeConfig && this.dataSource) {
      this.treeConfig = __spreadValues(__spreadValues({}, defaultTreeConfig), this.treeConfig);
      this.cacheTreeNodeMap = new Map();
      let allTreeNode = [];
      let result = [];
      let seqNo = 0;
      for (let rowData of this.dataSource) {
        iteratorNodeData(rowData, (node, parentNode) => {
          if (typeof node.close == "undefined") {
            node.close = true;
          }
          allTreeNode.push(node);
          let cache = {
            seqno: seqNo,
            level: this.cacheTreeNodeMap.has(parentNode) ? this.getRowDataTreeLevel(parentNode) + 1 : 0,
            parent: parentNode
          };
          this.cacheTreeNodeMap.set(node, cache);
          seqNo++;
        });
      }
      for (let index = 0, j = allTreeNode.length; index < j; index++) {
        let rowData = allTreeNode[index];
        result.push(rowData);
        if (this.treeConfig && rowData.close) {
          index += getTreeNodeAllChildrenSize(rowData);
        }
      }
      this.innerDataSource = result;
    } else {
      this.innerDataSource = this.dataSource;
    }
    this.cacheExpandLazyLoadDataMap.clear();
  }
  _renderRowDataBetween(start, end) {
    const table = this;
    const rowList = [];
    const dataSource = this.innerDataSource;
    const cellTdArray = this.tdRenderColumns;
    for (let i3 = start, j = end; i3 < j; i3++) {
      let index = i3;
      let rowData = dataSource[index];
      const rowContext = {
        rowData,
        rowIndex: index
      };
      if (table.treeConfig) {
        rowContext.level = this.getRowDataTreeLevel(rowData);
        rowContext.parentData = this.getRowDataParentData(rowData);
        rowContext.rowIndex = this.getRowDataDataIndex(rowData);
      }
      const rowHtml = [];
      for (let x2 = 0, y2 = cellTdArray.length; x2 < y2; x2++) {
        const column = cellTdArray[x2];
        const cellContext = __spreadProps(__spreadValues({}, rowContext), {
          column,
          colIndex: x2
        });
        const tdResult = renderTdCellTemplate(cellContext, table);
        if (tdResult != x && tdResult != null && tdResult != void 0) {
          rowHtml.push(tdResult);
        }
      }
      const trStyle = this.customRenderRowStyle ? this.customRenderRowStyle(rowContext) : {};
      const trClassInfo = this.customRenderRowClassMap ? this.customRenderRowClassMap(rowContext) : null;
      let trClassObject = {};
      if (trClassInfo) {
        if (Array.isArray(trClassInfo)) {
          trClassInfo.forEach((item) => item.trim() != "" ? trClassObject[item.trim()] = true : "");
        } else if (typeof trClassInfo == "string") {
          trClassInfo.split(" ").forEach((item) => item.trim() != "" ? trClassObject[item.trim()] = true : "");
        } else {
          trClassObject = __spreadValues({}, trClassInfo);
        }
      }
      const rowSpreadResult = this.customRenderRowSpread ? this.customRenderRowSpread(rowContext) : void 0;
      const expandRowTemplate = this.expandRowRender != void 0 && this.expandRowData.includes(rowData) ? this.expandRowRender(rowContext, cellTdArray, this.cacheExpandLazyLoadDataMap.get(rowData)) : x;
      rowList.push(y`<tr
            ${n3((el) => {
        setRowContext(el, rowContext);
      })}
            .rowData=${rowData}
            style=${i2(trStyle)}
            class=${o(trClassObject)}
            ${spread(rowSpreadResult)}
          >
            ${rowHtml}
          </tr>
          ${expandRowTemplate}`);
    }
    return rowList;
  }
  getRowContext(row) {
    return getRowContext(row);
  }
  getCellContext(td) {
    return getCellContext(td);
  }
  getHeadCellContext(th) {
    return getTableHeadCellContext(th);
  }
  _virtualRenderTbodyRows() {
    if (this.enableVirtualScroll && this.scrollDiv) {
      if (!this.virtualItemHeight) {
        console.error("virtualItem height should be set ");
      }
      let tdRenderColumns = this.tdRenderColumns;
      let scrollTop = this.scrollDiv.scrollTop;
      let height = this.thead.offsetHeight + (this.table.tFoot ? this.table.tFoot.offsetHeight : 0);
      const result = vituralScrollCalc(this.scrollDiv.clientHeight - height, this.innerDataSource.length, this.virtualItemHeight, scrollTop);
      if (result.offsetStart == 0 && result.offsetEnd == 0 && this.innerDataSource.length > 0) {
        this.updateComplete.then(() => {
          this.requestUpdate();
        });
      }
      const trTop = y`<tr>
        <td style=${result.paddingTop > 0 ? `height:${result.paddingTop}px;` : "display:none"} colspan=${tdRenderColumns.length}>&nbsp;</td>
      </tr>`;
      const trBottom = y`<tr>
        <td style=${result.paddingBottom > 0 ? `height:${result.paddingBottom}px;` : "display:none"} colspan=${tdRenderColumns.length}>&nbsp;</td>
      </tr>`;
      const trs = this._renderRowDataBetween(result.offsetStart, result.offsetEnd);
      return y`${trTop}${trs}${trBottom}`;
    }
    return "";
  }
  _renderDataSourceRows() {
    if (this.innerDataSource) {
      return this.enableVirtualScroll ? this._virtualRenderTbodyRows() : this._renderRowDataBetween(0, this.innerDataSource.length);
    }
    return x;
  }
  get allSubColumns() {
    let columns = Array.from(this.children).filter((item) => {
      return item instanceof column_default;
    });
    return columns.sort((item1, item2) => item1.order - item2.order);
  }
  get canShowColumns() {
    let columns = Array.from(this.children).filter((item) => {
      return item instanceof column_default && !item.hidden;
    });
    return columns.sort((item1, item2) => item1.order - item2.order);
  }
  columnChangeHanlder() {
    if (this.hasUpdated && this.scrollDiv && this.isColumnHanlderFlag) {
      this.isColumnHanlderFlag = false;
      Promise.resolve().then(() => {
        const { rows, leafColumns } = tableHelper_default(this.canShowColumns);
        this.theadRows = rows;
        this.tdRenderColumns = leafColumns;
        this.isColumnHanlderFlag = true;
      });
    }
  }
};
SlTable.styles = table_styles_default;
__decorateClass([
  t()
], SlTable.prototype, "componentID", 2);
__decorateClass([
  e({ type: String, attribute: false, reflect: true })
], SlTable.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, attribute: true, reflect: true })
], SlTable.prototype, "border", 2);
__decorateClass([
  e({ type: Boolean, attribute: false, reflect: true })
], SlTable.prototype, "hoverAble", 2);
__decorateClass([
  e({ type: Boolean, attribute: false, reflect: true })
], SlTable.prototype, "stripe", 2);
__decorateClass([
  e({ type: Array, attribute: false })
], SlTable.prototype, "dataSource", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "sortConfig", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "sortValue", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "treeConfig", 2);
__decorateClass([
  e({ type: Boolean, attribute: false, reflect: true })
], SlTable.prototype, "fixedFoot", 2);
__decorateClass([
  e({ type: Object })
], SlTable.prototype, "customRenderFooter", 2);
__decorateClass([
  e({ type: String, reflect: true, attribute: "cache-key" })
], SlTable.prototype, "cacheKey", 2);
__decorateClass([
  watch("cacheKey")
], SlTable.prototype, "locacheIDChange", 1);
__decorateClass([
  watchProps(["sortConfig", "sortValue"])
], SlTable.prototype, "sortConfigChange", 1);
__decorateClass([
  e({ type: String })
], SlTable.prototype, "tableMaxHeight", 2);
__decorateClass([
  e({ type: String })
], SlTable.prototype, "tableMinHeight", 2);
__decorateClass([
  e({ type: String })
], SlTable.prototype, "tableHeight", 2);
__decorateClass([
  e({ type: Boolean })
], SlTable.prototype, "tableLayoutFixed", 2);
__decorateClass([
  e({ type: Boolean })
], SlTable.prototype, "treeNodeNoWrap", 2);
__decorateClass([
  i("#tableID", true)
], SlTable.prototype, "table", 2);
__decorateClass([
  t()
], SlTable.prototype, "innerDataSource", 2);
__decorateClass([
  e({ type: Array, attribute: false })
], SlTable.prototype, "treeLoadingNode", 2);
__decorateClass([
  e({ type: Object })
], SlTable.prototype, "treeLoadingNodeMethod", 2);
__decorateClass([
  e({ type: Array, attribute: false })
], SlTable.prototype, "expandRowData", 2);
__decorateClass([
  e({ type: String, attribute: false })
], SlTable.prototype, "expandColumn", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlTable.prototype, "expandLazy", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "expandLazyLoadMethod", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlTable.prototype, "expandAccordion", 2);
__decorateClass([
  t()
], SlTable.prototype, "expandingRowData", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "expandRowRender", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "cacheExpandLazyLoadDataMap", 2);
__decorateClass([
  i("thead[part=thead", true)
], SlTable.prototype, "thead", 2);
__decorateClass([
  i("div[part=base]", true)
], SlTable.prototype, "baseDiv", 2);
__decorateClass([
  i("div[part=scroll-div]", false)
], SlTable.prototype, "scrollDiv", 2);
__decorateClass([
  e({ attribute: false })
], SlTable.prototype, "fixedColumns", 2);
__decorateClass([
  watchProps(["fixedColumns"], { waitUntilFirstUpdate: true })
], SlTable.prototype, "watchFixedColumnsChange", 1);
__decorateClass([
  i("#styleID", true)
], SlTable.prototype, "fixedStyleElement", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderCellStyle", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderCellClassMap", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderCellSpread", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderCellHeadStyle", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderCellHeadClassMap", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderCellHeadSpread", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderRowStyle", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderRowClassMap", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "customRenderRowSpread", 2);
__decorateClass([
  e({ type: Number, attribute: false })
], SlTable.prototype, "virtualItemHeight", 2);
__decorateClass([
  e({ type: Number, attribute: false })
], SlTable.prototype, "enableVirtualScroll", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlTable.prototype, "editEnable", 2);
__decorateClass([
  e({ type: String, attribute: false })
], SlTable.prototype, "editMode", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlTable.prototype, "editAccordion", 2);
__decorateClass([
  watch("editAccordion")
], SlTable.prototype, "changeEditAccordion", 1);
__decorateClass([
  e({ type: String, attribute: false })
], SlTable.prototype, "editTrigger", 2);
__decorateClass([
  e({ type: Array, attribute: false })
], SlTable.prototype, "currentEditRow", 2);
__decorateClass([
  t()
], SlTable.prototype, "currentEditCell", 2);
__decorateClass([
  e({ type: Array, attribute: false })
], SlTable.prototype, "currentEditColumn", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlTable.prototype, "enableCellBox", 2);
__decorateClass([
  e({ type: Number, attribute: false })
], SlTable.prototype, "cellBoxLines", 2);
__decorateClass([
  watch("cellBoxLines", { waitUntilFirstUpdate: true })
], SlTable.prototype, "watchCellBoxLinesChange", 1);
__decorateClass([
  e({ type: String })
], SlTable.prototype, "checkPropField", 2);
__decorateClass([
  e()
], SlTable.prototype, "checkDisablePropField", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "checkValue", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTable.prototype, "radioValue", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlTable.prototype, "checkTreeCasecadeDown", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlTable.prototype, "checkTreeCasecadeUp", 2);
__decorateClass([
  watchProps(["dataSource", "treeConfig"])
], SlTable.prototype, "watchDataSourceChange", 1);
__decorateClass([
  t()
], SlTable.prototype, "theadRows", 2);
__decorateClass([
  t()
], SlTable.prototype, "tdRenderColumns", 2);
SlTable = __decorateClass([
  customStyle(),
  n2("sl-table")
], SlTable);
var table_default2 = SlTable;

// src/components/table/tableEventHelper.ts
var getTreeNodeAllChildrenSize = (rowData) => {
  let size = 0;
  iteratorNodeData(rowData, (_node, _parent) => {
    size++;
  });
  return size - 1;
};
var handlerNodeToogleListener = (table) => {
  let tableEl = table.table;
  return onEvent(tableEl, `tbody[componentID=${table.componentID}]>tr>td>div[part=tree-node] span.tree-node-icon[part=tree-node-toogle][componentID=${table.componentID}]`, "click", (event) => {
    const el = event.delegateTarget;
    let td = el.closest("td");
    while (td && td.closest("table") != table.table) {
      td = td.parentElement.closest("td");
    }
    const cellContext = getCellContext(td);
    const rowData = cellContext.rowData;
    if (typeof rowData.children == "undefined" && table.treeConfig && table.treeConfig.lazy) {
      if (!table.treeLoadingNodeMethod) {
        console.warn("lazy \u6A21\u5F0F\u4E0B\u5E94\u8BE5\u8BBE\u7F6E \u52A0\u8F7D\u65B9\u6CD5\uFF1AloadingNodeMethod");
        return;
      }
      table.treeLoadingNode.push(rowData);
      table.treeLoadingNode = [...table.treeLoadingNode];
      Promise.resolve().then(async () => {
        try {
          let result = await table.treeLoadingNodeMethod(cellContext);
          if (result) {
            rowData.children = result;
          }
          rowData.close = false;
          let index = table.treeLoadingNode.indexOf(rowData);
          if (index >= 0) {
            table.treeLoadingNode.splice(index, 1);
          }
          const isScrollEnd = table.scrollDiv.scrollTop == table.scrollDiv.scrollHeight - table.scrollDiv.offsetHeight;
          if (isScrollEnd) {
            table.scrollDiv.scrollTop = table.scrollDiv.scrollTop - 1;
          }
          table.watchDataSourceChange();
          emit(table, "sl-tree-node-loaded", {
            detail: {
              dom: event.target,
              result,
              context: cellContext
            }
          });
        } catch (ex) {
          console.error(ex);
          table.treeLoadingNode.splice(table.treeLoadingNode.indexOf(rowData), 1);
          table.treeLoadingNode = [...table.treeLoadingNode];
          emit(table, "sl-tree-node-load-error", {
            detail: {
              dom: event.target,
              error: ex,
              context: cellContext
            }
          });
        }
      });
      return;
    }
    const nodeEvent = emit(table, `sl-tree-node-before-${rowData.close ? "open" : "close"}`, {
      cancelable: true,
      detail: {
        dom: event.target,
        context: cellContext
      }
    });
    const nodeToogleEvent = emit(table, `sl-tree-node-toogle`, {
      cancelable: true,
      detail: {
        dom: event.target,
        context: cellContext
      }
    });
    if (!nodeEvent.defaultPrevented && !nodeToogleEvent.defaultPrevented) {
      rowData.close = !rowData.close;
      table.watchDataSourceChange();
      table.updateComplete.then(() => {
        emit(table, `sl-tree-node-${rowData.close ? "close" : "open"}`, {
          detail: {
            dom: event.target,
            context: cellContext
          }
        });
        emit(table, `sl-tree-node-toogle`, {
          detail: {
            dom: event.target,
            context: cellContext
          }
        });
      });
    }
  });
};
var lastEditCellSymbol = Symbol("lastEditCell");
var lastEditSymboPromise = Symbol("lastEditPromise");
var getLastEditCell = (table) => {
  return table[lastEditCellSymbol];
};
var setLastEditCell = (table, lastEditCell) => {
  return table[lastEditCellSymbol] = lastEditCell;
};
var TABLE_EDIT_SELECTS = "input,select,textarea,sl-input,sl-select,sl-date";
var processTDCellEdit = (td, table, event) => {
  const tr = td.parentElement;
  processEdit();
  function processEdit() {
    const rowContext = getRowContext(tr);
    const cellContext = getCellContext(td);
    if (!cellContext || !cellContext.column) {
      return;
    }
    const edit = cellContext.column.edit;
    if (edit == editNone || !edit) {
      return;
    }
    let lastEditCell = getLastEditCell(table);
    if (lastEditCell && lastEditCell != td) {
      const eventEmit = emit(table, "sl-cell-edit-before-change", {
        cancelable: true,
        detail: {
          td: lastEditCell,
          context: getCellContext(lastEditCell)
        }
      });
      if (!eventEmit.defaultPrevented) {
        editCellFun();
      }
    } else {
      editCellFun();
    }
    function editCellFun() {
      if (event.type == "contextmenu") {
        event.preventDefault();
      }
      const eventEmit = emit(table, "sl-cell-edit-start", {
        cancelable: true,
        detail: {
          td,
          context: getCellContext(td)
        }
      });
      if (eventEmit.defaultPrevented) {
        return;
      }
      if (table[lastEditSymboPromise]) {
        return;
      }
      table[lastEditSymboPromise] = true;
      Promise.resolve().then(() => {
        if (table.editMode == "row") {
          if (!(table.currentEditRow && table.currentEditRow.includes(rowContext.rowData))) {
            if (table.editAccordion) {
              table.currentEditRow = [rowContext.rowData];
            } else {
              if (!table.currentEditRow) {
                table.currentEditRow = [];
              }
              table.currentEditRow.push(rowContext.rowData);
            }
          }
        } else if (table.editMode == "column") {
          if (!(table.currentEditColumn && table.currentEditColumn.includes(cellContext.column))) {
            if (table.editAccordion) {
              table.currentEditColumn = [cellContext.column];
            } else {
              if (!table.currentEditColumn) {
                table.currentEditColumn = [];
              }
              table.currentEditColumn.push(cellContext.column);
            }
          }
        } else if (table.editMode == "cell") {
          table.currentEditCell = {
            rowData: rowContext.rowData,
            column: cellContext.column
          };
        }
        table.requestUpdate();
        table.updateComplete.then(() => {
          table[lastEditSymboPromise] = false;
          let editor = td.querySelector(TABLE_EDIT_SELECTS);
          editor == null ? void 0 : editor.focus();
          if (td != getLastEditCell(table)) {
            emit(table, "sl-cell-edit-active", {
              detail: {
                td,
                context: cellContext
              }
            });
            setLastEditCell(table, td);
          }
        });
      });
    }
  }
};
var TABLE_TBODY_DELEGATE_EVENTS = ["click", "dblclick", "contextmenu", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mousemove", "mouseover", "mouseout"];
var hanlderTRTDEvent = (table) => {
  const one1 = onEventArray(table.table, `tbody[componentID=${table.componentID}]>tr>td`, TABLE_TBODY_DELEGATE_EVENTS, (event) => {
    let td = event.delegateTarget;
    let tr = td.parentElement;
    while (td && td.parentElement && td.closest("table") != table.table) {
      td = td.parentElement.closest("td");
      tr = td.parentElement;
    }
    if (td && table.editEnable && table.editTrigger == event.type) {
      processTDCellEdit(td, table, event);
    }
    td ? emit(table, `sl-table-td-${event.type}`, {
      cancelable: true,
      detail: __spreadValues({
        td,
        row: tr
      }, getCellContext(td))
    }) : "";
  });
  const one2 = onEventArray(table.table, `tbody[componentID=${table.componentID}]>tr`, TABLE_TBODY_DELEGATE_EVENTS, (event) => {
    let tr = event.delegateTarget;
    while (tr && tr.parentElement != null && tr.closest("table") != table.table) {
      tr = tr.parentElement.closest("tr");
    }
    tr ? emit(table, `sl-table-tr-${event.type}`, {
      cancelable: true,
      detail: __spreadValues({
        row: tr
      }, table.getRowContext(tr))
    }) : "";
  });
  return {
    dispose() {
      for (let l of one1) {
        l.dispose();
      }
      for (let l of one2) {
        l.dispose();
      }
    }
  };
};
var handerTableResizeEvent = (slTable) => {
  let table = slTable.table;
  let debounseUpdate = debounce(function() {
    updateTableCache(slTable);
  }, 60);
  let width = 0;
  let tableWidth = 0;
  let oldWidth = 0;
  let th;
  let isTableResize = false;
  return dragOnHandler(table, `thead[componentID=${slTable.componentID}]>tr>th div.th-resize-helper`, (changePos, event) => {
    if (isTableResize) {
      return;
    }
    isTableResize = true;
    let div = event.delegateTarget;
    th = div.closest("th");
    while (th && th.closest("table") != slTable.table) {
      th = th.parentElement.closest("th");
    }
    let column = th.column;
    if (!column || column.table != slTable) {
      return;
    }
    saveAsDefaultTableCache(slTable);
    width = parseInt(getCssValue(th, "width"));
    tableWidth = parseInt(getCssValue(table, "width"));
    oldWidth = width;
    width += changePos.x;
    if (column.maxWidth) {
      let maxWidth = parseInt(column.maxWidth, 10);
      if (width > maxWidth) {
        width = maxWidth;
      }
    }
    if (column.minWidth) {
      let minWidth = parseInt(column.minWidth, 10);
      if (width < minWidth) {
        width = minWidth;
      }
    }
    column.width = width + "";
    table.style.width = tableWidth + (width - oldWidth) + "px";
    slTable.updateComplete.then(() => {
      isTableResize = false;
      emit(slTable, "sl-table-column-resize", {
        detail: {
          column,
          oldWidth,
          width
        }
      });
    });
  }, () => {
    if (slTable.cacheKey) {
      debounseUpdate();
    }
  });
};
var handlerTableScroll = (slTable) => {
  const tableScrollPromiseFlag = Symbol("table-scroll-promise");
  let scrollDiv = slTable.scrollDiv;
  let scrollTop = scrollDiv.scrollTop;
  let scrollLeft = scrollDiv.scrollLeft;
  let debouceScroll = throttleTimeout(() => {
    if (slTable.enableVirtualScroll && slTable.virtualItemHeight) {
      if (scrollDiv.scrollTop != scrollTop || scrollDiv.scrollLeft != scrollLeft) {
        slTable.requestUpdate();
        slTable.updateComplete.then(() => {
          scrollTop = scrollDiv.scrollTop;
          scrollLeft = scrollDiv.scrollLeft;
        });
      }
    }
  }, 60, 120);
  const l1 = addEvent(slTable, "sl-table-resize", debouceScroll);
  const l2 = addEvent(scrollDiv, "mousewheel", (_event) => {
    if (slTable.enableVirtualScroll) {
      _event.preventDefault();
      let y2 = _event.deltaY;
      let deltaMode = _event.deltaMode;
      if (deltaMode == WheelEvent.DOM_DELTA_PIXEL) {
        scrollDiv.scrollTop += y2;
      } else {
        scrollDiv.scrollTop += y2 * slTable.virtualItemHeight;
      }
      if (slTable[tableScrollPromiseFlag]) {
        return;
      }
      slTable[tableScrollPromiseFlag] = true;
      Promise.resolve().then(() => {
        debouceScroll();
        slTable[tableScrollPromiseFlag] = false;
      });
    }
  });
  const l3 = addEvent(scrollDiv, "scroll", () => {
    emit(slTable, "sl-table-scroll", {
      detail: {
        div: scrollDiv
      }
    });
    if (slTable.enableVirtualScroll) {
      debouceScroll();
    }
  });
  return {
    dispose() {
      l1.dispose();
      l2.dispose();
      l3.dispose();
    }
  };
};
var handlerRowExpandListener = (table) => {
  let tableEl = table.table;
  return onEvent(tableEl, `tbody[componentID=${table.componentID}]>tr>td span[part=expand-toogle-icon][componentID=${table.componentID}]`, "click", (event) => {
    const el = event.delegateTarget;
    let td = el.closest("td");
    while (td.parentNode && td.closest("table") != tableEl) {
      td = td.parentNode.closest("td");
    }
    const tr = td.closest("tr");
    const rowData = tr.rowData;
    if (table.expandLazy) {
      if (!table.cacheExpandLazyLoadDataMap.has(rowData)) {
        if (!table.expandLazyLoadMethod) {
          console.error("expand lazy mode \u5FC5\u987B\u8BBE\u7F6E\u52A0\u8F7D\u65B9\u6CD5:currentExpandingRowData");
          return;
        }
        if (!table.expandingRowData.includes(rowData)) {
          table.expandingRowData.push(rowData);
        }
        table.expandingRowData = [...table.expandingRowData];
        Promise.resolve().then(async () => {
          try {
            let result = await table.expandLazyLoadMethod(rowData);
            table.cacheExpandLazyLoadDataMap.set(rowData, result);
            if (table.expandAccordion) {
              table.expandRowData.splice(0, table.expandRowData.length);
            }
            if (!table.expandRowData.includes(rowData)) {
              table.expandRowData.push(rowData);
            }
          } catch (ex) {
            emit(table, "sl-table-expand-load-error", {
              detail: {
                error: ex,
                rowData
              }
            });
          }
          let indexOf = table.expandingRowData.indexOf(rowData);
          if (indexOf >= 0) {
            table.expandingRowData.splice(indexOf, 1);
          }
          table.expandingRowData = [...table.expandingRowData];
        });
      } else {
        table.doExpandRowData(rowData);
      }
    } else {
      table.doExpandRowData(rowData);
    }
  });
};
var connectTableHanlder = (table) => {
  const array = [hanlderTRTDEvent(table), handerTableResizeEvent(table), handlerNodeToogleListener(table), handlerTableScroll(table), handlerRowExpandListener(table)];
  table.addController({
    hostDisconnected() {
      for (let l of array) {
        l.dispose();
      }
    }
  });
};

export {
  getTreeNodeAllChildrenSize,
  TABLE_TBODY_DELEGATE_EVENTS,
  connectTableHanlder,
  getRowContext,
  table_default2 as table_default
};
