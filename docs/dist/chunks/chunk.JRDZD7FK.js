import {
  tree_node_default
} from "./chunk.BWIXFBFB.js";
import {
  DEFAULT_TREE_FILTER,
  DEFAULT_TREE_NODE_RENDER,
  cloneTreeNodeData,
  iteratorNodeData
} from "./chunk.FN27YXV3.js";
import {
  debounceWait
} from "./chunk.NIBYN26Y.js";
import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  watchProps
} from "./chunk.OSQIKTTV.js";
import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  onEvent
} from "./chunk.3SJG5WV3.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  o
} from "./chunk.IIBMGW45.js";
import {
  component_styles_default
} from "./chunk.34CCKGOJ.js";
import {
  e,
  n,
  t
} from "./chunk.OPP7P5NL.js";
import {
  T,
  p,
  r,
  s
} from "./chunk.5BL2X74K.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/tree/style.litcss
var styles = r`:host{position:relative;display:block;--tree-body-spacing:var(--sl-spacing-x-small);--tree-footer-spacing:var(--sl-spacing-xx-small)}div[part=base]{display:flex;position:relative;flex-direction:column}div[part=base] .modal{background-color:rgb(var(--sl-overlay-background-color)/var(--sl-overlay-opacity));position:absolute;width:100%;height:100%;z-index:10}div[part=base] .loading{position:absolute;left:50%;top:3em;width:3em;height:3em;margin-left:-1.5em;border-radius:50%;--track-color:rgb(var(--sl-color-neutral-500) / 15%);--indicator-color:rgb(var(--sl-color-primary-500));--stroke-width:4px;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}div[part=base] div[part=filter]{flex:0 0 auto;align-items:center}div[part=base] div[part=filter] sl-input{margin:5px 10px;width:98%}div[part=base] div[part=tree-body]{flex:1 1 auto;padding:var(--tree-body-spacing);overflow:auto}div[part=base].base-has-footer div[part=tree-footer]{display:flex}div[part=base] div[part=tree-footer]{display:none;flex:0 0 auto;align-items:center;justify-content:flex-end;padding:var(--tree-footer-spacing)}`;
var style_default = styles;

// src/components/tree/tree.styles.ts
var tree_styles_default = r`
  ${component_styles_default}
  ${style_default}
`;

// src/components/tree/tree.ts
var SlTree = class extends s {
  constructor() {
    super();
    this.selectMode = "single";
    this.select_highlight = false;
    this.includeRoot = true;
    this.checkCasecade = true;
    this.checkOffCasecade = true;
    this.loading = false;
    this.filterString = "";
    this.filterInputPlaceholder = "";
    this.filterMethod = DEFAULT_TREE_FILTER;
    this.enableFilter = false;
    this.nodeIDProperty = "id";
    this.nodeRender = DEFAULT_TREE_NODE_RENDER;
    this.real_treeNodeRender = this.nodeRender;
    this.hasFooter = false;
    this.inputChangeHander = debounceWait((inputString) => {
      this.filterString = inputString;
    }, 10);
    this.handerCheckEvent = this.handerCheckEvent.bind(this);
    this.handerRadioEvent = this.handerRadioEvent.bind(this);
  }
  watchSelectModeChange(_oldMode, newMode) {
    if (newMode == "check") {
      if (!Array.isArray(this.checkedKeys)) {
        let oldChecked = this.checkedKeys;
        let array = [];
        if (typeof oldChecked != "undefined") {
          array.push(oldChecked);
        }
        this.checkedKeys = array;
      }
    } else if (_oldMode == "check") {
      if (Array.isArray(this.checkedKeys) && this.checkedKeys.length > 0) {
        let first = this.checkedKeys[0];
        this.checkedKeys = first;
      }
    }
  }
  doFilter() {
    const rootNodeData = this.rootNodeData;
    const treeEl = this;
    if (rootNodeData && this.filterMethod && this.enableFilter) {
      const filterArray = Array.isArray(this.filterString) ? this.filterString : [this.filterString];
      const matchNodeSet = new Set();
      const hightLightNodeSet = this.matchFilterNodeSet = new Set();
      const nodeVistor = (tempData, _parentNode) => {
        tempData[parentSymobl] = _parentNode;
        const match = this.filterMethod.apply(treeEl, [tempData, ...filterArray]);
        if (match) {
          hightLightNodeSet.add(tempData);
          matchNodeSet.add(tempData);
          if (_parentNode) {
            let tempParent = _parentNode;
            while (tempParent && !matchNodeSet.has(tempParent)) {
              matchNodeSet.add(tempParent);
              tempParent = tempParent[parentSymobl];
            }
          }
        }
      };
      iteratorNodeData(rootNodeData, nodeVistor);
      const cloneRootData = cloneTreeNodeData(rootNodeData);
      const nodeCacheMap = this.nodeCacheMap = new WeakMap();
      nodeCacheMap.set(cloneRootData, rootNodeData);
      const nodeFilterCacheMap = this.nodeFilterCacheMap = new WeakMap();
      nodeFilterCacheMap.set(rootNodeData, cloneRootData);
      const nodeVistor2 = (tempData, _parentNode) => {
        var _a, _b;
        const newData = cloneTreeNodeData(tempData);
        nodeCacheMap.set(newData, tempData);
        nodeFilterCacheMap.set(tempData, newData);
        if (matchNodeSet.has(tempData)) {
          (_b = (_a = nodeFilterCacheMap.get(_parentNode)) == null ? void 0 : _a.children) == null ? void 0 : _b.push(newData);
        }
      };
      if (rootNodeData.children) {
        for (let i = 0, j = rootNodeData.children.length; i < j; i++) {
          iteratorNodeData(rootNodeData.children[i], nodeVistor2, rootNodeData, i);
        }
      }
      if (matchNodeSet.size > 0) {
        this.renderRootNodeData = cloneRootData;
      } else {
        this.renderRootNodeData = void 0;
      }
    } else {
      if (this.rootNodeData) {
        const nodeVistor = (tempData, _parentNode) => {
          tempData[parentSymobl] = _parentNode;
        };
        iteratorNodeData(this.rootNodeData, nodeVistor);
      }
      this.renderRootNodeData = this.rootNodeData;
    }
  }
  getParentNodeData(data) {
    return data[parentSymobl];
  }
  renderAllTreeNode() {
    if (!this.renderRootNodeData) {
      return p`<slot name="no-data"></slot>`;
    } else {
      if (this.includeRoot) {
        return this.renderNodeDataTemplate(this.renderRootNodeData, 0);
      } else {
        const children = this.renderRootNodeData.children;
        return children ? children.map((item, index) => this.renderNodeDataTemplate(item, index, this.renderRootNodeData)) : T;
      }
    }
  }
  renderNodeDataTemplate(data, index, parentData) {
    const tree = this;
    return p`<sl-tree-node .customStyle=${this.customStyle} .tree=${tree} .nodeData=${data} index=${index} .parentNodeData=${parentData} .nodeRender=${this.real_treeNodeRender}></sl-tree-node>`;
  }
  _emitTreeEvent(event) {
    if (!event.defaultPrevented) {
      const node = event.detail.node;
      const oldType = event.type;
      const type = oldType.replace("sl-node", "sl-tree-node");
      const nodeData = node.nodeData;
      emit(this, type, {
        cancelable: true,
        detail: {
          node,
          nodeData,
          parentData: node.parentNodeData
        }
      });
    }
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    let handerTreeNode = (event) => {
      this._emitTreeEvent(event);
    };
    let eventArray = ["sl-node-click", "sl-node-before-open", "sl-node-before-close", "sl-node-before-toogle", "sl-node-close", "sl-node-open", "sl-node-toogle"];
    let div = this.renderRoot.querySelector("div[part]");
    for (let eventType of eventArray) {
      onEvent(div, "sl-tree-node", eventType, handerTreeNode);
    }
    onEvent(div, "sl-tree-node", "sl-node-click", (event) => {
      const tree_node = event.detail.node;
      if (this.selectMode == "single" && tree_node.nodeData && !Boolean(tree_node.nodeData.disable)) {
        this.checkedKeys = tree_node.nodeData[this.nodeIDProperty] || "";
        emit(this, "sl-tree-node-select-change", {
          detail: {
            node: tree_node,
            checkKeyKeys: this.checkedKeys
          }
        });
      }
    });
  }
  render() {
    const baseClass = {
      "base-has-footer": this.hasFooter
    };
    return p`<div part="base" class=${o(baseClass)}>
      ${this.enableFilter ? p`<div part="filter">
            <slot name="filter"> <sl-input part="filter-input" .placeholder=${this.filterInputPlaceholder} @sl-input=${this.inputFilterHanlder} .value=${String(this.filterString)}></sl-input></slot>
          </div>` : ""}
      <div part="tree-body">${this.renderAllTreeNode()}</div>
      <div part="tree-footer"><slot name="footer" @slotchange=${this.slotChangeHandler}></slot></div>
      ${this.loading ? p`<div class="modal" part="modal">
            <slot name="loading"><div class="loading"></div></slot>
          </div>` : ""}
    </div>`;
  }
  slotChangeHandler() {
    this.hasFooter = hasSlot(this, "footer");
  }
  inputFilterHanlder(event) {
    let inputString = event.target.value;
    requestAnimationFrame(() => {
      this.inputChangeHander(inputString);
    });
  }
  async handerCheckEvent(event) {
    let checked = event.target.checked;
    let array = this.checkedKeys;
    let node = this.getClosetTreeNode(event.target);
    let nodeData = node.nodeData;
    if (checked) {
      const iteratorSubData = (subNodeData) => {
        let nodeID = subNodeData[this.nodeIDProperty];
        let disabled = Boolean(subNodeData.disable);
        if (typeof nodeID != "undefined" && !disabled) {
          if (!array.includes(nodeID)) {
            array.push(nodeID);
          }
        }
      };
      if (this.checkCasecade) {
        iteratorNodeData(nodeData, iteratorSubData);
      } else {
        iteratorSubData(nodeData);
      }
    } else {
      const iteratorSubData = (subNodeData) => {
        let nodeID = subNodeData[this.nodeIDProperty];
        let disabled = Boolean(subNodeData.disable);
        if (typeof nodeID != "undefined" && !disabled) {
          let index = array.indexOf(nodeID);
          if (index >= 0) {
            array.splice(index, 1);
          }
        }
      };
      if (this.checkOffCasecade) {
        iteratorNodeData(nodeData, iteratorSubData);
      } else {
        iteratorSubData(nodeData);
      }
    }
    this.checkedKeys = [...array];
    await this.updateComplete;
    emit(this, "sl-tree-node-select-change", {
      detail: {
        node,
        checkKeyKeys: array
      }
    });
  }
  async handerRadioEvent(event) {
    let node = this.getClosetTreeNode(event.target);
    let checked = event.target.checked;
    let tempChecke = "";
    if (Array.isArray(this.checkedKeys)) {
      tempChecke = this.checkedKeys[0];
    }
    let nodeData = node.nodeData;
    if (checked && typeof nodeData[this.nodeIDProperty] != "undefined") {
      tempChecke = nodeData[this.nodeIDProperty];
    } else {
      tempChecke = "";
    }
    this.checkedKeys = tempChecke;
    await this.updateComplete;
    emit(this, "sl-tree-node-select-change", {
      detail: {
        node,
        checkKeyKeys: tempChecke
      }
    });
  }
  watchNodeRenderChange() {
    const handerNodeSelect = (event) => {
      const node = event.target;
      if (node.tagName.toLocaleUpperCase() == "sl-checkbox" || node.tagName.toLocaleUpperCase() == "sl-radio") {
        return;
      }
      if (this.selectMode == "check") {
        let checkBox = node.querySelector(":scope > sl-checkbox");
        if (checkBox && !checkBox.disabled) {
          checkBox.checked = !checkBox.checked;
          emit(checkBox, "sl-change");
        }
      } else if (this.selectMode == "radio") {
        let checkBox = node.querySelector(":scope > sl-radio");
        if (checkBox && !checkBox.disabled) {
          checkBox.checked = true;
          emit(checkBox, "sl-change");
        }
      }
    };
    this.real_treeNodeRender = (node, index, parentNodeData) => {
      const result = this.nodeRender(node, index, parentNodeData);
      const array = [];
      if (this.selectMode == "check") {
        array.push(p`<sl-checkbox
            .disabled=${Boolean(node.disable)}
            .nodeData=${node}
            @sl-change=${this.handerCheckEvent}
            class="selectCheckbox"
            .checked=${typeof node[this.nodeIDProperty] != "undefined" && this.checkedKeys.includes(node[this.nodeIDProperty])}
            >${result}</sl-checkbox
          >`);
      } else if (this.selectMode == "radio") {
        array.push(p`<sl-radio
            .disabled=${Boolean(node.disable)}
            .nodeData=${node}
            @sl-change=${this.handerRadioEvent}
            class="selectRadio"
            .checked=${typeof node[this.nodeIDProperty] != "undefined" && this.checkedKeys == node[this.nodeIDProperty]}
            >${result}</sl-radio
          >`);
      } else {
        array.push(result);
      }
      return p`<div part="select-part" @click=${handerNodeSelect}>${array}</div>`;
    };
  }
  getClosetTreeNode(el) {
    if (el.getRootNode() == document) {
      throw new Error("el should  in tree ShadowRoot !");
    }
    if (el instanceof tree_node_default) {
      return el;
    } else {
      let root = el.getRootNode();
      let temp;
      while (root != null) {
        temp = root.host;
        if (temp instanceof tree_node_default) {
          return temp;
        }
        root = temp.getRootNode();
      }
    }
    return null;
  }
};
SlTree.styles = tree_styles_default;
__decorateClass([
  e({ reflect: true })
], SlTree.prototype, "selectMode", 2);
__decorateClass([
  e({ attribute: false, type: Boolean })
], SlTree.prototype, "select_highlight", 2);
__decorateClass([
  e({ reflect: true, attribute: "include_root", type: Boolean })
], SlTree.prototype, "includeRoot", 2);
__decorateClass([
  e({ reflect: true, attribute: "check_casecade", type: Boolean })
], SlTree.prototype, "checkCasecade", 2);
__decorateClass([
  e({ reflect: true, attribute: "check_off_casecade", type: Boolean })
], SlTree.prototype, "checkOffCasecade", 2);
__decorateClass([
  e({ reflect: true, attribute: "loading", type: Boolean })
], SlTree.prototype, "loading", 2);
__decorateClass([
  e({ reflect: true, attribute: false })
], SlTree.prototype, "checkedKeys", 2);
__decorateClass([
  e({ attribute: false })
], SlTree.prototype, "filterString", 2);
__decorateClass([
  e({ attribute: "filter-input-placeholder" })
], SlTree.prototype, "filterInputPlaceholder", 2);
__decorateClass([
  e({ attribute: false })
], SlTree.prototype, "filterMethod", 2);
__decorateClass([
  e({ reflect: true, attribute: "enable-filter", type: Boolean })
], SlTree.prototype, "enableFilter", 2);
__decorateClass([
  e({ attribute: false })
], SlTree.prototype, "nodeIDProperty", 2);
__decorateClass([
  e({ attribute: false })
], SlTree.prototype, "nodeRender", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTree.prototype, "rootNodeData", 2);
__decorateClass([
  t()
], SlTree.prototype, "renderRootNodeData", 2);
__decorateClass([
  t()
], SlTree.prototype, "nodeCacheMap", 2);
__decorateClass([
  t()
], SlTree.prototype, "nodeFilterCacheMap", 2);
__decorateClass([
  t()
], SlTree.prototype, "matchFilterNodeSet", 2);
__decorateClass([
  t()
], SlTree.prototype, "real_treeNodeRender", 2);
__decorateClass([
  watch("selectMode")
], SlTree.prototype, "watchSelectModeChange", 1);
__decorateClass([
  watchProps(["filter", "filterString", "filterMethod", "rootNodeData"])
], SlTree.prototype, "doFilter", 1);
__decorateClass([
  t()
], SlTree.prototype, "hasFooter", 2);
__decorateClass([
  watchProps(["nodeRender", "selectMode", "select_highlight", "checkedKeys"])
], SlTree.prototype, "watchNodeRenderChange", 1);
SlTree = __decorateClass([
  customStyle(),
  n("sl-tree")
], SlTree);
var tree_default = SlTree;
var parentSymobl = Symbol("parent");

export {
  tree_default
};
