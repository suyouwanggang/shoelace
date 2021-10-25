import {
  animated_image_styles_default
} from "./chunk.LSVKN2G6.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  __decorateClass
} from "./chunk.G5Q3RJKK.js";

// src/components/animated-image/animated-image.ts
import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
var SlAnimatedImage = class extends LitElement {
  constructor() {
    super(...arguments);
    this.isLoaded = false;
  }
  handleClick() {
    this.play = !this.play;
  }
  handleLoad() {
    const canvas = document.createElement("canvas");
    const { width, height } = this.animatedImage;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(this.animatedImage, 0, 0, width, height);
    this.frozenFrame = canvas.toDataURL("image/gif");
    if (!this.isLoaded) {
      emit(this, "sl-load");
      this.isLoaded = true;
    }
  }
  handleError() {
    emit(this, "sl-error");
  }
  async handlePlayChange() {
    if (this.play) {
      this.animatedImage.src = "";
      this.animatedImage.src = this.src;
    }
  }
  handleSrcChange() {
    this.isLoaded = false;
  }
  render() {
    return html`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play ? "false" : "true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded ? html`
              <img class="animated-image__frozen" src=${this.frozenFrame} alt=${this.alt} aria-hidden=${this.play ? "true" : "false"} @click=${this.handleClick} />

              <div part="control-box" class="animated-image__control-box">
                ${this.play ? html`<sl-icon part="pause-icon" name="pause-fill" library="system"></sl-icon>` : html`<sl-icon part="play-icon" name="play-fill" library="system"></sl-icon>`}
              </div>
            ` : ""}
      </div>
    `;
  }
};
SlAnimatedImage.styles = animated_image_styles_default;
__decorateClass([
  state()
], SlAnimatedImage.prototype, "frozenFrame", 2);
__decorateClass([
  state()
], SlAnimatedImage.prototype, "isLoaded", 2);
__decorateClass([
  query(".animated-image__animated")
], SlAnimatedImage.prototype, "animatedImage", 2);
__decorateClass([
  property()
], SlAnimatedImage.prototype, "src", 2);
__decorateClass([
  property()
], SlAnimatedImage.prototype, "alt", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlAnimatedImage.prototype, "play", 2);
__decorateClass([
  watch("play")
], SlAnimatedImage.prototype, "handlePlayChange", 1);
__decorateClass([
  watch("src")
], SlAnimatedImage.prototype, "handleSrcChange", 1);
SlAnimatedImage = __decorateClass([
  customElement("sl-animated-image")
], SlAnimatedImage);

export {
  SlAnimatedImage
};
