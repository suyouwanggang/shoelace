# Table

[component-header:sl-table]

Table 组件

```html preview
<sl-table id='tableDIV' >
    <sl-column field='name' label='Name'  width='100%' align='center' min-width='300' ></sl-column>
    <sl-column field='role' label='Role' min-width='200' order=2 ></sl-column>
    <sl-column field='sex' label='Sex' max-width='100' order=3 agile-cell='right'></sl-column>
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
    for(let i=0,j=20;i<j;i++){
        dateList.push({...dateList[6]});
    }
    table.dataSource=dateList;
    window.table=table;
    table.tableHeight='400px';
    table.fixedColumns='1,1';
    table.customStyle=`
        .red td[field=name] {
           color:red
        }
        .green td{
            
        }
        .name{
            font-weight:bold;
        }
        .sex{
            font-size:1.2em;
        }
    `;
    let lastSex=null;
    
    //自定义TD 的渲染函数 ： //性别列，向下相等的合并
    table.querySelector('sl-column[field=sex]').renderCell=(column,rowData,rowIndex)=>{
        if(rowIndex==0)  {
           lastSex=null;
        }
        let value=rowData[column.field];
        if(value==lastSex){//如果性别等于上一次的性别，则此单元格不显示
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
    //自定义tbody tr class
    table.customRenderRowClassMap=(rowData,index)=>{
        return {
                red:index%2==0,
                green:index%2==1
        };
    };
     //自定义tbody tr td class
    table.customRenderCellClassMap=(column,rowData,index)=>{
        return {
            name:column.field=='name',
            sex:column.field=='sex'&&rowData['sex']=='Women'  
        };
    };
      //自定义tbody tr td styleMap 
    table.customRenderCellStyle=(column,rowData,index)=>{
        return {
            'background-color':column.field=='name'&&rowData['name']=='Test2'?'saddlebrown':''
        };
    }


</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-table]
<br>
<br>
[component-header:sl-column]
column 组件:用于定义表头
[component-metadata:sl-column]
