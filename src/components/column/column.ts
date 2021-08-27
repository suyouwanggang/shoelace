import { LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import SlTable from '../table/table';
import { renderCellInteface, renderColInteface, SortingEnum, TdAgile } from '../table/tableHelper';

/**
 * @since 2.0
 * @status experimental
 * @description:用于定义sl-table 的表头和列，没有实际的渲染
 * 
 */
@customElement('sl-column')
export default class SlColumn extends LitElement {
  /**表头渲染
   * 签名<br>:(this:SlColumn,table:SlTable):TemplateResult<1>
   */
  @property({attribute:false,type:Object}) renderCol :renderColInteface;

   /**对应TD渲染 ,接收表格rowData,index来渲染 此对应的TD 
    * 签名<br>:(this:SlColumn,rowData:any,index:number):TemplateResult<1>|{template:TemplateResult<1>,colspan:number,rowSpan:number}
   */
   @property({attribute:false,type:Object}) renderCell :renderCellInteface;

  /**是否隐藏此列 */
   @property({type:Boolean,reflect:true,attribute:true})
   hidden:boolean;

   /** 列所对应的字段，应该唯一 */
   @property({type:String,reflect:true,attribute:true})
   field:string;

   /** 列所对应的label，默认th 就是显示此label*/
   @property({type:String,reflect:true,attribute:true})
   label:string;


   /** 列所对应的TH 的水平对齐方式*/
   @property({type:String,reflect:true,attribute:'agile-col'})
   agileCol:TdAgile='center';

   /** 列所对应的TD 的水平对齐方式*/
   @property({type:String,reflect:true,attribute:'agile-cell'})
   agileCell:TdAgile='left';

    /** 列所对应的TD 的水平对齐方式*/
    @property({type:String,reflect:true,attribute:'vagile-cell'})
    vAigleCell:'top'|'middle'|'bottom'='middle';

   /** 排序，是升序，还是降序*/
   @property({type:String,reflect:true,attribute:true})
   sort:SortingEnum;//升序，降序

   /** 列是否支持排序 */
   @property({type:Boolean,reflect:true,attribute:'sort-able'})
   sortAble:boolean;

   /** 是否支持拖动列的宽度 */
   @property({type:Boolean,reflect:true,attribute:'resize-able'})
   resizeAble:boolean;

   /**列宽 */
   @property({type:String,reflect:true,attribute:'width'})
   width:string;

   /**最小列宽 */
   @property({type:String,reflect:true,attribute:'min-width'})
   minWidth:string;

   /**最大列宽 */
   @property({type:String,reflect:true,attribute:'max-width'})
   maxWidth:string;


   /**是否允许拖动列位置 */
   @property({type:String,reflect:true,attribute:'can-drag'})
   canDrag:string;

  /**是否允许拖动到此列 */
  @property({type:String,reflect:true,attribute:'drag-accept'})
  dragAccept:string;

  /**列的类型 */
  type:'index'|'checkbox'|'radio';

  _cacheCanShowColumn?:SlColumn[];
  /**
   * 缓存 子孩子
   */
  get childCanShowColumn():SlColumn[]{
      if(!this._cacheCanShowColumn){
          this._cacheCanShowColumn= Array.from(this.children).filter( (item:Element) =>{
              return item instanceof SlColumn &&item.hidden!=true;
          }) as SlColumn[];
      }
     return this._cacheCanShowColumn;
  }
  get childAllColumn(){
    return Array.from(this.children) .filter( (item:Element) =>{
        return item instanceof SlColumn 
    }) as SlColumn[];
}
get table() :SlTable{
  return this.closest('sl-table') as SlTable;
}

updated(map:PropertyValues){
  super.updated(map);
  this.table?.columnChangeHanlder();
}
createRenderRoot(){
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-column': SlColumn;
  }
}
