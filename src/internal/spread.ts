import { nothing } from "lit";
import { directive, Directive, ElementPart } from "lit-html/directive";

type SpreadItemType={
    [key in string]:string|number|Object|EventListenerObject|EventListener;
};
const getKey=(k:string)=>{
    return k.substr(1);
}
/**
 * 给 el 添加 属性，attribute, style, class ,event 
 * 
 * "." 开头的key 为自定义属性
 * 
 * "@" 开头的为事件
 * 
 * "style":行内样式
 * 
 * "class":class字符串，用“，”分隔
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
 *``` 
 *
 * 
 * 
 * 
 */
class SpreadDirective extends Directive{
    private old:SpreadItemType;
    private el:Element;
    render(_obj:SpreadItemType){
        return nothing;
    }
    update(_part: ElementPart, [obj]:Parameters<this['render']>){
        if(this.old&&this.el){
            this.removeObjectValue(this.old);
        }
        this.el=_part.element;
        this.setObjectValue(obj);
        if(obj){
            this.old={...obj};
        }
        return nothing;
    }
    setObjectValue(obj:SpreadItemType){
        if(!obj){
            return ;
        }
        for(let k in obj){
            let key=getKey(k);
            if(k.startsWith('@')){//事件
                this.el.addEventListener(key,obj[k] as EventListener);
            }else if(k.startsWith('.')){//事件
                (this.el as any)[key]=obj[k];
            }else if('style'==k){//style ,内置样式
                let style=this.el.getAttribute('style')||'';
                this.el.setAttribute('style',style+';'+ String(obj[k]));
            }else if('class'==k){//class
                let array=(obj[k] as string).split(",");
                this.el.classList.add( ...array);
            }else{
                this.el.setAttribute(key,String(obj[k]));
            }
        }
    }

    removeObjectValue(obj:SpreadItemType){
        if(!obj){
            return ;
        }
        for(let k in obj){
            let key=getKey(k);
            if(k.startsWith('@')){//事件
                this.el.removeEventListener(key,obj[k] as EventListener);
            }else if(k.startsWith('.')){//属性
                (this.el as any)[key]=undefined;
            }else if('style'==k){//style
                let style=this.el.getAttribute('style')||'';
                let lastIndex=style.lastIndexOf(';'+obj[k] as string);
                if(lastIndex>=0){
                    style=style.substring(0,lastIndex);
                }
                this.el.setAttribute('style',style);
            }else if('class'==k){//class
                let array=(obj[k] as string).split(",");
                this.el.classList.remove( ...array);
            }else{
                this.el.setAttribute(key,String(obj[k]));
            }
        }
    }
}

export const spread = directive(SpreadDirective);
export type { SpreadDirective };
