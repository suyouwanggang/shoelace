import {
  SortingEnum
} from "./chunk.J5LEIX36.js";

// src/components/table/tableConfig.ts
var SortTrigger;
(function(SortTrigger2) {
  SortTrigger2["self"] = "self";
  SortTrigger2["cell"] = "cell";
})(SortTrigger || (SortTrigger = {}));
var defaultSortConfig = {
  trigger: SortTrigger.cell,
  orders: [SortingEnum.ASC, SortingEnum.DESC],
  multi: false,
  alwaysShowIcon: false
};
var defaultTreeConfig = {
  idProp: "id",
  indent: 14,
  accordion: false,
  lazy: false,
  treeNodeColumn: "name",
  hasChildProp: "hasChild"
};

export {
  SortTrigger,
  defaultSortConfig,
  defaultTreeConfig
};
