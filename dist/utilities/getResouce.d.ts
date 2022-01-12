/**
 * 全局 资源改变事件监听..
 */
declare const resouce_changeEvent = "window-resouce-change-event";
/**
 * 加载资源文件
 * @param locale
 * @param translateObject
 * @returns
 */
declare const loadTranslator: (locale: string, translateObject?: any) => Promise<boolean>;
/**
 * 设置当前语言，同时触发 window  resouce_changeEvent 事件
 * @param locale
 * @returns
 */
declare const setLocal: (locale: string) => any;
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
export { setLocal, getLocal, getSupportLocals, setSupportLocals, getResouceValue, resouce_changeEvent, translate, loadTranslator };
//# sourceMappingURL=getResouce.d.ts.map