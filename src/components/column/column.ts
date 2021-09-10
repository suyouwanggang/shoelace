import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import SlTable from '../table/table';
import { CellContext, CellHeadContext } from '../table/tableConfig';
let columnUniqueID = 0;
/**
 * @since 2.0
 * @status experimental
 * @description:用于定义sl-table 的表头和列，没有实际的渲染
 *
 */
@customElement('sl-column')
export default class SlColumn extends LitElement {
  /**表头自定义渲染(this:SlColumn,table:SlTable):TemplateResult<1>*/
  @property({ attribute: false, type: Object }) renderCol: (context:CellHeadContext) => TemplateResult<1>;

  /**对应TD渲染 ,接收表格column:lie, rowData:行数据,rowDataIndex,columnIndex:列顺序 此对应的TD*/
  @property({ attribute: false, type: Object }) renderCell: (context:CellContext)=> TemplateResult<1> | { template: TemplateResult<1>; colspan?: number; rowspan?: number;editor:TemplateResult<1> };
 

  /**是否隐藏此列 */
  @property({ type: Boolean, reflect: true, attribute: true })
  hidden: boolean = false;

  /** 列所对应的字段，应该唯一 */
  @property({ type: String, reflect: true, attribute: true })
  field: string;

  /** 列所对应的label，默认th 就是显示此label*/
  @property({ type: String, reflect: true, attribute: true })
  label: string;

  /** 列所对应表头TH 的水平对齐方式*/
  @property({ type: String, reflect: true, attribute: 'col-align' })
  colAlign: 'left' | 'center' | 'right' = 'center';

  /** 列所对应表头TH 的垂直对齐方式*/
  @property({ type: String, reflect: true, attribute: 'col-valign' })
  colvAlign: 'top' | 'middle' | 'bottom' = 'middle';

  /** 列所对应的TD 的水平对齐方式*/
  @property({ type: String, reflect: true, attribute: 'align' })
  align: 'left' | 'center' | 'right' = 'left';

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
