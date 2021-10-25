import { LitElement, TemplateResult } from 'lit';
import SlOrgNode, { OrgNodeDataType } from '../org-node/org-node';
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 * @event {{ node: SlOrgNode,nodeData:OrgNodeDataType }} sl-org-tree-node-click  Emitted when node click.
 * @event {{ node: SlOrgNode,nodeData:OrgNodeDataType }} sl-org-tree-node-toogle Emitted when node toogle changed.
 *

 *
 * @csspart container - The component's container wrapper.
 * @csspart tree - The component's tree wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
export default class SlOrgTree extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * 组织架构节点数据
     */
    rootData: OrgNodeDataType;
    /**
     * 是否居中
     */
    center: boolean;
    /**
     * 是否是水平布局 组织架构
     */
    horizontal: boolean;
    nodeRender: (node: OrgNodeDataType) => TemplateResult<1> | TemplateResult<1>[];
    containerEl: HTMLDivElement;
    render(): TemplateResult<1>;
    rootNode: SlOrgNode;
    private handNodeEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-org-tree': SlOrgTree;
    }
}
//# sourceMappingURL=org-tree.d.ts.map