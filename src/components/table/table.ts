import { html, LitElement, nothing, PropertyValues, svg, TemplateResult } from 'lit';
import { ClassInfo, classMap } from 'lit-html/directives/class-map';
import { StyleInfo, styleMap } from 'lit-html/directives/style-map';
import { customElement, property, query, state } from 'lit/decorators.js';
import { customStyle } from '../../internal/customStyle';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { watchProps } from '../../internal/watchProps';
import { getResouceValue } from '../../utilities/getResouce';
import { addResizeHander, DisposeObject } from '../../utilities/resize.util';
import SlColumn from '../column/column';
import '../icon/icon';
import '../spinner/spinner';
import { iteratorNodeData, TreeNodeData } from '../tree-node/tree-node-util';
import styles from './table.styles';
import { removeTableCacheByKey, restoreFromLocalCache } from './tableCacheHelper';
import { defaultSortConfig, defaultTreeConfig, SortConfig, SortValue, TreeConfig } from './tableConfig';
import caculateColumnData, { RowHeader } from './tableHelper';
import { renderTdCellTemplate, renderThColTemplate } from './tableRenderHelper';
import { connectTableHanlder, getTreeNodeAllChildrenSize } from './tableTreeHelper';
import { vituralScrollCalc } from './virtualScroll';

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
 * @event {{dom:HTMLElement,column:SlColumn, node:nodeData,parentData:parentNodeData}}  sl-tree-node-before-open - Emitted before table tree node to open   . tree 事件
 * @event {{dom:HTMLElement,column:SlColumn, node:nodeData,parentData:parentNodeData}}  sl-tree-node-before-close - Emitted before table tree node to close  . tree 事件
 * @event {{dom:HTMLElement,column:SlColumn, node:nodeData,parentData:parentNodeData}}  sl-tree-node-before-toogle - Emitted before table tbody td node state toogle  . tree 事件
 * @event {{dom:HTMLElement,column:SlColumn, node:nodeData,parentData:parentNodeData}}  sl-tree-node-open - Emitted after table tbody td node state toogle  . tree 事件
 * @event {{dom:HTMLElement,column:SlColumn, node:nodeData,parentData:parentNodeData}}  sl-tree-node-toogle - Emitted after table tbody td node state toogle  .tree 事件
 * @event {{dom:HTMLElement,column:SlColumn, node:nodeData,parentData:parentNodeData}}  sl-tree-node-loaded - after table tree node lazy load children end  .tree load 事件
 * @event {{dom:HTMLElement,column:SlColumn, node:nodeData,parentData:parentNodeData}}  sl-tree-node-load-error - Emitted after table tbody td node state toogle  .tree 事件
 *
 *  //tbody 行，tbody td 事件
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-click - Emitted table tbody tr click  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-dblclick - Emitted table tbody tr dblclick  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-keydown - Emitted table tbody tr keydown  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-keypress - Emitted table tbody tr keypress  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-mousedown - Emitted table tbody tr mousedown  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-mouseenter - Emitted table tbody tr mouseenter  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-mouseleave - Emitted table tbody tr mouseleave  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-mousemove - Emitted table tbody tr mousemove  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-mouseout - Emitted table tbody tr mouseout  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-mouseover - Emitted table tbody tr mouseover  .
 * @event {{row:TR,rowData:行数据}}  sl-table-tr-mouseup - Emitted table tbody tr mouseup  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-click - Emitted table tbody td click  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-dblclick - Emitted table tbody td dblclick  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-keydown - Emitted table tbody td keydown  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-keypress - Emitted table tbody td keypress  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-mousedown - Emitted table tbody td mousedown  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-mouseenter - Emitted table tbody td mouseenter  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-mouseleave - Emitted table tbody td mouseleave  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-mousemove - Emitted table tbody td mousemove  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-mouseout - Emitted table tbody td mouseout  .
 * @event {{row:TR,td:cell,rowData:行数据,column:SlColumn}}  sl-table-td-mouseover - Emitted table tbody td mouseover  .
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
 * @csspart part - The component's table .
 * @csspart resize-hanler - The th's resize-hanlder .
 *
 * @cssproperty --sl-th-padding-size - td,th padding
 * @cssproperty --sl-table-border-color - 边框颜色 ，例如 220,180,19 这种数字格式的颜色
 * @cssproperty --sl-table-background-color - table背景颜色 ，例如 220,180,19 这种数字格式的颜色
 * @cssproperty --sl-table-td-right-width -1px，定义表格单元格右侧的线条宽度
 * @cssproperty --sl-table-td-bottom-width -1px，定义表格单元格底侧的线条宽度
 *
 */

export type TreeNodeCacheType = {
  node: TreeNodeData;
  parent: TreeNodeData;
  level: number;
  seqno: number;
};
let componentID = 0;
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
  /**表格当前排序值 */
  @property({ type: Object, attribute: false }) sortValue?: SortValue | Array<SortValue>;

  @property({ type: Object, attribute: false }) treeConfig?: TreeConfig;

  /** table 是否固定footer 到底部 */
  @property({ type: Boolean, attribute: false, reflect: true }) fixedFoot: boolean = false;

  /**渲染tfooter 此方法接收所有的列，返回footer 组成的tr template list */
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
  public static closeNodeSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" id="caret-right-fill" fill="currentColor" viewBox="0 0 16 16" >
                <use xlink:href="/assets/icons/sprite.svg#caret-right-fill"></use>
  </svg>`;
  public static openNodeSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" id="caret-down-fill"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"></path></svg>`;

  public static expendCloseSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 16 16" id="chevron-right"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"></path></svg>`;

  public static expendOpendSvg = svg`<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" id="chevron-down"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"></path></svg>`;
  /**  当启用TreeConfig ,此时树节点自定义渲染*/
  @property({ type: Object })
  customRenderTreeNode: (rowData: TreeNodeData, parentData: TreeNodeData, level: number) => TemplateResult<1>;

  protected treeNodeHasChildren(rowData: TreeNodeData) {
    if (typeof rowData.children == 'undefined' && this.treeConfig && this.treeConfig.lazy) {
      return rowData[this.treeConfig.hasChildProp as string];
    } else {
      return rowData.children ? rowData.children.length > 0 : false;
    }
  }
  /** 当为Tree的时候，存储哪些 正在加载中的TreeNodeData */
  @property({ type: Array, attribute: false })
  currentLoadingNode: TreeNodeData[] = [];

  /** 加载TreeNode 子数据，接收参数nodeData,parentData */
  @property({ type: Object })
  loadingNodeMethod: (nodeData: TreeNodeData, parentData: TreeNodeData) => Promise<Array<TreeNodeData>>;

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
  currentExpandingRowData: Array<unknown> = [];

  /**方法：指定如何渲染扩展行，接收行数据和叶子columns， 返回的应该是<tr>Template Result */
  @property({ type: Object, attribute: false })
  expandRowRender: (rowData: unknown, columns: SlColumn[], layLoadData?: any) => TemplateResult<1>;

  private _cacheExpandLazyLoadDataMap = new Map<any, any>();

  public get cacheExpandLazyLoadDataMap() {
    return this._cacheExpandLazyLoadDataMap;
  }
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
  /**
   * 内部使用封装td 渲染的数据，实现特殊功能
   * @param column
   * @param rowData
   * @param wrap
   * @returns
   */
  public wrapColumnFieldTemplate(column: SlColumn, rowData: TreeNodeData, wrap: TemplateResult<1>) {
    if (column.field && this.treeConfig && column.field == this.treeConfig.treeNodeColumn) {
      let parentData = this.getRowDataParentData(rowData);
      let level = this.getRowDataTreeLevel(rowData) as number;
      if (typeof rowData.close == 'undefined') {
        rowData.close = true;
      }
      let closed = rowData.close;
      let span = html`<span class="tree-node-icon" componentID=${this.componentID} part="tree-node-toogle"
        >${this.currentLoadingNode.includes(rowData)
          ? html`<sl-spinner part="tree-node-loading"></sl-spinner>`
          : closed
          ? SlTable.closeNodeSvg
          : SlTable.openNodeSvg}
      </span>`;
      return html`<div
        part="tree-node"
        class="tree-node ${this.treeNodeNoWrap ? 'nowrap-tree-node' : ''} ${closed ? 'closed' : ''}"
      >
        <div class="tree-node-inner" style="padding-left:${level * (this.treeConfig.indent as number)}px;">
          ${this.treeNodeHasChildren(rowData) ? span : html`<span class="tree-node-empty-node"></span>`}
          ${rowData.icon ? html`<sl-icon class="tree-node-icon" name=${rowData.icon}></sl-icon>` : ''}
          ${this.customRenderTreeNode ? this.customRenderTreeNode(rowData, parentData, level) : ''} ${wrap}
        </div>
      </div>`;
    } else if (column.field && this.expandColumn && column.field == this.expandColumn) {
      const opened = this.expandRowData.includes(rowData);
      return html`<div class="expand-toogle" part="expand-wrap">
        <span class="expand-toogle-icon" componentID=${column.table.componentID} part="expand-toogle-icon">
          ${this.currentExpandingRowData.includes(rowData)
            ? html`<sl-spinner part="expand-loading"></sl-spinner>`
            : opened
            ? SlTable.expendOpendSvg
            : SlTable.expendCloseSvg}
        </span>
        ${wrap}
      </div>`;
    }
    return wrap;
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

  /**获取渲染后的 rowData 对应的父对象 */
  public getRowDataRowDataIndex(rowData: TreeNodeData) {
    return this.cacheTreeNodeMap.get(rowData)?.seqno as number;
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
      });
    }
  }

  private _resizeResult: DisposeObject;
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    this.columnChangeHanlder();
    this._resizeResult = addResizeHander([this, this.table], () => {
      this.asynTableHeaderWidth();
      emit(this, 'sl-table-resize');
      if (this.enableVirtualScroll) {
        this.requestUpdate();
      }
    });
    connectTableHanlder(this);
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
    let td = this.table.querySelector(`td[uniqueid=${col.uniqueID}]`);
    if (!td) {
      td = this.table.querySelector(`th[uniqueid=${col.uniqueID}]`);
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
        for (let i = columnSize - 1, j = 0; j < right && i >= 0; ) {
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
    this.tableHeight
      ? (tableStyle['height'] = `calc( ${
          isNaN(Number(this.tableHeight)) ? this.tableHeight : this.tableHeight + 'px'
        } )`)
      : '';
    this.tableMaxHeight
      ? (tableStyle['maxHeight'] = `calc( ${
          isNaN(Number(this.tableMaxHeight)) ? this.tableMaxHeight : this.tableMaxHeight + 'px'
        } )`)
      : '';
    this.tableMinHeight
      ? (tableStyle['minHeight'] = `calc( ${
          isNaN(Number(this.tableMinHeight)) ? this.tableMinHeight : this.tableMinHeight + 'px'
        } )`)
      : '';

    return html` <style id="styleID"></style>
      <div class="sl-table-base" part="base" size=${this.size}>
        <div
          class="sl-table-base-scroll-div"
          style=${styleMap(tableStyle)}
          part="scroll-div"
          ?hover-able=${this.hoverAble}
          ?stripe=${this.stripe}
          ?border=${this.border}
        >
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
    const trTemplates = (rowColumn: SlColumn[]) => {
      return html`<tr .columns=${rowColumn}>
        ${rowColumn.map((col, index) => renderThColTemplate(col, index, table))}
      </tr>`;
    };
    return this.theadRows.map(items => trTemplates(items));
  }

  @property({ type: Object })
  /**自定义 渲染tbody td的样式 */
  customRenderCellStyle?: (col: SlColumn, rowData: any, rowIndex: number) => StyleInfo;

  @property({ type: Object })
  /**自定义 渲染tbody td的class  */
  customRenderCellClassMap?: (col: SlColumn, rowData: any, rowIndex: number) => ClassInfo | string | string[];

  @property({ type: Object })
  /**自定义 渲染tHeader th的样式 */
  customRenderCellHeadStyle?: (col: SlColumn) => StyleInfo;

  @property({ type: Object })
  /**自定义 渲染tbody th的class  */
  customRenderCellHeadClassMap?: (col: SlColumn) => ClassInfo | string | string[];

  @property({ type: Object })
  /**自定义 渲染tbody tr的样式 */
  customRenderRowStyle?: (rowData: any, rowIndex: number) => StyleInfo;

  @property({ type: Object })
  /**自定义 渲染tHeader tr的样式 */
  customRenderRowClassMap?: (rowData: any, rowIndex: number) => ClassInfo | string | string[];

  /** 虚拟滚动行高 */
  @property({ type: Number, attribute: false })
  virtualItemHeight: number;

  /** 虚拟滚动启用 */
  @property({ type: Number, attribute: false })
  enableVirtualScroll: number;

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
    this._cacheExpandLazyLoadDataMap.clear();
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
      let seqNo = table.treeConfig ? this.getRowDataRowDataIndex(rowData) : index;
      const rowHtml = [];
      for (let x = 0, y = cellTdArray.length; x < y; x++) {
        //TD循环
        let col = cellTdArray[x];
        let tdResult = renderTdCellTemplate(col, rowData, seqNo, x, table);
        if (tdResult != nothing && tdResult != null && tdResult != undefined) {
          rowHtml.push(tdResult);
        }
      }
      let trStyle = this.customRenderRowStyle ? this.customRenderRowStyle(rowData, seqNo) : {};
      let trClassInfo = this.customRenderRowClassMap ? this.customRenderRowClassMap(rowData, seqNo) : null;
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
      rowList.push(
        html`<tr .rowData=${rowData} style=${styleMap(trStyle)} class=${classMap(trClassObject)}>
          ${rowHtml}
        </tr>`
      );
      if (this.expandRowRender && this.expandRowData.includes(rowData)) {
        rowList.push(this.expandRowRender(rowData, cellTdArray, this._cacheExpandLazyLoadDataMap.get(rowData)));
      }
    }
    return rowList;
    // return html`${repeat(items,(item)=>item,(_item,index)=>rowList[index])}`;
  }
  private _virtualRenderTbodyRows() {
    if (this.enableVirtualScroll && this.scrollDiv) {
      if (!this.virtualItemHeight) {
        console.error('virtualItem height should be set ');
      }
      let tdRenderColumns = this.tdRenderColumns;
      let scrollTop = this.scrollDiv.scrollTop;
      let height = this.thead.offsetHeight + (this.table.tFoot ? this.table.tFoot.offsetHeight : 0);
      const result = vituralScrollCalc(
        this.scrollDiv.clientHeight - height,
        this.innerDataSource.length,
        this.virtualItemHeight,
        scrollTop
      );
      const trTop = html`<tr>
        <td
          style=${result.paddingTop > 0 ? `height:${result.paddingTop}px;` : 'display:none'}
          colspan=${tdRenderColumns.length}
        >
          &nbsp;
        </td>
      </tr>`;
      const trBottom = html`<tr>
        <td
          style=${result.paddingBottom > 0 ? `height:${result.paddingBottom}px;` : 'display:none'}
          colspan=${tdRenderColumns.length}
        >
          &nbsp;
        </td>
      </tr>`;
      const trs = this._renderRowDataBetween(result.offsetStart, result.offsetEnd);
      return html`${trTop}${trs}${trBottom}`;
    }
    return '';
  }
  private _renderDataSourceRows() {
    if (this.innerDataSource) {
      return this.enableVirtualScroll
        ? this._virtualRenderTbodyRows()
        : this._renderRowDataBetween(0, this.innerDataSource.length);
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
        const { rows, tdRenderColumnData } = caculateColumnData(this.canShowColumns);
        this.theadRows = rows;
        this.tdRenderColumns = tdRenderColumnData;
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
