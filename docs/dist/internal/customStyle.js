//
// Runs this ,give webcompoent set style into shadmroot.
//
// Usage:
//
//  @customStyle()
//  WebCoponentClass extends LitElement {
//    ...
//  }
//
export function customStyle() {
    const key = 'customStyle';
    const keyCustomStyle = Symbol('keyCustomStyle');
    const keyName = Symbol('customStyle');
    return (protoOrDescriptor) => {
        Object.defineProperty(protoOrDescriptor.prototype, key, {
            configurable: true,
            enumerable: true,
            set(value) {
                const element = this;
                if (this[keyName] != value) {
                    this[keyName] = value;
                    element.updateComplete.then(() => {
                        if (element[keyCustomStyle] == undefined) {
                            const style = document.createElement('style');
                            style.setAttribute('name', 'customStyle');
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
