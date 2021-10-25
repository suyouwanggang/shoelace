import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  defaultRoleRender
} from "./chunk.FF55DPWK.js";
import {
  org_tree_styles_default
} from "./chunk.N23VIZRN.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/org-tree/org-tree.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
var SlOrgTree = class extends LitElement {
  constructor() {
    super(...arguments);
    this.center = true;
    this.horizontal = false;
    this.nodeRender = defaultRoleRender;
  }
  render() {
    const tree = this;
    return html`<div class="org-tree-container " id="container" part="container">
      <div class="org-tree collapsable ${this.horizontal ? "horizontal" : ""}" part="tree">
        ${this.rootData ? html`<sl-org-node
              id="root"
              class="org-tree-node"
              .style=${this.horizontal ? "display:table" : ""}
              .nodeData=${this.rootData}
              .tree=${tree}
              .nodeRender=${this.nodeRender}
              .expanded=${this.rootData ? Boolean(this.rootData.expanded) : true}
              .collapsable=${this.rootData ? Boolean(this.rootData.collapsable) : true}
              @sl-node-click=${this.handNodeEvent}
              @sl-node-toogle=${this.handNodeEvent}
              @sl-node-before-toogle=${this.handNodeEvent}
            ></sl-org-node>` : null}
      </div>
    </div> `;
  }
  handNodeEvent(event) {
    if (!event.defaultPrevented) {
      const node = event.target;
      const eventType = `sl-org-tree-${event.type.replace("sl-", "")}`;
      console.log(eventType);
      emit(this, eventType, {
        detail: {
          node,
          nodeData: node.nodeData
        }
      });
    }
  }
};
SlOrgTree.styles = org_tree_styles_default;
__decorateClass([
  property({ type: Object })
], SlOrgTree.prototype, "rootData", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlOrgTree.prototype, "center", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlOrgTree.prototype, "horizontal", 2);
__decorateClass([
  property({ type: Object })
], SlOrgTree.prototype, "nodeRender", 2);
__decorateClass([
  query("#container")
], SlOrgTree.prototype, "containerEl", 2);
__decorateClass([
  query("#root", true)
], SlOrgTree.prototype, "rootNode", 2);
SlOrgTree = __decorateClass([
  customStyle(),
  customElement("sl-org-tree")
], SlOrgTree);

export {
  SlOrgTree
};
