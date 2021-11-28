import {
  getRouterByName
} from "./chunk.XUDVQGMP.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  n
} from "./chunk.OPP7P5NL.js";
import {
  p,
  s
} from "./chunk.5BL2X74K.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

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
var router_link_default = SlRouterLink;

export {
  router_link_default
};
