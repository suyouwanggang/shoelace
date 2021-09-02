import { emit } from "../../internal/event";
import { debounce } from "../../internal/throttle";
import { addEvent, getCssValue, onEvent, onEventArray } from "../../utilities/common";
import { dragOnHandler } from "../../utilities/dragHelper";
import SlColumn from "../column/column";
import SlTable from "./table";
import { saveAsDefaultTableCache, updateTableCache } from "./tableCacheHelper";
/**给Table 树 TreeNode 关联事件 */
 const handlerNodeListener=(table:SlTable)=>{
    let tableEl=table.table;    
   return onEvent(tableEl,'tbody>tr>td>div[part=tree-node] span.tree-node-icon[part=tree-node-toogle]','click',(event:Event)=>{
        const el=event.delegateTarget;
        const td=el.closest('td') as HTMLTableCellElement;
        const column= (td as any).column as SlColumn;
        const tr=td.closest('tr') as HTMLTableRowElement;
        const rowData=(tr as any).rowData;
        const parentData=table.getRowDataParentData(rowData);
        const level=table.getRowDataTreeLevel(rowData);

        if (typeof rowData.children == 'undefined' && table.treeConfig && table.treeConfig.lazy) {
            if(!table.loadingNodeMethod){
              console.warn('lazy 模式下应该设置 加载方法：loadingNodeMethod');
              return ;
            }
            table.currentLoadingNode.push(rowData);
            table.currentLoadingNode=[...table.currentLoadingNode];
            Promise.resolve().then( async ()=>{
              try{    
                let result= await table.loadingNodeMethod(rowData,parentData);
                if(result){
                    rowData.children=result;
                  }
                  rowData.close=false;
                  table.currentLoadingNode.splice(table.currentLoadingNode.indexOf(rowData),1);
                  table.watchDataSourceChange();
                  emit(table,'sl-tree-node-loaded',{
                    detail: {
                      dom:event.target,
                      level,
                      column,
                      nodeData: rowData,
                      parentData: parentData
                    }
                  })
              }catch(ex){
                table.currentLoadingNode.splice(table.currentLoadingNode.indexOf(rowData),1);
                table.currentLoadingNode=[...table.currentLoadingNode];
                emit(table,'sl-tree-node-load-error',{
                  detail: {
                    level,
                    dom:event.target,
                    error:ex,
                    column,
                    nodeData: rowData,
                    parentData: parentData
                  }
                })
              }
            });
            return ;
        }
        let nodeEvent = emit(table, `sl-tree-node-before-${rowData.close ? 'open' : 'close'}`, {
            cancelable: true,
            detail: {
              dom:event.target,
              column,
              nodeData: rowData,
              parentData: parentData
            }
          });
          let nodeToogleEvent = emit(table, `sl-tree-node-toogle`, {
            cancelable: true,
            detail: {
              dom:event.target,
              column,
              nodeData: rowData,
              parentData: parentData
            }
          });
          if (!nodeEvent.defaultPrevented && !nodeToogleEvent.defaultPrevented) {
            rowData.close = !rowData.close;
            emit(table, `sl-tree-node-${rowData.close ? 'close' : 'open'}`, {
              detail: {
                dom:event.target,
                column:column,
                nodeData: rowData,
                parentData: parentData
              }
            });
            emit(table, `sl-tree-node-toogle`, {
              detail: {
                dom:event.target,
                column,
                nodeData: rowData,
                parentData: parentData
              }
            });
            table.requestUpdate();
          }
    });
};
const TDEVENTS=['click','dblclick','keydown','keyup','keypress','mousedown','mouseenter','mousemove','mouseover','mouseout'];
/**给Table tr, td 添加事件 */
const hanlderTRTDEvent=(table:SlTable)=>{
   let one1= onEventArray(table.table,'tbody>tr>td',TDEVENTS, (event:Event)=>{
        let td=event.delegateTarget as HTMLTableCellElement;
        let tr=td.parentElement;
        emit(table,`sl-table-td-${event.type}`,{
          cancelable:true,
          detail:{
            td:td,
            row:tr,
            rowData:(tr as any).rowData,
            column:(td as any).column
          }
        })
      });
    let one2=  onEventArray(table.table,'tbody>tr',TDEVENTS, (event:Event)=>{
        let tr=event.delegateTarget as HTMLTableRowElement;
        emit(table,`sl-table-tr-${event.type}`,{
          cancelable:true,
          detail:{
            row:tr,
            rowData:(tr as any).rowData
          }
        })
      });
      return {
          dispose(){
              for(let l of one1){
                  l.dispose();
              };
              for(let l of one2){
                l.dispose();
            }
          }
      }
};
/** 给table 添加拖动表头事件 */
  const handerTableResizeEvent=(slTable:SlTable)=>{
    let table=slTable.table;
    let debounseUpdate=debounce(function(){
        updateTableCache(slTable);
    },60)
    return dragOnHandler(table, 'thead>tr>th div.th-resize-helper', (changePos, event) => {
        saveAsDefaultTableCache(slTable);
        let div = (event as any).delegateTarget as HTMLElement;
        let th = div.closest('th') as HTMLElement;
        let column = (th as any).column as SlColumn;
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
        if(slTable.cacheKey){
          debounseUpdate();
        }
      });
}
const handlerTableScroll=(slTable:SlTable)=>{
  let scrollDiv=slTable.scrollDiv;
  return addEvent(scrollDiv,'scroll',(_event:Event)=>{
    emit(slTable, 'sl-table-scroll', {
      detail: {
        div: scrollDiv
      }
    });
  })
}

export const connectTableHanlder=(table:SlTable)=>{
   let array=[ hanlderTRTDEvent(table),
   handerTableResizeEvent(table),
   handlerNodeListener(table),
   handlerTableScroll(table)];
   
   table.addController({
     hostDisconnected(){
       for(let l of array){
         l.dispose();
       }
     }
   })
}

