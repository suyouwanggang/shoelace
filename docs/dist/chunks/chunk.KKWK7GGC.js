import {
  y
} from "./chunk.HHQFDLZX.js";

// src/components/tree-node/tree-node-util.ts
var DEFAULT_TREE_NODE_RENDER = (data) => {
  return y`${data == null ? "" : data.name}`;
};
var containsNodeData = (parent, findChild) => {
  const iteratorFun = (temp, child) => {
    if (temp == child) {
      return true;
    }
    const children = temp.children;
    if (children) {
      for (let k of children) {
        if (iteratorFun(k, child)) {
          return true;
        }
      }
    }
    return false;
  };
  if (parent == findChild) {
    return false;
  }
  return iteratorFun(parent, findChild);
};
var NODE_VISTOR_RESULT;
(function(NODE_VISTOR_RESULT2) {
  NODE_VISTOR_RESULT2[NODE_VISTOR_RESULT2["EXIST"] = 1] = "EXIST";
  NODE_VISTOR_RESULT2[NODE_VISTOR_RESULT2["CONTINUE"] = 2] = "CONTINUE";
})(NODE_VISTOR_RESULT || (NODE_VISTOR_RESULT = {}));
var iteratorNodeData = (data, callback, parentData, parentChildrenIndex = 0) => {
  let result = callback(data, parentData, parentChildrenIndex);
  if (result == 1) {
    return;
  } else {
    const children = data.children;
    if (children) {
      label:
        for (let index = 0, size = children.length; index < size; index++) {
          let k = children[index];
          result = iteratorNodeData(k, callback, data, index);
          if (result == 2) {
            continue label;
          } else if (result == 1) {
            return;
          }
        }
    }
  }
};
var DEFAULT_TREE_FILTER = function(data, searchString) {
  var _a;
  if (typeof searchString == "undefined" || searchString.trim() == "") {
    return true;
  }
  const index = data && data.name && ((_a = data.name) == null ? void 0 : _a.toLowerCase().indexOf(searchString.toLowerCase()));
  return typeof index != "undefined" && index > 0;
};
var cloneTreeNodeData = (data, excludePropertiyes = ["children"]) => {
  if (data == null || typeof data == "undefined") {
    throw new Error("NULL\u6570\u636E\u4E0D\u80FD\u590D\u5236");
  }
  const temp = {};
  for (let key in data) {
    if (excludePropertiyes.includes(key)) {
      continue;
    }
    temp[key] = data[key];
  }
  temp.children = [];
  return temp;
};
var convertListToTreeNodeData = (list, root, option = {
  idProp: "id",
  parentIDPro: "parentID",
  childrenPro: "children"
}) => {
  const idProp = option.idProp;
  const parentProp = option.parentIDPro;
  const childProp = option.childrenPro;
  const parentMap = new Map();
  for (let i = 0, j = list.length; i < j; i++) {
    const tempNode = list[i];
    const idValue = tempNode[idProp];
    const parentValue = tempNode[parentProp];
    if (idValue === parentValue) {
      throw new Error(`${tempNode} id,parentID \u5C5E\u6027\u503C\u5B8C\u5168\u76F8\u7B49\uFF0C\u4F1A\u9020\u6210\u6B7B\u5FAA\u73AF...`);
    }
    let childArray;
    if (parentMap.has(parentValue)) {
      childArray = parentMap.get(parentValue);
    } else {
      childArray = [];
      parentMap.set(parentValue, childArray);
    }
    childArray.push(tempNode);
  }
  let rootChildren = parentMap.get(root[idProp]);
  if (rootChildren == null) {
    console.warn(`not found root nodes child nodes. No nodes  ${parentProp}\u503C=${root[idProp]}`);
  } else {
    const funIterator = (id, parentData) => {
      let subChild = parentMap.get(id);
      if (subChild) {
        let children = parentData[childProp];
        if (!children) {
          children = [];
          parentData[childProp] = children;
        }
        for (let k of subChild) {
          children.push(k);
          funIterator(k[idProp], k);
        }
      }
    };
    funIterator(root[idProp], root);
  }
  return root;
};

export {
  DEFAULT_TREE_NODE_RENDER,
  containsNodeData,
  NODE_VISTOR_RESULT,
  iteratorNodeData,
  DEFAULT_TREE_FILTER,
  cloneTreeNodeData,
  convertListToTreeNodeData
};
