import SlColumn from '../column/column';
import SlTable from './table';
export declare const renderSortHeaderTemplate: (table: SlTable, column: SlColumn, hander: EventListener) => import("lit-html").TemplateResult<1>;
export declare const sortRenderHanlder: (column: SlColumn, table: SlTable) => void;
/**
 * 将table 排序字段值转为为Sql
 * @param table
 * @param converto 处理字段转sql 字段，例如"name" ->"a.name"
 * @returns
 */
export declare const getSortValueAsSql: (table: SlTable, converField?: (field: string) => string) => string;
//# sourceMappingURL=sort.d.ts.map