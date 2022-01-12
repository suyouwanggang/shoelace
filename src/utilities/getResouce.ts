import { emit } from '../internal/event';
import resouceZh from '../resources/resource.zh';
import resourceEn from '../resources/resource.en';
import { isFunction } from './common';
let currentLocal = 'zh';
/**
 * 全局 资源改变事件监听..
 */
const resouce_changeEvent = `window-resouce-change-event`;

/**
 * 加载资源文件
 * @param locale 
 * @param translateObject 
 * @returns 
 */
const loadTranslator=async (locale:string,translateObject? :any)=>{
  if (!getSupportLocals().includes(locale)) {
    throw new Error(`不支持的组件语言!支持的语言有${getSupportLocals().join(',')}`);
  }
  const localData = getCurrentLocalData(locale) as Object;
  if (translateObject) {
    const result=await translateObject;
    Object.assign(localData, result);
  }
  emit(window, resouce_changeEvent, {
    detail: {
      old:currentLocal,
      locale: locale,
      data: getCurrentLocalData(currentLocal)
    }
  })
  return true;
}
/**
 * 设置当前语言，同时触发 window  resouce_changeEvent 事件
 * @param locale 
 * @returns 
 */
const setLocal = (locale: string) => {
  if (!getSupportLocals().includes(locale)) {
    throw new Error(`不支持的组件语言!支持的语言有${getSupportLocals().join(',')}`);
  }
  const data=getCurrentLocalData(currentLocal);
  currentLocal = locale;
  emit(window, resouce_changeEvent, {
    detail: {
      old:currentLocal,
      locale: locale,
      data: getCurrentLocalData(currentLocal)
    }
  })
  
  return data;
}

const resourceMap: any = { zh: resouceZh,en:resourceEn };
function getCurrentLocalData(locale: string) {
  let result=  resourceMap[locale];
  if (typeof result=='undefined') {
    result=resourceMap[locale]={};
  }
  return result;
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
export { setLocal, getLocal, getSupportLocals, setSupportLocals, getResouceValue, resouce_changeEvent, translate, loadTranslator };
