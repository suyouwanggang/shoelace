import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { ClassInfo } from 'lit/directives/class-map.js';
import { StyleInfo } from 'lit/directives/style-map.js';
import { SpreadResult } from '../../internal/spread';
import SlColumn from '../column/column';
import '../icon/icon';
import '../spinner/spinner';
import { TreeNodeData } from '../tree-node/tree-node-util';
import { CellContext, CellHeadContext, RowContext, SortConfig, SortValue, TreeConfig } from './tableConfig';
/** 获取 table tbody tr 上下文 */
export declare const getRowContext: (tr: HTMLTableRowElement) => RowContext;
export declare type TreeNodeCacheType = {
    parent: TreeNodeData;
    level: number;
    seqno: number;
};
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency  sl-column,sl-icon,sl-spinner
 *
 * @event sl-table-resize - Emitted table resize.
 *
 * @event {{div:HTMLDIVElement}} sl-table-scroll - Emitted scroll table.滚动事件
 * @event {{column:SLColumn,sortValue:当前排序值}} sl-table-sort - Emitted table column sort. 排序事件
 * @event {{column:SLColumn,sortValue:排序前值}} sl-table-before-sort - Emitted before table column sort. 排序事件
 *
 *
 * @event {{column:SLColumn,change:改变的宽度}}  sl-table-column-resize - Emitted table column width change by drag. 拖动列事件
 *
 *
 * @event {{dom:HTMLElement,context:CellContext}}  sl-tree-node-before-open - Emitted before table tree node to open   . tree 事件
 * @event {{dom:HTMLElement,context:CellContext}}  sl-tree-node-before-close - Emitted before table tree node to close  . tree 事件
 * @event {{dom:HTMLElement,context:CellContext}}  sl-tree-node-before-toogle - Emitted before table tbody td node state toogle  . tree 事件
 * @event {{dom:HTMLElement,context:CellContext}}  sl-tree-node-open - Emitted after table tbody td node state toogle  . tree 事件
 * @event {{dom:HTMLElement,context:CellContext}}  sl-tree-node-toogle - Emitted after table tbody td node state toogle  .tree 事件
 * @event {{dom:HTMLElement,context:CellContext}}  sl-tree-node-loaded - after table tree node lazy load children end  .tree load 事件
 * @event {{dom:HTMLElement,context:CellContext}}  sl-tree-node-load-error - Emitted after table tbody td node state toogle  .tree 事件
 *
 *  //tbody 行，tbody tr 事件
 * @event {{row:TR,context:RowContext}}  sl-table-tr-${normalEvent} - Emitted table tbody tr trigger normalEvent .support normalEvent event [click,dblclick,keydown,keypress,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup]  .
 * //tbody 行，tbody tr td 事件
 * @event {{row:TR,td:TD,context:CellContext}}  sl-table-td-${normalEvent} - Emitted table tbody td trigger normalEvent.  support normalEvent  event [click,dblclick,keydown,keypress,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup].
 * @event {{td:TD,dom:HTMLElement,context:CellContext,value:any}}  sl-table-cell-edit-commit - 当Table 组件内置 cell edit 数据发生变化,时触发.
 *
 * @event {{td:TD,context:CellContext}}   sl-table-cell-edit-before-change- Emitted  before when table  edit cell  change .
 * @event {{td:TD,dom:HTMLElement,context:CellContext}}  sl-cell-edit-start - 当单元格开始进入编辑状态（此时cell还没变成编辑状态，可以取消阻止事件）
 * @event {{td:TD,dom:HTMLElement,context:CellContext}}  sl-cell-edit-active - 当单元格进入了编辑状态时触发
 * //EIDT 发生顺序（sl-table-cell-edit-before-change->sl-cell-edit-start->sl-table-cell-edit-active)
 * //表格 checkbox 控制
 * @event {{checkbox:SlCheckbox,context:CellContext }}   sl-table-check-before-change - Emitted  before  tbody checkbox check will change .
 * @event {{checkbox:SlCheckbox,context:CellContext }}   sl-table-check-head-before-change - Emitted  before when column checkbox will change .
 * @event {{value:Array<any> }}   sl-table-check-change - Emitted  after  tbody checkbox check  changed.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * @slot no-data - no-data slot.
 *
 *
 * @csspart base - The component's base wrapper.
 * @csspart scroll-div - The component's scroll-div .
 * @csspart table - The component's table .
 * @csspart resize-hanler - The th's resize-hanlder .
 *
 * @cssproperty --sl-th-padding-size - td,th padding
 * @cssproperty --sl-table-border-color - 边框颜色 ，例如 220,180,19 这种数字格式的颜色
 * @cssproperty --sl-table-background-color - table背景颜色 ，例如 220,180,19 这种数字格式的颜色
 * @cssproperty --sl-table-td-right-width -1px，定义表格单元格右侧的线条宽度
 * @cssproperty --sl-table-td-bottom-width -1px，定义表格单元格底侧的线条宽度
 *
 */
export default class SlTable extends LitElement {
    static styles: import("lit").CSSResult;
    componentID: string;
    /** td size*/
    size: 'small' | 'larger' | 'default';
    /** table 是否显示border */
    border: boolean;
    /** table 是否支持鼠标活动行变色 */
    hoverAble: boolean;
    /** table 支持斑马线 */
    stripe: boolean;
    /** 表格需要渲染的数据 必须是数组*/
    dataSource: unknown[];
    sortConfig: SortConfig;
    /** 表格当前排序值 */
    sortValue?: SortValue | Array<SortValue>;
    treeConfig?: TreeConfig;
    /** table 是否固定footer 到底部 */
    fixedFoot: boolean;
    /** 渲染tfooter 此方法接收所有的列，返回footer 组成的tr template list */
    customRenderFooter: (columns: SlColumn[]) => TemplateResult<1>;
    /** table 前端缓存ID */
    cacheKey: string;
    locacheIDChange(oldKey: string): void;
    sortConfigChange(): void;
    /** table 容器最大高度 */
    tableMaxHeight: string;
    /** table 容器最小高度 */
    tableMinHeight: string;
    /**  table 容器高度，支持类似 css  "100% - 40px" 或者“ 100vh - 30px ” */
    tableHeight: string;
    /**  是否表格 是 table-layout ：fixed  */
    tableLayoutFixed: boolean;
    /**  true, 则TreeNode 列，不会换行  */
    treeNodeNoWrap: boolean;
    table: HTMLTableElement;
    private innerDataSource;
    /** 获取表格实际渲染的数据列表 */
    getRenderDataSource(): unknown[];
    treeNodeHasChildren(rowData: TreeNodeData): boolean;
    /** 当为Tree的时候，存储哪些 正在加载中的TreeNodeData */
    treeLoadingNode: TreeNodeData[];
    /** 加载TreeNode 子数据，接收参数nodeData,parentData */
    treeLoadingNodeMethod: (context: CellContext) => Promise<Array<TreeNodeData>>;
    /** 存储哪些行数据是展开的 */
    expandRowData: unknown[];
    /** 指定哪一列触发行扩展数据加载*/
    expandColumn: string;
    /** 是否懒加载扩展行 */
    expandLazy: boolean;
    /** 指定懒加载扩展的方法 */
    expandLazyLoadMethod: (rowData: unknown) => Promise<any>;
    /** 是否只能展开一个扩展行 */
    expandAccordion: boolean;
    /** 存储正在展开的行数据 */
    expandingRowData: Array<unknown>;
    /** 方法：指定如何渲染扩展行，接收行数据和叶子columns， 返回的应该是<tr>Template Result */
    expandRowRender: (rowContext: RowContext, columns: SlColumn[], layLoadData?: any) => TemplateResult<1>;
    /** 存储已经加载过的扩展数据  */
    cacheExpandLazyLoadDataMap: Map<any, any>;
    /**
     * 展开行数据的扩展 数据
     * @param rowData table 行绑定的数据
     */
    doExpandRowData(rowData: unknown): Promise<void>;
    /**Tree 列表的时候启用，缓存节点渲染层次 */
    private cacheTreeNodeMap;
    /**获取渲染后的 rowData 对应的Tree level */
    getRowDataTreeLevel(rowData: TreeNodeData): number;
    /**获取渲染后的 rowData 对应的父对象 */
    getRowDataParentData(rowData: TreeNodeData): TreeNodeData;
    /**获取渲染后的 rowData 的顺序号 */
    getRowDataDataIndex(rowData: TreeNodeData): number;
    /**Table 启用Tree 的时候，获取缓存数据关系 */
    get treeDataCache(): Map<any, TreeNodeCacheType>;
    /**
     * table  heading
     */
    thead: HTMLTableSectionElement;
    baseDiv: HTMLDivElement;
    /** scroll DIV */
    scrollDiv: HTMLDivElement;
    updated(map: PropertyValues): void;
    /** 标识是否在进行tableAsync 同步 */
    private isAsyncTableWidth;
    asynTableHeaderWidth(): void;
    private _resizeResult;
    firstUpdated(map: PropertyValues): void;
    connectedCallback(): void;
    private _renderNoDataTemplate;
    /** 设置表格 列固定，例如：fixedColumns="2",则为前两列固定，"2,2" 则为前两列，后两列固定，"0,2" ，[0,2]则为最后两列固定 */
    fixedColumns: string | Array<Number>;
    private caculateFixedColumnStyle;
    watchFixedColumnsChange(): void;
    private fixedStyleElement;
    render(): TemplateResult<1>;
    /**渲染表头行 theader tr th */
    private _renderTheadRows;
    /**自定义 渲染tbody td的样式 */
    customRenderCellStyle: (context: CellContext) => StyleInfo;
    /**自定义 渲染tbody td的class  */
    customRenderCellClassMap: (cellContext: CellContext) => ClassInfo | string | string[];
    /**自定义 渲染tbody td的 SpreadResult */
    customRenderCellSpread: (cellContext: CellContext) => SpreadResult;
    /**自定义 渲染tHeader th的样式 */
    customRenderCellHeadStyle: (context: CellHeadContext) => StyleInfo;
    /**自定义 渲染thead th的class  */
    customRenderCellHeadClassMap: (context: CellHeadContext) => ClassInfo | string | string[];
    /**自定义 渲染thead  th SpreadResult  */
    customRenderCellHeadSpread: (context: CellHeadContext) => SpreadResult;
    /**自定义 渲染tbody tr的样式 */
    customRenderRowStyle: (rowContext: RowContext) => StyleInfo;
    /**自定义 渲染tHeader tr的样式 */
    customRenderRowClassMap: (rowContext: RowContext) => ClassInfo | string | string[];
    /**自定义 渲染tbody tr的Spread */
    customRenderRowSpread: (rowContext: RowContext) => SpreadResult;
    /** 虚拟滚动行高 */
    virtualItemHeight: number;
    /** 虚拟滚动启用 */
    enableVirtualScroll: number;
    /**表格编辑总控： 是否允许启动表格编辑功能 */
    editEnable: boolean;
    /** 编辑模式：row:行编辑(一次编辑一行，cell:单元格编辑（一次编辑一个TD），columm：列编辑模式，一次编辑一列*/
    editMode: 'row' | 'column' | 'cell';
    /** 编辑行为：如果 editMode=row,是否一次允许出现多个行编辑，editMode=column, 是否允许一出出现多列编辑 */
    editAccordion: boolean;
    changeEditAccordion(): void;
    /** 触发编辑模式的事件,支持click,dbclick,manual */
    editTrigger: string;
    /** 当前编辑的行数据 */
    currentEditRow: Array<any>;
    /** 当前编辑的单元格  */
    currentEditCell?: {
        column: SlColumn;
        rowData: any;
    };
    /** 当前编辑的列*/
    currentEditColumn: Array<SlColumn>;
    /** TBody TD 是否启用多行...*/
    enableCellBox: boolean;
    /** TBody TD 是否超过多行则...*/
    cellBoxLines: number;
    watchCellBoxLinesChange(): void;
    /** 定义列 type='checkbox','radio'时起作用， 定义checkbox 列绑定的属性 ，如果不指定，则Table checkbox列 绑定值就是rowData 本身*/
    checkPropField: string | ((rowData: any) => any);
    /**定义列 type='checkbox','radio'时起作用， 确定列 checkbx/radio Disable属性,或者一个函数接收rowData ，确定rowData checkbox 列是否可以选择 如果不指定，则此列checkbox 所有的都可以勾选*/
    checkDisablePropField: string | ((rowData: any) => boolean);
    /** 定义表格当前多选中的值（作用于type=checkbox 列上） */
    checkValue: any | Array<any>;
    /** 定义表格当前单选的值（作用于type=radio 列上） */
    radioValue: any;
    /**如果启用TreeConfig ,checkbox 向下级联 选中 */
    checkTreeCasecadeDown: boolean;
    /**如果启用TreeConfig ,checkbox 向上级联 选中 */
    checkTreeCasecadeUp: boolean;
    /**获取rowData 选中值 */
    getRowDataCheckValue(rowData: any): any;
    /**
     * 循环 选中的数据
     * @param vistorFun 数据处理器
     */
    forEachCheckValue(vistorFun: (rowData: any, ...args: any) => void): void;
    /**判断rowData 是否是checkbox 列选中 */
    isRowDataChecked(rowData: any): boolean;
    /**判断rowData 是否是radio 列选中 */
    isRowDataRadioChecked(rowData: any): boolean;
    /**判断rowData 是否是checkbox,radio列 disable */
    isRowDataCheckedDisabled(rowData: any): any;
    watchDataSourceChange(): void;
    private _renderRowDataBetween;
    /** 获取 行上下文  */
    getRowContext(row: HTMLTableRowElement): RowContext;
    /** 获取 td 上下文  */
    getCellContext(td: HTMLTableCellElement): CellContext;
    /** 获取 thead th 上下文  */
    getHeadCellContext(th: HTMLTableCellElement): CellHeadContext;
    private _virtualRenderTbodyRows;
    private _renderDataSourceRows;
    get allSubColumns(): SlColumn[];
    get canShowColumns(): SlColumn[];
    /**表头真实数据，有多少行，每个th 有rowspan ,colspan*/
    private theadRows;
    /**循环数据，输出tbody 的表头定义数组*/
    private tdRenderColumns;
    private isColumnHanlderFlag;
    /** 如果column 发生了变化，需要重新计算 表头布局 */
    columnChangeHanlder(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-table': SlTable;
    }
}
