import {
  dragOnHandler
} from "./chunk.JBNGIKRU.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  getCssValue
} from "./chunk.3SJG5WV3.js";
import {
  $
} from "./chunk.KOO6UQJ3.js";

// src/components/dialog/dragRender.ts
var parseAsNumber = (value) => {
  let v = parseInt(value);
  if (isNaN(v)) {
    v = 0;
  }
  return v;
};
var resizeHelper = {
  top: (div, pos) => {
    pos.y = 0 - pos.y;
    resizeHelper.bottom(div, pos);
  },
  bottom: (div, pos) => {
    let height = parseAsNumber(getCssValue(div, "height"));
    height += pos.y;
    div.style.height = height + "px";
  },
  left: (div, pos) => {
    pos.x = 0 - pos.x;
    resizeHelper.right(div, pos);
  },
  right: (div, pos) => {
    let width = parseAsNumber(getCssValue(div, "width"));
    width += pos.x;
    div.style.width = width + "px";
  },
  "left-top": (div, pos) => {
    resizeHelper.left(div, pos);
    resizeHelper.top(div, pos);
  },
  "left-bottom": (div, pos) => {
    resizeHelper.left(div, pos);
    resizeHelper.bottom(div, pos);
  },
  "right-top": (div, pos) => {
    resizeHelper.right(div, pos);
    resizeHelper.top(div, pos);
  },
  "right-bottom": (div, pos) => {
    resizeHelper.right(div, pos);
    resizeHelper.bottom(div, pos);
  }
};
var renderResizeAble = () => {
  const array = [];
  for (const key in resizeHelper) {
    array.push($`<div class='resize_heler' pos='${key}'></div>`);
  }
  return array;
};
var dragResizeController = (el) => {
  let drag_dispose;
  let move_dispose;
  el.addController({
    hostUpdated() {
      if (drag_dispose) {
        drag_dispose.dispose();
      }
      if (move_dispose) {
        move_dispose.dispose();
      }
      const div = el.renderRoot.querySelector("div.dialog__panel");
      drag_dispose = dragOnHandler(div, "div.resize_heler", (pointer, event) => {
        const el2 = event.delegateTarget;
        const pos = el2.getAttribute("pos");
        const hander = resizeHelper[pos];
        if (hander != void 0) {
          const event2 = emit(el2, "sl-resize-position-before", {
            cancelable: true,
            detail: {
              pos,
              pointer
            }
          });
          if (!event2.defaultPrevented) {
            hander(div, pointer);
            emit(el2, "sl-resize-position", {
              detail: {
                pos,
                pointer
              }
            });
          }
        }
      });
      move_dispose = dragOnHandler(div, "span.dialog__title", (pointer) => {
        let top = parseAsNumber(getCssValue(div, "top"));
        let left = parseAsNumber(getCssValue(div, "left"));
        top += pointer.y;
        left += pointer.x;
        div.style.left = left + "px";
        div.style.top = top + "px";
      });
    },
    hostDisconnected() {
      if (drag_dispose) {
        drag_dispose.dispose();
      }
    }
  });
};

export {
  renderResizeAble,
  dragResizeController
};
