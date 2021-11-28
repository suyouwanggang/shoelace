import SlColumn from '../column/column';
/**
 * 定义排序，升序，降序,不显示
 */
export declare enum SortingEnum {
    ASC = "ASC",
    DESC = "DESC",
    NULL = "null"
}
/**
 * 定义需要table 表头 行
 */
export declare type RowHeader = Array<Array<SlColumn>>;
declare type ColumnCacheData = {
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
export declare const getFieldValue: (data: any, field: string | ((data: any) => any)) => any;
export declare const setFieldValue: (data: any, field: string, value: any) => any;
export declare const getColumnCacheData: (column: SlColumn) => ColumnCacheData;
/**
 * 将表头排版布局，计算出 有多少行，每个单元格跨多少行，多少列，用于渲染表头，取colspan=4 的columnData来渲染tbody TD
 * @param columns 表头
 * @returns {
 *   rows: 有多少个 TR
      leafColumns:叶子TH， 用于渲染tbody
 * }
 */
declare const caculateColumnData: (columns: SlColumn[]) => {
    rows: RowHeader;
    leafColumns: SlColumn[];
};
/**
 * 查找PColumn 最底层最后一个能够拖动的PColumn
 * @param column
 */
export declare const findLastCanChangeWidth: (column: SlColumn) => SlColumn;
/**
 * 查找PColumn 对应的th
 * @param column
 *
 */
export declare const getThCellByColumn: (column: SlColumn) => HTMLTableCellElement;
/**
 * 判断列 是否包含 子列
 * @param column  父级列
 * @param subColumn  子列
 */
export declare const isColumnContainsColumn: (column: SlColumn, subColumn: SlColumn) => boolean;
export declare const isNumberWidth: (col: Number | string) => boolean;
export default caculateColumnData;
//# sourceMappingURL=tableHelper.d.ts.map