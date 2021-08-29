import { html, LitElement, nothing, PropertyValues } from 'lit';
import { styleMap } from 'lit-html/directives/style-map';
import { customElement, property, query, state } from 'lit/decorators.js';
import { emit } from '../../internal/event';
import { getCssValue } from '../../utilities/common';
import { addResizeHander } from '../../utilities/resize.util';
import SlColumn from '../column/column';
import styles from './table.styles';
import caculateColumnData, {
  clearColumnCacheData,
  getColumnCacheData,
  getFieldValue,
  isNumberWidth,
  RowHeader
} from './tableHelper';
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
@customElement('sl-table')
export default class SlTable extends LitElement {
  static styles = styles;

  /** td size*/
  @property({ type: String, attribute: false }) size: 'small' | 'larger' | 'default' = 'default';

  /** table 是否显示border */
  @property({ type: Boolean, attribute: true }) border: boolean = false;

  /** table 是否支持鼠标活动行变色 */
  @property({ type: Boolean, attribute: false }) hoverAble: boolean = true;

  /** table 支持斑马线 */
  @property({ type: Boolean, attribute: false }) stripe: boolean = false;

  /** 表格需要渲染的数据 */
  @property({ type: Array, attribute: false }) dataSource: unknown[];

  /**  table 容器高度，支持类似 css calc "100% - 40px" 或者“ 100vh - 30px ” */
  @property({ type: String })
  tableHeight: string; //支持css calc ( 支持的内容 )

  @query('#tableID', true)
  table: HTMLTableElement;

  /**
   * table  heading
   */
  @query('thead[part=thead-hidden', true)
  thead: HTMLTableSectionElement;
  /**
   * fixed  heading
   */
  @query('thead[part=thead-fixed', true)
  theadFixed: HTMLTableSectionElement;

  @query('div[part=table-header-div]', true)
  private table_head_div: HTMLDivElement;

  @query('table[part=fixed-thead-table]', true)
  fixedHeaderTable: HTMLTableElement;
  /** base DIV */
  @query('div[part=base]', true)
  base_div: HTMLDivElement;
  /** scroll DIV */
  @query('div[part=scroll-div]', true)
  scroll_div: HTMLDivElement;

  private handerScroll() {
    const div = this.scroll_div;
    this.table_head_div.scrollLeft = parseInt(div.scrollLeft.toFixed(0));
  }

  updated(map: PropertyValues) {
    super.updated(map);
    this.asynTableHeaderWidth();
  }
  asynTableHeaderWidth() {
    const tablecurrentWidth = parseInt(getCssValue(this.table, 'width'));
    this.table_head_div.style.width = Math.min(this.scroll_div.clientWidth, tablecurrentWidth) + 'px';
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
    this.table_head_div.style.height = parseInt(getCssValue(this.thead, 'height')) + 'px';
  }
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    this.columnChangeHanlder();
    addResizeHander([this, this.table], () => {
      this.asynTableHeaderWidth();
      this.handerScroll();
      emit(this, 'resize');
    });
  }
  render() {
    return html`<div class="sl-table-base" part="base" size=${this.size}>
      <div
        class="sl-table-base-scroll-div"
        style=${this.tableHeight ? `height:calc( ${this.tableHeight} )` : ''}
        @scroll=${this.handerScroll}
        @mousewheel=${this.handerScroll}
        part="scroll-div"
        ?hover-able=${this.hoverAble}
        ?stripe=${this.stripe}
        ?border=${this.border}
      >
        <!--渲染table 区 -->
        <table part="table" id="tableID">
          <thead part="thead-hidden">
            ${this.renderTheadRows(false)}
          </thead>
          <tbody>
            ${this.renderDataSourceRows()}
          </tbody>
        </table>
        <!--渲染tableHeader 区 -->
        <div part="table-header-div">
          <table part="fixed-thead-table">
            <thead part="thead-fixed">
              ${this.renderTheadRows(true)}
            </thead>
          </table>
        </div>
      </div>
      <slot @slotchange=${this.columnChangeHanlder}></slot>
    </div>`;
  }
  /**渲染表头行 theader tr th */
  private renderTheadRows(fixed: boolean) {
    const table = this;
    const renderTH = (colData: SlColumn) => {
      let styleObject: any = {};
      const cacheData = getColumnCacheData(colData);
      if (!fixed && cacheData.colspan == 1) {
        if (colData.minWidth) {
          const isNumber = isNumberWidth(colData.minWidth);
          styleObject['min-width'] = colData.minWidth + (isNumber ? 'px' : '');
          if (!colData.width) {
            styleObject['width'] = colData.minWidth + (isNumber ? 'px' : '');
          }
        }
        if (colData.width) {
          const isNumber = isNumberWidth(colData.width);
          styleObject['width'] = colData.width + (isNumber ? 'px' : '');
          if (!colData.minWidth) {
            styleObject['min-width'] = styleObject['width'];
          }
        }

        if (colData.maxWidth) {
          const isNumber = isNumberWidth(colData.maxWidth);
          styleObject['max-width'] = colData.maxWidth + (isNumber ? 'px' : '');
        }
      }

      return html`<th
        style=${styleMap(styleObject)}
        .column=${colData}
        .cacheData=${cacheData}
        .rowSpan=${cacheData.rowspan as number}
        .colSpan=${cacheData.colspan as number}
        draggable=${colData.canDrag ? 'true' : 'false'}
      >
        <div class="thWrap">
          ${colData.renderCol ? colData.renderCol.call(colData, table) : html`<span>${colData.label}</span>`}
        </div>
      </th>`;
    };
    const renderTHeaderRow = (rowColumn: SlColumn[]) => {
      return html`<tr .rowData=${rowColumn}>
        ${rowColumn.map(col => renderTH(col))}
      </tr>`;
    };
    return this.theadRows.map(items => renderTHeaderRow(items));
  }

  private renderCellData(rowData: any, rowDataIndex: number, col: SlColumn) {
    let colResult: any;
    if (col.renderCell) {
      return col.renderCell.call(col, rowData, rowDataIndex);
    } else {
      let fieldValue = getFieldValue(rowData, col.field);
      colResult = html`<div class="tdWrap">${fieldValue}</div>`;
    }
    return colResult;
  }
  private renderDataSourceRows() {
    const rowList = [];
    const dataSource = this.dataSource;
    const cellTdArray = this.cellTdArray;
    if (dataSource) {
      for (let index = 0, j = dataSource.length; index < j; index++) {
        //行循环
        let rowData = dataSource[index];
        const rowHtml = [];
        for (let x = 0, y = cellTdArray.length; x < y; x++) {
          //TD循环
          let col = cellTdArray[x];
          const colData = getColumnCacheData(col);
          let tdResult = this.renderCellData(rowData, index, col);
          if (tdResult == nothing || tdResult.rowspan == 0 || tdResult.colspan == 0) {
            continue;
          } else {
            rowHtml.push(html`<td
              colindex=${colData.colIndex + ''}
              field=${col.field}
              .column=${col}
              .align=${col.agileCell}
              .vAlign=${col.vAigleCell}
              colspan=${tdResult.colspan ? tdResult.colspan : 1}
              rowspan=${tdResult.rowsapn ? tdResult.rowspan : 1}
            >
              ${tdResult.template ? tdResult.template : tdResult}
            </td> `);
          }
        }
        rowList.push(
          html`<tr .data=${rowData}>
            ${rowHtml}
          </tr>`
        );
      }
    }
    return rowList;
  }
  get childAllColumn(): SlColumn[] {
    return Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn;
    }) as SlColumn[];
  }

  get childCanShowColumn(): SlColumn[] {
    return Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn && !item.hidden;
    }) as SlColumn[];
  }

  /**表头真实数据，有多少行，每个th 有rowspan ,colspan*/
  @state()
  private theadRows: RowHeader = [];
  /**循环数据，输出tbody 的表头定义数组*/
  @state()
  private cellTdArray: SlColumn[] = [];
  /** 如果column 发生了变化，需要重新计算 表头布局 */
  public columnChangeHanlder() {
    if (this.hasUpdated) {
      clearColumnCacheData(this.childAllColumn);
      const { rows, tdRenderColumnData } = caculateColumnData(this.childCanShowColumn);
      this.theadRows = rows;
      this.cellTdArray = tdRenderColumnData;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-table': SlTable;
  }
}
