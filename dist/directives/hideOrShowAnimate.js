import { animations } from '../components/animation/animations';
import { nothing } from 'lit';
import { directive, Directive } from 'lit/directive.js';
import { animateTo, animate_hide, animate_show, shimKeyframesHeightAuto } from '../internal/animate';
import { getCssValue } from '../utilities/common';
const transitionDuration = 300;
export const requestNextFrame = (resovle) => {
    return new Promise(() => {
        requestAnimationFrame(resovle);
    });
};
export const doHideAnimate = (element, options, resovle) => {
    var _a;
    const currentHeight = parseInt(getCssValue(element, 'height'));
    const div = document.createElement('div');
    div.style.height = currentHeight + 'px';
    div.style.width = parseInt(getCssValue(element, 'width')) + 'px';
    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(div, element);
    animateTo(element, shimKeyframesHeightAuto(animate_hide, currentHeight), {
        easing: options.easing ? options.easing : 'ease',
        duration: options && options.duration ? options.duration : transitionDuration
    }).then(() => {
        requestAnimationFrame(() => {
            var _a;
            (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(div);
            emitEvent(element);
            resovle ? resovle() : null;
        });
    });
};
export const doShowAnimate = (element, options, resovle) => {
    var _a;
    const currentHeight = parseInt(getCssValue(element, 'height'));
    const div = document.createElement('div');
    div.style.height = currentHeight + 'px';
    div.style.width = parseInt(getCssValue(element, 'width')) + 'px';
    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(div, element);
    animateTo(element, shimKeyframesHeightAuto(animate_show, currentHeight), {
        duration: options && options.duration ? options.duration : transitionDuration
    }).then(() => {
        var _a;
        (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(div);
        emitEvent(element);
        resovle ? resovle() : null;
    });
};
const emitEvent = (el) => {
    el.dispatchEvent(new CustomEvent('sl-animate-complete'));
};
class HideDirective extends Directive {
    render(_option = {}) {
        return nothing;
    }
    update(_part, [_option]) {
        requestNextFrame(() => {
            const element = _part.element;
            doHideAnimate(element, {
                easing: _option && _option.easing ? _option.easing : 'ease',
                duration: _option && _option.duration ? _option.duration : transitionDuration
            }, () => {
                var _a;
                if (_option && _option.onComplete) {
                    _option.onComplete(element);
                }
                if (_option && (_option === null || _option === void 0 ? void 0 : _option.hideRemove)) {
                    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(element);
                }
            });
        });
        return nothing;
    }
}
class ShowDirective extends Directive {
    render(_option) {
        return nothing;
    }
    update(_part, [_option]) {
        requestNextFrame(() => {
            const element = _part.element;
            doShowAnimate(element, {
                duration: _option && _option.duration ? _option.duration : transitionDuration
            }, () => {
                if (_option && _option.onComplete) {
                    _option.onComplete(element);
                }
            });
        });
        return nothing;
    }
}
class AnimateDirective extends Directive {
    render(_option) {
        return nothing;
    }
    update(_part, [_option]) {
        if (!_option || !_option.name) {
            return;
        }
        requestNextFrame(() => {
            const element = _part.element;
            let frames = animations[_option.name];
            if (!frames) {
                return;
            }
            animateTo(element, animations[_option.name], {
                easing: _option && _option.easing ? _option.easing : 'ease',
                duration: _option && _option.duration ? _option.duration : transitionDuration
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
