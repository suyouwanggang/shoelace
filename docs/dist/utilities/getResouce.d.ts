/**
 * 全局 资源改变事件监听..
 */
declare const resouce_changeEvent = "window-resouce-change-event";
/**
 * 设置语言 资源
 * @param locale
 * @param translateObject
 * @returns
 */
declare const registerTranslator: (locale: string, translateObject?: any) => Promise<Object>;
/**
 * 设置组件语言,通知加载自定义的语言资源
 * @param locale
 */
declare const setLocal: (locale: string, translateObject?: any) => Promise<Object>;
/**
 * 获取组件语言
 * @returns
 */
declare function getLocal(): string;
/**
 * 获取组件支持的语言列表
 * @returns
 */
declare function getSupportLocals(): string[];
declare function setSupportLocals(...locale: string[]): void;
/**
 * 获取资源数据
 * @param path,支持用'.' 分隔的路径
 * @returns
 */
declare function getResouceValue(keys: string): any;
declare const translate: (resourceKey: string, ...args: any) => any;
export { setLocal, getLocal, getSupportLocals, setSupportLocals, getResouceValue, resouce_changeEvent, translate, registerTranslator };
//# sourceMappingURL=getResouce.d.ts.map