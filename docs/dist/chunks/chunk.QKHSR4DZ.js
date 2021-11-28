import {
  resource_zh_default
} from "./chunk.ICZVMGWQ.js";
import {
  emit
} from "./chunk.53VVVNUW.js";

// src/utilities/getResouce.ts
var currentLocal = "zh";
var resouce_changeEvent = `window-resouce-change-event`;
async function setLocal(locale, loadOtherResouce) {
  if (!getSupportLocals().includes(locale)) {
    throw new Error(`\u4E0D\u652F\u6301\u7684\u7EC4\u4EF6\u8BED\u8A00!\u652F\u6301\u7684\u8BED\u8A00\u6709${getSupportLocals().join(",")}`);
  }
  const localData = await loaderLocal(locale);
  if (loadOtherResouce) {
    loadOtherResouce(localData);
  }
  if (locale != currentLocal) {
    currentLocal = locale;
    emit(window, resouce_changeEvent, {
      detail: {
        local: locale,
        data: localData
      }
    });
  }
  return localData;
}
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
  supportLocals.push(...locale);
}
var resultCache = {};
function getResouceValue(keys) {
  let resultMap = resultCache[getLocal()];
  if (resultMap && resultMap.has(keys)) {
    return resultMap.get(keys);
  }
  let array = keys.split(".");
  let obj = resourceMap[getLocal()];
  if (!obj) {
    obj = resource_zh_default;
  }
  let result = obj;
  for (let k of array) {
    result = result[k];
  }
  if (!resultMap) {
    resultMap = new Map();
    resultCache[getLocal()] = resultMap;
  }
  resultMap.set(keys, result);
  return result;
}
window.setLocal = setLocal;

export {
  resouce_changeEvent,
  setLocal,
  getLocal,
  getSupportLocals,
  setSupportLocals,
  getResouceValue
};
