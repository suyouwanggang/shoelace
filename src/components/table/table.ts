import { html, LitElement, nothing, PropertyValues } from 'lit';
import { ClassInfo, classMap } from 'lit-html/directives/class-map';
import { StyleInfo, styleMap } from 'lit-html/directives/style-map';
import { customElement, property, query, state } from 'lit/decorators.js';
import { customStyle } from '../../internal/customStyle';
import { emit } from '../../internal/event';
import { watchProps } from '../../internal/watchProps';
import { getCssValue } from '../../utilities/common';
import { dragHandler, dragOnHandler } from '../../utilities/dragHelper';
import { getResouceValue } from '../../utilities/getResouce';
import { addResizeHander, DisposeObject } from '../../utilities/resize.util';
import SlColumn from '../column/column';
import styles from './table.styles';
import caculateColumnData, { RowHeader, SortingEnum } from './tableHelper';
export enum SortTrigger{
  self='self',
  cell='cell'
}
/**
 * 定义表格的排序规则
 */
type SortConfig={
  //触发排序区域
  trigger:SortTrigger
  //轮转顺序
  orders:Array<SortingEnum>
  //是否支持多列排序
  mutil:boolean,
  //当触发区域为cell,是否总是显示排序图标。
  alwaysShowIcon:boolean
};
const defaultSortConfig={
  trigger:SortTrigger.cell,
  //order 轮训值
  orders:[SortingEnum.ASC,SortingEnum.DESC,SortingEnum.NULL],
  mutil:false,
  alwaysShowIcon:true,
};
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency  sl-column
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
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

  /** 表格需要渲染的数据 */
  @property({ type: Array, attribute: false }) dataSource: unknown[];

  @property({ type: Object, attribute: false }) sortConfig: SortConfig={...defaultSortConfig};
  /**表格当前排序值**/
  @property({ type: Object, attribute: false }) sortValue:{
    field:string,
    value:SortingEnum,
  }|Array<{
    field:string,
    value:SortingEnum,
  }>;

  @watchProps(['sortConfig','sortValue'])
  sortConfigChange(){
    this.sortConfig={...defaultSortConfig,...this.sortConfig};
    if(!this.sortConfig.mutil){
      if(Array.isArray(this.sortValue)&&this.sortValue.length>0){
        this.sortValue=this.sortValue[this.sortValue.length-1];
      }
    }else{
      if(!Array.isArray(this.sortValue)&&this.sortValue){
        this.sortValue=[this.sortValue];
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

  @watchProps(['dataSource'])
  watchDataSourceChange() {
    this.innerDataSource = this.dataSource;
  }

  /**
   * table  heading
   */
  @query('thead[part=thead-hidden', true)
  thead: HTMLTableSectionElement;
  /**
   * fixed table's  heading
   */
  @query('thead[part=thead-fixed', true)
  theadFixed: HTMLTableSectionElement;

  @query('div[part=table-header-div]', true)
  private tableHeadDiv: HTMLDivElement;

  /** fixed table */
  @query('table[part=fixed-thead-table]', true)
  fixedTable: HTMLTableElement;
  /** base DIV */
  @query('div[part=base]', true)
  baseDiv: HTMLDivElement;
  /** scroll DIV */
  @query('div[part=scroll-div]', true)
  scrollDiv: HTMLDivElement;

  private handerScroll() {
    const div = this.scrollDiv;
    this.tableHeadDiv.scrollLeft = parseInt(div.scrollLeft.toFixed(0));
  }

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
        //改造，多次请求，值执行一次重新计算
        // const tablecurrentWidth = parseInt(getCssValue(this.table, 'width'));
        this.tableHeadDiv.style.width = Math.min(this.scrollDiv.clientWidth, this.table.offsetWidth) + 'px';
        //注意此处必须是 scroll_div.clientWidth，tableWidth 最小值！
        const thArray = this.thead.querySelectorAll('td,th');
        const thFixedArray = this.theadFixed.querySelectorAll('td,th');
        for (let i = 0, j = thArray.length; i < j; i++) {
          const d = thArray[i] as HTMLTableHeaderCellElement;
          const width = getCssValue(d, 'width');
          (thFixedArray[i] as HTMLTableHeaderCellElement).style.width = width;
          (thFixedArray[i] as HTMLTableHeaderCellElement).style.minWidth = width;
          (thFixedArray[i] as HTMLTableHeaderCellElement).style.maxWidth = width;
        }
        this.tableHeadDiv.style.height = this.fixedTable.offsetHeight + 'px';
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
      this.handerScroll();
      emit(this, 'sl-table-resize');
    });
    dragOnHandler(this.baseDiv,'thead th div.th-resize-helper',(changePos,event)=>{
        let div=(event as any).delegateTarget as HTMLElement;
        let th=div.closest('th') as HTMLElement;
        let column=(th as any).column as SlColumn;
        let width=parseInt(getCssValue(th,'width'));
        let tableWidth= parseInt(getCssValue(this.table,'width'),10);
        let oldWidth=width;
        width+=changePos.x;
        if(column.maxWidth){
          let maxWidth=parseInt(column.maxWidth,10);
          if(width>maxWidth){
            width=maxWidth;
          }
        }
        if(column.minWidth){
          let minWidth=parseInt(column.minWidth,10);
          if(width<minWidth){
            width=minWidth;
          }
        }
        this.table.style.width=tableWidth+(width-oldWidth)+'px';
        column.width=width+'px';
    })
  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeResult?.dispose();
  }
  private _renderNoDataTemplate() {
    if (this.innerDataSource == undefined) {
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
            position:sticky;z-index:1; 
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
      let array = Array.isArray(this.fixedColumns) ? this.fixedColumns : (this.fixedColumns as string).split(',');
      let left = parseInt('' + array[0]);
      let right = array.length > 1 ? parseInt('' + array[1]) : 0;
      let table = this.table;
      let tableRect = table.getBoundingClientRect();
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
    return html` <style id="styleID"></style>
      <div class="sl-table-base" part="base" size=${this.size}>
        <div
          class="sl-table-base-scroll-div"
          style=${this.tableHeight
            ? `height:calc( ${isNaN(Number(this.tableHeight)) ? this.tableHeight : this.tableHeight + 'px'} )`
            : ''}
          @scroll=${this.handerScroll}
          @mousewheel=${this.handerScroll}
          part="scroll-div"
          ?hover-able=${this.hoverAble}
          ?stripe=${this.stripe}
          ?border=${this.border}
        >
          <!--渲染tableHeader 区 -->
          <div part="table-header-div">
            <table part="fixed-thead-table">
              <thead part="thead-fixed">
                ${this._renderTheadRows(true)}
              </thead>
            </table>
          </div>
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

  private _renderDataSourceRows() {
    const table = this;
    const rowList = [];
    const dataSource = this.innerDataSource;
    const cellTdArray = this.tdRenderColumns;
    if (dataSource) {
      for (let index = 0, j = dataSource.length; index < j; index++) {
        //行循环
        let rowData = dataSource[index];
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
  /** 如果column 发生了变化，需要重新计算 表头布局 */
  public columnChangeHanlder() {
    if (this.hasUpdated) {
      const { rows, tdRenderColumnData } = caculateColumnData(this.canShowColumns);
      this.theadRows = rows;
      this.tdRenderColumns = tdRenderColumnData;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-table': SlTable;
  }
}
