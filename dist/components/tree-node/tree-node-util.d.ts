import { TemplateResult } from 'lit';
export declare type TreeNodeData = {
    id?: string | number;
    parentID?: string | number /** 父节点ID**/;
    name?: string;
    icon?: string;
    close?: boolean;
    disable?: boolean /** 是否是disable 状态 ，此时不能选中*/;
    closeable?: boolean;
    [key: string]: unknown;
    children?: TreeNodeData[];
};
/**
 * 节点自定义渲染
 * (data: TreeNodeData, index?:number, parentData?:TreeNodeData,): TemplateResult<1>;
 */
export interface NodeRenderInterface {
    /** data:节点数据源， index: 在上层的顺序号，parentData:父节点数据 */
    (data: TreeNodeData, index?: number, parentData?: TreeNodeData): TemplateResult<1>;
}
export declare const DEFAULT_TREE_NODE_RENDER: NodeRenderInterface;
/**
 * 判断数据parent 是否包含了findChild,入股parent==findChild false, 如果parent 包含findChild 则为true
 * @param parent: TreeNodeData
 * @param findChild: TreeNodeData
 */
export declare const containsNodeData: (parent: TreeNodeData, findChild: TreeNodeData) => boolean;
export declare enum NODE_VISTOR_RESULT {
    EXIST = 1 /**标识遍历到此节点退出 */,
    CONTINUE = 2 /** 标识不在遍历后续的兄弟节点 */
}
/** 节点遍历器  (node: TreeNodeData, index:number=0,parentNode?: TreeNodeData) */
export interface NodeVistor {
    /** @node:遍历的节点，index:同层次顺序号,paretNode:上级节点 */
    (node: TreeNodeData, parentNode?: TreeNodeData, index?: number): NODE_VISTOR_RESULT | unknown;
}
/**
 * 遍历 TreeNodeData
 * @param data 节点数据
 * @param callback  节点遍历器 (node: TreeNodeData, parentNode?: TreeNodeData,parentChildrenIndex?:number):unkown
 * @param parentNode:上级节点(根节点不用设置)
 */
export declare const iteratorNodeData: (data: TreeNodeData, callback: NodeVistor, parentData?: TreeNodeData | undefined, parentChildrenIndex?: number) => void;
/**
 * 节点过滤器，返回节点是否满足匹配方法  : (data: TreeNodeData, ...searchData: unknown[])
 */
export interface TreeNodeFilter {
    /**
     * data:需要匹配的数据
     */
    (data: TreeNodeData, ...searchData: unknown[]): boolean;
}
export declare const DEFAULT_TREE_FILTER: TreeNodeFilter;
/**
 * 复制节点数据， 排除指定的属性，children
 * @param data 需要复制的节点数据
 * @param excludePropertiyes, 需要排除的属性，默认['children']
 */
export declare const cloneTreeNodeData: (data: TreeNodeData, excludePropertiyes?: string[]) => TreeNodeData;
declare type DataType = Record<string, unknown>;
/**
 * 将id,parentID 的树节点数据，转化为TreeNodeData。
 * @param list :节点数组列表
 * @param root :根节点,注意根节点id值
 * @param option: 转化参数 ，指定id,parentID 所属属性。
 */
export declare const convertListToTreeNodeData: (list: Array<DataType>, root: TreeNodeData, option?: {
    idProp: string;
    parentIDPro: string;
    childrenPro: string;
}) => TreeNodeData;
export {};
