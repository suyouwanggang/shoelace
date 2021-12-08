import {
  SortingEnum
} from "./chunk.EEIAB34L.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  p,
  y
} from "./chunk.5BL2X74K.js";

// src/components/table/sort.ts
var sortDown = y`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" id="caret-down-fill"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"></path></svg>`;
var sortUp = y`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" id="caret-up-fill"><path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"></path></svg>`;
var renderSortHeaderTemplate = (table, column, hander) => {
  let sortValue = table.sortValue;
  let sortList = [];
  if (Array.isArray(sortValue)) {
    sortList = sortValue;
  } else if (sortValue) {
    sortList.push(sortValue);
  }
  let result;
  if (column.sortAble) {
    let sortResult = sortList.find((item) => item.orderBy == column.field);
    if (table.sortConfig.alwaysShowIcon) {
      result = p`<div class="sort-wrap" @click=${hander}>
        <div class="sort-ASC  ${sortResult && sortResult.orderType == SortingEnum.ASC ? "current" : ""}">${sortUp}</div>
        <div class="sort-DESC ${sortResult && sortResult.orderType == SortingEnum.DESC ? "current" : ""}">${sortDown}</div>
      </div>`;
    } else {
      result = p`<div class="sort-wrap" @click=${hander}>
        <div class="sort-${sortResult ? sortResult.orderType : "null"} current">
          ${sortResult && sortResult.orderType == SortingEnum.ASC ? sortUp : sortResult && sortResult.orderType == SortingEnum.DESC ? sortDown : ""}
        </div>
      </div>`;
    }
  }
  return result;
};
var sortRenderHanlder = (column, table) => {
  if (column.sortAble) {
    if (!column.field) {
      console.warn("column sort must has field value");
      return;
    }
    let value = table.sortValue;
    let config = table.sortConfig;
    let array = value ? Array.isArray(value) ? value : [value] : [];
    let index = array.findIndex((item) => item.orderBy == column.field);
    let currentFieldValue = index >= 0 ? array[index] : null;
    const event = emit(table, "sl-table-before-sort", {
      cancelable: true,
      detail: {
        column,
        sortValue: currentFieldValue
      }
    });
    if (!event.defaultPrevented) {
      if (index >= 0) {
        array.splice(index, 1);
      }
      let orders = config.orders;
      let nextIndex = 0;
      if (currentFieldValue != null) {
        let orderIndex = orders.findIndex((item) => item == (currentFieldValue == null ? void 0 : currentFieldValue.orderType));
        if (orderIndex + 1 < orders.length) {
          nextIndex = orderIndex + 1;
        } else {
          nextIndex = 0;
        }
      }
      let newSort = orders[nextIndex];
      if (newSort != SortingEnum.NULL) {
        array.push({
          orderBy: column.field,
          orderType: newSort
        });
      }
      if (config.multi) {
        table.sortValue = [...array];
      } else if (array.length > 0) {
        table.sortValue = array[array.length - 1];
      } else {
        table.sortValue = void 0;
      }
      emit(table, "sl-table-sort", {
        detail: {
          column,
          sortValue: table.sortValue
        }
      });
    }
  }
};
var getSortValueAsSql = (table, converField) => {
  let value = table.sortValue;
  if (value) {
    let array = value ? Array.isArray(value) ? value : [value] : [];
    return array.map((item) => {
      return (converField ? converField(item.orderBy) : item.orderBy) + " " + item.orderType;
    }).join(" ");
  }
  return "";
};

export {
  renderSortHeaderTemplate,
  sortRenderHanlder,
  getSortValueAsSql
};
