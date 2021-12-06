// src/components/table/virtualScroll.ts
var vituralScrollCalc = (contentHeight, size, rowHeight, scrollTop) => {
  const result = {
    paddingTop: 0,
    paddingBottom: 0,
    offsetStart: 0,
    offsetEnd: size
  };
  let firstSkipRows = Math.floor(scrollTop / rowHeight);
  let viewCanShowRows = Math.floor(contentHeight / rowHeight);
  if (firstSkipRows > viewCanShowRows) {
    firstSkipRows = firstSkipRows - viewCanShowRows;
  }
  let skipHeight = firstSkipRows * rowHeight;
  result.paddingTop = skipHeight;
  result.offsetStart = firstSkipRows;
  result.offsetEnd = firstSkipRows;
  viewCanShowRows += 2 * viewCanShowRows;
  for (let index = 0; index < viewCanShowRows && result.offsetEnd < size; index++) {
    result.offsetEnd += 1;
  }
  let bottomHeight = (size - (result.offsetEnd - result.offsetStart)) * rowHeight - skipHeight;
  result.paddingBottom = bottomHeight > 0 ? bottomHeight : 0;
  return result;
};

export {
  vituralScrollCalc
};
