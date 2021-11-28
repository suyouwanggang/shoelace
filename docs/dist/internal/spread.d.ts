import { Directive, ElementPart } from 'lit/directive.js';
export declare type SpreadResult = {
    [key in string]: string | number | Array<string> | {
        [k: string]: string | boolean;
    } | EventListenerObject | EventListener;
};
/**
 * 给el 添加样式
 * @param el
 * @param styleObj
 */
export declare const setStyle: (el: Element, styleObj: string | string[] | {
    [k: string]: string;
}) => void;
export declare const removeStyle: (el: Element, styleObj: string | string[] | {
    [k: string]: string;
}) => void;
export declare const setClass: (el: Element, classObj: string | string[] | {
    [k: string]: boolean;
}) => void;
export declare const removeClass: (el: Element, classObj: string | string[] | {
    [k: string]: boolean;
}) => void;
/**
 * 给 el 添加 属性，attribute, style, class ,event
 *
 * "." 开头的key 为自定义属性
 *
 * "@" 开头的为事件
 *
 * "style":行内样式，支持字符串 ，用逗号";":"font-weight:bold;color:red"或者类似['font-weight:bold','color:red'] 或者 {'color':'red','font-size':'14px'}
 *
 * "class":，用空格分隔字符串，或者['class01','class01'] 或者类似 {class:true}
 * 其余为，attribute
 *
 *
 *
 * ```js
 *
 * html`<sl-tag ${spread({
 *  '.prop01':{},
 *  '.prop02':{},
 *  '@click':(event:Event)=>{},
 *  '@special-event':(event:Event)=>{},
 *  'style':'font-weight:bold;color:red',
 *  'class':'class1,class2',
 *  'attr01':'A'
 * })}></sl-tag>`
 *
 *
 * html`<sl-tag ${spread({
 *  '.prop01':{},
 *  '.prop02':{},
 *  '@click':(event:Event)=>{},
 *  '@special-event':(event:Event)=>{},
 *  'style':{'font-weight':'bold';'color':'red'},
 *  'class':['class1','class2'],
 *  'attr01':'A'
 * })}></sl-tag>`
 *
 *```
 *
 *
 *
 *
 */
declare class SpreadDirective extends Directive {
    private old;
    private el;
    render(_obj?: SpreadResult): symbol;
    update(_part: ElementPart, [obj]: Parameters<this['render']>): symbol;
    setObjectValue(obj?: SpreadResult): void;
    removeObjectValue(obj: SpreadResult): void;
}
/**
 *
 * 给Element Tag 添加属性(.开头），attribute,class,style,事件（@开头的属性)
 *  ```js
 *
 * html`<sl-tag ${spread({
 *  '.prop01':{},
 *  '.prop02':{},
 *  'id':'001',
 *  '@click':(event:Event)=>{},
 *  '@special-event':(event:Event)=>{},
 *  'style':'font-weight:bold;color:red',
 *  'class':'class1,class2',
 *  'attr01':'A'
 * })}></sl-tag>`
 *
 *
 * html`<sl-tag ${spread({
 *  '.prop01':{},
 *  '.prop02':{},
 *  'id':'001',
 *  '@click':(event:Event)=>{},
 *  '@special-event':(event:Event)=>{},
 *  'style':{'font-weight':'bold';'color':'red'},
 *  'class':['class1','class2'],
 *  'attr01':'A'
 * })}></sl-tag>`
 *
 *```
 */
export declare const spread: (_obj?: SpreadResult | undefined) => import("lit-html/directive").DirectiveResult<typeof SpreadDirective>;
export type { SpreadDirective };
//# sourceMappingURL=spread.d.ts.map