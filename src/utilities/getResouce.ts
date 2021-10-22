import { emit } from '../internal/event';
import resouceZh from '../resources/resource.zh';
let currentLocal = 'zh';
type ResouceType = typeof resouceZh;
/**
 * 全局 资源改变事件监听..
 */
const resouce_changeEvent = `window-resouce-change-event`;
/**
 * 设置组件语言
 * @param locale
 */
async function setLocal(locale: string, loaderback?: (data: any) => void) {
  if (!getSuppurtLocals().includes(locale)) {
    throw new Error(`不支持的组件语言!支持的语言有${getSuppurtLocals().join(',')}`);
  }
  const localData = await loaderLocal(locale);
  if (loaderback) {
    loaderback(localData);
  }
  if (locale != currentLocal) {
    currentLocal = locale;
    emit(window, resouce_changeEvent, {
      detail: {
        new: locale
      }
    });
  }
  return localData;
}
type ResouceMapType = {
  [key in string]: ResouceType;
};
const resourceMap: ResouceMapType = { zh: resouceZh };
async function loaderLocal(locale: string) {
  if (resourceMap[locale]) {
    return resourceMap[locale] as ResouceType;
  }
  return import(`../resources/resource.${locale}.js`).then(ret => {
    resourceMap[locale] = ret.default as ResouceType;
    return resourceMap[locale];
  });
}
/**
 * 获取组件语言
 * @returns
 */
function getLocal() {
  return currentLocal;
}
/**
 * 获取组件支持的语言列表
 * @returns
 */
function getSuppurtLocals() {
  return ['zh', 'en'];
}

const resultCache: {
  [key: string]: Map<string, any>;
} = {};
/**
 * 获取资源数据
 * @param path,支持用'.' 分隔的路径
 * @returns
 */
function getResouceValue(keys: string): any {
  let resultMap = resultCache[getLocal()];
  if (resultMap && resultMap.has(keys)) {
    return resultMap.get(keys);
  }
  let array = keys.split('.');
  let obj = resourceMap[getLocal()];
  if (!obj) {
    obj = resouceZh;
  }
  let result = obj as any;
  for (let k of array) {
    result = result[k];
  }
  if (!resultMap) {
    resultMap = new Map<string, any>();
    resultCache[getLocal()] = resultMap;
  }
  resultMap.set(keys, result);
  return result;
}
(window as any).setLocal = setLocal;
export { setLocal, getLocal, getSuppurtLocals, getResouceValue, resouce_changeEvent };
