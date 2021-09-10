import { emit } from '../../internal/event';
import { debounce, throttleTimeout } from '../../internal/throttle';
import { addEvent, getCssValue, onEvent, onEventArray } from '../../utilities/common';
import { dragOnHandler } from '../../utilities/dragHelper';
import SlColumn from '../column/column';
import { iteratorNodeData, TreeNodeData } from '../tree-node/tree-node-util';
import SlTable from './table';
import { saveAsDefaultTableCache, updateTableCache } from './tableCacheHelper';
import { getCellContext } from './tableRenderHelper';

export const getTreeNodeAllChildrenSize = (rowData: TreeNodeData) => {
  let size = 0;
  iteratorNodeData(rowData, (_node, _parent) => {
    size++;
  });
  return size - 1;
};

/**Table 树 TreeNode Toogle,open close事件 */
const handlerNodeToogleListener = (table: SlTable) => {
  let tableEl = table.table;
  return onEvent(
    tableEl,
    `tbody[componentID=${table.componentID}]>tr>td>div[part=tree-node] span.tree-node-icon[part=tree-node-toogle][componentID=${table.componentID}]`,
    'click',
    (event: Event) => {
      debugger;
      const el = event.delegateTarget;
      const td = el.closest('td') as HTMLTableCellElement;
      const column = (td as any).column as SlColumn;
      let tr = td.closest('tr') as HTMLTableRowElement;
      if (tr &&tr.closest('table')!=tableEl) {
         return;
      }
      const cellContext=getCellContext(td);
      const rowData=cellContext.rowData;

      if (typeof rowData.children == 'undefined' && table.treeConfig && table.treeConfig.lazy) {
        if (!table.treeLoadingNodeMethod) {
          console.warn('lazy 模式下应该设置 加载方法：loadingNodeMethod');
          return;
        }
        table.treeLoadingNode.push(rowData);
        table.treeLoadingNode = [...table.treeLoadingNode];
        Promise.resolve().then(async () => {
          try {
            let result = await table.treeLoadingNodeMethod(cellContext,column);
            if (result) {
                rowData.children = result;
            }
            rowData.close = false;
            let index=table.treeLoadingNode.indexOf(rowData)
            if(index>=0){
               table.treeLoadingNode.splice(index, 1);
            }
            table.watchDataSourceChange();
            emit(table, 'sl-tree-node-loaded', {
              detail: {
                dom: event.target,
                ...cellContext
                ,result:result
              }
            });
          } catch (ex) {
            table.treeLoadingNode.splice(table.treeLoadingNode.indexOf(rowData), 1);
            table.treeLoadingNode = [...table.treeLoadingNode];
            emit(table, 'sl-tree-node-load-error', {
              detail: {
                dom: event.target,
                error: ex,
                ...cellContext,
              }
            });
          }
        });
        return;
      }
      const nodeEvent = emit(table, `sl-tree-node-before-${rowData.close ? 'open' : 'close'}`, {
        cancelable: true,
        detail: {
          dom: event.target,
          ...cellContext
        }
      });
      const nodeToogleEvent = emit(table, `sl-tree-node-toogle`, {
        cancelable: true,
        detail: {
          dom: event.target,
          ...cellContext,
        }
      });
      if (!nodeEvent.defaultPrevented && !nodeToogleEvent.defaultPrevented) {
        rowData.close = !rowData.close;
        emit(table, `sl-tree-node-${rowData.close ? 'close' : 'open'}`, {
          detail: {
            dom: event.target,
            ...cellContext,
          }
        });
        emit(table, `sl-tree-node-toogle`, {
          detail: {
            dom: event.target,
            ...cellContext,
          }
        });
        table.watchDataSourceChange();
        table.updateComplete.then(() => {
          table.asynTableHeaderWidth();
        });
      }
    }
  );
};
const TDEVENTS = [
  'click',
  'dblclick',
  'keydown',
  'keyup',
  'keypress',
  'mousedown',
  'mouseenter',
  'mousemove',
  'mouseover',
  'mouseout'
];
/**给Table tr, td 添加事件 */
const hanlderTRTDEvent = (table: SlTable) => {
  let one1 = onEventArray(table.table, `tbody[componentID=${table.componentID}]>tr>td`, TDEVENTS, (event: Event) => {
    let td = event.delegateTarget as HTMLTableCellElement;
    let tr = td.parentElement;
    while(td&& td.closest('table')!=table.table){
      td=(td.parentElement as HTMLElement).closest('td') as HTMLTableCellElement
      tr=td.parentElement;
    }
    emit(table, `sl-table-td-${event.type}`, {
      cancelable: true,
      detail: {
        td: td,
        row: tr,
        ...getCellContext(td)
      }
    });
  });
  let one2 = onEventArray(table.table, `tbody[componentID=${table.componentID}]>tr`, TDEVENTS, (event: Event) => {
    let tr = event.delegateTarget as HTMLTableRowElement;
    while(tr&& tr.closest('table')!=table.table){
       tr=(tr.parentElement as HTMLElement).closest('tr') as HTMLTableRowElement;
    }
    emit(table, `sl-table-tr-${event.type}`, {
      cancelable: true,
      detail: {
        row: tr,
        ...table.getRowContext(tr)
      }
    });
  });
  return {
    dispose() {
      for (let l of one1) {
        l.dispose();
      }
      for (let l of one2) {
        l.dispose();
      }
    }
  };
};
/** 给table 添加拖动表头事件 */
const handerTableResizeEvent = (slTable: SlTable) => {
  let table = slTable.table;
  let debounseUpdate = debounce(function () {
    updateTableCache(slTable);
  }, 60);
  return dragOnHandler(
    table,
    `thead[componentID=${slTable.componentID}]>tr>th div.th-resize-helper`,
    (changePos, event) => {
      let div = (event as any).delegateTarget as HTMLElement;
      let th = div.closest('th') as HTMLElement;
      while(th&& th.closest('table')!=slTable.table){
         th=(th.parentElement as Element) .closest('th') as HTMLElement;
      }
      let column = (th as any).column as SlColumn;
      if (!column || column.table != slTable) {
        return;
      }
      saveAsDefaultTableCache(slTable);
      let width = parseInt(getCssValue(th, 'width'));
      let tableWidth = parseInt(getCssValue(table, 'width'), 10);
      let oldWidth = width;
      width += changePos.x;
      if (column.maxWidth) {
        let maxWidth = parseInt(column.maxWidth, 10);
        if (width > maxWidth) {
          width = maxWidth;
        }
      }
      if (column.minWidth) {
        let minWidth = parseInt(column.minWidth, 10);
        if (width < minWidth) {
          width = minWidth;
        }
      }
      table.style.width = tableWidth + (width - oldWidth) + 'px';
      column.width = width + 'px';
      emit(slTable, 'sl-table-column-resize', {
        detail: {
          column: column,
          change: width - oldWidth
        }
      });
      if (slTable.cacheKey) {
        debounseUpdate();
      }
    }
  );
};
const handlerTableScroll = (slTable: SlTable) => {
  let scrollDiv = slTable.scrollDiv;
  let debouceScroll = throttleTimeout(
    () => {
      if (slTable.enableVirtualScroll && slTable.virtualItemHeight) {
        slTable.requestUpdate();
      }
    },
    60,
    120
  );
  addEvent(scrollDiv, 'mousewheel', (_event: WheelEvent) => {
    let y = _event.deltaY;
    let x = _event.deltaX;
    let deltaMode = _event.deltaMode;
    if (deltaMode == WheelEvent.DOM_DELTA_PIXEL) {
      scrollDiv.scrollTop += y;
      scrollDiv.scrollLeft += x;
    } else {
      scrollDiv.scrollTop += y * scrollDiv.offsetHeight;
      scrollDiv.scrollLeft += x * scrollDiv.offsetWidth;
    }
    _event.preventDefault();
    debouceScroll();
  });
  return addEvent(scrollDiv, 'scroll', () => {
    emit(slTable, 'sl-table-scroll', {
      detail: {
        div: scrollDiv
      }
    });
    debouceScroll();
  });
};
/** table 扩展行逻辑处理 */
const handlerRowExpandListener = (table: SlTable) => {
  let tableEl = table.table;
  return onEvent(
    tableEl,
    `tbody[componentID=${table.componentID}]>tr>td span[part=expand-toogle-icon][componentID=${table.componentID}]`,
    'click',
    (event: Event) => {
      const el = event.delegateTarget as HTMLElement;
      let td = el.closest('td') as HTMLTableCellElement;
      while (td.parentNode && td.parentNode.parentNode?.parentNode != tableEl) {
        td = (td.parentNode as HTMLElement).closest('td') as HTMLTableCellElement;
      }
      const tr = td.closest('tr') as HTMLTableRowElement;
      const rowData = (tr as any).rowData;
      if (table.expandLazy) {
        if (!table.cacheExpandLazyLoadDataMap.has(rowData)) {
          if (!table.expandLazyLoadMethod) {
            console.error('expand lazy mode 必须设置加载方法:currentExpandingRowData');
            return;
          }
          if (!table.expandingRowData.includes(rowData)) {
            table.expandingRowData.push(rowData);
          }
          table.expandingRowData = [...table.expandingRowData];
          Promise.resolve().then(async () => {
            try {
              let result = await table.expandLazyLoadMethod(rowData);
              table.cacheExpandLazyLoadDataMap.set(rowData, result);
              if (table.expandAccordion) {
                table.expandRowData.splice(0, table.expandRowData.length);
              }
              if (!table.expandRowData.includes(rowData)) {
                table.expandRowData.push(rowData);
              }
            } catch (ex) {
              emit(table, 'sl-table-expand-load-error', {
                detail: {
                  error: ex,
                  rowData: rowData
                }
              });
            }
            let indexOf = table.expandingRowData.indexOf(rowData);
            if (indexOf >= 0) {
              table.expandingRowData.splice(indexOf, 1);
            }
            table.expandingRowData = [...table.expandingRowData];
          });
        } else {
          table.doExpandRowData(rowData);
        }
      } else {
        table.doExpandRowData(rowData);
      }
    }
  );
};

export const connectTableHanlder = (table: SlTable) => {
  let array = [
    hanlderTRTDEvent(table),
    handerTableResizeEvent(table),
    handlerNodeToogleListener(table),
    handlerTableScroll(table),
    handlerRowExpandListener(table)
  ];

  table.addController({
    hostDisconnected() {
      for (let l of array) {
        l.dispose();
      }
    }
  });
};
