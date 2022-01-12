import { ReactiveElement } from "lit";
import { DisposeObject } from "./resize.util";
interface FunctionHandler {
    (...args: unknown[]): void;
}
/**
 * EventBus ,用来组组件消息解耦
 * @example
 * ```ts
 * eventBus.addListener('change-count',(old:number,newValue:number)=>{
        console.log('change-count' ,old,newValue);
   });//基础api
   eventBus.emit('change-count',18,19);

   const result= addBusHandler('change-age',(arg1:number,arg2:number)=>{
        console.log(`change-age ==>${arg1} ${arg2}`);
    });

    result.dispose();//移除监听
 *
 * ```
 */
export declare class EventBus {
    private events;
    /**
     * 添加消息监听器
     * 用户在组件内部，添加 添加的EventBus 监听器，监听感兴趣的事件
     * @param type  事件类型
     * @param callbacks  监听器函数
     */
    addListener(type: string, ...callbacks: FunctionHandler[]): DisposeObject;
    /**
     * 删除消息监听器
     * 当组件 移除，组件应该移除自己 添加的EventBus 监听器
     * @param type   事件类型
     * @param callbacks  监听器函数
     */
    removeListener(type: string, ...callbacks: FunctionHandler[]): void;
    /**
     * 触发EVENT_BUS 事件
     * 用户在进行了一定操作后，广播事件和事件上下文，交由感兴趣的组件来监听
     * @param type  事件类型
     * @param args 事件上下文 ，会传递给每个监听器作为参数处理
     */
    emit(type: string, ...args: unknown[]): void;
}
export declare const eventBus: EventBus;
/**
 * 添加 event 监听器，
 * @example
 *
 * ```ts
    busEmit('change-age',20,19);
    const result= addBusHandler('change-age',(arg1:number,arg2:number)=>{
        console.log(`change-age ==>${arg1} ${arg2}`);
    });

    result.dispose(); //移除监听

 * ```
 * @param type  事件类型
 * @param callBacks  监听函数
 * @returns  DisposeObject ，调用dispose 移除监听
 */
export declare const addBusHandler: (type: string | Array<string>, ...callBacks: FunctionHandler[]) => DisposeObject;
/**
 * 给ReactiveElement 组件添加 eventBus 监听器
 *
 * @example
 * ```ts
    addBusController(litEl,'change-age',(arg1:number,arg2:number)=>{
        console.log(`change-age ==>${arg1} ${arg2}`);
    });//监听会自动移除，不需要管

    //其他组件  用户手动触发消息
    busEmit('change-age',20,19);
 * ```
 *
 * @param el 组件，必须是 ReactiveElement,原始Element 不能自动删除事件监听器
 * @param type  事件
 * @param callbacks 监听函数
 */
export declare const addBusController: (el: ReactiveElement, type: string | Array<string>, ...callbacks: FunctionHandler[]) => void;
/**
 * 手动触发事件
 * @param type 事件类型
 * @param args  消息上下文参数
 */
export declare const busEmit: (type: string, ...args: unknown[]) => void;
export {};
//# sourceMappingURL=eventBus.d.ts.map