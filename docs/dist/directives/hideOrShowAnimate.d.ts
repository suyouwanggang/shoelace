import { ElementPart, nothing } from 'lit';
import { Directive } from 'lit/directive.js';
export declare type HideShowOption = {
    skip?: boolean;
    easing?: string;
    hideRemove?: boolean;
    onComplete?: (element: HTMLElement) => void;
    duration?: number;
};
export declare const requestNextFrame: (resovle: () => void) => Promise<unknown>;
export declare const doHideAnimate: (element: HTMLElement, options: KeyframeAnimationOptions, resovle?: (() => void) | undefined) => void;
export declare const doShowAnimate: (element: HTMLElement, options: KeyframeAnimationOptions, resovle?: (() => void) | undefined) => void;
declare class HideDirective extends Directive {
    render(_option?: HideShowOption): symbol;
    update(_part: ElementPart, [_option]: Parameters<this['render']>): symbol;
}
declare class ShowDirective extends Directive {
    render(_option?: HideShowOption): symbol;
    update(_part: ElementPart, [_option]: Parameters<this['render']>): symbol;
}
export declare type AnimateOption = {
    name: string;
    onComplete?: (element: HTMLElement) => void;
    easing: string;
    duration: number;
};
declare class AnimateDirective extends Directive {
    render(_option: AnimateOption): symbol;
    update(_part: ElementPart, [_option]: Parameters<this['render']>): typeof nothing | undefined;
}
/**
 * 隐藏元素的时候，给Elment 添加隐藏动画
 * ```js
 * html`<div ${hide()}> element</div>`
 * html`<div ${show()}> element</div>`
 * html`<div ${dAnimate({name:'slidInUp'})}> element</div>`
 */
export declare const hide: (_option?: HideShowOption | undefined) => import("lit-html/directive").DirectiveResult<typeof HideDirective>;
export declare const show: (_option?: HideShowOption | undefined) => import("lit-html/directive").DirectiveResult<typeof ShowDirective>;
export declare const doAnimate: (_option: AnimateOption) => import("lit-html/directive").DirectiveResult<typeof AnimateDirective>;
export {};
//# sourceMappingURL=hideOrShowAnimate.d.ts.map