import {
  resouce_changeEvent
} from "./chunk.5CN3MB73.js";
import {
  addEvent
} from "./chunk.3SJG5WV3.js";

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
