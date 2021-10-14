import {
  addResizeHander
} from "./chunk.TOSAMJIL.js";
import {
  addEvent,
  exitFullscreen,
  fullscreen,
  getCssValue,
  isFullscreen
} from "./chunk.UYG3ZEVK.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  component_styles_default
} from "./chunk.P6HXIBIO.js";
import {
  e,
  n as n2,
  t
} from "./chunk.OPP7P5NL.js";
import {
  b,
  n,
  r,
  x,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass
} from "./chunk.QRXTBWFL.js";

// src/components/gallery/index.litcss
var styles = r`@charset "UTF-8";:host{display:block;position:relative;--thumb-image-size:100px;--sl-image-transition-time:450ms}.full-screen.bottom .images,.full-screen.top .images{max-height:calc(100vh - var(--thumb-image-size))}.full-screen img.image-gallery-image{object-fit:contain}.full-screen.left,.full-screen.right{max-height:100vh}.base{position:relative;display:flex}.base .images{flex:1 0 auto;position:relative;order:0}.base .thumbs{z-index:1;flex:0 0 auto;order:1;overflow:hidden}.base.top .thumbs{order:0}.base.top .images{order:1}.base.bottom,.base.top{flex-direction:column}.base.left,.base.right{flex-direction:row;overflow:hidden}.base.right .thumbs,.base.left .thumbs{order:0;margin:0 4px;flex-basis:var(--thumb-image-size)}.base.right .thumb-image-conatainer,.base.left .thumb-image-conatainer{height:10px;display:flex;justify-content:center;flex-direction:column}.base.right .images,.base.left .images{order:1;flex-basis:calc(100% - var(--thumb-image-size))}.base.right.right .images,.base.left.right .images{order:0}.base.right.right .thumbs,.base.left.right .thumbs{order:1}::slotted(*){position:absolute;color:#FFF;top:10px;right:10px}.nav-button{position:absolute;padding:20px 10px;transition-property:color;color:#fff;transition:all .3s ease-out;appearance:none;background-color:transparent;border:0;cursor:pointer;outline:0;z-index:4;filter:drop-shadow(0 2px 2px #1a1a1a)}.nav-button svg{fill:none;stroke:currentcolor;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;height:120px;width:60px}.nav-button.left-nav{top:50%;transform:translateY(-50%);left:0}.nav-button.right-nav{right:0;top:50%;transform:translateY(-50%)}.nav-button.button-pauseButton{bottom:0;left:0;padding:10px}.nav-button.button-pauseButton svg{height:30px;width:30px}.nav-button.button-fullscreen{bottom:0;right:0;padding:10px}.nav-button.button-fullscreen svg{height:30px;width:30px}.nav-button:hover{color:rgb(var(--sl-color-primary-500))}.nav-button:hover .image-gallery-svg{transform:scale(1.1)}div[part=image-exta]{position:absolute;top:12px;line-height:1em;padding-left:5px;color:#FFF}.thumb-button{display:inline-block;cursor:pointer;background-color:transparent;border:4px solid transparent;transition:border var(--sl-image-transition-time) ease-out;width:var(--thumb-image-size);padding:0}.thumb-button:hover,.thumb-button[current-image]{outline:0;border:4px solid #337ab7}.thumb-button img{width:100%;vertical-align:middle;line-height:0}.thumb-button+.thumb-button{margin-left:2px}.left .thumb-button,.right .thumb-button{display:block}.left .thumb-button+.thumb-button,.right .thumb-button+.thumb-button{margin-left:0;margin-top:2px}.thumb-image-conatainer{padding:5px 0;transition:all var(--sl-image-transition-time) ease-out;text-align:center;white-space:nowrap;cursor:pointer}.image-sliders{line-height:0;overflow:hidden;position:relative;white-space:nowrap;text-align:left}.image-sliders .image-gallery-slide{left:0;position:absolute;top:0;width:100%}.image-sliders .image-gallery-slide[current-image]{position:relative}.image-sliders .image-gallery-slide img.image-gallery-image{width:100%;object-fit:contain}div.imgage-navigation{width:80%;bottom:20px;left:0;margin:0 auto;position:absolute;right:0;width:80%;z-index:4}div.imgage-navigation .imgage-navigation-wrap{margin:0;padding:0;overflow:hidden;text-align:center}div.imgage-navigation .imgage-navigation-wrap button[part=nav-button]{display:inline-block;appearance:none;cursor:pointer;background-color:transparent;margin:0 5px;padding:5px;border:1px solid #fff;border-radius:50%;box-shadow:0 2px 2px #1a1a1a;transition:all var(--sl-image-transition-time) ease-out}div.imgage-navigation .imgage-navigation-wrap button[part=nav-button][current-image],div.imgage-navigation .imgage-navigation-wrap button[part=nav-button]:hover{transform:scale(1.2);border:1px solid #fff;background:#fff}`;
var gallery_default = styles;

// src/components/gallery/gallery.styles.ts
var gallery_styles_default = r`
  ${component_styles_default}
  ${gallery_default}
`;

// src/components/gallery/gallery.ts
var svgLeft = b`<svg class="image-gallery-svg" xmlns="http://www.w3.org/2000/svg" viewBox="6 0 12 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
var svgRight = b`<svg class="image-gallery-svg" xmlns="http://www.w3.org/2000/svg" viewBox="6 0 12 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
var svgPause = b`<svg class="image-gallery-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
var svgPaused = b`<svg class="image-gallery-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
var svgFullscreened = b`<svg class="image-gallery-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>`;
var svgFullscreen = b`<svg class="image-gallery-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`;
var SlGallery = class extends n {
  constructor() {
    super(...arguments);
    this.currentIndex = 0;
    this.thumbPosition = "bottom";
    this.image_datas = [];
    this.show_pause = true;
    this.layImage = false;
    this.autoPlay = false;
    this.autoPlaytimes = 2e3;
    this.show_fullscreen = true;
    this.showNavButtons = true;
    this.windowKeyEnable = false;
    this.isFullScreened = false;
    this._loadedOneImage = false;
  }
  watchAutoPlay() {
    if (this.autoPlay) {
      if (this._intervalTimeID) {
        window.clearInterval(this._intervalTimeID);
        this._intervalTimeID = void 0;
      }
      this._intervalTimeID = window.setInterval(() => {
        this.goImageByChange(1);
      }, this.autoPlaytimes);
    } else {
      if (this._intervalTimeID) {
        window.clearInterval(this._intervalTimeID);
        this._intervalTimeID = void 0;
      }
    }
  }
  keyEnableChange() {
    var _a;
    (_a = this._windowKeyHander) == null ? void 0 : _a.dispose();
    this._windowKeyHander = addEvent(this.windowKeyEnable ? window : this, "keydown", (event) => {
      let change = 0;
      const key = event.key;
      switch (key) {
        case "ArrowRight":
        case "ArrowDown":
          change++;
          break;
        case "ArrowUp":
        case "ArrowLeft":
          change--;
          break;
      }
      if (change != 0) {
        this.goImageByChange(change);
      }
    });
  }
  goImageByChange(changeNumber) {
    let index = this.currentIndex + changeNumber;
    if (index + 1 > this.images.length) {
      index = 0;
    } else if (index < 0) {
      index = this.images.length - 1;
    }
    const eventResult = emit(this, "sl-gallery-before-change", {
      detail: {
        value: this.currentIndex,
        toValue: index
      }
    });
    if (!eventResult.defaultPrevented) {
      this.currentIndex = index;
      emit(this, "sl-gallery-change", {
        detail: {
          value: this.currentIndex
        }
      });
    }
  }
  disconnectedCallback() {
    var _a, _b;
    super.disconnectedCallback();
    if (this._intervalTimeID) {
      window.clearInterval(this._intervalTimeID);
      this._intervalTimeID = void 0;
    }
    (_a = this._windowKeyHander) == null ? void 0 : _a.dispose();
    (_b = this._resizeRemoveAbleObj) == null ? void 0 : _b.dispose();
  }
  watchChangeImages() {
    if (!this.thumb_images || this.thumb_images.length != this.images.length) {
      this.thumb_images = [...this.images];
    }
  }
  renderNavLefAndRight() {
    return this._loadedOneImage && this.showNavButtons ? y`
          <button class="nav-button left-nav" part="left-nav" @click=${() => this.goImageByChange(-1)}>${svgLeft}</button>
          <button class="nav-button right-nav" part="right-nav" @click=${() => this.goImageByChange(1)}>${svgRight}</button>
        ` : x;
  }
  renderThumbimages() {
    var _a;
    const to = (_a = this.thumb_images) == null ? void 0 : _a.map((item, index) => {
      return y`<button part="thumb-button" @click=${() => this.goImageByChange(index - this.currentIndex)} class="thumb-button " ?current-image=${this.currentIndex == index}>
        <img part="thumb-image" class="thumb-image" .src=${item} />
      </button>`;
    });
    return y`<div class="thumb-image-conatainer" id="thumb-image-conatainer">${this._loadedOneImage ? to : x}</div>`;
  }
  renderImages() {
    var _a;
    const itemRender = (item, index) => {
      var _a2;
      return y`<div>
        ${!this.layImage || Math.abs(this.currentIndex - index) <= 1 ? y`<img
              @load=${(event) => {
        this._loadedOneImage = true;
        emit(this, "sl-gallery-image-load", {
          detail: { image: event.target }
        });
      }}
              @click=${(event) => {
        emit(this, "sl-gallery-image-click", {
          detail: { image: event.target }
        });
      }}
              part="images"
              class="image-gallery-image"
              .src=${item}
              alt=""
              srcset=""
              title=""
            />` : x}
        ${index == this.currentIndex && this.imageRender && this.image_datas ? y`<div part="image-exta">${(_a2 = this.imageRender) == null ? void 0 : _a2.call(this, this.image_datas[index], index)}</div>` : x}
      </div>`;
    };
    const to = (_a = this.images) == null ? void 0 : _a.map((item, index) => {
      return y`<div
        aria-label="Go to Slide ${index}"
        tabindex="-1"
        style="transform: translate3d(${100 * (index - this.currentIndex)}%, 0px, 0px);transition: all var(--sl-image-transition-time) ease-out 0s;"
        class="image-gallery-slide"
        ?current-image=${this.currentIndex == index}
      >
        ${itemRender(item, index)}
      </div>`;
    });
    return y`<div class="image-sliders">${to}</div>`;
  }
  renderImgeNavigations() {
    var _a;
    if (!this._loadedOneImage) {
      return x;
    }
    return y`<div class="imgage-navigation" part="image-naviagation">
      <div class="imgage-navigation-wrap" part="image-naviagation-wrap">
        ${(_a = this.images) == null ? void 0 : _a.map((_item, index) => {
      return y`<button ?current-image=${index == this.currentIndex} part="nav-button" @click=${() => this.goImageByChange(index - this.currentIndex)}></button>`;
    })}
      </div>
    </div>`;
  }
  renderPauseButton() {
    if (!this._loadedOneImage) {
      return x;
    }
    return this.show_pause ? y`<button
          class="nav-button button-pauseButton"
          @click=${() => {
      this.autoPlay = !this.autoPlay;
      this.goImageByChange(1);
    }}
          part="pauseButon"
        >
          ${!this.autoPlay ? svgPause : svgPaused}
        </button>` : "";
  }
  renderFullScreenButton() {
    if (!this._loadedOneImage) {
      return x;
    }
    return this.show_fullscreen ? y`<button class="nav-button button-fullscreen" @click=${this.changeFullScreenState} part="full-screen">${this.isFullScreened ? svgFullscreened : svgFullscreen}</button>` : "";
  }
  changeFullScreenState() {
    if (isFullscreen()) {
      exitFullscreen();
      this.isFullScreened = false;
    } else {
      fullscreen(this);
      this.isFullScreened = true;
    }
  }
  caculateThumbPotion() {
    const thumbs = this.renderRoot.querySelector("div.thumbs");
    const thumbContainer = thumbs == null ? void 0 : thumbs.querySelector("div.thumb-image-conatainer");
    if (thumbContainer) {
      if (this.thumbPosition == "bottom" || this.thumbPosition == "top") {
        thumbContainer.style.height = "auto";
        let scroll = thumbContainer.scrollWidth - thumbContainer.offsetWidth;
        let scrollWidth = 0;
        if (scroll > 0 && this.thumb_images && this.thumb_images.length > 0) {
          scrollWidth = scroll / (this.thumb_images.length - 1) * this.currentIndex;
        }
        thumbContainer.style.transform = `translate3d(-${scrollWidth}px,0px, 0px) `;
      } else if (this.thumbPosition == "left" || this.thumbPosition == "right") {
        const silders = this.renderRoot.querySelector("div.image-sliders");
        thumbContainer.style.height = Math.min(parseInt(getCssValue(silders, "height")), parseInt(getCssValue(silders.parentElement, "height"))) + "px";
        let scroll = thumbContainer.scrollHeight - thumbContainer.offsetHeight;
        let scrollHeight = 0;
        if (scroll > 0 && this.thumb_images && this.thumb_images.length > 0) {
          scrollHeight = scroll / (this.thumb_images.length - 1) * this.currentIndex;
        }
        thumbContainer.style.justifyContent = scroll > 0 ? "flex-start" : "center";
        thumbContainer.style.transform = `translate3d(0px,-${scrollHeight}px, 0px)`;
      }
    }
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    this.watchAutoPlay();
    this.caculateThumbPotion();
    this.keyEnableChange();
    const thumbs = this.renderRoot.querySelector("div[part=thumbs]");
    this._resizeRemoveAbleObj = addResizeHander([this, thumbs.querySelector("#thumb-image-conatainer")], (_el) => {
      this.caculateThumbPotion();
    });
  }
  updated(map) {
    super.updated(map);
    if (!this.hasUpdated) {
      return;
    }
    this.caculateThumbPotion();
  }
  render() {
    return y`
      <div part="base" class=" base ${this.thumbPosition} ${this.isFullScreened ? "full-screen" : ""}">
        <div part="images" class="images">
          ${this.renderImages()} ${this.renderNavLefAndRight()} ${this.renderImgeNavigations()} ${this.renderPauseButton()} ${this.renderFullScreenButton()}
          <slot></slot>
        </div>
        <div part="thumbs" class="thumbs">${this.renderThumbimages()}</div>
      </div>
    `;
  }
};
SlGallery.styles = gallery_styles_default;
__decorateClass([
  e({ type: Array })
], SlGallery.prototype, "images", 2);
__decorateClass([
  e({ type: Array })
], SlGallery.prototype, "thumb_images", 2);
__decorateClass([
  e({ type: Number })
], SlGallery.prototype, "currentIndex", 2);
__decorateClass([
  e({ type: String, attribute: "thumb-position" })
], SlGallery.prototype, "thumbPosition", 2);
__decorateClass([
  e({ type: Array })
], SlGallery.prototype, "image_datas", 2);
__decorateClass([
  e({ type: Object })
], SlGallery.prototype, "imageRender", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlGallery.prototype, "show_pause", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlGallery.prototype, "layImage", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlGallery.prototype, "autoPlay", 2);
__decorateClass([
  e({ type: Number, attribute: false })
], SlGallery.prototype, "autoPlaytimes", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlGallery.prototype, "show_fullscreen", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlGallery.prototype, "showNavButtons", 2);
__decorateClass([
  e({ type: Boolean, attribute: false })
], SlGallery.prototype, "windowKeyEnable", 2);
__decorateClass([
  t()
], SlGallery.prototype, "isFullScreened", 2);
__decorateClass([
  watch("autoPlay")
], SlGallery.prototype, "watchAutoPlay", 1);
__decorateClass([
  watch("windowKeyEnable")
], SlGallery.prototype, "keyEnableChange", 1);
__decorateClass([
  watch("images")
], SlGallery.prototype, "watchChangeImages", 1);
__decorateClass([
  t()
], SlGallery.prototype, "_loadedOneImage", 2);
SlGallery = __decorateClass([
  n2("sl-gallery")
], SlGallery);
var gallery_default2 = SlGallery;

export {
  gallery_default2 as gallery_default
};
