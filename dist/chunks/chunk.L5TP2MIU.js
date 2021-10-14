import {
  addEvent,
  onEvent
} from "./chunk.UYG3ZEVK.js";

// src/utilities/dragHelper.ts
var dragHandler = (dragDiv, callBack) => {
  let oldPointer;
  let newPointer;
  let documentMouseMove;
  let documentMouseUp;
  addEvent(dragDiv, "mousedown", (event) => {
    event = event;
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    oldPointer = {
      x: event.pageX,
      y: event.pageY
    };
    if (documentMouseUp) {
      documentMouseUp.dispose();
    }
    if (documentMouseMove) {
      documentMouseMove.dispose();
    }
    documentMouseMove = addEvent(document, "mousemove", startDrag);
    documentMouseUp = addEvent(document, "mouseup", releaseDrag);
  });
  const startDrag = (event) => {
    event = event;
    if (event.preventDefault) {
      event.preventDefault();
    }
    newPointer = {
      x: event.pageX - oldPointer.x,
      y: event.pageY - oldPointer.y
    };
    callBack(newPointer, event);
    oldPointer = {
      x: event.pageX,
      y: event.pageY
    };
  };
  const releaseDrag = (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    if (documentMouseUp) {
      documentMouseUp.dispose();
    }
    if (documentMouseMove) {
      documentMouseMove.dispose();
    }
  };
};
var dragOnHandler = (dragDiv, selector, callBack, endBack) => {
  let oldPointer;
  let newPointer;
  let documentMouseMove;
  let documentMouseUp;
  let delegateTarget;
  const startDrag = (event) => {
    event.delegateTarget = delegateTarget;
    if (event.preventDefault) {
      event.preventDefault();
    }
    newPointer = {
      x: event.pageX - oldPointer.x,
      y: event.pageY - oldPointer.y
    };
    callBack(newPointer, event);
    oldPointer = {
      x: event.pageX,
      y: event.pageY
    };
  };
  const releaseDrag = (event) => {
    event.delegateTarget = delegateTarget;
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    if (documentMouseUp) {
      documentMouseUp.dispose();
    }
    if (documentMouseMove) {
      documentMouseMove.dispose();
    }
    if (endBack) {
      endBack(event);
    }
  };
  return onEvent(dragDiv, selector, "mousedown", (event) => {
    delegateTarget = event.delegateTarget;
    if (event.preventDefault) {
      event.preventDefault();
    }
    oldPointer = {
      x: event.pageX,
      y: event.pageY
    };
    if (documentMouseUp) {
      documentMouseUp.dispose();
    }
    if (documentMouseMove) {
      documentMouseMove.dispose();
    }
    documentMouseMove = addEvent(document, "mousemove", startDrag);
    documentMouseUp = addEvent(document, "mouseup", releaseDrag);
  });
};

export {
  dragHandler,
  dragOnHandler
};
