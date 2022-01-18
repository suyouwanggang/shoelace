import {
  tree_styles_default
} from "./chunk.K52YNO6R.js";
import {
  tree_node_styles_default
} from "./chunk.4N5NQDJF.js";
import {
  DEFAULT_TREE_FILTER,
  DEFAULT_TREE_NODE_RENDER,
  cloneTreeNodeData,
  iteratorNodeData
} from "./chunk.QGOQG2WH.js";
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
  a,
  p,
  s as s2,
  u,
  v
} from "./chunk.3XFCWXBE.js";
import {
  hasSlot
} from "./chunk.RBDNGYR3.js";
import {
  dist_exports
} from "./chunk.N5C73X5E.js";
import {
  o
} from "./chunk.S5EDDKFM.js";
import {
  animateTo,
  animate_hide,
  animate_show,
  shimKeyframesHeightAuto
} from "./chunk.R4MROFKW.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  getCssValue,
  onEvent
} from "./chunk.3SJG5WV3.js";
import {
  e as e2,
  i as i2
} from "./chunk.2JQPDYNA.js";
import {
  e,
  i,
  n,
  t
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s,
  w,
  x
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// node_modules/lit-html/directives/cache.js
var d = e2(class extends i2 {
  constructor(t2) {
    super(t2), this.tt = /* @__PURE__ */ new WeakMap();
  }
  render(t2) {
    return [t2];
  }
  update(s3, [e3]) {
    if (v(this.it) && (!v(e3) || this.it.strings !== e3.strings)) {
      const e4 = a(s3).pop();
      let o2 = this.tt.get(this.it.strings);
      if (o2 === void 0) {
        const s4 = document.createDocumentFragment();
        o2 = x(w, s4), o2.setConnected(false), this.tt.set(this.it.strings, o2);
      }
      s2(o2, [e4]), u(o2, void 0, e4);
    }
    if (v(e3)) {
      if (!v(this.it) || this.it.strings !== e3.strings) {
        const t2 = this.tt.get(e3.strings);
        if (t2 !== void 0) {
          const i3 = a(t2).pop();
          p(s3), u(s3, void 0, i3), s2(s3, [i3]);
        }
      }
      this.it = e3;
    } else
      this.it = void 0;
    return this.render(e3);
  }
});

// src/directives/hideOrShowAnimate.ts
var transitionDuration = 300;
var requestNextFrame = (resovle) => {
  return new Promise(() => {
    requestAnimationFrame(resovle);
  });
};
var doHideAnimate = (element, options, resovle) => {
  var _a;
  const currentHeight = parseInt(getCssValue(element, "height"));
  const div = document.createElement("div");
  div.style.height = currentHeight + "px";
  div.style.width = parseInt(getCssValue(element, "width")) + "px";
  (_a = element.parentElement) == null ? void 0 : _a.insertBefore(div, element);
  animateTo(element, shimKeyframesHeightAuto(animate_hide, currentHeight), {
    easing: options.easing ? options.easing : "ease",
    duration: options && options.duration ? options.duration : transitionDuration
  }).then(() => {
    requestAnimationFrame(() => {
      var _a2;
      (_a2 = element.parentElement) == null ? void 0 : _a2.removeChild(div);
      emitEvent(element);
      resovle ? resovle() : null;
    });
  });
};
var doShowAnimate = (element, options, resovle) => {
  var _a;
  const currentHeight = parseInt(getCssValue(element, "height"));
  const div = document.createElement("div");
  div.style.height = currentHeight + "px";
  div.style.width = parseInt(getCssValue(element, "width")) + "px";
  (_a = element.parentElement) == null ? void 0 : _a.insertBefore(div, element);
  animateTo(element, shimKeyframesHeightAuto(animate_show, currentHeight), {
    duration: options && options.duration ? options.duration : transitionDuration
  }).then(() => {
    var _a2;
    (_a2 = element.parentElement) == null ? void 0 : _a2.removeChild(div);
    emitEvent(element);
    resovle ? resovle() : null;
  });
};
var emitEvent = (el) => {
  el.dispatchEvent(new CustomEvent("sl-animate-complete"));
};
var HideDirective = class extends i2 {
  render(_option = {}) {
    return w;
  }
  update(_part, [_option]) {
    requestNextFrame(() => {
      const element = _part.element;
      doHideAnimate(element, {
        easing: _option && _option.easing ? _option.easing : "ease",
        duration: _option && _option.duration ? _option.duration : transitionDuration
      }, () => {
        var _a;
        if (_option && _option.onComplete) {
          _option.onComplete(element);
        }
        if (_option && (_option == null ? void 0 : _option.hideRemove)) {
          (_a = element.parentElement) == null ? void 0 : _a.removeChild(element);
        }
      });
    });
    return w;
  }
};
var ShowDirective = class extends i2 {
  render(_option) {
    return w;
  }
  update(_part, [_option]) {
    requestNextFrame(() => {
      const element = _part.element;
      doShowAnimate(element, {
        duration: _option && _option.duration ? _option.duration : transitionDuration
      }, () => {
        if (_option && _option.onComplete) {
          _option.onComplete(element);
        }
      });
    });
    return w;
  }
};
var AnimateDirective = class extends i2 {
  render(_option) {
    return w;
  }
  update(_part, [_option]) {
    if (!_option || !_option.name) {
      return w;
    }
    requestNextFrame(() => {
      const element = _part.element;
      let frames = dist_exports[_option.name];
      if (!frames) {
        return w;
      }
      animateTo(element, dist_exports[_option.name], {
        easing: _option && _option.easing ? _option.easing : "ease",
        duration: _option && _option.duration ? _option.duration : transitionDuration
      }).then(() => {
        emitEvent(element);
        if (_option && _option.onComplete) {
          _option.onComplete(element);
        }
      });
      return w;
    });
    return w;
  }
};
var hide = e2(HideDirective);
var show = e2(ShowDirective);
var doAnimate = e2(AnimateDirective);

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
      const matchNodeSet = /* @__PURE__ */ new Set();
      const hightLightNodeSet = this.matchFilterNodeSet = /* @__PURE__ */ new Set();
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
      const nodeCacheMap = this.nodeCacheMap = /* @__PURE__ */ new WeakMap();
      nodeCacheMap.set(cloneRootData, rootNodeData);
      const nodeFilterCacheMap = this.nodeFilterCacheMap = /* @__PURE__ */ new WeakMap();
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
        for (let i3 = 0, j = rootNodeData.children.length; i3 < j; i3++) {
          iteratorNodeData(rootNodeData.children[i3], nodeVistor2, rootNodeData, i3);
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
      return $`<slot name="no-data"></slot>`;
    } else {
      if (this.includeRoot) {
        return this.renderNodeDataTemplate(this.renderRootNodeData, 0);
      } else {
        const children = this.renderRootNodeData.children;
        return children ? children.map((item, index) => this.renderNodeDataTemplate(item, index, this.renderRootNodeData)) : w;
      }
    }
  }
  renderNodeDataTemplate(data, index, parentData) {
    const tree = this;
    return $`<sl-tree-node .customStyle=${this.customStyle} .tree=${tree} .nodeData=${data} index=${index} .parentNodeData=${parentData} .nodeRender=${this.real_treeNodeRender}></sl-tree-node>`;
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
    return $`<div part="base" class=${o(baseClass)}>
      ${this.enableFilter ? $`<div part="filter">
            <slot name="filter"> <sl-input part="filter-input" .placeholder=${this.filterInputPlaceholder} @sl-input=${this.inputFilterHanlder} .value=${String(this.filterString)}></sl-input></slot>
          </div>` : ""}
      <div part="tree-body">${this.renderAllTreeNode()}</div>
      <div part="tree-footer"><slot name="footer" @slotchange=${this.slotChangeHandler}></slot></div>
      ${this.loading ? $`<div class="modal" part="modal">
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
        array.push($`<sl-checkbox
            .disabled=${Boolean(node.disable)}
            .nodeData=${node}
            @sl-change=${this.handerCheckEvent}
            class="selectCheckbox"
            .checked=${typeof node[this.nodeIDProperty] != "undefined" && this.checkedKeys.includes(node[this.nodeIDProperty])}
            >${result}</sl-checkbox
          >`);
      } else if (this.selectMode == "radio") {
        array.push($`<sl-radio
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
      return $`<div part="select-part" @click=${handerNodeSelect}>${array}</div>`;
    };
  }
  getClosetTreeNode(el) {
    if (el.getRootNode() == document) {
      throw new Error("el should  in tree ShadowRoot !");
    }
    if (el instanceof SlTreeNode) {
      return el;
    } else {
      let root = el.getRootNode();
      let temp;
      while (root != null) {
        temp = root.host;
        if (temp instanceof SlTreeNode) {
          return temp;
        }
        root = temp.getRootNode();
      }
    }
    return null;
  }
};
SlTree.styles = tree_styles_default;
SlTree.TREE_NODE_ICON_LIBARARY = "system";
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
var parentSymobl = Symbol("parent");

// src/components/tree-node/tree-node.ts
var SlTreeNode = class extends s {
  constructor() {
    super(...arguments);
    this.nodeRender = DEFAULT_TREE_NODE_RENDER;
  }
  _watchOnSetNodeData() {
    if (this.nodeData) {
      if (typeof this.nodeData.close == "undefined") {
        this.nodeData.close = true;
      }
      if (typeof this.nodeData.closeable == "undefined") {
        this.nodeData.closeable = true;
      }
    }
  }
  renderChildren() {
    var _a, _b;
    let levelStr = this.getAttribute("level");
    let level = 1;
    if (levelStr) {
      level = parseInt(levelStr, 10) + 1;
    }
    return $`${!this.isClose ? d((_b = (_a = this.nodeData) == null ? void 0 : _a.children) == null ? void 0 : _b.map((data, index) => {
      return $`<sl-tree-node
              .nodeData=${data}
              .parentNodeData=${this.nodeData}
              .customStyle=${this.customStyle}
              .nodeRender=${this.nodeRender}
              .tree=${this.tree}
              index=${index}
              level=${level + ""}
              style="--sl-node-level:${level}"
            ></sl-tree-node>`;
    })) : ""}`;
  }
  get subChildSize() {
    return this.nodeData && this.nodeData.children ? this.nodeData.children.length : 0;
  }
  get isClose() {
    return this.nodeData && this.nodeData.close;
  }
  isTreeNodeSelected() {
    let tree = this.tree;
    if (tree && this.nodeData) {
      let idKey = this.nodeData[tree.nodeIDProperty];
      if (tree.selectMode == "single" && tree.checkedKeys == idKey) {
        return true;
      }
      if (tree.select_highlight && tree.selectMode != "none") {
        if (Array.isArray(tree.checkedKeys)) {
          return tree.checkedKeys.includes(idKey);
        } else {
          return tree.checkedKeys == idKey;
        }
      }
    }
    return false;
  }
  render() {
    if (!this.nodeData) {
      return w;
    }
    return $`<div part="base">
      <div part="node" ?disabled=${Boolean(this.nodeData.disable)} ?selected=${this.isTreeNodeSelected()}>${this.renderNodeData()}</div>
      <div part="children" class="${this.isClose ? "close" : "open"}">${this.renderChildren()}</div>
    </div>`;
  }
  emitEvent(eventType, event) {
    return emit(this, eventType, {
      cancelable: true,
      detail: {
        nodeData: this.nodeData,
        node: event.target.getRootNode().host
      }
    });
  }
  async _clickTrigerHander(event) {
    if (this.subChildSize > 0) {
      let isClosed = this.isClose;
      let children = this.renderRoot.querySelector("div[part=children]");
      let custEvent = this.emitEvent(`sl-node-before-${isClosed ? "open" : "close"}`, event);
      let custToogleEvent = this.emitEvent(`sl-node-before-toogle`, event);
      if (!custEvent.defaultPrevented && !custToogleEvent.defaultPrevented) {
        if (!isClosed) {
          children.getAnimations().forEach((animateItem) => animateItem.cancel());
          requestNextFrame(() => {
            animateTo(children, shimKeyframesHeightAuto(animate_hide, parseInt(getCssValue(children, "height"))), {
              duration: SlTreeNode.ANIMATE_duration,
              easing: SlTreeNode.ANIMATE_easing
            }).then(() => {
              children.classList.add("close");
              this.setNodeDataProperty("close", !isClosed);
            });
          });
        } else {
          this.setNodeDataProperty("close", !isClosed);
        }
        await this.updateComplete;
        if (isClosed) {
          children.getAnimations().forEach((animateItem) => animateItem.cancel());
          requestNextFrame(() => {
            animateTo(children, shimKeyframesHeightAuto(animate_show, parseInt(getCssValue(children, "height"))), {
              duration: SlTreeNode.ANIMATE_duration,
              easing: SlTreeNode.ANIMATE_easing
            });
          });
        }
        this.emitEvent(`sl-node-${isClosed ? "open" : "close"}`, event);
        this.emitEvent(`sl-node-toogle`, event);
      }
    }
  }
  renderNodeData() {
    const result = [];
    if (this.nodeData) {
      if (this.nodeData.closeable) {
        result.push($`<sl-icon
          @click=${this._clickTrigerHander}
          part="node_toogle_icon"
          class="trigger-status"
          ?empty=${this.subChildSize === 0}
          .name=${this.isClose ? SlTreeNode.NODE_CLOSE_ICON : SlTreeNode.NODE_OPEN_ICON}
        >
        </sl-icon>`);
      }
      if (this.nodeData.icon) {
        result.push($`<sl-icon class="node-icon" part="node-icon" name=${this.nodeData.icon} library=${SlTree.TREE_NODE_ICON_LIBARARY}> </sl-icon>`);
      }
      let indexStr = this.getAttribute("index");
      let index = 0;
      if (indexStr) {
        index = parseInt(indexStr, 10);
      }
      result.push($`<div part="node-span" @click=${this._clickNodeHandler}>${this.nodeRender.call(this, this.nodeData, index, this.parentNodeData)}</div>`);
    }
    return result;
  }
  _clickNodeHandler(event) {
    this.emitEvent("sl-node-click", event);
  }
  setNodeDataProperty(key, value) {
    this.nodeData[key] = value;
    this.requestUpdate();
  }
};
SlTreeNode.styles = tree_node_styles_default;
SlTreeNode.ANIMATE_duration = 300;
SlTreeNode.ANIMATE_easing = "ease";
SlTreeNode.NODE_OPEN_ICON = "caret-down-fill";
SlTreeNode.NODE_CLOSE_ICON = "caret-right";
__decorateClass([
  i("div[part=children]", true)
], SlTreeNode.prototype, "childTreeNodeElement", 2);
__decorateClass([
  i("div[part=node]", true)
], SlTreeNode.prototype, "treeNodeElement", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTreeNode.prototype, "nodeData", 2);
__decorateClass([
  watch("nodeData")
], SlTreeNode.prototype, "_watchOnSetNodeData", 1);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTreeNode.prototype, "tree", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlTreeNode.prototype, "nodeRender", 2);
SlTreeNode = __decorateClass([
  customStyle(),
  n("sl-tree-node")
], SlTreeNode);

export {
  hide,
  show,
  doAnimate,
  SlTreeNode,
  SlTree
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
