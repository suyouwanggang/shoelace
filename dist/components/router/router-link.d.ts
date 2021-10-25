import { LitElement } from 'lit';
import { PathNameResult } from './pathResovle';
/**
 * @since 2.0
 * @status experimental
 *
 * @event sl-router-link-before  emit before router
 */
export default class SlRouterLink extends LitElement {
    /** 设置导航urlpattern */
    src: string;
    /**是否为外部导航 */
    external: boolean;
    /**匹配SlRouter 路由，如果未指定则等同default */
    routerName: string;
    /** 导航要提交的参数或者路径数据 */
    data: PathNameResult;
    render(): import("lit").TemplateResult<1>;
    get router(): import("./router").default;
    private goToLink;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-router-link': SlRouterLink;
    }
}
//# sourceMappingURL=router-link.d.ts.map