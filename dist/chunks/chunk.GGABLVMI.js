import {
  getRouterByName
} from "./chunk.OURQ2I47.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  n
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/router/router-link.ts
var SlRouterLink = class extends s {
  constructor() {
    super(...arguments);
    this.external = false;
  }
  render() {
    return p`<a part="link" @click=${this.goToLink} .href=${this.src} .data=${this.data}><slot></slot></a>`;
  }
  get router() {
    return getRouterByName(this.routerName);
  }
  goToLink(event) {
    let linkEvent = emit(this, "sl-router-link-before", {
      cancelable: true
    });
    if (!linkEvent.defaultPrevented && !this.external) {
      event.preventDefault();
      const router = this.router;
      if (router && this.src) {
        router.toHashPath(this.src, this.data);
      }
    }
  }
};
__decorateClass([
  e()
], SlRouterLink.prototype, "src", 2);
__decorateClass([
  e({ attribute: false })
], SlRouterLink.prototype, "external", 2);
__decorateClass([
  e({ attribute: false })
], SlRouterLink.prototype, "routerName", 2);
__decorateClass([
  e({ type: Object, attribute: false })
], SlRouterLink.prototype, "data", 2);
SlRouterLink = __decorateClass([
  n("sl-router-link")
], SlRouterLink);

export {
  SlRouterLink
};
