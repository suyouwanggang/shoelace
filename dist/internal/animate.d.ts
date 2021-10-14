export declare function animateTo(el: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions): Promise<unknown>;
export declare function parseDuration(delay: number | string): number;
export declare function prefersReducedMotion(): boolean;
export declare function stopAnimations(el: HTMLElement): Promise<unknown[]>;
export declare function shimKeyframesHeightAuto(keyframes: Keyframe[], calculatedHeight: number): (Keyframe & {
    height: string | number | null | undefined;
})[];
/**
 * 显示动画
 *
 *  await animateTo(this.contentElement,shimKeyframesHeightAuto(this.active ?animate_show:animate_hide,this.active?currentHeight:oldHeight), {
 *   duration: duration,
 *   easing: 'ease'
 * });
 */
export declare const animate_show: ({
    height: number;
    overflow: string;
} | {
    height: string;
    overflow: string;
})[];
/**
 * 隐藏动画
 */
export declare const animate_hide: ({
    height: string;
    overflow: string;
} | {
    height: number;
    overflow: string;
})[];
