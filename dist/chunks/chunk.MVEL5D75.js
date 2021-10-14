import {
  resouce_changeEvent
} from "./chunk.TPWBEAY3.js";
import {
  addEvent
} from "./chunk.UYG3ZEVK.js";

// src/internal/resourceLocal.ts
function resourceLocal() {
  return function(target) {
    target.addInitializer((element) => {
      let result;
      element.addController({
        hostConnected() {
          result = addEvent(window, resouce_changeEvent, () => {
            element.requestUpdate();
          });
        },
        hostDisconnected() {
          result.dispose();
        }
      });
    });
  };
}

export {
  resourceLocal
};
