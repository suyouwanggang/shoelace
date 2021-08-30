
import SlColumn from "../column/column";
import SlTable from "./table";
import { SortingEnum } from "./tableHelper";
const sortDown=svg`<svg  viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down"  fill="currentColor" ><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>`;
const sortUp=svg`<svg  viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up"  fill="currentColor" ><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg>`;
import { html ,svg} from "lit";
export const renderSortHeaderTemplate=(table:SlTable,column:SlColumn,hander:EventListener)=>{
  let sortValue=table.sortValue;
  let sortList:Array<{
    field:string,
    value:SortingEnum,
  }>=[];
  if(Array.isArray(sortValue)){
     sortList=sortValue;
  }else if(sortValue){
    sortList.push(sortValue)
  }
  let result;
  if(column.sortAble){
     let sortResult=sortList.find(item=>item.field==column.field);
     if(table.sortConfig.alwaysShowIcon){
        result=html`<div class='sort-wrap' @click=${hander}>
              <div class='sort-ASC  ${sortResult&&sortResult.value==SortingEnum.ASC?'current':''}'>${sortUp}</div>
              <div class='sort-DESC ${sortResult&&sortResult.value==SortingEnum.DESC?'current':''}'>${sortDown}</div>
     </div>`;
     }else if(sortResult){
        result=html`<div class='sort-wrap' @click=${hander}>
           <div class='sort-${sortResult.value} current'>${sortResult.value==SortingEnum.ASC?sortUp:sortDown}</div>
     </div>`;
     }
  } 
  return result;
};

