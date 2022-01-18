import { createPopper, Instance as PopperInstance } from '@popperjs/core/dist/esm';
import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { animateTo, stopAnimations } from '../../internal/animate';
import { emit, waitForEvent } from '../../internal/event';
import { watch } from '../../internal/watch';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import styles from './dropdown.styles';


/**
 * @since 2.0
 * @status stable
 *
 * @slot - The dropdown's content.
 * @slot trigger - The dropdown's trigger, usually a `<sl-button>` element.
 *
 * @event sl-show - Emitted when the dropdown opens.
 * @event sl-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event sl-hide - Emitted when the dropdown closes.
 * @event sl-after-hide - Emitted after the dropdown closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The container that wraps the trigger.
 * @csspart panel - The panel that gets shown when the dropdown is open.
 *
 * @animation dropdown.show - The animation to use when showing the dropdown.
 * @animation dropdown.hide - The animation to use when hiding the dropdown.
 */
@customElement('sl-share-dropdown')
export default class SlShareDropdown extends LitElement {
  static styles = styles;
  @property({type:Object})
  public trigger: Element;
  @query('.dropdown__panel') panel: HTMLElement;
  @query('.dropdown__positioner') positioner: HTMLElement;

  private popover: PopperInstance;

  /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
   * inside of the viewport.
   */
  @property() placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end' = 'bottom-start';

  /** Disables the dropdown so the panel will not open. */
  @property({ type: Boolean }) disabled = false;

  /**
   * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
   * controls that allow multiple selections.
   */
  @property({ attribute: 'stay-open-on-select', type: Boolean, reflect: true }) stayOpenOnSelect = false;

  /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
  @property({ attribute: false }) containingElement: HTMLElement;

  /** The distance in pixels from which to offset the panel away from its trigger. */
  @property({ type: Number }) distance = 0;

  /** The distance in pixels from which to offset the panel along its trigger. */
  @property({ type: Number }) skidding = 0;

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  @property({ type: Boolean }) hoist = false;

  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);

    if (!this.containingElement) {
      this.containingElement = this;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.hide();
    this.popover ? this.popover.destroy() : null;
  }
  handleDocumentKeyDown(event: KeyboardEvent) {
    // Close when escape is pressed
    if (event.key === 'Escape') {
      this.hide();
      return;
    }
  }

  handleDocumentMouseDown(event: MouseEvent) {
    // Close when clicking outside of the containing element
    const path = event.composedPath() as Array<EventTarget>;
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
    }
  }

  firstUpdated(changedProps:PropertyValues) {
    this.panel.hidden = !this.open;
    super.firstUpdated(changedProps);
  }
  
  protected preparedPopover(){
    if(this.popover){
      this.popover.destroy();
      this.popover=null;
    }
    this.popover = createPopper(this.trigger, this.positioner, {
      placement: this.placement,
      strategy: this.hoist ? 'fixed' : 'absolute',
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary: 'viewport'
          }
        },
        {
          name: 'offset',
          options: {
            offset: [this.skidding, this.distance]
          }
        }
      ]
    });
  }
  /** Shows the dropdown panel. */
  async show(trigger:Element) {
    this.trigger=trigger;
    this.preparedPopover();
    this.updateComplete.then(()=>{
      if (this.open) {}
      this.open = true;
      return waitForEvent(this, 'sl-after-show');
    })
  }

  /** Hides the dropdown panel */
  async hide() {
    if (!this.open) {
      return;
    }
    this.popover?.destroy();
    this.popover=null;
    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  /**
   * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
   * is activated.
   */
  reposition() {
    if (!this.open) {
      return;
    }
    this.popover.update();
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.disabled) {
      return;
    }
    if (this.open) {
      // Show
      emit(this, 'sl-show');
      document.addEventListener('keydown', this.handleDocumentKeyDown);
      document.addEventListener('mousedown', this.handleDocumentMouseDown);
      await stopAnimations(this);
      this.popover.update();
      this.panel.hidden = false;
      const { keyframes, options } = getAnimation(this, 'dropdown.show');
      await animateTo(this.panel, keyframes, options);

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
      document.removeEventListener('mousedown', this.handleDocumentMouseDown);

      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, 'dropdown.hide');
      await animateTo(this.panel, keyframes, options);
      this.panel.hidden = true;

      emit(this, 'sl-after-hide');
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          dropdown: true,
          'dropdown--open': this.open
        })}
      >
        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div part="panel" class="dropdown__panel" role="menu" aria-hidden=${this.open ? 'false' : 'true'} >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('dropdown.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.9)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  options: { duration: 100, easing: 'ease' }
});

setDefaultAnimation('dropdown.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.9)' }
  ],
  options: { duration: 100, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-share-dropdown': SlShareDropdown;
  }
}
