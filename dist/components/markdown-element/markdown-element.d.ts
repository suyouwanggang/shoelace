import { LitElement, PropertyValues } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 *
 *
 *
 *
 *
 * @csspart base - The component's base wrapper.
 *
 *
 */
export default class SlMarkdownElement extends LitElement {
    static styles: import("lit").CSSResult;
    /**  mdsrc markdown resource */
    mdsrc: string;
    /**  the markdown string  */
    markdown: string;
    /** theme name for  prismjs  */
    theme: 'light' | 'dark' | 'ant' | 'wechat';
    _themeCss: string;
    themeChange(): void;
    firstUpdated(map: PropertyValues): void;
    update(map: PropertyValues): void;
    private cdn;
    fetchMode: 'cors' | 'same-origin' | 'no-cors' | 'navigate';
    /**
     * @method fetchAsText
     * @description method to fetch markdown from a url or path
     * @param {String} src  url to fetch
     * @return {Promise}
     */
    fetchAsText(src: string): Promise<string>;
    private baseDiv;
    protected createRenderRoot(): this;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-markdown-element': SlMarkdownElement;
    }
}
//# sourceMappingURL=markdown-element.d.ts.map