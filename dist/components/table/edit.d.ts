import { TemplateResult } from 'lit';
import '../checkbox/checkbox';
import '../input/input';
import '../select/select';
import SlTable from './table';
import { CellContext, ColumnItems } from './tableConfig';
/**
 * column 内置的关键单元格编辑器
 */
export declare enum EDIT_TYPE {
    /** input 输入  */
    INPUT = "input",
    /** text 输入 */
    TEXT = "text",
    /** 日期输入 */
    DATE = "date",
    /** select 输入 */
    SELECT = "select",
    /** 多选 select  */
    MULIT_SELECT = "multi-select",
    /** 多选 checkbox */
    MULIT_CHECKBOX = "multi-checkbox"
}
/**
 * 注册默认单元格编辑器 Editor
 * @param editKey 编辑器类型
 * @param editTemplate  编辑器实现
 */
export declare const registDefaultEditor: (editKey: string, editTemplate: (context: CellContext) => TemplateResult<1>) => void;
export declare const getSelectLable: (item: ColumnItems) => any;
export declare const findItemLable: (items: Array<ColumnItems>, fieldValue: string | number | Array<string | number>) => string;
/** 触发sl-table-edit-cell 事件 */
export declare const emitTableCellEditFun: (context: CellContext, dom: EventTarget, value: any) => void;
/** 常量，表明 此单元格 不变成编辑模式 */
export declare const editNone: {};
/**
 * 获取TD 的编辑器
 * @param context
 * @returns
 */
export declare const getCellEditor: (context: CellContext) => typeof editNone | TemplateResult<1>;
/**
 * 判断当前 单元格是否是编辑状态
 * @param context
 * @param table
 * @returns
 */
export declare const isCellEditor: (context: CellContext, table: SlTable) => boolean;
//# sourceMappingURL=edit.d.ts.map