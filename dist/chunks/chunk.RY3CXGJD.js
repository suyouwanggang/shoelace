import {
  button_group_styles_default
} from "./chunk.7OPCTHCC.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/button-group/button-group.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
var SlButtonGroup = class extends LitElement {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--hover");
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.map((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button) {
        button.classList.add("sl-button-group__button");
        button.classList.toggle("sl-button-group__button--first", index === 0);
        button.classList.toggle("sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--last", index === slottedElements.length - 1);
      }
    });
  }
  render() {
    return html`
      <div part="base" class="button-group" role="group" aria-label=${this.label} @focusout=${this.handleBlur} @focusin=${this.handleFocus} @mouseover=${this.handleMouseOver} @mouseout=${this.handleMouseOut}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
SlButtonGroup.styles = button_group_styles_default;
__decorateClass([
  query("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  property()
], SlButtonGroup.prototype, "label", 2);
SlButtonGroup = __decorateClass([
  customElement("sl-button-group")
], SlButtonGroup);
function findButton(el) {
  return el.tagName.toLowerCase() === "sl-button" ? el : el.querySelector("sl-button");
}

export {
  SlButtonGroup
};
