import {
  unWrapData,
  wrapData
} from "./chunk.IZ53VJUG.js";

// src/utilities/localCache.ts
var setLocalCache = (key, value) => {
  const valueString = JSON.stringify(value);
  localStorage.setItem(key, wrapData(valueString));
};
var getLocalCache = (key) => {
  let value = localStorage.getItem(key);
  if (value != null) {
    value = unWrapData(value);
    value = value != null ? JSON.parse(value) : value;
  } else {
    value = null;
  }
  return value;
};
var removeLocalCache = (key) => {
  if (key) {
    localStorage.removeItem(key);
  }
};

export {
  setLocalCache,
  getLocalCache,
  removeLocalCache
};
