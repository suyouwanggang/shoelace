import {
  getRouterByName
} from "./chunk.YLPUMYB3.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass
} from "./chunk.FHAP4LMI.js";

// src/components/router/router-link.ts
var SlRouterLink = class extends s {
  constructor() {
    super(...arguments);
    this.external = false;
  }
  render() {
    return $`<a part="link" @click=${this.goToLink} .href=${this.src} .data=${this.data}><slot></slot></a>`;
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
