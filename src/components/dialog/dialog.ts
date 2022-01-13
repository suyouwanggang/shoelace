import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { whenRef } from '../../directives/choose';
import { animateTo, stopAnimations } from '../../internal/animate';
import { emit, waitForEvent } from '../../internal/event';
import Modal from '../../internal/modal';
import { lockBodyScrolling, unlockBodyScrolling } from '../../internal/scroll';
import { HasSlotController } from '../../internal/slot';
import { isPreventScrollSupported } from '../../internal/support';
import { watch } from '../../internal/watch';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import '../icon-button/icon-button';
import { isNumberWidth } from '../table/tableHelper';
import styles from './dialog.styles';
import dialog_resize from './dialog_resize.litcss';
import { dragResizeController, renderResizeAble } from './dragRender';


const hasPreventScroll = isPreventScrollSupported();

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The dialog's content.
 * @slot label - The dialog's label. Alternatively, you can use the label prop.
 * @slot title-exta - The dialog's title exta.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @event sl-show - Emitted when the dialog opens.
 * @event sl-after-show - Emitted after the dialog opens and all animations are complete.
 * @event sl-hide - Emitted when the dialog closes.
 * @event sl-after-hide - Emitted after the dialog closes and all animations are complete.
 * @event sl-initial-focus - Emitted when the dialog opens and the panel gains focus. Calling `event.preventDefault()`
 *   will prevent focus and allow you to set it on a different element in the dialog, such as an input or button.
 * @event sl-request-close - Emitted when the user attempts to close the dialog by clicking the close button, clicking the
 *   overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the dialog from closing. Avoid
 *   using this unless closing the dialog will result in destructive behavior such as data loss.
 * @event sl-resize-position-before Emitted before when the user want to drag to change dialog size
 * @event sl-resize-position Emitted after  the user  drag  dialog size
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay.
 * @csspart panel - The dialog panel (where the dialog and its content is rendered).
 * @csspart header - The dialog header.
 * @csspart title - The dialog title. 
 * @csspart title-exta - The dialog title exta.
 * @csspart close-button - The close button.
 * @csspart body - The dialog body.
 * @csspart footer - The dialog footer.
 *
 * @cssproperty --width - The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 * @animation dialog.show - The animation to use when showing the dialog.
 * @animation dialog.hide - The animation to use when hiding the dialog.
 * @animation dialog.denyClose - The animation to use when a request to close the dialog is denied.
 * @animation dialog.overlay.show - The animation to use when showing the dialog's overlay.
 * @animation dialog.overlay.hide - The animation to use when hiding the dialog's overlay.
 */
@customElement('sl-dialog')
export default class SlDialog extends LitElement {
  static styles = [styles,dialog_resize];

  @query('.dialog') dialog: HTMLElement;
  @query('.dialog__panel') panelElement: HTMLElement;
  @query('.dialog__overlay') overlayElement: HTMLElement;

  private hasSlotController = new HasSlotController(this, 'footer');
  private modalObj: Modal;
  private originalTrigger: HTMLElement | null;

  /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Indicates whether or not the dialog is can drag position.  */
  @property({ type: Boolean, reflect: true ,attribute:'drag-head'}) dragHead = false;

   /** Indicates whether or not the dialog is can resize   */
   @property({ type: Boolean, reflect: true ,attribute:'resize-able'}) resizeAble = false;

  
   /** 控制 dialog  拖动改变 大小的是 min-width ，例如： 500,50% ,500px */
   @property({ type: String, reflect: true ,attribute:'min-width'}) minWidth:string|number;

   /**控制 dialog  拖动改变 大小的是  dialog max-width  例如： 500,50% ,500px */
   @property({ type: String, reflect: true ,attribute:'max-width'}) maxWidth:string|number;

   /**控制 dialog  拖动改变 大小的是  dialog 最小高度 min-height  */
  @property({ type: String, reflect: true ,attribute:'min-height'}) minHeight:string|number;

  /**控制 dialog  拖动改变 大小的是  dialog 最大高度 max-height  */
  @property({ type: String, reflect: true ,attribute:'max-height'}) maxHeight:string|number;

  /**是否支持遮罩层   */
  @property({ type: Boolean , reflect: true ,attribute:'mask'}) mask:boolean=true;

   /**是否允许遮罩层来自动关闭   */
  @property({ type: Boolean , reflect: true ,attribute:'mask-closeable'}) maskClosable:boolean=true;

  /** 当显示遮罩层的时候， 是否允许 esc 键来关闭 弹出框 （待实现）*/
  @property({ type: Boolean , reflect: true ,attribute:'esc-closeable'})  escCloseable:boolean=false;


  /**
   * The dialog's label as displayed in the header. You should always include a relevant label even when using
   * `no-header`, as it is required for proper accessibility.
   */
  @property({ reflect: true }) label = '';

  /**
   * Disables the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the dialog.
   */
  @property({ attribute: 'no-header', type: Boolean, reflect: true }) noHeader = false;

  connectedCallback() {
    super.connectedCallback();
    this.modalObj = new Modal(this);
    dragResizeController(this);
  }

  firstUpdated() {
    this.dialog.hidden = !this.open;

    if (this.open) {
      this.modalObj.activate();
      lockBodyScrolling(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }

  /** Shows the dialog. */
  async show() {
    if (this.open) {
      return;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the dialog */
  async hide() {
    if (!this.open) {
      return;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  private requestClose() {
    if(!this.maskClosable){
      return ;
    }
   this.requestIconClose();
  }
  private requestIconClose() {
    const slRequestClose = emit(this, 'sl-request-close', { cancelable: true });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, 'dialog.denyClose');
      animateTo(this.panelElement, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.requestClose();
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      emit(this, 'sl-show');
      this.originalTrigger = document.activeElement as HTMLElement;
      this.modalObj.activate();

      lockBodyScrolling(this);

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlayElement)]);
      this.dialog.hidden = false;

      // Browsers that support el.focus({ preventScroll }) can set initial focus immediately
      if (hasPreventScroll) {
        const slInitialFocus = emit(this, 'sl-initial-focus', { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panelElement.focus({ preventScroll: true });
        }
      }

      const panelAnimation = getAnimation(this, 'dialog.show');
      const overlayAnimation = getAnimation(this, 'dialog.overlay.show');
      await Promise.all([
        animateTo(this.panelElement, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlayElement, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      // Browsers that don't support el.focus({ preventScroll }) have to wait for the animation to finish before initial
      // focus to prevent scrolling issues. See: https://caniuse.com/mdn-api_htmlelement_focus_preventscroll_option
      if (!hasPreventScroll) {
        const slInitialFocus = emit(this, 'sl-initial-focus', { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          this.panelElement.focus({ preventScroll: true });
        }
      }

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');
      this.modalObj.deactivate();

      await Promise.all([stopAnimations(this.dialog), this.overlayElement?stopAnimations(this.overlayElement):null]);
      const panelAnimation = getAnimation(this, 'dialog.hide');
      const overlayAnimation = getAnimation(this, 'dialog.overlay.hide');
      await Promise.all([
        animateTo(this.panelElement, panelAnimation.keyframes, panelAnimation.options),
        this.overlayElement? animateTo(this.overlayElement, overlayAnimation.keyframes, overlayAnimation.options):null
      ]);
      this.dialog.hidden = true;

      unlockBodyScrolling(this);

      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (trigger && typeof trigger.focus === 'function') {
        setTimeout(() => trigger.focus());
      }

      emit(this, 'sl-after-hide');
    }
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          dialog: true,
          'dialog--open': this.open,
          'dialog--has-footer': this.hasSlotController.test('footer')
        })}
        @keydown=${this.handleKeyDown}
      >
       ${whenRef(this.mask,()=>html`<div part="overlay" class="dialog__overlay" @click=${this.requestClose} tabindex="-1"></div>`)}
        <div
          part="panel"
          class="dialog__panel ${this.mask?'':'not-mask'}"
          role="dialog"
          style=${styleMap(this.panelStyle)}
          aria-modal="true"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-label=${ifDefined(this.noHeader ? this.label : undefined)}
          aria-labelledby=${ifDefined(!this.noHeader ? 'title' : undefined)}
          tabindex="0"
        >
          ${!this.noHeader
            ? html`
                <header part="header" class="dialog__header ${this.dragHead?'dragHead':''}">
                  <span part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label || String.fromCharCode(65279)} </slot>
                  </span>
                  <span part='exta-title'>
                    <slot name='exta-title'></slot>
                  </span>
                  <span class='dialog__close'  @click="${this.requestIconClose}">
                    <slot name='close-button'>
                      <sl-icon-button
                          exportparts="base:close-button"
                          class="closeImg"
                          name="x"
                          library="system"
                        ></sl-icon-button>
                      </slot>
                  </span>
                </header>
              `
            : ''}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
          ${this.resizeAble? renderResizeAble():''}
        </div>
      </div>
    `;
  }

  private get panelStyle(){
    const style:any={};
    if(this.minHeight){
      style.minHeight=isNumberWidth(this.minHeight)?this.minHeight+'px':this.minHeight;
    }
    if(this.maxHeight){
      style.maxHeight=isNumberWidth(this.maxHeight)?this.maxHeight+'px':this.maxHeight;
    }
    if(this.minWidth){
      style.minWidth=isNumberWidth(this.minWidth)?this.minWidth+'px':this.minWidth;
    }
    if(this.maxWidth){
      style.maxWidth=isNumberWidth(this.maxWidth)?this.maxWidth+'px':this.maxWidth;
    }
  return style;
}
}

setDefaultAnimation('dialog.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.8)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.denyClose', {
  keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
  options: { duration: 250 }
});

setDefaultAnimation('dialog.overlay.show', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});

setDefaultAnimation('dialog.overlay.hide', {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-dialog': SlDialog;
  }
}
