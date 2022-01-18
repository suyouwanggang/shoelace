// src/components/table/tableConfig.ts
var SortTrigger = /* @__PURE__ */ ((SortTrigger2) => {
  SortTrigger2["self"] = "self";
  SortTrigger2["cell"] = "cell";
  return SortTrigger2;
})(SortTrigger || {});
var defaultSortConfig = {
  trigger: "cell" /* cell */,
  orders: ["ASC" /* ASC */, "DESC" /* DESC */],
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
