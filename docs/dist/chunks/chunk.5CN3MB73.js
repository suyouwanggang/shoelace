import {
  resource_zh_default
} from "./chunk.G7DODVLX.js";
import {
  isFunction
} from "./chunk.3SJG5WV3.js";
import {
  emit
} from "./chunk.53VVVNUW.js";

// src/utilities/getResouce.ts
var currentLocal = "zh";
var resouce_changeEvent = `window-resouce-change-event`;
var registerTranslator = async (locale, translateObject) => {
  if (!getSupportLocals().includes(locale)) {
    throw new Error(`\u4E0D\u652F\u6301\u7684\u7EC4\u4EF6\u8BED\u8A00!\u652F\u6301\u7684\u8BED\u8A00\u6709${getSupportLocals().join(",")}`);
  }
  const localData = await loaderLocal(locale);
  if (translateObject) {
    Object.assign(localData, translateObject);
    resourceMap[locale] = localData;
  }
  if (locale != currentLocal) {
    currentLocal = locale;
    emit(window, resouce_changeEvent, {
      detail: {
        locale,
        data: localData
      }
    });
  }
  return localData;
};
var setLocal = registerTranslator;
var resourceMap = { zh: resource_zh_default };
async function loaderLocal(locale) {
  if (resourceMap[locale]) {
    return resourceMap[locale];
  }
  return import(`../resources/resource.${locale}.js`).then((ret) => {
    resourceMap[locale] = ret.default;
    return resourceMap[locale];
  });
}
function getLocal() {
  return currentLocal;
}
var supportLocals = ["zh", "en"];
function getSupportLocals() {
  return supportLocals;
}
function setSupportLocals(...locale) {
  supportLocals.splice(0, supportLocals.length);
  supportLocals.push(...locale);
}
function getResouceValue(keys) {
  let array = keys.split(".");
  let obj = resourceMap[getLocal()];
  let result = obj;
  for (let k of array) {
    result = result[k];
  }
  return result;
}
var translate = (resourceKey, ...args) => {
  const value = getResouceValue(resourceKey);
  if (typeof value != "undefined") {
    if (isFunction(value)) {
      return value(...args);
    } else {
      return value;
    }
  } else {
    console.warn(`resource ${resourceKey} is not registor!`);
  }
  return void 0;
};
window.setLocal = setLocal;
window.getResouceValue = getResouceValue;

export {
  resouce_changeEvent,
  registerTranslator,
  setLocal,
  getLocal,
  getSupportLocals,
  setSupportLocals,
  getResouceValue,
  translate
};
