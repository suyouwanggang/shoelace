import {
  resource_en_default
} from "./chunk.A54C7KE3.js";
import {
  resource_zh_default
} from "./chunk.G7DODVLX.js";
import {
  emit
} from "./chunk.YJDN6H4X.js";
import {
  isFunction
} from "./chunk.3SJG5WV3.js";

// src/utilities/getResouce.ts
var currentLocal = "zh";
var resouce_changeEvent = `window-resouce-change-event`;
var loadTranslator = async (locale, translateObject) => {
  if (!getSupportLocals().includes(locale)) {
    throw new Error(`\u4E0D\u652F\u6301\u7684\u7EC4\u4EF6\u8BED\u8A00!\u652F\u6301\u7684\u8BED\u8A00\u6709${getSupportLocals().join(",")}`);
  }
  const localData = getCurrentLocalData(locale);
  if (translateObject) {
    const result = await translateObject;
    Object.assign(localData, result);
  }
  emit(window, resouce_changeEvent, {
    detail: {
      old: currentLocal,
      locale,
      data: getCurrentLocalData(currentLocal)
    }
  });
  return true;
};
var setLocal = (locale) => {
  if (!getSupportLocals().includes(locale)) {
    throw new Error(`\u4E0D\u652F\u6301\u7684\u7EC4\u4EF6\u8BED\u8A00!\u652F\u6301\u7684\u8BED\u8A00\u6709${getSupportLocals().join(",")}`);
  }
  const data = getCurrentLocalData(currentLocal);
  currentLocal = locale;
  emit(window, resouce_changeEvent, {
    detail: {
      old: currentLocal,
      locale,
      data: getCurrentLocalData(currentLocal)
    }
  });
  return data;
};
var resourceMap = { zh: resource_zh_default, en: resource_en_default };
function getCurrentLocalData(locale) {
  let result = resourceMap[locale];
  if (typeof result == "undefined") {
    result = resourceMap[locale] = {};
  }
  return result;
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
  loadTranslator,
  setLocal,
  getLocal,
  getSupportLocals,
  setSupportLocals,
  getResouceValue,
  translate
};
