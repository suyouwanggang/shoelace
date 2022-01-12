import {
  throttle
} from "./chunk.NIBYN26Y.js";
import {
  scroll_styles_default
} from "./chunk.5MJ7JTGQ.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  e,
  e2,
  i,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  s
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass,
  __spreadProps,
  __spreadValues
} from "./chunk.FHAP4LMI.js";

// src/components/scroll/scroll.ts
var SlScroll = class extends s {
  constructor() {
    super(...arguments);
    this.overflowX = "";
    this.overflowY = "";
    this.keyEnable = true;
    this.scrollBarWidth = 8;
    this.scrollBarOutWidth = 12;
    this.minScrollSize = 20;
    this.scrollItemValue = 30;
    this._touchStartX = 0;
    this._touchStartY = 0;
    this._isMouseOn = false;
    this.throttTime = 20;
  }
  _wheelHander(e3) {
    const scrollObj = this;
    const changeYValue = e3.deltaY;
    const changeXValue = e3.deltaX;
    e3.preventDefault();
    if (changeYValue !== void 0 && changeYValue !== 0) {
      scrollObj.changeYScroll((changeYValue > 0 ? 1 : -1) * this.scrollItemValue);
    }
    if (changeXValue !== void 0 && changeXValue !== 0) {
      scrollObj.changeXScroll((changeXValue > 0 ? 1 : -1) * this.scrollItemValue);
    }
  }
  _touchStartHanlder(event) {
    const touch = event.touches[0];
    this._touchStartX = touch.clientX;
    this._touchStartY = touch.clientY;
  }
  _touchMoveHanlder(event) {
    const touch = event.touches[0];
    const newX = touch.clientX;
    const newY = touch.clientY;
    const changeX = this._touchStartX - newX;
    const changeY = this._touchStartY - newY;
    event.preventDefault();
    this.changeYScroll(changeY);
    this.changeXScroll(changeX);
  }
  render() {
    return $`<div part="base" id="container" style="--scroll-bar-width:${this.scrollBarWidth}px ; --scroll-bar-out-width:${this.scrollBarOutWidth}px">
      <div part="content" id="content" @mousewheel=${this._wheelHander} @touchmove=${this._touchMoveHanlder} @touchstart=${this._touchStartHanlder}>
        <div id="content-wrap" part="content-wrap">
          <slot id="contentSlot"></slot>
        </div>
      </div>
      <div part="scroll-y" id="scroll-y"><div part="scroll-y-handler"></div></div>
      <div part="scroll-x" id="scroll-x"><div part="scroll-x-handler"></div></div>
      <div part="right-bottom" id="right-bottom"></div>
    </div>`;
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this._initScrollBarEvent();
    this.contentDIV.scrollTop = 0;
    this.contentDIV.scrollLeft = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    this._intiKeyEvent();
    this._obersver = new ResizeObserver(() => {
      this.resize();
    });
    this._obersver.observe(this);
    this.getUpdateComplete().then(() => {
      var _a;
      this.resize();
      this._obersver.observe(this.containerDIV);
      this._obersver.observe(this.content_wrap_DIV);
      (_a = this.renderRoot.querySelector("#contentSlot")) == null ? void 0 : _a.addEventListener("slotchange", () => {
        this.resize();
      });
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.content_wrap_DIV ? this._obersver.unobserve(this.content_wrap_DIV) : null;
    this.containerDIV ? this._obersver.unobserve(this.containerDIV) : null;
    this._obersver.unobserve(this);
    this.removeEventListener("mouseover", this._MouseOnEventHandler);
    this.removeEventListener("mouseout", this._MouseOutEventHandler);
    document.removeEventListener("keydown", this._docEventHandler);
  }
  _initScrollBarEvent() {
    const scrollObj = this;
    const dragFun = (scrollDiv, callBackFun) => {
      let x = 0;
      let y = 0;
      const handerDown = (event) => {
        event.preventDefault();
        x = event.clientX;
        y = event.clientY;
        document.addEventListener("mousemove", handerMove);
        document.addEventListener("mouseup", handerUp);
      };
      const handerUp = (event) => {
        event.preventDefault();
        x = y = 0;
        document.removeEventListener("mousemove", handerMove);
        document.removeEventListener("mouseup", handerUp);
      };
      const handerMove = (event) => {
        event.preventDefault();
        const nX = event.clientX;
        const nY = event.clientY;
        callBackFun(nX - x, nY - y);
        x = nX;
        y = nY;
      };
      scrollDiv.addEventListener("mousedown", handerDown);
    };
    dragFun(scrollObj.partYHandler, (_x, y) => {
      scrollObj.changeYBarPosition(y);
    });
    dragFun(scrollObj.partXHandler, (x, _y) => {
      scrollObj.changeXBarPosition(x);
    });
  }
  _intiKeyEvent() {
    this._MouseOnEventHandler = (_event) => {
      this._isMouseOn = true;
    };
    this._MouseOutEventHandler = (_event) => {
      this._isMouseOn = false;
    };
    this._docEventHandler = (event) => {
      if (this._isMouseOn && this.keyEnable) {
        const key = event.key;
        let y = 0, x = 0;
        switch (key) {
          case "ArrowDown":
            y = this.scrollItemValue;
            break;
          case "ArrowUp":
            y = 0 - this.scrollItemValue;
            break;
          case "ArrowLeft":
            x = 0 - this.scrollItemValue;
            break;
          case "ArrowRight":
            x = this.scrollItemValue;
            break;
          default:
            break;
        }
        if (y !== 0) {
          this.changeYScroll(y);
        }
        if (x !== 0) {
          this.changeXScroll(x);
        }
      }
    };
    this.addEventListener("mouseover", this._MouseOnEventHandler);
    this.addEventListener("mouseout", this._MouseOutEventHandler);
    document.addEventListener("keydown", this._docEventHandler);
  }
  resize() {
    const container = this.containerDIV;
    const div = this.contentDIV;
    if (this.overflowY !== "hidden") {
      container.classList.add("showYScroll");
    } else {
      container.classList.remove("showYScroll");
    }
    if (this.overflowX !== "hidden") {
      container.classList.add("showXScroll");
    } else {
      container.classList.remove("showXScroll");
    }
    const elCompontent = this;
    if (!this._resizeDispachFun) {
      this._resizeDispachFun = throttle(() => {
        elCompontent.dispatchEvent(new CustomEvent("resize"));
      }, this.throttTime);
      this._resizeDispachFun();
    }
    if (div.scrollHeight > div.offsetHeight) {
      this.changeYScroll();
    } else {
      container.classList.remove("showYScroll");
    }
    if (div.scrollWidth > div.offsetWidth) {
      this.changeXScroll();
    } else {
      container.classList.remove("showXScroll");
    }
  }
  get caculateYBarHeight() {
    let result = 0;
    const contentDIV = this.contentDIV;
    const height = contentDIV.offsetHeight;
    const scrollHeight = contentDIV.scrollHeight;
    if (scrollHeight > height) {
      const rate = height / scrollHeight;
      result = rate * height;
      if (result < this.minScrollSize) {
        result = this.minScrollSize;
      }
    }
    this.partYHandler.style.height = result + "px";
    return result;
  }
  get caculateXBarWidth() {
    let result = 0;
    const contentDIV = this.contentDIV;
    const width = this.offsetWidth;
    const scrollWidth = contentDIV.scrollWidth;
    if (scrollWidth > width) {
      const rate = width / scrollWidth;
      result = rate * width;
      if (result < this.minScrollSize) {
        result = this.minScrollSize;
      }
    }
    this.partXHandler.style.width = result + "px";
    return result;
  }
  caculateYBarPosition() {
    const contentDIV = this.contentDIV;
    const height = contentDIV.offsetHeight;
    const scrollHeight = contentDIV.scrollHeight;
    if (scrollHeight <= height) {
      this.partYHandler.style.top = "0";
      return 0;
    } else {
      const barHeight = this.caculateYBarHeight;
      const canScrollDIVHeight = this.partYScroll.offsetHeight - barHeight;
      const topHeight = contentDIV.scrollTop / (scrollHeight - height) * canScrollDIVHeight;
      this.partYHandler.style.top = topHeight + "px";
      return topHeight;
    }
  }
  caculateXBarPosition() {
    const contentDIV = this.contentDIV;
    const width = contentDIV.offsetWidth;
    const scrollWidth = contentDIV.scrollWidth;
    if (scrollWidth <= width) {
      this.partXHandler.style.left = "0";
      return 0;
    } else {
      const barWidth = this.caculateXBarWidth;
      const canScrollDIVHeight = this.partXScroll.offsetWidth - barWidth;
      const topWidth = contentDIV.scrollLeft / (scrollWidth - width) * canScrollDIVHeight;
      this.partXHandler.style.left = topWidth + "px";
      return topWidth;
    }
  }
  get xDispatchMethod() {
    if (this._xDispatchMethod === void 0) {
      const d = (oldValue, newValue) => {
        this._emitEvent("scroll-x", {
          value: newValue,
          oldValue
        });
      };
      this._xDispatchMethod = throttle(d, this.throttTime);
    }
    return this._xDispatchMethod;
  }
  get yDispatchMethod() {
    if (this._yDispatchMethod === void 0) {
      const d = (oldValue, newValue) => {
        this._emitEvent("scroll-y", {
          value: newValue,
          oldValue
        });
      };
      this._yDispatchMethod = throttle(d, this.throttTime);
    }
    return this._yDispatchMethod;
  }
  _emitEvent(eventName, obj) {
    emit(this, `sl-${eventName}`, {
      detail: __spreadProps(__spreadValues({}, obj), {
        scrollTop: this.contentDIV.scrollTop,
        scrollLeft: this.contentDIV.scrollLeft
      })
    });
  }
  get scrollDispatchMethod() {
    if (this._scrollDispatchMethod === void 0) {
      const d = () => {
        this._emitEvent("scroll-change");
      };
      this._scrollDispatchMethod = throttle(d, this.throttTime);
    }
    return this._scrollDispatchMethod;
  }
  _scrollEvent() {
    this.scrollDispatchMethod();
  }
  changeYScroll(scrollValue = 0) {
    const contentDIV = this.contentDIV;
    const height = contentDIV.offsetHeight;
    const scrollHeight = contentDIV.scrollHeight;
    const maxScroll = scrollHeight - height;
    const oldScrollTop = contentDIV.scrollTop;
    let scrollTop = oldScrollTop;
    if (oldScrollTop > maxScroll) {
      scrollTop = maxScroll;
    }
    scrollTop += scrollValue;
    if (scrollTop > maxScroll) {
      scrollTop = maxScroll;
    }
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    contentDIV.scrollTop = scrollTop;
    this.caculateYBarPosition();
    if (oldScrollTop !== scrollTop) {
      if (scrollTop === maxScroll) {
        this._emitEvent("scroll-y-end", {
          detail: {
            value: scrollTop
          }
        });
      }
      this.yDispatchMethod(oldScrollTop, scrollTop);
      this._scrollEvent();
    }
  }
  changeXScroll(scrollValue = 0) {
    const contentDIV = this.contentDIV;
    const width = contentDIV.offsetWidth;
    const scrollWidth = contentDIV.scrollWidth;
    const maxScroll = scrollWidth - width;
    const oldScrollLeft = contentDIV.scrollLeft;
    let scrollLeft = oldScrollLeft;
    if (oldScrollLeft > maxScroll) {
      scrollLeft = maxScroll;
    }
    scrollLeft += scrollValue;
    if (scrollLeft > maxScroll) {
      scrollLeft = maxScroll;
    }
    if (scrollLeft < 0) {
      scrollLeft = 0;
    }
    contentDIV.scrollLeft = scrollLeft;
    this.caculateXBarPosition();
    if (oldScrollLeft !== scrollLeft) {
      if (scrollLeft === maxScroll) {
        this._emitEvent("scroll-x-end", {
          value: scrollLeft
        });
      }
      this.xDispatchMethod(oldScrollLeft, scrollLeft);
      this._scrollEvent();
    }
  }
  changeYBarPosition(changeValue = 0) {
    const contentDIV = this.contentDIV;
    let scrollTop = parseInt(getCssValue(this.partYHandler, "top"), 10);
    const barHeight = this.caculateYBarHeight;
    const offsetheight = contentDIV.offsetHeight;
    const contentScrollHeight = contentDIV.scrollHeight - offsetheight;
    const maxScrollTop = contentScrollHeight > 0 ? this.partYScroll.offsetHeight - barHeight : 0;
    scrollTop += changeValue;
    if (scrollTop > maxScrollTop) {
      scrollTop = maxScrollTop;
    }
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    this.partYHandler.style.top = scrollTop + "px";
    if (contentScrollHeight > 0) {
      const canScrollDIVHeight = this.partYScroll.offsetHeight - barHeight;
      const contentScrollTopValue = scrollTop * (contentDIV.scrollHeight - offsetheight) / canScrollDIVHeight;
      this.scrollYToValue(contentScrollTopValue);
    } else {
      this.scrollYToValue(0);
    }
  }
  changeXBarPosition(changeValue = 0) {
    const contentDIV = this.contentDIV;
    let scrollLeft = parseInt(getCssValue(this.partXHandler, "left"), 10);
    const barWidth = this.caculateXBarWidth;
    const offsetWidth = contentDIV.offsetWidth;
    const contentScrollWidth = contentDIV.scrollWidth - contentDIV.offsetWidth;
    const maxScrollTop = contentScrollWidth > 0 ? this.partXScroll.offsetWidth - barWidth : 0;
    scrollLeft += changeValue;
    if (scrollLeft > maxScrollTop) {
      scrollLeft = maxScrollTop;
    }
    if (scrollLeft < 0) {
      scrollLeft = 0;
    }
    this.partXHandler.style.left = scrollLeft + "px";
    if (contentScrollWidth > 0) {
      const canScrollDIVWidth = offsetWidth - barWidth;
      const contentScrollValue = scrollLeft * (contentDIV.scrollWidth - offsetWidth) / canScrollDIVWidth;
      this.scrollXToValue(contentScrollValue);
    } else {
      this.scrollXToValue(0);
    }
  }
  scrollYToEnd() {
    const contentDIV = this.contentDIV;
    const offsetHeight = contentDIV.offsetHeight;
    const maxScrollTop = contentDIV.scrollHeight - offsetHeight;
    this.changeYScroll(maxScrollTop - contentDIV.scrollTop);
  }
  scrollYToValue(scrollTop = 0) {
    const currentTop = this.contentDIV.scrollTop;
    this.changeYScroll(scrollTop - currentTop);
  }
  scrollXToEnd() {
    const contentDIV = this.contentDIV;
    const offsetWidth = contentDIV.offsetWidth;
    const maxScrollTop = contentDIV.scrollWidth - offsetWidth;
    this.changeXScroll(maxScrollTop - contentDIV.scrollLeft);
  }
  scrollXToValue(scrollLeft = 0) {
    const currentLeft = this.contentDIV.scrollLeft;
    this.changeXScroll(scrollLeft - currentLeft);
  }
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("throttTime")) {
      this._xDispatchMethod = void 0;
      this._yDispatchMethod = void 0;
      this._scrollDispatchMethod = void 0;
    }
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("overflowX") || _changedProperties.has("overflowY") || _changedProperties.has("scrollBarWidth") || _changedProperties.has("scrollBarOutWidth")) {
      this.resize();
    }
  }
};
SlScroll.styles = scroll_styles_default;
__decorateClass([
  e({ type: String, reflect: true, attribute: "overflow-x" })
], SlScroll.prototype, "overflowX", 2);
__decorateClass([
  e({ type: String, reflect: true, attribute: "overflow-y" })
], SlScroll.prototype, "overflowY", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlScroll.prototype, "keyEnable", 2);
__decorateClass([
  e({ type: Number, reflect: true, attribute: "scroll-bar-width" })
], SlScroll.prototype, "scrollBarWidth", 2);
__decorateClass([
  e({ type: Number, reflect: true, attribute: "scroll-bar-out-width" })
], SlScroll.prototype, "scrollBarOutWidth", 2);
__decorateClass([
  e({ type: Number, attribute: false })
], SlScroll.prototype, "minScrollSize", 2);
__decorateClass([
  e({ attribute: false, type: Number })
], SlScroll.prototype, "scrollItemValue", 2);
__decorateClass([
  e2({
    passive: false
  })
], SlScroll.prototype, "_wheelHander", 1);
__decorateClass([
  i("#right-bottom", true)
], SlScroll.prototype, "rightBottom", 2);
__decorateClass([
  i("#content")
], SlScroll.prototype, "contentDIV", 2);
__decorateClass([
  i("#content-wrap")
], SlScroll.prototype, "content_wrap_DIV", 2);
__decorateClass([
  i("#container")
], SlScroll.prototype, "containerDIV", 2);
__decorateClass([
  i("div[part=scroll-y]", true)
], SlScroll.prototype, "partYScroll", 2);
__decorateClass([
  i("div[part=scroll-y-handler]", true)
], SlScroll.prototype, "partYHandler", 2);
__decorateClass([
  i("div[part=scroll-x]", true)
], SlScroll.prototype, "partXScroll", 2);
__decorateClass([
  i("div[part=scroll-x-handler]", true)
], SlScroll.prototype, "partXHandler", 2);
__decorateClass([
  e({ type: Number })
], SlScroll.prototype, "throttTime", 2);
SlScroll = __decorateClass([
  n("sl-scroll")
], SlScroll);

export {
  SlScroll
};
