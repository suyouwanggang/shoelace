import { html, LitElement, PropertyValues, render, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { emit, emitEvent } from '../../internal/event';
import { watch } from '../../internal/watch';
import { addEvent, isArray, isFunction } from '../../utilities/common';
import { DisposeObject } from '../../utilities/resize.util';
import { defaultResove, getPathNames, isPathURLMatchPattern, PathNameResult, ResovlePathInterface, stripExtraTrailingSlash } from './pathResovle';
import routStyle from './router.litcss';
export type RouterItem = {
  name?: string /**路径名称 */;
  path: string /***匹配路径 */;
  import?: string | (() => any | Promise<any>) /**需要动态加载的资源 */;
  children?: RouterItem[] /**子路径**/;
  component?: string | ( (router:SlRouter) => HTMLElement | Promise<HTMLElement>| Promise<TemplateResult<1>>); //匹配路径，如何创建组件
  afterCreate?: (el: HTMLElement, data: RouterContextData, item: RouterItem) => void | Promise<void>; //组件连接后回调
  [key: string]: string | number | unknown /***其他自定义属性 */;
};
/**
 * 申明当前路由的上下文数据
 */
export type RouterContextData = {
  path: string /***hash路径*/;
  queryString?: string /**查询字符串 */;
  queryData: { [key in string]: string | string[]  } /**查询参数 */;
  pathData: { [key in string]: string } /** path 参数 */;
};

type RouterNameMap = {
  [name in string]: SlRouter;
};
const routerCache: RouterNameMap = {};

/**
 * 根据路由名称，获取路由
 * @param name,路由名称，默认为default
 */
export const getRouterByName = (name: string = 'default') => {
  return routerCache[name];
};


type HashRequestCacheType={
  hash:String,
  data:{
    path: string;
    queryString: string;
    queryData: {
        [key: string]: string|string[] ;
    };
  },
}
const hasRequestCache:HashRequestCacheType={
  hash:'',
  data:{path:'',queryData:{},queryString:''}
}
const CHANGE_HASH_URL='CHANGE_HASH_URL';
const hashUrl={
  _url:decodeURI(window.location.hash),
  setUrl:(url:string)=>{
    hashUrl._url=url;
    emitEvent(window,CHANGE_HASH_URL,{
       detail:hashUrl._url
    })
  },
  getUrl:()=>{
    return hashUrl._url;
  }
};
addEvent(window,'hashchange',()=>{
  const hash=decodeURI(window.location.hash);
  hashUrl.setUrl(hash); //触发 CHANGE_HASH_URL
});
const requestData=()=>{
  const hash=hashUrl.getUrl();
  if(hash==hasRequestCache.hash){
    return hasRequestCache.data;
  }else{
    hasRequestCache.hash=hash;
    hasRequestCache.data=SlRouter.pathResovle.resolvePath(hash);
  }
  return hasRequestCache.data;
}
/**
 * 模拟HttpServletRequest 来解析hash 参数
 */
export const httpRequest={
  /**
   * 获取请求路径
   * @returns 
   */
  path:()=>{
    return requestData().path;
  },
  /**
   * 所有查询参数
   * @returns 
   */
  queryString:()=>{
     return requestData().queryString;
  },

  /**
   * 获取所有请求的参数
   * @returns 
   */
   getParameterMap:()=>{
    return requestData().queryData;
  },
  
  /**
   * 获取hash 全部数据和属性
   * @returns 
   */
  getHashData:()=>{
    return requestData();
  },
  /**
   * 获取特定的参数
   * @param name  参数名称
   * @returns 
   */
   getParameter:(name:string)=>{
    let result=requestData().queryData[name];
    if(isArray(result)){
      return result[0];
    }else{
      return result ;
    }
  },
  getIntParameter:(name:string, defaultValue:number=0)=>{
    let d=httpRequest.getParameter(name);
    let n=parseInt(d);
    if(isNaN(n)){
      n=defaultValue;
    }
    return n;
  },
  requestDispatch:(url:string,parameters:PathNameResult)=>{
     const { path, queryData } = defaultResove.resolvePath(url);
     parameters = Object.assign({}, queryData, parameters);
     let urlResult= SlRouter.pathResovle.toPath(path, parameters);
     hashUrl.setUrl(urlResult);
  },

  /**
   * 获取特定的参数，
   * @param name 参数名称
   * @returns 
   */
   getParameterValues:(name:string)=>{
    const result=requestData().queryData[name];
    if(isArray(result)){
      return result;
    }else if(result !=undefined){
      return [result];
    }
    return [];
  }
};
(window as any).httpRequest=httpRequest;
export const isTemplateResult =(obj:any) : obj is TemplateResult<1|2> =>{
    return obj&&(obj['_$litType$']==1||obj['_$litType$']==2)&&obj.strings&&obj.values;
}
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
@customElement('sl-router')
export default class SlRouter extends LitElement {
  static get styles() {
    return routStyle;
  }

  /**设置路由名称 */
  @property({ reflect: true, attribute: 'name' })
  name: string = 'default';

  /** 是否是追加路由匹配组件到路由结果中 */
  @property({ type:Boolean})
  appendResult:boolean=false;

  
  /**设置路由路径 */
  @property({ attribute: false, reflect: false })
  routers: RouterItem[];


  constructor(name:string='default') {
    super();
    this.name=name;
    this.routerChangeHanlder=this.routerChangeHanlder.bind(this);
  }
  @watch('name')
  watchNameChange(oldName: string, newName: string) {
    delete routerCache[oldName];
    routerCache[newName] = this;
  }
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
    this.routerChangeHanlder();
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(CHANGE_HASH_URL, this.routerChangeHanlder);
  }
   /**取消导航 */
   disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(CHANGE_HASH_URL, this.routerChangeHanlder);
    delete routerCache[this.name];
  }
  /**  Router 守护 */
  beforeRouter: (to: { item: RouterItem; data: RouterContextData }, from: { item: RouterItem; data: RouterContextData } | undefined, next: () => void) => void;
  /** after Router */
  afterRouter: (to: { item: RouterItem; data: RouterContextData }, from: { item: RouterItem; data: RouterContextData } | undefined) => void;

  
  private _lastRouterItem: RouterItem;
  private _lastRouterData: RouterContextData;

  private _routerItem: RouterItem;
  private _routerData: RouterContextData;

  /**获取当前匹配路由 */
  public get routerItem() {
    return this._routerItem;
  }
  /**获取当前匹配路由数据 */
  public get routerData() {
    return this._routerData;
  }
  /**上一次匹配路由 */
  public get lastRouterItem() {
    return this._lastRouterItem;
  }
  /**上一次匹配路由数据 */
  public get lastRouterData() {
    return this._lastRouterData;
  }

  /**设置路径解析器,（所有路由参数，路径解析规则都应该一致) */
 public static pathResovle: ResovlePathInterface = defaultResove;

  /**
   * 获取当前导航数据
   * @returns
   */
  getCurrentPath() {
    return httpRequest.getHashData();
  }

  /**
   * 将url 和 jsonData 转为hash 路径,并且进行导航
   * @param url 路径,例如/user/list, /user/1000, /user/100?id=2223,
   * @param jsonData 参数 例如 {a:'1',b:'2'}
   */
  toHashPath(url: string, jsonData?: PathNameResult) {
    window.location.hash =this.urlConverttoHashUrl(url,jsonData);
  }
  private urlConverttoHashUrl(url: string, jsonData?: PathNameResult) {
    const { path, queryData } = defaultResove.resolvePath(url);
    jsonData = Object.assign({}, queryData, jsonData);
    return SlRouter.pathResovle.toPath(path, jsonData);
  }
  

  public findMathRouterItems() {
    const path = this.getCurrentPath().path;
    if (!this.routers) {
      return null;
    }
    const parentMap = new Map<RouterItem, RouterItem>();
    const findSubRouter = (item: RouterItem, parentURl?: string) => {
      let parentURlTemp = parentURl;
      parentURlTemp = parentURlTemp ? parentURlTemp + stripExtraTrailingSlash(item.path) : item.path;
      if (item.children) {
        for (let temp of item.children) {
          parentMap.set(temp, item);
          if (findSubRouter(temp, parentURlTemp)) {
            return temp;
          }
        }
      }
      const match = isPathURLMatchPattern(path, parentURlTemp);
      if (match) {
        return item;
      }
      return null;
    };
    for (let temp of this.routers) {
      let item = findSubRouter(temp);
      if (!item) {
          continue;
      }
      let result = [];
      let matchPath = stripExtraTrailingSlash(item.path);
      result.push(item);
      while (item && parentMap.has(item)) {
        let parent = parentMap.get(item) as RouterItem;
        result.splice(0, 0, parent);
        matchPath = stripExtraTrailingSlash(parent.path) + matchPath;
        item = parent;
      }
      return { items: result, url: matchPath };
    }
    return null;
  }
  public static HASH_EVENT_BEFORE = 'hash-router-before';
  public static HASH_EVENT_AFTER = 'hash-router-after';
  public static HASH_EVENT_NOT_FOUND = 'hash-router-not-FOUND';
  

  /**
   * 处理路由匹配
   * @param matchItems  当前匹配的路径路径
   * @param pattern  当前路由pattern 值
   */
  protected async excuteRouterComponenent(matchItems: RouterItem[], pattern: string) {
    const item = matchItems[matchItems.length - 1];
    this._lastRouterData = this.routerData;
    this._lastRouterItem = this.routerItem;
    const importResult: any[] = [];
    try{
      for (let temp of matchItems) {
        let tempResult: any;
        if (temp.import) {
           tempResult = isFunction(temp.import) ? /* @vite-ignore */  await temp.import() : /* @vite-ignore */  await import( /* @vite-ignore */  temp.import); // 加了忽略警告
        }
        importResult.push(tempResult);
      }
    }catch(ex ){
       console.error(ex);
    }
    
    const currentPath = this.getCurrentPath();
    const currentData = {
      ...currentPath,
      pathData: getPathNames(currentPath.path, pattern) || {}
    } as RouterContextData;
    this._routerData = currentData;
    this._routerItem = item;
    let frag =document.createDocumentFragment();
    let parent: DocumentFragment | HTMLElement = frag;
    const elList: HTMLElement[] = [];
    for (let i = 0, j = matchItems.length; i < j; i++) {
      const temp = matchItems[i];
      let el: any;
      if (typeof temp.component == 'string') {
        el = document.createElement(temp.component);
        el.router=this;
        el.routerData=currentData;
      } else if(typeof temp.component=='function'){
        el = await temp.component(this);
        if(isTemplateResult(el)){
          let temp=document.createDocumentFragment();
          render(el,temp);
          el=temp;
        }
      }
      if(el!=undefined){
        elList.push(el);
        parent.appendChild(el);
        parent = el;
      }
    }
    if(!this.appendResult){
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }
    this.appendChild(frag);
    requestAnimationFrame(() => {
      elList.forEach(async (el, index) => {
        emit(el, 'sl-router-actived');
        let item = matchItems[index];
        if (item.afterCreate) {
           await item.afterCreate(el, currentData, item);
        }
      });
      this.afterRouter ? this.afterRouter({ item: item, data: this.routerData }, this.lastRouterItem ? { item: this.lastRouterItem, data: this.lastRouterData } : undefined) : undefined;
      emit(this, SlRouter.HASH_EVENT_AFTER);
    });
  }

  protected routerChangeHanlder = () => {
    const matchResult = this.findMathRouterItems();

    if(!matchResult){
       emit(this,SlRouter.HASH_EVENT_NOT_FOUND);
      return ;
    }
    const event = emit(this, SlRouter.HASH_EVENT_BEFORE, {
      cancelable: true,
      detail: {
        lastItem: this.lastRouterItem,
        data: this.lastRouterData
      }
    });
    if (event.defaultPrevented) {
      emit(this, 'hash-prevented');
      return;
    }
    const matchItems = matchResult.items;
    const pattern = matchResult.url;
    const item = matchItems[matchItems.length - 1];
    const currentPath = this.getCurrentPath();
    const currentData = {
      ...currentPath,
      pathData: getPathNames(currentPath.path, pattern) || {}
    } as RouterContextData;
    this.beforeRouter
      ? this.beforeRouter({ item: item, data: currentData }, this.routerItem ? { item: this.routerItem, data: this.routerData } : undefined, async () => {
        this.excuteRouterComponenent(matchItems, pattern);
      })
      : this.excuteRouterComponenent(matchItems, pattern);
  };
 
  render() {
    return html`<slot></slot>`;
  }
}
/**
 * 给组件绑定路由监听
 * @param router  路由对象
 * @param el  组件
 * @param handler ，路径导航前监听
 */
export const addRouterBeforHook=(router:SlRouter,el:LitElement,handler:(router:SlRouter)=>void)=>{
  let result:DisposeObject;
  result= addEvent(router,SlRouter.HASH_EVENT_BEFORE,()=>{
      (el as any).router=router;
       handler(router);
    });
    el.addController({
      hostDisconnected:()=>{
        result.dispose();
      }
    });
}
/**
 * 给组件绑定路由监听，在路由完成后监听
 * @param router  路由对象
 * @param el  组件
 * @param handler 
 */
export const addRouterAfterHook=(router:SlRouter,el:LitElement,handler:(router:SlRouter)=>void)=>{
    let result:DisposeObject;
    const controller={
      hostConnected:()=>{
        result=addEvent(router,SlRouter.HASH_EVENT_AFTER,()=>{
          (el as any).router=router;
          handler(router);
        });
      },
      hostDisconnected:()=>{
        result.dispose();
      }
     };
     el.addController(controller);
  
}
declare global {
  interface HTMLElementTagNameMap {
    'sl-router': SlRouter;
  }
}
