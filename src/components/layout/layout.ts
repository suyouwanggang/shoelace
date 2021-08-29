import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { watchProps } from '../../internal/watchProps';
import styles from './layout.styles';

/**
 * @since 2.0
 * @status experimental
 * @description flex 布局组件实现,默认是flex 垂直布局
 *
 *
 *
 *
 * @slot - The default slot.
 *
 *
 *
 *
 *
 */
@customElement('sl-layout')
export default class SlLayout extends LitElement {
  static styles = styles;

  /** 是否按照行进行Flex row布局 */
  @property({ type: Boolean, attribute: 'row' }) row = true;
  /** 是否按照列进行Flex column布局 */
  @property({ type: Boolean, attribute: 'column' }) column = false;

  /** 是否 主轴，次轴都居中 */
  @property({ type: Boolean, attribute: 'center' }) center = false;

  /** 是否扩展剩余空间 */
  @property({ type: Boolean, attribute: 'expand' }) expand = false;

  /** 主轴子项对齐方式 */
  @property({ type: String, attribute: 'main' }) main:
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  /** 次轴子项对齐方式 */
  @property({ type: String, attribute: 'cross' }) cross: 'start' | 'end' | 'center' | 'baseline' | 'stretch';

  @watchProps(['main', 'cross'])
  setXYChange() {
    let x;
    switch (this.main) {
      case 'start':
        x = 'flex-start';
        break;
      case 'end':
        x = 'flex-end';
        break;
      default:
        x = this.main;
        break;
    }
    if (x) {
      this.style.justifyContent = x;
    } else {
      this.style.justifyContent = 'flex-start';
    }

    let y;
    switch (this.cross) {
      case 'start':
        y = 'flex-start';
        break;
      case 'end':
        y = 'flex-end';
        break;
      default:
        y = this.cross;
        break;
    }
    if (y) {
      this.style.alignItems = y;
    } else {
      this.style.alignItems = 'stretch';
    }
  }
  render() {
    return html`<slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-layout': SlLayout;
  }
}
