import { html, LitElement, nothing, PropertyValues, svg, TemplateResult } from 'lit';
import { ClassInfo, classMap } from 'lit-html/directives/class-map';
import { StyleInfo, styleMap } from 'lit-html/directives/style-map';
import { customElement, property, query, state } from 'lit/decorators.js';
import { customStyle } from '../../internal/customStyle';
import { emit } from '../../internal/event';
import { watchProps } from '../../internal/watchProps';
import { getCssValue } from '../../utilities/common';
import { dragOnHandler } from '../../utilities/dragHelper';
import { getResouceValue } from '../../utilities/getResouce';
import { addResizeHander, DisposeObject } from '../../utilities/resize.util';
import SlColumn from '../column/column';
import { iteratorNodeData, TreeNodeData } from '../tree-node/tree-node-util';
import styles from './table.styles';
import caculateColumnData, { RowHeader, SortingEnum } from './tableHelper';
export enum SortTrigger {
  self = 'self',
  cell = 'cell'
}
/**
 * 定义表格的排序规则
 */
type SortConfig = {
  //触发排序区域,是th :cell, 还是排序区
  trigger: SortTrigger;
  //轮转顺序
  orders: Array<SortingEnum>;
  //是否支持多列排序
  multi: boolean;
  //当触发区域为cell,是否总是显示排序图标。
  alwaysShowIcon: boolean;
};

export const defaultSortConfig = {
  //排序区域控制，则
  trigger: SortTrigger.cell,
  //order 轮训值,开始为ASC，后面DESC，最后去掉排序 （null,这个跟产品不一致，可以默认去掉)
  // orders: [SortingEnum.ASC, SortingEnum.DESC, SortingEnum.NULL],
  orders: [SortingEnum.ASC, SortingEnum.DESC],
  multi: false,
  //是否总是显示排序图标,如果总是
  alwaysShowIcon: false
};

/**
 * 定义表格数据为树类型
 */
type TreeConfig = {
  //树子节点属性,必须为'chidren';
  // childrenProp:'children';
  //树节点ID属性
  idProp?: string;
  //树节点缩进
  indent?: number;
  //对于同一级的节点，每次只能展开一个
  accordion?: boolean;
  //是否显示根节点
  includeRoot: boolean;
  //是否默认懒加载
  lazy?: boolean;
  //指定treeNodeColumn 所在列 field
  treeNodeColumn: string;
  //懒加载时，哪个属性标识有子节点
  hasChildProp?: string;
};
export const defaultTreeConfig: TreeConfig = {
  idProp: 'id',
  //childrenProp:'children',
  indent: 14,
  accordion: false,
  lazy: false,
  includeRoot: true,
  treeNodeColumn: 'name',
  hasChildProp: 'hasChild'
};

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency  sl-column
 *
 * @event sl-table-resize - Emitted table resize.
 * @event {{column:SLColumn,sortValue:当前排序值}} sl-table-sort - Emitted table column sort.
 * @event {{column:SLColumn,sortValue:排序前值}} sl-table-before-sort - Emitted before table column sort.
 * @event {{column:SLColumn,change:改变的宽度}}  sl-table-column-resize - Emitted table column width change by drag.
 * @event {{div:滚动容器}}  sl-table-scroll - Emitted table'container scroll changed  .
 *
 *
 *
 * @slot no-data - no-data slot.
 * @slot example - An example slot.
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
@customStyle()
@customElement('sl-table')
export default class SlTable extends LitElement {
  static styles = styles;

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
  @property({ type: Object, attribute: false }) sortValue?:
    | {
        orderBy: string;
        orderType: SortingEnum;
      }
    | Array<{
        orderBy: string;
        orderType: SortingEnum;
      }>;

  @property({ type: Object, attribute: false }) treeConfig?: TreeConfig;

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

  /**  table 容器高度，支持类似 css calc "100% - 40px" 或者“ 100vh - 30px ” */
  @property({ type: String })
  tableHeight: string; //支持css calc ( 支持的内容 )

  @query('#tableID', true)
  table: HTMLTableElement;

  @state()
  private innerDataSource: unknown[];

  public static closeNodeSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" id="caret-right-fill" fill="currentColor" viewBox="0 0 16 16" >
                <use xlink:href="/assets/icons/sprite.svg#caret-right-fill"></use>
  </svg>`;
  public static openNodeSvg = svg`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" id="caret-down-fill"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"></path></svg>`;

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
  private handlerTreeNodeToogle(rowData: TreeNodeData, parentData: TreeNodeData, event: Event) {
    if (typeof rowData.children == 'undefined' && this.treeConfig && this.treeConfig.lazy) {
      let icon = event.target as HTMLElement;
      console.log(icon);
    }
    let nodeEvent = emit(this, `sl-tree-node-before-${rowData.close ? 'open' : 'close'}`, {
      cancelable: true,
      detail: {
        node: rowData,
        parentNode: parentData
      }
    });
    let nodeToogleEvent = emit(this, `sl-tree-node-toogle`, {
      cancelable: true,
      detail: {
        node: rowData,
        parentNode: parentData
      }
    });
    if (!nodeEvent.defaultPrevented && !nodeToogleEvent.defaultPrevented) {
      rowData.close = !rowData.close;
      emit(this, `sl-tree-node-${rowData.close ? 'close' : 'open'}`, {
        detail: {
          node: rowData,
          parentNode: parentData
        }
      });
      emit(this, `sl-tree-node-toogle`, {
        detail: {
          node: rowData,
          parentNode: parentData
        }
      });
      this.requestUpdate();
    }
  }
  public wrapTreeNodeColumnField = (column: SlColumn, rowData: TreeNodeData, wrap: TemplateResult<1>) => {
    if (column.field && this.treeConfig && column.field == this.treeConfig.treeNodeColumn) {
      let parentData = this.cacheParentMap.get(rowData);
      let level = this.cacheLevelMap.get(rowData) as number;
      if (typeof rowData.close == 'undefined') {
        rowData.close = true;
      }
      let closed = rowData.close;
      let span = html`<span
        class="tree-node-icon"
        @click=${(event: Event) => this.handlerTreeNodeToogle(rowData, parentData, event)}
        >${closed ? SlTable.closeNodeSvg : SlTable.openNodeSvg}</span
      >`;

      return html`<div
        class="tree-node ${closed ? 'closed' : ''}"
        style="padding-left:${level * (this.treeConfig.indent as number)}px;"
      >
        ${this.treeNodeHasChildren(rowData) ? span : html`<span class="tree-node-empty-node"></span>`}
        ${rowData.icon ? html`<sl-icon class="tree-node-icon" name=${rowData.icon}></sl-icon>` : ''}
        ${this.customRenderTreeNode ? this.customRenderTreeNode(rowData, parentData, level) : ''} ${wrap}
      </div>`;
    }
    return wrap;
  };
  /**Tree 列表的时候启用，缓存节点渲染层次 */
  private cacheParentMap: WeakMap<any, any>;
  /**Tree 列表的时候启用，缓存节点渲染层次 */
  private cacheLevelMap: WeakMap<any, number>;
  @watchProps(['dataSource', 'treeConfig'])
  watchDataSourceChange() {
    if (this.treeConfig && this.dataSource) {
      this.treeConfig = { ...this.treeConfig, ...defaultTreeConfig };
      this.cacheParentMap = new WeakMap();
      this.cacheLevelMap = new WeakMap();
      let allTreeNode: unknown[] = [];
      for (let rowData of this.dataSource) {
        iteratorNodeData(rowData as TreeNodeData, (node: TreeNodeData, parentNode: TreeNodeData) => {
          if (typeof node.close == 'undefined') {
            node.close = true; //默认全部关闭
          }
          allTreeNode.push(node);
          this.cacheParentMap.set(node, parentNode);
          let level = 0;
          if (parentNode) {
            level = (this.cacheLevelMap.has(parentNode) ? (this.cacheLevelMap.get(parentNode) as number) : 0) + 1;
          }
          this.cacheLevelMap.set(node, level);
        });
      }
      this.innerDataSource = allTreeNode;
    } else {
      this.innerDataSource = this.dataSource;
    }
  }

  /**
   * table  heading
   */
  @query('thead[part=thead-hidden', true)
  thead: HTMLTableSectionElement;

  @query('div[part=base]', true)
  baseDiv: HTMLDivElement;
  /** scroll DIV */
  @query('div[part=scroll-div]', true)
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
        // const tablecurrentWidth = parseInt(getCssValue(this.table, 'width'));
        // this.tableHeadDiv.style.width = Math.min(this.scrollDiv.clientWidth, this.table.offsetWidth) + 'px';
        // //注意此处必须是 scroll_div.clientWidth，tableWidth 最小值！
        // const thArray = this.thead.querySelectorAll('td,th');
        // const thFixedArray = this.theadFixed.querySelectorAll('td,th');
        // for (let i = 0, j = thArray.length; i < j; i++) {
        //   const d = thArray[i] as HTMLTableHeaderCellElement;
        //   const width = getCssValue(d, 'width');
        //   (thFixedArray[i] as HTMLTableHeaderCellElement).style.width = width;
        //   (thFixedArray[i] as HTMLTableHeaderCellElement).style.minWidth = width;
        //   (thFixedArray[i] as HTMLTableHeaderCellElement).style.maxWidth = width;
        // }
        // this.tableHeadDiv.style.height = this.fixedTable.offsetHeight + 'px';
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
    });
    dragOnHandler(this.baseDiv, 'thead th div.th-resize-helper', (changePos, event) => {
      let div = (event as any).delegateTarget as HTMLElement;
      let th = div.closest('th') as HTMLElement;
      let column = (th as any).column as SlColumn;
      let width = parseInt(getCssValue(th, 'width'));
      let tableWidth = parseInt(getCssValue(this.table, 'width'), 10);
      let oldWidth = width;
      width += changePos.x;
      if (column.maxWidth) {
        let maxWidth = parseInt(column.maxWidth, 10);
        if (width > maxWidth) {
          width = maxWidth;
        }
      }
      if (column.minWidth) {
        let minWidth = parseInt(column.minWidth, 10);
        if (width < minWidth) {
          width = minWidth;
        }
      }
      this.table.style.width = tableWidth + (width - oldWidth) + 'px';
      column.width = width + 'px';
      emit(this, 'sl-table-column-resize', {
        detail: {
          column: column,
          change: width - oldWidth
        }
      });
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeResult?.dispose();
  }
  private _renderNoDataTemplate() {
    if (this.innerDataSource && this.innerDataSource.length == 0) {
      return html`<slot @slotchange=${this.columnChangeHanlder} name="no-data">${getResouceValue('noData')}</slot>`;
    }
    return ``;
  }
  /** 设置表格 列固定，例如：fixedColumns="2",则为前两列固定，"2,2" 则为前两列，后两列固定，"0,2" 则为最后两列固定 */
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
  private handerScroll(_event: Event) {
    let div = this.scrollDiv;
    emit(this, 'sl-table-scroll', {
      detail: {
        div: div
      }
    });
  }
  @query('#styleID', true)
  private fixedStyleElement: HTMLStyleElement;
  render() {
    return html` <style id="styleID"></style>
      <div class="sl-table-base" part="base" size=${this.size}>
        <div
          class="sl-table-base-scroll-div"
          style=${this.tableHeight
            ? `height:calc( ${isNaN(Number(this.tableHeight)) ? this.tableHeight : this.tableHeight + 'px'} )`
            : ''}
          @scroll=${this.handerScroll}
          part="scroll-div"
          ?hover-able=${this.hoverAble}
          ?stripe=${this.stripe}
          ?border=${this.border}
        >
          <!--渲染table 区 -->
          <table part="table" id="tableID">
            <thead part="thead-hidden">
              ${this._renderTheadRows(false)}
            </thead>
            <tbody>
              ${this._renderDataSourceRows()}
            </tbody>
          </table>
          ${this._renderNoDataTemplate()}
        </div>
        <slot @slotchange=${this.columnChangeHanlder}></slot>
      </div>`;
  }
  /**渲染表头行 theader tr th */
  private _renderTheadRows(fixed: boolean) {
    const table = this;
    const trTemplates = (rowColumn: SlColumn[]) => {
      return html`<tr .columns=${rowColumn}>
        ${rowColumn.map(col => SlColumn.renderThColTemplate(col, fixed, table))}
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

  private getAllChildrenSize(rowData: TreeNodeData) {
    let size = 0;
    iteratorNodeData(rowData, (_node, _parent) => {
      size++;
    });
    return size - 1;
  }
  private _renderDataSourceRows() {
    const table = this;
    const rowList = [];
    const dataSource = this.innerDataSource;
    const cellTdArray = this.tdRenderColumns;
    if (dataSource) {
      for (let index = 0, j = dataSource.length; index < j; index++) {
        //行循环
        let rowData = dataSource[index] as TreeNodeData;
        const rowHtml = [];
        for (let x = 0, y = cellTdArray.length; x < y; x++) {
          //TD循环
          let col = cellTdArray[x];
          let tdResult = SlColumn.renderTdCellTemplate(col, rowData, index, table);
          if (tdResult != nothing && tdResult != null && tdResult != undefined) {
            rowHtml.push(tdResult);
          }
        }
        if (rowHtml.length > 0) {
          let trStyle = this.customRenderRowStyle ? this.customRenderRowStyle(rowData, index) : {};
          let trClassInfo = this.customRenderRowClassMap ? this.customRenderRowClassMap(rowData, index) : null;
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
            html`<tr .data=${rowData} style=${styleMap(trStyle)} class=${classMap(trClassObject)}>
              ${rowHtml}
            </tr>`
          );
        }
        if (table.treeConfig && rowData.close) {
          index += this.getAllChildrenSize(rowData);
        }
      }
    }
    return rowList;
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
    if (this.hasUpdated && this.isColumnHanlderFlag) {
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
