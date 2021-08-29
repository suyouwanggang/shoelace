import { nothing, TemplateResult } from 'lit';
import SlColumn from '../column/column';
import SlTable from './table';

/**
 * 表头TH 自定义渲染函数
 * @param table ,表格
 */
export interface renderColInteface {
  (this: SlColumn): TemplateResult<1>;
}

/**
 * 表头TH 自定义渲染函数
 *
 */
export interface renderCellInteface {
  /**
   * @param:this,当前对象
   * @param:rowData,当前表格接收的rowData对象
   * @param:index,当前表格接收的数据的序号
   * @param:table,当前表格
   */
  (this: SlColumn, rowData: any, index: number):
    | TemplateResult<1>
    | {
        template: TemplateResult<1>;
        colspan?: number;
        rowspan?: number;
      }
    | typeof nothing;
}

/**
 * 定义排序，升序，降序
 */
export enum SortingEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}
/**
 * table 单元格对齐方式 'left','cener','right'
 */
export type TdAgile = 'left' | 'center' | 'right';
/**
 * 定义表头数据，同PColumn 对应
 */
export type ColumnHeaderData = {
  /**
   * 自定义渲染th
   */
  renderTh?: (this: SlColumn, tab: SlTable) => TemplateResult<1>;
  /**
   * 自定渲染 td
   */
  renderTd?: (
    this: SlColumn,
    rowData: any,
    index: number,
    tab: SlTable
  ) =>
    | TemplateResult<1>
    | {
        template: TemplateResult | TemplateResult[];
        colspan?: number;
        rowspan?: number;
      };
  /**
   * 是否隐藏
   */
  hidden?: boolean;
  /**
   * 自定义渲染对象的属性，支持"."分隔取多重属性
   */
  field?: string;
  /**
   * 表头显示内容
   */
  label?: string;
  /**
   * 表头Th 内容对齐方式，默认是居中对齐
   */
  agileCol?: TdAgile;
  /**
   * Td 内容对齐方式，默认同表头对齐方式
   */
  agileCell?: TdAgile;
  /**
   * 是否支持排序
   */
  sortAble?: boolean;
  /**
   * 排序值
   */
  sort?: SortingEnum;
  /**
   * 是否可以拖动改变宽度
   */
  resizeAble?: boolean;
  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 最小宽度
   */
  minWidth?: string;
  /**
   * 最大宽度
   */
  maxWidth?: string;
  /**
   * 是否能够拖动改变列顺序
   */
  canDrag?: boolean;

  /**
   * 下级th ，支持多层次嵌套
   */
  children?: ColumnHeaderData[];

  /**列的类型 */
  type: 'index' | 'checkbox' | 'radio';

  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
};

/**
 * 将columnHeaderData 转化为 table 的孩子 PColumn
 * @param columns
 * @param table
 */
export const convertHeaderDataToTableColumns = (columns: ColumnHeaderData[], table: SlTable) => {
  const children = table.children;
  while (children.length > 0) {
    table.removeChild(children[0]);
  }
  const frag = document.createDocumentFragment();
  const iteratorData = (
    _parent: ColumnHeaderData | null,
    childs: ColumnHeaderData[],
    parentDom: Element | DocumentFragment
  ) => {
    childs.forEach(item => {
      const col = new SlColumn();
      parentDom.appendChild(col);
      for (const key in item) {
        if (key != 'children') {
          (col as any)[key] = item[key];
        } else {
          const subChildren = item['children'];
          if (subChildren) {
            iteratorData(item, subChildren, col);
          }
        }
      }
    });
  };
  iteratorData(null, columns, frag);
  table.appendChild(frag);
  // table.columnData=table.childColumn;
};
/**
 * 定义需要table 表头 行
 */
export type RowHeader = Array<Array<SlColumn>>;

/**
 * 清除原来的 PColumn 缓存计算的一些属性;
 * @param columns
 */
export const clearColumnCacheData = (columns: SlColumn[]) => {
  columns.forEach(item => {
    const childColumn = [...item.childAllColumn];
    columnCacheData.delete(item);
    item._cacheCanShowColumn = undefined;
    clearColumnCacheData(childColumn);
  });
};

type ColumnCacheData = {
  /** 冗余计算此TH占多少列 */
  colspan?: number;
  /** 冗余计算此TH占多少行 */
  rowspan?: number;
  /**列index */
  colIndex?: number;

  _isAuto?: boolean;
};
/**
 * 获取数据的字段值
 * @param data 数据
 * @param field 字段
 */
export const getFieldValue = (data: any, field: String) => {
  let array = field.split('.');
  let obj = data;
  let result = obj;
  for (let k of array) {
    result = result[k];
    if (typeof result == 'undefined') {
      return '';
    }
  }
  return result;
};
export const columnCacheData = new WeakMap<SlColumn, ColumnCacheData>();

export const setColumnCacheData = (column: SlColumn, key: keyof ColumnCacheData, value: any) => {
  let data = columnCacheData.get(column);
  if (!data) {
    data = {};
    columnCacheData.set(column, data);
  }
  data[key] = value;
};
const getColumnCacheDataKey = (column: SlColumn, key: keyof ColumnCacheData) => {
  return getColumnCacheData(column)[key];
};
export const getColumnCacheData = (column: SlColumn) => {
  return columnCacheData.get(column) as ColumnCacheData;
};
/**
 * 将表头排版布局，计算出 有多少行，每个单元格跨多少行，多少列，用于渲染表头，取colspan=4 的columnData来渲染tbody TD
 * @param columns 表头
 * @returns {   
 *   rows: 有多少个 TR 
      tdRenderColumnData:叶子TH， 用于渲染tbody
 * }
 */
const caculateColumnData = (columns: SlColumn[]): { rows: RowHeader; tdRenderColumnData: SlColumn[] } => {
  //const colspanMap=new Map<ColumnData,number>();//每个th 跨多少列
  // const rowSpanMap=new Map<ColumnData,number>();//每个th 跨多少行
  const getColSpan = (column: SlColumn) => {
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
      childColumn.forEach((c: SlColumn) => {
        size += getColSpan(c);
      });
      setColumnCacheData(column, 'colspan', size);
      return size;
    }
    if (data) {
      data.colspan = 1;
    } else {
      setColumnCacheData(column, 'colspan', 1);
    }
    return 1;
  };
  const canShowColumns = columns;
  let maxLevel = 0;
  const levelMap = new Map<SlColumn | undefined, Number>(); //key column, value,level
  levelMap.set(undefined, 0);
  const iteratorColumn = (column: SlColumn | undefined, childArray: SlColumn[]) => {
    if (childArray && childArray.length > 0) {
      const parentLevel = levelMap.get(column) as number;
      for (let i = 0, j = childArray.length; i < j; i++) {
        let c = childArray[i];
        if (c) {
          setColumnCacheData(c, '_isAuto', c.width == undefined || c.width === 'auto');
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
  iteratorColumn(undefined, canShowColumns);
  const iteratorForColIndex = (startColIndex: number, childArray: SlColumn[]) => {
    if (childArray && childArray.length > 0) {
      let colIndex = startColIndex;
      for (let i = 0, j = childArray.length; i < j; i++) {
        let c = childArray[i];
        if (!c.hidden) {
          setColumnCacheData(c, 'colIndex', colIndex);
          colIndex += getColSpan(c);
        }
      }
      for (let i = 0, j = childArray.length; i < j; i++) {
        let c = childArray[i];
        const childColumn = c.childCanShowColumn;
        if (childColumn && childColumn.length > 0) {
          iteratorForColIndex(getColumnCacheDataKey(c, 'colIndex') as number, c.childCanShowColumn);
        }
      }
    }
  };
  iteratorForColIndex(0, canShowColumns);

  //console.log(maxLevel);
  const rows: RowHeader = [];
  for (let i = 0, j = maxLevel; i < j; i++) {
    rows.push([]);
  }
  const renderThArray: SlColumn[] = [];
  const iteratorColumnForRow = (col: SlColumn) => {
    const level = levelMap.get(col) as number;
    const rowThead = rows[level - 1];
    rowThead.push(col);
    const childColumn = col.childCanShowColumn;
    if (childColumn && childColumn.length > 0) {
      setColumnCacheData(col, 'rowspan', 1);
      childColumn.forEach(item => iteratorColumnForRow(item));
    } else {
      const rowspan = maxLevel - level + 1;
      setColumnCacheData(col, 'rowspan', rowspan);
      renderThArray.push(col);
    }
  };
  canShowColumns.forEach((col: SlColumn) => {
    iteratorColumnForRow(col);
  });

  return {
    rows: rows, //有多少行
    tdRenderColumnData: renderThArray //叶子单元格
  };
};
/**
 * 查找PColumn 最底层最后一个能够拖动的PColumn
 * @param column
 */
export const findLastCanChangeWidth = (column: SlColumn): SlColumn => {
  const subColumns = column.childCanShowColumn;
  if (subColumns.length == 0) {
    return column;
  } else {
    return findLastCanChangeWidth(subColumns[subColumns.length - 1]);
  }
};
/**
 * 查找PColumn 对应的th
 * @param column
 *
 */
export const getThCellByColumn = (column: SlColumn): HTMLTableHeaderCellElement => {
  const table = column.table;
  const array = table.thead.querySelectorAll('th,td');
  const result = Array.from(array).find((item: Element) => (item as any).columnData == column);
  return result as HTMLTableHeaderCellElement;
};
/**
 * 判断列 是否包含 子列
 * @param column  父级列
 * @param subColumn  子列
 */
export const isColumnContainsColumn = (column: SlColumn, subColumn: SlColumn) => {
  const result = Array.from(column.querySelectorAll('sl-column')).find(item => {
    return item === subColumn;
  });
  return result != null;
};
export const isNumberWidth = (col: Number | string) => {
  return typeof col == 'number' || !isNaN(Number(col));
};
export default caculateColumnData;
