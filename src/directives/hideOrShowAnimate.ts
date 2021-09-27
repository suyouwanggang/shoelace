import { animations } from '../components/animation/animations';
import { ElementPart, nothing } from 'lit';
import { directive, Directive } from 'lit/directive.js';
import { animateTo, animate_hide, animate_show, shimKeyframesHeightAuto } from '../internal/animate';
import { getCssValue } from '../utilities/common';
const showTransitionDuration = 300;
const hideTransitionDuration = 300;

export type HideShowOption = {
    skip?: boolean;
    hideRemove?: boolean;
    onComplete?: (element: HTMLElement) => void;
    duration?: number;
};
const requestNextFrame = (resovle: () => void) => {
    return new Promise(() => {
        requestAnimationFrame(resovle);
    })
}
const emitEvent = (el: Element) => {
    el.dispatchEvent(new CustomEvent('sl-animate-complete'));
};
class HideDirective extends Directive {
    render(_option: HideShowOption = {}) {
        return nothing;
    }
    update(_part: ElementPart, [_option]: Parameters<this['render']>) {
        requestNextFrame(() => {
            const element = _part.element as HTMLElement;
            const currentHeight = parseInt(getCssValue(element, 'height'));
            const div = document.createElement('div');
            div.style.height = currentHeight + 'px';
            div.style.width = parseInt(getCssValue(element, 'width')) + 'px';
            element.parentElement?.insertBefore(div, element);

            animateTo(element, shimKeyframesHeightAuto(animate_hide, currentHeight), {
                easing: 'ease-out',
                duration: (_option && _option.duration) || hideTransitionDuration
            }).then(() => {
                requestAnimationFrame(() => {
                    element.parentElement?.removeChild(div);
                    emitEvent(element);
                    if (_option && _option.onComplete) {
                        _option.onComplete(element);
                    }
                    if (_option && _option?.hideRemove) {
                        element.parentElement?.removeChild(element);
                    }
                });
            });
        })

        return nothing;
    }
}

class ShowDirective extends Directive {
    render(_option?: HideShowOption) {
        return nothing;
    }
    update(_part: ElementPart, [_option]: Parameters<this['render']>) {
        requestNextFrame(() => {
            const element = _part.element as HTMLElement;
            const currentHeight = parseInt(getCssValue(element, 'height'));
            animateTo(element, shimKeyframesHeightAuto(animate_show, currentHeight), {
                duration: (_option && _option.duration) || showTransitionDuration
            }).then(() => {
                emitEvent(element);
                if (_option && _option.onComplete) {
                    _option.onComplete(element);
                }
            });
        });
        return nothing;
    }
}

export type AnimateOption = {
    name: string;
    onComplete?: (element: HTMLElement) => void;
    duration: number;
};

class AnimateDirective extends Directive {
    render(_option: AnimateOption) {
        return nothing;
    }
    update(_part: ElementPart, [_option]: Parameters<this['render']>) {
        if (!_option || !_option.name) {
            return;
        }
        requestNextFrame(() => {
            const element = _part.element as HTMLElement;
            let frames = (animations as any)[_option.name];
            if (!frames) {
                return;
            }
            animateTo(element, (animations as any)[_option.name], {
                duration: (_option && _option.duration) || showTransitionDuration
            }).then(() => {
                emitEvent(element);
                if (_option && _option.onComplete) {
                    _option.onComplete(element);
                }
            });
        })
        return nothing;
    }
}

/**
 * 隐藏元素的时候，给Elment 添加隐藏动画
 * ```js
 * html`<div ${hide()}> element</div>`
 * html`<div ${show()}> element</div>`
 * html`<div ${dAnimate({name:'slidInUp'})}> element</div>`
 */
export const hide = directive(HideDirective);
export const show = directive(ShowDirective);
export const doAnimate = directive(AnimateDirective);
