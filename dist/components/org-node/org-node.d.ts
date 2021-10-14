import { LitElement, PropertyValues, TemplateResult } from 'lit';
export declare type OrgNodeDataType = {
    /**
     * 内置组织架构图数据
     */
    data: JSON;
    styleClass?: string;
    /**
     * 是否允许收缩
     */
    collapsible?: boolean;
    /**
     * 是否是展开
     */
    expanded?: boolean;
    children?: OrgNodeDataType[];
    [key: string]: unknown;
};
export declare const defaultRoleRender: (data: OrgNodeDataType) => TemplateResult<1>;
/**
 * @since 2.0
 * @status experimental
 *
 
 *  @event sl-node-click {data:any} - click node Data Element .
    @event sl-node-toogle {data:any} - toogle node Element .
    @event sl-node-before-toogle {data:any} -before toogle node Element .
 *

 *
 *  @cssproperty --example - An example CSS custom property.
 */
export default class SlOrgNode extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * 节点数据
     */
    nodeData: OrgNodeDataType;
    /**
     * 节点是否允许收缩
     */
    collapsable: boolean;
    /**
     * 组织架构节点自定义样式
     */
    styleClass: string;
    /**
     * 节点是展开，还是收拢，默认是展开
     */
    expanded: boolean;
    createRenderRoot(): this;
    update(changeProperties: PropertyValues): void;
    /**
     * 节点自定义渲染
     */
    nodeRender: (node: OrgNodeDataType) => TemplateResult<1> | TemplateResult<1>[];
    render(): TemplateResult<1>;
    onNodeClick(): void;
    protected _emitEvent(eventName: string, options?: CustomEventInit): CustomEvent<any>;
    private onToogleNode;
    private _renderChildNode;
    subOrgNodes: SlOrgNode[];
    get isLeaf(): boolean;
    get _childNodeSize(): number;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-org-node': SlOrgNode;
    }
}
