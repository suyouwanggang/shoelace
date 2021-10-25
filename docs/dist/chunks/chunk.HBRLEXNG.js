import {
  tree_node_styles_default
} from "./chunk.OUTPRWFX.js";
import {
  DEFAULT_TREE_NODE_RENDER
} from "./chunk.WRRDM7O2.js";
import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  animations
} from "./chunk.TJOP7HQP.js";
import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  animateTo,
  animate_hide,
  animate_show,
  shimKeyframesHeightAuto
} from "./chunk.UWBLHGHY.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/tree-node/tree-node.ts
import { html, LitElement, nothing as nothing2 } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { cache } from "lit/directives/cache.js";

// src/directives/hideOrShowAnimate.ts
import { nothing } from "lit";
import { directive, Directive } from "lit/directive.js";
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
var HideDirective = class extends Directive {
  render(_option = {}) {
    return nothing;
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
    return nothing;
  }
};
var ShowDirective = class extends Directive {
  render(_option) {
    return nothing;
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
    return nothing;
  }
};
var AnimateDirective = class extends Directive {
  render(_option) {
    return nothing;
  }
  update(_part, [_option]) {
    if (!_option || !_option.name) {
      return;
    }
    requestNextFrame(() => {
      const element = _part.element;
      let frames = animations[_option.name];
      if (!frames) {
        return;
      }
      animateTo(element, animations[_option.name], {
        easing: _option && _option.easing ? _option.easing : "ease",
        duration: _option && _option.duration ? _option.duration : transitionDuration
      }).then(() => {
        emitEvent(element);
        if (_option && _option.onComplete) {
          _option.onComplete(element);
        }
      });
    });
    return nothing;
  }
};
var hide = directive(HideDirective);
var show = directive(ShowDirective);
var doAnimate = directive(AnimateDirective);

// src/components/tree-node/tree-node.ts
var SlTreeNode = class extends LitElement {
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
    return html`${!this.isClose ? cache((_b = (_a = this.nodeData) == null ? void 0 : _a.children) == null ? void 0 : _b.map((data, index) => {
      return html`<sl-tree-node
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
      return nothing2;
    }
    return html`<div part="base">
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
        result.push(html`<sl-icon
          @click=${this._clickTrigerHander}
          part="node_toogle_icon"
          class="trigger-status"
          ?empty=${this.subChildSize === 0}
          .name=${this.isClose ? SlTreeNode.NODE_CLOSE_ICON : SlTreeNode.NODE_OPEN_ICON}
        >
        </sl-icon>`);
      }
      if (this.nodeData.icon) {
        result.push(html`<sl-icon class="node-icon" part="node-icon" name=${this.nodeData.icon} library="system"> </sl-icon>`);
      }
      let indexStr = this.getAttribute("index");
      let index = 0;
      if (indexStr) {
        index = parseInt(indexStr, 10);
      }
      result.push(html`<div part="node-span" @click=${this._clickNodeHandler}>${this.nodeRender.call(this, this.nodeData, index, this.parentNodeData)}</div>`);
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
  query("div[part=children]", true)
], SlTreeNode.prototype, "childTreeNodeElement", 2);
__decorateClass([
  query("div[part=node]", true)
], SlTreeNode.prototype, "treeNodeElement", 2);
__decorateClass([
  property({ type: Object, attribute: false })
], SlTreeNode.prototype, "nodeData", 2);
__decorateClass([
  watch("nodeData")
], SlTreeNode.prototype, "_watchOnSetNodeData", 1);
__decorateClass([
  property({ type: Object, attribute: false })
], SlTreeNode.prototype, "tree", 2);
__decorateClass([
  property({ type: Object, attribute: false })
], SlTreeNode.prototype, "nodeRender", 2);
SlTreeNode = __decorateClass([
  customStyle(),
  customElement("sl-tree-node")
], SlTreeNode);

export {
  hide,
  show,
  doAnimate,
  SlTreeNode
};
