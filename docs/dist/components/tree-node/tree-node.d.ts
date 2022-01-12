import { LitElement, nothing } from 'lit';
import '../../components/icon/icon';
import SlTree from '../tree/tree';
import { NodeRenderInterface, TreeNodeData } from './tree-node-util';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event {{nodeData:TreeNodeData,node:SlTreeNode}} sl-node-click - Emitted when node name click.
 * @event {{nodeData:TreeNodeData,node:SlTreeNode}} sl-node-before-open - Emitted before node open .
 * @event {{nodeData:TreeNodeData,node:SlTreeNode}} sl-node-before-close - Emitted before node close .
 * @event {{nodeData:TreeNodeData,node:SlTreeNode}} sl-node-before-toogle - Emitted before node state change :open or close.
 * @event {{nodeData:TreeNodeData,node:SlTreeNode}} sl-node-close - Emitted after node state close.
 * @event {{nodeData:TreeNodeData,node:SlTreeNode}} sl-node-open - Emitted after node state opened.
 * @event {{nodeData:TreeNodeData,node:SlTreeNode}} sl-node-toogle - Emitted when node state toogle.
 *
 * @csspart base - The component's base wrapper.
 * @csspart node - The component's node self wrapper.
 * @csspart children - The component's children wrapper.
 * @csspart node_toogle_icon - The component's toogle icon.
 * @csspart node-icon - The node icon.
 * @csspart node-span - The component's node text render wrapper .
 *
 * @cssproperty --sl-spacing-xx-small - toogle-icon's margin from text .
 */
export default class SlTreeNode extends LitElement {
    static styles: import("lit").CSSResult;
    /** tree-node子节点DIV */
    childTreeNodeElement: HTMLElement;
    /** 本身node 渲染容器 */
    treeNodeElement: HTMLElement;
    /** 节点数据源 */
    nodeData?: TreeNodeData;
    _watchOnSetNodeData(): void;
    /** 绑定树对象 */
    tree: SlTree;
    /** 树节点渲染器 */
    nodeRender: NodeRenderInterface;
    /** 父节点数据 */
    parentNodeData?: TreeNodeData;
    private renderChildren;
    /** 获取直接孩子数量 */
    get subChildSize(): number;
    /** 是否是关闭状 */
    get isClose(): boolean | undefined;
    private isTreeNodeSelected;
    render(): typeof nothing | import("lit-html").TemplateResult<1>;
    private emitEvent;
    static ANIMATE_duration: number;
    static ANIMATE_easing: string;
    private _clickTrigerHander;
    static NODE_OPEN_ICON: string;
    static NODE_CLOSE_ICON: string;
    private renderNodeData;
    private _clickNodeHandler;
    setNodeDataProperty(key: string, value: unknown): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tree-node': SlTreeNode;
    }
}
//# sourceMappingURL=tree-node.d.ts.map