import { nothing, TemplateResult } from 'lit';
import SlTable from './table';
import { CellContext, CellHeadContext } from './tableConfig';
/** 获取 td 上下文 */
export declare const getTableHeadCellContext: (el: HTMLTableCellElement) => CellHeadContext;
export declare const renderThColTemplate: (context: CellHeadContext, table: SlTable) => TemplateResult<1>;
export declare const getColumnCellRenderTemplate: (context: CellContext, table: SlTable) => TemplateResult<1> | typeof nothing | {
    template: TemplateResult<1>;
    colspan?: number | undefined;
    rowspan?: number | undefined;
};
/** 获取 td 上下文 */
export declare const getCellContext: (el: HTMLTableCellElement) => CellContext;
export declare const renderTdCellTemplate: (context: CellContext, table: SlTable) => TemplateResult<1> | typeof nothing;
export declare const TABLESVG: {
    closeNodeSvg: TemplateResult<2>;
    openNodeSvg: TemplateResult<2>;
    expendCloseSvg: TemplateResult<2>;
    expendOpendSvg: TemplateResult<2>;
};
//# sourceMappingURL=tableRenderHelper.d.ts.map