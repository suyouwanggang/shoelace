import { LitElement } from 'lit';
import '../icon/icon';
/**
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event sl-load - Emitted when the image loads successfully.
 * @event sl-error - Emitted when the image fails to load.
 *
 * @part - control-box - The container that surrounds the pause/play icons and provides their background.
 * @part - play-icon - The icon to use for the play button.
 * @part - pause-icon - The icon to use for the pause button.
 *
 * @cssproperty --control-box-size - The size of the icon box.
 * @cssproperty --icon-size - The size of the play/pause icons.
 */
export default class SlAnimatedImage extends LitElement {
    static styles: import("lit").CSSResult;
    frozenFrame: string;
    isLoaded: boolean;
    animatedImage: HTMLImageElement;
    /** The image's src attribute. */
    src: string;
    /** The image's alt attribute. */
    alt: string;
    /** When set, the image will animate. Otherwise, it will be paused. */
    play: boolean;
    handleClick(): void;
    handleLoad(): void;
    handleError(): void;
    handlePlayChange(): Promise<void>;
    handleSrcChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-animated-image': SlAnimatedImage;
    }
}
//# sourceMappingURL=animated-image.d.ts.map