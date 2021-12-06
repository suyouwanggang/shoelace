/**
 * 全局 资源改变事件监听..
 */
declare const resouce_changeEvent = "window-resouce-change-event";
/**
 * 设置组件语言
 * @param locale
 */
declare function setLocal(locale: string, loadOtherResouce?: (data: any) => void): Promise<{
    pageBtn: {
        total: (total: number) => string;
        first: string;
        last: string;
        prev: string;
        next: string;
    };
    transferSelectedFun: (selected: number, filterSize: number, _total: number) => string;
    seachTransfer: string;
    noData: string;
    date: {
        showHeaderStr: (date: Date, mode: "year" | "month" | "date") => string;
        months: string[];
        weekDays: string[];
    };
}>;
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
export { setLocal, getLocal, getSupportLocals, setSupportLocals, getResouceValue, resouce_changeEvent };
//# sourceMappingURL=getResouce.d.ts.map