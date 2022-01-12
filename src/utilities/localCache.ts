import { unWrapData, wrapData } from './wrapData';

/**
 *
 * @param key 存储数据key
 * @param value  存储数据,必须支持JSON化
 */
export const setLocalCache = (key: string, value: any) => {
  const valueString = JSON.stringify(value);
  localStorage.setItem(key, wrapData(valueString));
};
/**
 * 获取缓存数据
 * @param key
 * @returns
 */
export const getLocalCache = (key: string) => {
  let value = localStorage.getItem(key);
  if (value != null) {
    value = unWrapData(value);
    value = value != null ? JSON.parse(value) : value;
  } else {
    value = null;
  }
  return value as any;
};
/**
 * 删除缓存数据
 * @param key
 */
export const removeLocalCache = (key: string) => {
  if (key) {
    localStorage.removeItem(key);
  }
};
