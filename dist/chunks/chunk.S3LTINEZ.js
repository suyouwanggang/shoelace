import {
  SortTrigger
} from "./chunk.YA7IIDTE.js";
import {
  getColumnRenderResult,
  getReisterCellTemplate
} from "./chunk.FZAC3YME.js";
import {
  editNone,
  findItemLable,
  getCellEditor,
  isCellEditor
} from "./chunk.YS55CP3R.js";
import {
  renderSortHeaderTemplate,
  sortRenderHanlder
} from "./chunk.3DO3NS4Z.js";
import {
  getFieldValue,
  isNumberWidth
} from "./chunk.J5LEIX36.js";
import {
  isArray,
  isFunction,
  isObject
} from "./chunk.UYG3ZEVK.js";
import {
  __spreadValues
} from "./chunk.YTC2GCNT.js";

// src/components/table/tableRenderHelper.ts
import { html, nothing as nothing2, svg } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { ref } from "lit/directives/ref.js";

// src/internal/spread.ts
import { nothing } from "lit";
import { directive, Directive } from "lit/directive.js";
var getKey = (k) => {
  return k.substr(1);
};
var setStyle = (el, styleObj) => {
  let style = el.getAttribute("style");
  let styleArray = style ? style.split(";") : [];
  if (isArray(styleObj)) {
    for (let tempStyle of styleObj) {
      tempStyle.trim() != "" ? styleArray.push(tempStyle.trim()) : "";
    }
  } else if (isObject(styleObj)) {
    for (let key in styleObj) {
      styleArray.push(`${key}:${styleObj[key]}`);
    }
  } else if (styleObj) {
    let array = styleObj.split(";");
    for (let tempStyle of array) {
      tempStyle.trim() != "" ? styleArray.push(tempStyle.trim()) : "";
    }
  }
  el.setAttribute("style", styleArray.join(";"));
};
var removeStyle = (el, styleObj) => {
  let style = el.getAttribute("style") || "";
  let styleArray = style ? style.split(";") : [];
  const removeFun = (k) => {
    const index = styleArray.lastIndexOf(k);
    if (index >= 0) {
      styleArray.splice(index, 1);
    }
  };
  if (isArray(styleObj)) {
    for (let tempStyle of styleObj) {
      tempStyle.trim() != "" ? removeFun(tempStyle) : "";
    }
  } else if (isObject(styleObj)) {
    for (let key in styleObj) {
      removeFun(`${key}:${styleObj[key]}`);
    }
  } else if (styleObj) {
    let array = styleObj.split(";");
    for (let tempStyle of array) {
      tempStyle.trim() != "" ? removeFun(tempStyle.trim()) : "";
    }
  }
  el.setAttribute("style", styleArray.join(";"));
};
var classSplitReg = /[\s,]/;
var setClass = (el, classObj) => {
  const classList = Array.from(el.classList);
  if (isArray(classObj)) {
    for (let tempClass of classObj) {
      tempClass.trim() != "" ? classList.push(tempClass.trim()) : "";
    }
  } else if (isObject(classObj)) {
    for (let key in classObj) {
      if (classObj[key]) {
        classList.push(key);
      }
    }
  } else if (classObj) {
    let array = classObj.split(classSplitReg);
    for (let tempClass of array) {
      tempClass.trim() != "" ? classList.push(tempClass.trim()) : "";
    }
  }
  el.classList.add(...classList);
};
var removeClass = (el, classObj) => {
  const classList = [];
  const removeFun = (k) => {
    classList.push(k);
  };
  if (isArray(classObj)) {
    for (let tempClass of classObj) {
      tempClass.trim() != "" ? removeFun(tempClass.trim()) : "";
    }
  } else if (isObject(classObj)) {
    for (let key in classObj) {
      if (classObj[key]) {
        removeFun(key);
      }
    }
  } else if (classObj) {
    let array = classObj.split(classSplitReg);
    for (let tempClass of array) {
      tempClass.trim() != "" ? removeFun(tempClass.trim()) : "";
    }
  }
  el.classList.remove(...classList);
};
var SpreadDirective = class extends Directive {
  render(_obj) {
    return nothing;
  }
  update(_part, [obj]) {
    if (this.old && this.el) {
      this.removeObjectValue(this.old);
    }
    this.el = _part.element;
    this.setObjectValue(obj);
    if (obj) {
      this.old = __spreadValues({}, obj);
    }
    return nothing;
  }
  setObjectValue(obj) {
    if (!obj) {
      return;
    }
    for (let k in obj) {
      if (k.startsWith("@")) {
        const key = getKey(k);
        this.el.addEventListener(key, obj[k]);
      } else if (k.startsWith(".")) {
        const key = getKey(k);
        this.el[key] = obj[k];
      } else if (k == "style") {
        setStyle(this.el, obj[k]);
      } else if (k == "class") {
        setClass(this.el, obj[k]);
      } else {
        this.el.setAttribute(k, String(obj[k]));
      }
    }
  }
  removeObjectValue(obj) {
    if (!obj) {
      return;
    }
    for (let k in obj) {
      if (k.startsWith("@")) {
        const key = getKey(k);
        this.el.removeEventListener(key, obj[k]);
      } else if (k.startsWith(".")) {
        const key = getKey(k);
        this.el[key] = void 0;
      } else if (k == "style") {
        removeStyle(this.el, obj[k]);
      } else if (k == "class") {
        removeClass(this.el, obj[k]);
      } else {
        this.el.setAttribute(k, String(obj[k]));
      }
    }
  }
};
var spread = directive(SpreadDirective);

// src/components/table/tableRenderHelper.ts
var cellHeadContextMap = new WeakMap();
var setHeadCellContext = (el, context) => {
  if (el) {
    cellHeadContextMap.set(el, context);
  }
};
var getTableHeadCellContext = (el) => {
  return cellHeadContextMap.get(el);
};
var renderThColTemplate = (context, table) => {
  let styleObject = {};
  const column = context.column;
  if (context.colspan == 1) {
    if (column.width) {
      const isNumber = isNumberWidth(column.width);
      styleObject["width"] = column.width + (isNumber ? "px" : "");
      if (!column.minWidth) {
        styleObject["min-width"] = styleObject["width"];
      }
    }
    if (column.minWidth) {
      const isNumber = isNumberWidth(column.minWidth);
      styleObject["min-width"] = column.minWidth + (isNumber ? "px" : "");
    }
    if (column.maxWidth) {
      const isNumber = isNumberWidth(column.maxWidth);
      styleObject["max-width"] = column.maxWidth + (isNumber ? "px" : "");
    }
  }
  const styleInfo = table.customRenderCellHeadStyle ? table.customRenderCellHeadStyle(context) : null;
  if (styleInfo) {
    if (typeof styleInfo == "object") {
      styleObject = __spreadValues(__spreadValues({}, styleObject), styleInfo);
    }
  }
  let classInfo = table.customRenderCellHeadClassMap ? table.customRenderCellHeadClassMap(context) : null;
  let classObj = {};
  if (classInfo != null) {
    if (Array.isArray(classInfo)) {
      classInfo.forEach((item) => item.trim() != "" ? classObj[item.trim()] = true : "");
    } else if (typeof classInfo == "string") {
      classInfo.split(" ").forEach((item) => item.trim() != "" ? classObj[item.trim()] = true : "");
    } else {
      classObj = __spreadValues({}, classInfo);
    }
  }
  if (table.sortConfig && table.sortConfig.trigger == SortTrigger.cell && column.sortAble) {
    classObj["cursor"] = true;
  }
  const trigger = table.sortConfig.trigger;
  const headResult = table.customRenderCellHeadSpread ? table.customRenderCellHeadSpread(context) : void 0;
  const handerSort = (_event) => {
    if (trigger == SortTrigger.self) {
      sortRenderHanlder(column, table);
    }
  };
  const handerTHSort = (_event) => {
    if (headResult && headResult["@click"]) {
      try {
        if (isFunction(headResult["@click"])) {
          headResult["@click"](_event);
        } else {
          headResult["@click"].handleEvent(_event);
        }
      } catch (ex) {
        console.error(ex);
      }
    }
    if (trigger == SortTrigger.cell) {
      sortRenderHanlder(column, table);
    }
  };
  return html`<th
    uniqueID=${column.uniqueID}
    .column=${column}
    field=${ifDefined(column.field)}
    .vAlign=${column.colvAlign}
    .align=${column.colAlign}
    @click=${handerTHSort}
    class=${classMap(classObj)}
    style=${styleMap(styleObject)}
    colIndex=${context.colIndex + ""}
    .rowSpan=${context.rowspan}
    .colSpan=${context.colspan}
    ${ref((el) => setHeadCellContext(el, context))}
    ${spread(headResult)}
  >
    <div class="thWrap">
      <span class="column-title ${column.sortAble ? "sort-able" : ""}">${getColumnRenderResult(context, table)}</span>
      ${renderSortHeaderTemplate(table, column, handerSort)} ${column.resizeAble ? html`<div part="resize-hanler" @click=${stopHanderClick} class="th-resize-helper"></div>` : ""}
    </div>
  </th>`;
};
var stopHanderClick = (event) => {
  event.stopPropagation();
};
var getColumnCellRenderTemplate = (context, table) => {
  const column = context.column;
  if (column.renderCell) {
    return column.renderCell(context);
  }
  let templateFun = getReisterCellTemplate(column.type);
  if (templateFun) {
    return templateFun(context, table);
  } else {
    return cellDataRenderResult(context);
  }
};
var cellDataRenderResult = (context) => {
  const col = context.column;
  let colResult;
  let fieldValue = getFieldValue(context.rowData, col.field);
  if (fieldValue == void 0 || fieldValue == null) {
    fieldValue = "";
  }
  if (col.items) {
    fieldValue = findItemLable(col.items, fieldValue);
  }
  colResult = html`${fieldValue}`;
  return colResult;
};
var cellContextMap = new WeakMap();
var setCellContext = (el, context) => {
  if (el) {
    cellContextMap.set(el, context);
  }
};
var getCellContext = (el) => {
  return cellContextMap.get(el);
};
var renderTdCellTemplate = (context, table) => {
  const column = context.column;
  let tdResult = getColumnCellRenderTemplate(context, table);
  if (tdResult == void 0 || tdResult == nothing2 || tdResult.rowspan == 0 || tdResult.colspan == 0) {
    return nothing2;
  } else {
    const isEditFlag = isCellEditor(context, table);
    if (isEditFlag) {
      const editTemplate = getCellEditor(context);
      if (editTemplate != editNone) {
        tdResult.template = editTemplate;
      }
    }
    const styleInfo = table.customRenderCellStyle ? table.customRenderCellStyle(context) : {};
    let classInfo = table.customRenderCellClassMap ? table.customRenderCellClassMap(context) : null;
    let classObj = {};
    if (classInfo != null) {
      if (Array.isArray(classInfo)) {
        classInfo.forEach((item) => item.trim() != "" ? classObj[item.trim()] = true : "");
      } else if (typeof classInfo == "string") {
        classInfo.split(" ").forEach((item) => item.trim() != "" ? classObj[item.trim()] = true : "");
      } else {
        classObj = __spreadValues({}, classInfo);
      }
    }
    const tdHtml = html`<div class="tdWrap ${!isEditFlag && table.enableCellBox && column.type != "checkbox" ? "cellBox" : ""}">${tdResult.template ? html`${tdResult.template}` : html`${tdResult}`}</div>`;
    const tdSpreadResult = table.customRenderCellSpread ? table.customRenderCellSpread(context) : void 0;
    return html`<td
      ${ref((el) => setCellContext(el, context))}
      uniqueID=${column.uniqueID}
      field=${column.field}
      .align=${column.align}
      .vAlign=${column.vAlign}
      style=${styleMap(styleInfo)}
      class=${classMap(classObj)}
      colspan=${tdResult.colspan ? tdResult.colspan : 1}
      rowspan=${tdResult.rowspan ? tdResult.rowspan : 1}
      ${spread(tdSpreadResult)}
    >
      ${wrapColumnFieldTemplate(context, tdHtml, table)}
    </td>`;
  }
};
var closeNodeSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" id="caret-right-fill"><path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z"></path></svg>`;
var openNodeSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" id="caret-down-fill"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"></path></svg>`;
var expendCloseSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 16 16" id="chevron-right"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"></path></svg>`;
var expendOpendSvg = svg`<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" id="chevron-down"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"></path></svg>`;
var TABLESVG = {
  closeNodeSvg,
  openNodeSvg,
  expendCloseSvg,
  expendOpendSvg
};
var wrapColumnFieldTemplate = (context, wrap, table) => {
  const column = context.column;
  const rowData = context.rowData;
  if (column.field && table.treeConfig && column.field == table.treeConfig.treeNodeColumn) {
    let level = context.level || 0;
    if (typeof rowData.close == "undefined") {
      rowData.close = true;
    }
    let closed = rowData.close;
    let span = html`<span class="tree-node-icon" componentID=${table.componentID} part="tree-node-toogle"
      >${table.treeLoadingNode.includes(rowData) ? html`<sl-spinner part="tree-node-loading"></sl-spinner>` : closed ? TABLESVG.closeNodeSvg : TABLESVG.openNodeSvg}
    </span>`;
    return html`<div part="tree-node" class="tree-node ${table.treeNodeNoWrap ? "nowrap-tree-node" : ""} ${closed ? "closed" : ""}">
      <div class="tree-node-inner" style="padding-left:${level * table.treeConfig.indent}px;">
        ${table.treeNodeHasChildren(rowData) ? span : html`<span class="tree-node-empty-node"></span>`} ${rowData.icon ? html`<sl-icon class="tree-node-icon" name=${rowData.icon}></sl-icon>` : ""} ${wrap}
      </div>
    </div>`;
  } else if (column.field && table.expandColumn && column.field == table.expandColumn) {
    const opened = table.expandRowData.includes(rowData);
    return html`<div class="expand-toogle" part="expand-wrap">
      <span class="expand-toogle-icon" componentID=${column.table.componentID} part="expand-toogle-icon">
        ${table.expandingRowData.includes(rowData) ? html`<sl-spinner part="expand-loading"></sl-spinner>` : opened ? TABLESVG.expendOpendSvg : TABLESVG.expendCloseSvg}
      </span>
      ${wrap}
    </div>`;
  }
  return wrap;
};

export {
  spread,
  getTableHeadCellContext,
  renderThColTemplate,
  getColumnCellRenderTemplate,
  getCellContext,
  renderTdCellTemplate,
  TABLESVG
};
