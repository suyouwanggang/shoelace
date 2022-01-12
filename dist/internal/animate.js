//
// Animates an element using keyframes. Returns a promise that resolves after the animation completes or gets canceled.
//
export function animateTo(el, keyframes, options) {
    return new Promise(async (resolve) => {
        if ((options === null || options === void 0 ? void 0 : options.duration) === Infinity) {
            throw new Error('Promise-based animations must be finite.');
        }
        const animation = el.animate(keyframes, Object.assign(Object.assign({}, options), { duration: prefersReducedMotion() ? 0 : options.duration }));
        animation.addEventListener('cancel', resolve, { once: true });
        animation.addEventListener('finish', resolve, { once: true });
    });
}
//
// Parses a CSS duration and returns the number of milliseconds.
//
export function parseDuration(delay) {
    delay = (delay + '').toLowerCase();
    if (delay.indexOf('ms') > -1) {
        return parseFloat(delay);
    }
    if (delay.indexOf('s') > -1) {
        return parseFloat(delay) * 1000;
    }
    return parseFloat(delay);
}
//
// Tells if the user has enabled the "reduced motion" setting in their browser or OS.
//
export function prefersReducedMotion() {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    return query === null || query === void 0 ? void 0 : query.matches;
}
//
// Stops all active animations on the target element. Returns a promise that resolves after all animations are canceled.
//
export function stopAnimations(el) {
    return Promise.all(el.getAnimations().map((animation) => {
        return new Promise(resolve => {
            const handleAnimationEvent = requestAnimationFrame(resolve);
            animation.addEventListener('cancel', () => handleAnimationEvent, { once: true });
            animation.addEventListener('finish', () => handleAnimationEvent, { once: true });
            animation.cancel();
        });
    }));
}
// We can't animate `height: auto`, but we can calculate the height and shim keyframes by replacing it with the
// element's scrollHeight before the animation.
export function shimKeyframesHeightAuto(keyframes, calculatedHeight) {
    return keyframes.map(keyframe => Object.assign({}, keyframe, {
        height: keyframe.height === 'auto' ? `${calculatedHeight}px` : keyframe.height
    }));
}
/**
 * 显示动画
 *
 *  await animateTo(this.contentElement,shimKeyframesHeightAuto(this.active ?animate_show:animate_hide,this.active?currentHeight:oldHeight), {
 *   duration: duration,
 *   easing: 'ease'
 * });
 */
export const animate_show = [
    { height: 0, overflow: 'hidden' },
    { height: 'auto', overflow: 'hidden' }
];
/**
 * 隐藏动画
 */
export const animate_hide = [
    { height: 'auto', overflow: 'hidden' },
    { height: 0, overflow: 'hidden' }
];
