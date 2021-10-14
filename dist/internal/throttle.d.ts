export declare function debounce(callback: (...arg: unknown[]) => void, delay: number): (this: unknown, ...args: unknown[]) => void;
/**
 * 防抖： 如果一个函数不停发生，则要等一定间隔才允许发生或者执行
 * @param fn 原始防抖函数
 * @param wait
 * @returns
 */
export declare function debounceWait(fn: (...arg: unknown[]) => void, wait: number): (...args: unknown[]) => void;
/**
 * 函数节流， 持续触发事件时，保证一定时间段内只调用一次事件处理函数。节流通俗解释就比如我们水龙头放水，阀门一打开，水哗哗的往下流，秉着勤俭节约的优良传统美德，我们要把水龙头关小点
 * @param method 节流方法
 * @param delay 多少时间调用一次
 * @param scope 函数执行上下文
 */
export declare function throttle(method: (...arg: unknown[]) => void, delay: number, scope?: unknown): (this: unknown, ...args: unknown[]) => void;
export declare function throttleTimeout(method: (...arg: unknown[]) => void, wait: number, mustRun: number): (this: unknown, ...args: unknown[]) => void;
