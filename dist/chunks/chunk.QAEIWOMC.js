import {
  getFieldValue,
  setFieldValue
} from "./chunk.EEIAB34L.js";
import {
  getLocal
} from "./chunk.QKHSR4DZ.js";
import {
  l
} from "./chunk.FBMRDI7U.js";
import {
  r
} from "./chunk.Q2PLIRNK.js";
import {
  isArray,
  isFunction
} from "./chunk.3SJG5WV3.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  i,
  t
} from "./chunk.E2OEF7AF.js";
import {
  T,
  p
} from "./chunk.AXN6W67E.js";

// node_modules/lit/node_modules/lit-html/async-directive.js
var e2 = (i2, t2) => {
  var s, o3;
  const n3 = i2._$AN;
  if (n3 === void 0)
    return false;
  for (const i3 of n3)
    (o3 = (s = i3)._$AO) === null || o3 === void 0 || o3.call(s, t2, false), e2(i3, t2);
  return true;
};
var o = (i2) => {
  let t2, s;
  do {
    if ((t2 = i2._$AM) === void 0)
      break;
    s = t2._$AN, s.delete(i2), i2 = t2;
  } while ((s == null ? void 0 : s.size) === 0);
};
var n = (i2) => {
  for (let t2; t2 = i2._$AM; i2 = t2) {
    let s = t2._$AN;
    if (s === void 0)
      t2._$AN = s = new Set();
    else if (s.has(i2))
      break;
    s.add(i2), l2(t2);
  }
};
function r2(i2) {
  this._$AN !== void 0 ? (o(this), this._$AM = i2, n(this)) : this._$AM = i2;
}
function h(i2, t2 = false, s = 0) {
  const n3 = this._$AH, r3 = this._$AN;
  if (r3 !== void 0 && r3.size !== 0)
    if (t2)
      if (Array.isArray(n3))
        for (let i3 = s; i3 < n3.length; i3++)
          e2(n3[i3], false), o(n3[i3]);
      else
        n3 != null && (e2(n3, false), o(n3));
    else
      e2(this, i2);
}
var l2 = (i2) => {
  var t2, e4, o3, n3;
  i2.type == t.CHILD && ((t2 = (o3 = i2)._$AP) !== null && t2 !== void 0 || (o3._$AP = h), (e4 = (n3 = i2)._$AQ) !== null && e4 !== void 0 || (n3._$AQ = r2));
};
var d = class extends i {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i2, t2, s) {
    super._$AT(i2, t2, s), n(this), this.isConnected = i2._$AU;
  }
  _$AO(i2, t2 = true) {
    var s, n3;
    i2 !== this.isConnected && (this.isConnected = i2, i2 ? (s = this.reconnected) === null || s === void 0 || s.call(this) : (n3 = this.disconnected) === null || n3 === void 0 || n3.call(this)), t2 && (e2(this, i2), o(this));
  }
  setValue(t2) {
    if (r(this._$Ct))
      this._$Ct._$AI(t2, this);
    else {
      const i2 = [...this._$Ct._$AH];
      i2[this._$Ci] = t2, this._$Ct._$AI(i2, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit/node_modules/lit-html/directives/ref.js
var e3 = () => new o2();
var o2 = class {
};
var h2 = new WeakMap();
var n2 = e(class extends d {
  render(i2) {
    return T;
  }
  update(i2, [s]) {
    var e4;
    const o3 = s !== this.U;
    return o3 && this.U !== void 0 && this.nt(void 0), (o3 || this.rt !== this.lt) && (this.U = s, this.ht = (e4 = i2.options) === null || e4 === void 0 ? void 0 : e4.host, this.nt(this.lt = i2.element)), T;
  }
  nt(t2) {
    typeof this.U == "function" ? (h2.get(this.U) !== void 0 && this.U.call(this.ht, void 0), h2.set(this.U, t2), t2 !== void 0 && this.U.call(this.ht, t2)) : this.U.value = t2;
  }
  get rt() {
    var t2;
    return typeof this.U == "function" ? h2.get(this.U) : (t2 = this.U) === null || t2 === void 0 ? void 0 : t2.value;
  }
  disconnected() {
    this.rt === this.lt && this.nt(void 0);
  }
  reconnected() {
    this.nt(this.lt);
  }
});

// src/components/table/edit.ts
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
  return p`<sl-input
    size="small"
    class="edit_${EDIT_TYPE.INPUT} edit_field_${column.field}"
    .maxlength=${column.inputMaxLength}
    .value=${l(String(value))}
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
  return p`<sl-textarea
    class="edit_${EDIT_TYPE.TEXT} edit_field_${column.field}"
    .maxlength=${column.inputMaxLength}
    .value=${l(String(value))}
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
  return p`<sl-select
    size="small"
    hoist
    class="edit_${EDIT_TYPE.SELECT} edit_field_${column.field}"
    @sl-change=${(event) => {
    if (column.field) {
      setFieldValue(rowData, column.field, event.target.value);
    }
    emitTableCellEditFun(context, event.target, event.target.value);
  }}
    .value=${l(value)}
  >
    ${column.items ? column.items.map((item) => p`<sl-menu-item .value=${item.id}>${getSelectLable(item)}</sl-menu-item>`) : ""}
  </sl-select>`;
});
registDefaultEditor(EDIT_TYPE.MULIT_SELECT, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let array = getFieldValue(rowData, column.field);
  if (!isArray(array)) {
    array = [];
  }
  return p`<sl-select
    size="small"
    multiple
    clearable
    hoist
    class="edit_${EDIT_TYPE.MULIT_SELECT} edit_field_${column.field}"
    .value=${l(array)}
    @sl-change=${(event) => {
    if (column.field) {
      array = event.target.value;
      setFieldValue(rowData, column.field, array);
    }
    emitTableCellEditFun(context, event.target, event.target.value);
  }}
  >
    ${column.items ? column.items.map((item) => p`<sl-menu-item .value=${l(item.id)}>${getSelectLable(item)}</sl-menu-item>`) : ""}
  </sl-select>`;
});
registDefaultEditor(EDIT_TYPE.MULIT_CHECKBOX, (context) => {
  const column = context.column;
  const rowData = context.rowData;
  let array = getFieldValue(rowData, column.field);
  if (!isArray(array)) {
    array = [];
  }
  const refObj = e3();
  return p`<div
    ${n2(refObj)}
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
    ${column.items ? column.items.map((item) => p`<sl-checkbox .checked=${l(array.includes(item.id))} .value=${item.id}>${getSelectLable(item)}</sl-checkbox>`) : ""}
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
  return p`<div>
    <sl-date
      block
      size="small"
      .mode=${mode}
      class="edit_date edit_field_${column.field}"
      .value=${l(value)}
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
  e3 as e,
  n2 as n,
  EDIT_TYPE,
  registDefaultEditor,
  getSelectLable,
  findItemLable,
  emitTableCellEditFun,
  editNone,
  getCellEditor,
  isCellEditor
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
