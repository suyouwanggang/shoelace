import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass,
  __spreadValues
} from "./chunk.YTC2GCNT.js";

// src/components/org-node/org-node.ts
import { LitElement, html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property, queryAll } from "lit/decorators.js";

// src/components/org-node/org-node.styles.ts
import { css } from "lit";
var org_node_styles_default = css`
  ${component_styles_default}

  :host {
    display: block;
  }
`;

// src/components/org-node/org-node.ts
var defaultRoleRender = (data) => {
  return html`${JSON.stringify(data)}`;
};
var SlOrgNode = class extends LitElement {
  constructor() {
    super(...arguments);
    this.collapsable = true;
    this.expanded = true;
    this.nodeRender = defaultRoleRender;
  }
  createRenderRoot() {
    return this;
  }
  update(changeProperties) {
    super.update(changeProperties);
    if (changeProperties.has("expanded")) {
      if (this.expanded) {
        this.classList.remove("collapsed");
      } else {
        this.classList.add("collapsed");
      }
    }
  }
  render() {
    const isLeaf = this.isLeaf;
    return html`
      <div class="org-tree-node-label " part="org-tree-node-label">
        <div class="org-tree-node-label-inner ${this.styleClass ? this.styleClass : ""}" @click=${this.onNodeClick}>
          ${this.nodeRender(this.nodeData)} ${!isLeaf && this.collapsable ? html`<span class="org-tree-node-btn ${this.expanded ? "expanded" : ""}" @click=${this.onToogleNode}></span>` : ""}
        </div>
      </div>
      ${!isLeaf && this.expanded ? html`<div class="org-tree-node-children">${this._renderChildNode()}</div>` : ""}
    `;
  }
  onNodeClick() {
    this._emitEvent("sl-node-click");
  }
  _emitEvent(eventName, options) {
    return emit(this, eventName, { detail: __spreadValues({ nodeData: this.nodeData }, options) });
  }
  onToogleNode(event) {
    event.stopPropagation();
    const beforeEvent = this._emitEvent("sl-node-before-toogle", { cancelable: true });
    if (!beforeEvent.defaultPrevented) {
      this.expanded = !this.expanded;
      this.nodeData.expanded = this.expanded;
      this._emitEvent("sl-node-toogle");
      this._emitEvent("node-toogle");
    }
  }
  _renderChildNode() {
    const result = [];
    if (this.nodeData.children) {
      const child = this.nodeData.children;
      for (let i = 0, j = child.length; i < j; i++) {
        const subNode = child[i];
        const expanded = typeof subNode.expanded == "undefined" ? true : subNode.expanded;
        const collapsible = typeof subNode.collapsible == "undefined" ? true : subNode.collapsible;
        const classObj = {
          "is-leaf": !(subNode.children && subNode.children.length > 0),
          "only-one": child.length == 1,
          "org-tree-node": true
        };
        result.push(html`<sl-org-node class=${classMap(classObj)} .nodeRender=${this.nodeRender} .nodeData=${subNode} .expanded=${expanded} .collapsible=${collapsible}></sl-org-node>`);
      }
    }
    return result;
  }
  get isLeaf() {
    return this._childNodeSize == 0;
  }
  get _childNodeSize() {
    return this.nodeData && this.nodeData.children ? this.nodeData.children.length : 0;
  }
};
SlOrgNode.styles = org_node_styles_default;
__decorateClass([
  property({ type: Object })
], SlOrgNode.prototype, "nodeData", 2);
__decorateClass([
  property({ type: Boolean, attribute: true })
], SlOrgNode.prototype, "collapsable", 2);
__decorateClass([
  property({ type: String })
], SlOrgNode.prototype, "styleClass", 2);
__decorateClass([
  property({ type: Boolean })
], SlOrgNode.prototype, "expanded", 2);
__decorateClass([
  property({ type: Object })
], SlOrgNode.prototype, "nodeRender", 2);
__decorateClass([
  queryAll("sl-org-node")
], SlOrgNode.prototype, "subOrgNodes", 2);
SlOrgNode = __decorateClass([
  customElement("sl-org-node")
], SlOrgNode);
var org_node_default = SlOrgNode;

export {
  defaultRoleRender,
  org_node_default
};
