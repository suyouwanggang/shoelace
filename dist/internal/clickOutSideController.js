import { addEvent } from "../utilities/common";
/**
 * 给一个组件添加 clickOutSize 监听
 * @example
 * ```ts
 * const controller=new ClickOutSideController(el,(event:Event)=>{
 * })
 * ```
 */
export class ClickOutSideController {
    constructor(host, clickOutSideHandler) {
        this.isShow = false;
        this.host = host;
        this.hand = clickOutSideHandler.bind(host);
        host.addController(this);
    }
    show() {
        this.isShow = true;
    }
    hostConnected() {
        this._dispose = addEvent(document, 'click', (event) => {
            const path = event.composedPath();
            if (!path.includes(this.host)) {
                if (!this.isShow) {
                    this.hand.call(this.host, event);
                }
                this.isShow = false;
            }
        });
    }
    hostDisconnected() {
        this._dispose.dispose();
    }
}
