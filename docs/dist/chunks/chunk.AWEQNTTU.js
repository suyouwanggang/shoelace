// src/internal/customStyle.ts
function customStyle() {
  const key = "customStyle";
  const keyCustomStyle = Symbol("keyCustomStyle");
  const keyName = Symbol("customStyle");
  return (protoOrDescriptor) => {
    Object.defineProperty(protoOrDescriptor.prototype, key, {
      configurable: true,
      enumerable: true,
      set(value) {
        const element = this;
        if (this[keyName] != value) {
          this[keyName] = value;
          element.updateComplete.then(() => {
            if (element[keyCustomStyle] == void 0) {
              const style = document.createElement("style");
              style.setAttribute("name", "customStyle");
              element[keyCustomStyle] = style;
              element.renderRoot.appendChild(style);
            }
            if (value !== element[keyCustomStyle].textContent) {
              element[keyCustomStyle].textContent = value;
            }
            element.requestUpdate();
          });
        }
      },
      get() {
        return this[keyName];
      }
    });
  };
}

export {
  customStyle
};
