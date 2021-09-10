type VitrurlResult = {
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
 * （ 上面空白多渲染2份内容可视高度的数据，底部多渲染几份内容可视高度的数据。
 *  适当多渲染，保证滚动的时候，不会变成空白
 */
export const vituralScrollCalc = (contentHeight: number, size: number, rowHeight: number, scrollTop: number): VitrurlResult => {
  const result: VitrurlResult = {
    paddingTop: 0,
    paddingBottom: 0,
    offsetStart: 0,
    offsetEnd: size
  };
  // console.log(contentHeight ,rowHeight);
  let firstSkipRows = Math.floor(scrollTop / rowHeight); //需要跳过的起始起始行
  let viewCanShowRows = Math.floor(contentHeight / rowHeight);
  if (firstSkipRows > 2 * viewCanShowRows) {
    //向上多显示几倍视窗高度的内容
    firstSkipRows = firstSkipRows - 2 * viewCanShowRows;
  }
  let skipHeight = firstSkipRows * rowHeight;
  result.paddingTop = skipHeight;
  result.offsetStart = firstSkipRows;

  result.offsetEnd = firstSkipRows;
  viewCanShowRows += 4 * viewCanShowRows; //向下也多显示几倍视窗的内容
  for (let index = 0; index < viewCanShowRows && result.offsetEnd < size; index++) {
    result.offsetEnd += 1;
  }
  let bottomHeight = (size - (result.offsetEnd - result.offsetStart)) * rowHeight - skipHeight;
  result.paddingBottom = bottomHeight > 0 ? bottomHeight : 0;
  return result;
};
