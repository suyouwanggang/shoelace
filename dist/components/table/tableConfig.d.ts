import SlColumn from '../column/column';
import { TreeNodeData } from '../tree-node/tree-node-util';
import { SortingEnum } from './tableHelper';
/**
 * tabel TH排序区域控制，(是th,还是只能排序图标区域)
 */
export declare enum SortTrigger {
    self = "self",
    cell = "cell"
}
/**
 * 定义表格的排序规则
 */
export declare type SortConfig = {
    trigger: SortTrigger;
    orders: Array<SortingEnum>;
    multi: boolean;
    alwaysShowIcon: boolean;
};
export declare type SortValue = {
    orderBy: string;
    orderType: SortingEnum;
};
export declare const defaultSortConfig: {
    trigger: SortTrigger;
    orders: SortingEnum[];
    multi: boolean;
    alwaysShowIcon: boolean;
};
/**
 * 定义表格数据为树类型
 */
export declare type TreeConfig = {
    idProp?: string;
    indent?: number;
    accordion?: boolean;
    lazy?: boolean;
    treeNodeColumn: string;
    hasChildProp?: string;
};
export declare const defaultTreeConfig: TreeConfig;
/** Table 行上下文 */
export declare type RowContext = {
    /** 行数据 */
    rowData: any;
    /** 行数据顺序号 */
    rowIndex: number;
    /** TreeTable： rowData对应的上级数据 */
    parentData?: TreeNodeData;
    /** TreeTable： 对应树的层次深度 */
    level?: number;
    /***TreeTable 如果过滤 rowData 对应的原始数据  */
    originalData?: TreeNodeData;
    /***TreeTable 过滤，为orginalData 的上级原始数据 */
    originalParentData?: TreeNodeData;
};
/** Table TBODY TD 上下文 */
export declare type CellContext = {
    /**列column */
    column: SlColumn;
    /** 行数据 */
    rowData: any;
    /** 行数据顺序号 */
    rowIndex: number;
    /**column 渲染顺序，从0 开始  */
    colIndex: number;
    /** TreeTable 的时候，上级数据 */
    parentData?: TreeNodeData;
    /** TreeTable 的时候，对应树的层次深度 */
    level?: number;
    /***TreeTable 如果过滤 rowData 对应的原始数据  */
    originalData?: TreeNodeData;
    /***TreeTable 过滤，为orginalData 的上级原始数据  */
    originalParentData?: TreeNodeData;
};
/** Table TH 上下文 */
export declare type CellHeadContext = {
    /**列 column */
    column: SlColumn;
    /**column index，从0 开始  */
    colIndex: number;
    /** 列column 所在表头行号 */
    colRowIndex: number;
    /** 列跨多少行 */
    rowspan: number;
    /** 跨多少列 */
    colspan: number;
};
/** 定义column Items 类型 */
export declare type ColumnItems = {
    id: number | string;
    name: string;
    [key: string]: any;
};
