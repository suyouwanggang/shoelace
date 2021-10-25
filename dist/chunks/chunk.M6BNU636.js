import {
  image_comparer_styles_default
} from "./chunk.KGE47RSI.js";
import {
  clamp
} from "./chunk.T56CG5BM.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/image-comparer/image-comparer.ts
import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
var SlImageComparer = class extends LitElement {
  constructor() {
    super(...arguments);
    this.position = 50;
  }
  handleDrag(event) {
    const { width } = this.base.getBoundingClientRect();
    function drag(event2, container, onMove) {
      const move = (event3) => {
        const dims = container.getBoundingClientRect();
        const defaultView = container.ownerDocument.defaultView;
        const offsetX = dims.left + defaultView.pageXOffset;
        const offsetY = dims.top + defaultView.pageYOffset;
        const x = (event3.changedTouches ? event3.changedTouches[0].pageX : event3.pageX) - offsetX;
        const y = (event3.changedTouches ? event3.changedTouches[0].pageY : event3.pageY) - offsetY;
        onMove(x, y);
      };
      move(event2);
      const stop = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("mouseup", stop);
        document.removeEventListener("touchend", stop);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("touchmove", move);
      document.addEventListener("mouseup", stop);
      document.addEventListener("touchend", stop);
    }
    event.preventDefault();
    drag(event, this.base, (x) => {
      this.position = Number(clamp(x / width * 100, 0, 100).toFixed(2));
    });
  }
  handleKeyDown(event) {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPosition = this.position;
      event.preventDefault();
      if (event.key === "ArrowLeft")
        newPosition = newPosition - incr;
      if (event.key === "ArrowRight")
        newPosition = newPosition + incr;
      if (event.key === "Home")
        newPosition = 0;
      if (event.key === "End")
        newPosition = 100;
      newPosition = clamp(newPosition, 0, 100);
      this.position = newPosition;
    }
  }
  handlePositionChange() {
    emit(this, "sl-change");
  }
  render() {
    return html`
      <div part="base" class="image-comparer" @keydown=${this.handleKeyDown}>
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div part="after" class="image-comparer__after" style=${styleMap({ clipPath: `inset(0 ${100 - this.position}% 0 0)` })}>
            <slot name="after"></slot>
          </div>
        </div>

        <div part="divider" class="image-comparer__divider" style=${styleMap({ left: this.position + "%" })} @mousedown=${this.handleDrag} @touchstart=${this.handleDrag}>
          <div part="handle" class="image-comparer__handle" role="scrollbar" aria-valuenow=${this.position} aria-valuemin="0" aria-valuemax="100" tabindex="0">
            <slot name="handle-icon">
              <sl-icon class="image-comparer__handle-icon" name="grip-vertical" library="system"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `;
  }
};
SlImageComparer.styles = image_comparer_styles_default;
__decorateClass([
  query(".image-comparer")
], SlImageComparer.prototype, "base", 2);
__decorateClass([
  query(".image-comparer__handle")
], SlImageComparer.prototype, "handle", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], SlImageComparer.prototype, "position", 2);
__decorateClass([
  watch("position", { waitUntilFirstUpdate: true })
], SlImageComparer.prototype, "handlePositionChange", 1);
SlImageComparer = __decorateClass([
  customElement("sl-image-comparer")
], SlImageComparer);

export {
  SlImageComparer
};
