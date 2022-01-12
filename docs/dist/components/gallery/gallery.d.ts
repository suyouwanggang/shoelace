import { LitElement, TemplateResult, PropertyValues } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 *
 *
 * @event {{value:number,toValue:number}} sl-gallery-before-change - Emitted when before change the current image index .
 * @event {{value:number}} sl-gallery-change - Emitted current image index changed.
 * @event {{image:Image}} sl-gallery-image-load - Emitted  image load.
 * @event {{image:Image}} sl-gallery-image-click - Emitted  image click.
 *
 * @slot - The default slot.
 *
 * @csspart base - The component's base wrapper.
 * @csspart images - The real images container.
 * @csspart thumbs - The thumb images container.
 * @csspart image - The current image to display.
 * @csspart left-nav - The left nav button.
 * @csspart right-nav - The right nav button.
 * @csspart nav-button - The smal nav-button
 * @csspart thumb-image - The thums inner images
 *
 *
 *
 * @cssproperty --thumb-image-size -  thumb-images size default 100px .
 * @cssproperty --sl-image-transition-time: --transition time  default 450ms - .
 */
export default class SlGallery extends LitElement {
    static styles: import("lit").CSSResult;
    /** 图片路径. */
    images: Array<string>;
    /** 缩略图图片路径，如果不设置，默认为images */
    thumb_images?: Array<string>;
    currentIndex: number;
    /**缩略图显示位置 */
    thumbPosition: 'bottom' | 'left' | 'top' | 'right';
    /** 图片对于其他其他数据 */
    image_datas: Array<unknown>;
    /**当前图片自定义显示  */
    imageRender?: (this: SlGallery, image_data: unknown, index: number) => TemplateResult<1>;
    /** 是否显示暂停按钮 */
    show_pause: boolean;
    /** 是否延迟加载图片 */
    layImage: boolean;
    /** 是否自动切换展示图片 */
    autoPlay: boolean;
    /**自动切换时间 */
    autoPlaytimes: number;
    private _intervalTimeID?;
    /** 是否显示 全屏按钮 */
    show_fullscreen: boolean;
    /** 是否显示 左右切换按钮 */
    showNavButtons: boolean;
    /** 可以通过 全局 left,right 键来调整当前图片 */
    windowKeyEnable: boolean;
    /** 是否全屏 :内部使用*/
    isFullScreened: boolean;
    watchAutoPlay(): void;
    private _windowKeyHander?;
    private keyEnableChange;
    /** 根据相对位置调整 当前显示的图片 */
    private goImageByChange;
    disconnectedCallback(): void;
    watchChangeImages(): void;
    private _loadedOneImage;
    /** 渲染 左右切换图片按钮 */
    private renderNavLefAndRight;
    /** 渲染 thumbimages */
    private renderThumbimages;
    /** 渲染 images*/
    private renderImages;
    private renderImgeNavigations;
    private renderPauseButton;
    private renderFullScreenButton;
    /**
     * 改变组件全屏状态
     */
    changeFullScreenState(): void;
    private caculateThumbPotion;
    private _resizeRemoveAbleObj;
    firstUpdated(map: PropertyValues): void;
    updated(map: PropertyValues): void;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-gallery': SlGallery;
    }
}
//# sourceMappingURL=gallery.d.ts.map