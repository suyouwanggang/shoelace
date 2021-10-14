declare type VitrurlResult = {
    /** 顶部空白高度 */
    paddingTop: number;
    /****底部空白高度 **/
    paddingBottom: number;
    /****起始渲染Index  */
    offsetStart: number;
    /** 结束渲染Index */
    offsetEnd: number;
};
/**
 * 固定高度虚拟滚动计算
 * @param contentHeight  内容可视高度
 * @param size  需要渲染的数据总数
 * @param rowHeight  每个数据渲染的行高
 * @param scrollTop 当前已经滚动的高度
 *
 */
export declare const vituralScrollCalc: (contentHeight: number, size: number, rowHeight: number, scrollTop: number) => VitrurlResult;
export {};
