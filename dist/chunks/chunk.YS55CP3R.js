import {
  getFieldValue,
  setFieldValue
} from "./chunk.J5LEIX36.js";
import {
  getLocal
} from "./chunk.TPWBEAY3.js";
import {
  isArray,
  isFunction
} from "./chunk.UYG3ZEVK.js";
import {
  emit
} from "./chunk.53VVVNUW.js";

// src/components/table/edit.ts
import { html } from "lit";
import { live } from "lit/directives/live.js";
import { createRef, ref } from "lit/directives/ref.js";
var EDIT_TYPE;
(function(EDIT_TYPE2) {
  EDIT_TYPE2["INPUT"] = "input";
  EDIT_TYPE2["TEXT"] = "text";
  EDIT_TYPE2["DATE"] = "date";
  EDIT_TYPE2["SELECT"] = "select";
  EDIT_TYPE2["MULIT_SELECT"] = "multi-select";
  EDIT_TYPE2["MULIT_CHECKBOX"] = "multi-checkbox";
})(EDIT_TYPE || (EDIT_TYPE = {}));
var defaultEditMap = new Map();
var registDefaultEditor = (editKey, editTemplate) => {
  defaultEditMap.set(editKey, editTemplate);
};
var getSelectLable = (item) => {
  let locale = getLocal();
  if (locale == "zh") {
    return item.name;
  } else if (locale == "en") {
    return item.nameEn || item.name1 || item.name;
  } else {
    return item[`name${locale}`] || item.name;
  }
};
var itemsWeachCache = new WeakMap();
var findItemLable = (items, fieldValue) => {
  if (!itemsWeachCache.has(items)) {
    const itemsMap = new Map();
    for (let item of items) {
      itemsMap.set(item.id, item);
    }
    itemsWeachCache.set(items, itemsMap);
  }
  const map = itemsWeachCache.get(items);
  let result = [];
  if (isArray(fieldValue)) {
    for (let s of fieldValue) {
      let item = map.get(s);
      if (item) {
        result.push(getSelectLable(item));
      }
    }
  } else {
    let item = map.get(fieldValue);
    if (item) {
      result.push(getSelectLable(item));
    }
  }
  return result.join(",");
};
registDefaultEditor(EDIT_TYPE.INPUT, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let value = getFieldValue(rowData, column.field);
  if (value == void 0 || value == null) {
    value = "";
  }
  return html`<sl-input
    size="small"
    class="edit_${EDIT_TYPE.INPUT} edit_field_${column.field}"
    .maxlength=${column.inputMaxLength}
    .value=${live(String(value))}
    @sl-input=${(event) => {
    column.field ? setFieldValue(rowData, column.field, event.target.value) : "";
    emitTableCellEditFun(context, event.target, event.target.value);
  }}
  >
  </sl-input>`;
});
registDefaultEditor(EDIT_TYPE.TEXT, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let value = getFieldValue(rowData, column.field);
  if (value == void 0 || value == null) {
    value = "";
  }
  return html`<sl-textarea
    class="edit_${EDIT_TYPE.TEXT} edit_field_${column.field}"
    .maxlength=${column.inputMaxLength}
    .value=${live(String(value))}
    @sl-input=${(event) => {
    column.field ? setFieldValue(rowData, column.field, event.target.value) : "";
    emitTableCellEditFun(context, event.target, event.target.value);
  }}
  >
  </sl-textarea>`;
});
var emitTableCellEditFun = (context, dom, value) => {
  const table = context.column.table;
  emit(table, "sl-table-cell-edit-commit", {
    detail: {
      td: dom.closest("td"),
      dom,
      value,
      context
    }
  });
};
registDefaultEditor(EDIT_TYPE.SELECT, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let value = getFieldValue(rowData, column.field);
  if (value == void 0 || value == null) {
    value = "";
  }
  return html`<sl-select
    size="small"
    hoist
    class="edit_${EDIT_TYPE.SELECT} edit_field_${column.field}"
    @sl-change=${(event) => {
    if (column.field) {
      setFieldValue(rowData, column.field, event.target.value);
    }
    emitTableCellEditFun(context, event.target, event.target.value);
  }}
    .value=${live(value)}
  >
    ${column.items ? column.items.map((item) => html`<sl-menu-item .value=${item.id}>${getSelectLable(item)}</sl-menu-item>`) : ""}
  </sl-select>`;
});
registDefaultEditor(EDIT_TYPE.MULIT_SELECT, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let array = getFieldValue(rowData, column.field);
  if (!isArray(array)) {
    array = [];
  }
  return html`<sl-select
    size="small"
    multiple
    clearable
    hoist
    class="edit_${EDIT_TYPE.MULIT_SELECT} edit_field_${column.field}"
    .value=${live(array)}
    @sl-change=${(event) => {
    if (column.field) {
      array = event.target.value;
      setFieldValue(rowData, column.field, array);
    }
    emitTableCellEditFun(context, event.target, event.target.value);
  }}
  >
    ${column.items ? column.items.map((item) => html`<sl-menu-item .value=${live(item.id)}>${getSelectLable(item)}</sl-menu-item>`) : ""}
  </sl-select>`;
});
registDefaultEditor(EDIT_TYPE.MULIT_CHECKBOX, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let array = getFieldValue(rowData, column.field);
  if (!isArray(array)) {
    array = [];
  }
  const refObj = createRef();
  return html`<div
    ${ref(refObj)}
    multiple
    hoist
    class="edit_${EDIT_TYPE.MULIT_CHECKBOX} edit_field_${column.field}"
    @sl-change=${(event) => {
    let new_array = [];
    let checkbox = refObj.value.querySelectorAll("sl-checkbox");
    checkbox.forEach((item) => {
      if (item.checked) {
        new_array.push(item.value);
      }
    });
    if (column.field) {
      setFieldValue(rowData, column.field, new_array);
    }
    emitTableCellEditFun(context, event.target, new_array);
  }}
  >
    ${column.items ? column.items.map((item) => html`<sl-checkbox .checked=${live(array.includes(item.id))} .value=${item.id}>${getSelectLable(item)}</sl-checkbox>`) : ""}
  </div>`;
});
registDefaultEditor(EDIT_TYPE.DATE, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let value = getFieldValue(rowData, column.field);
  if (value == void 0 || value == null) {
    value = "";
  }
  const mode = column.type == "date-month" ? "month" : column.type == "date-year" ? "year" : "date";
  return html`<div>
    <sl-date
      block
      size="small"
      .mode=${mode}
      class="edit_date edit_field_${column.field}"
      .value=${live(value)}
      @sl-date-change=${(event) => {
    column.field ? setFieldValue(rowData, column.field, event.target.value) : "";
    emitTableCellEditFun(context, event.target, event.target.value);
  }}
    >
    </sl-date>
  </div>`;
});
var editNone = {};
var getCellEditor = (context) => {
  const column = context.column;
  if (column.edit) {
    if (isFunction(column.edit)) {
      return column.edit(context);
    } else {
      const editTemplate = defaultEditMap.get(column.edit);
      return editTemplate ? editTemplate(context) : editNone;
    }
  }
  return editNone;
};
var isCellEditor = (context, table) => {
  if (table.editEnable) {
    if (table.editMode == "row" && table.currentEditRow && table.currentEditRow.includes(context.rowData)) {
      return true;
    } else if (table.editMode == "column" && table.currentEditColumn && table.currentEditColumn.includes(context.column)) {
      return true;
    } else if (table.editMode == "cell" && table.currentEditCell && table.currentEditCell.column == context.column && table.currentEditCell.rowData == context.rowData) {
      return true;
    }
  }
  return false;
};

export {
  EDIT_TYPE,
  registDefaultEditor,
  getSelectLable,
  findItemLable,
  emitTableCellEditFun,
  editNone,
  getCellEditor,
  isCellEditor
};
