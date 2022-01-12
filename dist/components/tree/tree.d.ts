import { LitElement, PropertyValues } from 'lit';
import SlTreeNode from '../tree-node/tree-node';
import { TreeNodeData } from '../tree-node/tree-node-util';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency
 *
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-click - Emitted when tree-node-click.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-toogle - Emitted when tree-node-state changed.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-before-toogle - Emitted before tree-node-state change.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-open - Emitted when tree-node-state change to opened.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-close - Emitted when tree-node-state change closed.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-before-open - Emitted before tree-node-state to open.
 * @event {{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}} sl-tree-node-before-close - Emitted before tree-node-state to close.
 * @event {{node:SlTreeNode,checkKeyKeys:checkKeyKeys }} sl-tree-node-select-change - Emitted after tree select node change .
 *
 *
 * @slot no-data - slot:when no tree has no data  or rootNodeData is undefined.
 * @slot loading - slot:when for  loading
 * @slot footer - slot for footer
 * @slot filter - slot for custome filter
 *
 * @csspart base - The tree's base wrapper.
 * @csspart modal - The tree's loading wrapper.
 * @csspart tree-body - The tree's tree nodes wrapper.
 * @csspart tree-footer - The tree nodes footer wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
export default class SlTree extends LitElement {
    static styles: import("lit").CSSResult;
    static TREE_NODE_ICON_LIBARARY: string;
    /** tree 选中方式 selectMode：支持的值为：check, radio,single,none （none,表示不支持选中,single) */
    selectMode: 'check' | 'radio' | 'single' | 'none';
    /** 选中的节点，是否高亮显示 */
    select_highlight: boolean;
    /** 是否显示根节点 */
    includeRoot: boolean;
    /** 当selectMode='check', 选中的时候是否支持级联选择（选中上级，下级自动选中） */
    checkCasecade: boolean;
    /** 当selectMode='check', 取消某个节点选中，下级节点是否也级联不选中 */
    checkOffCasecade: boolean;
    /** 设置是加载状态 */
    loading: boolean;
    /** 树已经选中的节点，如果是多选，则为选中节点的ID值组成的数组，否则为选中节点的ID */
    checkedKeys?: unknown | Array<unknown>;
    /** 树节点过滤 参数，当支持过滤时启用*/
    filterString: string | unknown;
    /** 树内置过滤input 的placeHolder*/
    filterInputPlaceholder: string;
    /** 当支持过滤是， 节点过滤函数，接收TreeNodeData, 和 所有的其他参数，true,则节点满足过滤条件 */
    filterMethod: import("../tree-node/tree-node-util").TreeNodeFilter;
    /** 是否支持过滤 */
    enableFilter: boolean;
    /** 数据ID属性，用于内置选中节点 ,默认=id*/
    nodeIDProperty: string;
    /** 节点渲染函数 */
    nodeRender: import("../tree-node/tree-node-util").NodeRenderInterface;
    /** 根节点数据源 */
    rootNodeData?: TreeNodeData;
    /** 实际渲染的根节点数据 */
    renderRootNodeData?: TreeNodeData;
    /** 存储过滤后的 节点数据的映射关系 ，key:过滤后的节点，value:原始的节点 */
    nodeCacheMap?: WeakMap<TreeNodeData, TreeNodeData>;
    /** 存储过滤后的 节点数据的映射关系 ，key:原始数据，value:过滤后产生的数据 */
    nodeFilterCacheMap?: WeakMap<TreeNodeData, TreeNodeData>;
    /** 存储 过滤后真实匹配的TreeNodeData */
    matchFilterNodeSet?: Set<TreeNodeData>;
    private real_treeNodeRender;
    watchSelectModeChange(_oldMode: string, newMode: string): void;
    /** 实现树内部过滤逻辑 */
    doFilter(): void;
    constructor();
    /**
     * 获取上级数据源
     * @data :节点数据源
     */
    getParentNodeData(data: TreeNodeData): TreeNodeData;
    private renderAllTreeNode;
    private renderNodeDataTemplate;
    private _emitTreeEvent;
    hasFooter: boolean;
    firstUpdated(map: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    private slotChangeHandler;
    private inputChangeHander;
    private inputFilterHanlder;
    private handerCheckEvent;
    private handerRadioEvent;
    watchNodeRenderChange(): void;
    /**
     *  获取 DOM 最近的TreeNode:
     * @param el tree shadowRoot 内部元素
     * @throws when el getRootNode()==document
     */
    getClosetTreeNode(el: HTMLElement): SlTreeNode | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tree': SlTree;
    }
}
//# sourceMappingURL=tree.d.ts.map