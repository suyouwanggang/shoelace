# Table

[component-header:sl-table]

Table 组件

```html preview
<sl-table id='tableDIV' >
    <sl-column field='name' label='Name' min-width='200'></sl-column>
    <sl-column field='role' label='Role' min-width='200' ></sl-column>
    <sl-column field='sex' label='Sex' agile-cell='right'></sl-column>
    <sl-column field='address' label='address' min-width='200' ></sl-column>
</sl-table>
<script >
    const table=document.querySelector('#tableDIV');
    const dateList=[{ id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }];
    table.dataSource=dateList;
    window.table=table;
    table.tableHeight='400px';

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-table]
