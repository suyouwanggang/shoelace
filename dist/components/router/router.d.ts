import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { PathNameResult, ResovlePathInterface } from './pathResovle';
export declare type RouterItem = {
    name?: string /**路径名称 */;
    path: string /***匹配路径 */;
    import?: string | (() => any | Promise<any>) /**需要动态加载的资源 */;
    children?: RouterItem[] /**子路径**/;
    component?: string | ((router: SlRouter) => HTMLElement | Promise<HTMLElement> | Promise<TemplateResult<1>>);
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
        [key in string]: string | string[];
    } /**查询参数 */;
    pathData: {
        [key in string]: string;
    } /** path 参数 */;
};
/**
 * 根据路由名称，获取路由
 * @param name,路由名称，默认为default
 */
export declare const getRouterByName: (name?: string) => SlRouter;
/**
 * 模拟HttpServletRequest 来解析hash 参数
 */
export declare const httpRequest: {
    /**
     * 获取请求路径
     * @returns
     */
    path: () => string;
    /**
     * 所有查询参数
     * @returns
     */
    queryString: () => string;
    /**
     * 获取所有请求的参数
     * @returns
     */
    getParameterMap: () => {
        [key: string]: string | string[];
    };
    /**
     * 获取hash 全部数据和属性
     * @returns
     */
    getHashData: () => {
        path: string;
        queryString: string;
        queryData: {
            [key: string]: string | string[];
        };
    };
    /**
     * 获取特定的参数
     * @param name  参数名称
     * @returns
     */
    getParameter: (name: string) => string;
    getIntParameter: (name: string, defaultValue?: number) => number;
    requestDispatch: (url: string, parameters: PathNameResult) => void;
    /**
     * 获取特定的参数，
     * @param name 参数名称
     * @returns
     */
    getParameterValues: (name: string) => string[];
};
export declare const isTemplateResult: (obj: any) => obj is TemplateResult<1 | 2>;
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
    /** 是否是追加路由匹配组件到路由结果中 */
    appendResult: boolean;
    /**设置路由路径 */
    routers: RouterItem[];
    constructor(name?: string);
    watchNameChange(oldName: string, newName: string): void;
    firstUpdated(map: PropertyValues): void;
    connectedCallback(): void;
    /**取消导航 */
    disconnectedCallback(): void;
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
    /**设置路径解析器,（所有路由参数，路径解析规则都应该一致) */
    static pathResovle: ResovlePathInterface;
    /**
     * 获取当前导航数据
     * @returns
     */
    getCurrentPath(): {
        path: string;
        queryString: string;
        queryData: {
            [key: string]: string | string[];
        };
    };
    /**
     * 将url 和 jsonData 转为hash 路径,并且进行导航
     * @param url 路径,例如/user/list, /user/1000, /user/100?id=2223,
     * @param jsonData 参数 例如 {a:'1',b:'2'}
     */
    toHashPath(url: string, jsonData?: PathNameResult): void;
    private urlConverttoHashUrl;
    findMathRouterItems(): {
        items: RouterItem[];
        url: string;
    };
    static HASH_EVENT_BEFORE: string;
    static HASH_EVENT_AFTER: string;
    static HASH_EVENT_NOT_FOUND: string;
    /**
     * 处理路由匹配
     * @param matchItems  当前匹配的路径路径
     * @param pattern  当前路由pattern 值
     */
    protected excuteRouterComponenent(matchItems: RouterItem[], pattern: string): Promise<void>;
    protected routerChangeHanlder: () => void;
    render(): TemplateResult<1>;
}
/**
 * 给组件绑定路由监听
 * @param router  路由对象
 * @param el  组件
 * @param handler ，路径导航前监听
 */
export declare const addRouterBeforHook: (router: SlRouter, el: LitElement, handler: (router: SlRouter) => void) => void;
/**
 * 给组件绑定路由监听，在路由完成后监听
 * @param router  路由对象
 * @param el  组件
 * @param handler
 */
export declare const addRouterAfterHook: (router: SlRouter, el: LitElement, handler: (router: SlRouter) => void) => void;
declare global {
    interface HTMLElementTagNameMap {
        'sl-router': SlRouter;
    }
}
//# sourceMappingURL=router.d.ts.map