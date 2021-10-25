import {
  customStyle
} from "./chunk.AWEQNTTU.js";
import {
  defaultRoleRender
} from "./chunk.TY3MYZPV.js";
import {
  org_tree_styles_default
} from "./chunk.SZYHUPRP.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  i,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/org-tree/org-tree.ts
var SlOrgTree = class extends s {
  constructor() {
    super(...arguments);
    this.center = true;
    this.horizontal = false;
    this.nodeRender = defaultRoleRender;
  }
  render() {
    const tree = this;
    return p`<div class="org-tree-container " id="container" part="container">
      <div class="org-tree collapsable ${this.horizontal ? "horizontal" : ""}" part="tree">
        ${this.rootData ? p`<sl-org-node
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
  e({ type: Object })
], SlOrgTree.prototype, "rootData", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlOrgTree.prototype, "center", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlOrgTree.prototype, "horizontal", 2);
__decorateClass([
  e({ type: Object })
], SlOrgTree.prototype, "nodeRender", 2);
__decorateClass([
  i("#container")
], SlOrgTree.prototype, "containerEl", 2);
__decorateClass([
  i("#root", true)
], SlOrgTree.prototype, "rootNode", 2);
SlOrgTree = __decorateClass([
  customStyle(),
  n("sl-org-tree")
], SlOrgTree);

export {
  SlOrgTree
};
