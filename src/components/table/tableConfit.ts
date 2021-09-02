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
  includeRoot: boolean;
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
  includeRoot: true,
  treeNodeColumn: 'name',
  hasChildProp: 'hasChild'
};
