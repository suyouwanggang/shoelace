import { LitElement } from 'lit';
import { PathNameResult } from './pathResovle';
/**
 * @since 2.0
 * @status experimental
 *
 * @event sl-router-link-before  emit before router
 */
export default class SlRouterLink extends LitElement {
    src: string;
    external: boolean;
    routerName: string;
    data: PathNameResult;
    render(): import("lit-html").TemplateResult<1>;
    get router(): import("./router").default;
    private goToLink;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-router-link': SlRouterLink;
    }
}
