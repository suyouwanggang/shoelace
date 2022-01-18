import {
  isArray
} from "./chunk.3SJG5WV3.js";

// src/utilities/eventBus.ts
var EventBus = class {
  constructor() {
    this.events = /* @__PURE__ */ new Map();
  }
  addListener(type, ...callbacks) {
    let handlers = this.events.get(type);
    if (handlers == void 0) {
      handlers = [];
      this.events.set(type, handlers);
    }
    for (const t of callbacks) {
      handlers.push(t);
    }
    return {
      dispose: () => {
        this.removeListener(type, ...callbacks);
      }
    };
  }
  removeListener(type, ...callbacks) {
    let handlers = this.events.get(type);
    if (handlers) {
      for (const t of callbacks) {
        let index = handlers.indexOf(t);
        if (index >= 0) {
          handlers.splice(index, 1);
        }
      }
    }
  }
  emit(type, ...args) {
    const handlers = this.events.get(type);
    if (handlers) {
      for (const t of handlers) {
        t(...args);
      }
    }
  }
};
var eventBus = new EventBus();
window.eventBus = eventBus;
var addBusHandler = (type, ...callBacks) => {
  const array = [];
  if (isArray(type)) {
    for (const t of type) {
      array.push(eventBus.addListener(t, ...callBacks));
    }
  } else {
    array.push(eventBus.addListener(type, ...callBacks));
  }
  return {
    dispose: () => {
      array.forEach((item) => item.dispose());
    }
  };
};
var addBusController = (el, type, ...callbacks) => {
  let disposeObj;
  el.addController({
    hostConnected: () => {
      disposeObj = addBusHandler(type, ...callbacks);
    },
    hostDisconnected: () => {
      disposeObj.dispose();
    }
  });
};
var busEmit = (type, ...args) => {
  eventBus.emit(type, ...args);
};

export {
  EventBus,
  eventBus,
  addBusHandler,
  addBusController,
  busEmit
};
