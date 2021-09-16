import { html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { ClassInfo, classMap } from 'lit-html/directives/class-map';
import { StyleInfo, styleMap } from 'lit-html/directives/style-map';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { customStyle } from '../../internal/customStyle';
import { emit } from '../../internal/event';
import { spread, SpreadResult } from '../../internal/spread';
import { watch } from '../../internal/watch';
import { watchProps } from '../../internal/watchProps';
import { isArray, isFunction } from '../../utilities/common';
import { getResouceValue } from '../../utilities/getResouce';
import { addResizeHander, DisposeObject } from '../../utilities/resize.util';
import SlColumn from '../column/column';
import '../icon/icon';
import '../spinner/spinner';
import { iteratorNodeData, TreeNodeData } from '../tree-node/tree-node-util';
import styles from './table.styles';
import { removeTableCacheByKey, restoreFromLocalCache } from './tableCacheHelper';
import { CellContext, CellHeadContext, defaultSortConfig, defaultTreeConfig, RowContext, SortConfig, SortValue, TreeConfig } from './tableConfig';
import { connectTableHanlder, getTreeNodeAllChildrenSize } from './tableEventHelper';
import caculateColumnData, { getColumnCacheData, RowHeader } from './tableHelper';
import { getCellContext, getTableHeadCellContext, renderTdCellTemplate, renderThColTemplate } from './tableRenderHelper';
import { vituralScrollCalc } from './virtualScroll';

const rowContextMap = new WeakMap<HTMLTableRowElement, RowContext>();
const setRowContext = (tr: HTMLTableRowElement, context: RowContext) => {
  if (tr) {
    rowContextMap.set(tr, context);
  }
};
/** 获取 table tbody tr 上下文 */
export const getRowContext = (tr: HTMLTableRowElement) => {
  return rowContextMap.get(tr) as RowContext;
};

export type TreeNodeCacheType = {
  node: TreeNodeData;
  parent: TreeNodeData;
  level: number;
  seqno: number;
};

let componentID = 0;

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
 * @event {{dom:HTMLElement,...cellContext}}  sl-tree-node-before-open - Emitted before table tree node to open   . tree 事件
 * @event {{dom:HTMLElement,...cellContext}}  sl-tree-node-before-close - Emitted before table tree node to close  . tree 事件
 * @event {{dom:HTMLElement,...cellContext}}  sl-tree-node-before-toogle - Emitted before table tbody td node state toogle  . tree 事件
 * @event {{dom:HTMLElement,...cellContext}}  sl-tree-node-open - Emitted after table tbody td node state toogle  . tree 事件
 * @event {{dom:HTMLElement,...cellContext}}  sl-tree-node-toogle - Emitted after table tbody td node state toogle  .tree 事件
 * @event {{dom:HTMLElement,...cellContext}}  sl-tree-node-loaded - after table tree node lazy load children end  .tree load 事件
 * @event {{dom:HTMLElement,...cellContext}}  sl-tree-node-load-error - Emitted after table tbody td node state toogle  .tree 事件
 *
 *  //tbody 行，tbody tr 事件
 * @event {{row:TR,...RowContext}}  sl-table-tr-${normalEvent} - Emitted table tbody tr trigger normalEvent .support normalEvent event [click,dblclick,keydown,keypress,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup]  .
 * //tbody 行，tbody tr td 事件
 * @event {{row:TR,td:TD,...CellContext}}  sl-table-td-${normalEvent} - Emitted table tbody td trigger normalEvent.  support normalEvent  event [click,dblclick,keydown,keypress,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup].
 * @event {{td:TD,dom:HTMLElement,...CellContext}}  sl-table-edit-cell - 当Table 组件内置 cell edit 数据发生变化,时触发.
 * @event {{td:TD,dom:HTMLElement,...CellContext}}  sl-table-edit-cell-active - 当单元格进入了编辑状态时触发
 * @event {{td:TD,...CellContext}}   sl-table-edit-cell-before-change - Emitted  before when table  edit cell  change .
 * //表格 checkbox 控制
 * @event {{checkbox:SlCheckbox,...CellContext }}   sl-table-check-before-change - Emitted  before  tbody checkbox check will change .
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
@customStyle()
@customElement('sl-table')
export default class SlTable extends LitElement {
  static styles = styles;

  @state()
  componentID = `${'tableID_' + componentID++}`;

  /** td size*/
  @property({ type: String, attribute: false, reflect: true }) size: 'small' | 'larger' | 'default' = 'small';

  /** table 是否显示border */
  @property({ type: Boolean, attribute: true, reflect: true }) border: boolean = false;

  /** table 是否支持鼠标活动行变色 */
  @property({ type: Boolean, attribute: false, reflect: true }) hoverAble: boolean = true;

  /** table 支持斑马线 */
  @property({ type: Boolean, attribute: false, reflect: true }) stripe: boolean = false;

  /** 表格需要渲染的数据 必须是数组*/
  @property({ type: Array, attribute: false }) dataSource: unknown[];

  @property({ type: Object, attribute: false }) sortConfig: SortConfig = { ...defaultSortConfig };
  /** 表格当前排序值 */
  @property({ type: Object, attribute: false }) sortValue?: SortValue | Array<SortValue>;

  @property({ type: Object, attribute: false }) treeConfig?: TreeConfig;

  /** table 是否固定footer 到底部 */
  @property({ type: Boolean, attribute: false, reflect: true }) fixedFoot: boolean = false;

  /** 渲染tfooter 此方法接收所有的列，返回footer 组成的tr template list */
  @property({ type: Object })
  customRenderFooter: (columns: SlColumn[]) => TemplateResult<1>;

  /** table 前端缓存ID */
  @property({ type: String, reflect: true, attribute: 'cache-key' }) cacheKey: string;
  @watch('cacheKey')
  locacheIDChange(oldKey: string) {
    if (oldKey) {
      removeTableCacheByKey(oldKey);
    }
    if (this.cacheKey) {
      restoreFromLocalCache(this);
    }
  }

  @watchProps(['sortConfig', 'sortValue'])
  sortConfigChange() {
    this.sortConfig = { ...defaultSortConfig, ...this.sortConfig };
    if (!this.sortConfig.multi) {
      if (Array.isArray(this.sortValue) && this.sortValue.length > 0) {
        this.sortValue = this.sortValue[this.sortValue.length - 1];
      }
    } else {
      if (!Array.isArray(this.sortValue) && this.sortValue) {
        this.sortValue = [this.sortValue];
      }
    }
  }
  /** table 容器最大高度 */
  @property({ type: String })
  tableMaxHeight: string;

  /** table 容器最小高度 */
  @property({ type: String })
  tableMinHeight: string;

  /**  table 容器高度，支持类似 css  "100% - 40px" 或者“ 100vh - 30px ” */
  @property({ type: String })
  tableHeight: string;

  /**  是否表格 是 table-layout ：fixed  */
  @property({ type: Boolean })
  tableLayoutFixed: boolean;

  /**  true, 则TreeNode 列，不会换行  */
  @property({ type: Boolean })
  treeNodeNoWrap: boolean;

  @query('#tableID', true)
  table: HTMLTableElement;

  @state()
  private innerDataSource: unknown[];
  /** 获取表格实际渲染的数据列表 */
  public getRenderDataSource() {
    return this.innerDataSource;
  }

  public treeNodeHasChildren(rowData: TreeNodeData) {
    if (typeof rowData.children == 'undefined' && this.treeConfig && this.treeConfig.lazy) {
      return rowData[this.treeConfig.hasChildProp as string];
    } else {
      return rowData.children ? rowData.children.length > 0 : false;
    }
  }

  /** 当为Tree的时候，存储哪些 正在加载中的TreeNodeData */
  @property({ type: Array, attribute: false })
  treeLoadingNode: TreeNodeData[] = [];

  /** 加载TreeNode 子数据，接收参数nodeData,parentData */
  @property({ type: Object })
  treeLoadingNodeMethod: (context: CellContext) => Promise<Array<TreeNodeData>>;

  /** 存储哪些行数据是展开的 */
  @property({ type: Array, attribute: false })
  expandRowData: unknown[] = [];

  /** 指定哪一列触发行扩展数据加载*/
  @property({ type: String, attribute: false })
  expandColumn: string;

  /** 是否懒加载扩展行 */
  @property({ type: Boolean, attribute: false })
  expandLazy: boolean = false;

  /** 指定懒加载扩展的方法 */
  @property({ type: Object, attribute: false })
  expandLazyLoadMethod: (rowData: unknown) => Promise<any>;

  /** 是否只能展开一个扩展行 */
  @property({ type: Boolean, attribute: false })
  expandAccordion: boolean = false;

  /** 存储正在展开的行数据 */
  @state()
  expandingRowData: Array<unknown> = [];

  /** 方法：指定如何渲染扩展行，接收行数据和叶子columns， 返回的应该是<tr>Template Result */
  @property({ type: Object, attribute: false })
  expandRowRender: (rowContext: RowContext, columns: SlColumn[], layLoadData?: any) => TemplateResult<1>;
  /** 存储已经加载过的扩展数据  */
  @property({ type: Object, attribute: false })
  cacheExpandLazyLoadDataMap = new Map<any, any>();

  /**
   * 展开行数据的扩展 数据
   * @param rowData table 行绑定的数据
   */
  public async doExpandRowData(rowData: unknown) {
    const table = this;
    const index = table.expandRowData.indexOf(rowData);
    const isExpend = index >= 0;
    const expandEvent = emit(table, `sl-table-expand-before`, {
      cancelable: true,
      detail: {
        expended: isExpend,
        rowData: rowData
      }
    });
    if (!expandEvent.defaultPrevented) {
      if (!isExpend) {
        //当前不是打开状态
        if (table.expandAccordion) {
          table.expandRowData.splice(0, table.expandRowData.length);
        }
        table.expandRowData.push(rowData);
      } else {
        table.expandRowData.splice(index, 1);
      }
      table.expandRowData = [...table.expandRowData];
      table.updateComplete.then(() => {
        emit(table, 'sl-table-expand', {
          detail: {
            expended: !isExpend,
            rowData: rowData
          }
        });
      });
    }
  }

  /**Tree 列表的时候启用，缓存节点渲染层次 */
  private cacheTreeNodeMap: Map<any, TreeNodeCacheType>;
  /**获取渲染后的 rowData 对应的Tree level */
  public getRowDataTreeLevel(rowData: TreeNodeData) {
    return this.cacheTreeNodeMap.get(rowData)?.level as number;
  }
  /**获取渲染后的 rowData 对应的父对象 */
  public getRowDataParentData(rowData: TreeNodeData) {
    return this.cacheTreeNodeMap.get(rowData)?.parent as TreeNodeData;
  }

  /**获取渲染后的 rowData 的顺序号 */
  public getRowDataDataIndex(rowData: TreeNodeData) {
    return this.cacheTreeNodeMap.get(rowData)?.seqno as number;
  }
  /**Table 启用Tree 的时候，获取缓存数据关系 */
  public get treeDataCache() {
    return this.cacheTreeNodeMap;
  }

  /**
   * table  heading
   */
  @query('thead[part=thead', true)
  thead: HTMLTableSectionElement;

  @query('div[part=base]', true)
  baseDiv: HTMLDivElement;
  /** scroll DIV */
  @query('div[part=scroll-div]', false)
  scrollDiv: HTMLDivElement;

  updated(map: PropertyValues) {
    super.updated(map);
    this.asynTableHeaderWidth();
  }
  /** 标识是否在进行tableAsync 同步 */
  private isAsyncTableWidth = false;
  asynTableHeaderWidth() {
    if (!this.isAsyncTableWidth) {
      this.isAsyncTableWidth = true;
      Promise.resolve().then(() => {
        //改造，多次请求，只执行一次重新计算
        this.watchFixedColumnsChange();
        this.isAsyncTableWidth = false;
        emit(this, 'sl-table-resize');
      });
    }
  }
  private _resizeResult: DisposeObject;
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    this.columnChangeHanlder();
    this._resizeResult = addResizeHander([this, this.table], () => {
      this.asynTableHeaderWidth();
    });
    connectTableHanlder(this);
    if (this.enableVirtualScroll && this.virtualItemHeight) {
      this.requestUpdate();
      this.updateComplete.then(() => {
        this.requestUpdate();
      })
    }

  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeResult?.dispose();
  }
  private _renderNoDataTemplate() {
    //只有当数据为空白数组，才显示没有数据
    if (this.innerDataSource && this.innerDataSource.length == 0) {
      return html`<slot @slotchange=${this.columnChangeHanlder} name="no-data">${getResouceValue('noData')}</slot>`;
    }
    return ``;
  }
  /** 设置表格 列固定，例如：fixedColumns="2",则为前两列固定，"2,2" 则为前两列，后两列固定，"0,2" ，[0,2]则为最后两列固定 */
  @property({ attribute: false })
  fixedColumns: string | Array<Number>;

  private caculateFixedColumnStyle(col: SlColumn, tableRect: DOMRect, fixedLeft: boolean) {
    let td = this.table.querySelector(`td[uniqueid="${col.uniqueID}"]`);
    if (!td) {
      td = this.table.querySelector(`th[uniqueid="${col.uniqueID}"]`);
    }
    if (td) {
      return `
          th[uniqueid="${col.uniqueID}"],
          td[uniqueid="${col.uniqueID}"]{
            position:sticky !important;z-index:1; 
            ${fixedLeft ? `left:${td.getBoundingClientRect().left - tableRect.left}px;` : ''}
            ${!fixedLeft ? `right:${tableRect.right - td.getBoundingClientRect().right}px;` : ''}
          }
        `;
    }
    return '';
  }
  @watchProps(['fixedColumns'], { waitUntilFirstUpdate: true })
  watchFixedColumnsChange() {
    this.fixedStyleElement.textContent = '';
    let style = '';
    if (this.fixedColumns) {
      let array = Array.isArray(this.fixedColumns) ? this.fixedColumns : String(this.fixedColumns).split(',');
      let left = parseInt('' + array[0]);
      let right = array.length > 1 ? parseInt('' + array[1]) : 0;
      let thead = this.thead;
      let tableRect = thead.getBoundingClientRect();
      let columnSize = this.tdRenderColumns.length;
      if (!isNaN(left)) {
        for (let i = 0, j = Math.min(left, columnSize); i < j; i++) {
          let col = this.tdRenderColumns[i];
          while (col != null && col.tagName.toLowerCase() == 'sl-column') {
            style += this.caculateFixedColumnStyle(col, tableRect, true);
            col = col.parentElement as SlColumn;
          }
        }
      }
      if (!isNaN(right)) {
        for (let i = columnSize - 1, j = 0; j < right && i >= 0;) {
          let col = this.tdRenderColumns[i];
          while (col != null && col.tagName.toLowerCase() == 'sl-column') {
            style += this.caculateFixedColumnStyle(col, tableRect, false);
            col = col.parentElement as SlColumn;
          }
          i--;
          j++;
        }
      }
    }
    this.fixedStyleElement.textContent = style;
  }

  @query('#styleID', true)
  private fixedStyleElement: HTMLStyleElement;
  render() {
    let tableStyle: any = {};
    this.tableHeight ? (tableStyle['height'] = `calc( ${isNaN(Number(this.tableHeight)) ? this.tableHeight : this.tableHeight + 'px'} )`) : '';
    this.tableMaxHeight ? (tableStyle['maxHeight'] = `calc( ${isNaN(Number(this.tableMaxHeight)) ? this.tableMaxHeight : this.tableMaxHeight + 'px'} )`) : '';
    this.tableMinHeight ? (tableStyle['minHeight'] = `calc( ${isNaN(Number(this.tableMinHeight)) ? this.tableMinHeight : this.tableMinHeight + 'px'} )`) : '';

    return html` <style id="styleID"></style>
      <div class="sl-table-base" part="base" size=${this.size}>
        <div class="sl-table-base-scroll-div" style=${styleMap(tableStyle)} part="scroll-div" ?hover-able=${this.hoverAble} ?stripe=${this.stripe} ?border=${this.border}>
          <!--渲染table 区 -->
          <table part="table" id="tableID" componentID=${this.componentID}>
            <thead part="thead" componentID=${this.componentID}>
              ${this._renderTheadRows()}
            </thead>
            <tbody componentID=${this.componentID}>
              ${this._renderDataSourceRows()}
            </tbody>
            <tfoot part="tfoot" class=${this.fixedFoot ? 'fixedFoot' : ''}>
              ${this.customRenderFooter ? this.customRenderFooter(this.tdRenderColumns) : ''}
            </tfoot>
          </table>
          ${this._renderNoDataTemplate()}
        </div>
        <slot @slotchange=${this.columnChangeHanlder}></slot>
      </div>`;
  }
  /**渲染表头行 theader tr th */
  private _renderTheadRows() {
    const table = this;
    const trTemplates = (rowColumn: SlColumn[], rowIndex: number) => {
      return html`<tr .columns=${rowColumn}>
        ${rowColumn.map((column, index) => {
        const cache = getColumnCacheData(column);
        const context: CellHeadContext = {
          column: column,
          colIndex: index,
          rowspan: cache.rowspan as number,
          colspan: cache.colspan as number,
          colRowIndex: rowIndex
        };
        return renderThColTemplate(context, table);
      })}
      </tr>`;
    };
    return this.theadRows.map((items, index) => trTemplates(items, index));
  }

  /**自定义 渲染tbody td的样式 */
  @property({ type: Object, attribute: false })
  customRenderCellStyle: (context: CellContext) => StyleInfo;

  /**自定义 渲染tbody td的class  */
  @property({ type: Object, attribute: false })
  customRenderCellClassMap: (cellContext: CellContext) => ClassInfo | string | string[];

  /**自定义 渲染tbody td的 SpreadResult */
  @property({ type: Object, attribute: false })
  customRenderCellSpread: (cellContext: CellContext) => SpreadResult;

  /**自定义 渲染tHeader th的样式 */
  @property({ type: Object, attribute: false })
  customRenderCellHeadStyle: (context: CellHeadContext) => StyleInfo;

  /**自定义 渲染thead th的class  */
  @property({ type: Object, attribute: false })
  customRenderCellHeadClassMap: (context: CellHeadContext) => ClassInfo | string | string[];

  /**自定义 渲染thead  th SpreadResult  */
  @property({ type: Object, attribute: false })
  customRenderCellHeadSpread: (context: CellHeadContext) => SpreadResult;

  /**自定义 渲染tbody tr的样式 */
  @property({ type: Object, attribute: false })
  customRenderRowStyle: (rowContext: RowContext) => StyleInfo;

  /**自定义 渲染tHeader tr的样式 */
  @property({ type: Object, attribute: false })
  customRenderRowClassMap: (rowContext: RowContext) => ClassInfo | string | string[];

  /**自定义 渲染tbody tr的Spread */
  @property({ type: Object, attribute: false })
  customRenderRowSpread: (rowContext: RowContext) => SpreadResult;

  /** 虚拟滚动行高 */
  @property({ type: Number, attribute: false })
  virtualItemHeight: number;

  /** 虚拟滚动启用 */
  @property({ type: Number, attribute: false })
  enableVirtualScroll: number;


  //表格编辑模式

  /**表格编辑总控： 是否允许启动表格编辑功能 */
  @property({ type: Boolean, attribute: false })
  editEnable = false;

  /** 编辑模式：row:行编辑(一次编辑一行，cell:单元格编辑（一次编辑一个TD），columm：列编辑模式，一次编辑一列*/
  @property({ type: String, attribute: false })
  editMode: 'row' | 'column' | 'cell' = 'row';

  /** 编辑行为：如果 editMode=row,是否一次允许出现多个行编辑，editMode=column, 是否允许一出出现多列编辑 */
  @property({ type: Boolean, attribute: false })
  editAccordion = false;
  @watch('editAccordion')
  changeEditAccordion() {
    if (this.editAccordion) {
      if (this.currentEditRow && this.currentEditRow.length > 0) {
        this.currentEditRow = [this.currentEditRow[0]];
      }
      if (this.currentEditColumn && this.currentEditColumn.length > 0) {
        this.currentEditColumn = [this.currentEditColumn[0]];
      }
    }
  }

  /** 触发编辑模式的事件,支持click,dbclick,manual */
  @property({ type: String, attribute: false })
  editTrigger = 'click';

  /** 当前编辑的行数据 */
  @property({ type: Array, attribute: false })
  currentEditRow: Array<any> = [];

  /** 当前编辑的单元格  */
  @state()
  currentEditCell?: { column: SlColumn; rowData: any };

  /** 当前编辑的列*/
  @property({ type: Array, attribute: false })
  currentEditColumn: Array<SlColumn> = [];

  /** TBody TD 是否启用多行...*/
  @property({ type: Boolean, attribute: false })
  enableCellBox = false;

  /** TBody TD 是否超过多行则...*/
  @property({ type: Number, attribute: false })
  cellBoxLines = 1;

  @watch('cellBoxLines', { waitUntilFirstUpdate: true })
  watchCellBoxLinesChange() {
    this.style.setProperty('--sl-table-cell-box-lines', this.cellBoxLines + '');
  }

  /** 定义列 type='checkbox','radio'时起作用， 定义checkbox 列绑定的属性 ，如果不指定，则Table checkbox列 绑定值就是rowData 本身*/
  @property({ type: String })
  checkPropField: string;

  /**定义列 type='checkbox','radio'时起作用， 确定列 checkbx/radio Disable属性,或者一个函数接收rowData ，确定rowData checkbox 列是否可以选择 如果不指定，则此列checkbox 所有的都可以勾选*/
  @property()
  checkDisablePropField: string | ((rowData: any) => boolean);

  /** 定义表格当前多选中的值（作用于checkbox 列上） */
  @property({ type: Object, attribute: false })
  checkValue: any | Array<any>;

  /**如果启用TreeConfig ,checkbox 向下级联 选中 */
  @property({ type: Boolean })
  checkTreeCasecadeDown = true;

  /**如果启用TreeConfig ,checkbox 向上级联 选中 */
  @property({ type: Boolean })
  checkTreeCasecadeUp = false;



  /**判断rowData 是否是checkbox 列选中 */
  public isRowDataChecked(rowData: any) {
    const rowCheckValue = this.checkPropField ? rowData[this.checkPropField] : rowData;
    return isArray(this.checkValue) ? (this.checkValue as Array<any>).includes(rowCheckValue) : this.checkValue != undefined && this.checkValue == rowCheckValue;
  }
  /**判断rowData 是否是checkbox,radio列 disable */
  public isRowDataCheckedDisabled(rowData: any) {
    return this.checkDisablePropField ? (isFunction(this.checkDisablePropField) ? this.checkDisablePropField(rowData) : rowData[this.checkPropField]) : false;
  }

  @watchProps(['dataSource', 'treeConfig'])
  watchDataSourceChange() {
    if (this.treeConfig && this.dataSource) {
      this.treeConfig = { ...defaultTreeConfig, ...this.treeConfig };
      this.cacheTreeNodeMap = new Map();
      let allTreeNode: unknown[] = [];
      let result: unknown[] = [];
      let seqNo = 0;
      for (let rowData of this.dataSource) {
        iteratorNodeData(rowData as TreeNodeData, (node: TreeNodeData, parentNode: TreeNodeData) => {
          if (typeof node.close == 'undefined') {
            node.close = true; //默认全部关闭
          }
          allTreeNode.push(node);
          let cache = {
            seqno: seqNo,
            level: (this.cacheTreeNodeMap.has(parentNode) ? this.getRowDataTreeLevel(parentNode) : 0) + 1,
            parent: parentNode
          } as TreeNodeCacheType;
          this.cacheTreeNodeMap.set(node, cache);
          seqNo++;
        });
      }
      for (let index = 0, j = allTreeNode.length; index < j; index++) {
        let rowData = allTreeNode[index] as TreeNodeData;
        result.push(rowData);
        if (this.treeConfig && rowData.close) {
          index += getTreeNodeAllChildrenSize(rowData);
        }
      }
      this.innerDataSource = result;
    } else {
      this.innerDataSource = this.dataSource;
    }
    this.cacheExpandLazyLoadDataMap.clear();
  }

  private _renderRowDataBetween(start: number, end: number) {
    const table = this;
    const rowList: unknown[] = [];
    const dataSource = this.innerDataSource;
    const cellTdArray = this.tdRenderColumns;
    // const items=dataSource.slice(start,end);
    for (let i = start, j = end; i < j; i++) {
      let index = i;
      //行循环
      let rowData = dataSource[index] as TreeNodeData;
      const rowContext: RowContext = {
        rowData,
        rowIndex: index
      };
      if (table.treeConfig) {
        rowContext.level = this.getRowDataTreeLevel(rowData);
        rowContext.parentData = this.getRowDataParentData(rowData);
        rowContext.rowIndex = this.getRowDataDataIndex(rowData);
      }

      const rowHtml = [];
      for (let x = 0, y = cellTdArray.length; x < y; x++) {
        //TD循环
        const column = cellTdArray[x];
        const cellContext: CellContext = {
          ...rowContext,
          column: column,
          colIndex: x
        };
        const tdResult = renderTdCellTemplate(cellContext, table);
        if (tdResult != nothing && tdResult != null && tdResult != undefined) {
          rowHtml.push(tdResult);
        }
      }
      const trStyle = this.customRenderRowStyle ? this.customRenderRowStyle(rowContext) : {};
      const trClassInfo = this.customRenderRowClassMap ? this.customRenderRowClassMap(rowContext) : null;
      let trClassObject: any = {};
      if (trClassInfo) {
        if (Array.isArray(trClassInfo)) {
          trClassInfo.forEach(item => (item.trim() != '' ? (trClassObject[item.trim()] = true) : ''));
        } else if (typeof trClassInfo == 'string') {
          trClassInfo.split(' ').forEach(item => (item.trim() != '' ? (trClassObject[item.trim()] = true) : ''));
        } else {
          trClassObject = { ...trClassInfo };
        }
      }
      const rowSpreadResult = this.customRenderRowSpread ? this.customRenderRowSpread(rowContext) : undefined;
      rowList.push(
        html`<tr
          ${ref(el => {
          setRowContext(el as HTMLTableRowElement, rowContext);
        })}
          .rowData=${rowData}
          style=${styleMap(trStyle)}
          class=${classMap(trClassObject)}
          ${spread(rowSpreadResult)}
        >
          ${rowHtml}
        </tr>`
      );
      if (this.expandRowRender && this.expandRowData.includes(rowData)) {
        rowList.push(this.expandRowRender(rowContext, cellTdArray, this.cacheExpandLazyLoadDataMap.get(rowData)));
      }
    }
    return rowList;
  }
  /** 获取 行上下文  */
  public getRowContext(row: HTMLTableRowElement) {
    return getRowContext(row);
  }
  /** 获取 td 上下文  */
  public getCellContext(td: HTMLTableCellElement) {
    return getCellContext(td);
  }
  /** 获取 thead th 上下文  */
  public getHeadCellContext(th: HTMLTableCellElement) {
    return getTableHeadCellContext(th);
  }
  private _virtualRenderTbodyRows() {
    if (this.enableVirtualScroll && this.scrollDiv) {
      if (!this.virtualItemHeight) {
        console.error('virtualItem height should be set ');
      }
      let tdRenderColumns = this.tdRenderColumns;
      let scrollTop = this.scrollDiv.scrollTop;
      let height = this.thead.offsetHeight + (this.table.tFoot ? this.table.tFoot.offsetHeight : 0);
      const result = vituralScrollCalc(this.scrollDiv.clientHeight - height, this.innerDataSource.length, this.virtualItemHeight, scrollTop);
      const trTop = html`<tr>
        <td style=${result.paddingTop > 0 ? `height:${result.paddingTop}px;` : 'display:none'} colspan=${tdRenderColumns.length}>&nbsp;</td>
      </tr>`;
      const trBottom = html`<tr>
        <td style=${result.paddingBottom > 0 ? `height:${result.paddingBottom}px;` : 'display:none'} colspan=${tdRenderColumns.length}>&nbsp;</td>
      </tr>`;
      const trs = this._renderRowDataBetween(result.offsetStart, result.offsetEnd);
      return html`${trTop}${trs}${trBottom}`;
    }
    return '';
  }
  private _renderDataSourceRows() {
    if (this.innerDataSource) {
      return this.enableVirtualScroll ? this._virtualRenderTbodyRows() : this._renderRowDataBetween(0, this.innerDataSource.length);
    }
    return nothing;
  }
  get allSubColumns(): SlColumn[] {
    let columns = Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn;
    }) as SlColumn[];
    return columns.sort((item1, item2) => item1.order - item2.order);
  }

  get canShowColumns(): SlColumn[] {
    let columns = Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn && !item.hidden;
    }) as SlColumn[];
    return columns.sort((item1, item2) => item1.order - item2.order);
  }

  /**表头真实数据，有多少行，每个th 有rowspan ,colspan*/
  @state()
  private theadRows: RowHeader = [];
  /**循环数据，输出tbody 的表头定义数组*/
  @state()
  private tdRenderColumns: SlColumn[] = [];
  private isColumnHanlderFlag = true;
  /** 如果column 发生了变化，需要重新计算 表头布局 */
  public columnChangeHanlder() {
    if (this.hasUpdated && this.scrollDiv && this.isColumnHanlderFlag) {
      this.isColumnHanlderFlag = false;
      Promise.resolve().then(() => {
        const { rows, leafColumns } = caculateColumnData(this.canShowColumns);
        this.theadRows = rows;
        this.tdRenderColumns = leafColumns;
        this.isColumnHanlderFlag = true;
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-table': SlTable;
  }
}
