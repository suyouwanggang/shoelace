import SlColumn from '../column/column';
import { TreeNodeData } from '../tree-node/tree-node-util';
import { SortingEnum } from './tableHelper';

/**
 * tabel TH排序区域控制，(是th,还是只能排序图标区域)
 */
export enum SortTrigger {
  self = 'self',
  cell = 'cell'
}

/**
 * 定义表格的排序规则
 */
export type SortConfig = {
  //触发排序区域,是th :cell, 还是排序区
  trigger: SortTrigger;
  //轮转顺序
  orders: Array<SortingEnum>;
  //是否支持多列排序
  multi: boolean;
  //当触发区域为cell,是否总是显示排序图标。
  alwaysShowIcon: boolean;
};

export type SortValue = {
  orderBy: string;
  orderType: SortingEnum;
};
export const defaultSortConfig = {
  //排序区域控制，默认是th,也可以改为只点击排序图标，才能触发排序
  trigger: SortTrigger.cell,
  //order 轮训值,开始为ASC，后面DESC，最后去掉排序 （null,这个跟产品不一致，可以默认去掉)
  // orders: [SortingEnum.ASC, SortingEnum.DESC, SortingEnum.NULL],
  orders: [SortingEnum.ASC, SortingEnum.DESC],
  multi: false,
  //是否总是显示排序图标,如果总是
  alwaysShowIcon: false
};

/**
 * 定义表格数据为树类型
 */
export type TreeConfig = {
  //树子节点属性,必须为'chidren';
  // childrenProp:'children';
  //树节点ID属性
  idProp?: string;
  //树节点缩进
  indent?: number;
  //对于同一级的节点，每次只能展开一个,待实现
  accordion?: boolean;
  //是否显示根节点
  //includeRoot: boolean;
  //是否默认懒加载
  lazy?: boolean;
  //指定treeNodeColumn 所在列 field
  treeNodeColumn: string;
  //懒加载时，哪个属性标识有子节点
  hasChildProp?: string;
};
export const defaultTreeConfig: TreeConfig = {
  idProp: 'id',
  //childrenProp:'children',
  indent: 14,
  accordion: false,
  lazy: false,
  treeNodeColumn: 'name',
  hasChildProp: 'hasChild'
};
/** Table 行上下文 */
export type RowContext = {
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
/** Table TD 上下文 */
export type CellContext = {
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
export type CellHeadContext = {
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
