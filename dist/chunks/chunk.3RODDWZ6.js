import {
  getRouterByName
} from "./chunk.GWBHNRJB.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/router/router-link.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
var SlRouterLink = class extends LitElement {
  constructor() {
    super(...arguments);
    this.external = false;
  }
  render() {
    return html`<a part="link" @click=${this.goToLink} .href=${this.src} .data=${this.data}><slot></slot></a>`;
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
  property()
], SlRouterLink.prototype, "src", 2);
__decorateClass([
  property({ attribute: false })
], SlRouterLink.prototype, "external", 2);
__decorateClass([
  property({ attribute: false })
], SlRouterLink.prototype, "routerName", 2);
__decorateClass([
  property({ type: Object, attribute: false })
], SlRouterLink.prototype, "data", 2);
SlRouterLink = __decorateClass([
  customElement("sl-router-link")
], SlRouterLink);
var router_link_default = SlRouterLink;

export {
  router_link_default
};
