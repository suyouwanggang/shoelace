import {
  isFunction
} from "./chunk.3SJG5WV3.js";

// src/components/table/tableHelper.ts
var SortingEnum;
(function(SortingEnum2) {
  SortingEnum2["ASC"] = "ASC";
  SortingEnum2["DESC"] = "DESC";
  SortingEnum2["NULL"] = "null";
})(SortingEnum || (SortingEnum = {}));
var columnCacheData = new WeakMap();
var clearColumnCacheData = (columns) => {
  columns.forEach((item) => {
    const childColumn = item.childAllColumn;
    columnCacheData.delete(item);
    clearColumnCacheData(childColumn);
  });
};
var getFieldValue = (data, field) => {
  if (field == void 0 || field == null) {
    return data;
  } else if (isFunction(field)) {
    return field(data);
  } else {
    if (field.indexOf(".") === -1) {
      return data[field];
    } else {
      const fields = field.split(".");
      let value = data;
      for (let i = 0, len = fields.length; i < len && value != null && value !== void 0; ++i) {
        value = value[fields[i]];
      }
      return value === void 0 ? "" : value;
    }
  }
  return "";
};
var setFieldValue = (data, field, value) => {
  if (field == void 0 || field == null) {
    return data;
  } else if (field.indexOf(".") === -1) {
    data[field] = value;
  } else {
    const fields = field.split(".");
    let tempObject = data;
    for (let i = 0, len = fields.length - 1; i < len; ++i) {
      let fieldObject = tempObject[fields[i]];
      if (!fieldObject) {
        tempObject[fields[i]] = {};
        fieldObject = tempObject[fields[i]];
      }
      tempObject = fieldObject;
    }
    tempObject[fields[fields.length - 1]] = value;
  }
};
var setColumnCacheData = (column, key, value) => {
  let data = columnCacheData.get(column);
  if (!data) {
    data = {};
    columnCacheData.set(column, data);
  }
  data[key] = value;
};
var getColumnCacheDataKey = (column, key) => {
  let data = getColumnCacheData(column);
  if (data) {
    return data[key];
  }
  return "";
};
var getColumnCacheData = (column) => {
  return columnCacheData.get(column);
};
var caculateColumnData = (columns) => {
  clearColumnCacheData(columns);
  const getColSpan = (column) => {
    if (column.hidden) {
      return 0;
    }
    let data = columnCacheData.get(column);
    if (data && data.colspan) {
      return data.colspan;
    }
    const childColumn = column.childCanShowColumn;
    if (childColumn && childColumn.length > 0) {
      let size = 0;
      childColumn.forEach((c) => {
        size += getColSpan(c);
      });
      setColumnCacheData(column, "colspan", size);
      return size;
    }
    if (data) {
      data.colspan = 1;
    } else {
      setColumnCacheData(column, "colspan", 1);
    }
    return 1;
  };
  const canShowColumns = columns;
  let maxLevel = 0;
  const levelMap = new Map();
  levelMap.set(void 0, 0);
  const iteratorColumn = (column, childArray) => {
    if (childArray && childArray.length > 0) {
      const parentLevel = levelMap.get(column);
      for (let i = 0, j = childArray.length; i < j; i++) {
        let c = childArray[i];
        if (c) {
          setColumnCacheData(c, "_isAuto", c.width == void 0 || c.width === "auto");
        }
        levelMap.set(c, parentLevel + 1);
        if (parentLevel + 1 > maxLevel) {
          maxLevel = parentLevel + 1;
        }
        getColSpan(c);
        const childColumn = c.childCanShowColumn;
        if (childColumn && childColumn.length > 0) {
          iteratorColumn(c, childColumn);
        }
      }
    }
  };
  iteratorColumn(void 0, canShowColumns);
  const iteratorForColIndex = (startColIndex, childArray) => {
    if (childArray && childArray.length > 0) {
      let colIndex = startColIndex;
      for (let i = 0, j = childArray.length; i < j; i++) {
        let c = childArray[i];
        if (!c.hidden) {
          setColumnCacheData(c, "colIndex", colIndex);
          colIndex += getColSpan(c);
        }
      }
      for (let i = 0, j = childArray.length; i < j; i++) {
        let c = childArray[i];
        const childColumn = c.childCanShowColumn;
        if (childColumn && childColumn.length > 0) {
          iteratorForColIndex(getColumnCacheDataKey(c, "colIndex"), c.childCanShowColumn);
        }
      }
    }
  };
  iteratorForColIndex(0, canShowColumns);
  const rows = [];
  for (let i = 0, j = maxLevel; i < j; i++) {
    rows.push([]);
  }
  const renderThArray = [];
  const iteratorColumnForRow = (col) => {
    const level = levelMap.get(col);
    const rowThead = rows[level - 1];
    rowThead.push(col);
    const childColumn = col.childCanShowColumn;
    if (childColumn && childColumn.length > 0) {
      setColumnCacheData(col, "rowspan", 1);
      childColumn.forEach((item) => iteratorColumnForRow(item));
    } else {
      const rowspan = maxLevel - level + 1;
      setColumnCacheData(col, "rowspan", rowspan);
      renderThArray.push(col);
    }
  };
  canShowColumns.forEach((col) => {
    iteratorColumnForRow(col);
  });
  return {
    rows,
    leafColumns: renderThArray
  };
};
var findLastCanChangeWidth = (column) => {
  const subColumns = column.childCanShowColumn;
  if (subColumns.length == 0) {
    return column;
  } else {
    return findLastCanChangeWidth(subColumns[subColumns.length - 1]);
  }
};
var getThCellByColumn = (column) => {
  const table = column.table;
  const array = table.thead.querySelectorAll("th,td");
  const result = Array.from(array).find((item) => item.columnData == column);
  return result;
};
var isColumnContainsColumn = (column, subColumn) => {
  const result = Array.from(column.querySelectorAll("sl-column")).find((item) => {
    return item === subColumn;
  });
  return result != null;
};
var isNumberWidth = (col) => {
  return typeof col == "number" || !isNaN(Number(col));
};
var tableHelper_default = caculateColumnData;

export {
  SortingEnum,
  getFieldValue,
  setFieldValue,
  getColumnCacheData,
  findLastCanChangeWidth,
  getThCellByColumn,
  isColumnContainsColumn,
  isNumberWidth,
  tableHelper_default
};
