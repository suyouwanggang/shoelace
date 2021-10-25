import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @event sl-cancel - Emitted when the animation is canceled.
 * @event sl-finish - Emitted when the animation finishes.
 * @event sl-start - Emitted when the animation starts or restarts.
 *
 * @slot - The element to animate. If multiple elements are to be animated, wrap them in a single container.
 */
export default class SlAnimation extends LitElement {
    static styles: import("lit").CSSResult;
    private animation;
    private hasStarted;
    defaultSlot: Promise<HTMLSlotElement>;
    /** The name of the built-in animation to use. For custom animations, use the `keyframes` prop. */
    name: string;
    /**
     * Plays the animation. When omitted, the animation will be paused. This prop will be automatically removed when the
     * animation finishes or gets canceled.
     */
    play: boolean;
    /** The number of milliseconds to delay the start of the animation. */
    delay: number;
    /** Determines the direction of playback as well as the behavior when reaching the end of an iteration. */
    direction: PlaybackDirection;
    /** The number of milliseconds each iteration of the animation takes to complete. */
    duration: number;
    /**
     * The easing function to use for the animation. This can be a Shoelace easing function or a custom easing function
     * such as `cubic-bezier(0, 1, .76, 1.14)`.
     */
    easing: string;
    /** The number of milliseconds to delay after the active period of an animation sequence. */
    endDelay: number;
    /** Sets how the animation applies styles to its target before and after its execution. */
    fill: FillMode;
    /** The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. */
    iterations: number;
    /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
    iterationStart: number;
    /** The keyframes to use for the animation. If this is set, `name` will be ignored. */
    keyframes: Keyframe[];
    /**
     * Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this
     * to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This
     * value can be changed without causing the animation to restart.
     */
    playbackRate: number;
    /** Gets and sets the current animation time. */
    get currentTime(): number;
    set currentTime(time: number);
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleAnimationChange(): Promise<void>;
    handleAnimationFinish(): void;
    handleAnimationCancel(): void;
    handlePlayChange(): boolean;
    handlePlaybackRateChange(): void;
    handleSlotChange(): void;
    createAnimation(): Promise<boolean>;
    destroyAnimation(): void;
    /** Clears all KeyframeEffects caused by this animation and aborts its playback. */
    cancel(): void;
    /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
    finish(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-animation': SlAnimation;
    }
}
//# sourceMappingURL=animation.d.ts.map