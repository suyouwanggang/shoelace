import {
  iteratorNodeData
} from "./chunk.WRRDM7O2.js";
import {
  isArray
} from "./chunk.UYG3ZEVK.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __spreadValues
} from "./chunk.YTC2GCNT.js";

// src/components/table/cellDefaultRender.ts
import { html } from "lit";
import { live } from "lit/directives/live.js";
var defaultColMap = new Map();
var registerColTemplate = (type, templateFun) => {
  defaultColMap.set(type, templateFun);
};
var getReisterColTemplate = (type) => {
  return defaultColMap.get(type);
};
var checkboxColChange = (table, checkbox) => {
  const head_before = emit(table, "sl-table-check-head-before-change", {
    cancelable: true,
    detail: {
      checkbox
    }
  });
  if (head_before.defaultPrevented) {
    return;
  }
  const checked = checkbox.checked;
  let array = [];
  if (checked) {
    const doTreeNode = (nodeData) => {
      const isdisabled = table.isRowDataCheckedDisabled(nodeData);
      if (isdisabled) {
        return;
      }
      const checkedValue = table.getRowDataCheckValue(nodeData);
      array.push(checkedValue);
    };
    const dataSource = table.dataSource;
    if (table.treeConfig) {
      for (let d of dataSource) {
        iteratorNodeData(d, doTreeNode);
      }
    } else {
      for (let d of dataSource) {
        doTreeNode(d);
      }
    }
  }
  table.checkValue = array;
  emit(table, "sl-table-check-change", {
    detail: {
      checkbox,
      value: table.checkValue
    }
  });
};
registerColTemplate("checkbox", (_column, table) => {
  const dataSource = table.getRenderDataSource();
  const checkAll = dataSource && isArray(table.checkValue) ? table.checkValue.length == dataSource.length : false;
  const indeterminate = !checkAll && isArray(table.checkValue) ? table.checkValue.length > 0 : table.checkValue != void 0;
  return html`<sl-checkbox class="table-check" .checked=${checkAll} .indeterminate=${indeterminate} @sl-change=${(event) => checkboxColChange(table, event.target)}></sl-checkbox>`;
});
var getColumnRenderResult = (context, table) => {
  const column = context.column;
  if (column.renderCol) {
    return html`${column.renderCol(context)}`;
  }
  let templateFun = getReisterColTemplate(column.type);
  if (templateFun) {
    return templateFun(column, table);
  } else {
    return html`${column.label}`;
  }
};
var defaultCellMap = new Map();
var registerCellTemplate = (type, templateFun) => {
  defaultCellMap.set(type, templateFun);
};
var checkboxTDChange = (checkbox, table) => {
  let checked = checkbox.checked;
  let td = checkbox.closest("td");
  const context = table.getCellContext(td);
  const rowData = context.rowData;
  const isArray2 = table.checkValue;
  const checkedValue = table.getRowDataCheckValue(rowData);
  let array = isArray2 ? [...table.checkValue] : table.checkValue ? [table.checkValue] : [];
  let index = array.indexOf(checkedValue);
  if (checked && index == -1) {
    array.push(checkedValue);
  } else if (!checked) {
    array.splice(index, 1);
  }
  const doTreeNode = (nodeData) => {
    const isdisabled = table.isRowDataCheckedDisabled(nodeData);
    if (isdisabled) {
      return;
    }
    const checkedValue2 = table.getRowDataCheckValue(nodeData);
    let d_index = array.indexOf(checkedValue2);
    if (checked && d_index == -1) {
      array.push(checkedValue2);
    } else if (!checked) {
      d_index >= 0 ? array.splice(d_index, 1) : null;
    }
  };
  if (table.treeConfig) {
    if (table.checkTreeCasecadeUp) {
      let parentData = table.getRowDataParentData(rowData);
      while (parentData) {
        doTreeNode(parentData);
        parentData = table.getRowDataParentData(parentData);
      }
    }
    if (table.checkTreeCasecadeDown) {
      let sub = rowData.children;
      const iteratorFun = (sub2) => {
        if (!sub2) {
          return;
        }
        for (let d of sub2) {
          iteratorNodeData(d, doTreeNode);
        }
      };
      iteratorFun(sub);
    }
  }
  table.checkValue = array;
  emit(table, "sl-table-check-change", {
    detail: {
      checkbox,
      value: table.checkValue
    }
  });
};
registerCellTemplate("checkbox", (context, table) => {
  const rowData = context.rowData;
  const ischecked = table.isRowDataChecked(rowData);
  const isdisabled = table.isRowDataCheckedDisabled(rowData);
  return html`<sl-checkbox
    class="table-check"
    @sl-before-change=${(event) => {
    const el = event.target;
    emit(table, "sl-table-check-before-change", {
      cancelable: true,
      detail: __spreadValues({
        checkbox: el
      }, context)
    });
  }}
    .checked=${live(ischecked)}
    .disabled=${isdisabled}
    @sl-change=${(event) => checkboxTDChange(event.target, table)}
  ></sl-checkbox>`;
});
registerCellTemplate("radio", (context, table) => {
  const rowData = context.rowData;
  const checkValue = table.getRowDataCheckValue(rowData);
  const ischecked = table.isRowDataRadioChecked(rowData);
  const isdisabled = table.isRowDataCheckedDisabled(rowData);
  return html`<sl-radio
    class="table-check"
    .checked=${live(ischecked)}
    .disabled=${isdisabled}
    @sl-change=${(_event) => {
    table.radioValue = checkValue;
    emit(table, "sl-table-radio-change", {
      detail: {
        value: checkValue,
        context
      }
    });
  }}
  ></sl-radio>`;
});
registerCellTemplate("index", (context, _table) => {
  const rowIndex = context.rowIndex;
  return html`${rowIndex + 1}`;
});
var getReisterCellTemplate = (type) => {
  return defaultCellMap.get(type);
};

export {
  registerColTemplate,
  getReisterColTemplate,
  checkboxColChange,
  getColumnRenderResult,
  registerCellTemplate,
  checkboxTDChange,
  getReisterCellTemplate
};
