import { nothing } from 'lit';
import { directive, Directive } from 'lit/directive.js';
import { isArray, isObject } from '../utilities/common';
const getKey = (k) => {
    return k.substr(1);
};
/**
 * 给el 添加样式
 * @param el
 * @param styleObj
 */
export const setStyle = (el, styleObj) => {
    //style ,内置样式
    let style = el.getAttribute('style');
    let styleArray = style ? style.split(';') : [];
    if (isArray(styleObj)) {
        for (let tempStyle of styleObj) {
            tempStyle.trim() != '' ? styleArray.push(tempStyle.trim()) : '';
        }
    }
    else if (isObject(styleObj)) {
        for (let key in styleObj) {
            styleArray.push(`${key}:${styleObj[key]}`);
        }
    }
    else if (styleObj) {
        let array = styleObj.split(';');
        for (let tempStyle of array) {
            tempStyle.trim() != '' ? styleArray.push(tempStyle.trim()) : '';
        }
    }
    el.setAttribute('style', styleArray.join(';'));
};
export const removeStyle = (el, styleObj) => {
    //style ,内置样式
    let style = el.getAttribute('style') || '';
    let styleArray = style ? style.split(';') : [];
    const removeFun = (k) => {
        const index = styleArray.lastIndexOf(k);
        if (index >= 0) {
            styleArray.splice(index, 1);
        }
    };
    if (isArray(styleObj)) {
        for (let tempStyle of styleObj) {
            tempStyle.trim() != '' ? removeFun(tempStyle) : '';
        }
    }
    else if (isObject(styleObj)) {
        for (let key in styleObj) {
            removeFun(`${key}:${styleObj[key]}`);
        }
    }
    else if (styleObj) {
        let array = styleObj.split(';');
        for (let tempStyle of array) {
            tempStyle.trim() != '' ? removeFun(tempStyle.trim()) : '';
        }
    }
    el.setAttribute('style', styleArray.join(';'));
};
const classSplitReg = /[\s,]/;
export const setClass = (el, classObj) => {
    //style ,内置样式
    const classList = Array.from(el.classList);
    if (isArray(classObj)) {
        for (let tempClass of classObj) {
            tempClass.trim() != '' ? classList.push(tempClass.trim()) : '';
        }
    }
    else if (isObject(classObj)) {
        for (let key in classObj) {
            if (classObj[key]) {
                classList.push(key);
            }
        }
    }
    else if (classObj) {
        let array = classObj.split(classSplitReg);
        for (let tempClass of array) {
            tempClass.trim() != '' ? classList.push(tempClass.trim()) : '';
        }
    }
    el.classList.add(...classList);
};
export const removeClass = (el, classObj) => {
    const classList = [];
    const removeFun = (k) => {
        classList.push(k);
    };
    if (isArray(classObj)) {
        for (let tempClass of classObj) {
            tempClass.trim() != '' ? removeFun(tempClass.trim()) : '';
        }
    }
    else if (isObject(classObj)) {
        for (let key in classObj) {
            if (classObj[key]) {
                removeFun(key);
            }
        }
    }
    else if (classObj) {
        let array = classObj.split(classSplitReg);
        for (let tempClass of array) {
            tempClass.trim() != '' ? removeFun(tempClass.trim()) : '';
        }
    }
    el.classList.remove(...classList);
};
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
class SpreadDirective extends Directive {
    render(_obj) {
        return nothing;
    }
    update(_part, [obj]) {
        if (this.old && this.el) {
            this.removeObjectValue(this.old);
        }
        this.el = _part.element;
        this.setObjectValue(obj);
        if (obj) {
            this.old = Object.assign({}, obj);
        }
        return nothing;
    }
    setObjectValue(obj) {
        if (!obj) {
            return;
        }
        for (let k in obj) {
            if (k.startsWith('@')) {
                const key = getKey(k);
                //事件
                this.el.addEventListener(key, obj[k]);
            }
            else if (k.startsWith('.')) {
                const key = getKey(k);
                //事件
                this.el[key] = obj[k];
            }
            else if ('style' == k) {
                setStyle(this.el, obj[k]);
            }
            else if ('class' == k) {
                setClass(this.el, obj[k]);
            }
            else {
                this.el.setAttribute(k, String(obj[k]));
            }
        }
    }
    removeObjectValue(obj) {
        if (!obj) {
            return;
        }
        for (let k in obj) {
            if (k.startsWith('@')) {
                //事件
                const key = getKey(k);
                this.el.removeEventListener(key, obj[k]);
            }
            else if (k.startsWith('.')) {
                //属性
                const key = getKey(k);
                this.el[key] = undefined;
            }
            else if ('style' == k) {
                removeStyle(this.el, obj[k]);
            }
            else if ('class' == k) {
                removeClass(this.el, obj[k]);
            }
            else {
                this.el.setAttribute(k, String(obj[k]));
            }
        }
    }
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
export const spread = directive(SpreadDirective);
