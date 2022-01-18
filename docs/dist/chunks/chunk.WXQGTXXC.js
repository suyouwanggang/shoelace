import {
  defaultResove,
  getPathNames,
  isPathURLMatchPattern,
  stripExtraTrailingSlash
} from "./chunk.CTITDZIY.js";
import {
  watch
} from "./chunk.BD26TKS4.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  addEvent,
  isArray,
  isFunction
} from "./chunk.3SJG5WV3.js";
import {
  e,
  n
} from "./chunk.GZBNBBRH.js";
import {
  $,
  r,
  s,
  x
} from "./chunk.KOO6UQJ3.js";
import {
  __decorateClass,
  __spreadProps,
  __spreadValues
} from "./chunk.FHAP4LMI.js";

// src/components/router/router.litcss
var styles = r`:host{display:contents}`;
var router_default = styles;

// src/components/router/router.ts
var routerCache = {};
var getRouterByName = (name = "default") => {
  return routerCache[name];
};
var hasRequestCache = {
  hash: "",
  data: { path: "", queryData: {}, queryString: "" }
};
var CHANGE_HASH_URL = "CHANGE_HASH_URL";
var hashUrl = {
  _url: decodeURI(window.location.hash),
  setUrl: (url) => {
    hashUrl._url = url;
    emit(window, CHANGE_HASH_URL, {
      detail: hashUrl._url
    });
  },
  getUrl: () => {
    return hashUrl._url;
  }
};
addEvent(window, "hashchange", () => {
  const hash = decodeURI(window.location.hash);
  hashUrl.setUrl(hash);
});
var requestData = () => {
  const hash = hashUrl.getUrl();
  if (hash == hasRequestCache.hash) {
    return hasRequestCache.data;
  } else {
    hasRequestCache.hash = hash;
    hasRequestCache.data = SlRouter.pathResovle.resolvePath(hash);
  }
  return hasRequestCache.data;
};
var httpRequest = {
  path: () => {
    return requestData().path;
  },
  queryString: () => {
    return requestData().queryString;
  },
  getParameterMap: () => {
    return requestData().queryData;
  },
  getHashData: () => {
    return requestData();
  },
  getParameter: (name) => {
    let result = requestData().queryData[name];
    if (isArray(result)) {
      return result[0];
    } else {
      return result;
    }
  },
  getIntParameter: (name, defaultValue = 0) => {
    let d = httpRequest.getParameter(name);
    let n2 = parseInt(d);
    if (isNaN(n2)) {
      n2 = defaultValue;
    }
    return n2;
  },
  requestDispatch: (url, parameters) => {
    const { path, queryData } = defaultResove.resolvePath(url);
    parameters = Object.assign({}, queryData, parameters);
    let urlResult = SlRouter.pathResovle.toPath(path, parameters);
    hashUrl.setUrl(urlResult);
  },
  getParameterValues: (name) => {
    const result = requestData().queryData[name];
    if (isArray(result)) {
      return result;
    } else if (result != void 0) {
      return [result];
    }
    return [];
  }
};
window.httpRequest = httpRequest;
var isTemplateResult = (obj) => {
  return obj && (obj["_$litType$"] == 1 || obj["_$litType$"] == 2) && obj.strings && obj.values;
};
var SlRouter = class extends s {
  constructor(name = "default") {
    super();
    this.name = "default";
    this.appendResult = false;
    this.routerChangeHanlder = () => {
      const matchResult = this.findMathRouterItems();
      if (!matchResult) {
        emit(this, SlRouter.HASH_EVENT_NOT_FOUND);
        return;
      }
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
    };
    this.name = name;
    this.routerChangeHanlder = this.routerChangeHanlder.bind(this);
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
    window.addEventListener(CHANGE_HASH_URL, this.routerChangeHanlder);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(CHANGE_HASH_URL, this.routerChangeHanlder);
    delete routerCache[this.name];
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
    return httpRequest.getHashData();
  }
  toHashPath(url, jsonData) {
    window.location.hash = this.urlConverttoHashUrl(url, jsonData);
  }
  urlConverttoHashUrl(url, jsonData) {
    const { path, queryData } = defaultResove.resolvePath(url);
    jsonData = Object.assign({}, queryData, jsonData);
    return SlRouter.pathResovle.toPath(path, jsonData);
  }
  findMathRouterItems() {
    const path = this.getCurrentPath().path;
    if (!this.routers) {
      return null;
    }
    const parentMap = /* @__PURE__ */ new Map();
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
    try {
      for (let temp of matchItems) {
        let tempResult;
        if (temp.import) {
          tempResult = isFunction(temp.import) ? await temp.import() : await import(
            /* @vite-ignore */
            temp.import
          );
        }
        importResult.push(tempResult);
      }
    } catch (ex) {
      console.error(ex);
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
        el.router = this;
        el.routerData = currentData;
      } else if (typeof temp.component == "function") {
        el = await temp.component(this);
        if (isTemplateResult(el)) {
          let temp2 = document.createDocumentFragment();
          x(el, temp2);
          el = temp2;
        }
      }
      if (el != void 0) {
        elList.push(el);
        parent.appendChild(el);
        parent = el;
      }
    }
    if (!this.appendResult) {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
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
  render() {
    return $`<slot></slot>`;
  }
};
SlRouter.pathResovle = defaultResove;
SlRouter.HASH_EVENT_BEFORE = "hash-router-before";
SlRouter.HASH_EVENT_AFTER = "hash-router-after";
SlRouter.HASH_EVENT_NOT_FOUND = "hash-router-not-FOUND";
__decorateClass([
  e({ reflect: true, attribute: "name" })
], SlRouter.prototype, "name", 2);
__decorateClass([
  e({ type: Boolean })
], SlRouter.prototype, "appendResult", 2);
__decorateClass([
  e({ attribute: false, reflect: false })
], SlRouter.prototype, "routers", 2);
__decorateClass([
  watch("name")
], SlRouter.prototype, "watchNameChange", 1);
SlRouter = __decorateClass([
  n("sl-router")
], SlRouter);
var addRouterBeforHook = (router, el, handler) => {
  let result;
  result = addEvent(router, SlRouter.HASH_EVENT_BEFORE, () => {
    el.router = router;
    handler(router);
  });
  el.addController({
    hostDisconnected: () => {
      result.dispose();
    }
  });
};
var addRouterAfterHook = (router, el, handler) => {
  let result;
  const controller = {
    hostConnected: () => {
      result = addEvent(router, SlRouter.HASH_EVENT_AFTER, () => {
        el.router = router;
        handler(router);
      });
    },
    hostDisconnected: () => {
      result.dispose();
    }
  };
  el.addController(controller);
};

export {
  getRouterByName,
  httpRequest,
  isTemplateResult,
  SlRouter,
  addRouterBeforHook,
  addRouterAfterHook
};
