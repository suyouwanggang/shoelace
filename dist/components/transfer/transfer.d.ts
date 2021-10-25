import { LitElement, TemplateResult } from 'lit';
import '../checkbox/checkbox';
import '../scroll/scroll';
import SlScroll from '../scroll/scroll';
declare type TransferItem = {
    id: string | number /**主键，在一个容器内唯一 */;
    name: string /**名称 */;
    [key: string]: unknown /**其他自定义的选项 */;
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
export default class SlTransfer extends LitElement {
    static styles: import("lit").CSSResult;
    /** 所有选择的数据 */
    dataSource: TransferItem[];
    /**数据项自定渲染 */
    renderItem: (item: TransferItem, direction: 'source' | 'target') => TemplateResult<1>;
    /** 操作过程左侧当前选中的数据项ID */
    private sourceTempSelectedKeys;
    /** 操作过程中右侧当前选中的数据项ID */
    private targetTempSelectedKeys;
    /** 右侧选中的数据项ID */
    targetSelectedKeys: Array<string | number>;
    /** 是否禁用选择 */
    disabled: boolean;
    private cacheDataSource;
    /**根据Id 获取选项对应的数据项 */
    getItemById(id: string | number): TransferItem | undefined;
    /**获取右侧 列表 */
    get targetDataList(): TransferItem[];
    get sourceDataList(): TransferItem[];
    protected filterTargetDataList: Array<TransferItem>;
    protected filterSourceDataList: Array<TransferItem>;
    watchDataSourceChanged(): void;
    protected runFilterMethod(): void;
    /** 是否关闭过滤 */
    disableFilter: boolean;
    /** 过滤Input 的placeholder，如果是字符串，则作用于source,target,如果是数组，则第一个作用左边，第二个作用于右边  */
    filterPlaceholder: string | string[];
    /** 自定义Title 渲染： 如果是数组，则为左右Title ,如果是函数， 则接收'source'|'target' 返回渲染内容 */
    titleTemplate: string[] | ((direct: 'source' | 'target') => TemplateResult<1>);
    /** 是否显示全选按钮*/
    showSelectAll: boolean;
    /**Item 显示为Table ,绑定的Table Template，函数，接收'source|target'返回table 组件*/
    tableTemplate: (direction: 'source' | 'target') => TemplateResult<1>;
    /**数据过滤函数,接收 两个参数：item:数据项，其他为组件绑定的 value：过滤值 ,如果用户自定义了，可以支持多个过滤条件 */
    filterMethod: (item: TransferItem, ...value: unknown[]) => boolean;
    /**选中项发生改变时的回调函数  */
    onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => boolean;
    private renderFilter;
    protected sourceSearchValue: unknown[];
    protected targetSearchValue: unknown[];
    private inputTimeoutID;
    private doFilterInputHandler;
    protected emitFilterEvent(): void;
    protected processSelectItem(event: Event, item: TransferItem, direction: 'source' | 'target'): void;
    private sourceScrollRef;
    private targetScrollRef;
    get sourceScroll(): SlScroll | undefined;
    get targetScroll(): SlScroll | undefined;
    private sourceTable;
    private targetTable;
    tableTemplateChange(): void;
    protected renderContent(direction: 'source' | 'target'): TemplateResult<1>;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-transfer': SlTransfer;
    }
}
export {};
//# sourceMappingURL=transfer.d.ts.map