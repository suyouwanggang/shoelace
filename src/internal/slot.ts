import { ReactiveController, ReactiveControllerHost } from 'lit';

export class HasSlotController implements ReactiveController {
  host: ReactiveControllerHost & Element;
  slotNames: string[] = [];

  constructor(host: ReactiveControllerHost & Element, ...slotNames: string[]) {
    (this.host = host).addController(this);
    this.slotNames = slotNames;
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  public hasDefaultSlot() {
    return [...this.host.childNodes].some(node => {
      if (node.nodeType === node.TEXT_NODE && node.textContent!.trim() !== '') {
        return true;
      }

      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (!el.hasAttribute('slot')) {
          return true;
        }
      }

      return false;
    });
  }

  private hasNamedSlot(name: string) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }

  test(slotName: string) {
    return slotName === '[default]' || slotName === 'default' ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }

  hostConnected() {
    this.host.shadowRoot!.addEventListener('slotchange', this.handleSlotChange);
  }

  hostDisconnected() {
    this.host.shadowRoot!.removeEventListener('slotchange', this.handleSlotChange);
  }

  handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;

    if ((this.slotNames.includes('[default]') && !slot.name) || (slot.name && this.slotNames?.includes(slot.name))) {
      this.host.requestUpdate();
    }
  }
}

//
// Given a slot, this function iterates over all of its assigned element and text nodes and returns the concatenated
// HTML as a string. This is useful because we can't use slot.innerHTML as an alternative.
//
export function getInnerHTML(slot: HTMLSlotElement): string {
  const nodes = slot.assignedNodes({ flatten: true });
  let html = '';

  [...nodes].map(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      html += (node as HTMLElement).outerHTML;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      html += node.textContent;
    }
  });

  return html;
}

//
// Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
// string. This is useful because we can't use slot.textContent as an alternative.
//
export function getTextContent(slot: HTMLSlotElement): string {
  const nodes = slot ? slot.assignedNodes({ flatten: true }) : [];
  let text = '';

  [...nodes].map(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  });

  return text;
}

//
// Determines whether an element has a slot. If name is specified, the function will look for a corresponding named
// slot, otherwise it will look for a "default" slot (e.g. a non-empty text node or an element with no slot attribute).
//
export function hasSlot(el: HTMLElement, name?: string) {
  // Look for a named slot
  if (name) {
    return el.querySelector(`:scope > [slot="${name}"]`) !== null;
  }

  // Look for a default slot
  return [...el.childNodes].some(node => {
    if (node.nodeType === node.TEXT_NODE && node.textContent!.trim() !== '') {
      return true;
    }

    if (node.nodeType === node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (!el.hasAttribute('slot')) {
        return true;
      }
    }

    return false;
  });
}
