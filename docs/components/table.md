# Table

[component-header:sl-table]

Table 组件

```html preview
<div id='checkBox' style='margin:10px 0'>
    <sl-button size='small'  id='queSheng'>恢复列配置</sl-button>
    选择列配置
    <sl-checkbox checked >name</sl-checkbox>
    <sl-checkbox checked>role</sl-checkbox>
    <sl-checkbox checked>sex</sl-checkbox>
    <sl-checkbox checked >address</sl-checkbox>
</div>
<sl-table id='tableDIV' cache-key='one'>
     <sl-column id='index' field='index' label='index'   align='left' min-width='70' ></sl-column>
    <sl-column field='expaned' label='#'   align='left' min-width='40' ></sl-column>
    <sl-column field='name' sort-able resize-able label='Name'   align='left' min-width='200' ></sl-column>
    <sl-column field='role'  label='Role' resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='sex' sort-able label='Sex'resize-able   order=3 agile-cell='right'></sl-column>
    <sl-column field='address' sort-able label='address' resize-able  order='1'  ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    const dateList=[
                { id: 10001, name: 'Test1', role: 'Test1', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Test2', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Javascript 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Javascript 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Javascript 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Javascript 从入门到放弃' }];
      document.querySelector('sl-column#index[field=index]').renderCell=({column,rowData,rowIndex})=>{
          return rowIndex;
    }
    
    for(let i=0,j=20000-11;i<j;i++){
        dateList.push( { id: i, name: 'Test add'+i, role: 'Test1', sex: Math.random()>0.5?'Man':'Women', age: 28, address: 'Javascript 从入门到放弃'+i });
    }
    table.tableHeight=500;
    table.fixedColumns='3';


    //启用虚拟滚动
    table.enableVirtualScroll=true;
    //虚拟滚动行高
    table.virtualItemHeight=45;
    table.customStyle=`div.tdWrap{height:28px;overflow:hidden;}`;
    //控制单元高度

    table.dataSource=dateList;
    window.table=table;
    
    
    
    table.addEventListener('sl-table-before-sort',(event)=>{
        console.log(event.detail.column.label +' sortValue '+JSON.stringify(event.detail.sortValue));
    });
     table.addEventListener('sl-table-sort',(event)=>{
        console.log(event.detail.column.label +' sortValue '+JSON.stringify(event.detail.sortValue));
    });
    const queSheng=document.querySelector('#queSheng');
    queSheng.addEventListener('click',(event)=>{
       restoreTableDefault(table);
       restoreTableDefault(table2);
    });
    onEvent(document.querySelector('#checkBox'),'sl-checkbox','sl-change', (event)=>{
        const el=event.delegateTarget;
        const field=el.textContent;
        table.querySelector(`sl-column[field=${field}]`).hidden=!el.checked;
    })
     //指定行扩展的图标在哪一列
   table.expandColumn='expaned';
   //指定每次只能扩展一行数据，其他扩展的行会关闭
     table.expandAccordion=true;

    //指定行扩展是lazy模式
    table.expandLazy=true;
    table.expandLazyLoadMethod=(rowData)=>{
        let result={
            columns:['a','b','c'],
            dataSource:[[1,2,3],[4,5,6],[7,8,9]]
        }
         return new Promise((resolve)=>{
            window.setTimeout(()=>{
                resolve(result);
            },300)
        } );
    }

    //必须配置的行扩展渲染函数，
    //第一个参数，是RowContext，第二个参数是所有的列
    //如果是lazy模式，则第三个参数是加载方法的返回结果：lazyLoadData
    table.expandRowRender=({rowData},columns,layLoadData)=>{
        let lazyResult=layLoadData?html`懒加载数据：${JSON.stringify(layLoadData)}`:'';
        let result=html`<tr><td colspan=${columns.length} >
            <div style=' width:80%;display:grid;grid-template-columns: repeat(2,1fr);'>
            ${columns.map(item=>{
                return html`${rowData[item.field]?html`<span>${rowData[item.field]}</span>`:''}`;
            })}
            <span style='grid-column:span 2'>${lazyResult}<span>
            </div>
        </td></tr>`;
        return result;
    };

</script>
```


### 表头多列 ,支持列固定，表头表TFoot 固定，排序,事件 ，前端cache 缓存列顺序，宽度，是否显示 演示

```html preview
<sl-table id='tableDIV2' border cache-key='two'>
    <sl-column label='基本信息'  resize-able >
         <sl-column field='name' resize-able label='Name' min-width='300' sort-able  width='100%' align='left'  ></sl-column>
         <sl-column field='sex' label='Sex'  resize-able  sort-able min-width=60  align='right' order=2></sl-column>
         <sl-column field='age' label='Age'  resize-able  sort-able min-width=90 align='left' col-align='left' order=1></sl-column>
    </sl-column>
    <sl-column field='role' label='Role' align='right' resize-able min-width='200' order=2 ></sl-column>
    <sl-column field='address' label='address'  resize-able min-width=200  order='1'  ></sl-column>
</sl-table>
<script >
    let table2=document.querySelector('#tableDIV2');
    let dateList2=[
                { id: 10001, name: 'Test1', role: 'Test1', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Test2', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Javascript 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'E 从入门到放弃' },
                { id: 10007, name: 'Test8', role: 'Test', sex: 'Man', age: 29, address: 'F 从入门到放弃' },
                { id: 10007, name: 'Test9', role: 'Test', sex: 'Man', age: 29, address: 'A  从入门到放弃 ' },
                { id: 10007, name: 'Test10', role: 'Test', sex: 'Man', age: 29, address: 'B 从入门到放弃' },
                { id: 10007, name: 'Test11', role: 'Test', sex: 'Man', age: 29, address: 'C 从入门到放弃' },
                { id: 10007, name: 'Test12', role: 'Test', sex: 'Man', age: 29, address: 'C 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Javascript 从入门到放弃' }];

        for(let i=0;i<100000;i++){
            dateList2.push({ id: 10008, name: i+'Test8', role: i+'Develop', sex: 'Man', age: 35, address: 'Javascript 从入门到放弃' });
        }
    table2.dataSource=dateList2;
    table2.fixedFoot=true;

   
    //启用虚拟滚动
    table2.enableVirtualScroll=true;
    //虚拟滚动行高
    table2.virtualItemHeight=45;
    table2.customStyle=`div.tdWrap{height:28px;overflow:hidden;}`;//控制单元高度
   

    table2.customRenderFooter=(columns)=>{
        let result= html`
            ${columns.map(c=>{
                //注意列固定的原理 是 选择 td[uniqueid=${c.uniqueID}],自定义TFoot 的时候注意
                return html`<td style='background-color:rgb(var(--sl-color-blue-gray-100));' uniqueid=${c.uniqueID} >${c.label}</td>`;
            })}
        `;
        return html`<tr >${result}</tr><tr>${result}</tr>`;
    };
    
    let index=0;
    table2.addEventListener('sl-table-td-click',(event)=>{
        let detail=event.detail;
        // console.table({type:event.type,td:detail.td.toString(), column:detail.column.field,row:detail.row.toString(),rowData:JSON.stringify(detail.rowData)});
       console.log(detail);
       console.log(event.type,index++);
    });

    // document.body.addEventListener('click',(event)=>{
    //      console.log(event.type,index++);
    // });
    table2.addEventListener('sl-table-tr-click',(event)=>{
        let detail=event.detail;
        // console.table({type:event.type,row:detail.row.toString(),rowData:JSON.stringify(detail.rowData)});
         console.log(detail);
         console.log(event);
         console.log(event.type,index++);
    });
    
    //UI事件    load unload  scroll  resize
    //焦点事件   blur   focus
     //鼠标事件  mouseleave  mouseenter

    //三者发生的顺序,冒泡阶段 ：[click, dblclick,]td,tr, document
    //三者发生的顺序,捕获阶段 ：[mouseenter, mouseleave,]document ,tr,td
   
    
    window.table2=table2;
    table2.fixedColumns=3;
    table2.tableHeight=600;
    table2.sortValue={orderBy:'name',orderType:'ASC'};
</script>
```
### 表格自定义熏染和事件 要理解几个上下文
#### TBody TR 上下文
  ```javascript
  /** Table 行上下文 */
export type RowContext = {
  /** 行数据 */
  rowData: any;
  /** 行数据顺序号 */
  rowIndex: number;

  /** TreeTable： rowData对应的上级数据 */
  parentData?: TreeNodeData;
  /** TreeTable： 对应树的层次深度 */
  level?: number;
  /***TreeTable 如果过滤 rowData 对应的原始数据  */
  originalData?: TreeNodeData;
  /***TreeTable 过滤，为orginalData 的上级原始数据 */
  originalParentData?: TreeNodeData;
};
  ```
#### TBody TR TD 上下文
  ```javascript
 /** Table TBody TD 上下文 */
export type CellContext = {
  /**列column */
  column: SlColumn;
  /** 行数据 */
  rowData: any;
  /** 行数据顺序号 */
  rowIndex: number;
  /**column 渲染顺序，从0 开始  */
  colIndex: number;

  /** TreeTable 的时候，上级数据 */
  parentData?: TreeNodeData;
  /** TreeTable 的时候，对应树的层次深度 */
  level?: number;
  /***TreeTable 如果过滤 rowData 对应的原始数据  */
  originalData?: TreeNodeData;
  /***TreeTable 过滤，为orginalData 的上级原始数据  */
  originalParentData?: TreeNodeData;
};
  ```
#### THead  TD/TH 上下文
  ```javascript
 /** Table TH 上下文 */
export type CellHeadContext = {
  /**列 column */
  column: SlColumn;
  /**column index，从0 开始  */
  colIndex: number;
  /** 列column 所在表头行号 */
  colRowIndex: number;
  /** 列跨多少行 */
  rowspan: number;
  /** 跨多少列 */
  colspan: number;
};
 ```
### 调整列顺序
 ```javascript
            //改变sl-table 下面的column 的order
        function setColumnOrder(field,order){
            document.querySelector(`sl-column[field=${field}]`).order=order;
        }
        setColumnOrder('role',0);
        setColumnOrder('sex',1);
        setColumnOrder('name',2);
        setColumnOrder('address',-1);
```
### 固定列
```javascript
    //获取table 对象
    let table=document.querySelector('#tableDIV');
    //固定前两列
    table.fixedColumns='2';
    //固定前两列,最后一列
    table.fixedColumns='2,1';
    //固定前1列,最后1列
    table.fixedColumns=[1,1];
```
### 行扩展
```javascript
    
    //指定行扩展的图标在哪一列
   table.expandColumn='name';
   //指定每次只能扩展一行数据，其他扩展的行会关闭
    table.expandAccordion=true;

    //指定行扩展是lazy模式
    table.expandLazy=true;
    table.expandLazyLoadMethod=(rowData)=>{
        let result={
            columns:['a','b','c'],
            dataSource:[[1,2,3],[4,5,6],[7,8,9]]
        }
         return new Promise((resolve)=>{
            window.setTimeout(()=>{
                resolve(result);
            },300)
        } );
    }

    //必须配置的行扩展渲染函数，
    //第一个参数，是rowContext数据，第二个参数是所有列
    //如果是lazy模式，则第三个参数是lazyLoadData
    table.expandRowRender=({rowData},columns,layLoadData)=>{
        let layResult=layLoadData?html`  
            懒加载数据${JSON.stringify(layLoadData)}`:'';
        let result=html`<tr><td colspan=${columns.length}>
            <div style='margin:10px auto; width:80%;display:grid;grid-template-columns: repeat(2,1fr);'>
            ${columns.map(item=>{
                return html`<span>${rowData[item.field]?rowData[item.field]:''}</span>`;
            })}
            </div>
            <span style='gri-column:span 2'>${layResult}</span>
        </td></tr>`;
        return result;
    };
```
### 虚拟滚动
```javascript
    let dateList=[];
    for(let i=0,j=20000;i<j;i++){
        dateList.push( { id: i, name: 'Test add'+i, role: 'Test1', sex: 'Man', age: 28, address: 'Javascript 从入门到放弃'+i });
    }
    table.tableHeight='400px';
    //启用虚拟滚动
    table.enableVirtualScroll=true;
    //虚拟滚动行高
    table.virtualItemHeight=45;
    table.customStyle=`div.tdWrap{height:28px;overflow:hidden;}`;//控制单元高度
    table.dataSource=dateList;
```

### 自定义行样式
```javascript
    //获取table 对象
    let table=document.querySelector('#tableDIV');
    //给table 内部设置样式
    table.customStyle=`
        .red td[field=name] {
           color:red
        }
        .green td{
            color:green;
        }
        .name{
            font-weight:bold;
        }
        .sex{
            font-size:1.2em;
        }
    `;
     //自定义tbody tr class
     //rowData 行数据源对象，index 为rowData 在数据源中的序号
    table.customRenderRowClassMap=({rowData,rowIndex})=>{
        return {
                red:rowIndex%2==0,
                green:rowIndex%2==1
        };
    };
```
### 自定义单元格样式
```javascript
    //获取table 对象
    let table=document.querySelector('#tableDIV');
     //自定义tbody tr class
     // 参数为obj:CellContext
     //给name 列， rowData['name']=='Test4',设置特殊背景色
    table.customRenderCellStyle=({column,rowData})=>{
        return {
            'font-size':column.field=='name'&&rowData['name']=='Test1'?'20px':'14px'
        };
    };
     table.customStyle=`
        .name{
            font-weight:bold;
        }
        .sexWomen{
            color:red;
        }
    `;
    //自定义tbody tr td class
    //给name列添加class: name, 给sex 列且sex='Women' 添加class :sexWomen,
    table.customRenderCellClassMap=({column,rowData})=>{
        return {
            name:column.field=='name',
            sexWomen:column.field=='sex'&&rowData['sex']=='Women'  
        };
    };


    //同时给Tr 设置 属性 attribute，style,class,事件
    table.customRenderRowSpread=({rowData,rowIndex})=>{
        return {
            '.Value':rowData, //tr.Value=rowData
            '.Index':rowIndex, //tr.Index=rowIndex
            'name':rowData['name'],// tr.getAttribute('name')=rowData['name']
            style:{'font-weight':'bold',color:rowIndex%2==0?'red':''}, //'font-weight:bold;cor:red'
            class:['class01','class02'], //{class01:true, class02:true} //'class01 class02 class03'
            '@click':(event)=>{console.log(rowData);console.log(rowIndex);} //tr.addEventListener('click')
        }
    }
```
### 自定义单元格渲染
```javascript
    //获取table 对象
    let table=document.querySelector('#tableDIV');
    //renderCell 接收CellContext 
    document.querySelector('sl-column[field=sex]').renderCell=({rowData})=>{
        let sex=rowData['sex'].toLowerCase();
        return window.html`${sex=='man'?'男人':'女人'}`;
    }
```
### 自定义表头
```javascript
    //获取table 对象
    let table=document.querySelector('#tableDIV');
    //renderCell 接收 CellHeadContext 作为参数
    document.querySelector('sl-column[field=sex]').renderCol=({column})=>{
        return window.html`<span>${column.label} <font color='red'>*</font>`;
    }
    //给th 自定义style
    table.customRenderCellHeadStyle=({column})=>{
        return {
            'font-weight':column.field=='name'?'bold':''
        }
    }
    table.customStyle=`.class01{color:red}`;
     //给th 自定义class
    table.customRenderCellHeadClassMap=({column})=>{
        return {
            'class01':column.field=='name'
        }
    }

     //给th  同时自定义属性，style,class, 事件
    table.customRenderCellHeadSpread=({column,colIndex,colRowIndex})=>{
        return {
            field:column.field,
            '@click':(event)=>{
                console.log(column.field);
            },
            '.Index':colIndex,
            '.colRowIndex':colRowIndex
        }
    }


```

### 单元格合并
```javascript
    let lastSex=null;
    let table=document.querySelector('#tableDIV');
    let dateList=table.dataSource;
    //自定义TD 的渲染函数 ：//性别列，向下相等的合并
    table.querySelector('sl-column[field=sex]').renderCell=({column,rowData,rowIndex})=>{
        if(rowIndex==0)  {
           lastSex=null;
        }
        let value=rowData[column.field];
        if(value==lastSex){//如果性别等于上一次的性别，则此单元格被合并，不渲染
            return null; 
        }
        let _rowSpan_=1;
       for(let i=rowIndex+1,j=dateList.length;i<j;i++){
            let nextValue=dateList[i][column.field];
            if(nextValue==value){
                _rowSpan_+=1;
            }else{
                break ;
            }
        }
        lastSex=value;
        return  {
            template: value,
            rowspan:_rowSpan_
        };
    };

    //第一行 name 列 和后面列合并
    table.querySelector('sl-column[field=name]').renderCell=({column,rowData,rowIndex})=>{
        if(rowIndex==0){
            return {
                template:html`${rowData[column.field]}`,
                colspan:2
            }
        }else {
            return html`${rowData[column.field]}`;
        }
    };

   table.querySelector('sl-column[field=name]').nextElementSibling.renderCell=({column,rowData,rowIndex})=>{
        if(rowIndex==0){
            return null;
        }else{
            return html`${rowData[column.field]}`;
        }
    }
```


[component-metadata:sl-table]
<br>
<br>
[component-header:sl-column]
column 组件:用于定义表头
[component-metadata:sl-column]
