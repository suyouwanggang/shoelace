import { html, LitElement, nothing, render, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { emit } from '../../internal/event';
import resourceLocal from '../../internal/resourceLocal';
import { watch } from '../../internal/watch';
import { watchProps } from '../../internal/watchProps';
import { isArray } from '../../utilities/common';
import { getResouceValue } from '../../utilities/getResouce';
import '../checkbox/checkbox';
import SlCheckbox from '../checkbox/checkbox';
import SlInput from '../input/input';
import '../scroll/scroll';
import SlScroll from '../scroll/scroll';
import SlTable from '../table/table';
import styles from './transfer.styles';
type TransferItem = {
  id: string | number /**主键，在一个容器内唯一 */;
  name: string /**名称 */;
  [key: string]: unknown /**其他自定义的选项 */;
};

const defaultTransfilter = (item: TransferItem, value: string) => {
  if (value == null || value == '' || value.trim() == '' || typeof item.name == 'undefined') {
    return true;
  }
  return item.name.includes(value);
};
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-checkbox,sl-button
 *
 * @event {{sourceSearchValue:string[],targetSearchValue:string[]}} sl-filter-change - Emitted as filter value change.
 * @event {{sourceSelectedKeys:string[]|number,targetSelectedKeys:string[]|number}} sl-transfer-change - 当选中项发生变化的时候触发.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 * @csspart container - The component's source,target wrapper.
 * @csspart search - The component's source,target search wraper.
 * @csspart slInput - The component's filter slInput.
 * @csspart input - The component's filter slInput's input.
 * @csspart header - The component's source,target header wraper.
 *
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
  @property({ attribute: false, reflect: false }) renderItem: (item: TransferItem, direction: 'source' | 'target') => TemplateResult<1>;

  /** 操作过程左侧当前选中的数据项ID */
  @state() private sourceTempSelectedKeys: Array<string | number> = [];

  /** 操作过程中右侧当前选中的数据项ID */
  @state() private targetTempSelectedKeys: Array<string | number> = [];

  /** 右侧选中的数据项ID */
  @state() targetSelectedKeys: Array<string | number> = [];

  /** 是否禁用选择 */
  @property({ type: Boolean }) disabled: boolean = false;

  private cacheDataSource = new Map<string | number, TransferItem>();

  /**根据Id 获取选项对应的数据项 */
  public getItemById(id: string | number) {
    return this.cacheDataSource.get(id);
  }
  /**获取右侧 列表 */
  get targetDataList() {
    const result: TransferItem[] = [];
    for (let key of this.targetSelectedKeys) {
      const item = this.cacheDataSource.get(key);
      if (item != null) {
        result.push(item);
      } else {
        console.warn(`key=${key} is not found in dataSouce by id `);
      }
    }
    return result;
  }

  get sourceDataList() {
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

  @state() protected filterTargetDataList: Array<TransferItem> = [];
  @state() protected filterSourceDataList: Array<TransferItem> = [];

  @watchProps(['dataSource', 'filterMethod', 'disableFilter', 'targetSearchValue', 'sourceSearchValue'])
  watchDataSourceChanged() {
    this.cacheDataSource.clear();
    if (this.dataSource) {
      for (let item of this.dataSource) {
        this.cacheDataSource.set(item.id, item);
      }
      this.runFilterMethod();
    }
  }
  protected runFilterMethod() {
    let list = this.targetDataList;
    if (!this.disableFilter && this.targetSearchValue && this.filterMethod) {
      list = list.filter(item => this.filterMethod(item, ...this.targetSearchValue));
    }
    this.filterTargetDataList = list;
    list = this.sourceDataList;
    if (!this.disableFilter && this.sourceSearchValue && this.filterMethod) {
      list = list.filter(item => this.filterMethod(item, ...this.sourceSearchValue));
    }
    this.filterSourceDataList = list;
  }
  /** 是否关闭过滤 */
  @property({ type: Boolean, attribute: 'disable-filter' }) disableFilter: boolean;
  /** 过滤Input 的placeholder，如果是字符串，则作用于source,target,如果是数组，则第一个作用左边，第二个作用于右边  */
  @property() filterPlaceholder: string | string[];

  /** 自定义Title 渲染： 如果是数组，则为左右Title ,如果是函数， 则接收'source'|'target' 返回渲染内容 */
  @property({ attribute: false, reflect: false }) titleTemplate: string[] | ((direct: 'source' | 'target') => TemplateResult<1>);

  /** 是否显示全选按钮*/
  @property({ type: Boolean }) showSelectAll: boolean = true;

  /**Item 显示为Table ,绑定的Table Template，函数，接收'source|target'返回table 组件*/
  @property({ type: Object, attribute: false }) tableTemplate: (direction: 'source' | 'target') => TemplateResult<1>;

  /**数据过滤函数,接收 两个参数：item:数据项，其他为组件绑定的 value：过滤值 ,如果用户自定义了，可以支持多个过滤条件 */
  @property({ attribute: false, reflect: false }) filterMethod: (item: TransferItem, ...value: unknown[]) => boolean = defaultTransfilter;

  /**选中项发生改变时的回调函数  */
  @property({ attribute: false, reflect: false }) onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => boolean;

  private renderFilter(_direction: 'source' | 'target') {
    const placeholder =
      typeof this.filterPlaceholder != 'undefined' ? (isArray(this.filterPlaceholder) ? this.filterPlaceholder[_direction == 'source' ? 0 : 1] : this.filterPlaceholder) : (getResouceValue('seachTransfer') as string);
    return html`<sl-input direction=${_direction} size="small" @sl-input=${(event: Event) => this.doFilterInputHandler(event, _direction)} placeholder=${placeholder} exportparts="base:slInput,input:input" clearable
      ><sl-icon slot="suffix" name="search"></sl-icon
    ></sl-input>`;
  }
  @state() protected sourceSearchValue: unknown[] = [];
  @state() protected targetSearchValue: unknown[] = [];
  private inputTimeoutID: any;
  private doFilterInputHandler(_event: Event, _direction: 'source' | 'target') {
    const input = _event.target as SlInput;
    this.inputTimeoutID = globalThis.setTimeout(() => {
      globalThis.clearTimeout(this.inputTimeoutID);
      if (_direction == 'source') {
        this.sourceSearchValue[0] = input.value;
      } else {
        this.targetSearchValue[0] = input.value;
      }
      this.sourceSearchValue = [...this.sourceSearchValue];
      this.targetSearchValue = [...this.targetSearchValue];
      this.emitFilterEvent();
    }, 20);
  }
  protected emitFilterEvent() {
    /** 触发过滤事件 */
    emit(this, 'sl-filter-change', {
      detail: {
        source: this.sourceSearchValue[0],
        target: this.targetSearchValue[0],
        sourceSearchValue: this.sourceSearchValue,
        targetSearchValue: this.targetSearchValue
      }
    });
  }
  protected processSelectItem(event: Event, item: TransferItem, direction: 'source' | 'target') {
    const li = event.currentTarget as HTMLElement;
    const el = li.querySelector('sl-checkbox') as SlCheckbox;
    if (event.target != el) {
      el.click();
    }
    requestAnimationFrame(() => {
      const array = direction == 'source' ? this.sourceTempSelectedKeys : this.targetTempSelectedKeys;
      let index = array.indexOf(item.id);
      if (el.checked && index < 0) {
        array.push(item.id);
      } else if (!el.checked && index >= 0) {
        array.splice(index, 1);
      }
      emit(this, 'sl-transfer-change', {
        detail: {
          'sourceSelectedKeys:': this.sourceTempSelectedKeys,
          targetSelectedKeys: this.targetTempSelectedKeys
        }
      });
    });
  }
  private sourceScrollRef = createRef<SlScroll>();
  private targetScrollRef = createRef<SlScroll>();
  public get sourceScroll() {
    return this.sourceScrollRef.value;
  }
  public get targetScroll() {
    return this.targetScrollRef.value;
  }
  private sourceTable: SlTable;
  private targetTable: SlTable;
  @watch('tableTemplate')
  tableTemplateChange() {
    const frag = document.createDocumentFragment();
    render(this.tableTemplate('source'), frag);
    this.sourceTable = frag.firstElementChild as SlTable;
    if (this.sourceTable == null || !(this.sourceTable instanceof SlTable)) {
      throw new Error('tableTemplate should be a function take a parameter string:source|target return Template like html`<sl-table><sl-column></sl-column></sl-table>`');
    }
    this.sourceTable.id = 'sourceTable';
    this.sourceTable.classList.add('table');
    const targetfrag = document.createDocumentFragment();
    render(this.tableTemplate('target'), targetfrag);
    this.targetTable = targetfrag.firstElementChild as SlTable;
    this.targetTable.id = 'targetTable';
    if (this.sourceTable == null || !(this.sourceTable instanceof SlTable)) {
      throw new Error('tableTemplate should be a function take a parameter string:source|target return Template like html`<sl-table><sl-column></sl-column></sl-table>`');
    }
    this.targetTable.classList.add('table');
  }

  protected renderContent(direction: 'source' | 'target') {
    const items = direction == 'source' ? this.filterSourceDataList : this.filterTargetDataList;
    if (this.tableTemplate != undefined) {
      direction == 'source' ? (this.sourceTable.dataSource = items) : (this.targetTable.dataSource = items);
      return html`${direction == 'source' ? this.sourceTable : this.targetTable}`;
    }
    const result = items.map(item => {
      return html`<li class="render-item" part="render-item" @click=${(event: Event) => this.processSelectItem(event, item, direction)}>
        <sl-checkbox
          part="render-checkbox"
          .shape=${'circle'}
          .checked=${live(direction == 'source' ? this.sourceTempSelectedKeys && this.sourceTempSelectedKeys.includes(item.id) : this.targetTempSelectedKeys && this.targetTempSelectedKeys.includes(item.id))}
        >
        </sl-checkbox>
        <div class="render-item-label">${this.renderItem ? this.renderItem(item, direction) : item.name}</div>
      </li>`;
    });
    if (!items || items.length == 0) {
      return html`<div slot=${direction + '-empty'} class="emptyData">${getResouceValue('noData')}</div>`;
    } else {
      return html`<sl-scroll ${ref(direction == 'source' ? this.sourceScrollRef : this.targetScrollRef)}>${result}</sl-scroll>`;
    }
  }
  render() {
    return html`<div part='base'>
      <div part='container' class='source' >
        <div part='header'></div>
        <div part='body'>
          ${!this.disableFilter ? html`<div part="search">${this.renderFilter('source')}</div>` : nothing}
          <div part='body-content'>${this.renderContent('source')}</div>
        </div>
      </div>
      <div part='base-operation'></div>
      <div part='container' class='target'>
        <div part='header'></div>
        <div part='body'>
            ${!this.disableFilter ? html`<div part="search">${this.renderFilter('target')}</div>` : nothing}
            <div part='body-content'>${this.renderContent('target')}</div>
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
