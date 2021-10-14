export declare type Poniter = {
    x: number;
    y: number;
};
/**
 * 拖动容器封装
 * @param dragDiv  待拖动容器
 * @param callBack 回调 (changePos:Poniter,event:MouseEvent)
 */
export declare const dragHandler: (dragDiv: HTMLElement, callBack: (changePos: Poniter, event: MouseEvent) => void) => void;
/**
 * 拖动容器封装
 * @param dragDiv  容器
 * @param selector  子选择器
 * @param callBack 回调 (changePos:Poniter,event:MouseEvent)
 */
export declare const dragOnHandler: (dragDiv: HTMLElement, selector: string, callBack: (changePos: Poniter, event: MouseEvent) => void, endBack?: ((event: MouseEvent) => void) | undefined) => {
    dispose: () => void;
};
