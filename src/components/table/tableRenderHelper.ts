import { html, nothing } from 'lit';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import SlColumn from '../column/column';
import { renderSortHeaderTemplate, sortRenderHanlder } from './sort';
import SlTable from './table';
import { SortTrigger } from './tableConfig';
import { getColumnCacheData, getFieldValue, isNumberWidth } from './tableHelper';

export const renderThColTemplate = (column: SlColumn, columnIndex: number, table: SlTable) => {
  let styleObject: any = {};
  const cacheData = getColumnCacheData(column);
  if (cacheData.colspan == 1) {
    if (column.minWidth) {
      const isNumber = isNumberWidth(column.minWidth);
      styleObject['min-width'] = column.minWidth + (isNumber ? 'px' : '');
    }
    if (column.width) {
      const isNumber = isNumberWidth(column.width);
      styleObject['width'] = column.width + (isNumber ? 'px' : '');
    }
    if (column.maxWidth) {
      const isNumber = isNumberWidth(column.maxWidth);
      styleObject['max-width'] = column.maxWidth + (isNumber ? 'px' : '');
    }
  }
  const styleInfo = table.customRenderCellHeadStyle ? table.customRenderCellHeadStyle(column) : null;
  if (styleInfo) {
    if (typeof styleInfo == 'object') {
      styleObject = { ...styleObject, styleInfo };
    }
  }
  let classInfo = table.customRenderCellHeadClassMap ? table.customRenderCellHeadClassMap(column) : null;
  let classObj: any = {};
  if (classInfo != null) {
    if (Array.isArray(classInfo)) {
      classInfo.forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
    } else if (typeof classInfo == 'string') {
      classInfo.split(' ').forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
    } else {
      classObj = { ...classInfo };
    }
  }
  if (table.sortConfig && table.sortConfig.trigger == SortTrigger.cell && column.sortAble) {
    classObj['cursor'] = true;
  }
  const trigger = table.sortConfig.trigger;
  const handerSort = (_event: Event) => {
    if (trigger == SortTrigger.self) {
      sortRenderHanlder(column, table);
    }
  };
  const handerTHSort = (_event: Event) => {
    if (trigger == SortTrigger.cell) {
      sortRenderHanlder(column, table);
    }
  };
  return html`<th
    uniqueID=${column.uniqueID}
    .column=${column}
    .vAlign=${column.colvAlign}
    .align=${column.colAlign}
    @click=${handerTHSort}
    class=${classMap(classObj)}
    style=${styleMap(styleObject)}
    colIndex=${(cacheData.colIndex as number) + ''}
    .rowSpan=${cacheData.rowspan as number}
    .colSpan=${cacheData.colspan as number}
  >
    <div class="thWrap">
      <span class="column-title ${column.sortAble ? 'sort-able' : ''}"
        >${column.renderCol ? html`${column.renderCol(column, columnIndex)}` : column.label}</span
      >
      ${renderSortHeaderTemplate(table, column, handerSort)}
      ${column.resizeAble
        ? html`<div part="resize-hanler" @click=${stopHanderClick} class="th-resize-helper"></div>`
        : ''}
    </div>
  </th>`;
};
const stopHanderClick = (event: Event) => {
  event.stopPropagation();
};
const renderCellData = (rowData: any, rowDataIndex: number, col: SlColumn, colIndex: number) => {
  let colResult: any;
  if (col.renderCell) {
    return col.renderCell(col, rowData, rowDataIndex, colIndex);
  } else {
    let fieldValue = getFieldValue(rowData, col.field);
    colResult = html`<div class="tdWrap">${fieldValue}</div>`;
  }
  return colResult;
};
export const renderTdCellTemplate = (
  column: SlColumn,
  rowData: any,
  rowDataIndex: number,
  columnIndex: number,
  table: SlTable
) => {
  const colData = getColumnCacheData(column);
  let tdResult = renderCellData(rowData, rowDataIndex, column, columnIndex);
  if (tdResult == undefined || tdResult == nothing || tdResult.rowspan == 0 || tdResult.colspan == 0) {
    return nothing; //标识此td 不进行渲染
  } else {
    const styleInfo = table.customRenderCellStyle ? table.customRenderCellStyle(column, rowData, rowDataIndex) : {};
    let classInfo = table.customRenderCellClassMap
      ? table.customRenderCellClassMap(column, rowData, rowDataIndex)
      : null;
    let classObj: any = {};
    if (classInfo != null) {
      if (Array.isArray(classInfo)) {
        classInfo.forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
      } else if (typeof classInfo == 'string') {
        classInfo.split(' ').forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
      } else {
        classObj = { ...classInfo };
      }
    }
    return html`<td
      colindex=${colData.colIndex + ''}
      uniqueID=${column.uniqueID}
      field=${column.field}
      .column=${column}
      .align=${column.align}
      .vAlign=${column.vAlign}
      style=${styleMap(styleInfo)}
      class=${classMap(classObj)}
      colspan=${tdResult.colspan ? tdResult.colspan : 1}
      rowspan=${tdResult.rowspan ? tdResult.rowspan : 1}
    >
      ${table.wrapColumnFieldTemplate(
        column,
        rowData,
        tdResult.template ? html`${tdResult.template}` : html`${tdResult}`
      )}
    </td>`;
  }
};
