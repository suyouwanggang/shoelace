# Table

[component-header:sl-table]

Table 组件启用TreeTable 需要设置treeConfig属性

```html preview
<div style='margin:10px'>
    <sl-checkbox id='checkProp'>选中值为name属性 &nbsp;</sl-checkbox>
    <sl-checkbox id='checkDown' checked>选中时向下级联</sl-checkbox>
    <sl-checkbox id='checkUp' >选中时向上级联&nbsp;&nbsp;</sl-checkbox>
    <sl-button onclick="javascript:table.checkValue=null;
     document.querySelector('#checkValueDiv').textContent=table.checkValue?JSON.stringify(table.checkValue):'';"> 清空选中值</sl-button>
    <style>
        sl-checkbox  + sl-checkbox {
            margin-right:20px;
        }
    </style>
</div>
<div style='margin:10px;height:28px;overflow:hidden;line-height:28px;' id='checkValueDiv'></div>
<sl-table id='tableDIV' >
     <sl-column type="index"  label='#'  align='center' min-width='40' ></sl-column><!-- type='index' 内置序号列，如果不满足，可以设置column.renderCell 属性来实现自定义渲染 -->
    <sl-column type='checkbox'  label='#'  align='center' ></sl-column><!--type='checkbox' 内置逻辑列， -->
    <sl-column field='name' sort-able resize-able label='Name' width='100%'  align='left' min-width='200' ></sl-column>
    <sl-column field='size' sort-able label='size' align='right'  resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='date' sort-able label='Date'resize-able  min-width='100' order=3 agile-cell='right'></sl-column>
    <sl-column field='type' sort-able label='Type' resize-able min-width='200' order='1'  ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    table.cacheKey='tableDIV';
    table.treeConfig={};
    const dateList=[
        { id: 1000, name: 'Javascript 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
            id: 1005,
            name: 'Test2',
            type: 'mp4',
            size: null,
            close:false,
            date: '2021-04-01',
                children: [
                { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, name: 'Javascript 从入门到放弃4', type: 'html', size: 600,close:false, date: '2021-04-01' },
                {
                    id: 10053,
                    name: 'Javascript 从入门到放弃96',
                    type: 'avi',
                    size: null,
                    date: '2021-04-01',
                    children: [
                    { id: 24330, name: 'Javascript 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                    { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                    { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                    ]
                }
                ]
            },
            { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
            { id: 24555, name: 'Javascript 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
        ];
        table.checkValue=[dateList[0]];
    table.dataSource=dateList;
    table.fixedColumns=2;
    window.table=table;
    table.tableHeight='400px';

    //自定义某些数据，不能选中
     table.checkDisablePropField='disabled';//或者每行rowData.disabled， 则不能选中
    table.checkDisablePropField=(rowData)=>{
        return rowData.id==0;
    }

    table.addEventListener('sl-table-check-before-change',(event)=>{
        console.log(event.type,event.detail.checkbox);
     });

    table.addEventListener('sl-table-check-change',(event)=>{
        let value=event.detail.value;
        console.log(event.type,value);
        document.querySelector('#checkValueDiv').textContent=table.checkValue?JSON.stringify(table.checkValue):"";
    });
    document.querySelector('#checkValueDiv').textContent=table.checkValue?JSON.stringify(table.checkValue):"";
    document.querySelector('#checkProp').addEventListener('sl-change',(event)=>{
        let checkEl=event.target;
        table.checkPropField=checkEl.checked?'name':undefined;
    });
    document.querySelector('#checkDown').addEventListener('sl-change',(event)=>{
        let checkEl=event.target;
        table.checkTreeCasecadeDown=checkEl.checked;
    });
    document.querySelector('#checkUp').addEventListener('sl-change',(event)=>{
        let checkEl=event.target;
        table.checkTreeCasecadeUp=checkEl.checked;
    });
</script>
```

Table 组件启用TreeTable 懒加载 ,和虚拟滚动加载
```html preview
<sl-table id='tableDIV2' border>
    <sl-column type="index"  label='#'  align='center' min-width='60'  ></sl-column>
    <sl-column type="checkbox"  label='#'  align='center' min-width='40' ></sl-column>
    <sl-column field='name'  sort-able resize-able label='Name' width='100%' max-width='600' align='left' min-width='200' ></sl-column>
    <sl-column field='size' sort-able label='size' align='right' resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='date' sort-able label='Date'resize-able  min-width='100' order=3 agile-cell='right'></sl-column>
    <sl-column field='type' sort-able label='Type'  resize-able min-width='200' order='1'  ></sl-column>
</sl-table>
<script >
    const table2=document.querySelector('#tableDIV2');
    table2.treeConfig={treeNodeColumn:'name',lazy:true ,hasChildProp:'hasChild'};
    
    table2.cacheKey='treeTable';
    table2.treeLoadingNodeMethod=(cellContext)=>{
        let rowData=cellContext.rowData;
        let name=rowData.name;

        let result=[];
        for(let i=0;i<200;i++){
            let sub={name:' ajax chapter'+(Math.random()+'').substring(2,7),type:'mp3',size:rowData.size+(i*1000),date:'2028-08-11',hasChild:Math.random()>0.6};
            if(table2.checkValue&&table2.checkValue.includes(rowData)){
                table2.checkValue.push(sub);
            }
            result.push(sub); 
        }  
        return new Promise((resolve)=>{
            window.setTimeout(()=>{
                resolve(result);
            },120)
        } );
    };
    const dateList=[
        { id: 1000, name: 'Javascript 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
            id: 1005,
            name: 'LitElement',
            type: 'mp4',
            size: null,
            close:false,
            date: '2021-04-01',
                children: [
                { id: 24300, name: 'LitElement 1', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, name: 'LitElement 2', type: 'html', size: 600, date: '2021-04-01' },
                {
                    id: 10053,
                    name: 'LitElement 3',
                    type: 'avi',
                    size: null,
                    close:false,
                    date: '2021-04-01',
                    children: [
                    { id: 24330, name: 'LayLoader 01 ', type: 'txt', size: 25, date: '2021-10-01', hasChild:true },
                    { id: 21011, name: 'LayLoader 02', type: 'pdf', size: 512, date: '2020-01-01' ,hasChild:true },
                    { id: 22200, name: 'LayLoader 03', type: 'js', size: 1024, date: '2021-06-01', hasChild:true}
                    ]
                }
                ]
            },
            { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' , hasChild:true},
            { id: 24555, name: 'Lit Element', type: 'avi', size: 224, date: '2020-10-01', hasChild:true }
        ];
   
    //启用虚拟滚动
    table2.enableVirtualScroll=true;
    table2.stripe=true;//斑马线
    //虚拟滚动行高
    table2.virtualItemHeight=45;
    table2.customStyle=`div.tdWrap{height:28px;overflow:hidden;}`;//控制单元高度
    table2.dataSource=dateList;
    table2.fixedColumns=3;
    window.table2=table2;
    table2.treeNodeNoWrap=false;
    table2.tableLayoutFixed=true;
    table2.tableMaxHeight=400;
</script>
```


```javascript

/**
 * 定义表格数据为树类型
 */
export type TreeConfig = {
  //树子节点属性,必须为'chidren';
  // childrenProp:'children';
  //树节点ID属性
  idProp?: string;
  //树节点缩进
  indent?: number;
  //对于同一级的节点，每次只能展开一个,待实现
  accordion?: boolean;
  //是否显示根节点
  //includeRoot: boolean;
  //是否默认懒加载
  lazy?: boolean;
  //指定treeNodeColumn 所在列 field
  treeNodeColumn: string;
  //懒加载时，哪个属性标识有子节点
  hasChildProp?: string;
};
export const defaultTreeConfig: TreeConfig = {
  idProp: 'id',
  //childrenProp:'children',
  indent: 14,
  accordion: false,
  lazy: false,
  treeNodeColumn: 'name',
  hasChildProp: 'hasChild'
};
```