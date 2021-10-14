import {
  DEFAULT_TREE_NODE_RENDER
} from "./chunk.KKWK7GGC.js";
import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  a,
  p,
  s,
  u,
  v
} from "./chunk.QBFDMKRB.js";
import {
  getCssValue
} from "./chunk.UYG3ZEVK.js";
import {
  animateTo,
  animate_hide,
  animate_show,
  shimKeyframesHeightAuto
} from "./chunk.BCX7WXWF.js";
import {
  dist_exports
} from "./chunk.SQ3D6D5F.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e as e2,
  i as i2
} from "./chunk.2JQPDYNA.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
import {
  e,
  i,
  n as n2
} from "./chunk.OPP7P5NL.js";
import {
  A,
  n,
  r,
  x,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// node_modules/lit-html/directives/cache.js
var d = e2(class extends i2 {
  constructor(t) {
    super(t), this.tt = new WeakMap();
  }
  render(t) {
    return [t];
  }
  update(s2, [e3]) {
    if (v(this.it) && (!v(e3) || this.it.strings !== e3.strings)) {
      const e4 = a(s2).pop();
      let o = this.tt.get(this.it.strings);
      if (o === void 0) {
        const s3 = document.createDocumentFragment();
        o = A(x, s3), o.setConnected(false), this.tt.set(this.it.strings, o);
      }
      s(o, [e4]), u(o, void 0, e4);
    }
    if (v(e3)) {
      if (!v(this.it) || this.it.strings !== e3.strings) {
        const t = this.tt.get(e3.strings);
        if (t !== void 0) {
          const i3 = a(t).pop();
          p(s2), u(s2, void 0, i3), s(s2, [i3]);
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
    return x;
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
    return x;
  }
};
var ShowDirective = class extends i2 {
  render(_option) {
    return x;
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
    return x;
  }
};
var AnimateDirective = class extends i2 {
  render(_option) {
    return x;
  }
  update(_part, [_option]) {
    if (!_option || !_option.name) {
      return;
    }
    requestNextFrame(() => {
      const element = _part.element;
      let frames = dist_exports[_option.name];
      if (!frames) {
        return;
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
    });
    return x;
  }
};
var hide = e2(HideDirective);
var show = e2(ShowDirective);
var doAnimate = e2(AnimateDirective);

// src/components/tree-node/index.style.litcss
var styles = r`@charset "UTF-8";:host{display:block}.trigger-status{display:inline-block;position:relative;margin-right:var(--sl-spacing-x-small);margin-left:var(--sl-spacing-x-small);font-size:var(--sl-node-trigger-size,12px);cursor:pointer}.trigger-status[empty]{cursor:default;opacity:0}.node-icon{position:relative;vertical-align:middle;top:var(--node-icon-top,0);color:var(--node-icon-color,inherit)}:host([selected]) div[part=node]{cursor:pointer}div[part=base]{white-space:nowrap}div[part=base] div[part=node]{display:flex;position:relative;align-items:center;padding:5px 0;padding-left:calc(var(--sl-node-level, 0) * 0.8em);transition:background-color ease .3ms}div[part=base] div[part=node] sl-icon[part=node-icon]{margin-right:var(--sl-spacing-2x-small)}div[part=base] div[part=node] div[part=node-span]{flex:1 1 auto}div[part=base] div[part=node][disabled]{opacity:.7;color:rgb var(--sl-color-gray-100)}div[part=base] div[part=node][disabled] div[part=node-span]{cursor:default}div[part=base] div[part=node][selected]{background-color:rgb(var(--sl-color-sky-200))}div[part=base] div[part=node][selected]::before{position:absolute;inset:0 auto 0 0;border-left:2px solid rgb(var(--sl-color-blue-500));content:""}div[part=base] div[part=node]:hover{background-color:rgb(var(--sl-color-sky-100))}div[part=base] div[part=node]:hover::before{position:absolute;inset:0 auto 0 0;border-left:2px solid rgb(var(--sl-color-blue-500));content:""}div[part=base] div[part=node]:hover[disabled]{background-color:rgb(var(--sl-color-gray-100))}div[part=base] div[part=node]:hover[disabled]::before{border-left:2px solid rgb(var(--sl-color-gray-500))}div[part=base] div[part=node][disabled] div[part=select-part]{cursor:default}div[part=base] div[part=node] div[part=select-part]{cursor:pointer}div[part=base] div[part=children]{display:block}div[part=base] div[part=children].close{display:none}`;
var index_style_default = styles;

// src/components/tree-node/tree-node.styles.ts
var tree_node_styles_default = r`
  ${component_styles_default}
  ${index_style_default}
`;

// src/components/tree-node/tree-node.ts
var SlTreeNode = class extends n {
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
    return y`${!this.isClose ? d((_b = (_a = this.nodeData) == null ? void 0 : _a.children) == null ? void 0 : _b.map((data, index) => {
      return y`<sl-tree-node
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
      return x;
    }
    return y`<div part="base">
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
        result.push(y`<sl-icon
          @click=${this._clickTrigerHander}
          part="node_toogle_icon"
          class="trigger-status"
          ?empty=${this.subChildSize === 0}
          .name=${this.isClose ? SlTreeNode.NODE_CLOSE_ICON : SlTreeNode.NODE_OPEN_ICON}
        >
        </sl-icon>`);
      }
      if (this.nodeData.icon) {
        result.push(y`<sl-icon class="node-icon" part="node-icon" name=${this.nodeData.icon} library="system"> </sl-icon>`);
      }
      let indexStr = this.getAttribute("index");
      let index = 0;
      if (indexStr) {
        index = parseInt(indexStr, 10);
      }
      result.push(y`<div part="node-span" @click=${this._clickNodeHandler}>${this.nodeRender.call(this, this.nodeData, index, this.parentNodeData)}</div>`);
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
  n2("sl-tree-node")
], SlTreeNode);
var tree_node_default = SlTreeNode;

export {
  hide,
  show,
  doAnimate,
  tree_node_default
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
