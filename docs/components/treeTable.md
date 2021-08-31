# Table

[component-header:sl-table]

Table 组件启用TreeTable 设置treeConfig，

```html preview
<sl-table id='tableDIV' >
     <sl-column field='index'  label='#'  align='center' min-width='40' ></sl-column>
    <sl-column field='name' sort-able resize-able label='Name' width='100%'  align='left' min-width='200' ></sl-column>
    <sl-column field='size' sort-able label='size' resize-able min-width='100' order=2 ></sl-column>
    <sl-column field='date' sort-able label='Date'resize-able  min-width='100' order=3 agile-cell='right'></sl-column>
    <sl-column field='type' sort-able label='Type' resize-able min-width='200' order='1'  ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    table.children[1].renderCell=(column,rowData,index)=>{
        return html`<span>${rowData.name}<span>`;
    };
    table.children[0].renderCell=(column,rowData,index)=>{
        return html`${index+1}`;
    }
    table.treeConfig={};
    const dateList=[
        { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
            id: 1005,
            name: 'Test2',
            type: 'mp4',
            size: null,
            date: '2021-04-01',
                children: [
                { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                {
                    id: 10053,
                    name: 'vxe-table 从入门到放弃96',
                    type: 'avi',
                    size: null,
                    close:true,
                    date: '2021-04-01',
                    children: [
                    { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                    { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                    { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                    ]
                }
                ]
            },
            { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
            { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
        ];
    table.dataSource=dateList;
    table.fixedColumns=2;
    window.table=table;
    table.tableHeight='400px';
</script>
```
```javascript

/**
 * 定义表格数据为树类型
 */
 type TreeConfig={
  //树子节点属性,必须为'chidren';
 // childrenProp:'children';
  //树节点ID属性
  idProp?:string;
  //树节点缩进
  indent?:number;
  //对于同一级的节点，每次只能展开一个
  accordion?:boolean;
  //是否显示根节点
  includeRoot:boolean;
  //是否默认懒加载
  lazy?:boolean;
  //指定treeNodeColumn 所在列 field
  treeNodeColumn:string,
  //懒加载时，哪个属性标识有子节点
  hasChildProp?:string;
}
export const defaultTreeConfig:TreeConfig={
  idProp:'id',
  //childrenProp:'children',
  indent:18,
  accordion:false,
  lazy:false,
  includeRoot:true,
  treeNodeColumn:'name',
  hasChildProp:'hasChild'
} ; 

```