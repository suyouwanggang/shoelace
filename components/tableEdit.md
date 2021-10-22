# Table

[component-header:sl-table]

Table 组件 

```html preview
<div style='margin:10px'>
    <sl-button id='add'>add</sl-button>
    <sl-checkbox id='accordtion' value=10 checked>accordtion</sl-checkbox>
    <sl-button id='editMode'>编辑模式：row</sl-button>
    <sl-select id='trigger'  style='display:inline-block'>
        <sl-menu-item value='click'>click</sl-menu-item>
        <sl-menu-item value='dblclick'>dblclick</sl-menu-item>
        <sl-menu-item value='mouseover'>mouseover</sl-menu-item>
        <sl-menu-item value='contextmenu'>其他事件,例如：contextmenu</sl-menu-item>
    </sl-select>
</div>

<sl-table id='tableDIV' border >
     <sl-column id='index' type="index" align='center' field='index' label='index'   align='left' min-width='80' ></sl-column>
    <sl-column field='name'   label='Name' resize-able  align='left' width='200' ></sl-column>
    <sl-column field='role'  label='Role' resize-able width=150    ></sl-column>
    <sl-column field='sex'  label='Sex'  resize-able  width=150  agile-cell='right'></sl-column>
     <sl-column field='date'   label='Date' resize-able   width=150    agile-cell='right'></sl-column>
    <sl-column field='address'  label='address'  width=180  resize-able  ></sl-column>
    <sl-column field='date-month'  label='Date-Month' resize-able  width=130    ></sl-column>
    <sl-column field='description'  label='描述'  width=100    ></sl-column>
    <sl-column field='check'  label='multi-select' resize-able  width=150    ></sl-column>
    <sl-column field='multi-check'  label='multi-checkbox' resize-able  width=150    ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    const dateList=[
                { id: 10001, name: 'Test1', role: 1,check:[1],'multi-check':[2], sex: 2, age: 28,date:'2018-01-01', address: 'Javascript 从入门到放弃 从入门到放弃 从入门到放弃 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 2, checke:[2], sex: 1, age: 35, address: 'Javascript 从入门到放弃' },
                { id: 10008, name: 'Test10', role: 2, checke:[3], sex: 1, age: 35, address: 'Javascript 从入门到放弃' }
                
                ] ;
        for(let i=0,j=300000;i<j;i++){
            dateList.push({name:'new'+(i+4)});
        }
   
    table.dataSource=dateList;
    table.enableVirtualScroll=true;
    table.virtualItemHeight=48;
    /*保证非编辑，跟编辑行的高度一致，否则页面虚拟加载， Cell Edit 会跳动*/
    table.customStyle=`
        .tdWrap {
            height:31px;
        }
        input{
            width:80px;
            height:28px;
            outline:none;
            border: solid var(--sl-input-border-width) rgb( var(--sl-input-border-color));
        }
    `;
    //监听上一次编辑的单元格
    table.addEventListener('sl-cell-edit-before-change',(event)=>{
        console.log('lastEdit===> field=',event.detail.context.column.field +' rowIndex='+event.detail.context.rowIndex,event.detail.td);
        //event.preventDefault 能阻止 后续 sl-table-edit-cell-into，sl-table-edit-cell-active 事件
    });

    // //监听当TD进入了编辑状态
    table.addEventListener('sl-cell-edit-start',(event)=>{
       console.log('intoing edit cell===> field=',event.detail.context.column.field +' rowIndex='+event.detail.context.rowIndex ,event.detail.td);
    });


    //监听当TD进入了编辑状态
    table.addEventListener('sl-cell-edit-active',(event)=>{
       console.log('active cell===> field=',event.detail.context.column.field +' rowIndex='+event.detail.context.rowIndex ,event.detail.td);
    });

    
    
    document.querySelector('sl-column[field=role]').items=[{id:1,name:'项目经理'},{id:2,name:'测试'},{id:3,name:'实施'}];
    document.querySelector('sl-column[field=role]').edit='select';

    document.querySelector('sl-column[field=check]').items=[{id:1,name:'A'},{id:2,name:'B'},{id:3,name:'C'}];
    document.querySelector('sl-column[field=check]').edit='multi-select';

      document.querySelector('sl-column[field=multi-check]').items=[{id:1,name:'A'},{id:2,name:'B'},{id:new Date(),name:'C'}];
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
        return html`<input .value=${value} @input=${(event)=>rowData[column.field]= event.target.value} />`;
    }
    table.fixedColumns='2,1';
    table.editAccordion=true;
    table.editEnable=true;
    table.tableHeight=500;
    window.table=table;
    //启用TD 多行点点
    table.enableCellBox=true;
    //TD 内容超过1 行,则...
    table.cellBoxLines=1;
    
    document.querySelector('sl-column[field=sex]').items=[{id:2,name:'Man'},{id:1,name:'Women'}];
    document.querySelector('sl-column[field=sex]').edit='select';
    
    document.querySelector('#add').addEventListener('click',()=>{
        table.dataSource=[{},...table.dataSource]; //添加一行新数据
        //如果是accordion 模式，则设置第一行数据为编辑行，否则 添加第一行数据到编辑行数据
        table.currentEditRow=table.editAccordion?[table.dataSource[0]]: [...table.currentEditRow,table.dataSource[0]];
        table.scrollDiv.scrollTop=0;
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
### Table 编辑相关的属性
  `enableEdit` 启用编辑功能  
  `editMode` 编辑模式，支持 'row','column','cell' 三种  
  `editAccordion`：true|false :true表示只能编辑一行，或者一列 
  `editTrigger`：哪种TD事件，进入触发编辑 例如'click','mouseover'

### Table 编辑相关的事件
  `sl-cell-edit-commit`：单元格内置的编辑器，值发生变化是触发。  
  `sl-cell-edit-before-change`：Emmit when before when table  edit cell  change。 
  `sl--cell-edit-start`：单元格开始进入编辑状态（如果Cell是编辑状态则不触发)。   
  `sl--cell-edit-active`：单元格进入编辑模式后触发，此时column.edit 已经熏染完了 可以通过event.detail 获取td 和cellContext 数据 。  
  `顺序`:sl-cell-edit-before-change->sl--cell-edit-start->sl--cell-edit-active
### Table column 编辑属性
  `edit`:指定单元格的编辑器,内置的有'input','text','date','select','multi-select', 'multi-checkbox'  
  `type`: 'date','date-month','date-year',配合'edit=date',编辑后设置 rowData[field] ,值为'2020-01-20','2020-01','2020'  等
  `edit`: 'select' 表现为select, 此时需要 column 的 `items` 属性，编辑后类似设置 rowData[field]=2  
  `edit`: 'multi-select' 表现为select, 此时需要 column 的 `items` 属性， 编辑后类似设置 rowData[field]=[1,2,'3'];  
  `edit`: 'multi-checkbox'表现为checkbox, 此时需要 column 的 `items` 属性， 编辑后类似设置 rowData[field]=[1,2];  
  `edit`: 可以为函数 ,接收`CelllContext` 作为参数，返回HtmlTemplate 实现自定义的列编辑。
  `自定义内置全局单元格编辑器`:可以调用 `registDefaultEditor` 
  ```typescript
  const registDefaultEditor: (editKey: string, editTemplate: (context: CellContext) => TemplateResult<1>) => void;
  ```



