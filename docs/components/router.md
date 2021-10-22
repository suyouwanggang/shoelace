# Router

[component-header:sl-router]

A description of the component goes here.

```html preview
 <iframe src='./assets/examples/routerIframe.html' style='width:100%;height:300px;'></iframe>
```

   
### 路由上下文
```javascript
/**
 * 申明当前路由的上下文数据
 */
export type RouterContextData = {
  path: string /***hash路径*/;
  queryString?: string /**查询字符串 */;
  queryData: { [key in string]: string | number | string[] | number[] } /**查询参数 */;
  pathData: { [key in string]: string | number } /** path 参数 */;
};
```

### 路由配置 

```javascript
export type RouterItem = {
  name?: string /**路径名称 */;
  path: string /***匹配路径 */;
  import?: string | (() => any | Promise<any>) /**需要动态加载的资源 */;
  children?: RouterItem[] /**子路径**/;
  component: string | ((data: RouterContextData, item: RouterItem, importResult: any) => HTMLElement | Promise<HTMLElement>); //匹配路径，如何创建组件
  afterCreate?: (el: HTMLElement, data: RouterContextData, item: RouterItem) => void | Promise<void>; //组件连接后回调
  [key: string]: string | number | unknown /***其他自定义属性 */;
};
```
### 路由创建
```javascript
     //<sl-router id="sl-routerDIV"></sl-router>
    const router = document.querySelector('#sl-routerDIV');
    //如果同一个页面，有多个Router,则请指定router.name ,和 SlRouterLink 的name
 ```  
 ### 路由导航加密 和守护
 ```javascript
     import { CryptoHashResovle } from 'dist/components/router/cryptoHashResovle.js';
    router.pathResovle = CryptoHashResovle; //加密导航路径

     //to,from 路由obj:{item:RouterItem, data:RouterContextData}
     router.beforeRouter = (to, from, next) => {
      console.log('before', 'to', to, 'from', from);
      next(); //不执行next 路由不会触发
    };
     router.afterRouter = (to, from) => {
      console.log('after', 'to', to, 'from', from);
    };
 ``` 
 
 ### 导航到特定路由
 ```javascript
router.toHashPath(urlpattern,jsonData);
//或者通过 sl-router-link 来导航。
//<sl-router-link src="/a1">/al</sl-router-link>
//当加密的时候，如果默认的router.name='default', 如果有多个router,请执行sl-router-link.name;

/** 设置导航urlpattern */
//   @property()
//   src: string;
//   /**是否为外部导航 */
//   @property({ attribute: false })
//   external: boolean = false;

//   /**匹配SlRouter 路由，如果未指定则等同default */
//   @property({ attribute: false })
//   routerName: string;

//   /** 导航要提交的参数或者路径数据 */
//   @property({ type: Object, attribute: false })
//   data: PathNameResult;
````


[component-metadata:sl-router]
# Router Link 
[component-header:sl-router-link]
[component-metadata:sl-router-link]

