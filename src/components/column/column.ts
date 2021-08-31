import { html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { customElement, property } from 'lit/decorators.js';
import { renderSortHeaderTemplate, sortRenderHanlder } from '../table/sort';
import SlTable, { SortTrigger } from '../table/table';
import { getColumnCacheData, getFieldValue, isNumberWidth, TdAgile } from '../table/tableHelper';
let columnUniqueID = 0;
/**
 * @since 2.0
 * @status experimental
 * @description:用于定义sl-table 的表头和列，没有实际的渲染
 *
 */
@customElement('sl-column')
export default class SlColumn extends LitElement {
  /*
   * 渲染表头 TH
   * @param column 表头定义
   * @param fixed  是否固定
   * @param table  表格对象
   * @returns
   */
  public static renderThColTemplate = (column: SlColumn, fixed: boolean = false, table: SlTable) => {
    let styleObject: any = {};
    const cacheData = getColumnCacheData(column);
    if (!fixed && cacheData.colspan == 1) {
      if (column.minWidth) {
        const isNumber = isNumberWidth(column.minWidth);
        styleObject['min-width'] = column.minWidth + (isNumber ? 'px' : '');
        if (!column.width) {
          styleObject['width'] = column.minWidth + (isNumber ? 'px' : '');
        }
      }
      if (column.width) {
        const isNumber = isNumberWidth(column.width);
        styleObject['width'] = column.width + (isNumber ? 'px' : '');
        if (!column.minWidth) {
          styleObject['min-width'] = styleObject['width'];
        }
      }
      if (column.maxWidth) {
        const isNumber = isNumberWidth(column.maxWidth);
        styleObject['max-width'] = column.maxWidth + (isNumber ? 'px' : '');
      }
    }
    const styleInfo = table.customRenderCellHeadStyle ? table.customRenderCellHeadStyle(column) : null;
    if (styleInfo) {
      if (typeof styleInfo == 'object') {
        styleObject = { ...styleObject, styleInfo };
      }
    }
    let classInfo = table.customRenderCellHeadClassMap ? table.customRenderCellHeadClassMap(column) : null;
    let classObj: any = {};
    if (classInfo != null) {
      if (Array.isArray(classInfo)) {
        classInfo.forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
      } else if (typeof classInfo == 'string') {
        classInfo.split(' ').forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
      } else {
        classObj = { ...classInfo };
      }
    }
    if (table.sortConfig && table.sortConfig.trigger == SortTrigger.cell && column.sortAble) {
      classObj['cursor'] = true;
    }
    const trigger = table.sortConfig.trigger;
    const handerSort = (_event: Event) => {
      if (trigger == SortTrigger.self) {
        sortRenderHanlder(column, table);
      }
    };
    const handerTHSort = (_event: Event) => {
      if (trigger == SortTrigger.cell) {
        sortRenderHanlder(column, table);
      }
    };
    return html`<th
      uniqueID=${column.uniqueID}
      .column=${column}
      .vAlign=${column.colvAlign}
      .align=${column.colAlign}
      @click=${handerTHSort}
      class=${classMap(classObj)}
      style=${styleMap(styleObject)}
      colIndex=${(cacheData.colIndex as number) + ''}
      .rowSpan=${cacheData.rowspan as number}
      .colSpan=${cacheData.colspan as number}
    >
      <div class="thWrap">
        ${column.renderCol
          ? html`<span class="column-title ${column.sortAble ? 'sort-able' : ''}">${column.renderCol(column)}</span>`
          : html`<span class="column-title ${column.sortAble ? 'sort-able' : ''}">${column.label}</span>`}
        ${renderSortHeaderTemplate(table, column, handerSort)}
        ${column.resizeAble ? html`<div part="resize-hanler" class="th-resize-helper"></div>` : ''}
      </div>
    </th>`;
  };

  private static _renderCellData(rowData: any, rowDataIndex: number, col: SlColumn) {
    let colResult: any;
    if (col.renderCell) {
      return col.renderCell(col, rowData, rowDataIndex);
    } else {
      let fieldValue = getFieldValue(rowData, col.field);
      colResult = html`<div class="tdWrap">${fieldValue}</div>`;
    }
    return colResult;
  }

  /*
   * 渲染 tbody Td Template
   * @param column  列定义
   * @param rowData 行所对应数据源
   * @param rowDataIndex  行index,从0 开始
   * @param table  表格对象
   */
  public static renderTdCellTemplate = (column: SlColumn, rowData: any, rowDataIndex: number, table: SlTable) => {
    const colData = getColumnCacheData(column);
    let tdResult = SlColumn._renderCellData(rowData, rowDataIndex, column);
    if (tdResult == undefined || tdResult == nothing || tdResult.rowspan == 0 || tdResult.colspan == 0) {
      return nothing; //标识此td 不进行渲染
    } else {
      const styleInfo = table.customRenderCellStyle ? table.customRenderCellStyle(column, rowData, rowDataIndex) : {};
      let classInfo = table.customRenderCellClassMap
        ? table.customRenderCellClassMap(column, rowData, rowDataIndex)
        : null;
      let classObj: any = {};
      if (classInfo != null) {
        if (Array.isArray(classInfo)) {
          classInfo.forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
        } else if (typeof classInfo == 'string') {
          classInfo.split(' ').forEach(item => (item.trim() != '' ? (classObj[item.trim()] = true) : ''));
        } else {
          classObj = { ...classInfo };
        }
      }
      return html`<td
        colindex=${colData.colIndex + ''}
        uniqueID=${column.uniqueID}
        field=${column.field}
        .column=${column}
        .align=${column.align}
        .vAlign=${column.vAlign}
        style=${styleMap(styleInfo)}
        class=${classMap(classObj)}
        colspan=${tdResult.colspan ? tdResult.colspan : 1}
        rowspan=${tdResult.rowspan ? tdResult.rowspan : 1}
      >
        ${tdResult.template ? html`${tdResult.template}` : html`${tdResult}`}
      </td>`;
    }
  };
  /**表头自定义渲染(this:SlColumn,table:SlTable):TemplateResult<1>*/
  @property({ attribute: false, type: Object }) renderCol: (column: SlColumn) => TemplateResult<1>;

  /**对应TD渲染 ,接收表格rowData,index来渲染 此对应的TD*/
  @property({ attribute: false, type: Object }) renderCell: (
    column: SlColumn,
    rowData: any,
    index: number
  ) => TemplateResult<1> | { template: TemplateResult<1>; colspan: number; rowspan: number };

  /**是否隐藏此列 */
  @property({ type: Boolean, reflect: true, attribute: true })
  hidden: boolean;

  /** 列所对应的字段，应该唯一 */
  @property({ type: String, reflect: true, attribute: true })
  field: string;

  /** 列所对应的label，默认th 就是显示此label*/
  @property({ type: String, reflect: true, attribute: true })
  label: string;

  /** 列所对应表头TH 的水平对齐方式*/
  @property({ type: String, reflect: true, attribute: 'col-align' })
  colAlign: TdAgile = 'center';

  /** 列所对应表头TH 的垂直对齐方式*/
  @property({ type: String, reflect: true, attribute: 'col-valign' })
  colvAlign: 'top' | 'middle' | 'bottom' = 'middle';

  /** 列所对应的TD 的水平对齐方式*/
  @property({ type: String, reflect: true, attribute: 'align' })
  align: TdAgile = 'left';

  /** 列所对应的TD 的垂直对齐方式*/
  @property({ type: String, reflect: true, attribute: 'valign' })
  vAlign: 'top' | 'middle' | 'bottom' = 'middle';

  // /** 排序，是升序，还是降序*/
  // @property({ type: String, reflect: true, attribute: true })
  // sort: SortingEnum; //升序，降序

  /** 列是否支持排序 */
  @property({ type: Boolean, reflect: true, attribute: 'sort-able' })
  sortAble: boolean;

  /** 是否支持拖动列的宽度 */
  @property({ type: Boolean, reflect: true, attribute: 'resize-able' })
  resizeAble: boolean;

  /**列宽 */
  @property({ type: String, reflect: true, attribute: 'width' })
  width: string;

  /**最小列宽 */
  @property({ type: String, reflect: true, attribute: 'min-width' })
  minWidth: string;

  /**最大列宽 */
  @property({ type: String, reflect: true, attribute: 'max-width' })
  maxWidth: string;

  /**初始化自动生成唯一ID */
  @property({ type: String, reflect: true, attribute: 'uniqueID' })
  uniqueID: string = 'unique_' + columnUniqueID++;

  // /**是否允许拖动列位置 */
  // @property({ type: String, reflect: true, attribute: 'can-drag' })
  // canDrag: string;

  // /**是否允许拖动到此列 */
  // @property({ type: String, reflect: true, attribute: 'drag-accept' })
  // dragAccept: string;

  /**顺序:越小越靠前 */
  @property({ type: Number, reflect: true, attribute: 'order' })
  order = 0;

  /**列的类型 */
  type: 'index' | 'checkbox' | 'radio';

  /**
   *  所有hidden!=false直接子column,并且按照order排序了
   */
  get childCanShowColumn(): SlColumn[] {
    let children = Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn && item.hidden != true;
    }) as SlColumn[];
    return children.sort((item1, item2) => item1.order - item2.order);
  }
  /**
   * 所有直接子column
   */
  get childAllColumn() {
    return Array.from(this.children).filter((item: Element) => {
      return item instanceof SlColumn;
    }) as SlColumn[];
  }
  get table(): SlTable {
    return this.closest('sl-table') as SlTable;
  }

  updated(map: PropertyValues) {
    super.updated(map);
    this.table?.columnChangeHanlder();
  }
  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-column': SlColumn;
  }
}
