# Table

[component-header:sl-table]

Table 组件启用TreeTable 需要设置treeConfig属性

```html preview
<sl-table id='tableDIV' >
     <sl-column field='index'  label='#'  align='center' min-width='40' ></sl-column>
    <sl-column field='name' sort-able resize-able label='Name' width='100%'  align='left' min-width='200' ></sl-column>
    <sl-column field='size' sort-able label='size' align='right'  resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='date' sort-able label='Date'resize-able  min-width='100' order=3 agile-cell='right'></sl-column>
    <sl-column field='type' sort-able label='Type' resize-able min-width='200' order='1'  ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    table.children[1].renderCell=({rowData,rowIndex})=>{
        return html`<span>${rowData.name}<span>`;
    };
    table.cacheKey='tableDIV';
    table.children[0].renderCell=({rowIndex})=>{
        return html`${rowIndex+1}`;
    }
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
    table.dataSource=dateList;
    table.fixedColumns=2;
    window.table=table;
    table.tableHeight='400px';
</script>
```

Table 组件启用TreeTable 懒加载 ,和虚拟滚动加载
```html preview
<sl-table id='tableDIV2' border>
    <sl-column field='index'  label='#'  align='center' min-width='40' ></sl-column>
    <sl-column field='name'  sort-able resize-able label='Name' width='100%' max-width='600' align='left' min-width='200' ></sl-column>
    <sl-column field='size' sort-able label='size' align='right' resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='date' sort-able label='Date'resize-able  min-width='100' order=3 agile-cell='right'></sl-column>
    <sl-column field='type' sort-able label='Type'  resize-able min-width='200' order='1'  ></sl-column>
</sl-table>
<script >
    const table2=document.querySelector('#tableDIV2');
    table2.treeConfig={treeNodeColumn:'name',lazy:true ,hasChildProp:'hasChild'};
    //指定TreeNode 渲染在 column field=type 列，同时支持懒加载
    table2.children[0].renderCell=({rowIndex})=>{
        return html`${rowIndex+1}`;
    };
    table2.cacheKey='treeTable';
    table2.treeLoadingNodeMethod=(cellContext)=>{
        let rowData=cellContext.rowData;
        let name=rowData.name;
        let result=[];
        for(let i=0;i<200;i++){
            result.push({name:' ajax chapter'+(i+1),type:'mp3',size:rowData.size+(i*1000),date:'2028-08-11',hasChild:Math.random()>0.6});
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
    //虚拟滚动行高
    table2.virtualItemHeight=45;
    table2.customStyle=`div.tdWrap{height:28px;overflow:hidden;}`;//控制单元高度
    table2.dataSource=dateList;
    table2.fixedColumns=2;
    window.table2=table2;
    table2.treeNodeNoWrap=false;
    table2.tableLayoutFixed=true;
    table2.tableMaxHeight=600;
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