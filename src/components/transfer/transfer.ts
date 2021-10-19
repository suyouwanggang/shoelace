import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';
import resourceLocal from '../../internal/resourceLocal';
import { watch } from '../../internal/watch';
import '../scroll/scroll';
import '../checkbox/checkbox';
import SlCheckbox from '../checkbox/checkbox';
import styles from './transfer.styles';
import { live } from 'lit/directives/live.js';
type TransferItem = {
  id: string | number /**主键 */;
  name: string /**名称 */;
  [key: string]: unknown /**其他自定义的选项 */;
};

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-checkbox,sl-button
 *
 * @event sl-filter-change - Emitted as filter value change.
 * @event {{sourceSelectedKeys:string[]|number,targetSelectedKeys:string[]|number}} sl-select-change - 当选中项发生变化的时候触发.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */

@resourceLocal()
@customElement('sl-transfer')
export default class SlTransfer extends LitElement {
  static styles = styles;

  /** 所有选择的数据 */
  @property({ attribute: false, reflect: false }) dataSource: TransferItem[];

  /**数据项自定渲染 */
  @property({ attribute: false, reflect: false }) renderItem: (item: TransferItem) => TemplateResult<1>;

  /**右侧初始化已经选中的主键列表 */
  @property({ attribute: false, reflect: false }) targetKeys: Array<string | number>;

  /** 操作过程左侧当前选中的数据项ID */
  @state() sourceTempSelectedKeys: Array<string | number> = [];

  /** 操作过程中右侧侧当前选中的数据项ID */
  @state() targetTempSelectedKeys: Array<string | number> = [];

  /** 右侧选中的数据项ID */
  @state() targetSelectedKeys: Array<string | number> = [];

  /**列表容器 样式 */
  @property({ type: Object }) listStyle: StyleInfo;

  private cacheDataSource = new Map<string | number, TransferItem>();
  @watch('dataSource')
  watchDataSourceChanged() {
    this.cacheDataSource.clear;
    for (let item of this.dataSource) {
      this.cacheDataSource.set(item.id, item);
    }
  }
  /**获取右侧 列表 */
  public get targetDataList() {
    const result: TransferItem[] = [];
    for (let key of this.targetSelectedKeys) {
      const item = this.cacheDataSource.get(key);
      if (item != null) {
        result.push(item);
      }
    }
    return result;
  }
  public get sourceDataList() {
    const result: TransferItem[] = [];
    if (this.dataSource) {
      for (let item of this.dataSource) {
        const key = item.id;
        if (this.targetSelectedKeys && this.targetSelectedKeys.includes(key)) {
          continue;
        }
        result.push(item);
      }
    }

    return result;
  }
  /** 是否支持过滤 */
  @property({ type: Boolean, attribute: 'enable-filter' }) enablefilter: boolean;

  /** 自定义过滤渲染内容： 函数接收 direction:'source'|'target' 返回渲染内容 */
  @property({ attribute: false, reflect: false, type: Object }) filterTemplate: (direction: 'source' | 'target') => TemplateResult<1>;

  /** 自定义Title 渲染： 如果是数组，则为左右Title ,如果是函数， 则接收'source'|'target' 返回渲染内容 */
  @property({ attribute: false, reflect: false }) titleTemplate: string[] | ((direct: 'source' | 'target') => TemplateResult<1>);

  /** 是否显示全选按钮*/
  @property({ type: Boolean }) showSelectAll: boolean = true;

  /**Item 显示为Table ,绑定的Table */
  @property({ type: String, attribute: false, reflect: false }) table: string;

  /**数据过滤函数,接收 三个参数：item:数据项，value：过滤值,direction:left,right  */
  @property({ attribute: false, reflect: false }) filterMethod: (item: TransferItem, value: string) => boolean;

  /**选中项发生改变时的回调函数  */
  @property({ attribute: false, reflect: false }) onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => boolean;

  private renderFilter(direction: 'source' | 'target') {
    return this.filterTemplate ? this.filterTemplate(direction) : html`<sl-input></sl-input>`;
  }
  private processSelectItem(event: Event, item: TransferItem, direction: 'source' | 'target') {
    const li = event.currentTarget as HTMLElement;
    const el = li.querySelector('sl-checkbox') as SlCheckbox;
    el.click();
    requestAnimationFrame(() => {
      const array = direction == 'source' ? this.sourceTempSelectedKeys : this.targetTempSelectedKeys;
      if (el.checked) {
        let index = array.indexOf(item.id);
        if (index < 0) {
          array.push(item.id);
        }
      } else {
        let index = array.indexOf(item.id);
        if (index >= 0) {
          array.splice(index, 1);
        }
      }
    })

  }
  protected renderContent(direction: 'source' | 'target') {
    const items = direction == 'source' ? this.sourceDataList : this.targetDataList;
    const result = items.map(item => {
      return html`<li class="render-item" part="render-item"  @click=${(event: Event) => this.processSelectItem(event, item, direction)}>
        <sl-checkbox .checked=${live(direction == 'source' ? this.sourceTempSelectedKeys && this.sourceTempSelectedKeys.includes(item.id) : this.targetTempSelectedKeys && this.targetTempSelectedKeys.includes(item.id))}   >
        </sl-checkbox>
        <span class="render-item-label"> ${this.renderItem ? this.renderItem(item) : item.name} </span>
      </li>`;
    });
    return result;
  }
  render() {
    return html`<div part='base'>
      <div part='base-source' style=${styleMap(this.listStyle ? this.listStyle : {})}>
        <div part='base-source-header'></div>
        <div part='base-source-body'>
          ${this.enablefilter ? html`<div>${this.renderFilter('source')}</div>` : nothing}
          <sl-scroll part='base-source-body-content'>${this.renderContent('source')}</sl-scroll>
        </div>
      </div>
      <div part='base-operation'></div>
      <div part='base-target' style=${styleMap(this.listStyle ? this.listStyle : {})} >
        <div part='base-target-header'></div>
        <div part='base-target-body'>
            ${this.enablefilter ? html`<div>${this.renderFilter('target')}</div>` : nothing}
            <sl-scroll part='base-target-body-content'>${this.renderContent('target')}</sl-scroll>
        </div>
        </div>
      </div>
  </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-transfer': SlTransfer;
  }
}
