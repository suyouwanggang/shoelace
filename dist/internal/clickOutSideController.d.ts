import { ReactiveController, ReactiveElement } from "lit";
/**
 * 给一个组件添加 clickOutSize 监听
 * @example
 * ```ts
 * const controller=new ClickOutSideController(el,(event:Event)=>{
 * })
 * ```
 */
export declare class ClickOutSideController implements ReactiveController {
    private hand;
    private host;
    constructor(host: ReactiveElement, clickOutSideHandler: (this: ReactiveElement, event: Event) => void);
    private isShow;
    show(): void;
    private _dispose;
    hostConnected(): void;
    hostDisconnected(): void;
}
//# sourceMappingURL=clickOutSideController.d.ts.map