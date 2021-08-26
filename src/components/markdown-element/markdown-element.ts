import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import styles from './markdown-element.styles';
import Vditor from 'vditor';
import { watch } from '../../internal/watch';
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
@customElement('sl-markdown-element')
export default class SlMarkdownElement extends LitElement {
  static styles = styles;

  /**  mdsrc markdown resource */
  @property({ type: String }) mdsrc: string;

  /**  the markdown string  */
  @property({ type: String }) markdown: string;

  /** theme name for  prismjs  */
  @property({ type: String, attribute: false, reflect: true }) theme: 'light' | 'dark' | 'wechat' = 'wechat';

  @state() _themeCss: string;

  @watch('theme')
  themeChange() {
    switch (
      this.theme
      // case 'light':
      //     this._themeCss=light.toString();
      //     break;
      // case 'dark':
      //       this._themeCss=dark.toString();
      //       break;
      // case 'wechat':
      //   this._themeCss=wechat.toString();
      //    break;
    ) {
    }
  }
  firstUpdated(map: PropertyValues) {
    super.firstUpdated(map);
  }
  update(map: PropertyValues) {
    super.update(map);
    if (map.has('mdsrc')) {
      this.fetchAsText(this.mdsrc).then(markdown => {
        this.markdown = markdown;
        Vditor.md2html(markdown).then(res => {
          this.baseDiv.innerHTML = res;
          Vditor.mindmapRender(this.baseDiv, this.cdn, this.theme);
          Vditor.mathRender(this.baseDiv);
          Vditor.mermaidRender(this.baseDiv, this.cdn, this.theme);
          Vditor.abcRender(this.baseDiv);
          Vditor.mediaRender(this.baseDiv);
          Vditor.highlightRender({ lineNumber: true, enable: true }, this.baseDiv);
          Vditor.graphvizRender(this.baseDiv);
          Vditor.flowchartRender(this.baseDiv);
          Vditor.plantumlRender(this.baseDiv);
          Vditor.chartRender(this.baseDiv, this.cdn, this.theme);
        });
      });
    }
  }

  private cdn: string = 'https://cdn.jsdelivr.net/npm/vditor@3.8.6';
  @state()
  fetchMode: 'cors' | 'same-origin' | 'no-cors' | 'navigate' = 'same-origin';
  /**
   * @method fetchAsText
   * @description method to fetch markdown from a url or path
   * @param {String} src  url to fetch
   * @return {Promise}
   */
  fetchAsText(src: string) {
    return fetch(src, {
      mode: this.fetchMode
    }).then(res => res.text());
  }
  createRenderRoot() {
    return this;
  }
  @query('#base')
  private baseDiv: HTMLDivElement;
  @state() _innerStyles: String = '';

  render() {
    return html`<div id="base"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-markdown-element': SlMarkdownElement;
  }
}
