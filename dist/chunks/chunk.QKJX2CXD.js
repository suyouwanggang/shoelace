import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.L3YJYC74.js";
import {
  __decorateClass
} from "./chunk.YTC2GCNT.js";

// src/components/mutation-observer/mutation-observer.ts
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// src/components/mutation-observer/mutation-observer.styles.ts
import { css } from "lit";
var mutation_observer_styles_default = css`
  ${component_styles_default}

  :host {
    display: contents;
  }
`;

// src/components/mutation-observer/mutation-observer.ts
var SlMutationObserver = class extends LitElement {
  constructor() {
    super(...arguments);
    this.attrOldValue = false;
    this.charData = false;
    this.charDataOldValue = false;
    this.childList = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleMutation = this.handleMutation.bind(this);
    this.mutationObserver = new MutationObserver(this.handleMutation);
    if (!this.disabled) {
      this.startObserver();
    }
  }
  disconnectedCallback() {
    this.stopObserver();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  handleChange() {
    this.stopObserver();
    this.startObserver();
  }
  handleMutation(mutationList) {
    emit(this, "sl-mutation", {
      detail: { mutationList }
    });
  }
  startObserver() {
    try {
      this.mutationObserver.observe(this, {
        subtree: true,
        childList: this.childList,
        attributes: typeof this.attr === "string",
        attributeFilter: typeof this.attr === "string" && this.attr.length > 0 ? this.attr.split(" ") : void 0,
        attributeOldValue: this.attrOldValue,
        characterData: this.charData,
        characterDataOldValue: this.charDataOldValue
      });
    } catch (e) {
    }
  }
  stopObserver() {
    this.mutationObserver.disconnect();
  }
  render() {
    return html` <slot></slot> `;
  }
};
SlMutationObserver.styles = mutation_observer_styles_default;
__decorateClass([
  property({ reflect: true })
], SlMutationObserver.prototype, "attr", 2);
__decorateClass([
  property({ attribute: "attr-old-value", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "attrOldValue", 2);
__decorateClass([
  property({ attribute: "char-data", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "charData", 2);
__decorateClass([
  property({ attribute: "char-data-old-value", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "charDataOldValue", 2);
__decorateClass([
  property({ attribute: "child-list", type: Boolean, reflect: true })
], SlMutationObserver.prototype, "childList", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlMutationObserver.prototype, "disabled", 2);
__decorateClass([
  watch("disabled")
], SlMutationObserver.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("attr", { waitUntilFirstUpdate: true }),
  watch("attr-old-value", { waitUntilFirstUpdate: true }),
  watch("char-data", { waitUntilFirstUpdate: true }),
  watch("char-data-old-value", { waitUntilFirstUpdate: true }),
  watch("childList", { waitUntilFirstUpdate: true })
], SlMutationObserver.prototype, "handleChange", 1);
SlMutationObserver = __decorateClass([
  customElement("sl-mutation-observer")
], SlMutationObserver);
var mutation_observer_default = SlMutationObserver;

export {
  mutation_observer_default
};
