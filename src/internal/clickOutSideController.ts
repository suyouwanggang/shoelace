import { ReactiveController, ReactiveElement } from "lit";
import { addEvent } from "../utilities/common";
import { DisposeObject } from "../utilities/resize.util";

/**
 * 给一个组件添加 clickOutSize 监听
 * @example
 * ```ts
 * const controller=new ClickOutSideController(el,(event:Event)=>{
 * })
 * ```
 */
export class ClickOutSideController implements ReactiveController{
    private  hand:(this:ReactiveElement,event:Event)=>void;
    private host:ReactiveElement;
    constructor(host:ReactiveElement,clickOutSideHandler:(this:ReactiveElement,event:Event)=>void){
      this.host=host;
      this.hand=clickOutSideHandler.bind(host);
      host.addController(this);
    }
    private isShow=false;
    public show(){
      this.isShow=true;
    }
    private _dispose:DisposeObject;
    hostConnected(){
       this._dispose= addEvent(document,'click',(event:Event)=>{
       const path=event.composedPath() as Array<EventTarget>;
        if(!path.includes(this.host)){
          if(!this.isShow){
             this.hand.call(this.host,event);
          }
          this.isShow=false;
        }
      });
    }
    hostDisconnected(){
      this._dispose.dispose();
    }
  }