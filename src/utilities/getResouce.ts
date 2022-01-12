import { emit } from '../internal/event';
import resouceZh from '../resources/resource.zh';
import { isFunction } from './common';
let currentLocal = 'zh';
/**
 * 全局 资源改变事件监听..
 */
const resouce_changeEvent = `window-resouce-change-event`;

/**
 * 设置语言 资源
 * @param locale 
 * @param translateObject 
 * @returns 
 */
const registerTranslator = async (locale: string, translateObject?: any) => {
  if (!getSupportLocals().includes(locale)) {
    throw new Error(`不支持的组件语言!支持的语言有${getSupportLocals().join(',')}`);
  }
  const localData = await loaderLocal(locale) as Object;
  if (translateObject) {
    Object.assign(localData, translateObject);
    resourceMap[locale] = localData;
  }
  if(locale!=currentLocal){
    currentLocal = locale;
    emit(window, resouce_changeEvent, {
      detail: {
        locale: locale,
        data: localData
      }
    })
  }
  return localData;
}
/**
 * 设置组件语言,通知加载自定义的语言资源
 * @param locale
 */
const setLocal = registerTranslator;


const resourceMap: any = { zh: resouceZh };
async function loaderLocal(locale: string) {
  if (resourceMap[locale]) {
    return resourceMap[locale];
  }
  return import(`../resources/resource.${locale}.js`).then(ret => {
    resourceMap[locale] = ret.default;
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
const supportLocals = ['zh', 'en'];
/**
 * 获取组件支持的语言列表
 * @returns
 */
function getSupportLocals() {
  return supportLocals;
}
function setSupportLocals(...locale: string[]) {
  supportLocals.splice(0, supportLocals.length);
  supportLocals.push(...locale);
}


/**
 * 获取资源数据
 * @param path,支持用'.' 分隔的路径
 * @returns
 */
function getResouceValue(keys: string): any {
  let array = keys.split('.');
  let obj = resourceMap[getLocal()];
  let result = obj as any;
  for (let k of array) {
    result = result[k];
  }
  return result;
}
const translate = (resourceKey: string, ...args: any): any => {
  const value = getResouceValue(resourceKey);
  if (typeof value != 'undefined') {
    if (isFunction(value)) {
      return value(...args);
    } else {
      return value;
    }
  } else {
    console.warn(`resource ${resourceKey} is not registor!`);
  }
  return undefined;
}
(window as any).setLocal = setLocal;
(window as any).getResouceValue = getResouceValue;
export { setLocal, getLocal, getSupportLocals, setSupportLocals, getResouceValue, resouce_changeEvent, translate, registerTranslator };
