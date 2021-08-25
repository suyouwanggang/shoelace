import { HtmlRenderer, Parser } from 'commonmark';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { customElement, property, state } from 'lit/decorators.js';
import * as Prism from 'prismjs';
import styles from './markdown-element.styles';

/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-example
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('sl-markdown-element')
export default class SlMarkdownElement extends LitElement {
  static styles = styles;

  /**  mdsrc markdown resource */
  @property({type:String}) mdsrc:string;
  /** safe enable safe render for commonmark  */
  @property({type:Boolean}) safe:boolean=false;

  /**  the markdown string  */
  @property({type:String}) markdown:string;

   /** theme name for  prismjs  */
   @property({type:String,attribute:false,reflect:true}) themeURL?:string;
  
  @state() __markdownRendered  :TemplateResult<1>;
  private _mParser=new Parser();
  private _mdhtmlRender=new HtmlRenderer({safe:this.safe});

  update(map:PropertyValues){
    super.update(map);
      if(map.has('mdsrc')){
        this.fetchAsText(this.mdsrc).then(markdown=>{
           this.markdown=markdown;
        })
      }
      if(map.has('markdown')){
          this.__markdownRendered=this.parseMarkdown(this.markdown);
      }
      if(map.has('themeURL')&& this.themeURL){
          this.fetchAsText(this.themeURL).then(style=>{
            this._innerStyles=style;
          })
      }
  }
  @state()
  fetchMode:'cors'|'same-origin'|'no-cors'|'navigate'='same-origin';
  /**
  * @method fetchAsText
  * @description method to fetch markdown from a url or path
  * @param {String} src  url to fetch
  * @return {Promise}
  */
  fetchAsText(src:string) {
    return fetch(src,{
      mode:this.fetchMode,
    }).then(res => res.text());
  }
/**
  * @method parseMarkdown
  * @description parse markdown string to html content
  * @param {String} markdown string with markdown content
  * @return {Object} html template string
  */
 parseMarkdown(markdown:string) {
    return html`${unsafeHTML(this._mdhtmlRender.render(this._mParser.parse(markdown)))}`;
 }
  updated(map:PropertyValues) {
      super.updated(map);
      Prism.highlightAllUnder(this.renderRoot);
  }
  
  @state() _innerStyles :String='';
  
  render() {
    return html`<style>${this._innerStyles}</style>${this.__markdownRendered}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-markdown-element': SlMarkdownElement;
  }
}
