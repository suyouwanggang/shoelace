// src/internal/watchProps.ts
var containsAny = (changedProps, propName) => {
  for (let propIN of propName) {
    if (changedProps.has(propIN)) {
      return true;
    }
  }
  return false;
};
function watchProps(propName, options) {
  return (protoOrDescriptor, name) => {
    const { update } = protoOrDescriptor;
    options = Object.assign({ waitUntilFirstUpdate: false }, options);
    protoOrDescriptor.update = function(changedProps) {
      if (containsAny(changedProps, propName)) {
        if (!(options == null ? void 0 : options.waitUntilFirstUpdate) || this.hasUpdated) {
          this[name]();
        }
      }
      update.call(this, changedProps);
    };
  };
}

export {
  watchProps
};
