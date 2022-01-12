//

import { ReactiveController, ReactiveElement } from "lit";
import { addEvent } from "../utilities/common";
import { DisposeObject } from "../utilities/resize.util";

//
export function emit(el: HTMLElement | Window, name: string, options?: CustomEventInit) {
  const event = new CustomEvent(
    name,
    Object.assign(
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {}
      },
      options
    )
  );
  el.dispatchEvent(event);
  return event;
}
export { emit as emitEvent };
/**
 * 给组件绑定 全局对象(例如window,document)的事件
 * @param el 组件
 * @param target  事件对象
 * @param eventType 事件类型
 * @param handler  处理器(注意，handler this 等于参数el)
 */
export function addEventController(el:ReactiveElement,target:Document|Window|Element,eventType:string, handler:(this:ReactiveElement,event:Event)=>void){
  let dispose:DisposeObject;
  const hand=handler.bind(el);
  const controller:ReactiveController={
    hostConnected(){
      dispose= addEvent(target,eventType,hand);
    },
    hostDisconnected(){
      dispose.dispose();
    }
  };  
  el.addController(controller);
}

//
// Waits for a specific event to be emitted from an element. Ignores events that bubble up from child elements.
//
export function waitForEvent(el: HTMLElement, eventName: string) {
  return new Promise<void>(resolve => {
    function done(event: Event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}
/**
 * Determines whether an event is a touch event.
 * @param event
 */
export function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return (<TouchEvent>event).changedTouches != null;
}

export function normalizePointerEvent(e: MouseEvent | TouchEvent): { clientX: number; clientY: number; pageX: number; pageY: number; isTouch: boolean } {
  let isTouch = false;
  let pointerEvent: Touch | MouseEvent;

  if (isTouchEvent(e)) {
    pointerEvent = e.changedTouches[0];
    isTouch = true;
  } else {
    pointerEvent = e;
  }

  let { clientX, clientY, pageX, pageY } = pointerEvent;
  return { clientX, clientY, pageX, pageY, isTouch };
}

export function getOpacity(computedStyle: CSSStyleDeclaration): number {
  if (computedStyle.getPropertyValue('width') === '0px' || computedStyle.getPropertyValue('height') === '0px') {
    return 0;
  }

  const opacityString = computedStyle.getPropertyValue('opacity');
  return isNaN(+opacityString) ? 0 : Number(opacityString);
}
