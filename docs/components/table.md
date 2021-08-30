# Table

[component-header:sl-table]

Table 组件

```html preview
<sl-table id='tableDIV' >
    <sl-column field='name' label='Name'  width='100%' align='left' min-width='300' ></sl-column>
    <sl-column field='role' label='Role' min-width='200' order=2 ></sl-column>
    <sl-column field='sex' label='Sex' min-width='150' order=3 agile-cell='right'></sl-column>
    <sl-column field='address' label='address' min-width='300' order='1'  ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    const dateList=[
                { id: 10001, name: 'Test1', role: 'Test1', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Test2', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vtable 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'table 从入门到放弃' }];
    table.dataSource=dateList;
    window.table=table;
    table.tableHeight='400px';
</script>
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
    table.customRenderRowClassMap=(rowData,index)=>{
        return {
                red:index%2==0,
                green:index%2==1
        };
    };
```
### 自定义单元格样式
```javascript
    //获取table 对象
    let table=document.querySelector('#tableDIV');
     //自定义tbody tr class
     //column 为列，rowData 行数据源对象，index 为rowData 在数据源中的序号
     //给name 列， rowData['name']=='Test4',设置特殊背景色
    table.customRenderCellStyle=(column,rowData,index)=>{
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
    table.customRenderCellClassMap=(column,rowData,index)=>{
        return {
            name:column.field=='name',
            sexWomen:column.field=='sex'&&rowData['sex']=='Women'  
        };
    };
```
### 自定义单元格渲染
```javascript
    //获取table 对象
    let table=document.querySelector('#tableDIV');
    document.querySelector('sl-column[field=sex]').renderCell=(column,rowData,index)=>{
        let sex=rowData['sex'].toLowerCase();
        return window.html`${sex=='man'?'男人':'女人'}`;
    }
```

### 单元格合并
```javascript
    let lastSex=null;
    let table=document.querySelector('#tableDIV');
    let dateList=table.dataSource;
    //自定义TD 的渲染函数 ：//性别列，向下相等的合并
    table.querySelector('sl-column[field=sex]').renderCell=(column,rowData,rowIndex)=>{
        if(rowIndex==0)  {
           lastSex=null;
        }
        let value=rowData[column.field];
        if(value==lastSex){//如果性别等于上一次的性别，则此单元格被合并，不渲染
            lastSex=value;
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
    table.querySelector('sl-column[field=name]').renderCell=(column,rowData,rowIndex)=>{
        if(rowIndex==0){
            return {
                template:html`${rowData[column.field]}`,
                colspan:2
            }
        }else {
            return html`${rowData[column.field]}`;
        }
    };

   table.querySelector('sl-column[field=name]').nextElementSibling.renderCell=(column,rowData,rowIndex)=>{
        if(rowIndex==0){
            return null;
        }else{
            return html`${rowData[column.field]}`;
        }
    }
```

### 表头多列

```html preview
<sl-table id='tableDIV2' border>
    <sl-column label='基本信息' >
         <sl-column field='name' col-align='left' label='Name'  width='100%' align='left' min-width='300' ></sl-column>
         <sl-column field='sex' label='Sex' col-align='left' min-width='150'  align='right' order=2></sl-column>
         <sl-column field='age' label='Age' min-width='150'  align='center' order=1></sl-column>
    </sl-column>
    <sl-column field='role' label='Role' min-width='200' order=2 ></sl-column>
    <sl-column field='address' label='address' min-width='300' order='1'  ></sl-column>
</sl-table>
<script >
    let table2=document.querySelector('#tableDIV2');
    let dateList2=[
                { id: 10001, name: 'Test1', role: 'Test1', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Test2', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vtable 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'table 从入门到放弃' }];
    table2.dataSource=dateList2;
    window.table2=table2;
</script>
```

[component-metadata:sl-table]
<br>
<br>
[component-header:sl-column]
column 组件:用于定义表头
[component-metadata:sl-column]
