import {
  button_styles_default
} from "./chunk.TXVNNSZT.js";
import {
  hasSlot
} from "./chunk.IBDZI3K2.js";
import {
  l
} from "./chunk.4G2WRC2L.js";
import {
  o
} from "./chunk.FJILP5GU.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  i,
  n,
  t
} from "./chunk.DIDDF23Y.js";
import {
  p,
  s
} from "./chunk.AXN6W67E.js";
import {
  __decorateClass
} from "./chunk.THXBF3MO.js";

// src/components/button/button.ts
var SlButton = class extends s {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.hasLabel = false;
    this.hasPrefix = false;
    this.hasSuffix = false;
    this.type = "default";
    this.size = "medium";
    this.caret = false;
    this.rippleed = true;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.submit = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange();
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  handleSlotChange() {
    this.hasLabel = hasSlot(this);
    this.hasPrefix = hasSlot(this, "prefix");
    this.hasSuffix = hasSlot(this, "suffix");
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  render() {
    const isLink = this.href ? true : false;
    const interior = p`
      <span part="prefix" class="button__prefix">
        <slot @slotchange=${this.handleSlotChange} name="prefix"></slot>
      </span>
      <span part="label" class="button__label">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </span>
      <span part="suffix" class="button__suffix">
        <slot @slotchange=${this.handleSlotChange} name="suffix"></slot>
      </span>
      ${this.caret ? p`
            <span part="caret" class="button__caret">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          ` : ""}
      ${this.loading ? p`<sl-spinner></sl-spinner>` : ""}
    `;
    return isLink ? p`
          <a
            ref=${(el) => this.button = el}
            part="base"
            class=${o({
      button: true,
      "button--default": this.type === "default",
      "button--primary": this.type === "primary",
      "button--success": this.type === "success",
      "button--neutral": this.type === "neutral",
      "button--warning": this.type === "warning",
      "button--danger": this.type === "danger",
      "button--text": this.type === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--has-label": this.hasLabel,
      "button--has-prefix": this.hasPrefix,
      "button--has-suffix": this.hasSuffix
    })}
            href=${l(this.href)}
            target=${l(this.target)}
            download=${l(this.download)}
            rel=${l(this.target ? "noreferrer noopener" : void 0)}
            role="button"
            aria-disabled=${this.disabled ? "true" : "false"}
            tabindex=${this.disabled ? "-1" : "0"}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @click=${this.handleClick}
          >
            <sl-ripple part="ripple" centered overlay .target=${this} ?disabled=${this.disabled || this.type == "text" || !this.rippleed}></sl-ripple>
            ${interior}
          </a>
        ` : p`
          <button
            part="base"
            class=${o({
      button: true,
      "button--default": this.type === "default",
      "button--primary": this.type === "primary",
      "button--success": this.type === "success",
      "button--neutral": this.type === "neutral",
      "button--warning": this.type === "warning",
      "button--danger": this.type === "danger",
      "button--text": this.type === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--has-label": this.hasLabel,
      "button--has-prefix": this.hasPrefix,
      "button--has-suffix": this.hasSuffix
    })}
            ?disabled=${this.disabled}
            type=${this.submit ? "submit" : "button"}
            name=${l(this.name)}
            value=${l(this.value)}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @click=${this.handleClick}
          >
            <sl-ripple part="ripple" centered overlay .target=${this} ?disabled=${this.disabled || this.type == "text" || !this.rippleed}></sl-ripple>
            ${interior}
          </button>
        `;
  }
};
SlButton.styles = button_styles_default;
__decorateClass([
  i(".button")
], SlButton.prototype, "button", 2);
__decorateClass([
  t()
], SlButton.prototype, "hasFocus", 2);
__decorateClass([
  t()
], SlButton.prototype, "hasLabel", 2);
__decorateClass([
  t()
], SlButton.prototype, "hasPrefix", 2);
__decorateClass([
  t()
], SlButton.prototype, "hasSuffix", 2);
__decorateClass([
  e({ reflect: true })
], SlButton.prototype, "type", 2);
__decorateClass([
  e({ reflect: true })
], SlButton.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "caret", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "rippleed", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "loading", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "outline", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "pill", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "circle", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlButton.prototype, "submit", 2);
__decorateClass([
  e()
], SlButton.prototype, "name", 2);
__decorateClass([
  e()
], SlButton.prototype, "value", 2);
__decorateClass([
  e()
], SlButton.prototype, "href", 2);
__decorateClass([
  e()
], SlButton.prototype, "target", 2);
__decorateClass([
  e()
], SlButton.prototype, "download", 2);
SlButton = __decorateClass([
  n("sl-button")
], SlButton);

export {
  SlButton
};
