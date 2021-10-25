import {
  getLocalCache,
  removeLocalCache,
  setLocalCache
} from "./chunk.CRPSB6VX.js";
import {
  SlColumn
} from "./chunk.4KJPF73J.js";

// src/components/table/tableCacheHelper.ts
var readTableAsCacheValue = (table) => {
  let columns = Array.from(table.children).filter((item) => {
    return item instanceof SlColumn;
  });
  let result = [];
  const iteratorColumn = (item) => {
    let sub = item.childAllColumn;
    if (sub.length == 0 && item.field) {
      result.push({
        field: item.field,
        value: {
          width: item.width ? item.width : "",
          order: item.order,
          hidden: item.hidden
        }
      });
    }
    for (let l of sub) {
      iteratorColumn(l);
    }
  };
  columns.forEach(iteratorColumn);
  return result;
};
var getTableCacheKey = (key, isDefault = false) => {
  return key ? "sl_table_cache_" + key + (isDefault ? "_default" : "") : null;
};
var removeTableCacheByKey = (key) => {
  let keyValue = getTableCacheKey(key, false);
  removeLocalCache(keyValue);
  keyValue = getTableCacheKey(key, true);
  removeLocalCache(keyValue);
};
var restoreTableDefault = (table) => {
  if (table.cacheKey) {
    let key = getTableCacheKey(table.cacheKey, true);
    let cache = getLocalCache(key);
    if (cache) {
      restoreFormTableCache(table, cache);
    }
    removeLocalCache(key);
    key = getTableCacheKey(table.cacheKey, false);
    removeLocalCache(key);
  }
};
var restoreFormTableCache = (table, cache) => {
  cache.forEach((item) => {
    const field = item.field;
    const value = item.value;
    const column = table.querySelector(`sl-column[field="${field}"]`);
    if (column) {
      if (value.width) {
        column.width = value.width;
      } else {
        column.width = "auto";
      }
      column.order = value.order;
      column.hidden = value.hidden;
    }
  });
};
var restoreFromLocalCache = (table) => {
  if (!table.cacheKey) {
    return;
  }
  let key = getTableCacheKey(table.cacheKey, false);
  try {
    let cache = getLocalCache(key);
    if (cache) {
      restoreFormTableCache(table, cache);
    }
  } catch (error) {
    console.log("cache key= " + key + "value is not valid");
    console.error(error);
  }
};
var saveAsDefaultTableCache = (table) => {
  if (!table.cacheKey) {
    return;
  }
  let key = getTableCacheKey(table.cacheKey, true);
  let cache = getLocalCache(key);
  if (!cache) {
    cache = readTableAsCacheValue(table);
    setLocalCache(getTableCacheKey(table.cacheKey, true), cache);
  }
};
var updateTableCache = (table) => {
  if (!table.cacheKey) {
    return;
  }
  let cache = readTableAsCacheValue(table);
  setLocalCache(getTableCacheKey(table.cacheKey, false), cache);
};

export {
  readTableAsCacheValue,
  removeTableCacheByKey,
  restoreTableDefault,
  restoreFormTableCache,
  restoreFromLocalCache,
  saveAsDefaultTableCache,
  updateTableCache
};
