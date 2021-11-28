import { TemplateResult } from 'lit';
import SlCheckbox from '../checkbox/checkbox';
import SlColumn from '../column/column';
import SlTable from './table';
import { CellContext, CellHeadContext } from './tableConfig';
/**
 * 注册Table 列TH 默认渲染
 * @param type  列的类型
 * @param templateFun 渲染Template ，函数接收两个参数，一个是column, 一个table对象
 */
export declare const registerColTemplate: (type: string, templateFun: (column: SlColumn, table: SlTable) => TemplateResult<1>) => void;
export declare const getReisterColTemplate: (type: string) => ((column: SlColumn, table: SlTable) => TemplateResult<1>) | undefined;
export declare const checkboxColChange: (table: SlTable, checkbox: SlCheckbox) => void;
export declare const getColumnRenderResult: (context: CellHeadContext, table: SlTable) => TemplateResult<1>;
/**
 * 注册Table 列TD默认渲染
 * @param type  列的类型
 * @param templateFun  渲染Template ，函数接收两个参数，cellContext, 一个table对象
 */
export declare const registerCellTemplate: (type: string, templateFun: (context: CellContext, table: SlTable) => TemplateResult<1>) => void;
export declare const checkboxTDChange: (checkbox: SlCheckbox, table: SlTable) => void;
export declare const getReisterCellTemplate: (type: string) => ((context: CellContext, table: SlTable) => TemplateResult<1>) | undefined;
//# sourceMappingURL=cellDefaultRender.d.ts.map