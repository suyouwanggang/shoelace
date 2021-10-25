import { LitElement, PropertyValues } from 'lit';
import { PathNameResult, ResovlePathInterface } from './pathResovle';
export declare type RouterItem = {
    name?: string /**路径名称 */;
    path: string /***匹配路径 */;
    import?: string | (() => any | Promise<any>) /**需要动态加载的资源 */;
    children?: RouterItem[] /**子路径**/;
    component: string | ((data: RouterContextData, item: RouterItem, importResult: any) => HTMLElement | Promise<HTMLElement>);
    afterCreate?: (el: HTMLElement, data: RouterContextData, item: RouterItem) => void | Promise<void>;
    [key: string]: string | number | unknown /***其他自定义属性 */;
};
/**
 * 申明当前路由的上下文数据
 */
export declare type RouterContextData = {
    path: string /***hash路径*/;
    queryString?: string /**查询字符串 */;
    queryData: {
        [key in string]: string | number | string[] | number[];
    } /**查询参数 */;
    pathData: {
        [key in string]: string | number;
    } /** path 参数 */;
};
/**
 * 根据路由名称，获取路由
 * @param name,路由名称，默认为default
 */
export declare const getRouterByName: (name?: string) => SlRouter;
/**
 * @since 2.0
 * @status experimental
 *
 * @event hash-router-before emit before router,user can prevent router
 * @event hash-router-after emit after router
 * @event hash-prevented emit when router is prevented
 * @event not-found  emit when router not found
 *
 * @slot - The default slot:路由出口.
 *
 *
 */
export default class SlRouter extends LitElement {
    static get styles(): import("lit").CSSResultGroup;
    /**设置路由名称 */
    name: string;
    /**设置路由路径 */
    routers: RouterItem[];
    constructor();
    watchNameChange(oldName: string, newName: string): void;
    firstUpdated(map: PropertyValues): void;
    connectedCallback(): void;
    /**  Router 守护 */
    beforeRouter: (to: {
        item: RouterItem;
        data: RouterContextData;
    }, from: {
        item: RouterItem;
        data: RouterContextData;
    } | undefined, next: () => void) => void;
    /** after Router */
    afterRouter: (to: {
        item: RouterItem;
        data: RouterContextData;
    }, from: {
        item: RouterItem;
        data: RouterContextData;
    } | undefined) => void;
    private _lastRouterItem;
    private _lastRouterData;
    private _routerItem;
    private _routerData;
    /**获取当前匹配路由 */
    get routerItem(): RouterItem;
    /**获取当前匹配路由数据 */
    get routerData(): RouterContextData;
    /**上一次匹配路由 */
    get lastRouterItem(): RouterItem;
    /**上一次匹配路由数据 */
    get lastRouterData(): RouterContextData;
    /**设置路径解析器 */
    pathResovle: ResovlePathInterface;
    /**
     * 获取当前导航数据
     * @returns
     */
    getCurrentPath(): {
        path: string;
        queryString: string;
        queryData: {
            [key: string]: string | number | string[] | number[];
        };
    };
    /**
     * 将url 和 jsonData 转为hash 路径,并且进行导航
     * @param url 路径,例如/user/list, /user/1000, /user/100?id=2223,
     * @param jsonData 参数 例如 {a:'1',b:'2'}
     */
    toHashPath(url: string, jsonData?: PathNameResult): void;
    private findMathRouterItems;
    static HASH_EVENT_BEFORE: string;
    static HASH_EVENT_AFTER: string;
    /**
     * 处理路由匹配
     * @param matchItems  当前匹配的路径路径
     * @param pattern  当前路由pattern 值
     */
    protected excuteRouterComponenent(matchItems: RouterItem[], pattern: string): Promise<void>;
    protected routerChangeHanlder: () => void;
    /**取消导航 */
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-router': SlRouter;
    }
}
//# sourceMappingURL=router.d.ts.map