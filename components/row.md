# Row

[component-header:sl-row]

css grid 布局组件实现

```html preview
<sl-row  columns='3' grap=5>
   <sl-col span='2' class='cell minTd'> 两列 </sl-col>
   <sl-col  class='cell minTd'>一列</sl-col>
</sl-row>
<sl-row   grap=10>
   <sl-col span='2' class='cell minTd'>两列</sl-col>
   <sl-col  class='cell'> 一列</sl-col>
    <sl-col span=9 class='cell'>九列（默认是分为12列）</sl-col>
</sl-row>
<style>
    .cell{
         border:1px solid #f2f2f2;
         border-radius:5px;
    }
    sl-row + sl-row{
        margin:10px 0;
    }
    .minTd{
        height:100px;
    }
</style>
```

## 多行布局
```html preview
<sl-row grap='2' columns='3' style=' margin:10px 0;'>
    <sl-col  row='2' class='cell'>A </sl-col>
    <sl-col  span=2 class='cell' >B </sl-col>
    <sl-col  class='cell'  >C </sl-col>
    <sl-col class='cell'  >D </sl-col>
</sl-row>
```
### 仪表板布局，嵌套
```html preview
<sl-row grap='10' columns='4' style=' margin:10px 0;'>
    <sl-col span='4' >
        <sl-row columns='4' grap='10px'>
            <sl-col class='cell minTd'>1</sl-col>
            <sl-col class='cell minTd'>2</sl-col>
            <sl-col class='cell minTd'>3</sl-col>
            <sl-col class='cell minTd'>4</sl-col>
        </sl-row>
    </sl-col>
    <sl-col span='3' class='cell' >
        <div style='height:400px' >仪表板中间</div>
    </sl-col>
    <sl-col span=1 class='cell'  >仪表板右侧 </sl-col>
</sl-row>
```

### 等分多行
```html preview
<sl-row   columns=6 grap=2>
    <sl-col  class='cell minTd'>1</sl-col>
    <sl-col  class='cell minTd'>2</sl-col>
    <sl-col  class='cell minTd'>3</sl-col>
    <sl-col  class='cell minTd'>4</sl-col>
    <sl-col  class='cell minTd'>5</sl-col>
    <sl-col  class='cell minTd'>6</sl-col>
    <sl-col  class='cell minTd'>7</sl-col>
    <sl-col  class='cell minTd'>8</sl-col>
    <sl-col  class='cell minTd'>9</sl-col>
    <sl-col  class='cell minTd'>10</sl-col>
    <sl-col  class='cell minTd'>11</sl-col>
    <sl-col  class='cell minTd'>12</sl-col>
</sl-row>
```
TODO

[component-metadata:sl-row]
# Col
[component-header:sl-col]
[component-metadata:sl-col]
