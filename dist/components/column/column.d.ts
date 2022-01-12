import { LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { EDIT_TYPE } from '../table/edit';
import SlTable from '../table/table';
import { CellContext, CellHeadContext, ColumnItems } from '../table/tableConfig';
/**
 * @since 2.0
 * @status experimental
 * @description:用于定义sl-table 的表头和列，没有实际的渲染
 *
 */
export default class SlColumn extends LitElement {
    /**表头自定义渲染*/
    renderCol: (context: CellHeadContext) => TemplateResult<1>;
    /**对应TD渲染 ,接收表格cellContext:作为参数，渲染TD*/
    renderCell: (context: CellContext) => TemplateResult<1> | {
        template: TemplateResult<1>;
        colspan?: number;
        rowspan?: number;
    } | typeof nothing;
    /**是否隐藏此列 */
    hidden: boolean;
    /** 列所对应的字段，在同一个table 中应该唯一，此会作为rowData 的key，支持"." 作为分隔符 */
    field: string;
    /** 列所对应的label，默认th 就是显示此label*/
    label: string;
    /** 列所对应表头TH 的水平对齐方式*/
    colAlign: 'left' | 'center' | 'right';
    /** 列所对应表头TH 的垂直对齐方式*/
    colvAlign: 'top' | 'middle' | 'bottom';
    /** 列所对应的TD 的水平对齐方式*/
    align: 'left' | 'center' | 'right';
    /** 列所对应的TD 的垂直对齐方式*/
    vAlign: 'top' | 'middle' | 'bottom';
    /** 列是否支持排序 */
    sortAble: boolean;
    /** 是否支持拖动列的宽度 */
    resizeAble: boolean;
    /**列宽 */
    width: string;
    /**最小列宽 */
    minWidth: string;
    /**最大列宽 */
    maxWidth: string;
    /**初始化自动生成唯一ID */
    uniqueID: string;
    /**顺序:越小越靠前 */
    order: number;
    /**列的类型，指定类型的列，有特定的渲染，例如index,checkbox,radio,或者会影响列的edit模式 */
    type: 'index' | 'checkbox' | 'radio' | 'date' | 'date-month' | 'date-year';
    /**列编辑器，内置单元格编辑器 ，EDIT_TYPE:input,text,date,select,multi-select, multi-checkbox, 或者一个函数，实现自定义列编辑器 */
    edit: EDIT_TYPE | string | ((context: CellContext) => TemplateResult<1>);
    /** 编辑器 input,textarea 最大输入长度 */
    inputMaxLength: number;
    /** 编辑器 input,textarea 最小输入长度 */
    inputMinLength: number;
    /**编辑器 是否是必填的 待实现*/
    editRequired: boolean;
    /** 定义列数据映射器,在 会将 rowData[field]转为为显示值，同时在编辑的时候，也会作为select，checkbox 下拉项 */
    items: Array<ColumnItems>;
    /**
     *  所有hidden!=false直接子column,并且按照order排序了
     */
    get childCanShowColumn(): SlColumn[];
    /**
     * 所有直接子column
     */
    get childAllColumn(): SlColumn[];
    get table(): SlTable;
    updated(map: PropertyValues): void;
    createRenderRoot(): this;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-column': SlColumn;
    }
}
//# sourceMappingURL=column.d.ts.map