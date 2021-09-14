# Table

[component-header:sl-table]

Table 组件 

```html preview
<div style='margin:10px'>
    <sl-button id='add'>add</sl-button>
    <sl-checkbox id='accordtion' checked>accordtion</sl-checkbox>
    <sl-button id='editMode'>编辑模式：row</sl-button>
    <sl-select id='trigger'  style='display:inline-block'>
        <sl-menu-item value='click'>click</sl-menu-item>
        <sl-menu-item value='dblclick'>dblclick</sl-menu-item>
        <sl-menu-item value='mouseover'>mouseover</sl-menu-item>
        <sl-menu-item value='contextmenu'>其他事件,例如：contextmenu</sl-menu-item>
    </sl-select>
</div>

<sl-table id='tableDIV' >
     <sl-column id='index' field='index' label='index'   align='left' min-width='70' ></sl-column>
    <sl-column field='name'   label='Name' resize-able  align='left' width='200' ></sl-column>
    <sl-column field='role'  label='Role' resize-able width=150    ></sl-column>
    <sl-column field='sex'  label='Sex'  resize-able  width=150  agile-cell='right'></sl-column>
     <sl-column field='date'   label='Date' resize-able   width=150    agile-cell='right'></sl-column>
    <sl-column field='address'  label='address'  width=180    ></sl-column>
    <sl-column field='date-month'  label='Date-Month' resize-able  min-width=60    ></sl-column>
    <sl-column field='description'  label='描述'  width=100    ></sl-column>
    <sl-column field='check'  label='multi-select' resize-able  width=150    ></sl-column>
    <sl-column field='multi-check'  label='multi-checkbox' resize-able  width=150    ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    const dateList=[
                { id: 10001, name: 'Test1', role: 1,check:[], sex: 2, age: 28,date:'2018-01-01', address: 'Javascript 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 2, checke:[], sex: 1, age: 35, address: 'Javascript 从入门到放弃' },
                { id: 10008, name: 'Test10', role: 2, checke:[], sex: 1, age: 35, address: 'Javascript 从入门到放弃' }
                
                ] ;
        for(let i=0,j=100;i<j;i++){
            dateList.push({});
        }

    table.dataSource=dateList;
    table.customStyle=`
        input{
            height:28px;
            outline:none;
            border: solid var(--sl-input-border-width) rgb( var(--sl-input-border-color));
        }
    `;
    document.querySelector('sl-column#index').renderCell=({column,rowData,rowIndex})=>{
          return rowIndex+1;
    };
    
    document.querySelector('sl-column[field=role]').items=[{id:1,name:'经理'},{id:2,name:'测试'}];
    document.querySelector('sl-column[field=role]').edit='select';

    document.querySelector('sl-column[field=check]').items=[{id:1,name:'A'},{id:2,name:'B'},{id:3,name:'C'},{id:4,name:'D'}];
    document.querySelector('sl-column[field=check]').edit='multi-select';

      document.querySelector('sl-column[field=multi-check]').items=[{id:1,name:'A'},{id:2,name:'B'},{id:3,name:'C'},{id:4,name:'D'}];
    document.querySelector('sl-column[field=multi-check]').edit='multi-checkbox';



    document.querySelector('sl-column[field=date]').edit='date';
    document.querySelector('sl-column[field=date]').type='date';

    document.querySelector('sl-column[field=date-month]').edit='date';
    document.querySelector('sl-column[field=date-month]').type='date-month';

    document.querySelector('sl-column[field=address]').edit='input';
    document.querySelector('sl-column[field=name]').edit='input';

    //自定义列的编辑
    document.querySelector('sl-column[field=description]').edit=({rowData,column})=>{
        let value=rowData[column.field];
        if(value==undefined|| value==null){
            value='';
        }
        return html`<input style='width:100px;' .value=${value} @input=${(event)=>rowData[column.field]= event.target.value} />`;
    }
    table.fixedColumns='2,1';
    table.editAccordion=true;
    table.editEnable=true;
    table.tableHeight=500;
    window.table=table;
    
    document.querySelector('sl-column[field=sex]').items=[{id:2,name:'Man'},{id:1,name:'Women'}];
    document.querySelector('sl-column[field=sex]').edit='select';
    
    document.querySelector('#add').addEventListener('click',()=>{
        table.dataSource=[{},...table.dataSource]; //添加一行新数据
        //如果是accordion 模式，则设置第一行数据为编辑行，否则 添加第一行数据到编辑行数据
        table.currentEditRow=table.editAccordion?[table.dataSource[0]]: [...table.currentEditRow,table.dataSource[0]];
    });
    document.querySelector('#accordtion').addEventListener('sl-change',()=>{
        table.editAccordion=!table.editAccordion;
    });
    document.querySelector('#trigger').value='click';
    document.querySelector('#trigger').addEventListener('sl-change',()=>{
        table.editTrigger=document.querySelector('#trigger').value;
    });





    document.querySelector('#editMode').addEventListener('click',()=>{
        //编辑模式 row->column-cell 再返回row;
        table.editMode=table.editMode=='row'?'column':(table.editMode=='column'?'cell':'row');
        document.querySelector('#editMode').innerText="编辑模式"+table.editMode;
    });

    


    
   
    
    
    
</script>
```



[component-metadata:sl-table]
<br>
<br>
[component-header:sl-column]
column 组件:用于定义表头
[component-metadata:sl-column]
