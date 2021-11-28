import { LitElement, PropertyValues } from 'lit';
import { AriaRole } from '../../internal/ArialRole';
import { DisposeObject } from '../../utilities/resize.util';
/**
 * thanks weightless !see https://github.com/andreasbm/weightless/blob/master/src/lib/ripple/ripple.ts
 *
 */
/**
 * Base properties of the ripple. Used when showing a ripple.
 */
export interface IRippleBaseProperties {
    autoRelease: boolean;
    initialDuration: number;
    releaseDuration: number;
}
/**
 * Properties of the ripple.
 */
export interface IRippleProperties extends IRippleBaseProperties {
    target: EventTarget;
    overlay: boolean;
    disabled: boolean;
    unbounded: boolean;
    centered: boolean;
    focusable: boolean;
    role: AriaRole;
}
/**
 * Configuration when showing a ripple.
 */
export interface IRippleConfig extends IRippleBaseProperties {
}
/**
 * Base configuration for the ripple animation.
 */
export declare const RIPPLE_ANIMATION_CONFIG: KeyframeAnimationOptions;
export declare function computeRadius(a: number, b: number): number;
/**
 * Initial animation duration.
 */
export declare const RIPPLE_INITIAL_DURATION = 350;
/**
 * Release animation duration.
 */
export declare const RIPPLE_RELEASE_DURATION = 500;
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 * @event sl-ripple-end - Emitted when ripple effect end
 *
 * @slot - The default slot wrap node for ripplie effect.
 * @cssprop --ripple-color - Color.
 * @cssprop --ripple-opacity - Opacity.
 *
 * @cssproperty --sl-ripple-color - An ripple animate background color
 */
export default class SlRipple extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Makes the ripple visible outside the bounds.
     * @attr
     */
    unbounded: boolean;
    /**
     * Makes ripple appear from the center.
     * @attr
     */
    centered: boolean;
    /**
     * Overlays the ripple.
     * @attr
     */
    overlay: boolean;
    /**
     * Disables the ripple.
     * @attr
     */
    disabled: boolean;
    /**
     * Allows focusin to spawn a ripple.
     * @attr
     */
    focusable: boolean;
    /**
     * Releases the ripple after it has been spawned.
     * @attr
     */
    autoRelease: boolean;
    /**
     * Initial animation duration.
     * @attr
     */
    initialDuration: number;
    /**
     * Fade out animation duration.
     * @attr
     */
    releaseDuration: number;
    /**
     * Role of the ripple.
     * @attr
     */
    role: AriaRole;
    /**
     * Target for the spawn ripple events.
     * @attr
     */
    target: EventTarget;
    private listeners;
    private rippleAnimationListeners;
    changeTarget(): void;
    firstUpdate(map: PropertyValues): void;
    /**
     * Add a persistent ripple when the taget gains focus.
     */
    protected onFocusIn(): void;
    /**
     * Release the current ripple when the focus is lost from the target.
     */
    protected onFocusOut(): void;
    disconnectedCallback(): void;
    releaseRipple(): void;
    /**
     * Handles the mouse down events and spawns a ripple.
     * If no event is provided the ripple will spawn in the center.
     * @param {MouseEvent | TouchEvent} e
     * @param config
     */
    spawnRipple(e?: MouseEvent | TouchEvent, config?: Partial<IRippleConfig>): DisposeObject;
    showRipple(): Promise<void>;
    /**
     * Shows a ripple at a specific coordinate.
     * @param number
     * @param config
     */
    showRippleAtCoords({ x, y }: {
        x: number;
        y: number;
    }, config?: Partial<IRippleConfig>): {
        dispose(): void;
    };
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(map: PropertyValues): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-ripple': SlRipple;
    }
}
//# sourceMappingURL=ripple.d.ts.map