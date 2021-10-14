declare const resouce_changeEvent = "window-resouce-change-event";
/**
 * 设置组件语言
 * @param locale
 */
declare function setLocal(locale: string): Promise<void>;
/**
 * 获取组件语言
 * @returns
 */
declare function getLocal(): string;
/**
 * 获取组件支持的语言列表
 * @returns
 */
declare function getSuppurtLocals(): string[];
/**
 * 获取资源数据
 * @param path,支持用'.' 分隔的路径
 * @returns
 */
declare function getResouceValue(keys: string): any;
export { setLocal, getLocal, getSuppurtLocals, getResouceValue, resouce_changeEvent };
