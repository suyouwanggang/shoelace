import {
  defaultResove,
  getPathNames,
  isPathURLMatchPattern,
  stripExtraTrailingSlash
} from "./chunk.Y7OE5YUP.js";
import {
  isFunction
} from "./chunk.3SJG5WV3.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.53VVVNUW.js";
import {
  e,
  n as n2
} from "./chunk.OPP7P5NL.js";
import {
  n,
  r,
  y
} from "./chunk.HHQFDLZX.js";
import {
  __decorateClass,
  __spreadProps,
  __spreadValues
} from "./chunk.QRXTBWFL.js";

// src/components/router/router.litcss
var styles = r`:host{display:contents}`;
var router_default = styles;

// src/components/router/router.ts
var routerCache = {};
var getRouterByName = (name = "default") => {
  return routerCache[name];
};
var SlRouter = class extends n {
  constructor() {
    super();
    this.name = "default";
    this.pathResovle = defaultResove;
    this.routerChangeHanlder = () => {
      const event = emit(this, SlRouter.HASH_EVENT_BEFORE, {
        cancelable: true,
        detail: {
          lastItem: this.lastRouterItem,
          data: this.lastRouterData
        }
      });
      if (event.defaultPrevented) {
        emit(this, "hash-prevented");
        return;
      }
      const matchResult = this.findMathRouterItems();
      if (matchResult) {
        const matchItems = matchResult.items;
        const pattern = matchResult.url;
        const item = matchItems[matchItems.length - 1];
        const currentPath = this.getCurrentPath();
        const currentData = __spreadProps(__spreadValues({}, currentPath), {
          pathData: getPathNames(currentPath.path, pattern) || {}
        });
        this.beforeRouter ? this.beforeRouter({ item, data: currentData }, this.routerItem ? { item: this.routerItem, data: this.routerData } : void 0, async () => {
          this.excuteRouterComponenent(matchItems, pattern);
        }) : this.excuteRouterComponenent(matchItems, pattern);
      } else {
        emit(this, "not-found");
      }
    };
    routerCache[this.name] = this;
  }
  static get styles() {
    return router_default;
  }
  watchNameChange(oldName, newName) {
    delete routerCache[oldName];
    routerCache[newName] = this;
  }
  firstUpdated(map) {
    super.firstUpdated(map);
    this.routerChangeHanlder();
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.routerChangeHanlder);
  }
  get routerItem() {
    return this._routerItem;
  }
  get routerData() {
    return this._routerData;
  }
  get lastRouterItem() {
    return this._lastRouterItem;
  }
  get lastRouterData() {
    return this._lastRouterData;
  }
  getCurrentPath() {
    let hash = decodeURI(window.location.hash);
    return this.pathResovle.resolvePath(hash);
  }
  toHashPath(url, jsonData) {
    const { path, queryData } = defaultResove.resolvePath(url);
    jsonData = Object.assign({}, queryData, jsonData);
    window.location.hash = this.pathResovle.toPath(path, jsonData);
  }
  findMathRouterItems() {
    const path = this.getCurrentPath().path;
    if (!this.routers) {
      return null;
    }
    const parentMap = new Map();
    const findSubRouter = (item, parentURl) => {
      let parentURlTemp = parentURl;
      parentURlTemp = parentURlTemp ? parentURlTemp + stripExtraTrailingSlash(item.path) : item.path;
      if (item.children) {
        for (let temp of item.children) {
          parentMap.set(temp, item);
          if (findSubRouter(temp, parentURlTemp)) {
            return temp;
          }
        }
      }
      const match = isPathURLMatchPattern(path, parentURlTemp);
      if (match) {
        return item;
      }
      return null;
    };
    for (let temp of this.routers) {
      let item = findSubRouter(temp);
      if (!item) {
        continue;
      }
      let result = [];
      let matchPath = stripExtraTrailingSlash(item.path);
      result.push(item);
      while (item && parentMap.has(item)) {
        let parent = parentMap.get(item);
        result.splice(0, 0, parent);
        matchPath = stripExtraTrailingSlash(parent.path) + matchPath;
        item = parent;
      }
      return { items: result, url: matchPath };
    }
    return null;
  }
  async excuteRouterComponenent(matchItems, pattern) {
    const item = matchItems[matchItems.length - 1];
    this._lastRouterData = this.routerData;
    this._lastRouterItem = this.routerItem;
    const importResult = [];
    for (let temp of matchItems) {
      let tempResult;
      if (temp.import) {
        tempResult = isFunction(temp.import) ? await temp.import() : await import(temp.import);
      }
      importResult.push(tempResult);
    }
    const currentPath = this.getCurrentPath();
    const currentData = __spreadProps(__spreadValues({}, currentPath), {
      pathData: getPathNames(currentPath.path, pattern) || {}
    });
    this._routerData = currentData;
    this._routerItem = item;
    let frag = document.createDocumentFragment();
    let parent = frag;
    const elList = [];
    for (let i = 0, j = matchItems.length; i < j; i++) {
      const temp = matchItems[i];
      let el;
      if (typeof temp.component == "string") {
        el = document.createElement(temp.component);
        Object.assign(el, currentData);
      } else {
        el = await temp.component(currentData, temp, importResult[i]);
      }
      elList.push(el);
      parent.appendChild(el);
      parent = el;
    }
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    this.appendChild(frag);
    requestAnimationFrame(() => {
      elList.forEach(async (el, index) => {
        emit(el, "sl-router-actived");
        let item2 = matchItems[index];
        if (item2.afterCreate) {
          await item2.afterCreate(el, currentData, item2);
        }
      });
      this.afterRouter ? this.afterRouter({ item, data: this.routerData }, this.lastRouterItem ? { item: this.lastRouterItem, data: this.lastRouterData } : void 0) : void 0;
      emit(this, SlRouter.HASH_EVENT_AFTER);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("hashchange", this.routerChangeHanlder);
    delete routerCache[this.name];
  }
  render() {
    return y`<slot></slot>`;
  }
};
SlRouter.HASH_EVENT_BEFORE = "hash-router-before";
SlRouter.HASH_EVENT_AFTER = "hash-router-after";
__decorateClass([
  e({ reflect: true, attribute: "name" })
], SlRouter.prototype, "name", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlRouter.prototype, "routers", 2);
__decorateClass([
  watch("name")
], SlRouter.prototype, "watchNameChange", 1);
SlRouter = __decorateClass([
  n2("sl-router")
], SlRouter);
var router_default2 = SlRouter;

export {
  getRouterByName,
  router_default2 as router_default
};
